//////// Slider de la page index

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
let i = 0; // Index de l'image actuelle

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
slider.style.backgroundImage = `url( ${backgroundImg[0]})`;

// Changement de slide toutes les 3 secondes
setInterval(sliderBackground, 3000);