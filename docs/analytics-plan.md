# Analytics — plan de eventos (propuesta)

**Estado: NO implementado.** Hoy la app no tiene analytics ni capa de tracking
(no hay `gtag`, Plausible, PostHog, etc.). Este documento define el plan mínimo
para cuando se decida instrumentar el funnel — **sin** comprometer todavía un
proveedor.

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

## Eventos recomendados (funnel)

| Evento | Cuándo dispara | Propiedades mínimas | Métrica que habilita |
|---|---|---|---|
| `landing_view` | Carga la landing | `referrer_kind` (direct/social/search) | Tráfico, fuentes |
| `cta_start_click` | Click en cualquier CTA "Empezar mi test" | `cta_location` (hero/narrativa/cierre/header) | Qué CTA convierte |
| `test_open` | Se abre el flujo del test (`TestFlow` montado) | — | Landing → test |
| `profile_submitted` | Se completa el paso de datos del perfil | `provincia_id`, `edad_band` | Fricción del formulario |
| `test_question_answered` | Se responde una pregunta | `index`, `phase` (core/adaptive) | Dónde se abandona |
| `test_completed` | Termina el cálculo y se muestra el resultado | `arquetipo_primario`, `confianza_band` | Tasa de finalización |
| `result_viewed` | Render de la pantalla de resultado | `arquetipo_primario` | Demanda por arquetipo |
| `checkout_view` | Se abre la pantalla de planes (`CheckoutScreen`) | `plan` | Intención de compra |
| `reserva_submitted` | Se registra la "reserva" (pagos OFF) | `plan` | Demanda con pagos desactivados |
| `payment_blocked` | Se intentó un cobro con pagos desactivados | `reason` (`payments_disabled`) | Detectar intentos prematuros |

`*_band` = valor agrupado (p. ej. `edad_band` = `16-18`/`19-24`/`25+`,
`confianza_band` = `alta`/`media`/`baja`) para no exponer datos finos.

## Cómo se implementaría (sketch, futuro)

```ts
// src/services/analytics.ts (propuesto)
type Props = Record<string, string | number | boolean>;
export function track(event: string, props?: Props): void {
  if (import.meta.env.DEV) console.debug('[track]', event, props ?? {});
  // TODO: enchufar proveedor cookieless cuando se decida (gateado por consent).
}
```

Mapear cada fila de la tabla a un único `track(...)` en el punto del código
indicado en la columna "Cuándo dispara". Mantener los nombres de evento estables
(son contrato con el dashboard).
