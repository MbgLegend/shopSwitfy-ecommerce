import { getProducts } from './getProducts.js'
import { showUserCart } from './cart.js'

const select = document.querySelector(".products .flex select")
const header = document.querySelector(".products .flex h1")

async function getCategoriesToFilter() {
    try {
        const response = await fetch ("https://dummyjson.com/products/categories")
        const data = await response.json()

        data.forEach((category) => {
            const option = document.createElement("option")
            option.value = category
            option.textContent = category
            select.appendChild(option)
        })

        select.addEventListener("change", (event) => {
            const clickedCategory = event.target.value

            console.log(clickedCategory)
            if (clickedCategory === "All products") {
                getProducts(0, '.products .grid', null, null, true)
            } else {
                getProducts(0, '.products .grid', null, clickedCategory, true)
            }
            header.textContent = clickedCategory
        });
    }
    
    catch (error) {
        alert(error)
    }
}

window.onload = () => {
    getProducts(0, '.products .grid', null, null, true)
    getCategoriesToFilter()
    header.textContent = "All products"
    showUserCart()
}