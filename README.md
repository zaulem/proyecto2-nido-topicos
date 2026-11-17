# Nido — Sistema de reservas para coworking

**Curso:** Tópicos Especiales II · **Profesor:** Regis Rivera · **Grupo:** 1GS242  
**Repositorio:** https://github.com/zaulem/proyecto2-nido-topicos

Nido convierte la búsqueda de un espacio de trabajo en una reserva clara, rápida y sin cruces de horario. El proyecto demuestra el recorrido exigido por la asignación: **ODD → SDD → código → pruebas → valor para el usuario**.

## Ejecutar

Requiere Node.js 18+.

```bash
npm install
npm start
```

Abrir `http://localhost:3000`.

> La interfaz consume la API del servidor Node. Abrir `public/index.html` directamente o con Live Server muestra el diseño, pero no permite consultar ni crear reservas.

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

Grupo de **2 integrantes** (acordado con el profesor); en cada ciclo un integrante asume dos de los tres roles y los roles rotan entre ciclos.

| Integrante | Ciclo 1 (base) | Ciclo 2 (cambio audiovisual) | Ciclo 3 (pruebas y reglas) |
|---|---|---|---|
| Nicolas Athanasiadis | Product / Spec Lead · Architecture / Development Lead | Architecture / Development Lead · QA / DevOps Lead | Product / Spec Lead |
| Samuel Saenz | QA / DevOps Lead | Product / Spec Lead | Architecture / Development Lead · QA / DevOps Lead |

## Proceso

Cada cambio parte de un issue, se trabaja en una rama, se revisa con `npm test` y se integra en `main` mediante merge o Pull Request. Evidencia en `docs/git-evidence.md` y `docs/requirements-change.md`.
