const resultContainer = document.getElementById("items")
let allProducts = []

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

//Affichage des produits
async function displayProducts() {
  await fetchProducts()
  resultContainer.innerHTML = allProducts
    .map((product) => {
      return `
    <a href="./product.html?id=${product._id}">
    <article>
      <img src=${product.imageUrl} alt=${product.altTxt}>
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a>
  `
    })
    .join("")
}

displayProducts()