//Récuppération de l'Id du produit
const pageUrl = window.location.href
const url = new URL(pageUrl)
const productId = url.searchParams.get("id")

let pageProduct = []
let basket = []

// Récuppération des données de l'API
async function fetchProducts() {
  await fetch("http://localhost:3000/api/products/" + productId)
    .then((res) => res.json())
    .then((data) => (pageProduct = data))
    .catch((error) => {
      console.log(
        "Il y a eu un problème avec l'opération fetch : " + error.message
      )
    })
}

// Affichage des données
async function displayProduct() {
  await fetchProducts()

  const itemImgContainer = document.querySelector(".item__img")
  const itemImg = document.createElement("img")
  const itemName = document.getElementById("title")
  const itemPrice = document.getElementById("price")
  const itemDescription = document.getElementById("description")
  const itemColors = document.getElementById("colors")

  itemImg.src = pageProduct.imageUrl
  itemImg.alt = pageProduct.altTxt
  itemImgContainer.appendChild(itemImg)
  itemName.textContent = pageProduct.name
  itemPrice.textContent = pageProduct.price
  itemDescription.textContent = pageProduct.description

  for (const color of pageProduct.colors) {
    let colorOption = document.createElement("option")
    colorOption.setAttribute("value", color)
    colorOption.textContent = color
    itemColors.appendChild(colorOption)
  }
}

displayProduct()

//Ajout des produits dans le panier
function addBasket(product) {
  basket = getBasket()
  console.log(basket)

  let foundSameProduct = basket.find(
    (p) => (p.id && p.color) === (product.id && product.color)
  )
  if (foundSameProduct !== undefined) {
    foundSameProduct.quantity = foundSameProduct.quantity + product.quantity
    if (foundSameProduct.quantity > 100) {
      foundSameProduct.quantity = 100
      alert("Vous ne pouvez pas dépasser la quantité maximal de 100 sur ce produit")
    }
    saveBasket(basket)
  } else {
    basket.push(product)
    saveBasket(basket)
  }
}


// Evenement au clic : récupération des données séléctionnées et enregistrement dans le panier
addToCart.addEventListener("click", () => {
  let productData = {
    id: productId,
    quantity: parseInt(quantity.value),
    color: colors.value,
  }

  console.log(productData)

  if (productData.color === "") {
    alert("Veuillez séléctionner une couleur")
  } else if (productData.quantity <= 0 || productData.quantity > 100) {
    alert("Veuillez séléctionner une quantité entre 1 et 100")
  } else {
    addBasket(productData)
    alert("Le produit a bien été ajouté au panier")
  }
})