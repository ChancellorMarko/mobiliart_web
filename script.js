/*Galeria*/ 
// Função para embaralhar array (Fisher-Yates)
  function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

window.addEventListener('DOMContentLoaded', () => {
  const galeria = document.querySelector('.galeria');
  const imagensOriginais = Array.from(galeria.querySelectorAll('img'));

  // Embaralha e reinsere as imagens
  const imagensEmbaralhadas = embaralhar(imagensOriginais);
  galeria.innerHTML = '';
  imagensEmbaralhadas.forEach(img => galeria.appendChild(img));

  const modal = document.querySelector('.modal');
  const modalImg = document.querySelector('.modal-conteudo');
  const fechar = document.querySelector('.fechar');
  const btnEsquerda = document.querySelector('.seta-esquerda');
  const btnDireita = document.querySelector('.seta-direita');

  let indiceAtual = 0;

  // Atualiza a imagem no modal
  function mostrarImagem(index) {
    if (index < 0) index = imagensEmbaralhadas.length - 1;
    if (index >= imagensEmbaralhadas.length) index = 0;
    modalImg.src = imagensEmbaralhadas[index].src;
    indiceAtual = index;
  }

  // Clique nas imagens
  imagensEmbaralhadas.forEach((img, index) => {
    img.addEventListener('click', () => {
      modal.style.display = 'block';
      mostrarImagem(index);
    });
  });

  // Fechar modal
  fechar.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Teclado
  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
      if (e.key === 'ArrowRight') {
        mostrarImagem(indiceAtual + 1);
      } else if (e.key === 'ArrowLeft') {
        mostrarImagem(indiceAtual - 1);
      } else if (e.key === 'Escape') {
        modal.style.display = 'none';
      }
    }
  });

  // Clicar nas setas visuais
  btnEsquerda.addEventListener('click', (e) => {
    e.stopPropagation();
    mostrarImagem(indiceAtual - 1);
  });

  btnDireita.addEventListener('click', (e) => {
    e.stopPropagation();
    mostrarImagem(indiceAtual + 1);
  });
});