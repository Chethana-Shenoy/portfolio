/**
 * CHETHANA G SHENOY — PORTFOLIO JAVASCRIPT LOGIC
 * Features: Typewriter, Filtering, Interactive Lab Simulator, Modals, Toasts, Observers
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 0. THEME SWITCHER (LIGHT / DARK)
  // =========================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const htmlRoot = document.documentElement;

  // Retrieve stored theme or default to 'light'
  const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  htmlRoot.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
      themeIcon.setAttribute('title', 'Switch to Light Theme');
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeIcon.setAttribute('title', 'Switch to Dark Theme');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} theme`, newTheme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon');
    });
  }

  // =========================================================================
  // 1. DATA REPOSITORY FOR PROJECTS (MODAL DETAILS)
  // =========================================================================
  const projectDatabase = {
    datasense: {
      title: "DataSense — Business Analytics & KPI Dashboard",
      tag: "Data Analytics & Visualization",
      image: "assets/datasense.jpg",
      tags: ["Python", "Pandas", "NumPy", "JavaScript", "Chart.js", "Glassmorphic UI"],
      description: "DataSense is an enterprise-grade business intelligence and KPI monitoring platform designed for real-time exploratory data analysis. Built to bridge raw business metrics with visual clarity, it translates complex tabular datasets into interactive charts and automated summary statistics.",
      highlights: [
        "Dynamic multi-metric visualization covering Monthly Revenue, User Acquisition Channels, and Active Campaigns.",
        "Engineered with client-side data filtering and aggregation algorithms for sub-second rendering of 5,000+ data points.",
        "Integrated automated summary statistics: variance, standard deviation, and moving averages for proactive trend forecasting.",
        "Sleek glassmorphism dark mode aesthetic tailored for modern SaaS operations."
      ],
      linkText: "Discuss Project",
      linkUrl: "#contact"
    },
    annovision: {
      title: "AnnoVision — AI Dataset Annotation & Labeling Studio",
      tag: "AI & Computer Vision Tooling",
      image: "assets/annovision.jpg",
      tags: ["Data Annotation", "Computer Vision", "HTML5 Canvas API", "JavaScript", "Python Preprocessing"],
      description: "AnnoVision is a specialized web-based data annotation suite inspired by industry workflows practiced during Chethana's 6-month internship at Robosoft Technologies. It accelerates the preparation of computer vision training datasets with high labeling precision.",
      highlights: [
        "Interactive multi-class bounding box annotation and polygon labeling on high-resolution images.",
        "Real-time class distribution stats, confidence scoring, and dataset split management (Train / Val / Test).",
        "Client-side image augmentation previews: brightness, contrast, rotation, and noise reduction filters.",
        "Built-in verification audit flow ensuring 99%+ label accuracy benchmarks before exporting YOLO/COCO JSON formats."
      ],
      linkText: "Inspect Workflow Highlights",
      linkUrl: "#experience"
    },
    synapse: {
      title: "Synapse — NLP Sentiment & Intelligence Engine",
      tag: "NLP & Sentiment Classification",
      image: "assets/sentiment.jpg",
      tags: ["Python NLP", "Text Classification", "Data Cleaning", "Data Analytics", "Interactive UI"],
      description: "Synapse is an intelligent Natural Language Processing pipeline that digests customer feedback streams, categorizes sentiments (Positive, Neutral, Negative), and extracts high-frequency semantic keywords to inform product strategy.",
      highlights: [
        "Automated text preprocessing pipeline: tokenization, stop-word removal, and lemmatization using Python algorithms.",
        "Visual sentiment polarity meter with real-time scoring and predictive historical trend charting.",
        "Key topic discovery algorithm highlighting emerging customer sentiment themes and pain points.",
        "Interactive web dashboard with real-time feedback ingestion and drill-down analytics."
      ],
      linkText: "Discuss NLP Pipeline",
      linkUrl: "#contact"
    },
    portfoliux: {
      title: "Modern Dark Glassmorphic Portfolio (This Site)",
      tag: "Frontend Web Engineering",
      image: "assets/profile.jpg",
      tags: ["HTML5", "Vanilla CSS3", "ES6+ JavaScript", "Performance 100/100", "Accessibility"],
      description: "A custom-engineered developer showcase website designed with zero heavyweight runtime dependencies to achieve lightning-fast sub-second load times and flawless mobile responsiveness.",
      highlights: [
        "Architected with pure modern CSS custom properties, backdrop-filter glassmorphism, and fluid clamp typography.",
        "High-contrast accessibility, keyboard navigation support, and semantic HTML5 SEO optimization.",
        "Micro-animations including mouse tracking light glow, dual timeline layouts, and animated metrics counters."
      ],
      linkText: "Back to Hero",
      linkUrl: "#top"
    }
  };

  // =========================================================================
  // 2. HERO TYPEWRITER ANIMATION
  // =========================================================================
  const typewriterElement = document.getElementById('typewriterText');
  const phrases = [
    "Data Analytics & Insights",
    "Data Annotation & QA at Robosoft",
    "Modern Frontend Development",
    "Python Pipeline Scripting",
    "MCA in Computer Science"
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function typeEffect() {
    if (!typewriterElement) return;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 45;
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 95;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingDelay = 1800; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingDelay = 350;
    }

    setTimeout(typeEffect, typingDelay);
  }
  typeEffect();

  // =========================================================================
  // 3. MOUSE TRACKING CURSOR GLOW
  // =========================================================================
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.innerWidth > 768) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  // =========================================================================
  // 4. HEADER SCROLL & ACTIVE LINK OBSERVER
  // =========================================================================
  const headerNav = document.getElementById('headerNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      headerNav.classList.add('scrolled');
    } else {
      headerNav.classList.remove('scrolled');
    }

    // ScrollSpy
    let currentSectionId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // =========================================================================
  // 5. MOBILE DRAWER NAVIGATION
  // =========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const closeDrawer = document.getElementById('closeDrawer');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    mobileToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    mobileToggle.setAttribute('aria-expanded', 'false');
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (closeDrawer) closeDrawer.addEventListener('click', closeMobileMenu);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // =========================================================================
  // 6. TOAST NOTIFICATION SYSTEM
  // =========================================================================
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, icon = 'fa-solid fa-circle-check') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 50);

    // Remove toast after 3.8s
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  }

  // =========================================================================
  // 7. COPY EMAIL TO CLIPBOARD
  // =========================================================================
  const copyButtons = [
    document.getElementById('copyEmailQuickBtn'),
    document.getElementById('copyEmailBtn')
  ];

  copyButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = 'chethanagshenoy@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard!`, 'fa-solid fa-clipboard-check');
        }).catch(() => {
          // Fallback
          const tempInput = document.createElement('input');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast(`Copied ${email} to clipboard!`, 'fa-solid fa-clipboard-check');
        });
      });
    }
  });

  // =========================================================================
  // 8. METRIC NUMBERS COUNTER ANIMATION
  // =========================================================================
  const metricNumbers = document.querySelectorAll('.metric-number');
  let metricsAnimated = false;

  const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !metricsAnimated) {
        metricsAnimated = true;
        metricNumbers.forEach(num => {
          const target = parseInt(num.getAttribute('data-target'), 10);
          const duration = 1500;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              num.textContent = target;
              clearInterval(timer);
            } else {
              num.textContent = Math.floor(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsStrip = document.querySelector('.metrics-strip');
  if (metricsStrip) metricsObserver.observe(metricsStrip);

  // =========================================================================
  // 9. SKILLS FILTERING
  // =========================================================================
  const skillTabs = document.querySelectorAll('#skillFilterTabs .filter-tab');
  const skillCards = document.querySelectorAll('.skills-grid .skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // =========================================================================
  // 10. PROJECTS FILTERING
  // =========================================================================
  const projectTabs = document.querySelectorAll('#projectFilterTabs .filter-tab');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      projectTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // =========================================================================
  // 11. PROJECT DETAILS MODAL
  // =========================================================================
  const projectModal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const viewProjectBtns = document.querySelectorAll('.view-project-btn');

  function openProjectModal(projectId) {
    const data = projectDatabase[projectId];
    if (!data || !projectModal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="modal-img-wrap">
        <img src="${data.image}" alt="${data.title}">
      </div>
      <div class="modal-tags">
        ${data.tags.map(t => `<span class="tech-pill">${t}</span>`).join('')}
      </div>
      <h3 class="modal-title" id="modalTitle">${data.title}</h3>
      <p class="modal-desc">${data.description}</p>
      
      <h4 class="modal-highlights-title">Key Architectural & Technical Highlights</h4>
      <ul class="modal-highlights-list">
        ${data.highlights.map(h => `<li><i class="fa-solid fa-circle-check"></i> <span>${h}</span></li>`).join('')}
      </ul>

      <div style="display: flex; gap: 12px; margin-top: 24px; flex-wrap: wrap;">
        <a href="${data.linkUrl}" class="btn btn-primary btn-sm modal-action-btn">
          <span>${data.linkText}</span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>
        <a href="https://www.linkedin.com/in/chethana-g-shenoy-41a27a323/" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
          <i class="fa-brands fa-linkedin"></i>
          <span>Discuss on LinkedIn</span>
        </a>
      </div>
    `;

    // Hook modal link if it points to an anchor
    const actionBtn = modalBody.querySelector('.modal-action-btn');
    if (actionBtn && data.linkUrl.startsWith('#')) {
      actionBtn.addEventListener('click', () => {
        closeModal();
      });
    }

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  viewProjectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pId = btn.getAttribute('data-project');
      openProjectModal(pId);
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // =========================================================================
  // 12. LIVE LOCAL TIME DISPLAY (Udupi, Karnataka, India - IST GMT+5:30)
  // =========================================================================
  const localTimeDisplay = document.getElementById('localTimeDisplay');

  function updateLocalTime() {
    if (!localTimeDisplay) return;
    try {
      const now = new Date();
      // Format to IST
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
      localTimeDisplay.textContent = `Local Time: ${timeString} IST (Udupi, GMT+5:30)`;
    } catch (e) {
      localTimeDisplay.textContent = `Timezone: IST (GMT+5:30)`;
    }
  }
  updateLocalTime();
  setInterval(updateLocalTime, 1000);

  // =========================================================================
  // 14. CONTACT FORM VALIDATION & SUBMISSION
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('senderName');
  const emailInput = document.getElementById('senderEmail');
  const msgInput = document.getElementById('msgContent');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const submitContactBtn = document.getElementById('submitContactBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.textContent = "Please enter your name.";
        isValid = false;
      } else {
        nameError.textContent = "";
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = "Please provide a valid email address.";
        isValid = false;
      } else {
        emailError.textContent = "";
      }

      // Validate Message
      if (!msgInput.value.trim() || msgInput.value.trim().length < 8) {
        messageError.textContent = "Please enter a message (at least 8 characters).";
        isValid = false;
      } else {
        messageError.textContent = "";
      }

      if (isValid) {
        // Simulated sending state
        submitContactBtn.disabled = true;
        submitContactBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

        setTimeout(() => {
          showToast(`Thank you, ${nameInput.value.trim()}! Chethana will get back to you shortly.`, "fa-solid fa-paper-plane");
          contactForm.reset();
          submitContactBtn.disabled = false;
          submitContactBtn.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>`;
        }, 1200);
      }
    });
  }

  // =========================================================================
  // 15. DYNAMIC FOOTER YEAR
  // =========================================================================
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

});
