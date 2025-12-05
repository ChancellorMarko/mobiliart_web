document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');

  // Função para carregar tema salvo
  function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Aplica o tema ao documento
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Atualiza o ícone
    updateIcon(savedTheme);

    // Salva no localStorage para consistência
    localStorage.setItem('theme', savedTheme);

    // Dispara evento personalizado
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: savedTheme }));
  }

  // Função para atualizar o ícone
  function updateIcon(theme) {
    if (theme === 'dark') {
      themeIcon.classList.remove('fa-moon-o');
      themeIcon.classList.add('fa-sun-o');
      themeToggle.setAttribute('aria-label', 'Alternar para modo claro');
      themeToggle.setAttribute('title', 'Alternar para modo claro');
    } else {
      themeIcon.classList.remove('fa-sun-o');
      themeIcon.classList.add('fa-moon-o');
      themeToggle.setAttribute('aria-label', 'Alternar para modo escuro');
      themeToggle.setAttribute('title', 'Alternar para modo escuro');
    }
  }

  // Função para alternar tema
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';

    // Aplica o novo tema
    document.documentElement.setAttribute('data-theme', next);

    // Atualiza ícone
    updateIcon(next);

    // Salva preferência
    localStorage.setItem('theme', next);

    // Feedback visual
    showThemeFeedback(next);

    // Dispara evento
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: next }));

    console.log(`Tema alterado para: ${next}`);
  }

  // Função para mostrar feedback visual
  function showThemeFeedback(theme) {
    // Remove feedback anterior se existir
    const oldFeedback = document.getElementById('theme-feedback');
    if (oldFeedback) {
      oldFeedback.remove();
    }

    // Cria novo feedback
    const feedback = document.createElement('div');
    feedback.id = 'theme-feedback';
    feedback.textContent = theme === 'dark' ? 'Modo escuro ativado' : 'Modo claro ativado';
    feedback.style.cssText = `
      position: fixed;
      bottom: 150px;
      right: 20px;
      background: ${theme === 'dark' ? '#333' : '#f0f0f0'};
      color: ${theme === 'dark' ? '#fff' : '#333'};
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      z-index: 9999;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      pointer-events: none;
    `;

    document.body.appendChild(feedback);

    // Anima entrada
    setTimeout(() => {
      feedback.style.opacity = '1';
      feedback.style.transform = 'translateY(0)';
    }, 10);

    // Remove após 2 segundos
    setTimeout(() => {
      feedback.style.opacity = '0';
      feedback.style.transform = 'translateY(10px)';
      setTimeout(() => {
        if (feedback.parentNode) {
          feedback.remove();
        }
      }, 300);
    }, 2000);
  }

  // Função para detectar preferência do sistema
  function detectSystemPreference() {
    // Se não houver tema salvo, usa a preferência do sistema
    if (!localStorage.getItem('theme')) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = prefersDark ? 'dark' : 'light';

      // Aplica o tema do sistema
      document.documentElement.setAttribute('data-theme', systemTheme);
      updateIcon(systemTheme);
      localStorage.setItem('theme', systemTheme);

      console.log(`Usando preferência do sistema: ${systemTheme}`);
    }
  }

  // Configura o botão
  function setupButton() {
    // Adiciona atributos de acessibilidade
    themeToggle.setAttribute('role', 'button');
    themeToggle.setAttribute('tabindex', '0');

    // Evento de clique
    themeToggle.addEventListener('click', toggleTheme);

    // Evento de teclado (Enter/Space)
    themeToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });

    // Animações de hover
    themeToggle.addEventListener('mouseenter', () => {
      themeToggle.style.transform = 'scale(1.1)';
    });

    themeToggle.addEventListener('mouseleave', () => {
      themeToggle.style.transform = 'scale(1)';
    });
  }

  // Função para sincronizar entre abas
  function setupTabSync() {
    window.addEventListener('storage', (e) => {
      if (e.key === 'theme') {
        loadTheme();
      }
    });
  }

  // Inicialização
  function init() {
    // Detecta preferência do sistema (apenas se não houver tema salvo)
    detectSystemPreference();

    // Carrega tema salvo
    loadTheme();

    // Configura botão
    setupButton();

    // Sincronização entre abas
    setupTabSync();

    // Observa mudanças na preferência do sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      // Só muda automaticamente se o usuário não tiver feito uma escolha
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        updateIcon(newTheme);
        localStorage.setItem('theme', newTheme);
      }
    });

    console.log('Dark Mode inicializado');
  }

  // Inicializa
  init();
});

window.darkMode = {
  toggle: function () {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) toggle.click();
  },
  setTheme: function (theme) {
    if (theme === 'dark' || theme === 'light') {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      const icon = document.querySelector('#theme-toggle i');
      if (icon) {
        if (theme === 'dark') {
          icon.classList.remove('fa-moon-o');
          icon.classList.add('fa-sun-o');
        } else {
          icon.classList.remove('fa-sun-o');
          icon.classList.add('fa-moon-o');
        }
      }
    }
  },
  getTheme: function () {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
};