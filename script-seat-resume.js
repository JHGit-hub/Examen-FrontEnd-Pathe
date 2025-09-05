//////////////////// Récupération des données des places selectionnées
const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
const ticketsQuantityToBuy = selectedSeats.length;


//////////////////// Affichage des tarifs selectionnés si existe
if(localStorage.getItem("selectedTickets")) {
    const detailSelectedTickets = JSON.parse(localStorage.getItem("selectedTickets"));
    // On boucle sur chaque lignes du tableau
    detailSelectedTickets.forEach(ticket => {
        // On extrait les quantités du localStorage pour les inclure dans l'affichage
        if(ticket.label === "Plein tarif"){
            document.getElementById("normal-price-quantity").textContent = ticket.quantity; // on donne la valeur du storage
        }
        if(ticket.label === "Matin"){
            document.getElementById("morning-price-quantity").textContent = ticket.quantity; 
        }
        if(ticket.label === "Moins de 14 ans"){
            document.getElementById("children-price-quantity").textContent = ticket.quantity; 
        }
    });
}

//////////////////// Gestion des quantité de tickets
let ticketQuantity = 0; // quantité total des tickets selectionnés

function updateQuantity(lessBtnId, moreBtnId, QuantityId) {
    // on récupére les zone à écouter par leur id
    const lessBtn = document.getElementById(lessBtnId); // bouton moins
    const moreBtn = document.getElementById(moreBtnId); // bouton plus
    const quantityDiv = document.getElementById(QuantityId); // zone pour afficher les resultats


    lessBtn.addEventListener("click", () => {
        // On récupére la valeur actuelle de la quantité
        // et on l'a converti en nombre entier de base décimale
        let currentQuantity = parseInt(quantityDiv.textContent, 10);

        // on verifie que la quantité est supérieur à 0 pour ne pas avoir de quanité négative
        if( currentQuantity > 0) {
            quantityDiv.textContent = currentQuantity - 1;
            ticketQuantity = ticketQuantity - 1;
            cartResume();
        }

    });

    moreBtn.addEventListener("click", () => {
        // On récupére la valeur actuelle de la quantité
        let currentQuantity = parseInt(quantityDiv.textContent, 10);
        if(ticketQuantity < ticketsQuantityToBuy){
            quantityDiv.textContent = currentQuantity + 1;
            ticketQuantity = ticketQuantity + 1;
            cartResume();
        } else {
            alert("La quantité de tickets à acheter ne peut pas dépasser " + ticketsQuantityToBuy);
        }
    });
}


//////////////////// Gestion des prix
function cartResume(){
    // selection des zone pour afficher les resultats
    const cartResume = document.getElementById("cart-resume");
    const totalCart = document.getElementById("total-cart");

    // constante prix
    const normalPrice = 14.90;
    const morningPrice = 9.90;
    const childrenPrice = 6.50;

    // constante des quantités
    const normalQuantity = parseInt(document.getElementById("normal-price-quantity").textContent, 10);
    const morningQuantity = parseInt(document.getElementById("morning-price-quantity").textContent, 10);
    const childrenQuantity = parseInt(document.getElementById("children-price-quantity").textContent, 10);


    // On réinitialise le panier
    cartResume.innerHTML = "";
    totalCart.textContent = "";

    // Affichage du récapitulatif dans le panier
    if(normalQuantity > 0){
        cartResume.innerHTML += `<div class="cart-item" id="normal-price-resume">
                                    <p><span>${normalQuantity} x </span>Plein tarif</p>
                                    <span>${ (normalQuantity * normalPrice).toFixed(2) } €</span>
                                </div>`; // toFixed(2) permet d'afficher 2 chiffre aprés la virgule
    };

    if(morningQuantity > 0){
        cartResume.innerHTML += `<div class="cart-item" id="morning-price-resume">
                                    <p><span>${morningQuantity} x </span>Matin</p>
                                    <span>${ (morningQuantity * morningPrice).toFixed(2) } €</span>
                                </div>`;
    };

    if(childrenQuantity > 0){
        cartResume.innerHTML += `<div class="cart-item" id="children-price-resume">
                                    <p><span>${childrenQuantity} x </span>Moins de 14 ans</p>
                                    <span>${ (childrenQuantity * childrenPrice).toFixed(2) } €</span>
                                </div>`;
    };




    const total = (normalQuantity * normalPrice) + (morningQuantity * morningPrice) + (childrenQuantity * childrenPrice);
    totalCart.textContent = `${total.toFixed(2)} €`;
}

updateQuantity("normal-price-less", "normal-price-more", "normal-price-quantity");
updateQuantity("morning-price-less", "morning-price-more", "morning-price-quantity");
updateQuantity("children-price-less", "children-price-more", "children-price-quantity");

cartResume();


//////////////////// Validation des tarifs
// Validation de la selection des siéges
// Selection de la zone a écouter
let continueReservation = document.getElementById("continue-reservation");

// Création de la fonction de validation des places
function validatePriceSeat(){
    const normalQuantity = parseInt(document.getElementById("normal-price-quantity").textContent, 10);
    const morningQuantity = parseInt(document.getElementById("morning-price-quantity").textContent, 10);
    const childrenQuantity = parseInt(document.getElementById("children-price-quantity").textContent, 10);

    const total = normalQuantity + morningQuantity + childrenQuantity;

    if(total !== selectedSeats.length){
        alert("Tu dois choisir exactement " + selectedSeats.length + " tarifs (un par siège sélectionné).");
        return;
    }

    // On construit un tableau avec toutes les données avant de k'enregfistrer dans le localStorage
    const detailSelectedTickets = [
        {label: "Plein tarif", price: 14.90, quantity: normalQuantity},
        {label: "Matin", price: 9.90, quantity: morningQuantity},
        {label: "Moins de 14 ans", price: 6.50, quantity: childrenQuantity}
    ]
    // On enregistre les détails des prix sélectionnés dans le localStorage
    localStorage.setItem("selectedTickets", JSON.stringify(detailSelectedTickets));

    // Redirection vers la page de sélection des snacks
    window.location.href = "select_snack.html";
}

// On écoute le click sur le bouton de réservation
continueReservation.addEventListener("click", validatePriceSeat);



