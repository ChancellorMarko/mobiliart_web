// Seleciona os elementos do DOM
const toggleButton = document.getElementById("accessibility-toggle");
const menu = document.getElementById("accessibility-menu");

// Alterna a visibilidade do menu de acessibilidade
toggleButton.addEventListener("click", () => {
  menu.classList.toggle("visible");
});

// Ativa ou desativa uma funcionalidade de acessibilidade no <body>
function toggleFeature(feature) {
  document.body.classList.toggle(feature);
}

// Remove todas as funcionalidades de acessibilidade aplicadas
function resetAccessibility() {
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
  features.forEach(f => document.body.classList.remove(f));
}
