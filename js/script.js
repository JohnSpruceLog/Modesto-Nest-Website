// Determine whether user has scrolled & Mark banner
const banner = document.querySelector(".banner");

window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        banner.classList.add("scrolled");
    } else {
        banner.classList.remove("scrolled");
    }
});

// Mobile navigation toggle
const menuToggle = document.querySelector(".Header-menu-toggle");
const mainNavigation = document.querySelector("#main-navigation");

if (menuToggle && mainNavigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNavigation.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      mainNavigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    }
  });
}



// Infinite carousel

const carousel = document.querySelector(".carousel");
const carouselWindow = document.querySelector(
  ".program-mosiac-container-window"
);

const cards = carousel.children;
const cardsPerCopy = cards.length / 3;

const setWidth =
  cards[cardsPerCopy].offsetLeft - cards[0].offsetLeft;

// Start in the middle copy
carouselWindow.scrollLeft = setWidth;


// Infinite looping

carouselWindow.addEventListener("scroll", () => {
  if (carouselWindow.scrollLeft <= 0) {
    carouselWindow.scrollLeft += setWidth;
  } else if (carouselWindow.scrollLeft >= setWidth * 2) {
    carouselWindow.scrollLeft -= setWidth;
  }
});


// Trackpad / horizontal wheel

let momentum = 0;
let momentumFrame = null;

function stopMomentum() {
  if (momentumFrame !== null) {
    cancelAnimationFrame(momentumFrame);
    momentumFrame = null;
  }
}

function animateMomentum() {
  if (Math.abs(momentum) < 0.1 || isDragging) {
    momentum = 0;
    momentumFrame = null;
    return;
  }

  carouselWindow.scrollLeft += momentum;
  momentum *= 0.94;
  momentumFrame = requestAnimationFrame(animateMomentum);
}

function startMomentum() {
  if (momentumFrame === null) {
    momentumFrame = requestAnimationFrame(animateMomentum);
  }
}

carouselWindow.addEventListener(
  "wheel",
  (event) => {
    // Ignore vertical scrolling.
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      return;
    }

    event.preventDefault();

    const delta = Math.max(-100, Math.min(100, event.deltaX));
    momentum += delta * 0.35;
    momentum = Math.max(-40, Math.min(40, momentum));
    startMomentum();
  },
  { passive: false }
);

// Mouse click + drag

let isDragging = false;
let dragStartX = 0;
let dragStartScrollLeft = 0;
let lastPointerX = 0;
let lastPointerTime = 0;
let dragVelocity = 0;


carouselWindow.addEventListener("pointerdown", (event) => {
  // Only use the primary mouse button
  if (event.pointerType === "mouse" && event.button !== 0) {
    return;
  }

  isDragging = true;
  stopMomentum();
  momentum = 0;

  dragStartX = event.clientX;
  dragStartScrollLeft = carouselWindow.scrollLeft;
  lastPointerX = event.clientX;
  lastPointerTime = performance.now();
  dragVelocity = 0;

  // Keep receiving pointer events even if the cursor
  carouselWindow.setPointerCapture(event.pointerId);

  carouselWindow.classList.add("is-dragging");
});

carouselWindow.addEventListener("pointermove", (event) => {
  if (!isDragging) return;

  const distance = event.clientX - dragStartX;
  const now = performance.now();
  const elapsed = Math.max(1, now - lastPointerTime);

  carouselWindow.scrollLeft =
    dragStartScrollLeft - distance;

  dragVelocity = -((event.clientX - lastPointerX) / elapsed) * 16;
  lastPointerX = event.clientX;
  lastPointerTime = now;
});

function stopDragging(event) {
  if (!isDragging) return;

  isDragging = false;
  momentum = Math.max(-40, Math.min(40, dragVelocity));
  startMomentum();

  if (carouselWindow.hasPointerCapture(event.pointerId)) {
    carouselWindow.releasePointerCapture(event.pointerId);
  }

  carouselWindow.classList.remove("is-dragging");
}

carouselWindow.addEventListener("pointerup", stopDragging);
carouselWindow.addEventListener("pointercancel", stopDragging);
