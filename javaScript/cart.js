import { closeNavbar } from './navbar.js'

const userCart = document.querySelector(".user-cart")
const cart = document.getElementById("cart")
const closeUserCart = document.getElementById("closeCart")
const cartContainer = document.querySelector(".user-cart .container")
const addToCart = document.getElementById("addToCart")
const header = document.querySelector(".amount-of-items")
const toastNofitication = document.querySelector(".toast-notification")
const cartTotal = document.getElementById("price")
const dataStorage = localStorage.getItem("user_cart")
let dataToSave
let total = 0

if (!dataStorage) {
    dataToSave = []
} else {
    const parsedData = JSON.parse(dataStorage)
    dataToSave = Array.isArray(parsedData) ? parsedData : []
}

function openCart() {
    closeNavbar()
    userCart.classList.add("active")
}

export function closeCart() {
    userCart.classList.remove("active")
}

function generateUniqueId() {
    const timestamp = new Date().getTime().toString(16)
    const random = Math.random().toString(16)
    return `${timestamp}-${random}`
}

if (addToCart) {
    addToCart.addEventListener("click", (event) => {
        const div = document.createElement("div")
        div.classList.add("box")
        div.innerHTML = `<p><i class="fa-solid fa-check"></i> Added <b>${document.querySelector(".product-name").textContent}</b> to your cart!</p>`
        toastNofitication.appendChild(div)

        dataToSave.push({
            ID: event.target.parentNode.parentNode.id,
            Quantity: document.getElementById("quantity").value,
            Product_ID: generateUniqueId()
        })
        
        localStorage.setItem("user_cart", JSON.stringify(dataToSave))

        setTimeout(() => {
            toastNofitication.removeChild(div)
        }, 5000)

        showUserCart()
    })
}

export async function showUserCart() {
    cartContainer.innerHTML = ''
    header.textContent = dataToSave.length
    total = 0

    if (dataToSave.length === 0) {
        const emptyCartDiv = document.createElement('div')
        emptyCartDiv.classList.add("empty-cart-content")
        emptyCartDiv.innerHTML = `
            <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Empty cart" class="empty-cart">
        `
        const button = document.createElement("button")
        button.innerText = "Continue shopping"
        button.classList.add("continue")
        emptyCartDiv.appendChild(button)

        cartContainer.appendChild(emptyCartDiv)
        total = 0

        button.addEventListener("click", closeCart)
    } else {
        for (const data of dataToSave) {
            const userCartProducts = await getProduct(data.ID)

            userCartProducts.forEach((product) => {
                const div = document.createElement("div")
                div.setAttribute("data-id", data.Product_ID)
                div.classList.add("box")
                div.innerHTML = `
                    <img src="${product.Thumbnail}">
                    <div class="text">
                        <div class="flex">
                            <span>${product.Name}</span>
                            <p class="product-pricing">${product.Price * Number(data.Quantity)}$</p>
                        </div>
                        <div class="flex bottom-xy">
                            <div class="quantity-buttons">
                                <button>-</button>
                                <input type="number" min="1" max="99" class="quantity-to-multiply" disabled value="${data.Quantity}">
                                <button>+</button>
                            </div>
                        </div>
                    </div>
                `
                let toalPrice =  Number(product.Price) * Number(data.Quantity)
                total += toalPrice

                const deleteButton = document.createElement("i")
                deleteButton.classList.add("fa-solid")
                deleteButton.classList.add("fa-xmark")
                deleteButton.addEventListener("click", deleteCartProducts)
                div.querySelector(".bottom-xy").appendChild(deleteButton)

                cartContainer.appendChild(div)
            })
        }
    }
    cartTotal.textContent = total.toFixed(2) + "$";
}

function deleteCartProducts(event) {
    const deleteButton = event.target;
    const box = deleteButton.closest(".box")
    const itemId = box.getAttribute("data-id")
    
    const initialQuantity = dataToSave.find((data) => data.Product_ID === itemId)?.InitialQuantity || 1;

    const priceElement = box.querySelector(".product-pricing")
    const price = parseFloat(priceElement.textContent.replace("$", ""))

    const itemTotal = price * initialQuantity
    total -= itemTotal
    cartTotal.textContent = total.toFixed(2) + "$"

    cartContainer.removeChild(box)

    dataToSave = dataToSave.filter((data) => data.Product_ID !== itemId)
    localStorage.setItem("user_cart", JSON.stringify(dataToSave))

    header.textContent = dataToSave.length

    if (dataToSave.length === 0) {
        const emptyCartDiv = document.createElement('div')
        emptyCartDiv.innerHTML = `
            <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Empty cart" class="empty-cart">
        `
        const button = document.createElement("button")
        button.innerText = "Continue shopping"
        button.classList.add("continue")
        emptyCartDiv.appendChild(button)

        cartContainer.appendChild(emptyCartDiv)
        total = 0

        button.addEventListener("click", closeCart)
    }

    cartTotal.textContent = total.toFixed(2) + "$"
}

async function getProduct(ID) {
    const response = await fetch("https://dummyjson.com/products/" + ID)
    const data = await response.json()
    let allData = []

    allData.push({
        Name: data.title,
        Thumbnail: data.thumbnail,
        Price: data.price,
    })

    return allData
}

window.onload = showUserCart
cart.onclick = openCart
closeUserCart.onclick = closeCart
window.onresize = closeCart