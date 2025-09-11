/**
 * --------------------------------------------------------------
 * script-movie-resume.js
 * 
 * Gère l'affichage détaillé du film et de la séance sélectionnés.
 * Permet à l'utilisateur de visualiser toutes les infos importantes sur la séance choisie et de revenir ou d'annuler la réservation.
 * 
 * Fonctionnalités principales :
 *  - Récupération des données du film choisi et de la séance depuis le localStorage (`movieSelected`).
 *  - Affichage dynamique :
 *      - Image de fond et affiche du film.
 *      - Titre du film.
 *      - Horaire de la séance, langue (VF ou VOST) et heure de fin prévue.
 *      - Numéro de salle et pictogramme d'accessibilité si la salle est accessible.
 *  - Gestion des boutons d'annulation et de retour :
 *      - Annulation de la réservation : vide tout le localStorage et retourne à l'accueil.
 *      - Retour à la sélection de séance : vide le localStorage et retourne à la page précédente.
 * 
 * Structure & logiques principales :
 *  - Injection dynamique des données du film dans le DOM pour une expérience utilisateur immersive.
 *  - Contrôle de l’accessibilité (pictogramme si la salle l’est).
 *  - Nettoyage du localStorage pour éviter toute persistance de données lors d'un retour ou d'une annulation.
 *  - Navigation fluide et sécurisée entre les étapes du tunnel de réservation.
 * 
 * --------------------------------------------------------------
 */

//////////////////// Récupération des données du film et de la séance
const movieSelected = JSON.parse(localStorage.getItem("movieSelected"));


/////////////////// affichage des données du film selectionné

// Affichage du background
let blockMovieSelected = document.getElementById("block-movie-selected");
blockMovieSelected.style.backgroundImage = `url(../assets/images/illustrations/${movieSelected.image})`;

// Affichage de l'affiche du film
let showtimeResumeImage = document.getElementById("showtime-resume-image");
showtimeResumeImage.innerHTML = `<img src="../assets/images/illustrations/${movieSelected.image}" alt="Affiche du film ${movieSelected.title}">`;

// Affichage du titre du film
let showtimeResumeTitle = document.getElementById("showtime-resume-title");
showtimeResumeTitle.innerHTML = `<h2>${movieSelected.title}</h2>`;

// Affichage de l'horaire de la séance, langue et heure de fin
let showtimeResumeSchedule = document.getElementById("showtime-resume-schedule");
if(movieSelected.showtime.vf){
    showtimeResumeSchedule.innerHTML = `<p>${movieSelected.showtime.horaire} VF</p>
                                        <span>Fin prévu à ${movieSelected.showtime.fin} </span>`;
} else {
    showtimeResumeSchedule.innerHTML = `<p>${movieSelected.showtime.horaire} VOST</p>
                                        <span>Fin prévu à ${movieSelected.showtime.fin} </span>`;
}

// affichage du numéro de la salle et l'accés handicapé
let auditorium = document.getElementById("auditorium");
if(movieSelected.showtime.handicap){
auditorium.innerHTML = `<p>Salle ${movieSelected.showtime.salle}</p>
                        <img src="../assets/images/icons/accessibility-black.png" alt="pictogramme accés handicapé">`;
} else {
    auditorium.innerHTML = `<p>Salle ${movieSelected.showtime.salle}</p>`;
}

/////////////////// annulation de la réservation
let cancelBtn = document.getElementById("cancel-btn");

function cancelReservation(){
    // On vide les données du localStorage
    localStorage.clear();
    // On recharge la page d'acceuil
    window.location.href = "../index.html";
}

// On écoute le click sur le bouton d'annulation
if(cancelBtn){
    cancelBtn.addEventListener("click", cancelReservation);
}

/////////////////// retour au choix des séances en vidant le storage
let backBtn = document.getElementById("back-btn");

function goBackToShowtimeSelection(){
    // On vide les données du localStorage
    localStorage.clear();
    // On recharge la page de sélection de séance
    window.location.href = "showtime.html";
}

// On écoute le click sur le bouton de retour
if(backBtn){
    backBtn.addEventListener("click", goBackToShowtimeSelection);
}
