# Evidencia de ejecución

Fecha: 2026-11-16 · Node v24.21.0

```text
$ npm test
✔ AC-01: la API expone al menos cuatro espacios con precio y capacidad
✔ AC-02: una reserva válida devuelve 201 con identificador
✔ AC-03: un correo inválido devuelve 400 y no crea la reserva
✔ AC-04: una reserva solapada del mismo espacio devuelve 409
✔ AC-05: una reserva contigua es aceptada
✔ AC-06: el total refleja duración y equipo audiovisual
✔ AC-07: cancelar con correo ajeno no modifica la reserva
✔ valida campos obligatorios y correo
✔ AC-09: rechaza fechas pasadas y reservas que cruzan medianoche
✔ detecta rangos que se cruzan y permite rangos contiguos
✔ rechaza doble reserva del mismo espacio y franja
✔ permite reservar otro espacio en la misma franja
✔ calcula total incluyendo equipo audiovisual
✔ cancela únicamente la reserva del correo propietario
ℹ tests 14
ℹ suites 0
ℹ pass 14
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
```
