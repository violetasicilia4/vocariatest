# Vocaria — Test vocacional para Argentina

Landing + test vocacional que cruza el patrón de pensamiento del usuario con
carreras universitarias argentinas reales. El motor de scoring es **determinístico**
(no usa IA en esta versión): a partir de las respuestas calcula un vector de
señales, hace emerger 12 arquetipos vocacionales y recomienda carreras reales con
universidades, duración y rangos salariales orientativos.

> **Estado del proyecto:** el test y la captura de leads/resultados con Supabase
> están operativos. El **cobro con Mercado Pago NO está productivo todavía**
> (ver [Pagos: estado](#pagos-mercado-pago--pendiente)). No despliegues con
> cobro real activado hasta completar esa integración.

## Stack

- **Frontend:** Vite + React 19 + TypeScript + Tailwind CSS v4
- **Datos:** Supabase (REST, sólo INSERT anónimo — ver [`supabase/schema.sql`](supabase/schema.sql))
- **Funciones serverless:** rutas en [`api/`](api), pensadas **exclusivamente para Vercel**
  (firma `export default function handler(req, res)`)
- **Testing:** Vitest (unitario) + Playwright (E2E)
- **Deploy:** **Vercel** (único target soportado — ver abajo)

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm 9+

## Instalación local

```bash
git clone <repo>
cd vocaria
npm install
cp .env.example .env.local   # completá las variables que necesites (ver abajo)
```

La app **funciona sin configurar nada**: si Supabase no está configurado, los
leads se encolan en `localStorage` y se reintentan en la próxima carga.

## Desarrollo

```bash
npm run dev        # server de desarrollo en http://localhost:3000
```

> Las funciones de [`api/`](api) **no corren** con `vite dev` (son serverless de
> Vercel). Para probarlas localmente usá `vercel dev` (requiere la CLI de Vercel).
> El flujo del test no depende de ellas; sólo el cobro (pendiente).

## Build y preview

```bash
npm run build      # build de producción a dist/
npm run preview    # previsualiza el build localmente
```

## Deploy en Vercel

**Vercel es el único deploy target soportado.** No hay soporte para Netlify ni
otros proveedores (las rutas de `api/` usan la firma de funciones de Vercel y la
configuración vive en [`vercel.json`](vercel.json)).

1. Importá el repo en [vercel.com](https://vercel.com) (framework: **Vite**).
2. Vercel detecta `vercel.json` automáticamente:
   - `buildCommand`: `npm run build`
   - `outputDirectory`: `dist`
   - rewrites de SPA (todo lo que no sea `/api/*` sirve `index.html`)
   - headers de seguridad (CSP, HSTS, X-Frame-Options, etc.)
3. Cargá las variables de entorno en **Project → Settings → Environment Variables**
   (ver tabla abajo).
4. Deploy.

## Variables de entorno

Ver [`.env.example`](.env.example) para el detalle. Resumen:

| Variable | Ámbito | Requerida | Descripción |
|---|---|---|---|
| `VITE_SUPABASE_URL` | Cliente | Para persistir leads/resultados | URL del proyecto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Cliente | Para persistir leads/resultados | Anon key (sólo puede INSERT, ver RLS) |
| `APP_URL` | Server | Opcional | URL pública; si falta se deriva del request |
| `VITE_PAYMENTS_ENABLED` | Cliente | No (pendiente) | `"true"` activa el cobro real. **Dejar en `false`** hasta completar Mercado Pago |
| `MP_ACCESS_TOKEN` | Server (secreto) | No (pendiente) | Access Token de Mercado Pago. **Nunca** con prefijo `VITE_` |
| `SUPABASE_URL` / `SUPABASE_SERVICE_KEY` | Server (secreto) | No (pendiente) | Sólo para el webhook de compras |

> Las variables `VITE_*` se **exponen al cliente** en el build. La anon key de
> Supabase es pública por diseño (sólo puede insertar; ver RLS en el schema).
> `MP_ACCESS_TOKEN` y `SUPABASE_SERVICE_KEY` son **secretos** y van sólo
> server-side (funciones en `api/`).

## Comandos disponibles

| Comando | Qué hace |
|---|---|
| `npm run dev` | Server de desarrollo (puerto 3000) |
| `npm run build` | Build de producción a `dist/` |
| `npm run preview` | Previsualiza el build |
| `npm run lint` | Chequeo de tipos (`tsc --noEmit`) |
| `npm run test` | Tests unitarios del motor (Vitest, una corrida) |
| `npm run test:watch` | Tests unitarios en modo watch |
| `npm run test:e2e` | Tests E2E (Playwright) |
| `npm run test:e2e:ui` | Tests E2E en modo UI |
| `npm run check` | `lint` + `test` + `build` (verificación rápida pre-deploy) |
| `npm run check:full` | `check` + `test:e2e` |
| `npm run diagnose` | Diagnóstico estadístico del motor (sesgo, identificabilidad, diversidad) |
| `npm run diagnose:adaptive` | Validación de la fase adaptativa (desempates) |

## Estructura del proyecto

```
api/                      Funciones serverless de Vercel (Mercado Pago — pendiente)
  _lib.ts                Helpers de las funciones (validación, errores, parseo)
docs/security.md          Modelo de datos, RLS, secrets y pendientes de seguridad
public/                   Assets estáticos y páginas estáticas
scripts/                  Diagnóstico estadístico del motor (no se deployan)
src/
  components/             Landing (Hero, FAQ, Testimonios, etc.)
  services/
    leads.ts             Captura de leads/resultados → Supabase (con cola offline)
    payments.ts          Cobro con Mercado Pago (aislado — pendiente)
    storage.ts           Helpers tipados de localStorage (progreso/resultado)
  test/                   El test vocacional (no confundir con tests de código)
    data/                 Preguntas, arquetipos, carreras, salarios, provincias
    engine/              Motor de scoring determinístico
      signals.ts         Respuestas → vector de señales latentes
      archetypeEmergence.ts  Vector → emergencia de los 12 arquetipos
      scorer.ts          calcularResultado(): orquesta todo el cálculo
      adaptive.ts        Fase adaptativa (preguntas de desempate)
      recommender.ts     recomendar(): ranking de carreras
      confidence.ts      Cálculo del % de confianza
    screens/             Pantallas del flujo (TestRunner, Resultado, etc.)
    __tests__/           Tests unitarios y de regresión del motor (Vitest)
  App.tsx                Router de la SPA (landing ↔ test ↔ resultado)
supabase/schema.sql      Esquema + políticas RLS
e2e/                      Tests end-to-end (Playwright)
vercel.json              Configuración de deploy (único target)
```

## Cómo funciona el test (flujo)

1. **Landing** → el usuario hace click en *Iniciar test*.
2. **Perfil** → nombre, email, edad, provincia y movilidad (`ProfileCapture`).
3. **Preguntas núcleo** (18) → situaciones reales, no preferencias abstractas.
4. **Fase adaptativa** (0–5 preguntas) → si los arquetipos punteros quedan
   peleados, el motor elige preguntas que mejor los discriminan ([`adaptive.ts`](src/test/engine/adaptive.ts)).
5. **Cálculo** → [`calcularResultado()`](src/test/engine/scorer.ts) produce el
   vector de señales, hace emerger los 12 arquetipos, calcula confianza y
   tensiones; [`recomendar()`](src/test/engine/recommender.ts) arma el ranking de
   carreras con universidades de la provincia del usuario.
6. **Resultado** → arquetipo primario/secundario + carreras recomendadas.
   El detalle ampliado (informe) es el producto pago (Mercado Pago — pendiente).

El progreso y el resultado se guardan en `localStorage` mediante helpers tipados
([`src/services/storage.ts`](src/services/storage.ts)) para sobrevivir a un refresh.

## Arquitectura e infraestructura

```
Usuario ──HTTPS──► Vercel
                    ├─ Frontend (SPA Vite/React, build estático servido por Vercel)
                    │   • Vercel maneja dominio + HTTPS + headers (vercel.json)
                    └─ /api/* (Vercel Serverless Functions, Node)
                        • create-preference / verify-payment / mp-webhook (MP — pendiente)
                        • helpers comunes en api/_lib.ts (validación, errores)
                                   │
                                   ▼
                              Supabase (Postgres + REST)
                              • leads, test_results, purchases
                              • anon key pública; la seguridad la da RLS
```

- **Frontend:** Vercel sirve la SPA y gestiona el dominio y el HTTPS.
- **Backend:** las rutas de `api/` corren como **Vercel Serverless Functions** (no hay server propio).
- **Base de datos:** Supabase guarda leads/resultados. La **anon key es pública por diseño**; lo que protege los datos es **RLS** (ver más abajo y `docs/security.md`).

**Pendiente de infraestructura:** dominio propio, URLs finales de SEO, integración
de Mercado Pago, y rate limiting / captcha server-side. Detalle en
[`docs/security.md`](docs/security.md).

## Supabase

Captura **anónima** de leads y resultados vía la API REST de Supabase (sin SDK,
para no inflar el bundle). Ver detalle en [`supabase/schema.sql`](supabase/schema.sql):

- **Tablas:** `leads`, `test_results`, `purchases` (esta última sólo la usa el
  webhook de pagos — pendiente).
- **RLS:** la anon key sólo puede **INSERT** (no leer). Las policies deben estar
  activas antes del primer deploy.
- **Frontend:** sólo inserta (nunca lee). Si falla la red o no hay config, el
  insert se encola en `localStorage` y se reintenta.

## Pagos (Mercado Pago) — PENDIENTE

⚠️ **El cobro con Mercado Pago NO está integrado de forma productiva.** El código
está **aislado y documentado** pero no debe activarse en producción todavía:

- `VITE_PAYMENTS_ENABLED` debe quedar en `false`. Con cobro deshabilitado la UI
  usa un flujo de "reserva" sin cobrar.
- Las funciones de [`api/`](api) (`create-preference`, `verify-payment`,
  `mp-webhook`) son un **esqueleto** que requiere completar y endurecer antes de
  cobrar de verdad (validación de monto/plan/`external_reference`, webhook
  confiable, persistencia segura de compras). Ver los `TODO` en cada archivo y la
  sección *Pendientes* de [`PRODUCT.md`](PRODUCT.md).

**No publiques el sitio con `VITE_PAYMENTS_ENABLED=true` hasta cerrar esa
integración.**

## Deploy soportado

**Vercel.** Netlify y otros proveedores **no están soportados**.
</invoke>
