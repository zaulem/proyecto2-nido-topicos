import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ADD_ONS, ReservationStore, SPACES } from './domain.js';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'public');
const store = new ReservationStore([
  {
    id: 'res_demo_1', name: 'Demo Nido', email: 'demo@nido.test', spaceId: 'studio',
    date: '2099-12-31', time: '10:00', duration: 2, addOns: ['screen'], total: 61,
    status: 'confirmed', createdAt: new Date().toISOString()
  }
]);

function json(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(body));
}

async function body(request) {
  let raw = '';
  for await (const chunk of request) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}

async function serveStatic(request, response) {
  const requested = request.url === '/' ? '/index.html' : request.url.split('?')[0];
  const file = normalize(join(root, requested));
  if (!file.startsWith(root)) return json(response, 403, { error: 'Ruta no permitida.' });
  try {
    const data = await readFile(file);
    const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };
    response.writeHead(200, { 'Content-Type': `${types[extname(file)] ?? 'application/octet-stream'}; charset=utf-8` });
    response.end(data);
  } catch {
    json(response, 404, { error: 'Recurso no encontrado.' });
  }
}

const server = http.createServer(async (request, response) => {
  try {
    if (request.url === '/api/spaces' && request.method === 'GET') return json(response, 200, { spaces: SPACES, addOns: ADD_ONS });
    if (request.url === '/api/reservations' && request.method === 'GET') return json(response, 200, { reservations: store.list() });
    if (request.url === '/api/reservations' && request.method === 'POST') {
      const reservation = store.add(await body(request));
      return json(response, 201, { reservation });
    }
    if (request.url?.match(/^\/api\/reservations\/[^/]+$/) && request.method === 'DELETE') {
      const id = request.url.split('/').pop();
      const payload = await body(request);
      if (!store.cancel(id, payload.email ?? '')) return json(response, 404, { error: 'No se encontró una reserva cancelable.' });
      return json(response, 200, { ok: true });
    }
    return serveStatic(request, response);
  } catch (error) {
    if (error.code === 'VALIDATION_ERROR') return json(response, 400, { error: error.message, details: error.details });
    if (error.code === 'CONFLICT') return json(response, 409, { error: error.message });
    return json(response, 500, { error: 'Ocurrió un error inesperado.' });
  }
});

server.listen(process.env.PORT ?? 3000, () => {
  console.log(`Nido running at http://localhost:${process.env.PORT ?? 3000}`);
});
