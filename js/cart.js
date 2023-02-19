const baseUrl = "http://localhost:3000/api/products"
let selectedProducts = JSON.parse(localStorage.getItem('userProducts')) || []

async function fetchProduct(productId) {

      return await fetch(`${baseUrl}/${productId}`)
            .then(response => response.json())
            .then(value => {
                  return value
            })
            .catch(error => console.log(error))
}

async function addProductsToPage() {

      let cartContainer = document.getElementById('cart__items')
      
      selectedProducts.forEach(async savedProduct => {
            
            let currentProduct = await fetchProduct(savedProduct.id)

            let article = document.createElement('article')
            article.className = 'cart__item'
            article.setAttribute('data-id', savedProduct.id)
            article.setAttribute('data-color', savedProduct.color)

                  let productImageContainer = document.createElement('div')
                  let productImage = document.createElement('img')
                  productImageContainer.className = 'cart__item__img'
                  productImage.src = currentProduct.imageUrl
                  productImage.alt = currentProduct.altTxt
                  productImageContainer.append(productImage)

                  let cartItemContainer = document.createElement('div')
                  cartItemContainer.className = 'cart__item__content'

                        let descriptionContainer = document.createElement('div')
                        let productName = document.createElement('h2')
                        let productColor = document.createElement('p')
                        let productPrice = document.createElement('p')
                        descriptionContainer.className = 'cart__item__content__description'
                        productName.textContent = currentProduct.name
                        productColor.textContent = savedProduct.color
                        productPrice.textContent = `${currentProduct.price * savedProduct.quantity} €`
                        descriptionContainer.append(productName, productColor, productPrice)


                        let settingsMainContainer = document.createElement('div')
                        settingsMainContainer.className = 'cart__item__content__settings'

                              let quantitycontainer = document.createElement('div')
                              let quantity = document.createElement('p')
                              let quantityInput = document.createElement('input')
                              quantitycontainer.className = 'cart__item__content__settings__quantity'
                              quantity.textContent = 'Qté : '
                              quantityInput.type = 'number'
                              quantity.className = 'itemQuantity'
                              quantity.name = 'itemQuantity'
                              quantity.setAttribute('min', 1)
                              quantity.setAttribute('max', 100)
                              quantityInput.value = savedProduct.quantity
                              quantitycontainer.append(quantity, quantityInput)

                              let deleteContainer = document.createElement('div')
                              let deleteButton = document.createElement('p')
                              deleteContainer.className = 'cart__item__content__settings__delete'
                              deleteButton.className = 'deleteItem'
                              deleteButton.textContent = 'Supprimer'
                              deleteContainer.append(deleteButton)

                        settingsMainContainer.append(quantitycontainer, deleteContainer)

                  cartItemContainer.append(descriptionContainer, settingsMainContainer)

            article.append(productImageContainer, cartItemContainer)
            cartContainer.append(article)
      })

      // FOREACH POUR LE CALCUL TOTALS QUANTITY/PRICE
      // document.getElementById('totalQuantity').textContent = totalQuantity
      // document.getElementById('totalPrice').textContent = totalPrice
}

addProductsToPage()