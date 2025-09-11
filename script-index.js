/**
 * ------------------------------------------------------------------
 * script-index.js
 * 
 * Script principal de la page d'accueil du site de réservation de cinéma.
 * 
 * Fonctionnalités principales :
 *  - Slider automatique d'images en fond (bannières de films) avec effet de fondu.
 *  - Annulation de la réservation (réinitialisation du localStorage et retour à l'accueil).
 *  - Affichage conditionnel du bouton "Reprendre la réservation" si une réservation existe en cours,
 *    permettant à l'utilisateur de reprendre la sélection des places.
 * 
 * ------------------------------------------------------------------
 */


//////////////////// Slider de la page index

// création du tableau contenant les url des images du background pour le slider
const backgroundImg = [
    "assets/images/banners/scene_film_nobody_2.png",
    "assets/images/banners/affiche_film_evanouis.png",
    "assets/images/banners/affiche_film_le_monde_de_wishy.png",
    "assets/images/banners/affiche_film_y_a_t_il_un_flic_pour_sauver_le_monde.png",
    "assets/images/banners/affiche_film_karate_kid_legendes.png",
    "assets/images/banners/scene_film_evanouis.png",
    "assets/images/banners/scene_film_karate_kid_legendes.png",
    "assets/images/banners/scene_film_le_monde_de_wishy.png",
    "assets/images/banners/affiche_film_nobody_2.png"
]

const slider = document.getElementById("slider"); // Récupération de l'élément du DOM par son id
let i = 1; // Index de l'image actuelle

// Création de la fonction sliderBackground
function sliderBackground(){
    // effet de fade out (disparition)
    slider.style.opacity = 0.1; // opacité à 20%
    setTimeout(() => {
        // On change l'image dans le slider
        slider.style.backgroundImage = `url(${backgroundImg[i]})`;

        // effet de fade in (apparition)
        slider.style.opacity = 1; // opacité à 100%

        // on passe à l'image suivante
        i++;
        // si i dépasse la longueur du tableau, on revient à 0
        if( i >= backgroundImg.length ){
            i = 0;
        }

    }, 400) // durée de l'animation de fondu
}

// Affichage de la premiére slide
slider.style.backgroundImage = `url(${backgroundImg[0]})`;

// Changement de slide toutes les 3 secondes
setInterval(sliderBackground, 3000);

//////////////////// annulation de la réservation
let cancelBtn = document.getElementById("cancel-btn");

function cancelReservation(){
    // On vide les données du localStorage
    localStorage.clear();
    // On recharge la page d'acceuil
    window.location.href = "index.html";
}

// On écoute le click sur le bouton d'annulation
if(cancelBtn){
    cancelBtn.addEventListener("click", cancelReservation);
}


//////////////////// Affichage du bouton de reprise de la réservation
////// Récupération du localStorage
let movieSelected = JSON.parse(localStorage.getItem("movieSelected"));

const BannerContinueReservation = document.getElementById("banner-continue-reservation");
// on verifie si movieSelected existe
if(movieSelected){
    BannerContinueReservation.innerHTML = `<button class="continue-btn" id="continue-btn">
                                                <span>Reprendre la reservation</span>
                                                <img src="/assets/images/icons/arrow.png"
                                                    alt="flèche vers la reprise de la réservation des places de cinéma"
                                                    title="Reprendre la reservation des places de cinéma Pathé">
                                            </button>`
    document.getElementById("continue-btn").addEventListener("click", continueReservation);
}


// Function reprise de la reservation
function continueReservation(){
    window.location.href = 'pages/seat_selection.html'
}