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