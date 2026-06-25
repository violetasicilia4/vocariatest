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
| `VITE_PAYMENTS_ENABLED` | Cliente (build) | No |
| `MP_ACCESS_TOKEN` | Server | **SÍ — secreta. Jamás al frontend ni con prefijo `VITE_`** |
| `SUPABASE_SERVICE_KEY` | Server | **SÍ — secreta. Jamás al frontend** |

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
| `POST /api/create-preference` | POST | Valida método, body, plan y email; precio server-side. **MP pendiente.** |
| `GET /api/verify-payment` | GET | Valida método y `payment_id` numérico; devuelve sólo lo mínimo. **MP pendiente.** |
| `POST /api/mp-webhook` | POST | Parseo seguro; siempre responde 200. **Webhook NO confiable aún (sin firma).** |

## Rate limiting / anti-abuso

**Implementado ahora (cliente / validación):**
- Honeypot anti-bot en el formulario de perfil (`ProfileCapture`).
- Normalización de email + límites de longitud antes de insertar en Supabase.
- Validación de tamaño/forma de payload en los endpoints (`api/_lib.ts`).

**Pendiente (servidor):**
- Rate limiting por IP en las funciones serverless (p. ej. Upstash Redis) — **no implementado**.
- Cloudflare Turnstile / captcha en formularios públicos — **no implementado**.
- Anti-abuso del INSERT anónimo de Supabase (la anon key permite inserts ilimitados).

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
