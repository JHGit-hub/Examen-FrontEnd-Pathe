/**
 * --------------------------------------------------------------
 * script-resume-reservation.js
 * 
 * Gère la page récapitulative finale de la réservation.
 * Affiche à l’utilisateur toutes les informations importantes de sa commande, 
 * et permet de revenir à l’accueil en réinitialisant le panier.
 * 
 * Fonctionnalités principales :
 *  - Récupération des données de réservation : sièges sélectionnés (`selectedSeats`) et total du panier (`totalCart`) depuis le localStorage.
 *  - Affichage dynamique du récapitulatif dans le DOM :
 *      - Titre du film sélectionné.
 *      - Détail de l’horaire et de la langue de la séance (VF ou VOST).
 *      - Liste des sièges réservés.
 *      - Prix total de la commande.
 *  - Bouton "Retour à l’accueil" qui vide le localStorage et redirige vers la page d’accueil.
 * 
 * Structure & logiques principales :
 *  - Génération dynamique du HTML pour le résumé de la séance et du panier.
 *  - Utilisation du localStorage pour persister les choix de l’utilisateur jusqu’à la fin du processus de réservation.
 *  - Nettoyage du localStorage pour permettre une nouvelle réservation propre après retour à l’accueil.
 * 
 * --------------------------------------------------------------
 */

//////////////////// Récupération des données de réservation
let selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
let totalCart = JSON.parse(localStorage.getItem("totalCart"));



//////////////////// Affichage des éléments dans le DOM
const resumeShowtime = document.getElementById("resume-showtime");

let html = "";
// intégration du titre
html += `<h6>${movieSelected.title}</h6>`;

// intégration de l'horaire et de la langue
if(movieSelected.showtime.vf){
    html += `<div class="showtime-detail"><h4>Séance ${movieSelected.showtime.horaire} VF</h4>`;
} else {
    html += `<h4>Séance ${movieSelected.showtime.horaire} VOST</h4>`;
}

// intégration des sièges sélectionnés
html += `<h4>Siège(s) ${selectedSeats.join(", ")}</h4>`;

// intégration du prix total
html += `<h4>Total : ${totalCart.toFixed(2)} €</h4></div>`;

// intégration de l'ensemble dans le DOM
resumeShowtime.innerHTML = html;


//////////////////// Retour à la page d'accueil et reset du localStorage
const backToHome = document.getElementById("back-to-home");
backToHome.addEventListener("click", function() {
    localStorage.clear();
    // retour vers l'accueil
    window.location.href = "../index.html";
});
