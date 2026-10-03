     document.addEventListener('click', (event) => {
                const menus = document.querySelectorAll('details');
  
                menus.forEach((menu) => {
                if (!menu.contains(event.target) && menu.hasAttribute('open')) {
                menu.removeAttribute('open');
                }
            });
        });