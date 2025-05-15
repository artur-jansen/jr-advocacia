document.addEventListener('DOMContentLoaded', () => {
  const titulos = document.querySelectorAll('.sobre-mim__container-cima-accordion-item-titulo');

  titulos.forEach(titulo => {
    titulo.addEventListener('click', () => {
      const itemAtual = titulo.parentElement;
      const conteudoAtual = itemAtual.querySelector('.sobre-mim__container-cima-accordion-item-conteudo');

      // Fecha todos os outros itens abertos
      document.querySelectorAll('.sobre-mim__container-cima-accordion-item').forEach(item => {
        if (item !== itemAtual) {
          item.classList.remove('ativo');
          const conteudo = item.querySelector('.sobre-mim__container-cima-accordion-item-conteudo');
          conteudo.style.height = '0';
          conteudo.style.padding = '0 1em';
        }
      });

      // Toggle do item clicado
      if (itemAtual.classList.contains('ativo')) {
        // Fechar
        itemAtual.classList.remove('ativo');
        conteudoAtual.style.height = '0';
        conteudoAtual.style.padding = '0 1em';
      } else {
        // Abrir
        itemAtual.classList.add('ativo');
        conteudoAtual.style.height = '100%';
        conteudoAtual.style.padding = '1em';
      }
    });
  });
});
