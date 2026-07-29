const banner = document.querySelector(".banner");

window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        banner.classList.add("scrolled");
    } else {
        banner.classList.remove("scrolled");
    }
});