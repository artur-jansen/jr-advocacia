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

  let itemsPorSlide = 2; // padrão
  let totalSlides = Math.ceil(items.length / itemsPorSlide);
  let currentSlide = 0;

  // Responsivo conforme a largura da tela
  function ajustarItensPorSlide() {
    const larguraTela = window.innerWidth;

    if (larguraTela <= 600) {
      itemsPorSlide = 1;
    } else if (larguraTela <= 1024) {
      itemsPorSlide = 2;
    } else {
      itemsPorSlide = 2;
    }

    totalSlides = Math.ceil(items.length / itemsPorSlide);
    currentSlide = Math.min(currentSlide, totalSlides - 1); // Evita index inválido
    criarDots();
    updateCarrossel();
  }

  function updateCarrossel() {
    const slideWidth = itemsPorSlide * (items[0].offsetWidth + 20);
    const translateX = -(currentSlide * slideWidth);
    carrossel.style.transform = `translateX(${translateX}px)`;

    // Atualiza os dots
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

  ajustarItensPorSlide();
  window.addEventListener('resize', ajustarItensPorSlide);
});

document.addEventListener('DOMContentLoaded', function () {
  const carrossel = document.querySelector('.depoimentos-carrossel');
  const prevBtn = document.querySelector('.depoimentos-btn-prev');
  const nextBtn = document.querySelector('.depoimentos-btn-next');
  const dotsContainer = document.getElementById('depoimentos-dots__container');
  const items = document.querySelectorAll('.depoimentos-carrossel-item');

  let itemsPorSlide = 2; // Padrão
  let totalSlides = Math.ceil(items.length / itemsPorSlide);
  let currentSlide = 0;

  // Responsividade
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
  }

  function updateCarrossel() {
    const slideWidth = itemsPorSlide * (items[0].offsetWidth + 20);
    const translateX = -(currentSlide * slideWidth);
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

  ajustarItensPorSlide();
  window.addEventListener('resize', ajustarItensPorSlide);
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
    link: "case1.html"
  },
  case2: {
    titulo: "Recuperação de Conta Hackeada",
    texto: "A conta comercial da loja no Instagram foi hackeada, resultando na perda de acesso ao perfil, alteração de senha e publicação de conteúdos fraudulentos que prejudicavam a privacidade da loja. O hacker permitiu pagamento em criptomoedas para devolução ou acesso, e a plataforma não respondeu rapidamente às solicitações de recuperação.",
    link: "case1.html"
  },
};

function trocaFrase(fase) {
  document.querySelector(".depoimentos-div__meio-case-h3").innerText = cases[fase].titulo;
  document.querySelector(".depoimentos-div__meio-case-p").innerText = cases[fase].texto;

  const btnContainer = document.querySelector(".depoimentos-div__meio-case-a");
  btnContainer.innerHTML = "";
  const btn = document.createElement("a");
  btn.href = cases[fase].link;
  btn.innerText = "Detalhes do Case";
  btn.className = "depoimentos-div__meio-case-container-a";
  btn.target = "_blank";

  btnContainer.appendChild(btn);
}