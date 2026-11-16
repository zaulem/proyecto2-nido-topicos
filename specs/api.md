# API

| Método | Ruta | Resultado |
|---|---|---|
| GET | `/api/spaces` | Espacios y extras disponibles |
| GET | `/api/reservations` | Reservas del prototipo |
| POST | `/api/reservations` | Crea una reserva; `400` datos inválidos, `409` conflicto |
| DELETE | `/api/reservations/:id` | Cancela con `{ "email": "..." }` |

El POST recibe `name`, `email`, `spaceId`, `date`, `time`, `duration` y `addOns`.
