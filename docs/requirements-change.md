# Evidencia de cambio de especificación

## Cambio 1 — Equipo audiovisual

### Solicitud inesperada

Durante el desarrollo se solicitó: “El cliente debe poder agregar equipo audiovisual a la reserva, con costo adicional”.

### Especificación actualizada

- `specs/requirements.md`: se agregó el requisito funcional 5.
- `specs/data-model.md`: `Reservation.addOns[]` y `AddOn`.
- `specs/api.md`: el POST acepta `addOns`.
- `specs/acceptance-criteria.md`: AC-06.
- `specs/implementation-plan.md`: paso 7.

### Implementación

- `src/domain.js`: catálogo de extras y cálculo de total.
- `public/index.html`: selector visual.
- `public/app.js`: actualización dinámica del total.

### Verificación

- Prueba automatizada: `calcula total incluyendo equipo audiovisual`.
- La interfaz muestra el total actualizado antes de confirmar.

## Cambio 2 — Reglas de fecha y horario

### Solicitud

Durante la revisión se detectó que una reserva podía cruzar medianoche (p. ej. 20:00 + 8 h) sin ser comparada con el día siguiente, y que se aceptaban fechas pasadas.

### Ciclo aplicado

| Paso | Evidencia |
|---|---|
| Actualizar especificación | `specs/business-rules.md`: reglas 7 y 8 |
| Actualizar criterios | `specs/acceptance-criteria.md`: AC-09 |
| Modificar código | `src/domain.js` (`validateReservation`, `today`) y `public/app.js` (motivo del rechazo visible) |
| Modificar pruebas | `AC-09: rechaza fechas pasadas y reservas que cruzan medianoche` |
| Ver resultados | `docs/testing-evidence.md` |
| Integración | rama `fix/reservation-time-rules` → merge en `main` |
