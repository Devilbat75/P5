//Stockage du panier dans le Local Storage
function saveBasket() {
    localStorage.setItem("basket", JSON.stringify(basket))
  }
  
  //Récupération du panier à partir du Local Storage
  function getBasket() {
    basket = localStorage.getItem("basket")
    if (basket == null) {
      return []
    } else {
      return JSON.parse(basket)
    }
  }