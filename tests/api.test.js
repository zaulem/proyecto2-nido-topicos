import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from '../src/server.js';
import { ReservationStore } from '../src/domain.js';

let server;
let baseUrl;

const valid = { name: 'Ana Pérez', email: 'ana@example.com', spaceId: 'desk', date: '2099-01-20', time: '10:00', duration: 2, addOns: [] };

before(async () => {
  server = createServer(new ReservationStore());
  await new Promise((resolve) => server.listen(0, resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => new Promise((resolve) => server.close(resolve)));

const post = (body) => fetch(`${baseUrl}/api/reservations`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
});

test('AC-01: la API expone al menos cuatro espacios con precio y capacidad', async () => {
  const response = await fetch(`${baseUrl}/api/spaces`);
  assert.equal(response.status, 200);
  const { spaces } = await response.json();
  assert.ok(spaces.length >= 4);
  for (const space of spaces) {
    assert.equal(typeof space.price, 'number');
    assert.equal(typeof space.capacity, 'number');
  }
});

test('AC-02: una reserva válida devuelve 201 con identificador', async () => {
  const response = await post(valid);
  assert.equal(response.status, 201);
  const { reservation } = await response.json();
  assert.match(reservation.id, /^res_/);
  assert.equal(reservation.status, 'confirmed');
});

test('AC-03: un correo inválido devuelve 400 y no crea la reserva', async () => {
  const before = (await (await fetch(`${baseUrl}/api/reservations`)).json()).reservations.length;
  const response = await post({ ...valid, email: 'no-es-correo', spaceId: 'pod' });
  assert.equal(response.status, 400);
  const { details } = await response.json();
  assert.ok(details.email);
  const afterCount = (await (await fetch(`${baseUrl}/api/reservations`)).json()).reservations.length;
  assert.equal(afterCount, before);
});

test('AC-04: una reserva solapada del mismo espacio devuelve 409', async () => {
  const response = await post({ ...valid, email: 'otra@example.com', time: '11:00' });
  assert.equal(response.status, 409);
});

test('AC-05: una reserva contigua es aceptada', async () => {
  const response = await post({ ...valid, email: 'otra@example.com', time: '12:00' });
  assert.equal(response.status, 201);
});

test('AC-06: el total refleja duración y equipo audiovisual', async () => {
  const response = await post({ ...valid, spaceId: 'focus', duration: 4, addOns: ['screen'] });
  const { reservation } = await response.json();
  assert.equal(reservation.total, 14 * 4 + 5);
});

test('AC-07: cancelar con correo ajeno no modifica la reserva', async () => {
  const { reservation } = await (await post({ ...valid, spaceId: 'studio' })).json();
  const cancel = (email) => fetch(`${baseUrl}/api/reservations/${reservation.id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  assert.equal((await cancel('intruso@example.com')).status, 404);
  const { reservations } = await (await fetch(`${baseUrl}/api/reservations`)).json();
  assert.equal(reservations.find((item) => item.id === reservation.id).status, 'confirmed');
  assert.equal((await cancel(valid.email)).status, 200);
});
