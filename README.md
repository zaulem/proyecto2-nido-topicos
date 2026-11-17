# Nido — Sistema de reservas para coworking

Nido convierte la búsqueda de un espacio de trabajo en una reserva clara, rápida y sin cruces de horario. El proyecto demuestra el recorrido exigido por la asignación: **ODD → SDD → código → pruebas → valor para el usuario**.

## Ejecutar

Requiere Node.js 18+.

```bash
npm install
npm start
```

Abrir `http://localhost:3000`.

## Pruebas

```bash
npm test
```

## Funcionalidades demostrables

- Consulta de espacios disponibles por fecha, hora y duración.
- Reserva de escritorio, sala y cabina con validación de datos.
- Prevención de doble reserva en la misma franja.
- Cancelación de reservas propias.
- Requerimiento cambiado durante el desarrollo: la reserva ahora permite seleccionar equipo audiovisual adicional.

## Estructura

Las decisiones, reglas, arquitectura, criterios, plan, bitácora de IA, pruebas y cambio de especificación se encuentran en `specs/` y `docs/`.

Las pruebas incluyen reglas de dominio y criterios de aceptación (`AC-xx`) ejecutados contra la API. La trazabilidad criterio → prueba está en `docs/testing.md`.

## Equipo y roles

| Integrante | Ciclo 1 (base) | Ciclo 2 (cambio audiovisual) | Ciclo 3 (pruebas y reglas) |
|---|---|---|---|
| _Por completar_ | Product / Spec Lead | Architecture / Development Lead | QA / DevOps Lead |
| _Por completar_ | Architecture / Development Lead | QA / DevOps Lead | Product / Spec Lead |
| _Por completar_ | QA / DevOps Lead | Product / Spec Lead | Architecture / Development Lead |

## Proceso

Cada cambio se trabaja en una rama, se revisa con `npm test` y se integra en `main` con merge. Evidencia en `docs/git-evidence.md` y `docs/requirements-change.md`.
