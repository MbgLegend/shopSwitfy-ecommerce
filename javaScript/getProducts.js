let link = ""

if (!document.getElementById("pressReleases")) {
    // link = "../HTML/productPage.html"
    console.log("did not work")
} else {
    link = "HTML/productPage.html"
}

export async function getProducts(startIndex, containerSelector, endIndex, category, reset) {
    const container = document.querySelector(containerSelector)
    if (reset === true) {
        container.innerHTML = ""
    }
    
    let API_link

    if (category === null) {
        API_link = 'https://dummyjson.com/products'
    } else {
        API_link = 'https://dummyjson.com/products/category/' + category
    }

    const response = await fetch(API_link)
    const data = await response.json()
    const products = data.products

    if (endIndex === null) {
        endIndex = products.length
    }

    for (let i=startIndex; i < endIndex; i++) {
        const product = products[i]
        const rating = addRatingStars(Number(product.rating))

        const div = document.createElement("div")
        div.setAttribute("id", product.id)
        div.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.description}">
            <div>
                <h6>${product.brand}</h6>
                <h2>${product.title}</h2>
                <span>${product.rating} | ${rating}</span>
                <p>${product.price}$</p>
            </div>
        `
        div.addEventListener("click", () => {
            localStorage.setItem("product_details", product.id)
            window.location.href = link
        })

        container.appendChild(div)
    }
}

function addRatingStars(rating) {
    const fullStar = '<i class="fa-solid fa-star"></i>'
    const halfStar = '<i class="fa-solid fa-star-half-stroke"></i>'
    const emptyStar = '<i class="fa-regular fa-star"></i>'
    
    let totalStars = ''

    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            totalStars += fullStar;
        } else if (rating > i - 0.5) {
            totalStars += halfStar;
        } else {
            totalStars += emptyStar;
        }
    }

    return totalStars
}
