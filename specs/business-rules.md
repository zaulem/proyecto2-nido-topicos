# Reglas de negocio

1. Las duraciones válidas son 1, 2, 4 u 8 horas.
2. Una reserva se considera activa mientras `status = confirmed`.
3. Dos reservas se cruzan únicamente si pertenecen al mismo espacio y fecha y sus intervalos tienen intersección real.
4. Una reserva que termina a las 12:00 no bloquea otra que inicia a las 12:00.
5. El total es `precio del espacio × duración + extras`.
6. Solo el correo que creó la reserva puede cancelarla.
