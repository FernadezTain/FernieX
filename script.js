// === Переключение темы ===
const themeBtn = document.getElementById('theme-toggle-btn');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme');
});

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
      if(sec.id === btn.dataset.section){
        sec.classList.add('visible');

        // Запуск анимаций для каждой секции
        if(sec.id === 'home') animateHomeSection();
        if(sec.id === 'news') animateNewsSection();
        if(sec.id === 'tech') animateTechSection();
        if(sec.id === 'faq') animateFaqSection(); // добавлено
      } else {
        sec.classList.remove('visible');
      }
    });
  });
});

function animateHomeSection() {
  const homeText = document.querySelectorAll('#home h1, #home p');
  const telegramBtn = document.getElementById('telegram-button');
  const faqBlock = document.querySelectorAll('#home .faq');

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

  // FAQ
  faqBlock.forEach((item, i) => {
    item.classList.remove('show');
    setTimeout(() => item.classList.add('show'), i * 100);
  });
}

// === Анимация новостей ===
function animateNewsSection() {
  const newsItems = document.querySelectorAll('#news .news-item');
  newsItems.forEach((item, i) => {
    item.classList.remove('show'); // сброс
    setTimeout(() => item.classList.add('show'), i * 100);
  });
}

// === Функция для расчёта возраста ===
function calculateBotAge() {
  const startDate = new Date(2025, 1, 20); // 20.02.2025 (месяцы с 0)
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

// === Анимация возраста ===
function animateAgeCounter() {
  const botAgeElement = document.getElementById('bot-age');
  if (!botAgeElement) return;

  const age = calculateBotAge();
  const duration = 2000;
  const steps = Math.floor(duration / 30);
  let step = 0;

  clearInterval(botAgeElement.animationInterval); // очистка старого интервала
  botAgeElement.animationInterval = setInterval(() => {
    step++;
    const progress = step / steps;

    const years = Math.floor(age.years * progress);
    const months = Math.floor(age.months * progress);
    const days = Math.floor(age.days * progress);

    botAgeElement.textContent = `${years}.${months}.${days}`;

    if (step >= steps) {
      botAgeElement.textContent = `${age.years}.${age.months}.${age.days}`;
      clearInterval(botAgeElement.animationInterval);
    }
  }, 30);
}

// === Анимация Технической информации ===
function animateTechSection() {
  const techBlocks = document.querySelectorAll('#tech .tech-block');
  techBlocks.forEach((block, i) => {
    block.classList.remove('show'); // сброс на случай повторного открытия
    setTimeout(() => block.classList.add('show'), i * 150); // плавная поочередная анимация
  });
}

// === Анимация FAQ ===
function animateFaqSection() {
  const faqItems = document.querySelectorAll('#faq .faq');
  faqItems.forEach((item, i) => {
    item.classList.remove('show'); // сброс
    setTimeout(() => item.classList.add('show'), i * 100);
  });
}

// === Стартовая анимация главной секции ===
window.addEventListener('load', () => animateHomeSection());

// === Кнопка "Команды Бота" ===
const showCommandsBtn = document.getElementById('showCommandsBtn');
if (showCommandsBtn) {
  showCommandsBtn.addEventListener('click', () => {
    window.open('http://fogames.tilda.ws/developind', '_self'); // ссылка откроется в этом же окне
  });
}
  // Запуск анимации возраста
  animateAgeCounter();
}
