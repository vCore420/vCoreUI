const menuToggle = document.getElementById('menuToggle');
const slideoutMenu = document.getElementById('slideoutMenu');

menuToggle.addEventListener('click', function() {
  const isOpen = menuToggle.classList.toggle('open');
  slideoutMenu.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', isOpen);
  slideoutMenu.setAttribute('aria-hidden', !isOpen);

  // close menu on outside click
  if (isOpen) {
    document.addEventListener('mousedown', closeOnOutside);
  } else {
    document.removeEventListener('mousedown', closeOnOutside);
  }
});

function closeOnOutside(e) {
  if (!slideoutMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    menuToggle.classList.remove('open');
    slideoutMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', false);
    slideoutMenu.setAttribute('aria-hidden', true);
    document.removeEventListener('mousedown', closeOnOutside);
  }
}