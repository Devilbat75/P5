function savePanier(produit) {
    localStorage.setItem("panier", JSON.stringify(produit))
}

function getPanier() {
    let panierLocal = localStorage.getItem("panier")
       
    if (panierLocal == null) {
        return []
    } else {
        return JSON.parse(panierLocal)
    }
}
//ajout du produit 
function addPanier(produit) {
    let panierLocal = getPanier();
    console.log(typeof panierLocal);
    console.log(panierLocal)
    //console.log(produit)
    //let foundProduct = panier.find( (p) => (p.id && p.couleur) == (produit.id && produit.couleur) )

    let foundProduct = panierLocal.find(
        (p) => (p.id && p.couleur) === (produit.id && produit.couleur)
      )


    if (foundProduct != undefined) {
        foundProduct.quantite += produit.quantite
    } else {
        panierLocal.push(produit)
    }
    savePanier(panierLocal)
}
//supression du produit 
function removeFromPanier(produit) {
    let panierLocal = getPanier()
    panierLocal = panierLocal.filter(p => p.id !== produit.id || p.couleur !== produit.couleur)
    savePanier(panierLocal)
}

// gestion de l'ajout de quantité 
function addQuantity(produit) {
    let panierLocal = getPanier()
    //console.log(panier)
    let findProduit = panierLocal.find(
        (p) => (p.id && p.couleur) === (produit.id && produit.couleur)
      )    
    
    if (findProduit != undefined) {
        findProduit.quantite = produit.quantite
    }
    savePanier(panierLocal)
}