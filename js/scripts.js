let baseUrl = "http://localhost:3000/api/products"


fetch(`${baseUrl}`)
      .then(response => response.json)
      .then(products => {
            console.log(products)
            getProducts(products)
      })
      .catch(error => console.log(error))

function getProducts(products) {
      products.forEach(product => {
            console.log(product)
      });
}