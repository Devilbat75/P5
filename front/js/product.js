// récupération de l'id du produit via l'URL
//-------------------------------------------
const params = new URLSearchParams(document.location.search);
const id = params.get("id")

//fetch les infos de l'api en fonction de l'id
searchId();

async function searchId() {
  await fetch('http://localhost:3000/api/products/' + id)
    .then((reponse) => reponse.json())
    .then((data) => {
      console.log(data)
      document.querySelector('.item__img').innerHTML += `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
      document.querySelector('#title').textContent = data.name;
      document.querySelector('#price').textContent = data.price;
      document.querySelector('#description').textContent = data.description;
    })
};