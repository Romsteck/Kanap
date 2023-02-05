const baseUrl = "http://localhost:3000/api/products"
let selectedProducts = JSON.parse(localStorage.getItem('userProducts'))

async function fetchProduct(productId) {

      return await fetch(`${baseUrl}/${productId}`)
            .then(response => response.json())
            .then(value => {
                  return value
            })
            .catch(error => console.log(error))
}

async function addProductsToPage() {
      
      selectedProducts.forEach(async product => {
            
            let currentProduct = await fetchProduct(product.id)

            console.log(currentProduct)

      })
}

addProductsToPage()