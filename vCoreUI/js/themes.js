const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');

function setTheme(isLight) {
  document.body.classList.toggle('theme-light', isLight);
  themeLabel.textContent = isLight ? 'Light Mode' : 'Dark Mode';
}

themeToggle.addEventListener('change', function() {
  setTheme(this.checked);
});

// Optional: remember choice across page reloads
if (localStorage.getItem('theme') === 'light') {
  themeToggle.checked = true;
  setTheme(true);
}

themeToggle.addEventListener('change', function() {
  localStorage.setItem('theme', this.checked ? 'light' : 'dark');
  setTheme(this.checked);
});