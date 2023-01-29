const baseUrl = "http://localhost:3000/api/products"
const URL = window.location.href
const URLParameters = new URLSearchParams(window.location.search)
const SelectedProductID = URLParameters.get('id')


fetch(`${baseUrl}/${SelectedProductID}`)
      .then(response => response.json())
      .then(value => {
            AppendProduct(value)
      })
      .catch(error => console.log(error))


function AppendProduct(Product) {

      const ProductImage = document.createElement('img')
      const productDescription = 
      ProductImage.src = Product.imageUrl
      ProductImage.alt = 'Photographie d\'un canapé'

      const 

      document.getElementById('Product_Picture').append(ProductImage)
      document.getElementById('title').textContent = Product.name
      document.getElementById('description').textContent = Product.name
      document.getElementById('colors').append()
}