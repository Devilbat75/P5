// VARIABLE UTILISÉE SUR TOUTE LA PAGE :
// Tableau avec tout les produits de l'API
let allProducts = []
// Tableau avec tous les produits du panier(local storage)
let basket = []
//variable qui recueillera le numéro de commande
let orderId = null

//VARIABLES UTILISÉE POUR LA VERIFICATION DU FORMULAIRE
const form = document.querySelector(".cart__order__form")
const formDiv = document.querySelectorAll(".cart__order__form__question")
//Regex
const regexText = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{3,35}$/i;
const regexAddress = /^[0-9a-z àâäçéèêëîïôöùûüÿ'-]{3,40}$/i;
const regexEmail = /^[\w_.-]+@[\w-]+\.[a-z]{2,4}$/i;
//Variable pour la vérification avant l'envoi du formulaire
//Si une des variables est null : pas d'envoi à l'API
//Si la les 5 variables sont afféctées d'une valeur : envoi de la requête à l'API
let firstNameValue = null
let lastNameValue = null
let addressValue = null
let cityValue = null
let emailValue = null




// Initiallisation de l'affichage et de la modification du panier
async function cartInit() {
  await fetchProducts()
  await displayCartProducts()
  changeQuantity()
  deleteProduct()
}

cartInit()




// Récuppération des données de l'API
async function fetchProducts() {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => (allProducts = data))
    .catch((error) => {
      console.log(
        "Il y a eu un problème avec l'opération fetch : " + error.message
      )
    })
}

// Envoi des données vers l'API
async function fetchPostRequest(dataToSend) {
  await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(dataToSend),
    headers: {
      Accept: "application/json; charset=UTF-8",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (orderId = data.orderId))
    .catch((error) => {
      console.log(
        "Il y a eu un problème avec l'opération fetch (POST) : " + error.message
      )
    })
}

//Calcul de la quantité
function sumQuantity(array) {
  let totalQuantity = 0
  if (basket.length > 0) {
    totalQuantity = array.map((item) => item.quantity).reduce((a, b) => a + b)
    return totalQuantity
  } else {
    return totalQuantity
  }
}

//Calcul du prix
function sumPrice() {
  let totalPrice = 0
  for (let i = 0; i < basket.length; i++) {
    const selectedProduct = allProducts.find(
      (product) => product._id == basket[i].id
    )
    totalPrice += basket[i].quantity * selectedProduct.price
  }
  return totalPrice
}

// Afichage de la quantité et du prix
function displayQuantityPrice() {
  const totalQuantityContainer = document.getElementById("totalQuantity")
  const totalPriceContainer = document.getElementById("totalPrice")
  totalQuantityContainer.textContent = sumQuantity(basket)
  totalPriceContainer.textContent = sumPrice()
}

// Affichage des produits
function displayCartProducts() {
  basket = getBasket()

  cartItem = document.getElementById("cart__items");

  for (let i = 0; i < basket.length; i++) {

    //Récupération des caractéristiques du produit dans le panier
    const productId = basket[i].id;
    const productNumber = basket[i].quantity;
    const productColor = basket[i].color;

    //Récupération des autres caractéristiques du produit depuis l'API
    const product = allProducts.find(
      (product) => product._id == basket[i].id
    )

    //Création de la div article qui contiendra la carte du produit avec ajout d'un data id et color
    let productElement = document.createElement("article");
    productElement.classList.add("cart__item");
    productElement.dataset.id = productId;
    productElement.dataset.color = productColor;
    cartItem.appendChild(productElement);

    //Ajout de l'image de produit et de son container
    let productImageContainer = document.createElement("div");
    productImageContainer.classList.add("cart__item__img");
    let productImage = document.createElement("img");
    productImage.src = product.imageUrl;
    productImage.alt = product.altTxt;
    productElement.appendChild(productImageContainer);
    productImageContainer.appendChild(productImage);

    //Ajout du container pour le corps de la carte produit
    let productContentContainer = document.createElement("div");
    productContentContainer.classList.add("cart__item__content");
    productElement.appendChild(productContentContainer);

    //Ajout du container pour la description du produit
    let productDescriptionContainer = document.createElement("div");
    productDescriptionContainer.classList.add(
      "cart__item__content__description"
    );
    productContentContainer.appendChild(productDescriptionContainer);

    //Ajout du nom de produit
    let productName = document.createElement("h2");
    productName.textContent = product.name;
    productDescriptionContainer.appendChild(productName);

    //Ajout de la couleur du produit
    let color = document.createElement("p");
    color.textContent = productColor;
    productDescriptionContainer.appendChild(color);

    //Ajout du prix du produit
    let ProductPrice = document.createElement("p");
    ProductPrice.textContent = product.price + " €";
    productDescriptionContainer.appendChild(ProductPrice);

    //Ajout du conteneur pour les réglages
    let productSettings = document.createElement("div");
    productSettings.classList.add("cart__item__content__settings");
    productContentContainer.appendChild(productSettings);

    //Ajout du container pour les réglages de quantité
    let productSettingsQuantityContainer = document.createElement("div");
    productSettingsQuantityContainer.classList.add(
      "cart__item__content__settings__quantity"
    );
    productSettings.appendChild(productSettingsQuantityContainer);

    //Ajout de l'input pour régler la quantité et de son text
    let productSettingsQuantityText = document.createElement("p");
    productSettingsQuantityText.textContent = "Qté : ";
    let productSettingsQuantity = document.createElement("input");
    productSettingsQuantity.setAttribute("type", "number");
    productSettingsQuantity.classList.add("itemQuantity");
    productSettingsQuantity.setAttribute("name", "itemQuantity");
    productSettingsQuantity.setAttribute("min", "1");
    productSettingsQuantity.setAttribute("max", "100");
    productSettingsQuantity.setAttribute("value", productNumber);
    productSettingsQuantityContainer.appendChild(productSettingsQuantityText);
    productSettingsQuantityContainer.appendChild(productSettingsQuantity);

    //Ajout du container du bouton de suppression du produit
    let productDeleteContainer = document.createElement("div");
    productDeleteContainer.classList.add(
      "cart__item__content__settings__delete"
    );
    productSettings.appendChild(productDeleteContainer);

    //Ajout du bouton de suppression et de son texte
    let productDelete = document.createElement("p");
    productDelete.classList.add("deleteItem");
    productDelete.textContent = "Supprimer";
    productDeleteContainer.appendChild(productDelete);
  }

  displayQuantityPrice()
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
      let foundProductFromBasket = basket.find(
        (p) => (p.id && p.color) === (getIdForChange && getColorForChange)
      )
      if (newValue <= 0 || newValue > 100) {
        alert("Veuillez séléctionner une quantité entre 1 et 100")
        //e.target.value = 1
        location.reload();
      } else {
        foundProductFromBasket.quantity = newValue
        saveBasket()
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
        basket = basket.filter(
          (p) => (p.id && p.color) !== (getIdForDelete && getColorForDelete)
        )
        saveBasket()
        displayQuantityPrice()
        articleSelected.remove()
      }
      return
    })
  })
}


//Controle du formulaire
function checker(value, regex) {
  if (value.match(regex)) {
    return true
  } else {
    return false
  }
}

formDiv.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstName":
        const firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
        if (checker(e.target.value, regexText) == false) {
          firstNameErrorMsg.textContent = "Veuillez rentrer un prénom valide"
          firstNameValue = null
        } else {
          firstNameErrorMsg.textContent = ""
          firstNameValue = e.target.value
        }
        break

      case "lastName":
        const lastNameErrorMsg = document.getElementById("lastNameErrorMsg")
        if (checker(e.target.value, regexText) == false) {
          lastNameErrorMsg.textContent = "Veuillez rentrer un nom valide"
          lastNameValue = null
        } else {
          lastNameErrorMsg.textContent = ""
          lastNameValue = e.target.value
        }
        break

      case "address":
        const addressErrorMsg = document.getElementById("addressErrorMsg")
        if (checker(e.target.value, regexAddress) == false) {
          addressErrorMsg.textContent = "Veuillez rentrer une adresse valide"
          addressValue = null
        } else {
          addressErrorMsg.textContent = ""
          addressValue = e.target.value
        }
        break

      case "city":
        const cityErrorMsg = document.getElementById("cityErrorMsg")
        if (checker(e.target.value, regexText) == false) {
          cityErrorMsg.textContent = "Veuillez rentrer un nom de ville valide"
          cityValue = null
        } else {
          cityErrorMsg.textContent = ""
          cityValue = e.target.value
        }
        break

      case "email":
        const emailErrorMsg = document.getElementById("emailErrorMsg")
        if (checker(e.target.value, regexEmail) == false) {
          emailErrorMsg.textContent = "Veuillez rentrer un email valide"
          emailValue = null
        } else {
          emailErrorMsg.textContent = ""
          emailValue = e.target.value
        }
        break
      default:
        null
    }
  })
})

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  if (basket.length === 0) {
    alert("votre panier est vide. Veuillez ajouter des produits")
    window.location.href = "./index.html"
  } else if (
    //si toute les variables "Champs" ne sont pas null
    firstNameValue &&
    lastNameValue &&
    addressValue &&
    cityValue &&
    emailValue
  ) {
    //Création du tableau de produit
    let arrayIdProducts = []
    for (let i = 0; i < basket.length; i++) {
      arrayIdProducts.push(basket[i].id)
    }
    //Création du corps de la requête contenant l'objet contact et le tableau de produits
    let bodyRequest = {
      contact: {
        firstName: firstNameValue,
        lastName: lastNameValue,
        address: addressValue,
        city: cityValue,
        email: emailValue,
      },
      products: arrayIdProducts,
    }
    //Envoi de la requete POST
    await fetchPostRequest(bodyRequest)
    //Vider le formulaire après commande
    firstName.value = ""
    lastName.value = ""
    address.value = ""
    city.value = ""
    email.value = ""
    //Vider le panier après commande
    localStorage.clear();
    saveBasket()
    //Redirection vers la page de confirmation
    window.location.href = `./confirmation.html?orderId=${orderId}`
  } else {
    alert("Merci de remplir correctement le formulaire")
  }
})