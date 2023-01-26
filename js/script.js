let baseUrl = "http://localhost:3000/api/products"

class Product {
      constructor(
            id,
            colors,
            name,
            price,
            image,
            description,
            altTxt
      ) {
            this.id = id
            this.colors = colors
            this.name = name
            this.price = price
            this.image = image
            this.description = description
            this.altTxt = altTxt
      }
}

fetch(`${baseUrl}`)
      .then(response => response.json())
      .then(value => {
            getProducts(value)
      })
      .catch(error => console.log(error))

function getProducts(value) {

      let products = []

      value.forEach(product => {

            let newProduct = 

            products.push(new Product(
                  product._id,
                  product.colors,
                  product.name,
                  product.price,
                  product.imageUrl,
                  product.description,
                  product.altTxt
            ))
      })

      console.log(products)
}