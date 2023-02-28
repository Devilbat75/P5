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

// fonction d'affichage du produit de l'api
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

let choixProduit = document.querySelector("#addToCart");
choixProduit.addEventListener("click", async () => {  //on met async pour tuiliser await sur addPanier

  let choixQuantite = document.querySelector("#quantity").value;
  let choixCouleur = document.querySelector("#colors").value;
  if (
    choixQuantite < 1 ||
    choixQuantite > 100 ||
    choixQuantite == (Math.sign("-")) ||
    choixQuantite === undefined ||
    choixCouleur === "" ||
    choixCouleur === undefined
  ) {
    // active alert
    alert("pour valider le choix de cet article, veuillez renseigner une couleur, et /ou une quantité valide entre 1 et 100")
  } else {
    articleClient.quantite = parseInt(choixQuantite);
    articleClient.couleur = choixCouleur;
    // montre panier 
    await addPanier(articleClient);
    alert("l'article a bien été ajouté au panier");
    window.location.assign("cart.html")
  }
})