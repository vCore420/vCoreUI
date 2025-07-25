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