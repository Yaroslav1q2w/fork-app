const button = document.querySelector(".header-menu_burger")
const burgerMenu = document.querySelector(".menu__burger")
const spanBtnBurger = document.querySelector(".header-menu_btn")

const buttonList = () => {
    button.addEventListener("click", () => {
        button.classList.toggle("active")
        burgerMenu.classList.toggle("active")
        spanBtnBurger.classList.toggle("active")
    })
}
buttonList()