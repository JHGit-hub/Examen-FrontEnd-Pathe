/////// Gestion du catalogue des films à l'affiche et leurs séances

// Import des données depuis un fichier JSON
fetch('../films.json')
    .then(response => response.json())
    .then(data => {

        // liste des films
        let moviesList = data;

        ////// animation au pointeur
        // On récupére le pointer dans le DOM
        const pointer = document.getElementById('pointer');
        document.addEventListener("mousemove", (event) => {
            // on récupére la position de la souris en temps réel
            let posX = event.clientX; // position du pointeur sur la fenetre
            let posY = event.clientY;
            // on modifie la position de "pointer" en fonction de la position de la souris
            pointer.style.left = posX + "px";
            pointer.style.top = posY + "px";
        });






        //// filtrage selon genres, formats ou langues
        // On récupére l'élément DOM des filtres par leur id
        const genreFilter = document.getElementById('genre-filter');
        const formatFilter = document.getElementById('format-filter');
        const languageFilter = document.getElementById('language-filter');
        const keywordFilter = document.getElementById('filter-input');

        // reécupération de la section incluant les films et leurs séances
        const showtimeSection = document.getElementById('showtime-section');
   
        ////// convertion de la durée en heure + minutes
        function formattedDuration(duration) {
            // on calcul le nombre d'heures
            // on divise la durée par 60 et Math.floor nous donne l'entier inférieur
            const hours = Math.floor(duration / 60);
            // on utilise modulo (%) pour obtenir le reste de la division du dessus
            const minutes = duration % 60;
            // on retourne le resultat au format heure / min
            return `${hours}h ${minutes}`;
        }


        /////// fonction d'affichage des films
        function displayMoviesList(list){
            // On vide la section des films avant d'afficher les nouveaux films
            showtimeSection.innerHTML = "";

            //// création des differents elements necesssaire à l'affichage des séances
            // Informations de chaque film (images, titres, mentions, durée, etc...)
            let image = []; // illustration du film
            let title = []; // titre du film
            let violenceAlert = []; // mention "film violent"
            let duration = []; // durée du film
            let genre = []; // genre du film
            let ageMini = []; // âge minimum recommandé

            // création des div pour structue HTML des cards des films
            let divMovieCard = [];
            let divMovieText = [];
            let divAboutMovie = [];
            let divDetailMovie = [];

            // création des divMovieRow pour affichage des film et leurs séances
            let divMovieRow = [];

            // On boucle sur la liste des cinémas
            for(k=0; k < list.length; k++){
                //// création de k élement par tableau et attribution texet/html par éléments

                // Informations de chaque séance ( formats, horaires, langues, etc ...)
                let schedule =[]; // horaires des séances
                let handicap = []; // séances accessibles aux personnes en situation de handicap
                let language = []; // séances en version française ou en version originale sous-titrée en français

                // création des div pour structue HTML des cards des séances
                let divShowtimeRow = [];
                let divShowtimeCard = [];
                let divDetailShowtime = [];
                let divSchedule = [];
                let divMovieFormat = [];

                ////// divMovieRow
                divMovieRow.push(document.createElement('div')); // création d'une div pour la ligne du film
                divMovieRow[k].className = "movie-row"; // attribution d'une classe


                ////// création des cards des films
                ////// divMovieCard -> inclus dans divMovieRow
                divMovieCard.push(document.createElement('div')); // création d'une div pour la carte du film
                divMovieCard[k].className = "movie-card";

                //// image -> inclus dans divMovieCard
                image.push(document.createElement('div'));
                image[k].className = "movie-img";
                image[k].innerHTML = `<a href ="${list[k].trailer}" alt="Bande annonce du film ${list[k].title}" target="_blank">
                                        <img src="../assets/images/illustrations/${list[k].image}" alt="Affiche du film ${list[k].title}">
                                    </a>`;

                //// divMovieText -> inclus dans divMovieCard
                divMovieText.push(document.createElement('div'));
                divMovieText[k].className = "movie-text";

                // divAboutMovie -> alerte frisson ou nouveau -> inclus dans divMovieText
                divAboutMovie.push(document.createElement('div'));
                if(list[k].mention_frisson){
                    divAboutMovie[k].className = "scary-alert";
                    divAboutMovie[k].innerHTML = `<p>Frisson</p>`;
                } else if(list[k].nouveau){
                    divAboutMovie[k].className = "new-alert";
                    divAboutMovie[k].innerHTML = `<p>Nouveau</p>`;
                }

                //  title -> titre du film -> inclus dans divMovieText
                title.push(document.createElement('h2'));
                title[k].className = "title-movie";
                title[k].textContent = `${list[k].titre}`;

                // divDetailMovie -> detail du film -> inclus dans divMovieText
                divDetailMovie.push(document.createElement('div'));
                divDetailMovie[k].className = "detail-movie";

                genre.push(document.createElement('p'));
                genre[k].textContent = `${list[k].genre}`;

                duration.push(document.createElement('p'));
                duration[k].textContent = `(${formattedDuration(list[k].durée_minutes)})`;

                ageMini.push(document.createElement('div'));
                ageMini[k].className = "age-mini";
                if(list[k].âge_minimum >= 12 ){
                    ageMini[k].innerHTML = `<img src="../assets/images/icons/no-under-12.png" alt="Interdit aux moins de 12 ans">`;
                }

                violenceAlert.push(document.createElement('div'));
                violenceAlert[k].className = "violence-alert";
                if(list[k].avertissement_violence){
                    violenceAlert[k].innerHTML = `<img src="../assets/images/icons/alert-violence.png" alt="Avertissement : film violent">`;
                }

                // Intégration des div dans leurs parents
                divDetailMovie[k].appendChild(genre[k]);
                divDetailMovie[k].appendChild(duration[k]);
                divDetailMovie[k].appendChild(ageMini[k]);
                divDetailMovie[k].appendChild(violenceAlert[k]);

                divMovieText[k].appendChild(divAboutMovie[k]);
                divMovieText[k].appendChild(title[k]);
                divMovieText[k].appendChild(divDetailMovie[k]);

                divMovieCard[k].appendChild(image[k]);
                divMovieCard[k].appendChild(divMovieText[k]);

                divMovieRow[k].appendChild(divMovieCard[k]);


                ////// Création des séances des films
                divShowtimeRow[k] = document.createElement('div');
                divShowtimeRow[k].className = "showtime-row";

                for(let j=0; j < list[k].séances.length; j++){

                    //// divShowtimeCard -> inclus dans divShowtimeRow
                    divShowtimeCard.push(document.createElement('div'));
                    divShowtimeCard[j].className = "showtime-card";
                    divShowtimeCard[j].id = `${list[k].titre}-${list[k].séances[j].horaire}`;

                    // divMovieFormat -> inclus dans divShowtimeCard
                    divMovieFormat.push(document.createElement('div'));
                    divMovieFormat[j].className = "movie-format";
                    
                    if(list[k].séances[j].imax){
                        divMovieFormat[j].innerHTML = `<img src="../assets/images/icons/imax.png" alt="Format IMAX">`;
                    } else if(list[k].séances[j]["4D"]){
                        divMovieFormat[j].innerHTML = `<img src="../assets/images/icons/4dx.png" alt="Format 4DX">`;
                    } else if(list[k].séances[j]["4k"]){
                        divMovieFormat[j].innerHTML = `<img src="../assets/images/icons/4k.png" alt="Format 4K">`;
                    }

                    // divDetailShowtime -> inclus dans divShowtimeCard
                    divDetailShowtime.push(document.createElement('div'));
                    divDetailShowtime[j].className = "detail-showtime";

                    // divSchedule -> inclus dans divDetailShowtime
                    divSchedule.push(document.createElement('div'));
                    divSchedule[j].className = "schedule";

                    // schedule -> inclus dans divSchedule
                    schedule.push(document.createElement('p'));
                    schedule[j].textContent = `${list[k].séances[j].horaire}`;

                    // language -> inclus dans divSchedule
                    language.push(document.createElement('span'));
                    if(list[k].séances[j].vf) {
                        language[j].innerText = "VF";
                    } else if(list[k].séances[j].vost) {
                        language[j].innerText = "VOST";
                    }


                    // handicap -> inclus dans divDetailShowtime
                    handicap.push(document.createElement('div'));
                    handicap[j].className = "handicap";
                    if(list[k].séances[j].handicap) {
                        handicap[j].innerHTML =  `<img src="../assets/images/icons/accessibility-white.png" alt="Accessible aux personnes en situation de handicap">`;
                    }

                    // Intégration des div dans leurs parents
                    divSchedule[j].appendChild(schedule[j]);
                    divSchedule[j].appendChild(language[j]);

                    divDetailShowtime[j].appendChild(divSchedule[j]);
                    divDetailShowtime[j].appendChild(handicap[j]);

                    divShowtimeCard[j].appendChild(divMovieFormat[j]);
                    divShowtimeCard[j].appendChild(divDetailShowtime[j]);

                    divShowtimeRow[k].appendChild(divShowtimeCard[j]);

                }

                // Intégration des cards des séances dans la div incluant le detail du film
                divMovieRow[k].appendChild(divShowtimeRow[k]);
                // Intégration de la div incluant le film et ses séances dans la section showtime-section
                showtimeSection.appendChild(divMovieRow[k]);
            }

            // écoute du click sur une réservation
            // Selection des séances
            const showtimeCards = document.querySelectorAll('.showtime-card');

            // on boucle sur toutes les séances pour ajouter les écouteurs de click
            showtimeCards.forEach(card => {
                card.addEventListener('click', reserveShowtime);
            });
            // Ecoute des mouvements de la souris au dessus des showtime-card
            showtimeCards.forEach( card => {
                card.addEventListener('mouseenter', () => { // au survol SUR la card
                    pointer.style.display = 'block';
                });
                card.addEventListener('mouseleave', () => { // quand NE survol PLUS la card
                    pointer.style.display = 'none';
                });
            });




        }


        // affichage initial des films
        displayMoviesList(moviesList);


        /////// fonction de filtrage des films
        function filterSelectMovies() {
        // On récupére les valeurs des filtres
        const genreValue = genreFilter.value;
        const formatValue = formatFilter.value;
        const languageValue = languageFilter.value;
        const keywordValue = keywordFilter.value.toLowerCase().trim(); // trim() evite les espaces, toLowerCase() evite la casse

            // Filtrer les films en fonction des sélections
            const moviesListFiltered = moviesList
                .map(movie => { // on utilise map pour filtrer les films et redonner un nouveau tableau des séances
                    // filtrer selon leurs formats
                    const filteredShowtimes = movie.séances.filter(showtime => {

                    // filtre par format
                    // On extrait la (les) séances qui correspondent au format choisi
                    const moviesFilterByFormat = formatValue === "" || // toutes les séances de tous les formats
                        (formatValue === "imax" && showtime.imax) || // uniquement les séances en imax
                        (formatValue === "4D" && showtime["4D"]) || // uniquement les séances en 4DX
                        (formatValue === "4k" && showtime["4k"]); // uniquement les séances en 4K

                    // filtre par langue
                    // On extrait la (les) séances qui correspondent à la langue choisie
                    const moviesFilterByLanguage = languageValue === "" || // toutes les séances
                        (languageValue === "vf" && showtime.vf) || // uniquement les séances en français
                        (languageValue === "vost" && showtime.vost); // uniquement les séances en vost

                        return moviesFilterByFormat && moviesFilterByLanguage;
                    });

                    return { // on renvoi le film avec toutes ses propriétés  mais on remplace la partie séances par celles filtrées
                        ...movie, // spread operator pour recréer un nouvel objet film
                        séances: filteredShowtimes // on remplace les séances par celles filtrées
                    };

                })
                .filter(movie =>
                    // on filtre pour ne garder que les films qui correspondent aux genres
                    (movie.genre.includes(genreValue) || genreValue === "") &&

                    // et qui correspondent aux mots clefs saisis
                    (movie.titre.toLowerCase().includes(keywordValue) || keywordValue === "") &&

                    // et dont au moins une séance filtrée est présente
                    (movie.séances.length > 0)
                )

            // affichage des films filtrés
            displayMoviesList(moviesListFiltered);
        }


        ////// fonction poure reserver sa séance aprés avoir cliqué
        function reserveShowtime(){
            // on récupére la valeur de l'id de la séance cliquée
            const showtimeId = this.id;

            // on découpe l'id pour récupérer le nom du film et l'horaire
            const hyphen = showtimeId.lastIndexOf("-"); // lastIndexOf() donne la derniére position dans la chaine de caractére du signe "-"
            const movieTitle = showtimeId.substring(0, hyphen); // on extrait le tire en partant de 0 jusqu'au "-"
            const showtime = showtimeId.substring(hyphen +1); // on extrait l'horaire en partant du "-" jusqu'à la fin de la chaine

            // on cherche le film correspondant
            const movieReservation = moviesList.find(movie => movie.titre === movieTitle); // renvoi le premiére ligne correspondante

            // on cherche la séance correspondante
            const showtimeReservation = movieReservation.séances.find(séance => séance.horaire === showtime);

            // On stocke dans le localStorage
            if(movieReservation && showtimeReservation){
                localStorage.setItem("movieSelected", JSON.stringify({ // converti en JSON
                    title: movieReservation.titre,
                    image: movieReservation.image,
                    showtime: showtimeReservation
                }));
                // on ouvre la page suivante
                window.location.href = "seat_selection.html";
            } else {
                alert("la séance n'a pas été trouvée");
            }
        }
        
        

        // écoute des changements sur les filtres
        genreFilter.addEventListener('change', filterSelectMovies);
        formatFilter.addEventListener('change', filterSelectMovies);
        languageFilter.addEventListener('change', filterSelectMovies);
        keywordFilter.addEventListener('input', filterSelectMovies);



    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });
    