const toggle = document.querySelector('.menu-toggle');
const sideNav = document.querySelector('.side-nav');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-nav');

toggle.addEventListener('click', () => {
  toggle.classList.add('active');
  sideNav.classList.add('open');
  overlay.classList.add('active');
  toggle.setAttribute('aria-expanded', 'true');
  sideNav.setAttribute('aria-hidden', 'false');
});

function closeMenu() {
  toggle.classList.remove('active');
  sideNav.classList.remove('open');
  overlay.classList.remove('active');
  toggle.setAttribute('aria-expanded', 'false');
  sideNav.setAttribute('aria-hidden', 'true');
}

closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sideNav.classList.contains('open')) {
    closeMenu();
  }
});

window.addEventListener('scroll', function () {
  const voltarTopoBtn = document.querySelector('.voltarTopo');
  if (window.scrollY > 50) {
    voltarTopoBtn.classList.add('scrolled');
  } else {
    voltarTopoBtn.classList.remove('scrolled');
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', function () {
  const carrossel = document.querySelector('.áreas-carrossel');
  const prevBtn = document.querySelector('.áreas-btn-prev');
  const nextBtn = document.querySelector('.áreas-btn-next');
  const dotsContainer = document.getElementById('dots-container');
  const items = document.querySelectorAll('.áreas-carrossel-item');

  const itemsPorSlide = 2;
  const totalSlides = Math.ceil(items.length / itemsPorSlide);
  let currentSlide = 0;

  function updateCarrossel() {
    const slideWidth = carrossel.clientWidth / totalSlides;
    carrossel.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Atualiza os dots
    document.querySelectorAll('.áreas-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  function criarDots() {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('áreas-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentSlide = i;
        updateCarrossel();
      });
      dotsContainer.appendChild(dot);
    }
  }

  prevBtn.addEventListener('click', () => {
    currentSlide = Math.max(0, currentSlide - 1);
    updateCarrossel();
  });

  nextBtn.addEventListener('click', () => {
    currentSlide = Math.min(totalSlides - 1, currentSlide + 1);
    updateCarrossel();
  });

  criarDots();
  updateCarrossel();
});

document.addEventListener('DOMContentLoaded', function () {
  const carrossel = document.querySelector('.sobre-carrossel');
  const prevBtn = document.querySelector('.sobre-btn-prev');
  const nextBtn = document.querySelector('.sobre-btn-next');
  const dotsContainer = document.getElementById('sobre-dots-container');
  const items = document.querySelectorAll('.sobre-carrossel-item');
  
  let itemsPorSlide = 4; // Default para desktop
  let totalSlides = Math.ceil(items.length / itemsPorSlide);
  let currentSlide = 0;

  // Função para ajustar o número de itens por slide com base na largura da tela
  function ajustarItensPorSlide() {
    const larguraTela = window.innerWidth;
    
    if (larguraTela <= 600) {
      itemsPorSlide = 1; // 1 item por slide em telas muito pequenas
    } else if (larguraTela <= 1024) {
      itemsPorSlide = 2; // 2 itens por slide para tablets
    } else {
      itemsPorSlide = 4; // 4 itens por slide para desktops
    }

    totalSlides = Math.ceil(items.length / itemsPorSlide); // Recalcula o total de slides
    updateCarrossel(); // Atualiza o carrossel com o novo número de itens por slide
  }

  // Ajuste para a transição do carrossel
  function updateCarrossel() {
    const slideWidth = itemsPorSlide * (items[0].offsetWidth + 20); // Largura total por slide, com o gap
    const translateX = -(currentSlide * slideWidth);
    carrossel.style.transform = `translateX(${translateX}px)`;  // Desliza a largura calculada

    // Atualiza os dots de navegação
    document.querySelectorAll('.sobre-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  function criarDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('sobre-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentSlide = i;
        updateCarrossel();
      });
      dotsContainer.appendChild(dot);
    }
  }

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarrossel();
  });

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarrossel();
  });

  // Chama o ajuste de itens ao carregar e ao redimensionar a tela
  ajustarItensPorSlide();
  window.addEventListener('resize', ajustarItensPorSlide);

  criarDots();
  updateCarrossel();
});
