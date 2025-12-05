class GaleriaAutomatica {
  constructor() {
    this.images = [];
    this.currentIndex = 0;
    this.maxImages = 25;

    this.selectors = {
      galeria: document.getElementById('galeria'),
      modal: document.getElementById('modal'),
      modalContent: document.getElementById('imagem-ampliada'),
      closeBtn: document.querySelector('.fechar'),
      prevBtn: document.querySelector('.seta-esquerda'),
      nextBtn: document.querySelector('.seta-direita')
    };

    this.init();
  }

  async init() {
    // Carrega a lista de imagens
    await this.loadImageList();

    // Renderiza a galeria
    this.renderGallery();

    // Configura os eventos do modal
    this.setupModalEvents();
  }

  loadImageList() {
    const imageFiles = [
      'Galeria2.webp', 'Galeria2.webp', 'Galeria3.webp', 'Galeria4.webp',
      'Galeria5.webp', 'Galeria6.webp', 'Galeria7.webp', 'Galeria8.webp',
      'Galeria9.webp', 'Galeria10.webp', 'Galeria11.webp', 'Galeria12.webp',
      'Galeria13.webp', 'Galeria14.webp', 'Galeria15.webp', 'Galeria15.webp',
      'Galeria16.webp', 'Galeria17.webp', 'Galeria18.webp', 'Galeria19.webp',
      'Galeria20.webp', 'Galeria21.webp', 'Galeria22.webp', 'Galeria23.webp',
      'Galeria24.webp', 'Galeria25.webp', 'Galeria26.webp', 'Galeria28.webp',
      'Galeria29.webp', 'Galeria30.webp'
    ];

    // Aplica o limite
    const limitedFiles = imageFiles.slice(0, this.maxImages);

    // Converte para objetos de imagem
    this.images = limitedFiles.map((fileName, index) => ({
      id: index + 1,
      src: `/images/gallery/${fileName}`,
      alt: `Móvel planejado ${index + 1} - MobiliArt Móveis`,
      title: `Projeto ${index + 1}`
    }));
  }

  renderGallery() {
    const gallery = this.selectors.galeria;

    // Limpa a galeria (caso já tenha conteúdo)
    gallery.innerHTML = '';

    // Adiciona cada imagem
    this.images.forEach((image, index) => {
      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt;
      img.loading = 'lazy';
      img.dataset.index = index;

      img.addEventListener('click', () => this.openModal(index));

      gallery.appendChild(img);
    });
  }

  setupModalEvents() {
    // Fecha o modal
    this.selectors.closeBtn.addEventListener('click', () => this.closeModal());

    // Navegação
    this.selectors.prevBtn.addEventListener('click', () => this.navigate(-1));
    this.selectors.nextBtn.addEventListener('click', () => this.navigate(1));

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
      if (e.key === 'ArrowLeft') this.navigate(-1);
      if (e.key === 'ArrowRight') this.navigate(1);
    });

    // Fechar clicando fora da imagem
    this.selectors.modal.addEventListener('click', (e) => {
      if (e.target === this.selectors.modal) {
        this.closeModal();
      }
    });
  }

  openModal(index) {
    this.currentIndex = index;
    this.updateModalImage();
    this.selectors.modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  updateModalImage() {
    const image = this.images[this.currentIndex];
    this.selectors.modalContent.src = image.src;
    this.selectors.modalContent.alt = image.alt;
  }

  navigate(direction) {
    this.currentIndex = (this.currentIndex + direction + this.images.length) % this.images.length;
    this.updateModalImage();
  }

  closeModal() {
    this.selectors.modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Inicializa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  new GaleriaAutomatica();
});