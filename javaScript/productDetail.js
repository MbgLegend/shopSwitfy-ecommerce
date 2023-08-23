import { getProducts } from './getProducts.js'

document.addEventListener("DOMContentLoaded", () => {
    const quantity = document.getElementById('quantity')
    const buttons = document.querySelectorAll(".details .grid .container .flex button")
    const ID = localStorage.getItem("product_details")
    const productPrice = document.querySelector(".price")
    let price = 0;

    async function productDetail() {
        try {
            const response = await fetch("https://dummyjson.com/products/" + ID)
            const data = await response.json()

            document.title = data.title
            price = data.price
            document.querySelector(".container").id = data.id
            productPrice.textContent = price + "$"
            document.querySelector(".product-name").textContent = data.title
            document.querySelector(".description").textContent = data.description
            document.querySelector(".thumbnail").src = data.images[0]

            const imagesFlex = document.querySelector(".images-flex")
            data.images.forEach((image) => {
                const img = document.createElement("img")
                img.src = image
                imagesFlex.appendChild(img)

                img.addEventListener("click", (event) => {
                    document.querySelector(".thumbnail").src = event.target.getAttribute("src")
                });
            });
        } catch (error) {
            alert(error)
        }
    }

    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            if (event.target.classList.contains("add")) {
                if (quantity.value < 99) {
                    quantity.value++
                }
            } else {
                if (quantity.value > 1) {
                    quantity.value--
                }
            }
            productPrice.textContent = (price * quantity.value) + "$"
        })
    })

    productDetail()
    getProducts(5, '.trending .grid', 20, null, false)
})