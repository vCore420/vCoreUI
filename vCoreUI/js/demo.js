// vCore Demo JavaScript

// Moveable Liquid Glass Card Functionality
(function() {
  const card = document.getElementById('demo-glass-card');
  if (!card) return;

  let startX, startY, cardX = 0, cardY = 0, dragging = false, dragOriginX, dragOriginY;

  // Find card's starting position relative to viewport
  function getCardOrigin() {
    const rect = card.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }

  function onPointerDown(e) {
    if (e.button !== undefined && e.button !== 0) return; // only left click
    dragging = true;
    card.classList.add('dragging');
    document.body.classList.add('noscroll');
    document.body.classList.add('noselect');

    const pointer = e.touches ? e.touches[0] : e;
    startX = pointer.clientX;
    startY = pointer.clientY;
    dragOriginX = cardX;
    dragOriginY = cardY;

    window.addEventListener('mousemove', onPointerMove, { passive: false });
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);
  }

  function onPointerMove(e) {
    if (!dragging) return;
    e.preventDefault();
    const pointer = e.touches ? e.touches[0] : e;
    const dx = pointer.clientX - startX;
    const dy = pointer.clientY - startY;
    cardX = dragOriginX + dx;
    cardY = dragOriginY + dy;
    card.style.transform = `translate(${cardX}px, ${cardY}px)`;
  }

  function onPointerUp(e) {
    dragging = false;
    card.classList.remove('dragging');
    document.body.classList.remove('noscroll');
    document.body.classList.remove('noselect');

    // Snap back
    cardX = 0;
    cardY = 0;
    card.style.transition = 'transform 0.38s cubic-bezier(.22,1.61,.36,1)';
    card.style.transform = 'translate(0,0)';
    setTimeout(() => {
      card.style.transition = ''; // reset to CSS
    }, 400);

    window.removeEventListener('mousemove', onPointerMove);
    window.removeEventListener('touchmove', onPointerMove);
    window.removeEventListener('mouseup', onPointerUp);
    window.removeEventListener('touchend', onPointerUp);
  }

  card.addEventListener('mousedown', onPointerDown);
  card.addEventListener('touchstart', onPointerDown, { passive: false });

})();


// Page Banner re sizing Functionality 
(function() {
  const banner = document.querySelector('.banner');
  const description = banner.querySelector('.description');
  const bannerFullHeight = 120; // px
  const bannerMinHeight = 80;   // px
  const shrinkDistance = bannerFullHeight - bannerMinHeight;

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const progress = clamp(scrollY / shrinkDistance, 0, 1);
    const newHeight = bannerFullHeight - (bannerFullHeight - bannerMinHeight) * progress;
    banner.style.height = newHeight + 'px';
    banner.style.minHeight = newHeight + 'px';
    description.style.opacity = 1 - progress;

    // Add/remove class for CSS
    if (progress >= 1) {
      banner.classList.add('shrunk');
    } else {
      banner.classList.remove('shrunk');
    }
  }

  function onResize() {
    banner.style.height = '';
    banner.style.minHeight = '';
    description.style.opacity = '';
    banner.classList.remove('shrunk');
    onScroll();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  document.addEventListener('DOMContentLoaded', onScroll);
})();

(function() {
  const banner = document.querySelector('.banner');
  const menu = document.getElementById('slideoutMenu');

  function updateMenuTop() {
    const bannerRect = banner.getBoundingClientRect();
    menu.style.top = bannerRect.height + 'px';
  }

  // Update on scroll, resize, DOM load, and after banner animation
  window.addEventListener('scroll', updateMenuTop, { passive: true });
  window.addEventListener('resize', updateMenuTop);
  document.addEventListener('DOMContentLoaded', updateMenuTop);

  const observer = new MutationObserver(updateMenuTop);
  observer.observe(banner, { attributes: true, attributeFilter: ['style', 'class'] });
})();
