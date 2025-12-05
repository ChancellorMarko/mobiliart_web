document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburger_menu_button');
    const navMenu = document.getElementById('nav_menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', function () {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
        });

        // Fechar o menu ao clicar nos links
        document.querySelectorAll('#nav_menu a').forEach(link => {
            link.addEventListener('click', function () {
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
});