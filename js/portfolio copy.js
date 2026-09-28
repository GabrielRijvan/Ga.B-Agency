document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // ÉLÉMENTS HTML
    // =========================

    const portfolioGrid = document.getElementById("portfolio-grid");
    const filterButtons = document.querySelectorAll(".filter-btn");

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxClose = document.getElementById("lightbox-close");


    // =========================
    // AFFICHER LE PORTFOLIO
    // =========================

    function displayPortfolio(category = "all") {

        portfolioGrid.innerHTML = "";

        const filteredItems = category === "all"
            ? portfolioItems
            : portfolioItems.filter(
                item => item.category === category
            );


        filteredItems.forEach(item => {

            const portfolioItem = document.createElement("div");

            portfolioItem.classList.add("portfolio-item");


            const image = document.createElement("img");

            image.src = item.image;
            image.alt = "Réalisation Ga.B Agency";

            image.loading = "lazy";


            portfolioItem.appendChild(image);

            portfolioGrid.appendChild(portfolioItem);


            // =========================
            // OUVRIR LA LIGHTBOX
            // =========================

            portfolioItem.addEventListener("click", () => {

                lightboxImage.src = item.image;

                lightbox.classList.add("active");

                lightbox.setAttribute("aria-hidden", "false");

                document.body.classList.add("no-scroll");

            });

        });

    }


    // =========================
    // FILTRES
    // =========================

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const category = button.dataset.filter;


            // Retirer active de tous les boutons
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });


            // Activer le bouton sélectionné
            button.classList.add("active");


            // Afficher la catégorie
            displayPortfolio(category);

        });

    });


    // =========================
    // FERMER LA LIGHTBOX
    // =========================

    function closeLightbox() {

        lightbox.classList.remove("active");

        lightbox.setAttribute("aria-hidden", "true");

        lightboxImage.src = "";

        document.body.classList.remove("no-scroll");

    }


    lightboxClose.addEventListener("click", closeLightbox);


    // Fermer en cliquant à côté de l'image
    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });


    // Fermer avec la touche Échap
    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeLightbox();
        }

    });


    // =========================
    // AFFICHAGE INITIAL
    // =========================

    displayPortfolio();

});