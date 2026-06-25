# Product

## Register

brand

## Users

Jóvenes argentinos de 17–25 años que enfrentan la elección de carrera universitaria. Están estresados, indecisos, con demasiadas opciones o con la sensación de haber elegido mal. Usan el dispositivo móvil como primer punto de contacto. Pueden ser estudiantes de último año de secundaria, universitarios que quieren cambiar, o personas que buscan reorientarse. No tienen tiempo ni dinero para una orientación vocacional profesional tradicional.

## Product Purpose

Vocaria es un test vocacional freemium basado en situaciones reales (no preferencias abstractas) que detecta el patrón de pensamiento del usuario y lo cruza con carreras universitarias argentinas reales, incluyendo universidades y contexto laboral. El objetivo de la landing es capturar emails para waitlist y convertir visitas en inicio del test. El test real con IA (Gemini) está en desarrollo. Éxito = el usuario entiende el valor en 10 segundos y quiere empezar.

## Brand Personality

Confiable, clara, premium-accesible. Tono directo y honesto, sin exageración. Ni clínico ni juvenil. Más cerca de una herramienta inteligente que de un test de personalidad.

## Anti-references

- Horóscopo vibes: misticismo, colores saturados cálidos, promesas vagas de "descubrir tu destino"
- Escolar/infantil: ilustraciones tipo colegial, paletas pastel, fuentes redondeadas, tono condescendiente
- Genérico SaaS: plantilla con hero metric, gradiente azul-morado, mismo card grid de siempre
- Trucho/spam: testimonios falsos obvios, urgencia artificial, badges de "más de 10.000 usuarios"
- BuzzFeed quiz: energía casual, opciones chistosas, diseño caótico

## Design Principles

1. **Muestra, no prometas.** El mockup de resultado en el hero vale más que cualquier claim. Cada sección demuestra algo concreto del producto.
2. **Claridad sobre creatividad.** Si hay que elegir entre un efecto visual y que el usuario entienda el valor, gana la claridad.
3. **Credibilidad sin jactancia.** Las universidades reales, los porcentajes de match, el contexto laboral: todo ancla la confianza. Evitar afirmaciones sin respaldo.
4. **Progresión natural.** La narrativa avanza: problema → solución → prueba → confianza → acción. Cada sección empuja a la siguiente.
5. **Mobile-first de verdad.** El usuario probable llega desde el celular. Los espacios, el texto y los CTAs deben funcionar perfectamente ahí primero.

## Accessibility & Inclusion

WCAG AA. Reduced motion respetado. Texto con contraste adecuado en todos los fondos (especialmente sobre los gradientes del hero y la sección dark). Interactividad accesible por teclado en FAQ y MuestraTest.

## Pendientes

### Mercado Pago (no productivo)

El cobro con Mercado Pago **NO está integrado de forma productiva**. El código está aislado y documentado (`src/services/payments.ts`, `api/create-preference.ts`, `api/verify-payment.ts`, `api/mp-webhook.ts`) pero requiere endurecerse antes de cobrar de verdad. Mantener `VITE_PAYMENTS_ENABLED=false`. Checklist (ver `TODO(mp)` en el código):

- Validación server-side del pago (estado + autenticidad del webhook con `x-signature`).
- Comparación de `external_reference` contra el pedido pendiente del usuario.
- Validación de **monto** contra el precio del plan (un pago por menos no debe desbloquear el informe).
- Validación de **plan** (`metadata.plan_id` conocido y coincidente).
- Webhook confiable: idempotencia + uso de `SUPABASE_SERVICE_KEY` (no la anon key).
- Persistencia segura de compras (tabla `purchases` con RLS, sólo server-side).
- Manejo de estados de pago (pending → approved → refunded/charged_back).
- El frontend nunca debe aprobar un pago a partir de parámetros de la URL sin verificación server-side (ya endurecido en `PaymentReturn.tsx`).

### Otros

- Anti-abuso del INSERT anónimo de Supabase (rate-limiting / captcha si aparece spam).
- `noUncheckedIndexedAccess` / `exactOptionalPropertyTypes` en TS (mejora gradual de tipos).
- Optimización del asset `clear_blue_sky` (~353 KB) si se busca mejorar el LCP.
