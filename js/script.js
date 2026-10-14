document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // 1. GESTION DU FOND DÉFILANT (MARQUEE)
  // =========================================
  const allItems = typeof portfolioItems !== "undefined" ? portfolioItems : [];
  const imagesPool = allItems.map(item => item.image);

  const marqueeBg = document.getElementById("marqueeBg");
  if (marqueeBg && imagesPool.length > 0) {
    let numberOfColumns = window.innerWidth < 768 ? 3 : 4;

    for (let i = 0; i < numberOfColumns; i++) {
      const column = document.createElement("div");
      column.classList.add("marquee-column");

      if (i % 2 === 0) {
        column.classList.add("scroll-up");
        column.style.animationDuration = `${35 + (i * 5)}s`;
      } else {
        column.classList.add("scroll-down");
        column.style.animationDuration = `${40 + (i * 3)}s`;
      }

      let shuffledImages = [...imagesPool].sort(() => Math.random() - 0.5);
      let columnImages = shuffledImages.concat(shuffledImages, shuffledImages);

      columnImages.forEach(src => {
        const item = document.createElement("div");
        item.classList.add("marquee-item");

        const img = document.createElement("img");
        img.src = src;
        img.alt = "Réalisation Ga.B Agency";
        img.loading = "lazy";

        item.appendChild(img);
        column.appendChild(item);
      });

      marqueeBg.appendChild(column);
    }
  }

  // =========================================
  // 2. GESTION DU MENU MOBILE (HAMBURGER)
  // =========================================
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    // Fermer le menu lorsqu'on clique sur un lien du menu
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }
});