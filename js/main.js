/**
 * NG EDUCATION - Main Interactive Script
 * Fluid Wave & Layered Modern Tech UI
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initModals();
  initContactForm();
  initMobileNav();
  initHeroSlider();
  initTrainerFilters();
  initCountUp();
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
  webAppUrl: 'https://script.google.com/macros/s/AKfycbzE4aQeBXIGj3P7IqP6vzPeZOC4XERF2_UWdhzk-JyXHSn2ykwKcaYkulTtffYwBpwaHQ/exec'
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

      const courseVal = trigger.getAttribute('data-course');
      if (courseVal && modalId === 'modalEnroll') {
        const select = document.querySelector('#modalEnroll select');
        if (select) {
          for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value === courseVal) {
              select.selectedIndex = i;
              break;
            }
          }
        }
      }

      const trainerVal = trigger.getAttribute('data-trainer');
      if (trainerVal && modalId === 'modalBookTrainer') {
        const select = document.querySelector('#modalBookTrainer select[name="trainer"]');
        if (select) {
          for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value.toLowerCase() === trainerVal.toLowerCase()) {
              select.selectedIndex = i;
              break;
            }
          }
        }
      }
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
      showThankYouPopup(nameVal);
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

let thankYouTimer = null;

function closeAllModals() {
  if (thankYouTimer) {
    clearTimeout(thankYouTimer);
    thankYouTimer = null;
  }
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  document.body.style.overflow = '';
}

// Expose globally for inline onclick handlers
window.openModal = openModal;
window.closeAllModals = closeAllModals;

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
      showThankYouPopup(name);
    });
  }
}

/* =====================================================================
   4. THANK YOU POPUP (2 Seconds Auto-Close Modal)
   ===================================================================== */
function showThankYouPopup(customName) {
  closeAllModals();
  const modal = document.getElementById('modalThankYou');
  if (!modal) return;

  const desc = modal.querySelector('.thankyou-desc');
  if (desc) {
    if (customName && customName !== 'Lead' && customName !== 'Friend') {
      desc.textContent = `Thank you, ${customName}! Your message is recorded. Our Expert will connect with you within 24 Hours.`;
    } else {
      desc.textContent = 'Thank you! Your message is recorded. Our Expert will connect with you within 24 Hours.';
    }
  }

  // Trigger reflow to restart countdown progress bar animation
  const fill = modal.querySelector('.thankyou-progress-fill');
  if (fill) {
    fill.style.animation = 'none';
    void fill.offsetWidth;
    fill.style.animation = 'progressCountdown 2.5s linear forwards';
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  thankYouTimer = setTimeout(() => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    thankYouTimer = null;
  }, 2500);
}

/* =====================================================================
   5. TOAST NOTIFICATION (Auxiliary Notice)
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
    const closeDrawer = () => {
      navMenu.classList.remove('open');
      toggleBtn.innerHTML = '☰';
      document.body.style.overflow = '';
    };

    const toggleDrawer = () => {
      const isOpen = navMenu.classList.toggle('open');
      toggleBtn.innerHTML = isOpen ? '✕' : '☰';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDrawer();
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    // Close when tapping outside the menu
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        closeDrawer();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeDrawer();
      }
    });
  }
}

/* (Dots are synced automatically inside initHeroSlider) */

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
  const textColDots = document.querySelectorAll('.carousel-dots .dot');

  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const slideInterval = 4000; // 4.0s

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

    if (textColDots && textColDots.length) {
      textColDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    if (counter) {
      counter.textContent = String(currentIndex + 1).padStart(2, '0');
    }
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      nextSlide();
    }, slideInterval);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
      startAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetIndex = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(targetIndex)) {
        showSlide(targetIndex);
        startAutoplay();
      }
    });
  });

  if (textColDots && textColDots.length) {
    textColDots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(i);
        startAutoplay();
      });
    });
  }

  // Pause on desktop hover
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  // Mobile Touch Swipe: swipe left -> next, swipe right -> prev
  let touchStartX = 0;
  let touchStartY = 0;

  slider.addEventListener('touchstart', (e) => {
    stopAutoplay();
    if (e.changedTouches && e.changedTouches.length > 0) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      const diffX = touchStartX - e.changedTouches[0].screenX;
      const diffY = touchStartY - e.changedTouches[0].screenY;
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.3) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      setTimeout(startAutoplay, 2500);
    }
  }, { passive: true });

  // Initial render & start autoplay
  showSlide(0);
  startAutoplay();

  // Pause autoplay when browser tab is inactive, resume when active
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });
}

/* =====================================================================
   7. TRAINER FILTERING
   ===================================================================== */
function initTrainerFilters() {
  const filterBtns = document.querySelectorAll('.trainer-filter-btn');
  const cards = document.querySelectorAll('.trainer-card');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category') || '';
        if (cat === 'all' || cardCat.includes(cat)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* =====================================================================
   8. ANIMATED NUMBER COUNTERS (COUNT-UP EFFECT)
   ===================================================================== */
function initCountUp() {
  const counters = document.querySelectorAll('.count-up');
  if (!counters.length) return;

  const animateCounter = (el) => {
    if (el.dataset.animated === 'true') return;
    el.dataset.animated = 'true';

    const target = parseFloat(el.getAttribute('data-target')) || 0;
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const useComma = el.getAttribute('data-comma') === 'true';
    const duration = parseInt(el.getAttribute('data-duration'), 10) || 1600;

    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Smooth cubic ease out
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(ease * target);

      let formatted = currentVal.toString();
      if (useComma) {
        formatted = currentVal.toLocaleString('en-IN');
      }

      el.textContent = `${prefix}${formatted}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        let finalFormatted = target.toString();
        if (useComma) {
          finalFormatted = target.toLocaleString('en-IN');
        }
        el.textContent = `${prefix}${finalFormatted}${suffix}`;
        el.classList.add('counted');
      }
    };

    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -20px 0px'
    });

    counters.forEach(counter => observer.observe(counter));
  } else {
    counters.forEach(counter => animateCounter(counter));
  }
}

