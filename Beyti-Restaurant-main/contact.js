
// ==========================================
// 1. SELECT HTML ELEMENTS
// ==========================================

const menuCheckbox = document.querySelector("#menu");
const navLinks = document.querySelector(".nav-links");

const reservationForm = document.querySelector(
    "#Contact_Us .form form"
);

const newsletterForm = document.querySelector(
    "#Quick_Links form"
);


// ==========================================
// 2. MOBILE NAVIGATION
// ==========================================

if (navLinks && menuCheckbox) {

    navLinks.addEventListener("click", function(event) {

        const clickedLink = event.target.closest("a");

        if (clickedLink) {
            menuCheckbox.checked = false;
        }

    });

}


// ==========================================
// 3. SET MINIMUM RESERVATION DATE
// ==========================================

if (reservationForm) {

    const dateInput = reservationForm.querySelector(
        'input[type="date"]'
    );

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();

        const month = String(today.getMonth() + 1).padStart(2, "0");

        const day = String(today.getDate()).padStart(2, "0");

        const todayDate = `${year}-${month}-${day}`;

        dateInput.min = todayDate;
    }

}


// ==========================================
// 4. RESERVATION FORM VALIDATION
// ==========================================

if (reservationForm) {

    reservationForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const inputs = reservationForm.querySelectorAll("input");

        const name = inputs[0].value.trim();

        const email = inputs[1].value.trim();

        const date = inputs[2].value;

        const time = inputs[3].value;

        const guests = Number(inputs[4].value);

        const phone = inputs[5].value.trim();

        const message = reservationForm.querySelector("textarea").value.trim();


        // Check empty fields

        if (
            name === "" ||
            email === "" ||
            date === "" ||
            time === "" ||
            inputs[4].value === "" ||
            phone === ""
        ) {

            alert("Please complete all required fields.");

            return;
        }


        // Check name

        if (name.length < 2) {

            alert("Please enter a valid name.");

            return;
        }


        // Check email

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            return;
        }


        // Check reservation date

        const selectedDate = new Date(date + "T00:00:00");

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {

            alert("Please select today or a future date.");

            return;
        }


        // Check guests

        if (!Number.isInteger(guests) || guests < 1 || guests > 50) {

            alert("The number of guests must be between 1 and 50.");

            return;
        }


        // Check phone number

        const phoneDigits = phone.replace(/\D/g, "");

        if (phoneDigits.length < 7 || phoneDigits.length > 15) {

            alert("Please enter a valid phone number.");

            return;
        }


        // Create reservation object

        const reservation = {

            name: name,

            email: email,

            date: date,

            time: time,

            guests: guests,

            phone: phone,

            message: message

        };


        // Display reservation information in console

        console.log("Reservation Details:");

        console.log(reservation);


        // Show result message

        showMessage(
            reservationForm,
            "Your reservation request has been checked successfully. Please contact the restaurant to confirm your booking.",
            "success"
        );


        reservationForm.reset();

        // Set minimum date again after reset

        const dateInput = reservationForm.querySelector(
            'input[type="date"]'
        );

        if (dateInput) {

            const now = new Date();

            dateInput.min =
                now.getFullYear() + "-" +
                String(now.getMonth() + 1).padStart(2, "0") + "-" +
                String(now.getDate()).padStart(2, "0");
        }

    });

}


// ==========================================
// 5. REUSABLE MESSAGE FUNCTION
// ==========================================

function showMessage(form, text, type) {

    let messageBox = form.querySelector(".js-message");

    if (!messageBox) {

        messageBox = document.createElement("p");

        messageBox.className = "js-message";

        form.appendChild(messageBox);
    }

    messageBox.textContent = text;

    messageBox.style.cssText = `
        padding: 12px;
        margin-top: 15px;
        border-radius: 6px;
        background: ${type === "success" ? "#e1f5e5" : "#ffe5e5"};
        color: ${type === "success" ? "#176b2c" : "#a00000"};
        font-size: 14px;
    `;

}


// ==========================================
// 6. ACTIVATE PHONE AND EMAIL LINKS
// ==========================================

const phoneNumber = "+902126632990";

const emailAddress = "rezervasyon@beyti.com";

document.querySelectorAll(
    '#Our_Location a, #Contact_Us a, #Quick_Links a'
).forEach(function(link) {

    const text = link.textContent.trim();

    if (text.includes("+90 212 663 29 90")) {

        link.href = "tel:" + phoneNumber;
    }

    if (text.includes("rezervasyon@beyti.com")) {

        link.href = "mailto:" + emailAddress;
    }

});


// ==========================================
// 7. GOOGLE MAPS DIRECTIONS
// ==========================================

const restaurantAddress =
    "Orman Sk. Florya, Senlikkoy, Bakirkoy, Istanbul, Turkey";

const mapURL =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(restaurantAddress);


const mapLinks = document.querySelectorAll(
    "#Our_Location a"
);

mapLinks.forEach(function(link) {

    const linkText = link.textContent.trim();

    if (
        linkText.includes("Get Directions") ||
        linkText.includes("View on Google Maps")
    ) {

        link.href = mapURL;

        link.target = "_blank";

        link.rel = "noopener noreferrer";
    }

});


// ==========================================
// 8. PRIVATE EVENTS EMAIL LINK
// ==========================================

const privateEventLink = document.querySelector(
    "#Private_Events .a_link a"
);

if (privateEventLink) {

    privateEventLink.href =
        "mailto:rezervasyon@beyti.com?subject=" +
        encodeURIComponent("Private Event Inquiry");

}


// ==========================================
// 9. NEWSLETTER FORM VALIDATION
// ==========================================

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const emailInput = newsletterForm.querySelector(
            'input[type="email"]'
        );

        const email = emailInput.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (email === "") {

            alert("Please enter your email address.");

            return;
        }


        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            return;
        }


        alert(
            "Your email is valid! Newsletter registration is not connected to a server yet."
        );

        newsletterForm.reset();

    });

}


// ==========================================
// 10. FAQ SECTION
// ==========================================

const faqItems = document.querySelectorAll(
    "#Ask_Questions details"
);

faqItems.forEach(function(item) {

    item.addEventListener("toggle", function() {

        if (item.open) {

            faqItems.forEach(function(otherItem) {

                if (otherItem !== item) {

                    otherItem.open = false;
                }

            });

        }

    });

});


// ==========================================
// 11. WELCOME MESSAGE
// ==========================================

console.log("Beyti Contact Page JavaScript is working!");
