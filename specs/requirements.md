# SDD — Requisitos

## Actores

- **Visitante:** consulta espacios y precios.
- **Cliente:** crea o cancela una reserva propia.
- **Sistema:** valida, calcula y protege la disponibilidad.

## Requisitos funcionales

1. Mostrar espacios con categoría, capacidad, descripción y precio por hora.
2. Permitir seleccionar fecha, hora, duración y espacio.
3. Validar nombre, correo, fecha, hora y duración.
4. Rechazar cualquier reserva que se solape con otra activa del mismo espacio.
5. Calcular el total por duración y extras.
6. Confirmar con identificador único.
7. Cancelar usando identificador y correo del propietario.

## No funcionales

- Interfaz responsive y accesible con etiquetas y estados.
- API JSON simple y stateless en la capa HTTP.
- Pruebas automatizadas ejecutables sin servicios externos.
