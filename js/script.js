// Determine whether user has scrolled & Mark banner
const banner = document.querySelector(".banner");

window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        banner.classList.add("scrolled");
    } else {
        banner.classList.remove("scrolled");
    }
});



// Allow carousel window to accept wheel as a scroll input
const carouselWindow = document.querySelector(".program-mosiac-container-window");

carouselWindow.addEventListener("wheel", (event) => {
    event.preventDefault();
    carouselWindow.scrollLeft -= event.deltaY;
}, { passive: false });

// Infinite Carousel
const carousel = document.querySelector(".carousel");
const card = document.querySelector(".program-mosiac-item");
const carouselWidth = carousel.offsetWidth;
carouselWindow.scrollLeft = carouselWidth / 2 - (card.offsetWidth * 5);