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

    // Анимация новостей
    if(btn.dataset.section === 'news') animateNewsSection();

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
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 100); // ускоренная последовательность
  });

  // Анимация кнопки Telegram
  telegramBtn.style.opacity = '0';
  telegramBtn.style.transform = 'translateY(20px)';
  setTimeout(() => {
    telegramBtn.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    telegramBtn.style.opacity = '1';
    telegramBtn.style.transform = 'translateY(0)';
  }, 200);
}

// === Анимация секции новостей ===
function animateNewsSection() {
  const newsItems = document.querySelectorAll('#news .news-item');
  newsItems.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(10px)';
    setTimeout(() => {
      item.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, i * 100);
  });
}

// === Запуск анимации при загрузке страницы ===
window.addEventListener('load', () => animateHomeSection());
