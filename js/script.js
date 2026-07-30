// Determine whether user has scrolled & Mark banner
const banner = document.querySelector(".banner");

window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        banner.classList.add("scrolled");
    } else {
        banner.classList.remove("scrolled");
    }
});



// Infinite carousel

const carousel = document.querySelector(".carousel");
const carouselWindow = document.querySelector(".program-mosiac-container-window");

const setWidth = carousel.scrollWidth / 3;

// Start in the middle copy
carouselWindow.scrollLeft = setWidth;

carouselWindow.addEventListener("scroll", () => {

    if (carouselWindow.scrollLeft <= 0) {
        carouselWindow.style.scrollBehavior = "auto";
        carouselWindow.scrollLeft += setWidth;
        carouselWindow.style.scrollBehavior = "smooth";
    }

    if (carouselWindow.scrollLeft >= setWidth * 2) {
        carouselWindow.style.scrollBehavior = "auto";
        carouselWindow.scrollLeft -= setWidth;
        carouselWindow.style.scrollBehavior = "smooth";
    }

});

// const carousel = document.querySelector(".carousel");
// const carouselWindow =  