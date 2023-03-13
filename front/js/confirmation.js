const pageUrl = window.location.href
const url = new URL(pageUrl)
const orderId = url.searchParams.get("orderId")

const orderIdContainer = document.getElementById("orderId")
orderIdContainer.textContent = orderId
localStorage.clear ();