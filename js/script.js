// ==========================================================
// Братский авторазбор – меню на телефоне и форма заявки
// ==========================================================

// Номер WhatsApp для заявок: только цифры, без +, пробелов и скобок
const WHATSAPP_NUMBER = '79081045891';

// ----- Меню-«бургер» на телефоне -----
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

function closeMenu() {
  nav.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Открыть меню');
}

burger.addEventListener('click', function () {
  const isOpen = nav.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(isOpen));
  burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
});

// Закрываем меню после выбора пункта
nav.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', closeMenu);
});

// ----- Форма заявки: собирает текст и открывает WhatsApp -----
const form = document.getElementById('request-form');
const errorBox = document.getElementById('form-error');
const successBox = document.getElementById('form-success');
const field = function (fieldName) { return form.elements.namedItem(fieldName); };

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = field('name').value.trim();
  const phone = field('phone').value.trim();
  const car = field('car').value.trim();
  const part = field('part').value.trim();
  const comment = field('comment').value.trim();

  // Проверяем обязательные поля
  const errors = [];
  field('name').parentElement.classList.toggle('has-error', !name);
  if (!name) errors.push('имя');

  const digits = phone.replace(/\D/g, '');
  const phoneOk = digits.length >= 10;
  field('phone').parentElement.classList.toggle('has-error', !phoneOk);
  if (!phoneOk) errors.push('телефон (не меньше 10 цифр)');

  successBox.textContent = '';
  if (errors.length) {
    errorBox.textContent = 'Чтобы отправить заявку, укажите ' + errors.join(' и ') + '.';
    (!name ? field('name') : field('phone')).focus();
    return;
  }
  errorBox.textContent = '';

  // Собираем текст заявки
  const lines = [
    'Заявка с сайта Братского авторазбора',
    'Имя: ' + name,
    'Телефон: ' + phone
  ];
  if (car) lines.push('Машина: ' + car);
  if (part) lines.push('Деталь: ' + part);
  if (comment) lines.push('Комментарий: ' + comment);

  const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
  window.open(url, '_blank', 'noopener');
  successBox.textContent = 'Заявка открылась в WhatsApp – нажмите там «Отправить». Если WhatsApp не открылся, позвоните: +7 (908) 104-58-91.';
});
