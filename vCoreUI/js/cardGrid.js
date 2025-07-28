// vCoreUI Card Grid

(function() {
  const grid = document.getElementById('cardGrid');
  if (!grid) return;

  // Create modal overlay
  const modal = document.createElement('div');
  modal.className = 'card-modal';
  modal.innerHTML = `
    <div class="card-modal-content">
      <span class="card-modal-close">&times;</span>
      <div class="card-modal-carousel">
        <img class="card-modal-img" src="" alt="Preview">
        <button class="card-modal-prev">&#8592;</button>
        <button class="card-modal-next">&#8594;</button>
      </div>
      <div class="card-modal-label"></div>
      <div class="card-modal-desc"></div>
    </div>
  `;
  document.body.appendChild(modal);

  let currentImages = [], currentIdx = 0;

  function openModal(images, label, desc) {
    currentImages = images;
    currentIdx = 0;
    modal.querySelector('.card-modal-img').src = images[0];
    modal.querySelector('.card-modal-label').textContent = label;
    modal.querySelector('.card-modal-desc').textContent = desc;
    modal.style.display = 'flex';
  }

  function closeModal() {
    modal.style.display = 'none';
  }

  function showImage(idx) {
    if (!currentImages.length) return;
    currentIdx = (idx + currentImages.length) % currentImages.length;
    modal.querySelector('.card-modal-img').src = currentImages[currentIdx];
  }

  modal.querySelector('.card-modal-close').onclick = closeModal;
  modal.querySelector('.card-modal-prev').onclick = () => showImage(currentIdx - 1);
  modal.querySelector('.card-modal-next').onclick = () => showImage(currentIdx + 1);
  modal.onclick = (e) => { if (e.target === modal) closeModal(); };

  grid.querySelectorAll('.card').forEach(card => {
    card.onclick = function() {
      const images = JSON.parse(card.dataset.images || '[]');
      const label = card.dataset.title || '';
      const desc = card.dataset.description || '';
      if (images.length) openModal(images, label, desc);
    };
  });
})();