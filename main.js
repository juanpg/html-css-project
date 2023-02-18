window.addEventListener("load", () => {
    const storedTheme = localStorage.getItem('theme');

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (storedTheme !== 'light' || storedTheme !== 'dark') {
            setTheme(getPreferredTheme());
        }
    });

    document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const theme = toggle.getAttribute('data-bs-theme-value');
            localStorage.setItem('theme', theme);
            setTheme(theme);
            showActiveTheme(theme);
            setCookie('hairDay', theme);
        });
    });

    setTheme(getPreferredTheme());

    showActiveTheme(getPreferredTheme())

    function getPreferredTheme() {
        if(storedTheme) {
            return storedTheme;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function setCookie(cookieName, cookieData) {

        document.cookie = `${cookieName}=${cookieData};path=/`;
    }

    function setTheme(theme) {
        if(theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme);
        }
    }

    function showActiveTheme (theme) {
        const activeThemeIcon = document.querySelector('.theme-icon-active use');
        const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);
        const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href');
    
        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
          element.classList.remove('active');
        });
    
        btnToActive.classList.add('active');
        activeThemeIcon.setAttribute('href', svgOfActiveBtn);
    
    }
});