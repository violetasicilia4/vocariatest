# Analytics — plan de eventos

**Estado: capa interna NO-OP implementada** en `src/services/analytics.ts`
(`track(event, props?)`). **No** hay vendor, **no** hay llamadas de red y en
producción es no-op. En desarrollo, con `VITE_ANALYTICS_DEBUG=true`, loguea los
eventos por consola (sólo datos técnicos/agregados, sin PII) para verificar el
funnel. Cuando se decida un proveedor cookieless, se enchufa en un único lugar
(el `TODO(analytics)` dentro de `track`), idealmente gateado por el consentimiento
que ya pide `ProfileCapture`.

Los eventos ya están conectados en puntos de bajo riesgo (ver "Puntos conectados"
más abajo). La tabla siguiente es el contrato de nombres/propiedades.

## Principios

- **Sin PII en los eventos.** Nunca enviar email, nombre ni respuestas. Sólo
  ids/categorías agregadas (igual criterio que `vocaria_progress` en storage).
- **Una sola capa fina.** Una función `track(event, props?)` que hoy puede ser
  no-op / `console.debug` y mañana enchufar un proveedor. Así no se esparcen
  llamados a un vendor por todo el código.
- **Respetar consentimiento.** El tracking de marketing debería gatearse por el
  mismo consentimiento que ya se pide en `ProfileCapture`.
- **Cookieless primero.** Preferir una opción sin cookies (p. ej. Plausible o
  Vercel Web Analytics) para minimizar fricción legal. Evaluar antes de sumar
  dependencia (la restricción actual es no agregar vendors todavía).

## Eventos (funnel) — contrato actual

Nombres definidos como union type `AnalyticsEvent` en `src/services/analytics.ts`.
Propiedades acotadas por `AnalyticsProps` (sólo datos técnicos/agregados, sin PII).

| Evento | Cuándo dispara | Propiedades | Métrica que habilita |
|---|---|---|---|
| `landing_viewed` | Carga la landing | `viewport` | Tráfico, mobile/desktop |
| `cta_clicked` | Click en un CTA "Empezar mi test" | `viewport` | Landing → test |
| `test_started` | Se completa el perfil y arranca el test | — | Inicio efectivo del test |
| `profile_completed` | Se completa el paso de perfil | — | Fricción del formulario |
| `question_answered` | Se responde una pregunta | `index`, `phase` (core/adaptive) | Dónde se abandona |
| `checkpoint_seen` | Se cruza un checkpoint del test | `index` (umbral %) | Progreso por hitos |
| `test_completed` | Termina el cálculo del resultado | `archetype` (id, no PII) | Tasa de finalización |
| `result_preview_seen` | Se muestra el preview del resultado | — | Demanda por resultado |
| `payment_attempt_blocked` | Reserva con pagos OFF (intento de compra) | `plan`, `reason` | Demanda con pagos desactivados |
| `error_boundary_shown` | Un ErrorBoundary mostró su fallback | — | Salud / errores de UI |

Propiedades permitidas (ver `AnalyticsProps`): `index`, `phase`, `archetype`,
`viewport`, `source`, `plan`, `reason`, `flags`. **Nunca** email, nombre ni edad
exacta. Antes de loguear, `track` filtra a estas claves (defensa en profundidad).

## Puntos conectados (estado actual)

| Evento | Archivo |
|---|---|
| `landing_viewed`, `cta_clicked` | `src/App.tsx` |
| `profile_completed`, `test_started`, `test_completed`, `result_preview_seen` | `src/test/TestFlow.tsx` |
| `question_answered`, `checkpoint_seen` | `src/test/screens/TestRunner.tsx` |
| `payment_attempt_blocked` | `src/test/screens/CheckoutScreen.tsx` |
| `error_boundary_shown` | `src/components/ErrorBoundary.tsx` |

Todas las llamadas son fire-and-forget (con `try/catch` interno en `track`): si
el tracking falla, la navegación no se interrumpe. Para conectar un proveedor,
completar el `TODO(analytics)` dentro de `track` — un solo lugar.
