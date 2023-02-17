//Récupération des infos des canapés grâce à l'API
//Création de la fonction addArticles
addArticles();
//Paramètres de la fonction et utilisation de fetch pour récuperer les données
async function addArticles() {
    await fetch ('http://localhost:3000/api/products/')
    .then ((reponse) => reponse.json())
    .then ((data)=> {
       console.log (data);
        for (let i = 0; i < data.length; i++ ) {
            items = data [i];
            document.querySelector ('.items').innerHTML += 
            `<a href="./product.html?id=${items._id}">
            <article>
              <img src="${items.imageUrl}" alt="${items.altTxt}">
              <h3 class="productName">${items.name}</h3>
              <p class="productDescription">${items.description}</p>
            </article>
          </a>`
        }
    })
}
