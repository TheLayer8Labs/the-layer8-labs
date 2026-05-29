// =========================================
// MOBILE MENU TOGGLE
// =========================================

const menuToggle = document.getElementById("menu-toggle");

const navLinks = document.getElementById("nav-links");

const getInitials = (name) => {
	return name
		.split(" ")
		.filter(Boolean)
		.map((word) => word[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();
};

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

document.querySelectorAll(".nav-links a").forEach((link) => {
	link.addEventListener("click", () => {
		navLinks.classList.remove("active");
	});
});

// =========================================
// SCROLL REVEAL ANIMATION
// =========================================

const revealElements = document.querySelectorAll(
	".service-card, .gallery-item, .about-stat-card, .review-card, .contact-card",
);

const revealOnScroll = () => {
	const triggerBottom = window.innerHeight * 0.9;

	revealElements.forEach((element) => {
		const elementTop = element.getBoundingClientRect().top;

		if (elementTop < triggerBottom) {
			element.style.opacity = "1";
			element.style.transform = "translateY(0px)";
		}
	});
};

revealElements.forEach((element) => {
	element.style.opacity = "0";
	element.style.transform = "translateY(30px)";
	element.style.transition = "all 0.7s ease";
});

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

// =========================================
// LOAD WEBSITE DATA
// =========================================

fetch("data/site-data.json")
	.then((response) => response.json())

	.then((data) => {
		// =========================================
		// HERO SECTION
		// =========================================

		const heroContainer = document.getElementById("hero-container");

		if (heroContainer) {
			heroContainer.innerHTML = `

        <div class="hero-content">

            <p class="hero-tag">
                ${data.hero.tag}
            </p>

            <h1>
                ${data.hero.title}
            </h1>

            <p class="hero-description">
                ${data.hero.description}
            </p>

            <div class="hero-buttons">

                <a
                    href="${data.hero.primaryButtonLink}"
                    class="btn btn-primary"
                >
                    ${data.hero.primaryButtonText}
                </a>

                <a
                    href="${data.hero.secondaryButtonLink}"
                    class="btn btn-secondary"
                >
                    ${data.hero.secondaryButtonText}
                </a>

            </div>

            <div class="hero-stats">

                ${data.hero.stats
                        .map(
                            (stat) => `
                    <div class="hero-stat-card">
                        <div class="stat-card">

                            <h3>
                                ${stat.value}
                            </h3>

                            <p>
                                ${stat.label}
                            </p>

                        </div>
                    </div>
                `,
                        )
                        .join("")}

            </div>

        </div>

        <div class="hero-image">

            <img
                src="${data.hero.heroImage}"
                alt="Hero Image"
            >

        </div>

    `;
		}
		// =========================================
		// BUSINESS STATS
		// =========================================

		const statsContainer = document.getElementById("business-stats-container");

		if (statsContainer) {
			data.businessStats.forEach((stat) => {
				statsContainer.innerHTML += `

                    <div class="business-stat-item">

                        <h2>${stat.number}</h2>

                        <p>${stat.label}</p>

                    </div>

                `;
			});
		}

		// =========================================
		// ABOUT SECTION
		// =========================================

		const aboutContainer = document.getElementById("about-container");

		if (aboutContainer) {
			aboutContainer.innerHTML = `

                <div class="about-images">

                    <div class="about-image-large">

                        <img
                            src="${data.about.mainImage}"
                            alt="About Image"
                        >

                    </div>

                    <div class="about-image-small">

                        <img
                            src="${data.about.secondaryImage}"
                            alt="About Secondary"
                        >

                    </div>

                </div>

                <div class="about-content">

                    <p class="section-tag">
                        ${data.about.tag}
                    </p>

                    <h2>
                        ${data.about.title}
                    </h2>

                    <p class="about-description">
                        ${data.about.description1}
                    </p>

                    <p class="about-description">
                        ${data.about.description2}
                    </p>

                    <!-- FEATURES -->
                    <div class="about-features">

                        ${data.about.features
                                        .map(
                                            (feature) => `

                            <div class="about-feature">

                                <span>✔</span>

                                <p>${feature}</p>

                            </div>

                        `,
                                        )
                                        .join("")}

                    </div>

                    <!-- STATS -->
                    <div class="about-stats">

                        ${data.about.stats
                                        .map(
                                            (stat) => `

                            <div class="about-stat-card">

                                <h3>
                                    ${stat.title}
                                </h3>

                                <p>
                                    ${stat.description}
                                </p>

                            </div>

                        `,
                                        )
                                        .join("")}

                    </div>

                </div>

            `;
		}

		// =========================================
		// SERVICES
		// =========================================

		const servicesContainer = document.getElementById("services-container");

		if (servicesContainer) {
			data.services.forEach((service) => {
				servicesContainer.innerHTML += `

                    <div class="service-card">

                        <div class="service-icon">
                            ${service.icon}
                        </div>

                        <h3>
                            ${service.title}
                        </h3>

                        <p>
                            ${service.description}
                        </p>

                    </div>

                `;
			});
		}

		// =========================================
		// REVIEWS
		// =========================================

		const reviewsContainer = document.getElementById("reviews-container");

		const reviewPopup = document.createElement("div");
	reviewPopup.className = "review-image-popup";
	reviewPopup.hidden = true;
	reviewPopup.innerHTML = `
		<div class="review-image-popup-backdrop"></div>
		<div class="review-image-popup-content">
			<button type="button" class="popup-close" aria-label="Close image">×</button>
			<img src="" alt="Review image" />
			<div class="popup-caption"></div>
		</div>
	`;
	document.body.appendChild(reviewPopup);

	reviewPopup.addEventListener("click", (event) => {
		if (
			event.target.matches(".popup-close") ||
			event.target.matches(".review-image-popup-backdrop")
		) {
			reviewPopup.hidden = true;
			reviewPopup.querySelector("img").src = "";
		}
	});

		if (reviewsContainer) {
			const duplicatedReviews = [...data.reviews, ...data.reviews];

			duplicatedReviews.forEach((review) => {
				const reviewImages = Array.isArray(review.images) && review.images.length
					? review.images.slice(0, 3)
					: review.image
					? [review.image]
					: [];
				const hasImages = reviewImages.length > 0;

				reviewsContainer.innerHTML += `

                    <div class="review-card">

                        <div class="review-user">

                            <div class="review-avatar">${getInitials(review.name)}</div>

                            <div class="review-user-info">

                                <h4>
                                    ${review.name}
                                </h4>

                                <p>
                                    ${review.designation}
                                    ${review.company ? " • " + review.company : ""}
                                </p>

                            </div>

                        </div>

                        ${hasImages ? `<div class="review-media">
                            ${reviewImages
                                .map(
                                    (src, idx) => `
                                <button
                                    type="button"
                                    class="review-thumbnail"
                                    data-review-image="${src}"
                                    data-review-caption="${review.name} image ${idx + 1}"
                                    aria-label="View image ${idx + 1}"
                                >
                                    <img src="${src}" alt="${review.name} image ${idx + 1}" loading="lazy">
                                </button>`,
                                )
                                .join("")}
                        </div>` : ""}

                        <div class="review-stars">
                            ★★★★★
                        </div>

                        <div class="review-text-wrapper">

                            <p class="review-text collapsed">

                                ${review.review.replace(/\n/g, "<br>")}

                            </p>

                            <button class="read-more-btn">

                                Read More

                            </button>

                        </div>

                    </div>

                `;
			});

			reviewsContainer.addEventListener("click", (event) => {
				const thumb = event.target.closest(".review-thumbnail");
				if (!thumb) return;
				const imageSrc = thumb.dataset.reviewImage;
				const caption = thumb.dataset.reviewCaption || "Review image";
				const popupImage = reviewPopup.querySelector("img");
				const popupCaption = reviewPopup.querySelector(".popup-caption");
				if (popupImage) popupImage.src = imageSrc;
				if (popupImage) popupImage.alt = caption;
				if (popupCaption) popupCaption.textContent = caption;
				reviewPopup.hidden = false;
			});
		}

		// =========================================
		// GALLERY
		// =========================================

		const galleryContainer = document.getElementById("gallery-container");

		if (galleryContainer) {
			data.gallery.forEach((project) => {
				galleryContainer.innerHTML += `

                    <div class="gallery-item">

                        <img src="${project.image}" alt="${project.title}">

                        <div class="gallery-overlay">

                            <span class="gallery-category">
                                ${project.category}
                            </span>

                            <h3>
                                ${project.title}
                            </h3>

                        </div>

                    </div>

                `;
			});

            // Open gallery image in the shared image popup when clicked (detect clicks anywhere inside .gallery-item)
            galleryContainer.addEventListener("click", (e) => {
                const galleryItem = e.target.closest(".gallery-item");
                if (!galleryItem) return;
                const imgEl = galleryItem.querySelector("img");
                if (!imgEl) return;
                const src = imgEl.getAttribute("src");
                const title = imgEl.getAttribute("alt") || (galleryItem.querySelector("h3") ? galleryItem.querySelector("h3").innerText : "Gallery image");
                const popupImage = reviewPopup.querySelector("img");
                const popupCaption = reviewPopup.querySelector(".popup-caption");
                if (popupImage) popupImage.src = src;
                if (popupImage) popupImage.alt = title;
                if (popupCaption) popupCaption.textContent = title;
                reviewPopup.hidden = false;
            });
		}

        // =========================================
        // FLEET / EQUIPMENT
        // =========================================

        const fleetContainer = document.getElementById("fleet-container");

        if (fleetContainer && data.fleet && Array.isArray(data.fleet)) {
            fleetContainer.innerHTML = data.fleet
                .map((cat) => `
                    <section class="fleet-category">
                        <h3 class="fleet-category-title">${cat.category}</h3>
                        <div class="fleet-subcategories">
                            ${cat.subcategories
                                .map(
                                    (sub) => `
                                        <div class="fleet-subcategory">
                                            <h4 class="fleet-sub-label">${sub.label}</h4>
                                            <div class="fleet-items">
                                                ${(sub.items || [])
                                                    .map((it) => {
                                                        if (it.values && Array.isArray(it.values)) {
                                                            return `
                                                            <div class="fleet-item">
                                                                    <div class="fleet-item-left">${it.logo ? `<img src="${it.logo}" alt="${it.label} logo">` : ""}</div>
                                                                <div class="fleet-item-right">
                                                                    <strong class="fleet-item-name">${it.label}</strong>
                                                                    <ul class="fleet-item-values">
                                                                        ${it.values.map((v) => `<li>${v}</li>`).join("")}
                                                                    </ul>
                                                                </div>
                                                            </div>`;
                                                        } else {
                                                        return `
                                                        <div class="fleet-item">
                                                            <div class="fleet-item-left">
                                                                ${it.image ? `<img src="${it.image}" alt="${it.name}">` : ""}
                                                            </div>
                                                            <div class="fleet-item-right">
                                                                <strong class="fleet-item-name">${it.name}</strong>
                                                                ${it.description ? `<p class="fleet-item-desc">${it.description}</p>` : ""}
                                                            </div>
                                                            </div>`;
                                                        }
                                                    }).join("")}
                                            </div>
                                        </div>
                                    `)
                            .join("")}
                        </div>
                    </section>
                `)
                .join("");
        }
		// =========================================
		// CONTACT INFO
		// =========================================

		const emailElement = document.getElementById("contact-email");

		if (emailElement) {
			emailElement.innerText = data.contact.email;
		}

		const phoneElement = document.getElementById("contact-phone");

		if (phoneElement) {
			phoneElement.innerText = data.contact.phone;
		}

		const whatsappElement = document.getElementById("contact-whatsapp");

		if (whatsappElement) {
			whatsappElement.href = `https://wa.me/${data.contact.whatsapp}`;
		}

		const instagramElement = document.getElementById("contact-instagram");

		if (instagramElement) {
			instagramElement.href = data.contact.instagram;
		}

		const linkedinElement = document.getElementById("contact-linkedin");

		if (linkedinElement) {
			linkedinElement.href = data.contact.linkedin;
		}

		// =========================================
		// FOOTER
		// =========================================

		const footerContainer = document.getElementById("footer-container");

		if (footerContainer) {
			footerContainer.innerHTML = `

        <!-- BRAND -->
        <div class="footer-brand">

            <h3>
                ${data.footer.brandName}
            </h3>

            <p>
                ${data.footer.description}
            </p>

            ${data.footer.trustBadges ? `<div class="footer-badges"> ${data.footer.trustBadges.map((badge) => ` <span class="badge">${badge}</span> `).join("")} </div>` : ""}

        </div>

        <!-- QUICK LINKS -->
        <div class="footer-links">

            <h4>
                Quick Links
            </h4>

            <ul>

                ${data.footer.quickLinks
									.map(
										(link) => `

                    <li>

                        <a href="${link.url}">

                            ${link.name}

                        </a>

                    </li>

                `,
									)
									.join("")}

            </ul>

        </div>

        <!-- SERVICES -->
        <div class="footer-links">

            <h4>
                Services
            </h4>

            <ul>

                ${data.footer.services
									.map(
										(service) => `

                    <li>

                        ${service}

                    </li>

                `,
									)
									.join("")}

            </ul>

        </div>

        <!-- SOCIALS -->
        <div class="footer-links">

            <h4>
                Connect
            </h4>

            <ul>

                ${data.footer.socials
									.map(
										(social) => `

                    <li>

                        <a
                            href="${social.url}"
                            target="_blank"
                        >

                            ${social.name}

                        </a>

                    </li>

                `,
									)
									.join("")}

            </ul>

        </div>

    `;
		}

		// =========================================
		// FOOTER COPYRIGHT
		// =========================================

		const footerCopyright = document.getElementById("footer-copyright");

		if (footerCopyright) {
			footerCopyright.innerText = data.footer.copyright;
		}

        // =========================================
        // TRUST STRIP
        // =========================================

        const trustStripContainer = document.getElementById("trust-strip-container");

        if (trustStripContainer && data.trustStrip && Array.isArray(data.trustStrip)) {
            trustStripContainer.innerHTML = `
                <div class="trust-strip-inner">
                    ${data.trustStrip
                        .map(
                            (item) => `
                                <div class="trust-item">
                                    ${item.logo ? `<img src="${item.logo}" alt="${item.title}" loading="lazy">` : ""}
                                    <span class="trust-title">${item.title}</span>
                                </div>
                            `
                        )
                        .join("")}
                </div>
            `;
        }

        // =========================================
        // FAQ
        // =========================================

        const faqContainer = document.getElementById("faq-container");

        if (faqContainer && data.faq && Array.isArray(data.faq)) {
            data.faq.forEach((item, idx) => {
                faqContainer.innerHTML += `
                    <div class="faq-item">
                        <button class="faq-question" aria-expanded="false" aria-controls="faq-${idx}">
                            <span class="question-text">${item.question}</span>
                            <span class="faq-toggle">+</span>
                        </button>

                        <div id="faq-${idx}" class="faq-answer" hidden>
                            ${item.answer}
                        </div>
                    </div>
                `;
            });

            faqContainer.addEventListener("click", (e) => {
                const btn = e.target.closest(".faq-question");
                if (!btn) return;
                const panel = document.getElementById(btn.getAttribute("aria-controls"));
                const expanded = btn.getAttribute("aria-expanded") === "true";
                btn.setAttribute("aria-expanded", String(!expanded));
                if (panel) panel.hidden = expanded;
                const toggle = btn.querySelector(".faq-toggle");
                if (toggle) toggle.innerText = expanded ? "+" : "−";
            });
        }
	})

	.catch((error) => {
		console.error("Failed to load JSON data:", error);
	});

// =========================================
// READ MORE REVIEWS
// =========================================

document.addEventListener("click", (event) => {
	if (event.target.classList.contains("read-more-btn")) {
		const button = event.target;

		const reviewText = button.previousElementSibling;

		reviewText.classList.toggle("expanded");

		reviewText.classList.toggle("collapsed");

		if (reviewText.classList.contains("expanded")) {
			button.innerText = "Show Less";
		} else {
			button.innerText = "Read More";
		}
	}
});
