# Evidencia del proceso Git

## Issues propuestos

- **#1 — Definir outcome y reglas de disponibilidad:** ODD, requisitos y reglas.
- **#2 — Implementar flujo de reservas:** API, interfaz y validaciones.
- **#3 — Incorporar extras audiovisuales:** cambio solicitado, pruebas y criterios actualizados.

## Commits identificables

La entrega se organiza en commits separados para que el profesor pueda revisar el recorrido:

1. `docs: define ODD and SDD for coworking reservations`
2. `feat: implement reservation API and interface`
3. `change: add audiovisual equipment requirement`
4. `test: cover critical reservation rules`

## Ramas y revisión equivalente

- `main`: versión integrable de la entrega.
- `feature/reservation-flow`: implementación del flujo base.
- `change/audiovisual-equipment`: cambio de especificación.
- Revisión equivalente a Pull Request: comparar la rama de cambio contra `main`, revisar `docs/requirements-change.md` y ejecutar `npm test` antes de integrar.

## Historial de cambios

Cada cambio de requerimiento se refleja en especificación, criterios, plan, código y pruebas. La matriz de evidencia está en `docs/requirements-change.md`.
