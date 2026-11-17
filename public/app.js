const state = { spaces: [], addOns: [] };
const $ = (selector) => document.querySelector(selector);
const money = (value) => `$${value.toFixed(0)}`;

async function load() {
  const response = await fetch('/api/spaces');
  const data = await response.json();
  state.spaces = data.spaces;
  state.addOns = data.addOns;
  $('#space-list').innerHTML = state.spaces.map((space, index) => `
    <article class="space-card ${index === 0 ? 'selected' : ''}" data-id="${space.id}" data-accent="${space.accent}">
      <div><div class="card-tag">0${index + 1} / ${space.category.toUpperCase()}</div><div class="card-icon">${['⌂', '◌', '▦', '◒'][index]}</div></div>
      <div><h3>${space.name}</h3><p>${space.description}</p><div class="card-price">${money(space.price)} / HORA · ${space.capacity} ${space.capacity === 1 ? 'PERSONA' : 'PERSONAS'}</div></div>
    </article>`).join('');
  $('#space-select').innerHTML = state.spaces.map((space) => `<option value="${space.id}">${space.name} · ${money(space.price)}/h</option>`).join('');
  $('#addon-list').innerHTML = state.addOns.map((addOn) => `<label class="addon"><input type="checkbox" value="${addOn.id}">${addOn.name} +${money(addOn.price)}</label>`).join('');
  document.querySelectorAll('.space-card').forEach((card) => card.addEventListener('click', () => {
    document.querySelectorAll('.space-card').forEach((item) => item.classList.remove('selected'));
    card.classList.add('selected');
    $('#space-select').value = card.dataset.id;
    updateTotal();
    $('#booking').scrollIntoView({ behavior: 'smooth' });
  }));
  document.querySelectorAll('.addon').forEach((addon) => addon.addEventListener('click', () => {
    addon.classList.toggle('active');
    updateTotal();
  }));
  $('#booking-form').addEventListener('input', updateTotal);
  $('#booking-form').addEventListener('submit', submitBooking);
  const date = new Date();
  date.setDate(date.getDate() + 1);
  $('#booking-form [name=date]').value = date.toISOString().slice(0, 10);
  updateTotal();
}

function updateTotal() {
  const space = state.spaces.find((item) => item.id === $('#space-select').value) ?? state.spaces[0];
  if (!space) return;
  const duration = Number($('#booking-form [name=duration]').value);
  const addOnTotal = [...document.querySelectorAll('.addon input:checked')].reduce((sum, input) => sum + state.addOns.find((item) => item.id === input.value).price, 0);
  $('#total').textContent = money(space.price * duration + addOnTotal);
}

async function submitBooking(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const payload = Object.fromEntries(form.entries());
  payload.addOns = [...document.querySelectorAll('.addon input:checked')].map((input) => input.value);
  const response = await fetch('/api/reservations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  const data = await response.json();
  const message = $('#form-message');
  if (!response.ok) {
    const details = data.details ? Object.values(data.details).join(' ') : '';
    message.textContent = details || data.error || 'Revisa los datos e intenta de nuevo.';
    message.style.color = 'var(--coral)';
    return;
  }
  message.textContent = `Reserva confirmada · ${data.reservation.id}`;
  message.style.color = 'var(--lime)';
  event.currentTarget.reset();
  document.querySelectorAll('.addon').forEach((addon) => addon.classList.remove('active'));
  updateTotal();
}

load().catch(() => { $('#form-message').textContent = 'No fue posible cargar los espacios.'; });
