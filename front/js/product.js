// récupération de l'id du produit via l'URL
const params = new URLSearchParams(document.location.search);
const id = params.get("id")

//fetch les infos de l'api en fonction de l'id
searchId();

async function searchId() {
  await fetch('http://localhost:3000/api/products/' + id)
    .then((reponse) => reponse.json())
    .then((objetProduit) => { lesProduits(objetProduit); })
}

let articleClient = {};
articleClient = id;

function lesProduits(produit) {
  let imageAlt = document.querySelector("article div.item__img");
  let titre = document.querySelector("#title");
  let prix = document.querySelector("#price");
  let description = document.querySelector("#description");
  let couleurOption = document.querySelector("#colors")

  imageAlt.innerHTML = `<img src ="${produit.imageUrl}" alt= "${produit.altTxt}">`
  titre.textContent = produit.name;
  prix.textContent = produit.price;
  description.textContent = produit.description;
  for (let couleur of produit.colors) {
    couleurOption.innerHTML += `<option value="${couleur}" > ${couleur} </option>`;
  }
}

//ajouter des élements au panier
const addToCart = document.getElementById("addToCart")
addToCart.addEventListener("click", () => {
  const addProduct = {
    quantity: document.getElementById("quantity").value,
    colors: document.getElementById("colors").value,
    id: id
  }
  if (
    addProduct.quantity < 1 ||
    addProduct.quantity > 100 ||
    addProduct.quantity === undefined ||
    addProduct.quantity == (Math.sign("-")) ||
    addProduct.quantity == Number.parseFloat ||
    addProduct.colors === "" ||
    addProduct.colors === undefined
  ) {
    alert("Pour valider le choix de votre article veuillez renseignez une couleur et / ou une quantité valide entre 1 et 100")
  } else {
    addProductLocalStorage = []
    if (localStorage.getItem("addToCard") !== null) {
      addProductLocalStorage = JSON.parse(localStorage.getItem("addToCart"))
      addProductLocalStorage.push(addToCart)
      localStorage.setItem("addToCart", JSON.stringify(addProductLocalStorage))
      alert("Votre article a bien été ajouter au panier")
    } else {
      addProductLocalStorage.push(addProduct)
      localStorage.setItem("addToCart", JSON.stringify(addProductLocalStorage))
      alert("Votre article a bien été ajouter au panier")
    }
  }
})