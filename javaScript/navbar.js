import { closeCart } from './cart.js'

const navContent = document.querySelector(".navbar .content-holder")

export function openNavbar () {
    closeCart()
    navContent.classList.add("active")
}

export function closeNavbar () {
    navContent.classList.remove("active")
}