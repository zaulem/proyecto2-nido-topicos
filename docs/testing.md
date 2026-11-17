# Estrategia de pruebas

`npm test` ejecuta la suite nativa de Node (`node --test`), sin servicios externos.

## Niveles

- **Unitarias / reglas críticas** (`tests/domain.test.js`): validaciones, solapamiento, doble reserva, extras y cancelación.
- **Aceptación sobre la API** (`tests/api.test.js`): levanta el servidor HTTP en un puerto libre y verifica cada criterio `AC-xx` contra los endpoints reales.

## Trazabilidad criterio → prueba

| Criterio | Prueba automatizada |
|---|---|
| AC-01 | `AC-01: la API expone al menos cuatro espacios con precio y capacidad` |
| AC-02 | `AC-02: una reserva válida devuelve 201 con identificador` |
| AC-03 | `AC-03: un correo inválido devuelve 400 y no crea la reserva` · `valida campos obligatorios y correo` |
| AC-04 | `AC-04: una reserva solapada del mismo espacio devuelve 409` · `rechaza doble reserva del mismo espacio y franja` |
| AC-05 | `AC-05: una reserva contigua es aceptada` · `detecta rangos que se cruzan y permite rangos contiguos` |
| AC-06 | `AC-06: el total refleja duración y equipo audiovisual` · `calcula total incluyendo equipo audiovisual` |
| AC-07 | `AC-07: cancelar con correo ajeno no modifica la reserva` · `cancela únicamente la reserva del correo propietario` |
| AC-08 | Verificación manual en viewport móvil (DevTools, 375 px) |
| AC-09 | `AC-09: rechaza fechas pasadas y reservas que cruzan medianoche` |

## Regla obligatoria

La regla de **no permitir doble reserva** está cubierta en dos niveles: `rechaza doble reserva del mismo espacio y franja` (dominio) y `AC-04` (API, respuesta `409`).
