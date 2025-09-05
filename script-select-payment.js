//////////////////// On récupére les données du localStorage
const detailSelectedTickets = JSON.parse(localStorage.getItem("selectedTickets"));
const detailSelectedSnacks = JSON.parse(localStorage.getItem("selectedSnacks"));


////// Affiche du total du panier
let subTotalTickets = 0;
let subTotalSnacks = 0;
let totalCart = 0;

// calcul du total des places
detailSelectedTickets.forEach(ticket => {
    subTotalTickets += (ticket.price) * (ticket.quantity);
})

// calcul du total des snacks
detailSelectedSnacks.forEach(snack =>{
    subTotalSnacks += (snack.price) * (snack.quantity);
})

// Total du panier
totalCart = subTotalTickets + subTotalSnacks;
document.getElementById("total-cart").textContent = totalCart.toFixed(2) + " €";


//////////////////// Gestion du choix de payment
// Création d'une function pour tout refermer et n'afficher que les headers des accordions
function hideAccordions() {
    document.querySelectorAll(".accordion-header").forEach(header => header.classList.remove("hidden"));
    document.querySelectorAll(".accordion-body").forEach(body => body.classList.add("hidden"));
}

// Pour chaque accordion-header (bouton)
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        // On referme tout
        hideAccordions();
        // On cache ce header
        this.classList.add("hidden"); // this selectionne le header cliqué
        // On affiche le body associé
        const body = this.nextElementSibling; // .nextElementSibling selectionne la balise suivante dans le DOM qui a le même parent
        body.classList.remove('hidden');
    });
});

// Pour chaque accordion-body uniquement si on click en dehors des input
document.querySelectorAll('.accordion-body').forEach(body => {
    body.addEventListener('click', function(event) {
        // On referme tout uniquement si on clique en dehors des input
        if(!event.target.matches('input')) { // .matches() vérifie si l'élément correspond au sélecteur, renvoi booléen
            hideAccordions();
        }
    });
});


//////////////////// Gestion de validation du paiement
// Selection de la zone a écouter
const continueReservation = document.getElementById("continue-reservation");

// Création de la fonction de validation du paiement
function validatePayment(){

    // on enregistre dans le localStorage le total du panier
        localStorage.setItem("totalCart", JSON.stringify(totalCart)); 

    // on ouvre la page suivante
        window.location.href = "resume_reservation.html";
}

// On écoute le click sur le bouton de réservation
continueReservation.addEventListener("click", validatePayment);
