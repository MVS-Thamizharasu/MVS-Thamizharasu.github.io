// ==========================
// Smooth Scroll Navigation
// ==========================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// ==========================
// Fade Animation (Intersection Observer)
// ==========================
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

sections.forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
});

// ==========================
// Active Navbar Link on Scroll
// ==========================
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.scrollY || window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollPosition >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// ==========================
// Navbar Background Blur & Scroll To Top Visibility
// ==========================
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    const scrollPosition = window.scrollY;

    // Navbar Background Logic
    if (scrollPosition > 50) {
        navbar.style.background = "rgba(11, 12, 16, 0.95)";
    } else {
        navbar.style.background = "rgba(15, 15, 25, 0.65)";
    }

    // Scroll to Top Button Logic
    if (topBtn) {
        if (scrollPosition > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    }
});

// ==========================
// Scroll To Top Click Action
// ==========================
if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ==========================
// Typing Effect (Hero Section)
// ==========================
const text = "MBA in Artificial Intelligence & Data Science";
const typing = document.getElementById("typing-text");

if (typing) {
    typing.textContent = "";
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typing.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Page load அனிமேஷன் முடிந்த பிறகு டைப்பிங் துவங்க சிறிய டிலே (Delay)
    setTimeout(typeWriter, 400); 
}

// ==========================
// Console Message
// ==========================
console.log("Welcome to Thamizharasu Portfolio 🚀");

// ==========================
// Mobile Menu Toggle
// ==========================

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".nav-links");
const menuIcon = document.querySelector(".menu-toggle i");

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

        if (mobileMenu.classList.contains("active")) {
            menuIcon.classList.replace("fa-bars", "fa-xmark");
        } else {
            menuIcon.classList.replace("fa-xmark", "fa-bars");
        }

    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");
            menuIcon.classList.replace("fa-xmark", "fa-bars");

        });
    });

}
