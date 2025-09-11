/**
 * --------------------------------------------------------------
 * script-seat-selection.js
 * 
 * Gère l'affichage et la sélection des places dans le plan de salle pour la réservation de cinéma.
 * 
 * Fonctionnalités principales :
 *  - Affiche le nombre de places libres pour la séance sélectionnée.
 *  - Génère dynamiquement le plan de salle, en indiquant les sièges disponibles et occupés.
 *  - Permet à l'utilisateur de sélectionner ou désélectionner des sièges, avec visualisation en temps réel (icônes et liste).
 *  - Enregistre la sélection dans le localStorage pour la suite de la réservation.
 *  - Valide la sélection : si aucun siège n'est choisi, affiche un message d'erreur temporaire.
 *  - Affiche les sièges déjà sélectionnés si l'utilisateur revient sur cette page.
 * 
 * Structure & logiques principales :
 *  - Calcul du nombre de sièges occupés et génération aléatoire de leur position.
 *  - Génération HTML de chaque siège, gestion des classes CSS et des icônes selon l'état (disponible, occupé, sélectionné...).
 *  - Interaction utilisateur : clic sur les sièges, validation de sélection, affichage dynamique des résultats.
 *  - Utilisation du localStorage pour la persistance de la sélection.
 * 
 * --------------------------------------------------------------
 */


/////////////////// Affichage du nombre de place libre
let freeSeats = document.getElementById("free-seats");
freeSeats.innerHTML = `<p>${movieSelected.showtime.libres} places libres</p>`;



/////////////////// Génération des places de cinéma
// Sélection de la div contenant le plan de salle
const theater = document.getElementById("theater");

// Attribution des variables
const rows = 18;
const columns = 19; // soit 306 places ( - 2 colonnes vides )

// On calcul le nombre siége occupé
let occupiedSeatCount = 306 - movieSelected.showtime.libres;

////// On créé un tableau avec tous les id des siéges
let allSeatId = [];

for( let i = 0 ; i < rows ; i++){
    // On donne une lettre à chaque ligne
    let rowLetter = String.fromCharCode(65 + i); // Code ASCII, on commence à partir de A

    // A chaque ligne, on créé un id et on l'ajoute au tableau
    for( let j = 1; j <= columns ; j++){
        if(j !== 4 && j !== 16){
            allSeatId.push(`${rowLetter}${j}`);
        }

    }
}


////// On mélange le tableau de façon aléatoire
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// shuffle() mélange le tableau, ...allSeatId permet de faire une copie de ce tableau
// .slice (0, occupiedSeatCount) va réduire la copie du tableau du nombre de siége occupé
// On obtient ainsi un tableau avec des id aléatoire aux nombres des siéges occupés
const occupiedSeat = shuffle([...allSeatId]).slice(0, occupiedSeatCount);


////// Génération de la grille
for( let i = 0 ; i < rows ; i++){
    // On donne une lettre à chaque ligne
    let rowLetter = String.fromCharCode(65 + i); // Code ASCII, on commence à partir de A
    // A chaque ligne, on créé une div pour les siéges en leur attribuant un id et une icone siége
    for( let j = 1; j <= columns ; j++){
        if(j === 4 || j === 16){
            const seat = document.createElement("div");
            // on donne la classe seat a chaque siége
            seat.classList.add("seat");
            // on lui attribue la classe vide
            seat.classList.add("empty-seat");
            // on l'ajoute au DOM
            theater.appendChild(seat);
        } else {
            let seatId = `${rowLetter}${j}`;
            const seat = document.createElement("div");
            // on donne la classe seat a chaque siége
            seat.classList.add("seat");
            // on lui donne son id unique
            seat.id = seatId;
            // on insére l'icone du siége selon s'il est occupé ou non
            if(occupiedSeat.includes(seatId)){
                // siége occupé, on affiche l'icone correspondant
                seat.innerHTML = `<img src="../assets/images/icons/seat-grey.png" alt="siége non disponible">`;
                // on lui attribue en plus la classe occupied
                seat.classList.add("occupied");
            } else {
                // siége disponible, on affiche l'icone correspondant
                seat.innerHTML = `<img src="../assets/images/icons/seat-yellow.png" alt="siége disponible">`;
                // on lui attribue en plus la classe available
                seat.classList.add("available");
            }

            // On ajoute le siége créé au plan de salle
            theater.appendChild(seat);
        }
    }
}

////// Sélection des siéges
// création du tableau des siéges selectionnés
let selectedSeats = [];
if(localStorage.getItem("selectedSeats")){
    selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
}

// Selection de l'ensemble des siéges
const allSeats = document.querySelectorAll('.seat');

// Selection de la zone d'affichage des siéges selectionnés
let seatReserved = document.getElementById("seat-reserved");

// Création de la function pour selectionné ou déselectionné la place
function toggleSelectionSeat() {
    // On vérifie si le siége est disponible
    // this correspond a la div que l'on a cliquer
    if(this.classList.contains("available")){
        // on passe de l'icone siége jaune à vert
        this.innerHTML = `<img src="../assets/images/icons/seat-green.png" alt="siége sélectionné">`;
        // on switch entre les classes "available" et "selected"
        this.classList.remove("available");
        this.classList.add("selected");
        // on enregistre la place dans le tableau des siéges selectionnés
        selectedSeats.push(this.id);

    } else {
        this.innerHTML = `<img src="../assets/images/icons/seat-yellow.png" alt="siége disponible">`;
        this.classList.remove("selected");
        this.classList.add("available");
        // on retire le siége du tableau des siéges selectionné grace à son id
        selectedSeats = selectedSeats.filter(seatId => seatId !== this.id);
    }

    // On affiche les siéges selectionnés que si au moins 1 id est selectionné
    if(selectedSeats.length !== 0){
        seatReserved.innerHTML = `<p>${selectedSeats.length} place(s) réservée(s) : ${selectedSeats.join(", ")}</p>`
    } else {
        seatReserved.innerHTML = "";
    }
}


// on boucle sur toutes les siéges pour ajouter les écouteurs de click
allSeats.forEach(seat => {
    seat.addEventListener('click', toggleSelectionSeat);
});

// Validation de la selection des siéges
const errorDiv = document.getElementById('error-msg');
// Selection de la zone a écouter
let makeReservation = document.getElementById("make-reservation");

// Création de la fonction de validation des places
function validateSelectedSeat(){
    // On stocke dans le localStorage
    if(selectedSeats.length !== 0){
        localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats)); // converti en JSON
        // on ouvre la page suivante
        window.location.href = "seat_resume.html";
    } else {
        errorDiv.textContent = "aucun siége n'est sélectionné";
        errorDiv.classList.remove('hidden');
        setTimeout(() => {
            errorDiv.textContent = "";
            errorDiv.classList.add('hidden');
        }, 3000); // Disparaît après 3 secondes
        return;
    }
}

// On écoute le click sur le bouton de réservation
makeReservation.addEventListener("click", validateSelectedSeat);





//////////////////// Affichage des places selectionnées si existe

////  On boucle sur les places selectionnées pour les afficher
selectedSeats.forEach(seatId => {
    let seat = document.getElementById(seatId);
    if(seat){
        // on affiche l'icone du siége sélectionné
        seat.innerHTML = `<img src="../assets/images/icons/seat-green.png" alt="siége sélectionné">`;
        // on switch entre les classes "available" et "selected"
        seat.classList.remove("available");
        seat.classList.add("selected");
    }
});

///// On affiche les id des siéges selectionnés si existe
if(selectedSeats.length !== 0){
    seatReserved.innerHTML = `<p>${selectedSeats.length} place(s) réservée(s) : ${selectedSeats.join(", ")}</p>`
} else {
    seatReserved.innerHTML = "";
}
