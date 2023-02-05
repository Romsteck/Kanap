const baseUrl = "http://localhost:3000/api/products"
const URLParameters = new URLSearchParams(window.location.search)
const selectedProductID = URLParameters.get('id')

fetch(`${baseUrl}/${selectedProductID}`)
      .then(response => response.json())
      .then(value => {
            fillProduct(value)
      })
      .catch(error => console.log(error))


function fillProduct(product) {

      const productImage = document.createElement('img')
      const productTitle = document.createElement('h1')
      const productPrice = document.getElementById('price')
      const productDescription = document.getElementById('description')

      productImage.src = product.imageUrl
      productImage.alt = product.altTxt

      productTitle.textContent = product.name
      productPrice.textContent = product.price
      productDescription.textContent = product.description

      product.colors.forEach(color => {
            const option = document.createElement('option')
            option.setAttribute('value', color)
            option.textContent = color
            document.getElementById('colors').append(option)
      })
      
      document.querySelector('.item__img').append(productImage)
      document.getElementById('title').append()
      document.getElementById('description').textContent = product.name
}

document.getElementById('addToCart').addEventListener('click', () => {

      const userProducts = JSON.parse(localStorage.getItem('userProducts')) || []
      userProducts.push({
            id:selectedProductID,
            color:document.getElementById('colors').value,
            quantity:document.getElementById('quantity').value
      })
      localStorage.setItem('userProducts', JSON.stringify(userProducts))
})