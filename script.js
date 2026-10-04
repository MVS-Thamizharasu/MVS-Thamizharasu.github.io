/* =========================================================
   MVS THAMIZHARASU PORTFOLIO
   Premium Dark / Glassmorphism / Modern Tech
   ========================================================= */

"use strict";

/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navbar = document.querySelector(".navbar");
    const topBtn = document.getElementById("topBtn");
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".nav-links");
    const menuIcon = document.querySelector(".menu-toggle i");

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    /* =====================================================
       1. SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            const navbarHeight = navbar
                ? navbar.offsetHeight
                : 80;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

            /* Close mobile menu */

            if (mobileMenu) {
                mobileMenu.classList.remove("active");
            }

            if (menuIcon) {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }
        });

    });


    /* =====================================================
       2. SECTION REVEAL ANIMATION
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        sections.forEach(section => {

            section.classList.add("hidden");

            sectionObserver.observe(section);

        });

    } else {

        sections.forEach(section => {

            section.classList.add("show");

        });

    }


    /* =====================================================
       3. ACTIVE NAVIGATION
    ===================================================== */

    const updateActiveNavigation = () => {

        const scrollPosition = window.scrollY + 180;

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                currentSection = section.id;
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    };


    /* =====================================================
       4. SCROLL PROGRESS BAR
    ===================================================== */

    const progressBar = document.createElement("div");

    progressBar.className = "scroll-progress";

    progressBar.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.appendChild(progressBar);


    const updateScrollProgress = () => {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        progressBar.style.width = `${progress}%`;

    };


    /* =====================================================
       5. NAVBAR GLASS EFFECT
    ===================================================== */

    const updateNavbar = () => {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.classList.add("navbar-scrolled");

        } else {

            navbar.classList.remove("navbar-scrolled");

        }

    };


    /* =====================================================
       6. SCROLL TO TOP
    ===================================================== */

    const updateTopButton = () => {

        if (!topBtn) return;

        if (window.scrollY > 500) {

            topBtn.classList.add("show-top");

            topBtn.style.display = "flex";

        } else {

            topBtn.classList.remove("show-top");

            topBtn.style.display = "none";

        }

    };


    if (topBtn) {

        topBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       7. SINGLE SCROLL EVENT
       Better performance than multiple listeners
    ===================================================== */

    let ticking = false;

    const handleScroll = () => {

        if (!ticking) {

            window.requestAnimationFrame(() => {

                updateActiveNavigation();
                updateScrollProgress();
                updateNavbar();
                updateTopButton();

                ticking = false;

            });

            ticking = true;

        }

    };

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );


    /* =====================================================
       8. MOBILE MENU
    ===================================================== */

    if (menuToggle && mobileMenu) {

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mobileMenu.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            if (menuIcon) {

                if (isOpen) {

                    menuIcon.classList.remove(
                        "fa-bars"
                    );

                    menuIcon.classList.add(
                        "fa-xmark"
                    );

                } else {

                    menuIcon.classList.remove(
                        "fa-xmark"
                    );

                    menuIcon.classList.add(
                        "fa-bars"
                    );

                }

            }

        });


        /* Close menu when clicking links */

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                if (menuIcon) {

                    menuIcon.classList.remove(
                        "fa-xmark"
                    );

                    menuIcon.classList.add(
                        "fa-bars"
                    );

                }

            });

        });

    }


    /* =====================================================
       9. ESCAPE KEY - CLOSE MOBILE MENU
    ===================================================== */

    document.addEventListener("keydown", e => {

        if (e.key === "Escape") {

            if (mobileMenu) {
                mobileMenu.classList.remove("active");
            }

            if (menuIcon) {

                menuIcon.classList.remove(
                    "fa-xmark"
                );

                menuIcon.classList.add(
                    "fa-bars"
                );

            }

        }

    });


    /* =====================================================
       10. HERO TYPING EFFECT
    ===================================================== */

    const words = [
        "MBA – AI & Data Science",
        "Data Analytics Enthusiast",
        "Business Intelligence Learner",
        "Python & R Learner",
        "AI & Machine Learning Enthusiast"
    ];

    const typedElement =
        document.getElementById("typed");

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {

        if (!typedElement) return;

        const currentWord =
            words[wordIndex];

        if (isDeleting) {

            charIndex--;

        } else {

            charIndex++;

        }

        typedElement.textContent =
            currentWord.substring(
                0,
                charIndex
            );

        let speed =
            isDeleting
                ? 45
                : 85;

        if (
            !isDeleting &&
            charIndex === currentWord.length
        ) {

            speed = 1600;
            isDeleting = true;

        }

        else if (
            isDeleting &&
            charIndex === 0
        ) {

            isDeleting = false;

            wordIndex =
                (wordIndex + 1) %
                words.length;

            speed = 450;

        }

        setTimeout(
            typeEffect,
            speed
        );

    };

    if (typedElement) {
        typeEffect();
    }


    /* =====================================================
       11. EDUCATION CARD ANIMATION
    ===================================================== */

    const educationCards =
        document.querySelectorAll(".edu-card");

    if (
        educationCards.length &&
        "IntersectionObserver" in window
    ) {

        const educationObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry, index) => {

                            if (
                                entry.isIntersecting
                            ) {

                                setTimeout(
                                    () => {

                                        entry.target.classList.add(
                                            "edu-show"
                                        );

                                    },
                                    index * 160
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.18
                }
            );

        educationCards.forEach(card => {

            educationObserver.observe(card);

        });

    } else {

        educationCards.forEach(card => {

            card.classList.add(
                "edu-show"
            );

        });

    }


    /* =====================================================
       12. PROJECT FILTERING
       Works automatically if filter buttons exist
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(
            "[data-filter]"
        );

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );

    if (
        filterButtons.length &&
        projectCards.length
    ) {

        filterButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const filter =
                        button.dataset.filter;

                    filterButtons.forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });

                    button.classList.add(
                        "active"
                    );

                    projectCards.forEach(card => {

                        const category =
                            card.dataset.category;

                        const shouldShow =
                            filter === "all" ||
                            category === filter;

                        if (shouldShow) {

                            card.style.display =
                                "";

                            requestAnimationFrame(
                                () => {

                                    card.classList.add(
                                        "filter-show"
                                    );

                                }
                            );

                        } else {

                            card.classList.remove(
                                "filter-show"
                            );

                            card.style.display =
                                "none";

                        }

                    });

                }
            );

        });

    }


    /* =====================================================
       13. 3D GLASS CARD EFFECT
       Desktop only
    ===================================================== */

    const interactiveCards =
        document.querySelectorAll(
            ".project-card, .cert-card-3d-inner, .card-3d-inner, .edu-card"
        );

    const supportsHover =
        window.matchMedia(
            "(hover: hover)"
        ).matches;

    if (supportsHover) {

        interactiveCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                e => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        e.clientX -
                        rect.left;

                    const y =
                        e.clientY -
                        rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) /
                            centerY) *
                        -3;

                    const rotateY =
                        ((x - centerX) /
                            centerX) *
                        3;

                    card.style.setProperty(
                        "--mouse-x",
                        `${x}px`
                    );

                    card.style.setProperty(
                        "--mouse-y",
                        `${y}px`
                    );

                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";

                }
            );

        });

    }


    /* =====================================================
       14. DYNAMIC GLASS SHINE
    ===================================================== */

    interactiveCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            e => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX -
                    rect.left;

                const y =
                    e.clientY -
                    rect.top;

                card.style.setProperty(
                    "--shine-x",
                    `${x}px`
                );

                card.style.setProperty(
                    "--shine-y",
                    `${y}px`
                );

            }
        );

    });


    /* =====================================================
       15. DARK / LIGHT THEME SUPPORT
       Requires #themeToggle if you add one
    ===================================================== */

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );

    const savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );

    if (savedTheme === "light") {

        document.body.classList.add(
            "light-theme"
        );

    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "light-theme"
                );

                const theme =
                    document.body.classList.contains(
                        "light-theme"
                    )
                        ? "light"
                        : "dark";

                localStorage.setItem(
                    "portfolio-theme",
                    theme
                );

                themeToggle.setAttribute(
                    "aria-label",
                    theme === "light"
                        ? "Switch to dark mode"
                        : "Switch to light mode"
                );

            }
        );

    }


    /* =====================================================
       16. MOBILE BOTTOM NAVIGATION
       Automatically created from main nav
    ===================================================== */

    const createMobileBottomNav = () => {

        if (
            window.innerWidth > 768 ||
            document.querySelector(
                ".mobile-bottom-nav"
            )
        ) {
            return;
        }

        if (!navLinks.length) return;

        const bottomNav =
            document.createElement("nav");

        bottomNav.className =
            "mobile-bottom-nav";

        bottomNav.setAttribute(
            "aria-label",
            "Mobile navigation"
        );

        const allowedSections = [
            "home",
            "about",
            "education",
            "projects",
            "skills",
            "contact"
        ];

        navLinks.forEach(link => {

            const href =
                link.getAttribute("href");

            if (!href) return;

            const id =
                href.replace("#", "");

            if (
                !allowedSections.includes(id)
            ) {
                return;
            }

            const clone =
                link.cloneNode(true);

            clone.classList.remove(
                "active"
            );

            clone.addEventListener(
                "click",
                () => {

                    bottomNav
                        .querySelectorAll("a")
                        .forEach(item =>
                            item.classList.remove(
                                "active"
                            )
                        );

                    clone.classList.add(
                        "active"
                    );

                }
            );

            bottomNav.appendChild(
                clone
            );

        });

        document.body.appendChild(
            bottomNav
        );

    };


    /* Create only on mobile */

    createMobileBottomNav();


    /* =====================================================
       17. RESPONSIVE BOTTOM NAV CHECK
    ===================================================== */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );

            resizeTimer =
                setTimeout(() => {

                    const existing =
                        document.querySelector(
                            ".mobile-bottom-nav"
                        );

                    if (
                        window.innerWidth <= 768
                    ) {

                        if (!existing) {
                            createMobileBottomNav();
                        }

                    } else {

                        if (existing) {
                            existing.remove();
                        }

                    }

                }, 200);

        }
    );


    /* =====================================================
       18. EXTERNAL LINKS SECURITY
    ===================================================== */

    document
        .querySelectorAll(
            'a[target="_blank"]'
        )
        .forEach(link => {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        });


    /* =====================================================
       19. IMAGE LAZY LOADING
    ===================================================== */

    document
        .querySelectorAll(
            "img:not([loading])"
        )
        .forEach(img => {

            if (
                !img.closest(".hero")
            ) {

                img.setAttribute(
                    "loading",
                    "lazy"
                );

            }

            img.setAttribute(
                "decoding",
                "async"
            );

        });


    /* =====================================================
       20. REDUCE MOTION ACCESSIBILITY
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (reducedMotion.matches) {

        document.documentElement.style
            .scrollBehavior = "auto";

        if (typedElement) {

            typedElement.textContent =
                words[0];

        }

    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateActiveNavigation();
    updateScrollProgress();
    updateNavbar();
    updateTopButton();


    /* =====================================================
       CONSOLE BRANDING
    ===================================================== */

    console.log(
        "%c MVS THAMIZHARASU ",
        "background:#0b1020;color:#60a5fa;font-size:18px;font-weight:700;padding:8px 14px;border-radius:8px;"
    );

    console.log(
        "%c Premium Portfolio • AI • Data Science • Analytics ",
        "color:#a78bfa;font-size:12px;"
    );

});
