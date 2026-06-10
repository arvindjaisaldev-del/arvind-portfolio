/* =====================================================
   ARVIND JAISAL — PORTFOLIO WEBSITE JAVASCRIPT
   =====================================================
   TABLE OF CONTENTS:
   01. DOM Ready — Wait for page to load
   02. Sticky Header — Add shadow when user scrolls
   03. Mobile Menu — Open / Close hamburger menu
   04. Active Nav Link — Highlight section in navbar
   05. Smooth Scroll — Smooth navigation to sections
   06. Contact Form Validation — Check form fields
   07. Scroll To Top Button — Show/hide & scroll up
   08. Footer Year — Auto-update copyright year
   09. Notes for Beginners — How to customize
===================================================== */


/* =====================================================
   01. DOM READY — All code runs after page loads
===================================================== */
document.addEventListener('DOMContentLoaded', function () {


  /* ===================================================
     02. STICKY HEADER — Adds shadow when scrolled
     Change the scroll threshold (50) if needed
  ==================================================== */
  const header = document.getElementById('header');

  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });


  /* ===================================================
     03. MOBILE MENU — Open / Close hamburger menu
     This handles opening, closing, and outside clicks
  ==================================================== */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  // Toggle menu open or closed
  function toggleMenu() {
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    navLinks.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close Menu');
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open Menu');
  }

  // Hamburger click
  hamburger.addEventListener('click', toggleMenu);

  // Close menu when a link is clicked
  navLinks.addEventListener('click', function (e) {
    if (e.target.classList.contains('nav-link')) {
      closeMenu();
    }
  });

  // Close menu when clicking outside nav area
  document.addEventListener('click', function (e) {
    const clickedInsideNav = navLinks.contains(e.target);
    const clickedHamburger = hamburger.contains(e.target);
    if (!clickedInsideNav && !clickedHamburger) {
      closeMenu();
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });


  /* ===================================================
     04. ACTIVE NAV LINK — Highlight current section
     Uses IntersectionObserver for smooth, efficient tracking
  ==================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function setActiveLink(id) {
    navItems.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + id) {
        link.classList.add('active');
      }
    });
  }

  // Watch which section is in view
  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });


  /* ===================================================
     05. SMOOTH SCROLL — Navigate smoothly to sections
     Accounts for the sticky header height
  ==================================================== */
  const allNavLinks = document.querySelectorAll('a[href^="#"]');

  allNavLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = link.getAttribute('href');

      if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        const targetEl = document.querySelector(targetId);

        if (targetEl) {
          e.preventDefault();

          const headerHeight = header ? header.offsetHeight : 68;
          const elementTop   = targetEl.getBoundingClientRect().top + window.scrollY;
          const scrollTo     = elementTop - headerHeight - 10;

          window.scrollTo({
            top: scrollTo,
            behavior: 'smooth'
          });
        }
      }
    });
  });


  /* ===================================================
     06. CONTACT FORM VALIDATION
     Validates all fields before "submitting"
     
     To make the form actually send emails, integrate
     EmailJS (free) — see instructions at the bottom
  ==================================================== */
  const contactForm  = document.getElementById('contactForm');
  const formSuccess  = document.getElementById('formSuccess');
  const submitBtn    = document.getElementById('submitBtn');

  // Form input fields
  const nameInput    = document.getElementById('name');
  const emailInput   = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  // Error message spans
  const nameError    = document.getElementById('nameError');
  const emailError   = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  /* --- Show error --- */
  function showError(input, errorEl, message) {
    errorEl.textContent  = message;
    input.classList.add('input-error');
  }

  /* --- Clear error --- */
  function clearError(input, errorEl) {
    errorEl.textContent = '';
    input.classList.remove('input-error');
  }

  /* --- Check if email is valid --- */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  /* --- Validate a single field --- */
  function validateField(input, errorEl, type) {
    const value = input.value.trim();

    if (type === 'name') {
      if (!value) {
        showError(input, errorEl, 'Please enter your name.');
        return false;
      }
      if (value.length < 2) {
        showError(input, errorEl, 'Name must be at least 2 characters.');
        return false;
      }
    }

    if (type === 'email') {
      if (!value) {
        showError(input, errorEl, 'Please enter your email address.');
        return false;
      }
      if (!isValidEmail(value)) {
        showError(input, errorEl, 'Please enter a valid email address.');
        return false;
      }
    }

    if (type === 'subject') {
      if (!value) {
        showError(input, errorEl, 'Please enter a subject.');
        return false;
      }
      if (value.length < 3) {
        showError(input, errorEl, 'Subject must be at least 3 characters.');
        return false;
      }
    }

    if (type === 'message') {
      if (!value) {
        showError(input, errorEl, 'Please enter your message.');
        return false;
      }
      if (value.length < 10) {
        showError(input, errorEl, 'Message must be at least 10 characters.');
        return false;
      }
    }

    clearError(input, errorEl);
    return true;
  }

  /* --- Clear errors as user types (real-time feedback) --- */
  if (nameInput)    nameInput.addEventListener('input',    function () { clearError(nameInput,    nameError);    });
  if (emailInput)   emailInput.addEventListener('input',   function () { clearError(emailInput,   emailError);   });
  if (subjectInput) subjectInput.addEventListener('input', function () { clearError(subjectInput, subjectError); });
  if (messageInput) messageInput.addEventListener('input', function () { clearError(messageInput, messageError); });

  /* --- Handle form submit --- */
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Validate all fields
      const validName    = validateField(nameInput,    nameError,    'name');
      const validEmail   = validateField(emailInput,   emailError,   'email');
      const validSubject = validateField(subjectInput, subjectError, 'subject');
      const validMessage = validateField(messageInput, messageError, 'message');

      if (!validName || !validEmail || !validSubject || !validMessage) {
        return;
      }

      /* ==================================================
         FORM SUBMISSION
         
         Right now this simulates sending.
         To actually receive emails, integrate EmailJS:
         1. Go to https://www.emailjs.com and create account
         2. Add their script in index.html
         3. Replace the setTimeout below with emailjs.send()
      ================================================== */

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled    = true;

      // Simulate sending (replace with real API call)
      setTimeout(function () {
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled    = false;
        formSuccess.classList.add('visible');
        contactForm.reset();

        // Hide success after 5 seconds
        setTimeout(function () {
          formSuccess.classList.remove('visible');
        }, 5000);

      }, 1200);

    });
  }


  /* ===================================================
     07. SCROLL TO TOP BUTTON
     Shows after user scrolls 400px down
     Change the threshold (400) if needed
  ==================================================== */
  const scrollTopBtn = document.getElementById('scrollTop');

  function handleScrollTopVisibility() {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScrollTopVisibility, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* ===================================================
     08. FOOTER YEAR — Auto-update copyright year
     No need to manually update every year
  ==================================================== */
  const footerYearEl = document.getElementById('footerYear');
  if (footerYearEl) {
    footerYearEl.textContent = new Date().getFullYear();
  }


  /* ===================================================
     09. NOTES FOR BEGINNERS — How to customize
     ---------------------------------------------------
     
     PROFILE PHOTO:
     - Add "profile.jpg" in the same folder as index.html
     - Or change src="profile.jpg" in index.html to any URL
     - Recommended size: 400x400px or 500x500px (square)
     
     RESUME:
     - Add "resume.pdf" in the same folder
     - Or update href="resume.pdf" in index.html
     
     PROJECT IMAGES:
     - Add project1.jpg, project2.jpg, project3.jpg, project4.jpg
     - They will automatically replace the placeholder icons
     
     COLORS:
     - Open style.css
     - Find ":root {" at the top
     - Change --color-primary to any color you like
     - Example: --color-primary: #e11d48; (red theme)
     
     MAKE FORM SEND REAL EMAILS:
     - Go to https://www.emailjs.com
     - Create a free account
     - Add their script tag to index.html (before </body>)
     - In script.js, replace the setTimeout block with:
       
       emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
         from_name:  nameInput.value,
         reply_to:   emailInput.value,
         subject:    subjectInput.value,
         message:    messageInput.value
       }).then(function() {
         submitBtn.textContent = 'Send Message';
         submitBtn.disabled = false;
         formSuccess.classList.add('visible');
         contactForm.reset();
       }).catch(function(error) {
         console.error('Error:', error);
         submitBtn.textContent = 'Send Message';
         submitBtn.disabled = false;
         alert('Failed to send message. Please try again.');
       });
     
     ADDING VIDEO / AUDIO:
     - To add a background video, add this to any section:
       <video autoplay muted loop playsinline class="bg-video">
         <source src="your-video.mp4" type="video/mp4">
       </video>
     - Add CSS to position it behind content
     
     DEPLOYING YOUR WEBSITE:
     - Push to GitHub, then connect to Vercel or Netlify
     - Or upload directly to any web host

  ==================================================== */

});  // End DOMContentLoaded
