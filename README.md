# Vocaria — Test vocacional para Argentina

Landing + test vocacional que cruza el patrón de pensamiento del usuario con
carreras universitarias argentinas reales. El motor de scoring es determinístico
(no usa IA en esta versión). Captura de leads/resultados con Supabase y cobro de
informes con Mercado Pago.

## Stack

- **Frontend:** Vite + React 19 + TypeScript + Tailwind CSS v4
- **Datos:** Supabase (REST, sólo INSERT anónimo — ver `supabase/schema.sql`)
- **Pagos:** Mercado Pago (Checkout Pro) vía funciones serverless en `api/`
- **Deploy:** Vercel o Netlify (config en `vercel.json` / `netlify.toml`)

## Correr localmente

**Requisitos:** Node.js 18+

1. Instalá dependencias:
   `npm install`
2. Copiá `.env.example` a `.env.local` y completá las variables que necesites
   (Supabase y/o Mercado Pago). La app funciona sin ellas: si Supabase no está
   configurado, los leads se encolan en `localStorage` y se reintentan.
3. Levantá el server de desarrollo:
   `npm run dev`

## Scripts

- `npm run dev` — server de desarrollo (puerto 3000)
- `npm run build` — build de producción a `dist/`
- `npm run preview` — previsualiza el build
- `npm run lint` — chequeo de tipos (`tsc --noEmit`)

## Variables de entorno

Ver `.env.example`. Las `VITE_*` se exponen al cliente; el `MP_ACCESS_TOKEN` y la
`SUPABASE_SERVICE_KEY` son secretos y van sólo server-side.
