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
  initLiveTickerSync();
  initLivePopupsManager();
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
          
          const modCount = (matchedCourse.curriculum || []).length;
          const curriculumTag = modCount > 0 ? `${modCount} Modules • 🎥 Video, PDF, Notes & Labs` : (matchedCourse.duration || '12-16 Modules');

          priceWrap.innerHTML = `
            <span class="sub-duration">${curriculumTag}</span>
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


/* =====================================================================
   11. LIVE ANNOUNCEMENT TICKER & MULTI-TARGET POPUPS MANAGER
   ===================================================================== */

const DEFAULT_SITE_TICKER = {
  enabled: true,
  badgeText: '📢 NOTICE',
  text1: "🎓 Once you complete a course you'll get a certificate 100% free.",
  highlightWord: "100% free",
  text2: "📜 Official Verified STEM & Robotics Certificate Included at No Extra Cost.",
  text3: "⚡ 100% Practical Training + Free Shareable Certificate upon Project Completion!",
  bgColor: '#F59E0B',
  textColor: '#0F172A',
  speed: '28s'
};

const DEFAULT_SITE_POPUPS = [
  {
    id: 'popup_1',
    title: '🚀 Drone Making & Aerial Robotics Masterclass',
    audience: 'home',
    image: 'assets/images/slide1_robotics.webp',
    message: 'Join our hands-on quadcopter building batch. Complete DIY hardware kit included with DGCA safety and flight calibration training!',
    hasSchedule: true,
    scheduleLabel: 'New Batch Starts:',
    scheduleDate: '2026-11-05',
    scheduleTime: '11:00',
    btnText: 'Explore Course (50% OFF) →',
    btnLink: '#courses',
    isActive: true
  },
  {
    id: 'popup_2',
    title: '🏆 Inter-School RoboFest 2026 Registration',
    audience: 'students',
    image: 'assets/images/slide3_stem_lab.webp',
    message: 'Attention students! Submit your obstacle-avoidance robot or IoT project by Friday to qualify for national ATL STEM innovation awards.',
    hasSchedule: true,
    scheduleLabel: 'Submission Deadline:',
    scheduleDate: '2026-11-15',
    scheduleTime: '18:00',
    btnText: 'Submit Project Video →',
    btnLink: 'index.html#contact',
    isActive: true
  }
];

function initLiveTickerSync() {
  const tickerStrip = document.querySelector('.top-ticker-strip');
  if (!tickerStrip) return;

  try {
    let ticker = DEFAULT_SITE_TICKER;
    const rawTicker = localStorage.getItem('ng_education_ticker_settings');
    if (rawTicker) {
      try {
        ticker = { ...DEFAULT_SITE_TICKER, ...JSON.parse(rawTicker) };
      } catch (e) {
        ticker = DEFAULT_SITE_TICKER;
      }
    }

    if (ticker.enabled === false) {
      tickerStrip.style.display = 'none';
      return;
    } else {
      tickerStrip.style.display = 'flex';
    }

    // Apply colors via CSS Variables on root and direct inline styles
    const bg = ticker.bgColor || '#F59E0B';
    const text = ticker.textColor || '#0F172A';
    const speed = ticker.speed || '28s';

    document.documentElement.style.setProperty('--ticker-bg', bg);
    document.documentElement.style.setProperty('--ticker-color', text);
    document.documentElement.style.setProperty('--ticker-badge-bg', text);
    document.documentElement.style.setProperty('--ticker-badge-color', bg);
    document.documentElement.style.setProperty('--ticker-speed', speed);

    tickerStrip.style.setProperty('background-color', bg, 'important');
    tickerStrip.style.setProperty('color', text, 'important');

    // Badge
    const badgeEl = tickerStrip.querySelector('.top-ticker-badge');
    if (badgeEl && ticker.badgeText) {
      badgeEl.style.setProperty('background-color', text, 'important');
      badgeEl.style.setProperty('color', bg, 'important');
      const parts = ticker.badgeText.trim().split(' ');
      const icon = parts[0] || '📢';
      const badgeWord = parts.slice(1).join(' ') || 'NOTICE';
      badgeEl.innerHTML = `<span style="font-size: 0.95rem;">${icon}</span><span>${badgeWord}</span>`;
    }

    // Format messages
    const formatMsg = (msg) => {
      if (!msg) return '';
      if (ticker.highlightWord && msg.includes(ticker.highlightWord)) {
        return msg.replace(
          ticker.highlightWord,
          `<strong style="font-weight: 900; text-decoration: underline; text-underline-offset: 3px; margin-left: 4px;">${ticker.highlightWord}</strong>`
        );
      }
      return msg;
    };

    let items = [];
    if (ticker.text1 && ticker.text1.trim()) items.push(formatMsg(ticker.text1.trim()));
    if (ticker.text2 && ticker.text2.trim()) items.push(formatMsg(ticker.text2.trim()));
    if (ticker.text3 && ticker.text3.trim()) items.push(formatMsg(ticker.text3.trim()));

    if (items.length > 0) {
      const track = tickerStrip.querySelector('.top-ticker-track');
      if (track) {
        // Ensure at least 4 items so no blank space on wide desktop screens
        let repeatedItems = [...items];
        while (repeatedItems.length < 4) {
          repeatedItems = repeatedItems.concat(items);
        }

        const singleSetHtml = repeatedItems
          .map(item => `<span class="top-ticker-item" style="color: ${text} !important;">${item}</span><span class="top-ticker-separator" style="color: ${text} !important; opacity: 0.6;">✦</span>`)
          .join('');

        // Duplicate for seamless 50% infinite translation
        track.innerHTML = singleSetHtml + singleSetHtml;
        track.style.setProperty('animation-duration', speed, 'important');
      }
    }
  } catch (err) {
    console.warn('Ticker sync error:', err);
  }
}

// Global active site popups state
let activeHomePopups = [];
let currentSitePopupIndex = 0;
let activeStudentPopup = null;

function initLivePopupsManager() {
  try {
    let popupsList = DEFAULT_SITE_POPUPS;
    const rawPopups = localStorage.getItem('ng_education_popups_list');
    if (rawPopups) {
      try {
        popupsList = JSON.parse(rawPopups);
      } catch (e) {
        popupsList = DEFAULT_SITE_POPUPS;
      }
    } else {
      localStorage.setItem('ng_education_popups_list', JSON.stringify(DEFAULT_SITE_POPUPS));
    }

    // Force Test Mode: if URL contains ?test_popup=1 or ?reset_popups=1
    const urlParams = new URLSearchParams(window.location.search);
    const forceTestPopup = urlParams.get('test_popup') === '1' || urlParams.get('reset_popups') === '1';
    if (forceTestPopup) {
      Object.keys(sessionStorage).forEach(k => {
        if (k.startsWith('dismissed_site_popup_')) sessionStorage.removeItem(k);
      });
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith('dismissed_popup_day_') || k.startsWith('dismissed_popup_time_')) localStorage.removeItem(k);
      });
    }

    // 1. Filter Home Page Popups
    activeHomePopups = popupsList.filter(p => p.isActive && (p.audience === 'home' || p.audience === 'all'));

    // Check dismissal: Allow popup if it was created/updated after last dismissal
    activeHomePopups = activeHomePopups.filter(p => {
      if (forceTestPopup) return true;
      const sessionDismissed = sessionStorage.getItem('dismissed_site_popup_' + p.id);
      const dayDismissed = localStorage.getItem('dismissed_popup_day_' + p.id);
      const lastDismissedTime = Number(localStorage.getItem('dismissed_popup_time_' + p.id) || 0);
      const popupUpdatedTime = p.updatedAt ? new Date(p.updatedAt).getTime() : (p.createdAt ? new Date(p.createdAt).getTime() : 0);

      // Invalidate old dismissal if admin recently updated or saved the popup!
      if (popupUpdatedTime > lastDismissedTime && lastDismissedTime > 0) {
        sessionStorage.removeItem('dismissed_site_popup_' + p.id);
        localStorage.removeItem('dismissed_popup_day_' + p.id);
        localStorage.removeItem('dismissed_popup_time_' + p.id);
        return true;
      }

      const todayStr = new Date().toDateString();
      return !sessionDismissed && dayDismissed !== todayStr;
    });

    // 2. Filter Student Popups for student portal / login
    const studentPopups = popupsList.filter(p => p.isActive && (p.audience === 'students' || p.audience === 'all'));
    if (studentPopups.length > 0) {
      activeStudentPopup = studentPopups[0];
      setupStudentNoticeInLogin(activeStudentPopup);
    }

    // 3. Trigger Home Page Popup if available
    if (activeHomePopups.length > 0) {
      currentSitePopupIndex = 0;
      setTimeout(() => {
        const hasOpenModal = document.querySelector('.modal-overlay.active');
        if (!hasOpenModal) {
          renderCurrentSitePopup();
          const modal = document.getElementById('modalDynamicSitePopup');
          if (modal) modal.classList.add('active');
        }
      }, 1000);
    }
  } catch (err) {
    console.warn('Popups manager error:', err);
  }
}

function renderCurrentSitePopup() {
  if (!activeHomePopups || activeHomePopups.length === 0) return;
  const popup = activeHomePopups[currentSitePopupIndex];
  if (!popup) return;

  const modal = document.getElementById('modalDynamicSitePopup');
  if (!modal) return;

  // Title & Message
  const titleEl = document.getElementById('sitePopupTitle');
  const msgEl = document.getElementById('sitePopupMessage');
  if (titleEl) titleEl.textContent = popup.title;
  if (msgEl) msgEl.textContent = popup.message;

  // Image & Badge
  const imgWrap = document.getElementById('sitePopupImageWrap');
  const imgEl = document.getElementById('sitePopupImage');
  const badgeNoImg = document.getElementById('sitePopupBadgeNoImg');
  const audBadge = document.getElementById('sitePopupAudienceBadge');
  const audLabel = document.getElementById('sitePopupBadgeNoImgLabel');

  const audienceText = popup.audience === 'home' ? '🏠 Special Announcement' : (popup.audience === 'students' ? '🎓 Student Notice' : '🌐 Important Update');
  if (audBadge) audBadge.textContent = audienceText;
  if (audLabel) audLabel.textContent = audienceText;

  if (popup.image && popup.image.trim().length > 3) {
    if (imgEl) imgEl.src = popup.image.trim();
    if (imgWrap) imgWrap.style.display = 'block';
    if (badgeNoImg) badgeNoImg.style.display = 'none';
  } else {
    if (imgWrap) imgWrap.style.display = 'none';
    if (badgeNoImg) badgeNoImg.style.display = 'inline-flex';
  }

  // Schedule (Date & Time)
  const schedBox = document.getElementById('sitePopupScheduleBox');
  const schedLabel = document.getElementById('sitePopupScheduleLabel');
  const schedValue = document.getElementById('sitePopupScheduleValue');

  const hasSched = popup.hasSchedule && (popup.scheduleText || popup.scheduleDate || popup.scheduleTime);
  if (hasSched) {
    if (schedLabel) schedLabel.textContent = popup.scheduleLabel || 'SCHEDULE';
    
    let formattedDateTime = popup.scheduleText || '';
    if (!formattedDateTime) {
      if (popup.scheduleDate) {
        try {
          const d = new Date(popup.scheduleDate);
          formattedDateTime = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
        } catch (e) {
          formattedDateTime = popup.scheduleDate;
        }
      }
      if (popup.scheduleTime) {
        formattedDateTime += (formattedDateTime ? ' at ' : '') + popup.scheduleTime;
      }
    }

    if (schedValue) schedValue.textContent = formattedDateTime;
    if (schedBox) schedBox.style.display = 'flex';
  } else {
    if (schedBox) schedBox.style.display = 'none';
  }

  // Multi-Popup Prev/Next Navigation
  const navWrap = document.getElementById('sitePopupNavWrap');
  const counterEl = document.getElementById('sitePopupCounter');
  if (activeHomePopups.length > 1) {
    if (navWrap) navWrap.style.display = 'flex';
    if (counterEl) counterEl.textContent = `Notice ${currentSitePopupIndex + 1} of ${activeHomePopups.length}`;
  } else {
    if (navWrap) navWrap.style.display = 'none';
  }

  // CTA Action Button
  const btn = document.getElementById('sitePopupActionBtn');
  const btnText = document.getElementById('sitePopupActionBtnText');
  if (popup.btnText && popup.btnText.trim()) {
    if (btnText) btnText.textContent = popup.btnText.trim();
    if (btn) {
      btn.href = popup.btnLink || '#courses';
      btn.style.display = 'flex';
    }
  } else {
    if (btn) btn.style.display = 'none';
  }
}

function navigateSitePopup(delta) {
  if (!activeHomePopups || activeHomePopups.length <= 1) return;
  currentSitePopupIndex = (currentSitePopupIndex + delta + activeHomePopups.length) % activeHomePopups.length;
  renderCurrentSitePopup();
}

function dismissSitePopup(foreverToday = false) {
  const modal = document.getElementById('modalDynamicSitePopup');
  if (modal) modal.classList.remove('active');

  if (activeHomePopups && activeHomePopups[currentSitePopupIndex]) {
    const currentId = activeHomePopups[currentSitePopupIndex].id;
    sessionStorage.setItem('dismissed_site_popup_' + currentId, 'true');
    const now = Date.now();
    localStorage.setItem('dismissed_popup_time_' + currentId, String(now));
    if (foreverToday) {
      localStorage.setItem('dismissed_popup_day_' + currentId, new Date().toDateString());
    }
  }
}

function setupStudentNoticeInLogin(popup) {
  const card = document.getElementById('studentLoginNoticeCard');
  if (!card || !popup) return;

  const titleEl = document.getElementById('studentNoticeTitle');
  const msgEl = document.getElementById('studentNoticeMsg');
  const schedBadge = document.getElementById('studentNoticeScheduleBadge');

  if (titleEl) titleEl.textContent = popup.title;
  if (msgEl) {
    msgEl.textContent = popup.message.length > 90 ? popup.message.substring(0, 87) + '...' : popup.message;
  }
  if (schedBadge) {
    const schedInfo = popup.scheduleText || (popup.scheduleDate ? `${popup.scheduleDate} ${popup.scheduleTime || ''}` : '');
    schedBadge.textContent = popup.hasSchedule && schedInfo 
      ? `⏰ ${popup.scheduleLabel || 'Date:'} ${schedInfo}` 
      : '⚡ Active';
  }

  card.style.display = 'block';
}

function openStudentPopupDetail() {
  if (!activeStudentPopup) return;
  closeAllModals();

  // Populate dynamic modal with student popup data
  activeHomePopups = [activeStudentPopup];
  currentSitePopupIndex = 0;
  renderCurrentSitePopup();

  const modal = document.getElementById('modalDynamicSitePopup');
  if (modal) modal.classList.add('active');
}

// Expose globals for inline HTML event handlers
window.navigateSitePopup = navigateSitePopup;
window.dismissSitePopup = dismissSitePopup;
window.openStudentPopupDetail = openStudentPopupDetail;

window.addEventListener('storage', (e) => {
  if (e.key === 'ng_education_courses') {
    initLiveCoursesSync();
  }
  if (e.key === 'ng_education_ticker_settings') {
    initLiveTickerSync();
  }
  if (e.key === 'ng_education_popups_list') {
    initLivePopupsManager();
  }
});

