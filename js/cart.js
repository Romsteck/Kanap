const baseUrl = "http://srv-4.mynetwk.biz:3000/api/products"
let selectedProducts = JSON.parse(localStorage.getItem('userProducts')) || []

async function fetchProduct(productId) {

      return await fetch(`${baseUrl}/${productId}`)
            .then(response => response.json())
            .then(value => {
                  return value
            })
            .catch(error => console.log(error))
}

async function updateItemQuantity(item, newQuantity) {

      let currentProduct = await fetchProduct(item.getAttribute('data-id'))

      const priceElement = item.querySelector('.cart__item__content__description p:last-child')
      priceElement.textContent = currentProduct.price * newQuantity

      calculateTotalPriceAndQuantity()
}
function removeItem(item) {
      const existingProductIndex = selectedProducts.findIndex(p=>p.color===item.getAttribute('data-color') && p.id===item.getAttribute('data-id'))
      selectedProducts.splice(existingProductIndex, 1)
      localStorage.setItem('userProducts', JSON.stringify(selectedProducts))
      
      item.remove()
      calculateTotalPriceAndQuantity()
}
async function calculateTotalPriceAndQuantity() {

      let totalPrice = 0
      let totalQuantity = 0

      for (const savedProduct of selectedProducts) {
            
            let currentProduct = await fetchProduct(savedProduct.id)

            totalPrice = totalPrice + (currentProduct.price * savedProduct.quantity)
            totalQuantity = totalQuantity + savedProduct.quantity
      }
      document.getElementById('totalQuantity').textContent = totalQuantity
      document.getElementById('totalPrice').textContent = totalPrice
}

async function addProductsToPage() {

      let cartContainer = document.getElementById('cart__items')
      
      for (const savedProduct of selectedProducts) {
            
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
                              quantityInput.className = 'itemQuantity'
                              quantityInput.name = 'itemQuantity'
                              quantityInput.setAttribute('min', 1)
                              quantityInput.setAttribute('max', 100)
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
      }
      calculateTotalPriceAndQuantity()

      for (const itemQuantityInput of document.getElementsByClassName('itemQuantity')) {
            itemQuantityInput.addEventListener('change', ({target}) => {
                  updateItemQuantity(target.closest('.cart__item'), parseInt(target.value))
            })
      }
      for (const removeButton of document.getElementsByClassName('deleteItem')) {
            removeButton.addEventListener('click', ({target}) => {
                  removeItem(target.closest('.cart__item'))
            })
      }
}

addProductsToPage()