document.addEventListener('DOMContentLoaded', function () {

  /* =========================================
     PACKAGE FILTERS
     ========================================= */

  const filterButtons = document.querySelectorAll('.chip');
  const packageCards = document.querySelectorAll('.package-card');

  filterButtons.forEach((button) => {

    button.addEventListener('click', function () {

      const selectedFilter = button.dataset.filter;

      /* Remove active state from all filters */
      filterButtons.forEach((btn) => {
        btn.classList.remove('active');
      });

      /* Activate selected filter */
      button.classList.add('active');

      /* Show / hide package cards */
      packageCards.forEach((card) => {

        const categories =
          card.dataset.category
            ? card.dataset.category.split(' ')
            : [];

        if (
          selectedFilter === 'all' ||
          categories.includes(selectedFilter)
        ) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }

      });

    });

  });


  /* =========================================
     AUTO SELECT PACKAGE
     WHEN "BOOK THIS STAY" IS CLICKED
     ========================================= */

  const packageButtons =
    document.querySelectorAll('.package-book-btn');

  const packageSelect =
    document.querySelector(
      '#bookingForm select[name="package"]'
    );

  packageButtons.forEach((button) => {

    button.addEventListener('click', function () {

      const selectedPackage =
        button.dataset.package;

      if (
        packageSelect &&
        selectedPackage
      ) {

        packageSelect.value =
          selectedPackage;

        /* Trigger change event */
        packageSelect.dispatchEvent(
          new Event('change', {
            bubbles: true
          })
        );

      }

    });

  });


  /* =========================================
     SMOOTH SCROLL FOR INTERNAL LINKS
     ========================================= */

  const internalLinks =
    document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {

    link.addEventListener('click', function (event) {

      const targetId =
        link.getAttribute('href');

      if (
        !targetId ||
        targetId === '#'
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

      }

    });

  });


  /* =========================================
     BOTTOM NAVIGATION ACTIVE STATE
     ========================================= */

  const navItems =
    document.querySelectorAll(
      '.bottom-nav .nav-item'
    );

  navItems.forEach((item) => {

    item.addEventListener('click', function () {

      navItems.forEach((navItem) => {
        navItem.classList.remove('active');
      });

      item.classList.add('active');

    });

  });


  /* =========================================
     REVEAL ANIMATION
     ========================================= */

  const revealElements =
    document.querySelectorAll('.reveal');

  if (
    'IntersectionObserver' in window &&
    revealElements.length > 0
  ) {

    const observer =
      new IntersectionObserver(
        function (entries) {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                'is-visible'
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.15
        }
      );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add('is-visible');
    });

  }

});
