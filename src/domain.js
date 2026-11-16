export const SPACES = [
  { id: 'desk', name: 'Hot desk', category: 'Escritorio flexible', capacity: 1, price: 8, accent: 'citrus', description: 'Un puesto ergonómico junto a la luz natural.' },
  { id: 'focus', name: 'Focus room', category: 'Sala privada', capacity: 2, price: 14, accent: 'berry', description: 'Silencio total para conversaciones que importan.' },
  { id: 'studio', name: 'Studio room', category: 'Sala de reunión', capacity: 8, price: 28, accent: 'sky', description: 'La sala lista para presentar, crear y decidir.' },
  { id: 'pod', name: 'Sound pod', category: 'Cabina acústica', capacity: 1, price: 10, accent: 'violet', description: 'Privacidad instantánea para tu próxima llamada.' }
];

export const ADD_ONS = [
  { id: 'screen', name: 'Pantalla 4K', price: 5 },
  { id: 'whiteboard', name: 'Pizarra móvil', price: 3 },
  { id: 'camera', name: 'Cámara híbrida', price: 7 }
];

export function getSpace(spaceId) {
  return SPACES.find((space) => space.id === spaceId);
}

export function validateReservation(input) {
  const errors = {};
  if (!input.name?.trim()) errors.name = 'Escribe tu nombre.';
  if (!input.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.email = 'Usa un correo válido.';
  }
  if (!getSpace(input.spaceId)) errors.spaceId = 'Selecciona un espacio válido.';
  if (!input.date || !/^\d{4}-\d{2}-\d{2}$/.test(input.date)) errors.date = 'Selecciona una fecha.';
  if (!input.time || !/^([01]\d|2[0-3]):[0-5]\d$/.test(input.time)) errors.time = 'Selecciona una hora.';
  const duration = Number(input.duration);
  if (![1, 2, 4, 8].includes(duration)) errors.duration = 'La duración no es válida.';
  if (input.addOns && (!Array.isArray(input.addOns) || input.addOns.some((id) => !ADD_ONS.some((addOn) => addOn.id === id)))) {
    errors.addOns = 'El equipo adicional no es válido.';
  }
  return errors;
}

export function overlaps(a, b) {
  if (a.date !== b.date || a.spaceId !== b.spaceId) return false;
  const startA = toMinutes(a.time);
  const endA = startA + Number(a.duration) * 60;
  const startB = toMinutes(b.time);
  const endB = startB + Number(b.duration) * 60;
  return startA < endB && startB < endA;
}

export function toMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function createReservation(input) {
  const errors = validateReservation(input);
  if (Object.keys(errors).length) {
    const error = new Error('La reserva tiene datos inválidos.');
    error.code = 'VALIDATION_ERROR';
    error.details = errors;
    throw error;
  }
  const selectedAddOns = (input.addOns ?? []).map((id) => ADD_ONS.find((addOn) => addOn.id === id));
  const total = getSpace(input.spaceId).price * Number(input.duration) + selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
  return {
    id: `res_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    spaceId: input.spaceId,
    date: input.date,
    time: input.time,
    duration: Number(input.duration),
    addOns: input.addOns ?? [],
    total,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };
}

export class ReservationStore {
  constructor(initial = []) {
    this.reservations = [...initial];
  }

  list() {
    return [...this.reservations];
  }

  isAvailable(candidate) {
    return !this.reservations.some((reservation) => reservation.status === 'confirmed' && overlaps(reservation, candidate));
  }

  add(input) {
    const reservation = createReservation(input);
    if (!this.isAvailable(reservation)) {
      const error = new Error('Ese espacio ya está reservado en la franja seleccionada.');
      error.code = 'CONFLICT';
      throw error;
    }
    this.reservations.push(reservation);
    return reservation;
  }

  cancel(id, email) {
    const index = this.reservations.findIndex((reservation) => reservation.id === id && reservation.email === email.toLowerCase());
    if (index === -1) return false;
    this.reservations[index] = { ...this.reservations[index], status: 'cancelled' };
    return true;
  }
}
