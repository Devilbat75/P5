//Variable défini pour tout le code
//Recupération du LocalStorage
let panier = [];
//Tableau avec touts les produits de L'API
let allProductsApi = []

//variable qui reccueillera le numéro de la commande
let orderid = null

//variable utilisée pour la vérification du formulaire
const form = document.querySelector(".cart__order__form")
const formDiv = document.querySelectorAll(".cart__order__form__question")
//Regex
const regexText = /^[a-z àâäçéèêëîïôöùûüÿ'-]+$/i
const regexAddress = /^[0-9a-z àâäçéèêëîïôöùûüÿ'-]+$/i
const regexEmail = /^[\w_.-]+@[\w-]+\.[a-z]{2,4}$/i
//Si une des variables est null : pas d'envoi à l'API
//Si la les 5 variables sont afféctées d'une valeur : envoi de la requête à l'API
let firstNameValue = null
let lastNameValue = null
let addressValue = null
let cityValue = null
let emailValue = null

//Code principal pour la page
//initialisation de l'affichage et de la modification du panier
async function cartInit() {
    await fetchProducts()
    await affichageProduits()
    changeQuantity()
    //deleteProducts()
}

cartInit()

//Récuperation des données de l'API
// Récuppération des données de l'API
async function fetchProducts() {
    await fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((data) => (allProductsApi = data))
        .catch((error) => {
            console.log(
                "Il y a eu un problème avec l'opération fetch : " + error.message
            )
        })
}

//Affichage des produits
async function affichageProduits() {
    const panierCart = document.getElementById("cart__items");
    panier = getPanier();
    let panierHtml = [];
    console.log(panier)
    //Si un élément est présent dans le panier alors executer ce code
    if (panier && panier.length > 0) {
        //Si le panier n'est pas vide alors ca rajoute un produit
        for (i = 0; i < panier.length; i++) {
            //on va chercher dans le tableau les données du canapé
            const produit = allProductsApi.find(
                (product) => product.id == panier[i].id
            )
            //Création de la carte des produits
            panier.find(p => p.id == produit.id) && panier.find(p => p.couleur == produit.couleur)

            panierHtml += `<article class="cart__item" data-id="${panier[i].id}" data-color="${panier[i].couleur}">
        <div class="cart__item__img">
          <img src="${produit.imageUrl}" alt="${produit.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${produit.name}</h2>
            <p>${panier[i].couleurs}</p>
            <p>${produit.price}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input data-id=${panier[i].id} data-color=${panier[i].couleur} type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier[i].quantite}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p data-id=${panier[i].id} data-color=${panier[i].couleur} class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
        }
        panierCart.insertAdjacentHTML("beforeend", panierHtml);

        displayQuantityPrice()
    } else {
        // si le panier est vide on créait un H1 informatif et quantité appropriées
        document.querySelector("#totalQuantity").innerHTML = "0";
        document.querySelector("#totalPrice").innerHTML = "0";
        document.querySelector("h1").innerHTML =
            "Vous n'avez pas d'article dans votre panier";
    }
}

//Calcul de la quantité
function sumQuantity(array) {
    let totalQuantity = 0
    if (panier.length > 0) {
        totalQuantity = array.map((item) => item.quantite).reduce((a, b) => a + b)
        return totalQuantity
    } else {
        return totalQuantity
    }
}

//Calcul du prix
function sumPrice() {
    let totalPrice = 0
    for (let i = 0; i < panier.length; i++) {
        const selectedProduct = allProductsApi.find(
            (product) => product._id == panier[i].id
        )
        totalPrice += panier[i].quantite * selectedProduct.price
    }
    return totalPrice
}

// Afichage de la quantité et du prix
function displayQuantityPrice() {
    const totalQuantityContainer = document.getElementById("totalQuantity")
    const totalPriceContainer = document.getElementById("totalPrice")
    totalQuantityContainer.textContent = sumQuantity(panier)
    totalPriceContainer.textContent = sumPrice()
}

// Changer la quantité
function changeQuantity() {
    const itemInputsQuantity = document.querySelectorAll(".itemQuantity")
    itemInputsQuantity.forEach((itemInput) => {
        itemInput.addEventListener("change", (e) => {
            let newValue = parseInt(e.target.value)
            let articleSelected = itemInput.closest("article")
            let getIdForChange = articleSelected.dataset.id
            let getColorForChange = articleSelected.dataset.color
            let foundProductFromPanier = panier.find(
                (p) => (p.id && p.couleur) === (getIdForChange && getColorForChange)
            )
            console.log(foundProductFromPanier)
            if (newValue <= 0 || newValue > 100) {
                alert("Veuillez séléctionner une quantité entre 1 et 100")
                //e.target.value = 1
            } else {
                foundProductFromPanier.quantite = newValue
                savePanier(foundProductFromPanier)
                displayQuantityPrice()
            }
        })
    })
}

// Supprimer un produit
function deleteProduct() {
    const itemButtonsDelete = document.querySelectorAll(".deleteItem")
    itemButtonsDelete.forEach((itemButton) => {
        itemButton.addEventListener("click", (e) => {
            let articleSelected = itemButton.closest("article")
            let getIdForDelete = articleSelected.dataset.id
            let getColorForDelete = articleSelected.dataset.color
            if (confirm("Souhaitez-vous vraiment supprimer ce produit")) {
                panier = panier.filter(
                    (p) => (p.id && p.color) !== (getIdForDelete && getColorForDelete)
                )
                savePanier()
                displayQuantityPrice()
                articleSelected.remove()
            }
            return
        })
    })
}