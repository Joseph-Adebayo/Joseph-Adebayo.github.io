const toggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');

toggle.addEventListener('click', () => {
    const open = navbar.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
});
