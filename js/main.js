/**
 * NG EDUCATION - Main Interactive Script
 * Fluid Wave & Layered Modern Tech UI
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initModals();
  initContactForm();
  initMobileNav();
  initCarouselDots();
  initHeroSlider();
});

/* =====================================================================
   1. COURSE TABS (Single vs Combo Courses)
   ===================================================================== */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}


/* =====================================================================
   2. GOOGLE SHEETS LIVE SYNC & MODALS
   ===================================================================== */
const GOOGLE_SHEET_CONFIG = {
  sheetId: '1G5RsCriKg66uLHbZfgj_Arw1CipCHsK4c4gusZ3MMnI',
  sheetUrl: 'https://docs.google.com/spreadsheets/d/1G5RsCriKg66uLHbZfgj_Arw1CipCHsK4c4gusZ3MMnI/edit',
  webAppUrl: 'https://script.google.com/macros/s/AKfycbynk52pRLdzLUfowr7EpVKp5Ro_A3EqdT8TQv9Sj5mm9K7tTyZgb-vpqVmNiPy0HgT-yA/exec'
};

async function logLeadToGoogleSheet(data) {
  if (!GOOGLE_SHEET_CONFIG.webAppUrl) {
    console.log('NG EDUCATION: Lead captured locally. Google Sheet ready at:', GOOGLE_SHEET_CONFIG.sheetUrl, data);
    return;
  }
  try {
    const params = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        params.append(key, data[key]);
      }
    }
    // Include field aliases for complete compatibility with Google Apps Script
    if (data.name) params.append('contactName', data.name);
    if (data.contact) params.append('contactEmail', data.contact);
    if (data.interest) params.append('contactSubject', data.interest);
    if (data.message) params.append('contactMessage', data.message);

    await fetch(GOOGLE_SHEET_CONFIG.webAppUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });
  } catch (err) {
    console.warn('Google Sheet webhook notice:', err);
  }
}

function initModals() {
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const closeBtns = document.querySelectorAll('.modal-close-btn');

  // Trigger buttons
  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-open-modal');
      openModal(modalId);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Modal forms live submission
  const authForms = document.querySelectorAll('.modal-form');
  authForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formType = form.getAttribute('data-form-type') || 'Request';
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Saving...</span>';
      }

      // Collect inputs
      const inputs = form.querySelectorAll('input, select, textarea');
      let nameVal = '';
      let contactVal = '';
      let detailsArr = [];

      inputs.forEach(input => {
        if (!input.value) return;
        const placeholder = input.placeholder || '';
        const label = input.closest('.input-group')?.querySelector('label')?.textContent || '';
        
        if (input.type === 'text' && !nameVal) {
          nameVal = input.value;
        } else if (input.type === 'tel' || input.type === 'email' || placeholder.includes('98765') || placeholder.includes('@')) {
          contactVal = input.value;
        } else {
          detailsArr.push(`${label || 'Field'}: ${input.value}`);
        }
      });

      let sectionKey = 'contact';
      const formTypeLower = formType.toLowerCase();
      if (formTypeLower.includes('teacher') || formTypeLower.includes('hire')) {
        sectionKey = 'teacher';
      } else if (formTypeLower.includes('stem') || formTypeLower.includes('lab')) {
        sectionKey = 'stem_lab';
      } else if (formTypeLower.includes('registration') || formTypeLower.includes('signup')) {
        sectionKey = 'signup';
      }

      const modalPayload = {
        section: sectionKey,
        formType: formType,
        name: nameVal || 'Lead',
        contact: contactVal,
        interest: formType,
        message: detailsArr.join(' | '),
        timestamp: new Date().toLocaleString('en-IN')
      };

      await logLeadToGoogleSheet(modalPayload);

      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
      closeAllModals();
      showToast(`⚡ ${formType} submitted & logged! Welcome to NG EDUCATION.`);
    });
  });
}

function openModal(modalId) {
  closeAllModals();
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  document.body.style.overflow = '';
}

/* =====================================================================
   3. CONTACT FORM & BOOKING
   ===================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';
      }

      const name = document.getElementById('contactName')?.value || 'Friend';
      const contact = document.getElementById('contactEmail')?.value || '';
      const subject = document.getElementById('contactSubject')?.value || 'General Inquiry';
      const message = document.getElementById('contactMessage')?.value || '';

      const leadPayload = {
        section: 'contact',
        formType: 'Contact Form',
        name: name,
        contact: contact,
        interest: subject,
        message: message,
        timestamp: new Date().toLocaleString('en-IN')
      };

      await logLeadToGoogleSheet(leadPayload);

      contactForm.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
      showToast(`Thank you, ${name}! Your message is recorded. Toshit & Arpit will connect with you within 24 hours at 8077718423.`);
    });
  }
}

/* =====================================================================
   4. TOAST NOTIFICATION
   ===================================================================== */
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span style="color: #1D4ED8; font-size: 1.2rem;">✓</span>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* =====================================================================
   5. MOBILE NAVIGATION
   ===================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      toggleBtn.innerHTML = navMenu.classList.contains('open') ? '✕' : '☰';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggleBtn.innerHTML = '☰';
      });
    });
  }
}

/* =====================================================================
   6. CAROUSEL DOTS INTERACTION
   ===================================================================== */
function initCarouselDots() {
  const dots = document.querySelectorAll('.carousel-dots .dot');
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });
}

/* =====================================================================
   7. HERO IMAGE SLIDER (Interactive with Auto-Play & Swipe)
   ===================================================================== */
function initHeroSlider() {
  const slider = document.querySelector('.hero-slider-card');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero-slide');
  const dots = slider.querySelectorAll('.slider-dot');
  const counter = slider.querySelector('#sliderCurrentNum');
  const prevBtn = slider.querySelector('.slider-arrow-prev');
  const nextBtn = slider.querySelector('.slider-arrow-next');

  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const slideInterval = 4000; // 4 seconds

  function showSlide(index) {
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    if (counter) {
      counter.textContent = String(currentIndex + 1).padStart(2, '0');
    }
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      showSlide(currentIndex + 1);
    }, slideInterval);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentIndex + 1);
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentIndex - 1);
      startAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(targetIndex)) {
        showSlide(targetIndex);
        startAutoplay();
      }
    });
  });

  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  // Mobile Touch Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      touchStartX = e.changedTouches[0].screenX;
    }
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }
  }, { passive: true });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        showSlide(currentIndex + 1); // Swipe left -> next
      } else {
        showSlide(currentIndex - 1); // Swipe right -> prev
      }
      startAutoplay();
    }
  }

  // Initialize first slide and start auto-play
  showSlide(0);
  startAutoplay();
}
