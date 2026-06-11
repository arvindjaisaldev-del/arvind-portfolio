/* =====================================================
   ARVIND JAISAL — PORTFOLIO WEBSITE JAVASCRIPT (FIREBASE)
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ===================================================
     01. FIREBASE CONFIGURATION & INITIALIZATION
  ==================================================== */
  const firebaseConfig = {
    apiKey: "AIzaSyAnZNVtdj84rVuEUdg_ec4Uqn908nXHiDg",
    authDomain: "arvind-jaisal.firebaseapp.com",
    databaseURL: "https://arvind-jaisal-default-rtdb.firebaseio.com",
    projectId: "arvind-jaisal",
    storageBucket: "arvind-jaisal.firebasestorage.app",
    messagingSenderId: "1066779350329",
    appId: "1:1066779350329:web:7410192ae56f822314c4e8",
    measurementId: "G-TPERH32G4K"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  /* ===================================================
     02. STICKY HEADER
  ==================================================== */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }, { passive: true });

  /* ===================================================
     03. MOBILE MENU
  ==================================================== */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  navLinks.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });

  /* ===================================================
     04. CONTACT FORM & FIREBASE REALTIME DATABASE
  ==================================================== */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn   = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Basic Validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields.");
        return;
      }

      // Show Loading State
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled    = true;

      /* --- SAVE DATA TO FIREBASE REALTIME DATABASE --- */
      // 'contacts' node mein data push hoga
      const contactRef = database.ref('contacts');
      const newContact = contactRef.push();

      newContact.set({
        name: name,
        email: email,
        subject: subject,
        message: message,
        timestamp: Date.now()
      })
      .then(() => {
        // Success
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled    = false;
        formSuccess.classList.add('visible');
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => formSuccess.classList.remove('visible'), 5000);
      })
      .catch((error) => {
        // Error
        console.error("Firebase Error:", error);
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled    = false;
        alert("Something went wrong. Please try again later.");
      });
    });
  }

  /* ===================================================
     05. SCROLL TO TOP & SMOOTH SCROLL
  ==================================================== */
  const scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) scrollTopBtn.classList.add('visible');
    else scrollTopBtn.classList.remove('visible');
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Smooth Scroll for Nav Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ===================================================
     06. FOOTER YEAR
  ==================================================== */
  document.getElementById('footerYear').textContent = new Date().getFullYear();

});
