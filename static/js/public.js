// /* =========================================
//    MERIDIAN PUBLIC WEBSITE
// ========================================= */


// /* ================= MOBILE MENU ================= */

// const menuButton =
//     document.getElementById("mobileMenuBtn");

// const navigation =
//     document.getElementById("publicNav");


// if (menuButton && navigation) {

//     menuButton.addEventListener("click", function () {

//         navigation.classList.toggle("open");

//         if (navigation.classList.contains("open")) {

//             menuButton.textContent = "✕";

//         } else {

//             menuButton.textContent = "☰";

//         }

//     });

// }


// /* ================= CLOSE MOBILE MENU ================= */

// const navLinks =
//     document.querySelectorAll(".public-nav a");


// navLinks.forEach(function (link) {

//     link.addEventListener("click", function () {

//         if (navigation) {

//             navigation.classList.remove("open");

//         }

//         if (menuButton) {

//             menuButton.textContent = "☰";

//         }

//     });

// });


// /* ================= SCROLL REVEAL ================= */

// const revealElements =
//     document.querySelectorAll(
//         ".service-row, .property-card, .why-point, .value-item, .service-large"
//     );


// if ("IntersectionObserver" in window) {

//     const revealObserver =
//         new IntersectionObserver(
//             function (entries) {

//                 entries.forEach(function (entry) {

//                     if (entry.isIntersecting) {

//                         entry.target.style.opacity = "1";

//                         entry.target.style.transform =
//                             "translateY(0)";

//                         revealObserver.unobserve(
//                             entry.target
//                         );

//                     }

//                 });

//             },
//             {
//                 threshold: 0.12
//             }
//         );


//     revealElements.forEach(function (element) {

//         element.style.opacity = "0";

//         element.style.transform =
//             "translateY(18px)";

//         element.style.transition =
//             "opacity .65s ease, transform .65s ease";

//         revealObserver.observe(element);

//     });

// }


// /* ================= CONTACT FORM ================= */

// const contactForm =
//     document.getElementById("contactForm");


// if (contactForm) {

//     contactForm.addEventListener(
//         "submit",
//         function (event) {

//             event.preventDefault();

//             const button =
//                 contactForm.querySelector(
//                     ".contact-submit"
//                 );


//             if (!button) {
//                 return;
//             }


//             const originalText =
//                 button.querySelector("span");


//             button.disabled = true;

//             originalText.textContent =
//                 "Sending...";


//             setTimeout(function () {

//                 originalText.textContent =
//                     "Inquiry Sent ✓";


//                 contactForm.reset();


//                 setTimeout(function () {

//                     originalText.textContent =
//                         "Send Inquiry";

//                     button.disabled = false;

//                 }, 1800);


//             }, 900);

//         }
//     );

// }


// /* ================= HEADER SHADOW ================= */

// window.addEventListener("scroll", function () {

//     const header =
//         document.querySelector(".public-header");


//     if (!header) {
//         return;
//     }


//     if (window.scrollY > 20) {

//         header.style.boxShadow =
//             "0 5px 20px rgba(0,0,0,.05)";

//     } else {

//         header.style.boxShadow =
//             "none";

//     }

// });

// /* =========================================================
//    NAVBAR PROPERTY SEARCH
// ========================================================= */

// document.addEventListener("DOMContentLoaded", function () {

//     const searchInput = document.getElementById("propertySearch");
//     const searchBtn = document.getElementById("searchBtn");
//     const searchResults = document.getElementById("searchResults");

//     if (!searchInput || !searchBtn) {
//         return;
//     }


//     /* ================= SEARCH ================= */

//     function performSearch() {

//         const query = searchInput.value.trim();

//         if (!query) {

//             searchInput.focus();

//             return;
//         }


//         /* Send search to properties page */

//         window.location.href =
//             "public-properties.html?search=" +
//             encodeURIComponent(query);

//     }


//     /* ================= BUTTON ================= */

//     searchBtn.addEventListener("click", function () {

//         performSearch();

//     });


//     /* ================= ENTER KEY ================= */

//     searchInput.addEventListener("keydown", function (event) {

//         if (event.key === "Enter") {

//             event.preventDefault();

//             performSearch();

//         }

//     });


//     /* ================= INPUT EFFECT ================= */

//     searchInput.addEventListener("input", function () {

//         const value = searchInput.value.trim();

//         if (value.length > 0) {

//             searchResults.classList.add("show");

//             searchResults.innerHTML = `
//                 <div class="search-no-result">
//                     Press Enter to search for "<strong>${value}</strong>"
//                 </div>
//             `;

//         } else {

//             searchResults.classList.remove("show");

//             searchResults.innerHTML = "";

//         }

//     });


//     /* ================= CLICK OUTSIDE ================= */

//     document.addEventListener("click", function (event) {

//         if (!event.target.closest(".nav-search")) {

//             searchResults.classList.remove("show");

//         }

//     });

// });