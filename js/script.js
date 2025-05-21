const toggle = document.querySelector('.menu-toggle');
const sideNav = document.querySelector('.side-nav');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-nav');

if (toggle) {
  toggle.addEventListener('click', () => {
    toggle.classList.add('active');
    sideNav.classList.add('open');
    overlay.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    sideNav.setAttribute('aria-hidden', 'false');
  });
}

function closeMenu() {
  if (toggle) {
    toggle.classList.remove('active');
  }
  if (sideNav) {
    sideNav.classList.remove('open');
    sideNav.setAttribute('aria-hidden', 'true');
  }
  if (overlay) {
    overlay.classList.remove('active');
  }
  if (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
  }
}

if (closeBtn) closeBtn.addEventListener('click', closeMenu);
if (overlay) overlay.addEventListener('click', closeMenu);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sideNav?.classList.contains('open')) {
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
  const carrosselContainer = document.querySelector('.áreas-carrossel-container');

  let itemsPorSlide = 2; // Ajustado para melhor visualização mobile inicialmente
  let totalSlides = Math.ceil(items.length / itemsPorSlide);
  let currentSlide = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function ajustarItensPorSlide() {
    const larguraTela = window.innerWidth;

    if (larguraTela <= 600) {
      itemsPorSlide = 1;
    } else if (larguraTela <= 1024) {
      itemsPorSlide = 2;
    } else {
      itemsPorSlide = 2; // Mantive 2 para telas maiores, ajuste se necessário
    }

    totalSlides = Math.ceil(items.length / itemsPorSlide);
    currentSlide = Math.min(currentSlide, totalSlides - 1);
    criarDots();
    updateCarrossel();
    atualizarVisibilidadeBotoes();
  }

  function updateCarrossel() {
    const itemWidth = items[0].offsetWidth;
    const gap = 20; // Margem entre os itens
    const slideWidth = itemsPorSlide * (itemWidth + gap);
    const translateX = -(currentSlide * (itemWidth + gap));
    carrossel.style.transform = `translateX(${translateX}px)`;

    document.querySelectorAll('.áreas-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  function criarDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('áreas-dot');
      if (i === currentSlide) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentSlide = i;
        updateCarrossel();
        atualizarVisibilidadeBotoes();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function atualizarVisibilidadeBotoes() {
    if (window.innerWidth <= 600) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    }
  }

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarrossel();
    atualizarVisibilidadeBotoes();
  });

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarrossel();
    atualizarVisibilidadeBotoes();
  });

  // Touch Events para swipe
  carrosselContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  carrosselContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const deltaX = touchEndX - touchStartX;

    if (deltaX > swipeThreshold) {
      // Swipe para a direita (anterior)
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarrossel();
      atualizarVisibilidadeBotoes();
    } else if (deltaX < -swipeThreshold) {
      // Swipe para a esquerda (próximo)
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarrossel();
      atualizarVisibilidadeBotoes();
    }
    touchStartX = 0;
    touchEndX = 0;
  }

  ajustarItensPorSlide();
  window.addEventListener('resize', ajustarItensPorSlide);
  atualizarVisibilidadeBotoes(); // Garante que os botões são escondidos no carregamento em mobile
});

document.addEventListener('DOMContentLoaded', function () {
  const carrossel = document.querySelector('.depoimentos-carrossel');
  const prevBtn = document.querySelector('.depoimentos-btn-prev');
  const nextBtn = document.querySelector('.depoimentos-btn-next');
  const dotsContainer = document.getElementById('depoimentos-dots__container');
  const items = document.querySelectorAll('.depoimentos-carrossel-item');

  let itemsPorSlide = 1; // Padrão para mobile
  let totalSlides = Math.ceil(items.length / itemsPorSlide);
  let currentSlide = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  const carrosselContainer = document.querySelector('.depoimentos-carrossel-container');

  function ajustarItensPorSlide() {
    const larguraTela = window.innerWidth;

    if (larguraTela <= 600) {
      itemsPorSlide = 1;
    } else {
      itemsPorSlide = 2;
    }

    totalSlides = Math.ceil(items.length / itemsPorSlide);
    currentSlide = Math.min(currentSlide, totalSlides - 1);
    criarDots();
    updateCarrossel();
    atualizarVisibilidadeBotoes();
  }

  function updateCarrossel() {
    const itemWidth = items[0].offsetWidth;
    const gap = 20; // Margem entre os itens
    const translateX = -(currentSlide * (itemWidth + gap));
    carrossel.style.transform = `translateX(${translateX}px)`;

    document.querySelectorAll('.depoimentos-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  function criarDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('depoimentos-dot');
      if (i === currentSlide) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentSlide = i;
        updateCarrossel();
        atualizarVisibilidadeBotoes();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function atualizarVisibilidadeBotoes() {
    const larguraTela = window.innerWidth;
    const mostrarBotoes = larguraTela > 600;
    prevBtn.style.display = mostrarBotoes ? 'block' : 'none';
    nextBtn.style.display = mostrarBotoes ? 'block' : 'none';
  }

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarrossel();
    atualizarVisibilidadeBotoes();
  });

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarrossel();
    atualizarVisibilidadeBotoes();
  });

  // Touch Events para swipe no carrossel de depoimentos
  carrosselContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  carrosselContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const deltaX = touchEndX - touchStartX;

    if (deltaX > swipeThreshold) {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarrossel();
      atualizarVisibilidadeBotoes();
    } else if (deltaX < -swipeThreshold) {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarrossel();
      atualizarVisibilidadeBotoes();
    }
    touchStartX = 0;
    touchEndX = 0;
  }

  ajustarItensPorSlide();
  window.addEventListener('resize', ajustarItensPorSlide);
  atualizarVisibilidadeBotoes();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const el = entry.target;
    if (entry.isIntersecting) {
      el.classList.add('animate-gradient');
    } else {
      el.classList.remove('animate-gradient');
    }
  });
}, {
  threshold: 0.5
});

document.querySelectorAll(
  '.sobre-container__baixo-missao-div-texto-barrinha, ' +
  '.sobre-container__baixo-visao-div-texto-barrinha, ' +
  '.sobre-container__baixo-valores-div-texto-barrinha'
).forEach(el => observer.observe(el));

const cases = {
  case1: {
    titulo: "Estruturação Contratual para Campanha com Influenciador digital",
    texto: "Uma marca nacional do setor de cosméticos buscava realizar uma campanha publicitária com um influenciador digital com quase de 500 mil seguidores, envolvendo conteúdos em múltiplas plataformas, cláusulas de exclusividade e métricas de desempenho.",
    link: "./pages/case1.html",
    video: "./assets/case.mp4"
  },
  case2: {
    titulo: "Recuperação de Conta Hackeada",
    texto: "A conta comercial da loja no Instagram foi hackeada, resultando na perda de acesso ao perfil, alteração de senha e publicação de conteúdos fraudulentos que prejudicavam a privacidade da loja. O hacker permitiu pagamento em criptomoedas para devolução ou acesso, e a plataforma não respondeu rapidamente às solicitações de recuperação.",
    link: "./pages/case2.html",
    video: "./assets/case2.mp4"
  },
};

function trocaFrase(fase) {
  document.querySelector(".depoimentos-div__meio-case-h3").innerText = cases[fase].titulo;
  document.querySelector(".depoimentos-div__meio-case-p").innerText = cases[fase].texto;
  const video = document.querySelector(".video-case");
  const source = video.querySelector("source");
  source.src = cases[fase].video;
  video.load();

  const btnContainer = document.querySelector(".depoimentos-div__meio-case-a");
  btnContainer.innerHTML = "";
  const btn = document.createElement("a");
  btn.href = cases[fase].link;
  btn.innerText = "Detalhes do Case";
  btn.className = "depoimentos-div__meio-case-container-a";
  btn.target = "_blank";

  btnContainer.appendChild(btn);
}

if (!localStorage.getItem('cookiesAceitos')) {
  document.getElementById('cookie-banner').style.display = 'block';
}

document.getElementById('aceitar-cookies').addEventListener('click', () => {
  localStorage.setItem('cookiesAceitos', 'true');
  document.getElementById('cookie-banner').style.display = 'none';
});