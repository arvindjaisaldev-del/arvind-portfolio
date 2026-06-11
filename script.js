/* =====================================================
   ARVIND JAISAL — PORTFOLIO WEBSITE JAVASCRIPT
===================================================== */

/* ================= FIREBASE SETUP ================= */

const firebaseConfig = {
  apiKey: "AIzaSyAnZNVtdj84rVuEUdg_ec4Uqn908nXHiDg",
  authDomain: "arvind-jaisal.firebaseapp.com",
  projectId: "arvind-jaisal",
  storageBucket: "arvind-jaisal.firebasestorage.app",
  messagingSenderId: "1066779350329",
  appId: "1:1066779350329:web:7410192ae56f822314c4e8",
  measurementId: "G-TPERH32G4K"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


document.addEventListener("DOMContentLoaded", function () {

  /* ================= STICKY HEADER ================= */

  const header = document.getElementById("header");

  function handleHeaderScroll() {
    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleHeaderScroll, { passive: true });


  /* ================= MOBILE MENU ================= */

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  function openMenu() {
    if (!hamburger || !navLinks) return;

    navLinks.classList.add("open");
    hamburger.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Close Menu");
  }

  function closeMenu() {
    if (!hamburger || !navLinks) return;

    navLinks.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open Menu");
  }

  function toggleMenu() {
    if (!navLinks) return;

    if (navLinks.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }

  if (navLinks) {
    navLinks.addEventListener("click", function (e) {
      if (e.target.classList.contains("nav-link")) {
        closeMenu();
      }
    });
  }

  document.addEventListener("click", function (e) {
    if (!hamburger || !navLinks) return;

    const clickedInsideNav = navLinks.contains(e.target);
    const clickedHamburger = hamburger.contains(e.target);

    if (!clickedInsideNav && !clickedHamburger) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMenu();
    }
  });


  /* ================= ACTIVE NAV LINK ================= */

  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-link");

  function setActiveLink(id) {
    navItems.forEach(function (link) {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + id) {
        link.classList.add("active");
      }
    });
  }

  if (sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }


  /* ================= SMOOTH SCROLL ================= */

  const allNavLinks = document.querySelectorAll('a[href^="#"]');

  allNavLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const targetId = link.getAttribute("href");

      if (targetId && targetId.startsWith("#") && targetId.length > 1) {
        const targetEl = document.querySelector(targetId);

        if (targetEl) {
          e.preventDefault();

          const headerHeight = header ? header.offsetHeight : 68;
          const elementTop = targetEl.getBoundingClientRect().top + window.scrollY;
          const scrollTo = elementTop - headerHeight - 10;

          window.scrollTo({
            top: scrollTo,
            behavior: "smooth"
          });
        }
      }
    });
  });


  /* ================= CONTACT FORM + FIREBASE ================= */

  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");
  const submitBtn = document.getElementById("submitBtn");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");

  function showError(input, errorEl, message) {
    if (!input || !errorEl) return;

    errorEl.textContent = message;
    input.classList.add("input-error");
  }

  function clearError(input, errorEl) {
    if (!input || !errorEl) return;

    errorEl.textContent = "";
    input.classList.remove("input-error");
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function validateField(input, errorEl, type) {
    if (!input || !errorEl) return false;

    const value = input.value.trim();

    if (type === "name") {
      if (!value) {
        showError(input, errorEl, "Please enter your name.");
        return false;
      }

      if (value.length < 2) {
        showError(input, errorEl, "Name must be at least 2 characters.");
        return false;
      }
    }

    if (type === "email") {
      if (!value) {
        showError(input, errorEl, "Please enter your email address.");
        return false;
      }

      if (!isValidEmail(value)) {
        showError(input, errorEl, "Please enter a valid email address.");
        return false;
      }
    }

    if (type === "subject") {
      if (!value) {
        showError(input, errorEl, "Please enter a subject.");
        return false;
      }

      if (value.length < 3) {
        showError(input, errorEl, "Subject must be at least 3 characters.");
        return false;
      }
    }

    if (type === "message") {
      if (!value) {
        showError(input, errorEl, "Please enter your message.");
        return false;
      }

      if (value.length < 10) {
        showError(input, errorEl, "Message must be at least 10 characters.");
        return false;
      }
    }

    clearError(input, errorEl);
    return true;
  }

  if (nameInput) {
    nameInput.addEventListener("input", function () {
      clearError(nameInput, nameError);
    });
  }

  if (emailInput) {
    emailInput.addEventListener("input", function () {
      clearError(emailInput, emailError);
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener("input", function () {
      clearError(subjectInput, subjectError);
    });
  }

  if (messageInput) {
    messageInput.addEventListener("input", function () {
      clearError(messageInput, messageError);
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const validName = validateField(nameInput, nameError, "name");
      const validEmail = validateField(emailInput, emailError, "email");
      const validSubject = validateField(subjectInput, subjectError, "subject");
      const validMessage = validateField(messageInput, messageError, "message");

      if (!validName || !validEmail || !validSubject || !validMessage) {
        return;
      }

      try {
        if (submitBtn) {
          submitBtn.textContent = "Sending...";
          submitBtn.disabled = true;
        }

        await db.collection("contacts").add({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          subject: subjectInput.value.trim(),
          message: messageInput.value.trim(),
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        if (submitBtn) {
          submitBtn.textContent = "Send Message";
          submitBtn.disabled = false;
        }

        if (formSuccess) {
          formSuccess.classList.add("visible");
        }

        contactForm.reset();

        setTimeout(function () {
          if (formSuccess) {
            formSuccess.classList.remove("visible");
          }
        }, 5000);

      } catch (error) {
        console.error("Firebase Error:", error);

        if (submitBtn) {
          submitBtn.textContent = "Send Message";
          submitBtn.disabled = false;
        }

        alert("Message save nahi hua. Firebase rules ya internet check karo.");
      }
    });
  }


  /* ================= SCROLL TO TOP ================= */

  const scrollTopBtn = document.getElementById("scrollTop");

  function handleScrollTopVisibility() {
    if (!scrollTopBtn) return;

    if (window.scrollY > 400) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", handleScrollTopVisibility, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }


  /* ================= FOOTER YEAR ================= */

  const footerYearEl = document.getElementById("footerYear");

  if (footerYearEl) {
    footerYearEl.textContent = new Date().getFullYear();
  }

});