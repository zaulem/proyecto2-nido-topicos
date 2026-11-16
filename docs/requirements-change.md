# Evidencia de cambio de especificación

## Solicitud inesperada

Durante el desarrollo se solicitó: “El cliente debe poder agregar equipo audiovisual a la reserva, con costo adicional”.

## Especificación actualizada

- `specs/requirements.md`: se agregó el requisito funcional 5.
- `specs/data-model.md`: `Reservation.addOns[]` y `AddOn`.
- `specs/api.md`: el POST acepta `addOns`.
- `specs/acceptance-criteria.md`: AC-06.
- `specs/implementation-plan.md`: paso 7.

## Implementación

- `src/domain.js`: catálogo de extras y cálculo de total.
- `public/index.html`: selector visual.
- `public/app.js`: actualización dinámica del total.

## Verificación

- Prueba automatizada: `calcula total incluyendo equipo audiovisual`.
- La interfaz muestra el total actualizado antes de confirmar.
