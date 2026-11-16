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

## Equipo y proceso

El repositorio está preparado para demostrar issues, commits identificables, ramas y Pull Request. Los roles del curso se rotan entre Product/Spec Lead, Architecture/Development Lead y QA/DevOps Lead.
