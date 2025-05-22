document.addEventListener('DOMContentLoaded', () => {
  // === MENU TOGGLE ===
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.add('show');
    });
  }
  if (menuClose) {
    menuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('show');
    });
  }

  // === DROPDOWN SUBMENU ===
  document.querySelectorAll('.submenu-toggle').forEach((toggle) => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      const parent = this.closest('.has-submenu');
      const submenu = parent.querySelector('.submenu');
      const arrowIcon = this.querySelector('.arrow');
      const mainText = this.querySelector('.menu-main');

      const isOpen = submenu.classList.contains('show');
      document.querySelectorAll('.submenu').forEach((el) => el.classList.remove('show'));
      document.querySelectorAll('.arrow').forEach((img) => img.classList.remove('rotate'));
      document.querySelectorAll('.menu-main').forEach((el) => el.classList.remove('active'));

      if (!isOpen) {
        submenu.classList.add('show');
        arrowIcon.classList.add('rotate');
        mainText.classList.add('active');
      }
    });
  });

  // === UNIVERSAL SLIDER PROGRESS + LOOP ===
  function initSliders() {
    const sliders = document.querySelectorAll('.universal-slider');

    sliders.forEach((slider) => {
      const progressBar = slider.parentElement.querySelector('.progress-bar');
      const cards = Array.from(slider.querySelectorAll('.slider-card'));
      const cardCount = cards.length;

      if (cardCount === 0) return;

      const firstClone = cards[0].cloneNode(true);
      const lastClone = cards[cardCount - 1].cloneNode(true);
      slider.insertBefore(lastClone, cards[0]);
      slider.appendChild(firstClone);

      const realCards = slider.querySelectorAll('.slider-card');

      requestAnimationFrame(() => {
        const scrollTo = realCards[1].offsetLeft - slider.offsetLeft;
        slider.scrollLeft = scrollTo;
      });

      function updateProgressBar() {
        const scrollLeft = slider.scrollLeft;
        const totalScroll = slider.scrollWidth - slider.clientWidth;
        const progress = (scrollLeft / totalScroll) * 100;
        if (progressBar) {
          progressBar.style.width = `${progress}%`;
        }
      }

      slider.addEventListener('scroll', () => {
        window.requestAnimationFrame(updateProgressBar);
        const scrollLeft = slider.scrollLeft;
        const scrollMax = slider.scrollWidth - slider.clientWidth;
        const threshold = 5;

        if (scrollLeft <= threshold) {
          const lastRealCard = realCards[cardCount];
          slider.scrollLeft = lastRealCard.offsetLeft - slider.offsetLeft;
        }

        if (scrollLeft + slider.clientWidth >= scrollMax - threshold) {
          const firstRealCard = realCards[1];
          slider.scrollLeft = firstRealCard.offsetLeft - slider.offsetLeft;
        }
      });

      let isDown = false;
      let startX;
      let scrollStart;

      slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollStart = slider.scrollLeft;
      });
      slider.addEventListener('mouseleave', () => { isDown = false; });
      slider.addEventListener('mouseup', () => { isDown = false; });
      slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollStart - walk;
      });

      slider.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX;
        scrollStart = slider.scrollLeft;
      });
      slider.addEventListener('touchend', () => { isDown = false; });
      slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollStart - walk;
      });
    });
  }

  initSliders();

    // === STICKY HEADER SCROLL FEEDBACK ===
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

  // === FAQ ===
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const faqItem = button.closest('.faq-item');
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) item.classList.remove('active');
      });
      faqItem.classList.toggle('active');
    });
  });

  // === LOADER ===
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.remove('hidden');
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 2000);
  }

  // === SEARCH OVERLAY ===
  const openSearch = document.getElementById("open-search");
  const closeSearch = document.getElementById("close-search");
  const searchOverlay = document.getElementById("search-overlay");

  if (openSearch && closeSearch && searchOverlay) {
    openSearch.addEventListener("click", () => {
      searchOverlay.classList.remove("hidden");
    });

    closeSearch.addEventListener("click", () => {
      searchOverlay.classList.add("hidden");
    });

    searchOverlay.addEventListener("click", (e) => {
      if (!e.target.closest(".search-container")) {
        searchOverlay.classList.add("hidden");
      }
    });
  }
});

