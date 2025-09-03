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

// Affichage du nombre de place libre
let freeSeats = document.getElementById("free-seats");
freeSeats.innerHTML = `<p>${movieSelected.showtime.libres} places libres</p>`;

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


/////////////////// Génération des places de cinéma
// Sélection de la div contenant le plan de salle
const theater = document.getElementById("theater");

// Attribution des variables
const rows = 14;
const columns = 21; // soit 294 places

// On calcul le nombre siége occupé
let occupiedSeatCount = 294 - movieSelected.showtime.libres;

////// On créé un tableau avec tous les id des siéges
let allSeatId = [];

for( let i = 0 ; i < rows ; i++){
    // On donne une lettre à chaque ligne
    let rowLetter = String.fromCharCode(65 + i); // Code ASCII, on commence à partir de A

    // A chaque ligne, on créé un id et on l'ajoute au tableau
    for( let j = 1; j <= columns ; j++){
        allSeatId.push(`${rowLetter}${j}`);
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
        }

        // On ajoute le siége créé au plan de salle
        theater.appendChild(seat);
    }
}