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
    // Обновляем активную кнопку
    menuButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Показываем нужную секцию и скрываем остальные
    sections.forEach(sec => {
      if(sec.id === btn.dataset.section){
        sec.classList.add('visible');
      } else {
        sec.classList.remove('visible');
      }
    });

    // Анимация главной секции
    if(btn.dataset.section === 'home') animateHomeSection();

    // Скролл к секции (для news и tech)
    if(btn.dataset.section !== 'home') scrollToSection(btn.dataset.section);
  });
});

// === Плавная прокрутка к секции ===
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if(element && element.offsetHeight > 0) {
    const yOffset = -20;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

// === Анимация Главной секции ===
function animateHomeSection() {
  const home = document.getElementById('home');
  const textEls = home.querySelectorAll('h1, p');
  const telegramBtn = document.getElementById('telegram-button');

  // Анимация текста
  textEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.transition = 'all 0.6s ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 150);
  });

  // Анимация кнопки Telegram
  telegramBtn.style.opacity = '0';
  telegramBtn.style.transform = 'translateY(30px)';
  setTimeout(() => {
    telegramBtn.style.transition = 'all 0.6s ease-out';
    telegramBtn.style.opacity = '1';
    telegramBtn.style.transform = 'translateY(0)';
  }, 300);
}

// === Запуск анимации при загрузке страницы ===
window.addEventListener('load', () => animateHomeSection());
