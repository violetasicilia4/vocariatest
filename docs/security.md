# Seguridad — Vocaria

Documento vivo. Describe qué datos maneja la app, dónde viven, qué los protege y
qué queda pendiente antes de producción. **No** es una garantía de cumplimiento
legal; es la base técnica.

## Variables de entorno: públicas vs secretas

| Variable | Ámbito | ¿Secreta? |
|---|---|---|
| `VITE_SUPABASE_URL` | Cliente (build) | No — pública por diseño |
| `VITE_SUPABASE_ANON_KEY` | Cliente (build) | **No — pública por diseño.** Sólo puede INSERT vía RLS |
| `APP_URL` | Server | No |
| `VITE_PAYMENTS_ENABLED` | Cliente (build) | No — sólo afecta la UI (build-time) |
| `PAYMENTS_ENABLED` | Server | No — **kill switch real del cobro** (sin prefijo `VITE_`) |
| `MP_ACCESS_TOKEN` | Server | **SÍ — secreta. Jamás al frontend ni con prefijo `VITE_`** |
| `SUPABASE_SERVICE_KEY` | Server | **SÍ — secreta. Jamás al frontend** |

> **Doble switch de pagos.** El cobro real exige *dos* decisiones explícitas:
> `VITE_PAYMENTS_ENABLED` (UI) **y** `PAYMENTS_ENABLED` (server). Una variable de
> frontend nunca alcanza para cobrar: los endpoints de `api/` validan
> `PAYMENTS_ENABLED` server-side (`paymentsEnabledServer()` en `api/_lib.ts`).
> Ambas deben quedar en `false` hasta cerrar el checklist de Mercado Pago.

> Toda variable con prefijo `VITE_` se **incluye en el bundle** y es visible para
> cualquiera. Nunca pongas un secreto en una `VITE_*`.

## Qué datos se guardan y dónde

### Supabase (servidor)
- **`leads`** — email, nombre, edad, provincia, consent, referrer, user_agent. Inserción anónima desde el frontend.
- **`test_results`** — email, nombre, arquetipos, confianza, preferences, answers (ids de opción).
- **`purchases`** — sólo la escribe el webhook server-side (Mercado Pago, pendiente).

Antes de insertar, el cliente **normaliza el email** (trim + minúsculas) y
**recorta** los campos a longitudes máximas (`src/services/leads.ts`) como defensa
en profundidad contra payloads inflados.

### Navegador (cliente)
Todo acceso pasa por `src/services/storage.ts` (tipado, con `try/catch` y TTL):

| Clave | Storage | Contenido | TTL | PII |
|---|---|---|---|---|
| `vocaria_pending_inserts` | localStorage | Cola de leads/resultados a sincronizar | 7 días | Sí (email, answers) |
| `vocaria_pending_order` | localStorage | Pedido pendiente durante checkout (MP pendiente) | 24 h | Sí (email, resultado) |
| `vocaria_progress` | sessionStorage | Respuestas (ids) + índice del test | 6 h | No |
| `vocaria_result_draft` | sessionStorage | Arquetipo primario/secundario + confianza | 24 h | Mínima |

Principios aplicados:
- **localStorage/sessionStorage NO son seguridad** ni fuente de verdad de permisos/pagos.
- Datos temporales del flujo → `sessionStorage` (se borran al cerrar la pestaña).
- Se guardan **ids/referencias**, no objetos con PII cuando se puede.
- Todo lo temporal tiene **TTL** y se **purga** al vencer o al fallar el parseo.
- `JSON.parse` siempre va envuelto; un dato corrupto se descarta, no rompe la app.

## Qué protege RLS (Supabase)

La anon key es pública, así que **toda** la seguridad de datos depende de Row
Level Security (ver `supabase/schema.sql`):

- `leads` y `test_results`: el rol `anon` **sólo puede INSERT** (policies `with check (true)`). No puede SELECT/UPDATE/DELETE → el frontend no puede leer datos de nadie.
- `purchases`: **sin policy para `anon`** → no se puede escribir desde el cliente; sólo server-side con `SUPABASE_SERVICE_KEY`.

**Pendiente:** `with check (true)` permite inserts anónimos sin límite (posible
spam). Mitigación actual: honeypot + límites de longitud del lado del cliente.
Pendiente real: rate limiting / captcha del lado servidor (ver abajo).

## Endpoints (`api/`, Vercel Serverless Functions)

Helpers comunes en `api/_lib.ts`: validación de método, parseo seguro de body
(con tope de tamaño), respuestas de error consistentes (`{ error: <code> }`, sin
stack traces) y validadores de input.

| Endpoint | Método | Estado |
|---|---|---|
| `POST /api/create-preference` | POST | Con `PAYMENTS_ENABLED≠true` → `503 payments_disabled` (no crea preferencia). Habilitado: valida método, body, plan y email; precio server-side. **MP pendiente.** |
| `GET /api/verify-payment` | GET | Con `PAYMENTS_ENABLED≠true` → `{ approved:false }` (no desbloquea informe). Habilitado: valida `payment_id` numérico; devuelve sólo lo mínimo. **MP pendiente.** |
| `POST /api/mp-webhook` | POST | Con `PAYMENTS_ENABLED≠true` → responde 200 sin procesar ni persistir. **Webhook NO confiable aún (sin firma).** |

> Los tres endpoints están gateados por `paymentsEnabledServer()`: con el cobro
> desactivado (default) quedan inertes y no inician cobros ni escriben `purchases`.

## Rate limiting / anti-abuso

### Arquitectura actual (importante para entender qué se puede y qué no)

Los leads/resultados se insertan **directo desde el frontend** a la API REST de
Supabase con la **anon key** (`src/services/leads.ts`). **No existe** un endpoint
server-side (`/api/leads`). Consecuencia clave: **un rate limit real NO se puede
lograr sólo en React** — el cliente es controlado por el usuario y cualquiera
puede pegarle directo al endpoint de Supabase con la anon key (que es pública).
No hay que fingir lo contrario.

### Qué protege HOY (cliente + RLS)
- **Honeypot** anti-bot en `ProfileCapture` (descarta bots que completan todo).
- **Dedup de cliente** (en memoria, por sesión) contra doble submit / doble click
  (`src/services/leads.ts`). No es anti-abuso real: es idempotencia de UX.
- **Normalización + límites de longitud** antes de insertar (defensa contra payloads inflados).
- **Whitelist de tablas** (`ALLOWED_TABLES`): la cola offline no puede insertar en tablas arbitrarias.
- **RLS**: el rol `anon` sólo puede INSERT (no leer/editar/borrar); `purchases` cerrada al cliente.
- **Validación de forma/tamaño** en los endpoints `api/` (`api/_lib.ts`).

### Qué NO protege hoy
- **Volumen / flood**: la policy `with check (true)` permite inserts anónimos
  **ilimitados**. No hay rate limit por IP ni ventana temporal.
- **Dedup cross-device / cross-reload**: la dedup es sólo de cliente; un refresh o
  un POST directo pueden duplicar (ver migración `submission_id` en `schema.sql`).
- **Bots sofisticados** que ignoran el honeypot y pegan directo a Supabase.

### Qué falta para producción con tráfico alto (opciones reales)

Ninguna se implementa ahora (no se agregan vendors ni CAPTCHA todavía). En orden
de menor a mayor esfuerzo:

1. **Rate limit en Postgres (Supabase), sin nuevo servicio.** Tabla `lead_rate`
   (ip_hash, window_start, count) + función `before insert` que cuenta inserts
   por IP/ventana y rechaza si excede. Requiere capturar la IP (header) — hoy el
   cliente no la tiene, así que esto **implica** mover el insert a un endpoint.
2. **Endpoint server-side `/api/leads`** (Vercel function) — arquitectura objetivo:
   - validar payload server-side (reusar `api/_lib.ts`),
   - **rate limit por IP + ventana** (store persistente: Vercel KV / Upstash, o
     una tabla/RPC en Supabase; un Map en memoria es **best-effort dev/poco
     tráfico**: se resetea y es por-instancia, **no** sirve como límite real),
   - insertar con **service role** desde el server,
   - **cerrar RLS** para inserts anónimos directos (quitar la policy `anon insert`)
     una vez migrado el cliente, para que el único camino sea el endpoint.
   ⚠️ Esto cambia el contrato de captura (frontend → `/api/leads` en vez de
   Supabase directo). Es un cambio de flujo: **coordinar y avisar antes** de
   migrarlo; no se hace en este PR.
3. **CAPTCHA / Turnstile** (Cloudflare) en el formulario — diferido a propósito
   hasta tener dominio y evidencia de abuso real.

**Decisión actual:** mantener la defensa cliente/RLS + dedup, **documentar** la
arquitectura objetivo, y **no** introducir un rate limit en memoria disfrazado de
protección real ni migrar el flujo sin acuerdo previo.

## Mercado Pago — pendiente (no productivo)

El cobro **no está integrado**. `VITE_PAYMENTS_ENABLED` debe quedar en `false`.
Reglas que ya se respetan y deben mantenerse:
- El frontend **no** desbloquea el informe por `status=approved` en la URL (`PaymentReturn.tsx`).
- El frontend **no** debe ser fuente de verdad del pago: la verificación es server-side.

Antes de cobrar (checklist en `PRODUCT.md` y `TODO(mp)` en el código): validación
server-side de monto/plan/`external_reference`, webhook firmado (`x-signature`) +
idempotente con `SUPABASE_SERVICE_KEY`, persistencia segura de `purchases`,
manejo de estados de pago.

## Pendientes de seguridad (resumen)

**Antes de producción:** confirmar RLS activo en las 3 tablas; definir retención
de PII (`answers`, `user_agent`); rate limiting / captcha server-side.
**Antes de cobrar:** todo el checklist de Mercado Pago.
