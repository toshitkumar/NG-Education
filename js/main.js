/**
 * NG EDUCATION - Main Interactive Script
 * Futuristic STEM, Robotics & AI Learning Platform
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initModals();
  initContactForm();
  initMobileNav();
  init3DModelInteractions();
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
   2. MODALS (Login, Signup, Hire Teacher, STEM Lab)
   ===================================================================== */
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

  // Modal forms dummy submission
  const authForms = document.querySelectorAll('.modal-form');
  authForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formType = form.getAttribute('data-form-type') || 'Request';
      closeAllModals();
      showToast(`⚡ ${formType} submitted successfully! Welcome to NG EDUCATION.`);
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
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value || 'Friend';
      contactForm.reset();
      showToast(`Thank you, ${name}! Toshit & Arpit will connect with you shortly.`);
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
    <span style="color: var(--teal-neon); font-size: 1.2rem;">✓</span>
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
   6. 3D MODEL CONTROLS & COMPONENT HIGHLIGHTS
   ===================================================================== */
function init3DModelInteractions() {
  const modelViewer = document.querySelector('model-viewer');
  if (!modelViewer) return;

  // Enhance camera behavior
  modelViewer.addEventListener('load', () => {
    console.log('Arduino Uno 3D Model loaded successfully in NG EDUCATION viewer.');
  });
}
