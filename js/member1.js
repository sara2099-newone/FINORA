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
/* =========================================
   FINORA - MEMBER 2 JAVASCRIPT
   Pages: schemes.html, planning.html
   Load AFTER member1.js. The mobile menu,
   smooth scrolling, active nav link and footer
   year are already handled by member1.js.
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       1. SCHEME ENQUIRY FORM (schemes.html)
    ========================================= */

    const schemeForm = document.getElementById("schemeForm");

    if (schemeForm) {

        const fields = {
            name: {
                input: document.getElementById("enqName"),
                error: document.getElementById("nameError")
            },
            email: {
                input: document.getElementById("enqEmail"),
                error: document.getElementById("emailError")
            },
            type: {
                input: document.getElementById("enqType"),
                error: document.getElementById("typeError")
            },
            message: {
                input: document.getElementById("enqMessage"),
                error: document.getElementById("messageError")
            }
        };

        const formSuccess = document.getElementById("formSuccess");
        const successText = document.getElementById("successText");

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        function setError(field, message) {
            field.error.textContent = message;
            field.input.parentElement.classList.add("invalid");
        }

        function clearError(field) {
            field.error.textContent = "";
            field.input.parentElement.classList.remove("invalid");
        }

        // Returns an error message, or "" when the value is valid
        function validate(key) {

            const value = fields[key].input.value.trim();

            if (key === "name") {
                if (value === "") return "Please enter your name.";
                if (value.length < 2) return "Name must be at least 2 characters.";
                if (!/^[A-Za-z\s.'-]+$/.test(value)) return "Name can contain only letters and spaces.";
            }

            if (key === "email") {
                if (value === "") return "Please enter your email address.";
                if (!emailPattern.test(value)) return "Please enter a valid email address.";
            }

            if (key === "type") {
                if (value === "") return "Please select a type of assistance.";
            }

            if (key === "message") {
                if (value === "") return "Please write your message.";
                if (value.length < 10) return "Message must be at least 10 characters.";
            }

            return "";
        }

        // Live validation: check a field when the user leaves it,
        // and clear its error as soon as they fix it
        Object.keys(fields).forEach(function (key) {

            const input = fields[key].input;
            const eventName = key === "type" ? "change" : "blur";

            input.addEventListener(eventName, function () {
                const message = validate(key);
                if (message) {
                    setError(fields[key], message);
                } else {
                    clearError(fields[key]);
                }
            });

            input.addEventListener("input", function () {
                if (input.parentElement.classList.contains("invalid") && !validate(key)) {
                    clearError(fields[key]);
                }
            });

        });

        schemeForm.addEventListener("submit", function (event) {

            event.preventDefault();

            formSuccess.hidden = true;

            let firstInvalid = null;

            Object.keys(fields).forEach(function (key) {

                const message = validate(key);

                if (message) {
                    setError(fields[key], message);
                    if (!firstInvalid) firstInvalid = fields[key].input;
                } else {
                    clearError(fields[key]);
                }

            });

            if (firstInvalid) {
                firstInvalid.focus();
                return;
            }

            const firstName = fields.name.input.value.trim().split(" ")[0];

            successText.textContent =
                "Thank you, " + firstName + "! Your enquiry has been " +
                "submitted successfully. We will get back to you at " +
                fields.email.input.value.trim() + " soon.";

            formSuccess.hidden = false;

            schemeForm.reset();

            formSuccess.scrollIntoView({ behavior: "smooth", block: "center" });

        });

        schemeForm.addEventListener("reset", function () {

            Object.keys(fields).forEach(function (key) {
                clearError(fields[key]);
            });

            formSuccess.hidden = true;

        });
    }


    /* =========================================
       2. PLANNING CHECKLIST (planning.html)
    ========================================= */

    const checklist = document.getElementById("planChecklist");

    if (checklist) {

        const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');
        const checkCount = document.getElementById("checkCount");
        const checkPercent = document.getElementById("checkPercent");
        const progressFill = document.getElementById("progressFill");
        const checklistDone = document.getElementById("checklistDone");

        function updateChecklist() {

            const total = checkboxes.length;
            let done = 0;

            checkboxes.forEach(function (box) {

                const item = box.closest(".check-item");

                if (box.checked) {
                    done++;
                    item.classList.add("checked");
                } else {
                    item.classList.remove("checked");
                }

            });

            const percent = Math.round((done / total) * 100);

            checkCount.textContent = done + " of " + total + " completed";
            checkPercent.textContent = percent + "%";
            progressFill.style.width = percent + "%";
            checklistDone.hidden = done !== total;

        }

        checkboxes.forEach(function (box) {
            box.addEventListener("change", updateChecklist);
        });

        updateChecklist();
    }


    /* =========================================
       3. SAVINGS GOAL ESTIMATOR (planning.html)
    ========================================= */

    const savingsForm = document.getElementById("savingsForm");

    if (savingsForm) {

        const goalInput = document.getElementById("goalAmount");
        const monthlyInput = document.getElementById("monthlySaving");
        const goalError = document.getElementById("goalError");
        const monthlyError = document.getElementById("monthlyError");
        const resultBox = document.getElementById("estimatorResult");
        const resultMain = document.getElementById("resultMain");
        const resultSub = document.getElementById("resultSub");

        const defaultMessage = "Enter your goal and monthly saving to see the result.";

        // Indian number format, e.g. 1,00,000
        function formatRupees(amount) {
            return "\u20B9" + Number(amount).toLocaleString("en-IN");
        }

        function plural(count, word) {
            return count + " " + word + (count === 1 ? "" : "s");
        }

        function showError(input, errorEl, message) {
            errorEl.textContent = message;
            input.parentElement.classList.add("invalid");
        }

        function clearError(input, errorEl) {
            errorEl.textContent = "";
            input.parentElement.classList.remove("invalid");
        }

        function resetResult() {
            resultBox.classList.remove("has-result");
            resultMain.textContent = defaultMessage;
            resultSub.textContent = "";
        }

        [goalInput, monthlyInput].forEach(function (input) {
            input.addEventListener("input", function () {
                clearError(goalInput, goalError);
                clearError(monthlyInput, monthlyError);
            });
        });

        savingsForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const goal = parseFloat(goalInput.value);
            const monthly = parseFloat(monthlyInput.value);

            let valid = true;

            clearError(goalInput, goalError);
            clearError(monthlyInput, monthlyError);

            if (isNaN(goal) || goal <= 0) {
                showError(goalInput, goalError, "Please enter a goal amount greater than 0.");
                valid = false;
            }

            if (isNaN(monthly) || monthly <= 0) {
                showError(monthlyInput, monthlyError, "Please enter a monthly saving greater than 0.");
                valid = false;
            }

            if (!valid) {
                resetResult();
                return;
            }

            const totalMonths = Math.ceil(goal / monthly);
            const years = Math.floor(totalMonths / 12);
            const months = totalMonths % 12;

            let timeText;

            if (years === 0) {
                timeText = plural(months, "month");
            } else if (months === 0) {
                timeText = plural(years, "year");
            } else {
                timeText = plural(years, "year") + " " + plural(months, "month");
            }

            resultBox.classList.add("has-result");
            resultMain.textContent = timeText;

            let sub = "Saving " + formatRupees(monthly) + " every month, you can reach " +
                      formatRupees(goal) + " in about " + plural(totalMonths, "month") + ".";

            if (monthly >= goal) {
                sub = "Your monthly saving already covers this goal in a single month!";
            }

            resultSub.textContent = sub;

        });

        savingsForm.addEventListener("reset", function () {
            clearError(goalInput, goalError);
            clearError(monthlyInput, monthlyError);
            resetResult();
        });
    }

});
