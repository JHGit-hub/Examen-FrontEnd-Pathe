//////////////////// Récupération des données des places selectionnées
const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
const ticketsQuantityToBuy = selectedSeats.length;



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


