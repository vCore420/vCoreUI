// vCoreUI SlideOut Menu

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

//Page switcher 
(function() {
  const menuLinks = document.querySelectorAll('#slideoutMenu [data-page]');
  const pages = document.querySelectorAll('.container .page'); // Change to the class you want to have pages on 
  const menuItems = document.querySelectorAll('#slideoutMenu li');

  function setActiveMenu(pageId) {
    let prevActive = document.querySelector('#slideoutMenu li.active');
    let newActiveIdx = Array.from(menuLinks).findIndex(link => "page-" + link.dataset.page === pageId);
    let newActive = menuItems[newActiveIdx];

    // Swirl out old pointer
    if (prevActive && prevActive !== newActive) {
      prevActive.classList.add('swirl-out');
      setTimeout(() => {
        prevActive.classList.remove('active', 'swirl-out');
        // Swirl in new pointer after old is gone
        if (newActive && !newActive.classList.contains('active')) {
          newActive.classList.add('active', 'swirl-in');
          setTimeout(() => {
            newActive.classList.remove('swirl-in');
          }, 300); // swirl-in duration
        }
      }, 300); // swirl-out duration
    } else if (newActive && !newActive.classList.contains('active')) {
      // If no previous, just swirl in
      newActive.classList.add('active', 'swirl-in');
      setTimeout(() => {
        newActive.classList.remove('swirl-in');
      }, 300);
    }
  }

  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const pageId = "page-" + this.dataset.page;
      pages.forEach(page => {
        page.classList.toggle('active', page.id === pageId);
      });
      setActiveMenu(pageId);
      // Optionally: Close menu if needed
    });
  });

  // Set pointer on initial load
  setActiveMenu('page-main-demo');
})();