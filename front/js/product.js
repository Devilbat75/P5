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

