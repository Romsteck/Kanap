let baseUrl = "http://localhost:3000/api"
let products

function getProducts() {
  fetch(`${baseUrl}/products`)
    .then(response => response.json())
    .then(data => {
      products = data;
      console.log(products);
      products.forEach(product => {
        console.log(product)
      });
    })
    .catch(error => console.log(error))
}