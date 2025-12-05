document.addEventListener('DOMContentLoaded', function () {
  // Seleciona os elementos do DOM
  const toggleButton = document.getElementById("accessibility-toggle");
  const menu = document.getElementById("accessibility-menu");
  const body = document.body;

  // Estado do menu
  let isMenuOpen = false;

  // Alterna a visibilidade do menu de acessibilidade
  toggleButton.addEventListener("click", (e) => {
    e.stopPropagation();
    isMenuOpen = !isMenuOpen;
    menu.classList.toggle("visible");

    // Atualiza o ARIA label para acessibilidade
    toggleButton.setAttribute("aria-expanded", isMenuOpen);

    console.log("Menu de acessibilidade:", isMenuOpen ? "aberto" : "fechado");
  });

  // Fecha o menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (isMenuOpen &&
      !menu.contains(e.target) &&
      !toggleButton.contains(e.target)) {
      closeMenu();
    }
  });

  // Fecha o menu ao pressionar ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
  });

  function closeMenu() {
    isMenuOpen = false;
    menu.classList.remove("visible");
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.focus();
  }

  // Salva as preferências no localStorage
  function savePreference(feature, isActive) {
    try {
      const preferences = JSON.parse(localStorage.getItem('accessibilityPreferences')) || {};
      preferences[feature] = isActive;
      localStorage.setItem('accessibilityPreferences', JSON.stringify(preferences));
    } catch (e) {
      console.error('Erro ao salvar preferências:', e);
    }
  }

  // Carrega as preferências do localStorage
  function loadPreferences() {
    try {
      const preferences = JSON.parse(localStorage.getItem('accessibilityPreferences')) || {};

      Object.keys(preferences).forEach(feature => {
        if (preferences[feature]) {
          body.classList.add(feature);
        }
      });

      console.log('Preferências de acessibilidade carregadas');
    } catch (e) {
      console.error('Erro ao carregar preferências:', e);
    }
  }

  // Ativa ou desativa uma funcionalidade de acessibilidade
  window.toggleFeature = function (feature) {
    const isActive = body.classList.toggle(feature);
    savePreference(feature, isActive);

    // Feedback visual para o usuário
    showFeedback(`${feature} ${isActive ? 'ativado' : 'desativado'}`);
    closeMenu();
  };

  // Remove todas as funcionalidades de acessibilidade aplicadas
  window.resetAccessibility = function () {
    const features = [
      'large-text',
      'high-contrast',
      'grayscale',
      'invert',
      'spacing',
      'highlight-links',
      'hide-images',
      'focus-outline',
      'reading-mode'
    ];

    features.forEach(f => {
      body.classList.remove(f);
    });

    // Limpa o localStorage
    localStorage.removeItem('accessibilityPreferences');

    showFeedback('Todas as configurações foram redefinidas');
    closeMenu();
  };

  // Mostra feedback visual temporário
  function showFeedback(message) {
    // Remove feedback anterior se existir
    const oldFeedback = document.getElementById('accessibility-feedback');
    if (oldFeedback) {
      oldFeedback.remove();
    }

    // Cria novo elemento de feedback
    const feedback = document.createElement('div');
    feedback.id = 'accessibility-feedback';
    feedback.textContent = message;
    feedback.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: #25D366;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      z-index: 10001;
      font-size: 14px;
      animation: fadeInOut 3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;

    // Adiciona ao body
    document.body.appendChild(feedback);

    // Remove após 3 segundos
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.remove();
      }
    }, 3000);
  }

  // Estilo CSS para a animação do feedback
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInOut {
      0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
      10% { opacity: 1; transform: translateX(-50%) translateY(0); }
      90% { opacity: 1; transform: translateX(-50%) translateY(0); }
      100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
  `;
  document.head.appendChild(style);

  // Configura navegação por teclado no menu
  menu.addEventListener('keydown', (e) => {
    const buttons = menu.querySelectorAll('button');
    const currentIndex = Array.from(buttons).indexOf(document.activeElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % buttons.length;
        buttons[nextIndex].focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        buttons[prevIndex].focus();
        break;
      case 'Home':
        e.preventDefault();
        buttons[0].focus();
        break;
      case 'End':
        e.preventDefault();
        buttons[buttons.length - 1].focus();
        break;
    }
  });

  // Carrega preferências salvas quando a página carrega
  loadPreferences();

  // Adiciona labels de acessibilidade aos botões
  const featureLabels = {
    'large-text': 'Aumentar tamanho do texto',
    'high-contrast': 'Alto contraste',
    'grayscale': 'Escala de cinza',
    'invert': 'Inverter cores',
    'spacing': 'Aumentar espaçamento',
    'highlight-links': 'Destacar links',
    'hide-images': 'Ocultar imagens',
    'focus-outline': 'Mostrar foco',
    'reading-mode': 'Modo leitura',
    'reset': 'Redefinir configurações'
  };

  // Atualiza os botões com labels adequados
  const buttons = menu.querySelectorAll('button');
  buttons.forEach((button, index) => {
    const text = button.textContent;
    const feature = text.toLowerCase().replace(/\s+/g, '-');

    if (featureLabels[feature]) {
      button.textContent = featureLabels[feature];
      button.setAttribute('aria-label', featureLabels[feature]);
    }
  });

  // Configura o botão toggle para acessibilidade
  toggleButton.setAttribute('aria-label', 'Abrir menu de acessibilidade');
  toggleButton.setAttribute('aria-expanded', 'false');
  toggleButton.setAttribute('aria-haspopup', 'true');
});