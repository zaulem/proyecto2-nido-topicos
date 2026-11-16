# Modelo de datos

## Reservation

`id`, `name`, `email`, `spaceId`, `date`, `time`, `duration`, `addOns[]`, `total`, `status`, `createdAt`.

## Space

`id`, `name`, `category`, `capacity`, `price`, `accent`, `description`.

## AddOn

`id`, `name`, `price`.

El prototipo utiliza almacenamiento en memoria, por lo que reiniciar el proceso reinicia las reservas.
