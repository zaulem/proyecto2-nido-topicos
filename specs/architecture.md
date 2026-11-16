# Arquitectura

## Decisión tecnológica

Se eligió **Node.js 18+ con módulos ES, HTTP nativo y HTML/CSS/JavaScript vanilla**. No se usa framework ni base de datos para mantener el alcance demostrable, reducir dependencias y hacer que el evaluador pueda ejecutar el proyecto con `npm install && npm test`.

## Capas

- `src/domain.js`: entidades, reglas, validaciones y almacenamiento en memoria.
- `src/server.js`: API HTTP y entrega de archivos estáticos.
- `public/`: interfaz responsive.
- `tests/`: pruebas del dominio.

## Evolución

En producción, `ReservationStore` se sustituiría por un repositorio PostgreSQL con una restricción de exclusión por espacio y rango horario. La interfaz del dominio permanecería igual.
