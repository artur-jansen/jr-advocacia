// Função para formatar data para DD/MM/YYYY
function formatarData(dataStr) {
  const data = new Date(dataStr);
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

// Função para ajustar o caminho do arquivo posts.json
function getJsonPath() {
  const path = window.location.pathname;
  return path.includes('/pages/') ? '../posts.json' : 'posts.json';
}

// Função para ajustar o caminho do href do artigo
function getArtigoHref(postId) {
  const path = window.location.pathname;
  return path.includes('/pages/') ? `artigos.html?id=${postId}` : `pages/artigos.html?id=${postId}`;
}

// Função para converter quebras de linha (\n) em <br> para exibir HTML
function formatarConteudoTexto(texto) {
  if (!texto) return '';
  return texto.replace(/\n/g, '<br>');
}

// Função para renderizar cards de artigos na homepage
function renderizarArtigos(containerId, posts, imgPrefix = './assets/') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  posts.slice(0, 3).forEach(post => {
    container.innerHTML += `
      <div class="artigos-container__item">
        <img class="artigos-container__item-seta" src="${imgPrefix}seta.svg" alt="Artigo Advocacia">
        <img class="artigos-container__item-img" src="${imgPrefix}${post.image}" alt="Imagem do artigo">
        <div class="artigos-container__item-baixo">
          <div class="artigos-container__item-baixo-data">
            <div class="artigos-container__item-baixo-data-div"><span>Artigo</span></div>
            <p class="artigos-container__item-baixo-data-p">${formatarData(post.date)}</p>
          </div>
          <p class="artigos-container__item-baixo-p">${post.title}</p>
          <a href="${getArtigoHref(post.id)}" class="artigos-container__item-baixo-btn">Saiba Mais</a>
        </div>
      </div>
    `;
  });
}

// Carregar e exibir artigos nos containers da homepage
fetch(getJsonPath())
  .then(res => res.json())
  .then(posts => {
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    renderizarArtigos('artigos-container', posts, './assets/');
    renderizarArtigos('artigos-container2', posts, '../assets/');
  })
  .catch(err => console.error("Erro ao carregar artigos:", err));

// Página de artigo individual
const params = new URLSearchParams(window.location.search);
const artigoId = params.get("id");

if (artigoId) {
  fetch(getJsonPath())
    .then(res => res.json())
    .then(artigos => {
      const artigo = artigos.find(a => a.id === artigoId);
      if (!artigo) {
        document.body.innerHTML = '<p>Artigo não encontrado.</p>';
        return;
      }

      document.title = artigo.title;
      document.getElementById('titulo-artigo').textContent = artigo.title;
      document.getElementById('data-artigo').textContent = formatarData(artigo.date);

      const imgPrefix = '../assets/';
      document.getElementById('imagem-artigo').src = imgPrefix + artigo.image;

      const conteudoDiv = document.getElementById('conteudo-artigo');
      conteudoDiv.innerHTML = formatarConteudoTexto(artigo.content);

    })
    .catch(err => {
      console.error("Erro ao carregar o artigo:", err);
      document.body.innerHTML = '<p>Erro ao carregar artigo.</p>';
    });
}
