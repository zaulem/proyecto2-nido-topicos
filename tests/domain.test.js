import test from 'node:test';
import assert from 'node:assert/strict';
import { ReservationStore, createReservation, overlaps, validateReservation } from '../src/domain.js';

const valid = { name: 'Ana Pérez', email: 'ana@example.com', spaceId: 'desk', date: '2099-01-20', time: '10:00', duration: 2, addOns: [] };

test('valida campos obligatorios y correo', () => {
  const errors = validateReservation({ ...valid, name: '', email: 'no-es-correo' });
  assert.equal(errors.name, 'Escribe tu nombre.');
  assert.equal(errors.email, 'Usa un correo válido.');
});

test('detecta rangos que se cruzan y permite rangos contiguos', () => {
  assert.equal(overlaps(valid, { ...valid, time: '11:00' }), true);
  assert.equal(overlaps(valid, { ...valid, time: '12:00' }), false);
});

test('rechaza doble reserva del mismo espacio y franja', () => {
  const store = new ReservationStore();
  store.add(valid);
  assert.throws(() => store.add({ ...valid, email: 'otra@example.com', time: '11:00' }), { code: 'CONFLICT' });
});

test('permite reservar otro espacio en la misma franja', () => {
  const store = new ReservationStore();
  store.add(valid);
  const reservation = store.add({ ...valid, email: 'otra@example.com', spaceId: 'focus' });
  assert.equal(reservation.status, 'confirmed');
});

test('calcula total incluyendo equipo audiovisual', () => {
  const reservation = createReservation({ ...valid, duration: 2, addOns: ['screen', 'camera'] });
  assert.equal(reservation.total, 28);
});

test('cancela únicamente la reserva del correo propietario', () => {
  const store = new ReservationStore();
  const reservation = store.add(valid);
  assert.equal(store.cancel(reservation.id, 'otro@example.com'), false);
  assert.equal(store.cancel(reservation.id, valid.email), true);
  assert.equal(store.list()[0].status, 'cancelled');
});
