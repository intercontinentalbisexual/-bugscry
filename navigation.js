const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('.site-menu');

if (menuToggle && siteMenu) {
    function setMenuState(isOpen) {
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('menu-open', isOpen);
    }

    function closeMenu() {
        setMenuState(false);
    }

    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        setMenuState(!isOpen);
    });

    document.addEventListener('click', event => {
        if (
            document.body.classList.contains('menu-open') &&
            !siteMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    siteMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && document.body.classList.contains('menu-open')) {
            closeMenu();
        }
    });
}
