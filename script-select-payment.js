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
const accordionHeader = document.querySelectorAll(".accordion-header");
const accordionBody = document.querySelectorAll(".accordion-body");

// Création de la function de l'ouverture / fermture de l'accordion
function toggleAccordion() {
    accordionHeader.forEach(header => {
        header.addEventListener("click", () => {
            accordionBody.forEach(body => body.classList.add("hidden"));
            accordionHeader.forEach(header => header.classList.remove("hidden"));
            accordionBody.classList.remove("hidden");
            accordionHeader.classList.add("hidden");
        });
    });
}