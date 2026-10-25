document.addEventListener('DOMContentLoaded', () => {
  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('.package-card');

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((item) => item.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.dataset.filter;

      cards.forEach((card) => {
        const matches = filter === 'all' || card.dataset.category.includes(filter);
        card.classList.toggle('hidden', !matches);
      });
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const button = form.querySelector('.form-submit');
      if (!button) return;

      const originalText = button.textContent;
      button.textContent = 'Request sent';
      button.disabled = true;
      button.style.opacity = '0.8';

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.opacity = '1';
        form.reset();
      }, 1800);
    });
  }
});
