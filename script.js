// === Переключение темы ===
const themeBtn = document.getElementById('theme-toggle-btn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
  });
}

// === Нижнее меню ===
const menuButtons = document.querySelectorAll('.bottom-menu .menu-btn');
const sections = document.querySelectorAll('.menu-section');

menuButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Активная кнопка
    menuButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Показать нужную секцию и запустить анимацию
    sections.forEach(sec => {
      if (sec.id === btn.dataset.section) {
        sec.classList.add('visible');

        // Запуск анимаций для каждой секции
        if (sec.id === 'home') animateHomeSection();
        if (sec.id === 'news') animateItems('#news .news-item', 100);
        if (sec.id === 'tech') animateItems('#tech .tech-block', 150);
        if (sec.id === 'faq') animateItems('#faq .faq', 100);
      } else {
        sec.classList.remove('visible');
      }
    });
  });
});

// === Универсальная анимация элементов ===
function animateItems(selector, delay = 100) {
  const items = document.querySelectorAll(selector);
  items.forEach((item, i) => {
    item.classList.remove('show');
    setTimeout(() => item.classList.add('show'), i * delay);
  });
}

// === Анимация главной секции ===
function animateHomeSection() {
  const homeText = document.querySelectorAll('#home h1, #home p');
  const telegramBtn = document.getElementById('telegram-button');
  const faqBlock = document.querySelectorAll('#home .faq');
  const ageBlock = document.querySelectorAll('#home .bot-age-block'); // исправлено

  // Текст и кнопка
  homeText.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'all 0.3s ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 80);
  });

  if (telegramBtn) {
    telegramBtn.style.opacity = '0';
    telegramBtn.style.transform = 'translateY(20px)';
    setTimeout(() => {
      telegramBtn.style.transition = 'all 0.3s ease-out';
      telegramBtn.style.opacity = '1';
      telegramBtn.style.transform = 'translateY(0)';
    }, 200);
  }

  // FAQ блоки
  faqBlock.forEach((item, i) => {
    item.classList.remove('show');
    setTimeout(() => item.classList.add('show'), i * 100);
  });

  // Анимация блока возраста бота
  ageBlock.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    setTimeout(() => {
      item.style.transition = 'all 0.5s ease-out';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 400); // после текста и кнопки
  });
}

// === Счётчик возраста (год.месяц.дни.часы.минуты.секунды) ===
function updateBotAge() {
  const createdDate = new Date(2025, 1, 20, 0, 0, 0); // 20 февраля 2025
  const now = new Date();

  let tempDate = new Date(createdDate);

  // === ГОДЫ ===
  let years = now.getFullYear() - tempDate.getFullYear();
  tempDate.setFullYear(tempDate.getFullYear() + years);

  if (tempDate > now) {
    years--;
    tempDate.setFullYear(tempDate.getFullYear() - 1);
  }

  // === МЕСЯЦЫ ===
  let months = now.getMonth() - tempDate.getMonth();
  if (months < 0) months += 12;

  tempDate.setMonth(tempDate.getMonth() + months);

  if (tempDate > now) {
    months--;
    tempDate.setMonth(tempDate.getMonth() - 1);
  }

  // === ДНИ ===
  let diff = now - tempDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  tempDate.setDate(tempDate.getDate() + days);

  diff = now - tempDate;

  // === ЧАСЫ ===
  const hours = Math.floor(diff / (1000 * 60 * 60));
  tempDate.setHours(tempDate.getHours() + hours);

  diff = now - tempDate;

  // === МИНУТЫ ===
  const minutes = Math.floor(diff / (1000 * 60));
  tempDate.setMinutes(tempDate.getMinutes() + minutes);

  diff = now - tempDate;

  // === СЕКУНДЫ ===
  const seconds = Math.floor(diff / 1000);

  const botAgeElement = document.getElementById('bot-age');
  if (botAgeElement) {
    botAgeElement.textContent =
      `${years}г.${months}м.${days}д.${hours}ч.${minutes}м.${seconds}с`;
  }
}


setInterval(updateBotAge, 1000);
updateBotAge();


// === Стартовая анимация при загрузке ===
window.addEventListener('load', () => {
  animateHomeSection();
});

// === Кнопка "Команды Бота" ===
const showCommandsBtn = document.getElementById('showCommandsBtn');
if (showCommandsBtn) {
  showCommandsBtn.addEventListener('click', () => {
    window.open('http://fogames.tilda.ws/developind', '_self');
  });
}
// === Кнопка "Стать админом" ===
const becomeAdminBtn = document.getElementById('becomeAdminBtn');
const adminModal = document.getElementById('adminModal');
const modalGoBtn = document.getElementById('modalGoBtn');
const modalStayBtn = document.getElementById('modalStayBtn');

if (becomeAdminBtn) {
  becomeAdminBtn.addEventListener('click', () => {
    adminModal.style.display = 'flex';
  });
}

// Кнопка "Перейти"
if (modalGoBtn) {
  modalGoBtn.addEventListener('click', () => {
    const link = becomeAdminBtn.getAttribute('data-link'); // ссылка должна быть в data-link
    window.open(link, '_blank'); // открывает ссылку в новой вкладке
    adminModal.style.display = 'none';
  });
}

// Кнопка "Остаться"
if (modalStayBtn) {
  modalStayBtn.addEventListener('click', () => {
    adminModal.style.display = 'none';
  });
}

// Закрытие модалки при клике вне содержимого
if (adminModal) {
  adminModal.addEventListener('click', (e) => {
    if (e.target === adminModal) {
      adminModal.style.display = 'none';
    }
  });
}

