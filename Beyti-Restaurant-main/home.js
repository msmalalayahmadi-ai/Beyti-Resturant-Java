
// ==========================================
// 1. MOBILE NAVIGATION
// ==========================================

const menuCheckbox = document.querySelector("#menu");
const navLinks = document.querySelector(".nav-links");

if (menuCheckbox && navLinks) {
    navLinks.addEventListener("click", function(event) {
        if (event.target.closest("a")) {
            menuCheckbox.checked = false;
        }
    });
}


// ==========================================
// 2. RESERVATION FORM
// ==========================================

const reservationForm = document.querySelector("#Contact_Us form");

if (reservationForm) {

    const nameInput = reservationForm.querySelector('input[type="text"]');
    const emailInput = reservationForm.querySelector('input[type="email"]');
    const dateInput = reservationForm.querySelector('input[type="date"]');
    const timeInput = reservationForm.querySelector('input[type="time"]');
    const guestsInput = reservationForm.querySelector('input[type="number"]');
    const phoneInput = reservationForm.querySelector('input[type="tel"]');

    const today = new Date();
    const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    dateInput.min = localDate;

    nameInput.required = true;
    emailInput.required = true;
    dateInput.required = true;
    timeInput.required = true;
    guestsInput.required = true;

    guestsInput.min = 1;
    guestsInput.max = 20;

    reservationForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (!reservationForm.checkValidity()) {
            reservationForm.reportValidity();
            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const date = dateInput.value;
        const time = timeInput.value;
        const guests = Number(guestsInput.value);
        const phone = phoneInput.value.trim();

        if (name === "" || email === "") {
            alert("Please enter your name and email.");
            return;
        }

        if (guests < 1 || guests > 20) {
            alert("Please select between 1 and 20 guests.");
            return;
        }

        const reservation = {
            name,
            email,
            date,
            time,
            guests,
            phone
        };

        console.log("Reservation Details:", reservation);

        showMessage(
            reservationForm,
            "Your reservation request has been checked successfully! Please contact the restaurant to confirm your booking.",
            "success"
        );

        reservationForm.reset();
        dateInput.min = localDate;
    });
}


// ==========================================
// 3. NEWSLETTER SUBSCRIPTION
// ==========================================

const newsletterForm = document.querySelector("#Quick_Links form");

if (newsletterForm) {

    const newsletterEmail = newsletterForm.querySelector('input[type="email"]');

    newsletterEmail.required = true;

    newsletterForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (!newsletterForm.checkValidity()) {
            newsletterForm.reportValidity();
            return;
        }

        const email = newsletterEmail.value.trim();

        if (email === "") {
            alert("Please enter your email address.");
            return;
        }

        console.log("Newsletter Email:", email);

        showMessage(
            newsletterForm,
            "Thank you! Your email has been checked successfully.",
            "success"
        );

        newsletterForm.reset();
    });
}


// ==========================================
// 4. GALLERY LIGHTBOX
// ==========================================

const gallery = document.querySelector("#Gallery .gallery");

if (gallery) {

    const images = gallery.querySelectorAll("img");

    const lightbox = document.createElement("div");

    lightbox.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        justify-content: center;
        align-items: center;
        z-index: 9999;
        cursor: pointer;
    `;

    const previewImage = document.createElement("img");

    previewImage.style.cssText = `
        max-width: 85%;
        max-height: 85%;
        object-fit: contain;
        border-radius: 10px;
        cursor: default;
    `;

    lightbox.appendChild(previewImage);
    document.body.appendChild(lightbox);

    gallery.addEventListener("click", function(event) {

        const clickedImage = event.target.closest("img");

        if (!clickedImage) return;

        previewImage.src = clickedImage.src;
        previewImage.alt = clickedImage.alt;

        lightbox.style.display = "flex";
    });

    lightbox.addEventListener("click", function(event) {

        if (event.target !== previewImage) {
            lightbox.style.display = "none";
        }
    });

    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape") {
            lightbox.style.display = "none";
        }
    });
}


// ==========================================
// 5. MENU INTERACTION
// ==========================================

const menuCards = document.querySelectorAll("#Our_Menu .menu article");

menuCards.forEach(function(card) {

    card.addEventListener("click", function() {

        const dishName = card.querySelector("div p").textContent;
        const dishPrice = card.querySelector("div span").textContent;

        alert(
            "Dish: " + dishName +
            "\nPrice: " + dishPrice
        );
    });

});


// ==========================================
// 6. REUSABLE MESSAGE FUNCTION
// ==========================================

function showMessage(form, message, type) {

    let messageBox = form.querySelector(".js-message");

    if (!messageBox) {

        messageBox = document.createElement("p");

        messageBox.className = "js-message";

        messageBox.setAttribute("role", "status");

        form.appendChild(messageBox);
    }

    messageBox.textContent = message;

    messageBox.style.padding = "12px";
    messageBox.style.marginTop = "12px";
    messageBox.style.borderRadius = "6px";

    messageBox.style.backgroundColor =
        type === "success" ? "#d4edda" : "#f8d7da";

    messageBox.style.color =
        type === "success" ? "#155724" : "#721c24";
}
