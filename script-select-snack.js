/////// On récupére les données du localStorage
const cartSeatPrice = JSON.parse(localStorage.getItem("selectedPrices"));


/////// Gestion du catalogue des snacks

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

        // création des lignes de snacks
        menuCards.appendChild(createSnackCard("Formules"));
        popcornCards.appendChild(createSnackCard("Pop Corn et Sucreries"));
        drinkCards.appendChild(createSnackCard("Boissons"));

        // création des écoutes sur ces cards
        addSnackIntoCartByEvent("Formules");
        addSnackIntoCartByEvent("Pop Corn et Sucreries");
        addSnackIntoCartByEvent("Boissons");



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
        function addSnackIntoCartByEvent(key){
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
        function addSnackToCart(key) {
            // selection des zone pour afficher les resultats
            const cartResume = document.getElementById("cart-resume");
            const totalCart = document.getElementById("total-cart");

            // On réinitialise le panier
            cartResume.innerHTML = "";
            totalCart.textContent = "";

            let total = 0;

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
                            <span>${ (snackQuantity * snackPrice).toFixed(2) } €</span>
                        </div>`; // toFixed(2) permet d'afficher 2 chiffre aprés la virgule
                    total += (snackQuantity * snackPrice);
                }
            }
            totalCart.textContent = `${total.toFixed(2)} €`;

        }

    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });
    
