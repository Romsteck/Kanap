const baseUrl = "http://localhost:3000/api/products"

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

fetch(baseUrl)
      .then(response => response.json())
      .then(value => {
            AddProducts(value)
      })
      .catch(error => console.log(error))

function AddProducts(value) {

      let products = []
      value.forEach(product => {

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

      products.forEach(p => {

            let main_Container =          document.createElement('a')
            let article_Container =       document.createElement('article')
            
            let product_Image =           document.createElement('img')
            let product_Name =            document.createElement('h3')
            let product_Description =     document.createElement('p')

            main_Container.href = `./product.html?id=${p.id}`

            product_Image.src = p.image
            product_Image.alt = p.description

            product_Name.className = 'productName'
            product_Name.textContent = p.name

            product_Description.className = 'productDescription'
            product_Description.textContent = p.description

            article_Container.append(
                  product_Image,
                  product_Name,
                  product_Description
            )

            main_Container.append(article_Container)

            document.getElementById('items').append(main_Container)
      })
}