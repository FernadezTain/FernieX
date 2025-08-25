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

    // Показать нужную секцию и анимацию
    sections.forEach(sec => {
      if(sec.id === btn.dataset.section){
        sec.classList.add('visible');
        if(sec.id === 'home') animateHomeSection();
        if(sec.id === 'news') animateNewsSection();
        if(sec.id === 'tech') animateTechSection();
      } else {
        sec.classList.remove('visible');
      }
    });
  });
});

// === Анимация главной секции ===
function animateHomeSection() {
  const homeText = document.querySelectorAll('#home h1, #home p');
  const telegramBtn = document.getElementById('telegram-button');

  homeText.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'all 0.3s ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 80);
  });

  telegramBtn.style.opacity = '0';
  telegramBtn.style.transform = 'translateY(20px)';
  setTimeout(() => {
    telegramBtn.style.transition = 'all 0.3s ease-out';
    telegramBtn.style.opacity = '1';
    telegramBtn.style.transform = 'translateY(0)';
  }, 200);
}

// === Анимация новостей ===
function animateNewsSection() {
  const newsItems = document.querySelectorAll('#news .news-item');
  newsItems.forEach((item, i) => {
    item.classList.remove('show'); // сброс
    setTimeout(() => item.classList.add('show'), i * 100);
  });
}

// === Анимация Технической информации ===
function animateTechSection() {
  const techBlocks = document.querySelectorAll('#tech .tech-block');
  techBlocks.forEach((block, i) => {
    block.classList.remove('show'); // сброс на случай повторного открытия
    setTimeout(() => block.classList.add('show'), i * 150); // плавная поочередная анимация
  });
}

// === Стартовая анимация главной секции ===
window.addEventListener('load', () => animateHomeSection());
