const baseUrl = "http://localhost:3000/api/products"
const URLParameters = new URLSearchParams(window.location.search)
const selectedProductID = URLParameters.get('id')

function addSelectedProductToPage(product) {

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
function fetchSelectedProduct() {
      fetch(`${baseUrl}/${selectedProductID}`)
            .then(response => response.json())
            .then(value => {
                  addSelectedProductToPage(value)
            })
            .catch(error => console.log(error))
}

function addProductToCart() {

      let userProducts = JSON.parse(localStorage.getItem('userProducts')) || []
      const selectedColor = document.getElementById('colors').value
      const selectedQuantity = parseInt(document.getElementById('quantity').value)

      let alertMessage = ''
      let checkSelectedProduct = userProducts.filter(p=>p.color===selectedColor && p.id===selectedProductID) || []

      let alertCheck = [
            {
                  invalid:selectedColor=='',
                  errorMessage:`Veuillez sélectionner une couleur.`
            },
            {
                  invalid:selectedQuantity<1,
                  errorMessage:`Vous devez sélectionner au moins un produit.`
            },
            {
                  invalid:(() => {
                        if (checkSelectedProduct.length === 1) {
                              return selectedQuantity + checkSelectedProduct[0].quantity > 100;
                        } else {
                              return selectedQuantity > 100;
                        }
                  })(),
                  errorMessage:`Vous avez atteint la limite d'articles autorisés pour votre panier.`
            }
      ]

      if (alertCheck.filter(a=>a.invalid).length >= 1) {
            
            alert(alertCheck.filter(a=>a.invalid).map(e=>e.errorMessage).join(' '))
            
      } else {
            
            if (alertMessage=='') {

                  if (userProducts.filter(p=> p.id===selectedProductID).length>=1) {
                        
                        if (userProducts.filter(p=> p.color===selectedColor && p.id===selectedProductID).length===1) {

                              let existingProduct = userProducts.find(p=>p.color===selectedColor && p.id===selectedProductID)
                              existingProduct.quantity = existingProduct.quantity + selectedQuantity

                              const existingProductIndex = userProducts.findIndex(p=>p.color===selectedColor && p.id===selectedProductID)
                              userProducts.splice(existingProductIndex, 1, existingProduct)
                        } else {
                              userProducts.push({
                                    id: selectedProductID,
                                    color: selectedColor,
                                    quantity: selectedQuantity
                              })
                        }
                  } else {
                        userProducts.push({
                              id: selectedProductID,
                              color: selectedColor,
                              quantity: selectedQuantity
                        })
                  }
            }
            localStorage.setItem('userProducts', JSON.stringify(userProducts))
      }
}

document.getElementById('addToCart').addEventListener('click', addProductToCart)

fetchSelectedProduct()