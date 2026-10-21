/**
 * NG EDUCATION - Main Interactive Script
 * Fluid Wave & Layered Modern Tech UI
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initModals();
  initContactForm();
  initMobileNav();
  initTrainerFilters();
  initCountUp();
  initLiveCoursesSync();
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

      // Sync with Master Admin Orders & User Directories
      try {
        const isEnrollment = formTypeLower.includes('enroll') || formTypeLower.includes('course') || formTypeLower.includes('workshop');
        const isUserReg = formTypeLower.includes('signup') || formTypeLower.includes('register') || formTypeLower.includes('account');

        if (isEnrollment) {
          const newOrder = {
            id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
            studentName: nameVal || 'Enrolled Student',
            parentName: nameVal || 'Parent',
            phone: contactVal || '—',
            email: contactVal.includes('@') ? contactVal : '',
            courseName: formType || 'STEM Flagship Track',
            amount: 1999,
            paymentMode: 'UPI / Online',
            transactionId: 'TXN-' + Math.floor(100000 + Math.random() * 900000),
            timestamp: new Date().toLocaleString('en-IN'),
            approved: false // Requires Admin Approval
          };
          const savedOrders = JSON.parse(localStorage.getItem('ng_education_orders') || '[]');
          savedOrders.unshift(newOrder);
          localStorage.setItem('ng_education_orders', JSON.stringify(savedOrders));
        }

        if (isUserReg) {
          const ua = navigator.userAgent;
          const isMob = /Android|iPhone|iPad/i.test(ua);
          const os = /Windows/i.test(ua) ? 'Windows' : /Macintosh|Mac OS/i.test(ua) ? 'Mac OS' : /Android/i.test(ua) ? 'Android' : /iPhone|iPad/i.test(ua) ? 'iOS' : 'Desktop';
          const browser = /Chrome/i.test(ua) ? 'Chrome' : /Safari/i.test(ua) ? 'Safari' : /Firefox/i.test(ua) ? 'Firefox' : 'Browser';

          const newUser = {
            id: 'USR-' + Math.floor(100 + Math.random() * 900),
            name: nameVal || 'New Learner',
            email: contactVal.includes('@') ? contactVal : '',
            phone: !contactVal.includes('@') ? contactVal : '',
            source: 'Direct Website',
            location: 'India',
            deviceType: isMob ? 'Mobile' : 'Desktop',
            os: os,
            browser: browser,
            timestamp: new Date().toLocaleString('en-IN')
          };
          const savedUsers = JSON.parse(localStorage.getItem('ng_education_users') || '[]');
          savedUsers.unshift(newUser);
          localStorage.setItem('ng_education_users', JSON.stringify(savedUsers));
        }
      } catch (adminErr) {
        console.warn('Admin local recording notice:', adminErr);
      }

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

/* =====================================================================
   9. DYNAMIC ADMIN COURSE SYNC (Pricing, Discounts & Visibility)
   ===================================================================== */
function initLiveCoursesSync() {
  const container = document.querySelector('#single-courses .courses-grid');
  if (!container) return;

  const savedCoursesJson = localStorage.getItem('ng_education_courses');
  if (!savedCoursesJson) return;

  try {
    const courses = JSON.parse(savedCoursesJson);
    if (!Array.isArray(courses)) return;

    const existingCards = Array.from(container.querySelectorAll('.course-card:not(.card-admin-dynamic)'));
    const matchedTitles = new Set();

    // 1. Update existing cards
    existingCards.forEach(card => {
      const titleEl = card.querySelector('h3');
      if (!titleEl) return;
      const titleText = titleEl.textContent.trim().toLowerCase();

      const matchedCourse = courses.find(c => c.title.trim().toLowerCase() === titleText);
      if (matchedCourse) {
        matchedTitles.add(matchedCourse.title.trim().toLowerCase());

        // Visibility
        if (matchedCourse.active === false) {
          card.style.display = 'none';
        } else {
          card.style.display = 'flex';
        }

        // Price wrap update
        const priceWrap = card.querySelector('.price-text-wrap');
        if (priceWrap) {
          const origFormatted = matchedCourse.originalPrice ? '₹' + Number(matchedCourse.originalPrice).toLocaleString('en-IN') : '';
          const discFormatted = '₹' + Number(matchedCourse.discountPrice).toLocaleString('en-IN');
          
          priceWrap.innerHTML = `
            <span class="sub-duration">${matchedCourse.duration || '12-16 Modules'}</span>
            <div style="display:flex; align-items:baseline; gap:8px; flex-wrap:wrap; margin-top:2px;">
              <span class="main-price">${discFormatted}</span>
              ${matchedCourse.originalPrice && matchedCourse.originalPrice > matchedCourse.discountPrice ? `<span style="text-decoration:line-through; font-size:0.85rem; color:#94A3B8; font-weight:600;">${origFormatted}</span>` : ''}
              ${matchedCourse.discountBadge ? `<span style="background:#FEF3C7; color:#D97706; font-size:0.75rem; font-weight:800; padding:2px 8px; border-radius:4px;">${matchedCourse.discountBadge}</span>` : ''}
            </div>
          `;
        }
      }
    });

    // 2. Remove previously injected dynamic cards
    container.querySelectorAll('.card-admin-dynamic').forEach(el => el.remove());

    // 3. Append newly added courses created by admin
    courses.forEach(c => {
      if (c.active !== false && !matchedTitles.has(c.title.trim().toLowerCase())) {
        const dynamicCard = document.createElement('div');
        dynamicCard.className = 'course-card card-admin-dynamic';
        dynamicCard.innerHTML = `
          <div>
            <div class="card-top-flex">
              <div class="course-icon-orb">${c.icon || '🚀'}</div>
              <span class="course-grade-badge">${c.category || 'Special Track'}</span>
            </div>
            <h3>${c.title}</h3>
            <p>${c.description || 'Hands-on experiential learning module designed by industry experts.'}</p>
            <ul class="course-points">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ${c.grade || 'Grades 5-12'} curriculum tailored by STEM mentors
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Complete hardware kit guidance & 1-on-1 doubt clearing
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Government-recognized NG Education completion certificate
              </li>
            </ul>
          </div>
          <div class="card-foot">
            <div class="price-text-wrap">
              <span class="sub-duration">${c.duration || 'Flexible Modules'}</span>
              <div style="display:flex; align-items:baseline; gap:8px; flex-wrap:wrap; margin-top:2px;">
                <span class="main-price">₹${Number(c.discountPrice).toLocaleString('en-IN')}</span>
                ${c.originalPrice && c.originalPrice > c.discountPrice ? `<span style="text-decoration:line-through; font-size:0.85rem; color:#94A3B8; font-weight:600;">₹${Number(c.originalPrice).toLocaleString('en-IN')}</span>` : ''}
                ${c.discountBadge ? `<span style="background:#FEF3C7; color:#D97706; font-size:0.75rem; font-weight:800; padding:2px 8px; border-radius:4px;">${c.discountBadge}</span>` : ''}
              </div>
            </div>
            <div class="card-action-btns">
              <button class="btn-pill btn-pill-primary btn-card-enroll" onclick="openModal('modalEnroll')" data-open-modal="modalEnroll" data-course="${encodeURIComponent(c.title)}">Enroll</button>
            </div>
          </div>
        `;
        container.appendChild(dynamicCard);
      }
    });
  } catch (err) {
    console.warn('Dynamic course sync notice:', err);
  }
}

// Re-sync on storage change (if admin edits in another tab)
window.addEventListener('storage', (e) => {
  if (e.key === 'ng_education_courses') {
    initLiveCoursesSync();
  }
});
