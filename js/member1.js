/* =========================================
   FINORA - HOME PAGE JAVASCRIPT
========================================= */


/* =========================================
   1. MOBILE NAVIGATION MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-xmark");
        }

    });


    // Close menu after clicking a navigation link

    const navigationItems = navLinks.querySelectorAll("a");

    navigationItems.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

    });


    // Close menu when clicking outside

    document.addEventListener("click", function (event) {

        if (
            !menuToggle.contains(event.target) &&
            !navLinks.contains(event.target)
        ) {

            navLinks.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        }

    });


    // Close menu using Escape key

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            navLinks.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        }

    });

}


/* =========================================
   2. INSPIRING WOMEN CAROUSEL
========================================= */

const storyCarousel = document.getElementById("storyCarousel");

const prevStory = document.getElementById("prevStory");

const nextStory = document.getElementById("nextStory");


if (storyCarousel && prevStory && nextStory) {

    const storyCards = storyCarousel.querySelectorAll(".story-card");

    let currentStory = 0;

    let autoSlide;


    // Carousel layout

    storyCarousel.style.display = "flex";

    storyCarousel.style.overflow = "hidden";

    storyCarousel.style.scrollBehavior = "smooth";

    storyCarousel.style.gap = "25px";


    storyCards.forEach(function (card) {

        card.style.flex = "0 0 100%";

        card.style.minWidth = "0";

    });


    // Display selected story

    function showStory(index) {

        currentStory = index;

        storyCarousel.scrollTo({

            left: currentStory * (
                storyCarousel.clientWidth + 25
            ),

            behavior: "smooth"

        });

    }


    // Next story

    nextStory.addEventListener("click", function () {

        currentStory++;

        if (currentStory >= storyCards.length) {

            currentStory = 0;

        }

        showStory(currentStory);

        restartAutoSlide();

    });


    // Previous story

    prevStory.addEventListener("click", function () {

        currentStory--;

        if (currentStory < 0) {

            currentStory = storyCards.length - 1;

        }

        showStory(currentStory);

        restartAutoSlide();

    });


    // Automatic carousel movement

    function startAutoSlide() {

        if (storyCards.length > 1) {

            autoSlide = setInterval(function () {

                currentStory++;

                if (currentStory >= storyCards.length) {

                    currentStory = 0;

                }

                showStory(currentStory);

            }, 5000);

        }

    }


    // Restart automatic movement after button click

    function restartAutoSlide() {

        clearInterval(autoSlide);

        startAutoSlide();

    }


    // Pause carousel when mouse enters

    storyCarousel.addEventListener("mouseenter", function () {

        clearInterval(autoSlide);

    });


    // Resume carousel when mouse leaves

    storyCarousel.addEventListener("mouseleave", function () {

        startAutoSlide();

    });


    // Start carousel

    startAutoSlide();


    // Adjust carousel when window is resized

    window.addEventListener("resize", function () {

        showStory(currentStory);

    });

}


/* =========================================
   3. SMOOTH SCROLLING
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {

            event.preventDefault();

            targetElement.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    });

});


/* =========================================
   4. NAVIGATION ACTIVE STATE
========================================= */

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach(function (link) {

    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {

        link.classList.add("active");

    } else {

        link.classList.remove("active");

    }

});


/* =========================================
   5. FOOTER CURRENT YEAR
========================================= */

const footerYear = document.querySelector(".footer-bottom p");

if (footerYear) {

    footerYear.innerHTML =
        "&copy; " + new Date().getFullYear() +
        " Finora. All Rights Reserved.";

}


/* =========================================
   FINORA HOME PAGE INITIALIZED
========================================= */

console.log("FINORA Home Page loaded successfully!");
/* =====================================
   PAGE 2 - FINANCIAL AWARENESS QUIZ
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const quizForm = document.getElementById("financeQuiz");
    const quizResult = document.getElementById("quizResult");
    const scoreText = document.getElementById("scoreText");
    const resultMessage = document.getElementById("resultMessage");

    // Run only on the Financial Awareness page
    if (quizForm) {

        // Correct answers
        const answers = {
            q1: "b",
            q2: "c",
            q3: "a",
            q4: "b",
            q5: "c"
        };

        // Submit quiz
        quizForm.addEventListener("submit", function (event) {

            event.preventDefault();

            let score = 0;
            let total = Object.keys(answers).length;

            // Check answers
            for (let question in answers) {

                const selected = quizForm.querySelector(
                    `input[name="${question}"]:checked`
                );

                if (!selected) {
                    alert("Please answer all questions!");
                    return;
                }

                if (selected.value === answers[question]) {
                    score++;
                }
            }

            // Display result
            quizResult.style.display = "block";
            scoreText.textContent = `Your Score: ${score} / ${total}`;

            if (score === 5) {
                resultMessage.textContent =
                    "Excellent! You have great financial knowledge!";
            }
            else if (score >= 3) {
                resultMessage.textContent =
                    "Good job! Keep learning about financial awareness.";
            }
            else {
                resultMessage.textContent =
                    "Keep practising! You can improve your financial knowledge.";
            }

            // Scroll to result
            quizResult.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });

        // Reset quiz
        quizForm.addEventListener("reset", function () {

            quizResult.style.display = "none";
            scoreText.textContent = "";
            resultMessage.textContent = "";

        });
    }

});
/* =====================================
   PAGE 3 - WOMEN ENTREPRENEURS
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Smooth scrolling for business ideas button
    const exploreButton = document.querySelector(
        '.entrepreneur-hero a[href="#business-ideas"]'
    );

    if (exploreButton) {
        exploreButton.addEventListener("click", function (event) {
            event.preventDefault();

            document.getElementById("business-ideas")
                .scrollIntoView({
                    behavior: "smooth"
                });
        });
    }

    // Business idea card hover interaction
    const businessCards = document.querySelectorAll(
        ".business-idea-card"
    );

    businessCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {
            card.style.transform = "translateY(-8px)";
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "translateY(0)";
        });

    });

    // Inspirational story interaction
    const storyCards = document.querySelectorAll(
        ".entrepreneur-story-card"
    );

    storyCards.forEach(function (card) {

        card.addEventListener("click", function () {

            card.classList.toggle("story-expanded");

        });

    });

});