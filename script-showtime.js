/////// Gestion du catalogue des films à l'affiche et leurs séances

// Import des données depuis un fichier JSON
fetch('../films.json')
    .then(response => response.json())
    .then(data => {

        // création des differents elements necesssaire à l'affichage des séances

        let showtimeSection = document.getElementById('showtime-section'); // section incluant les films et leurs séances
        // liste des films
        let moviesList = data;

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

        for(k=0; k < moviesList.length; k++){
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
            image[k].innerHTML = `<img src="../assets/images/illustrations/${moviesList[k].image}" alt="Affiche du film ${moviesList[k].title}">`;

            //// divMovieText -> inclus dans divMovieCard
            divMovieText.push(document.createElement('div'));
            divMovieText[k].className = "movie-text";

            // divAboutMovie -> alerte frisson ou nouveau -> inclus dans divMovieText
            divAboutMovie.push(document.createElement('div'));
            if(moviesList[k].mention_frisson){
                divAboutMovie[k].className = "scary-alert";
                divAboutMovie[k].innerHTML = `<p>Frisson</p>`;
            } else if(moviesList[k].nouveau){
                divAboutMovie[k].className = "new-alert";
                divAboutMovie[k].innerHTML = `<p>Nouveau</p>`;
            }

            //  title -> titre du film -> inclus dans divMovieText
            title.push(document.createElement('h3'));
            title[k].className = "title-movie";
            title[k].textContent = `${moviesList[k].titre}`;

            // divDetailMovie -> detail du film -> inclus dans divMovieText
            divDetailMovie.push(document.createElement('div'));
            divDetailMovie[k].className = "detail-movie";

            genre.push(document.createElement('p'));
            genre[k].textContent = `${moviesList[k].genre}`;

            duration.push(document.createElement('p'));
            duration[k].textContent = `(${moviesList[k].durée_minutes} min)`;

            ageMini.push(document.createElement('div'));
            ageMini[k].className = "age-mini";
            if(moviesList[k].âge_minimum >= 12 ){
                ageMini[k].innerHTML = `<img src="../assets/images/icons/no-under-12.png" alt="Interdit aux moins de 12 ans">`;
            }

            violenceAlert.push(document.createElement('div'));
            violenceAlert[k].className = "violence-alert";
            if(moviesList[k].avertissement_violence){
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

            for(let j=0; j < moviesList[k].séances.length; j++){

                //// divShowtimeCard -> inclus dans divShowtimeRow
                divShowtimeCard.push(document.createElement('div'));
                divShowtimeCard[j].className = "showtime-card";

                // divMovieFormat -> inclus dans divShowtimeCard
                divMovieFormat.push(document.createElement('div'));
                divMovieFormat[j].className = "movie-format";
                
                if(moviesList[k].séances[j].imax){
                    divMovieFormat[j].innerHTML = `<img src="../assets/images/icons/imax.png" alt="Format IMAX">`;
                } else if(moviesList[k].séances[j]["4k"]){
                    divMovieFormat[j].innerHTML = `<img src="../assets/images/icons/4k.png" alt="Format 4K">`;
                } else if(moviesList[k].séances[j]["4D"]){
                    divMovieFormat[j].innerHTML = `<img src="../assets/images/icons/4dx.png" alt="Format 4DX">`;
                }

                // divDetailShowtime -> inclus dans divShowtimeCard
                divDetailShowtime.push(document.createElement('div'));
                divDetailShowtime[j].className = "detail-showtime";

                // divSchedule -> inclus dans divDetailShowtime
                divSchedule.push(document.createElement('div'));
                divSchedule[j].className = "schedule";

                // schedule -> inclus dans divSchedule
                schedule.push(document.createElement('p'));
                schedule[j].textContent = `${moviesList[k].séances[j].horaire}`;

                // language -> inclus dans divSchedule
                language.push(document.createElement('span'));
                if(moviesList[k].séances[j].vf) {
                    language[j].innerText = "VF";
                } else if(moviesList[k].séances[j].vost) {
                    language[j].innerText = "VOST";
                }


                // handicap -> inclus dans divDetailShowtime
                handicap.push(document.createElement('div'));
                handicap[j].className = "handicap";
                if(moviesList[k].séances[j].handicap) {
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
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });
    