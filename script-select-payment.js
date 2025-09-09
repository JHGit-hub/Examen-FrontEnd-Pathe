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
const errorDiv = document.getElementById('error-msg');
// Selection de la zone a écouter
const continueReservation = document.getElementById("continue-reservation");

// Création de la fonction de validation du paiement
function validatePayment(){
    // On réinitialise le message d'erreur
    errorDiv.innerHTML = "";

    let hasError = false;

    // On récupére les formulaires via leurs id
    const formCB = document.getElementById("payment-cb");
    const formGpay = document.getElementById("payment-gpay");

    // On déclare les constantes regex
    const emailGpayRegex =  /^[^@\s]+@[^@\s]+.[^@\s]+$/; // doit etre un email
    const cardNumberRegex = /^\d{16}$/; // regex simple pour numéro de carte composé de 16 chiffres
    const dateCardRegex = /^\d{2}\/\d{2}$/; // regex date 2 paires de chiffres séparées par /
    const cryptoCardRegex = /^\d{3}$/; // regex cryptogramme 3 chiffres


    // On verifie qu'un mode de paiement a été choisi
    if(formCB.classList.contains("hidden") && formGpay.classList.contains("hidden")){ // les 2 formulaires sont cachés
        errorDiv.innerHTML += "<p>Veuillez choisir un mode de paiement</p>";
        hasError = true;
    }

    if(formCB && !formCB.classList.contains("hidden")){ // formCB existe et n'est pas caché
        // On récupére les champs via leurs id
        const cardNumber = document.getElementById("card-number").value.trim();
        const dateCard = document.getElementById("date-card").value.trim();
        const cryptoCard = document.getElementById("crypto-card").value.trim();

        if(!cardNumberRegex.test(cardNumber)){
            errorDiv.innerHTML += "<p>numéro de Carte bancaire Incorrect</p>";
            hasError = true;
        }
        if(!dateCardRegex.test(dateCard)){
            errorDiv.innerHTML += "<p>date d'expiraion Incorrect</p>";
            hasError = true;
        }
        if(!cryptoCardRegex.test(cryptoCard)){
            errorDiv.innerHTML += "<p>cryptogramme Incorrect</p>";
            hasError = true;
        }
    }

    if(formGpay && !formGpay.classList.contains("hidden")){ // formGpay existe et n'est pas caché
        // On récupére les champs via leurs id
        const emailGpay = document.getElementById("email-gpay").value;
        const passwordGpay = document.getElementById("password-gpay").value;

        if(!emailGpayRegex.test(emailGpay)){
            errorDiv.innerHTML += "<p>email Google Pay Incorrect</p>";
            hasError = true;
        }
        if(passwordGpay === ""){
            errorDiv.innerHTML += "<p>mot de passe Google Pay Incorrect</p>";
            hasError = true;
        }
    }

    if(hasError){
        errorDiv.classList.remove('hidden');
        setTimeout(() => {
            errorDiv.innerHTML = "";
            errorDiv.classList.add('hidden');
        }, 3000); // Disparaît après 3 secondes
        return;
    }




    // on enregistre dans le localStorage le total du panier
        localStorage.setItem("totalCart", JSON.stringify(totalCart)); 

    // on ouvre la page suivante
        window.location.href = "resume_reservation.html";
}

// On écoute le click sur le bouton de réservation
continueReservation.addEventListener("click", validatePayment);
