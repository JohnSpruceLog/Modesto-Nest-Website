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
const carouselWindow = document.querySelector(".program-mosaic-container-window");

const cards = carousel.children;
const cardsPerCopy = cards.length / 3;
const setWidth =
    cards[cardsPerCopy].offsetLeft - cards[0].offsetLeft;

carouselWindow.scrollLeft = setWidth;

// Start in the middle copy
carouselWindow.scrollLeft = setWidth;

carouselWindow.addEventListener("scroll", () => {
    if (carouselWindow.scrollLeft <= 0) {
        carouselWindow.scrollLeft += setWidth;
    } else if (carouselWindow.scrollLeft >= setWidth * 2) {
        carouselWindow.scrollLeft -= setWidth;
    }
});

carouselWindow.addEventListener("wheel", (event) => {
    event.preventDefault();

    const rawDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    // Prevent one unusually large wheel event from skipping a whole copy.
    const delta = Math.max(-100, Math.min(100, rawDelta));

    carouselWindow.scrollLeft += delta;
}, { passive: false });

// Sub-menu open on button hover
const ourStoryButton = document.querySelector(".Header-story-button");
const subMenu = document.querySelector(".sub-menu");

ourStoryButton.addEventListener("mouseenter", () =>{
    subMenu.classList.add("is-open");
})

ourStoryButton.addEventListener("mouseleave", () =>{
    subMenu.classList.remove("is-open");
})