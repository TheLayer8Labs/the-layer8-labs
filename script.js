// =========================================
// MOBILE MENU TOGGLE
// =========================================

const menuToggle = document.getElementById("menu-toggle");

const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

// =========================================
// NAVBAR SCROLL EFFECT
// =========================================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");
    }

});

// =========================================
// CLOSE MOBILE MENU ON LINK CLICK
// =========================================

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});

// =========================================
// SCROLL REVEAL ANIMATION
// =========================================

const revealElements = document.querySelectorAll(
    ".service-card, .gallery-item, .about-stat-card, .review-card, .contact-card"
);

const revealOnScroll = () => {

    const triggerBottom = window.innerHeight * 0.9;

    revealElements.forEach(element => {

        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {

            element.style.opacity = "1";
            element.style.transform = "translateY(0px)";
        }
    });
};

revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.7s ease";
});

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();