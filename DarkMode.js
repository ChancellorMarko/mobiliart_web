// Código para controle do tema escuro/claro
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  
  // Verifica se há preferência salva
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Atualiza o ícone baseado no tema atual
  if (currentTheme === 'dark') {
    themeIcon.classList.remove('fa-moon-o');
    themeIcon.classList.add('fa-sun-o');
  }
  
  // Alterna o tema quando o botão é clicado
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Alterna o ícone
    if (newTheme === 'dark') {
      themeIcon.classList.remove('fa-moon-o');
      themeIcon.classList.add('fa-sun-o');
    } else {
      themeIcon.classList.remove('fa-sun-o');
      themeIcon.classList.add('fa-moon-o');
    }
  });
});