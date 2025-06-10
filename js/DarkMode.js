document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');

  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.dataset.theme = savedTheme;

  themeIcon.classList.toggle('fa-sun-o', savedTheme === 'dark');
  themeIcon.classList.toggle('fa-moon-o', savedTheme === 'light');

  themeToggle.addEventListener('click', function () {
    const current = document.documentElement.dataset.theme;
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);

    themeIcon.classList.toggle('fa-sun-o', next === 'dark');
    themeIcon.classList.toggle('fa-moon-o', next === 'light');
  });
});
