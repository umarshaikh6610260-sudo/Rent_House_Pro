document.addEventListener("DOMContentLoaded", () => {

    const stars = document.querySelectorAll(
        "#starSelector button"
    );

    const ratingValue =
        document.getElementById("ratingValue");

    const ratingText =
        document.getElementById("ratingText");

    const reviewForm =
        document.getElementById("reviewForm");

    const review =
        document.getElementById("review");

    const charCount =
        document.getElementById("charCount");

    const reviewFilter =
        document.getElementById("reviewFilter");

    const reviews =
        document.querySelectorAll(".review-card");


    /* ================= STAR RATING ================= */

    stars.forEach((star, index) => {

        star.addEventListener("click", () => {

            const selectedRating =
                Number(star.dataset.rating);

            ratingValue.value = selectedRating;

            stars.forEach((item, itemIndex) => {

                item.classList.toggle(
                    "selected",
                    itemIndex < selectedRating
                );

            });


            const messages = {
                1: "Poor experience",
                2: "Could be better",
                3: "It was okay",
                4: "Good experience",
                5: "Excellent experience"
            };

            ratingText.textContent =
                messages[selectedRating];

        });

    });


    /* ================= CHARACTER COUNT ================= */

    if (review && charCount) {

        review.addEventListener("input", () => {

            charCount.textContent =
                review.value.length;

        });

    }


    /* ================= REVIEW FILTER ================= */

    if (reviewFilter) {

        reviewFilter.addEventListener("change", () => {

            const selected =
                reviewFilter.value;

            reviews.forEach(card => {

                const cardRating =
                    card.dataset.rating;

                if (
                    selected === "all" ||
                    selected === cardRating
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }


    /* ================= FORM SUBMIT ================= */

    if (reviewForm) {

        reviewForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const selectedRating =
                Number(ratingValue.value);

            const name =
                document.getElementById("name").value.trim();

            const role =
                document.getElementById("role").value;

            const reviewText =
                review.value.trim();


            if (selectedRating === 0) {

                showToast(
                    "Please select a rating first."
                );

                return;

            }


            if (!name || !role || !reviewText) {

                showToast(
                    "Please complete all fields."
                );

                return;

            }


            showToast(
                "Thank you! Your review has been submitted."
            );

            reviewForm.reset();

            ratingValue.value = 0;

            stars.forEach(star => {
                star.classList.remove("selected");
            });

            ratingText.textContent =
                "Select a rating";

            charCount.textContent = "0";

        });

    }


    /* ================= TOAST ================= */

    function showToast(message) {

        let toast =
            document.querySelector(".rating-toast");

        if (!toast) {

            toast =
                document.createElement("div");

            toast.className =
                "rating-toast";

            document.body.appendChild(toast);

        }

        toast.textContent = message;

        toast.classList.add("show");

        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

    }

});