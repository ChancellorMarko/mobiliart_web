// js/carrossel.js
class Carrossel {
    constructor() {
        this.carrossel = document.querySelector('.carrossel');
        this.slides = document.querySelector('.slides');
        this.indicadores = document.querySelectorAll('.dot');
        this.imagens = document.querySelectorAll('.slides img');

        this.currentIndex = 0;
        this.totalSlides = this.imagens.length;
        this.intervalId = null;
        this.intervalTime = 5000; // 5 segundos entre slides
        this.isPaused = false;

        this.init();
    }

    init() {
        // Configura largura dos slides
        this.setupSlides();

        // Adiciona botões de navegação
        this.addNavigationButtons();

        // Configura eventos dos indicadores
        this.setupIndicators();

        // Inicia transição automática
        this.startAutoSlide();

        // Pausa quando o mouse está sobre o carrossel
        this.setupPauseOnHover();

        // Detecta mudança de tamanho da tela
        window.addEventListener('resize', () => this.setupSlides());
    }

    setupSlides() {
        // Define a largura de cada slide
        const slideWidth = this.carrossel.clientWidth;

        this.imagens.forEach(img => {
            img.style.width = `${slideWidth}px`;
        });

        // Define largura total do container de slides
        this.slides.style.width = `${slideWidth * this.totalSlides}px`;

        // Move para o slide atual
        this.goToSlide(this.currentIndex);
    }

    addNavigationButtons() {
        // Botão anterior
        const prevButton = document.createElement('button');
        prevButton.className = 'carrossel-nav carrossel-prev';
        prevButton.innerHTML = '&#10094;';
        prevButton.setAttribute('aria-label', 'Slide anterior');
        prevButton.addEventListener('click', () => this.prevSlide());

        // Botão próximo
        const nextButton = document.createElement('button');
        nextButton.className = 'carrossel-nav carrossel-next';
        nextButton.innerHTML = '&#10095;';
        nextButton.setAttribute('aria-label', 'Próximo slide');
        nextButton.addEventListener('click', () => this.nextSlide());

        this.carrossel.appendChild(prevButton);
        this.carrossel.appendChild(nextButton);
    }

    setupIndicators() {
        this.indicadores.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoSlide();
            });
        });
    }

    setupPauseOnHover() {
        this.carrossel.addEventListener('mouseenter', () => {
            this.pauseAutoSlide();
        });

        this.carrossel.addEventListener('mouseleave', () => {
            if (!this.isPaused) {
                this.startAutoSlide();
            }
        });
    }

    goToSlide(index) {
        this.currentIndex = index;

        // Atualiza a posição dos slides
        const slideWidth = this.carrossel.clientWidth;
        this.slides.style.transform = `translateX(-${slideWidth * this.currentIndex}px)`;

        // Atualiza os indicadores
        this.updateIndicators();
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.goToSlide(this.currentIndex);
        this.resetAutoSlide();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(this.currentIndex);
        this.resetAutoSlide();
    }

    updateIndicators() {
        this.indicadores.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoSlide() {
        this.isPaused = false;

        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        this.intervalId = setInterval(() => {
            this.nextSlide();
        }, this.intervalTime);
    }

    pauseAutoSlide() {
        this.isPaused = true;

        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    resetAutoSlide() {
        if (!this.isPaused) {
            this.pauseAutoSlide();
            this.startAutoSlide();
        }
    }

    // Método para mudar o tempo entre slides (opcional)
    setIntervalTime(time) {
        this.intervalTime = time;

        if (!this.isPaused) {
            this.resetAutoSlide();
        }
    }
}

// Versão alternativa mais simples (se preferir sem navegação automática)
class CarrosselSimples {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slides img');
        this.dots = document.querySelectorAll('.dot');
        this.totalSlides = this.slides.length;

        this.init();
    }

    init() {
        // Configura largura do container
        const container = document.querySelector('.carrossel');
        const slideWidth = container.clientWidth;
        const slidesContainer = document.querySelector('.slides');

        slidesContainer.style.width = `${slideWidth * this.totalSlides}px`;

        // Configura largura de cada slide
        this.slides.forEach(slide => {
            slide.style.width = `${slideWidth}px`;
        });

        // Adiciona eventos aos dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        // Inicia carrossel automático
        this.startAutoSlide();

        // Pausa no hover
        container.addEventListener('mouseenter', () => this.pauseAutoSlide());
        container.addEventListener('mouseleave', () => this.startAutoSlide());

        // Redimensionamento
        window.addEventListener('resize', () => {
            const newWidth = container.clientWidth;
            slidesContainer.style.width = `${newWidth * this.totalSlides}px`;
            this.slides.forEach(slide => {
                slide.style.width = `${newWidth}px`;
            });
            this.goToSlide(this.currentSlide);
        });
    }

    goToSlide(index) {
        this.currentSlide = index;
        const container = document.querySelector('.carrossel');
        const slideWidth = container.clientWidth;
        const slidesContainer = document.querySelector('.slides');

        slidesContainer.style.transform = `translateX(-${slideWidth * this.currentSlide}px)`;

        // Atualiza dots
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentSlide);
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(this.currentSlide);
    }

    startAutoSlide() {
        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(() => this.nextSlide(), 4000);
    }

    pauseAutoSlide() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

// Inicializa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Use Carrossel (completo) ou CarrosselSimples (mais simples)
    const carrossel = new Carrossel();
    // const carrossel = new CarrosselSimples(); // versão alternativa
});