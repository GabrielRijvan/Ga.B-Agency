document.addEventListener("DOMContentLoaded", () => {

    /* ================= PAGE LOADER ================= */

    const pageLoader = document.getElementById("page-loader");

    if (pageLoader) {
        setTimeout(() => {
            pageLoader.classList.add("hidden");
        }, 1000);
    }

    /* ================= TALLY ================= */

    const TALLY_URL = "https://tally.so/r/QKP2Kp";

    const tallyLinks = document.querySelectorAll('a[href*="tally.so"]');

    tallyLinks.forEach(link => {
        link.href = TALLY_URL;
    });


    /* ================= HOMEPAGE LIGHTBOX ================= */

    const lightbox = document.getElementById("home-lightbox");
    const lightboxImage = document.getElementById("home-lightbox-image");
    const lightboxClose = document.getElementById("home-lightbox-close");

    const portfolioItems = document.querySelectorAll(
        ".portfolio-lightbox-trigger"
    );


    /*
     * Si le lightbox n'existe pas sur la page,
     * on ne fait rien.
     */
    if (!lightbox || !lightboxImage || !lightboxClose) {
        return;
    }


    /*
     * Quand on clique sur un visuel :
     * - on récupère son image
     * - on l'affiche dans le lightbox
     * - on affiche le lightbox
     * - on bloque le scroll de la page
     */
    portfolioItems.forEach(item => {

        item.addEventListener("click", () => {

            const image = item.querySelector("img");

            if (!image) {
                return;
            }

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            lightbox.classList.add("active");

            lightbox.setAttribute("aria-hidden", "false");

            document.body.classList.add("no-scroll");
        });

    });


    /*
     * Fonction de fermeture
     */
    function closeLightbox() {

        lightbox.classList.remove("active");

        lightbox.setAttribute("aria-hidden", "true");

        lightboxImage.src = "";

        document.body.classList.remove("no-scroll");
    }


    /*
     * Bouton X
     */
    lightboxClose.addEventListener("click", closeLightbox);


    /*
     * Clic sur la zone noire autour de l'image
     */
    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });


    /*
     * Touche Échap
     */
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeLightbox();
        }

    });

});




/* =========================
   SCROLL ANIMATIONS
========================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .service-card, .portfolio-preview-item, .process-item, .about-image, .about-text, .final-cta-content"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});