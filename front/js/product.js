// récupération de l'id du produit via l'URL
//-------------------------------------------
const params = new URLSearchParams(document.location.search);
const id = params.get("id")

//fetch les infos de l'api en fonction de l'id
searchId();

async function searchId() {
  await fetch('http://localhost:3000/api/products/' + id)
    .then((reponse) => reponse.json())
    .then((data) => { affichageCanape(data); })
}

let articleClient = {};
articleClient = id;

function affichageCanape(canape) {

  document.querySelector('.item__img').innerHTML += `<img src="${canape.imageUrl}" alt="${canape.altTxt}">`;
  document.querySelector('#title').textContent = canape.name;
  document.querySelector('#price').textContent = canape.price;
  document.querySelector('#description').textContent = canape.description;

  for (let couleur of canape.colors) {
    document.querySelector("#colors").innerHTML += `<option value="${couleur}" > ${couleur} </option>`;
  }
}

let choixProduit = document.querySelector("#addToCart");
choixProduit.addEventListener("click", async () => {  //on met async pour utiliser await sur ajouterAuPanier

  let choixQuantite = document.querySelector("#quantity").value;
  let choixCouleur = document.querySelector("#colors").value;
  if (
    choixQuantite < 1 ||
    choixQuantite > 100 ||
    choixQuantite === undefined ||
    choixCouleur === "" ||
    choixCouleur === undefined
  ) {
    // active alert si l'une des conditions au dessus est active
    alert("pour valider le chois de cet article, veuillez renseigner une couleur, et /ou une quantité valide entre 1 et 100")
  } else {
    articleClient.quantite = parseInt(choixQuantite);
    articleClient.couleur = choixCouleur;
    // montre panier 
    await addPanier(articleClient);
    alert("l'article a bien été ajouté au panier");
    window.location.assign("cart.html")
  }
})