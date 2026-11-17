# Evidencia del proceso Git

## Issues

- **#1 — Definir outcome y reglas de disponibilidad:** ODD, requisitos y reglas.
- **#2 — Implementar flujo de reservas:** API, interfaz y validaciones.
- **#3 — Incorporar extras audiovisuales:** cambio solicitado, pruebas y criterios actualizados.
- **#4 — Pruebas de aceptación sobre la API:** una prueba por criterio AC-01..AC-07.
- **#5 — Reglas de fecha y horario:** rechazar fechas pasadas y reservas que cruzan medianoche (AC-09).
- **#6 — Documentar equipo, roles y ejecución:** resuelto mediante Pull Request.

Issues publicados en https://github.com/zaulem/proyecto2-nido-topicos/issues

## Commits identificables

Commits con prefijos convencionales (`feat`, `docs`, `test`, `fix`). Ver `git log --oneline --graph`.

1. `feat: deliver nido coworking reservation project` — implementación base y documentación ODD/SDD.
2. `docs: verify project delivery requirements` — checklist de entrega.
3. `test: add API acceptance tests traced to AC-01..AC-07` — rama `test/acceptance-api`.
4. `fix: reject past dates and reservations crossing midnight` — rama `fix/reservation-time-rules`.
5. `docs: update process evidence` — rama `docs/process-evidence`.
6. `fix: use relative asset paths in index.html` — rama `fix/relative-asset-paths`.
7. `docs: add course info, team roles and run instructions` — rama `docs/team-roles`, PR #7.

## Ramas y revisión

- `main`: versión integrable; solo recibe merges revisados.
- `test/acceptance-api`, `fix/reservation-time-rules`, `docs/process-evidence`: ramas de trabajo integradas con `git merge --no-ff`, de modo que cada integración queda visible en el historial como un commit de merge.
- `docs/team-roles`: integrada mediante **Pull Request #7** en GitHub (https://github.com/zaulem/proyecto2-nido-topicos/pull/7), que cierra el issue #6.
- Criterio de revisión antes de cada merge: `npm test` en verde y specs/criterios actualizados.
- `feature/reservation-flow` y `change/audiovisual-equipment`: ramas creadas en la primera entrega; apuntan al commit base.

## Historial de cambios

Cada cambio de requerimiento se refleja en especificación, criterios, plan, código y pruebas. La matriz de evidencia está en `docs/requirements-change.md`.
