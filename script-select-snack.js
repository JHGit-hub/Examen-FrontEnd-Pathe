//////////////////// On récupére les données du localStorage
const detailSelectedTickets = JSON.parse(localStorage.getItem("selectedTickets"));


//////////////////// Gestion du catalogue des snacks

// Import des données depuis un fichier JSON
fetch('../snack.json')
    .then(response => response.json())
    .then(data => {

        // Liste des snacks
        let snackList = data;

        // Récupération des zones d'affichage par leur id
        const menuCards = document.getElementById("menu-cards");
        const popcornCards = document.getElementById("popcorn-cards");
        const drinkCards = document.getElementById("drink-cards");

        // création des lignes de cards des snacks
        menuCards.appendChild(createSnackCard("Formules"));
        popcornCards.appendChild(createSnackCard("Pop Corn et Sucreries"));
        drinkCards.appendChild(createSnackCard("Boissons"));

        // création des écoutes sur ces cards
        updateSnackQuantity("Formules");
        updateSnackQuantity("Pop Corn et Sucreries");
        updateSnackQuantity("Boissons");

        ////// Récupération des snacks sélectionnés si existants
        const selectedSnacks = JSON.parse(localStorage.getItem("selectedSnacks"));
        if(Array.isArray(selectedSnacks)){ // on verifie si le tableau n'est pas null

            const allCategories = ["Formules", "Pop Corn et Sucreries", "Boissons"];

            // on parcours toutes les catégories pour afficher le panier complet
            for( let k=0; k < allCategories.length; k++){
                const key = allCategories[k];

                for(let i=0; i < snackList[key].length; i++){

                    // On parcour chaque element des tableaux des categories
                    // et si on a un element qui correspond, on affiche le résultat
                    const snackSelected = selectedSnacks.find(snack => snack.name === snackList[key][i].nom);

                    if(snackSelected) {

                        // Récupération de l'id du snack
                        const snackId = snackList[key][i].image.replace(".png","");

                        // Récupération de la div quantité du snack
                        const quantityDiv = document.getElementById(snackId + "-quantity");

                        // On donne la valeur du snack selectionnée a la div
                        quantityDiv.textContent = snackSelected.quantity;
                    }
                }
            }
        }

        // ajout des snacks au panier
        cartSnackResume();


        ////// Création d'une function pour créer les lignes de snack
        function createSnackCard(key) {
            let divMenu = [];
            let divRowSnack = document.createElement('div');
            divRowSnack.className = "snack-row";

            for( let i=0; i < snackList[key].length; i++){
                divMenu.push(document.createElement('div'));
                divMenu[i].className = "snack-card";
                // création d'un id unique pour chaque carte de snack
                // on prends le nom de l'image et on retire le ".png"
                const snackId = snackList[key][i].image.replace(".png","");
                divMenu[i].id = snackId;
                divMenu[i].innerHTML = `
                <div class="image-snack">
                    <img src="../assets/images/snacks/${snackList[key][i].image}" alt="illustrations de ${snackList[key][i].nom}">
                </div>
                <div class="detail-snack">
                    <p>${snackList[key][i].nom}</p>
                    <div class="add-snack">
                        <span>${snackList[key][i].prix.toFixed(2)} €</span>
                        <div class="snack-quantity">
                            <img src="../assets/images/icons/less-btn.png" alt="bouton moins" id="${snackId}-less">
                            <div class="quantity-number" id="${snackId}-quantity">
                                <p>0</p>
                            </div>
                            <img src="../assets/images/icons/more-btn.png" alt="bouton plus" id="${snackId}-more">
                        </div>
                    </div>
                </div>`;

                divRowSnack.appendChild(divMenu[i]);
            }
            return divRowSnack;
        }


        ////// Création d'une fonction pour gérer les événements au click sur les snack
        let snackQuantity = 0; // quantité de snack initial

        function updateSnackQuantity(key){
            for(let i=0; i < snackList[key].length; i++){
                const snackId = snackList[key][i].image.replace(".png","");

                const lessBtn = document.getElementById(snackId + "-less");
                const moreBtn = document.getElementById(snackId + "-more");
                const quantityDiv = document.getElementById(snackId + "-quantity");

                lessBtn.addEventListener("click", () => {
                    // On récupére la valeur actuelle de la quantité
                    // et on l'a converti en nombre entier de base décimale
                    let currentQuantity = parseInt(quantityDiv.textContent, 10);

                    // on verifie que la quantité est supérieur à 0 pour ne pas avoir de quanité négative
                    if( currentQuantity > 0) {
                        quantityDiv.textContent = currentQuantity - 1;
                        snackQuantity = snackQuantity - 1;
                        cartSnackResume();
                    }
                });

                moreBtn.addEventListener("click", () => {
                    // On récupére la valeur actuelle de la quantité
                    let currentQuantity = parseInt(quantityDiv.textContent, 10);
                    quantityDiv.textContent = currentQuantity + 1;
                    snackQuantity = snackQuantity + 1;
                    cartSnackResume();
                });
            }
        }


        ////// Création d'une fonction pour ajouter des snacks au panier
        function cartSnackResume() {
            // selection des zone pour afficher les resultats
            const cartResume = document.getElementById("cart-resume");
            const totalCart = document.getElementById("total-cart");

            // On réinitialise le panier
            cartResume.innerHTML = "";
            totalCart.textContent = "";

            // Création du tableau du panier
            let total = 0;

            // Création du tableau de snacks selectionnés
            let selectedSnacks = [];

            // Ajout de l'affichage des billets
            // si le tableau existe
            if(detailSelectedTickets) {
                // on boucle sur chaque lignes du tableau 
                detailSelectedTickets.forEach(ticket => {
                    // pour chaque ticket supérieur à 0
                    if(ticket.quantity > 0){
                        // on l'affiche dans le panier
                        cartResume.innerHTML += `
                        <div class="cart-item" id="${ticket.label}-resume">
                            <p><span>${ticket.quantity} x </span>${ticket.label}</p>
                            <div class="snack-cart-price">
                                <span>${ (ticket.quantity * ticket.price).toFixed(2) } €</span>
                                <div class="div-empty"></div>
                            </div>
                        </div>`;
                        total += (ticket.quantity * ticket.price);
                    }

                })

            }


            const allCategories = ["Formules", "Pop Corn et Sucreries", "Boissons"];
            // on parcours toutes les catégories pour afficher le panier complet
            for( let k=0; k < allCategories.length; k++){
                const key = allCategories[k];

                for(let i=0; i < snackList[key].length; i++){

                    //récupération de l'id du snack
                    const snackId = snackList[key][i].image.replace(".png","");

                    // constante prix
                    const snackPrice = snackList[key][i].prix;

                    // constante quantité
                    const snackQuantity = parseInt(document.getElementById(snackId + "-quantity").textContent, 10);

                    if(snackQuantity > 0) {
                        cartResume.innerHTML += 
                            `<div class="cart-item" id="${snackId}-resume">
                                <p><span>${snackQuantity} x </span>${snackList[key][i].nom}</p>
                                <div class="snack-cart-price">
                                    <span>${ (snackQuantity * snackPrice).toFixed(2) } €</span>
                                    <div class="bin-img" id="${snackId}">
                                        <img src="../assets/images/icons/bin.png" alt="supprimer la commande"">
                                    </div>
                                </div>
                            </div>`; // toFixed(2) permet d'afficher 2 chiffre aprés la virgule
                        total += (snackQuantity * snackPrice);

                        // On rempli le tableau des snacks
                        selectedSnacks.push({
                            id: snackId,
                            name: snackList[key][i].nom,
                            price: snackPrice,
                            quantity: snackQuantity
                        });

                    }
                }
            }
            totalCart.textContent = `${total.toFixed(2)} €`;

            ////// Gestion de la suppression d'un snack du panier
            const SnacksInCart = document.querySelectorAll(".bin-img");

            // on boucle sur les élèments pour ajouter les écouteurs de click
            SnacksInCart.forEach(snack => {
                snack.addEventListener('click', deleteFromCart);
            });

            // Création de la fonction suppression du panier
            function deleteFromCart(){
                // on récupére l'id de l'élément cliqué
                const snackId = this.id;

                // on affiche la quantité du snack à 0
                const quantityDiv = document.getElementById(snackId + "-quantity");
                quantityDiv.textContent = 0;

                // on retire le snack du le panier
                selectedSnacks = selectedSnacks.filter(snack => snack.id !== snackId);
                localStorage.setItem("selectedSnacks", JSON.stringify(selectedSnacks));

                cartSnackResume();

            }

            return selectedSnacks;

        }
    

        //////////////////// Enregistrement de la commande compléte
        // Selection de la zone a écouter
        const continueReservation = document.getElementById("continue-reservation");

        // Création de la fonction de validation des choix des snacks
        function validateSelectedSnacks(){
            // on récupére le tableau des snacks selectionnés
            const selectedSnacks = cartSnackResume(); // cartSnackResume renvoi le tableau des snacks sélectionnés

            // on enregistre dans le localStorage même si selectedSnacks est vide
                localStorage.setItem("selectedSnacks", JSON.stringify(selectedSnacks)); 

            // on ouvre la page suivante
                window.location.href = "select_payment.html";
        }

        // On écoute le click sur le bouton de réservation
        continueReservation.addEventListener("click", validateSelectedSnacks);

    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });
