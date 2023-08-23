import { getProducts } from './javaScript/getProducts.js'
import { openNavbar, closeNavbar } from './javaScript/navbar.js'
import { checkEmail } from './javaScript/checkEmail.js'

const menu = document.getElementById("menu")
const close = document.getElementById("close")
const input = document.getElementById("email")
const submit = document.getElementById("submit")

// Loading products
window.addEventListener("load", () => {
    if (document.querySelector(".preview .grid") || document.querySelector(".arrivals .grid")) {
        getProducts(0, ".preview .grid", 8, null, false)
        getProducts(8, ".arrivals .grid", 16, null, false) 
    }
})

// Navbar
menu.onclick = openNavbar
close.onclick = closeNavbar
window.onscroll = closeNavbar
window.onresize = closeNavbar

// Press releases
if (input && submit) {
    submit.addEventListener("click", (event) => {
        event.preventDefault()
        checkEmail(input.value)
        input.value = ""
    })
}