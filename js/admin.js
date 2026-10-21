/* =====================================================================
   NG EDUCATION - MASTER ADMIN DASHBOARD LOGIC (js/admin.js)
   Handles Auth, Course Manager, Orders & Approvals, and User Directory
   ===================================================================== */

// Master Configuration & Credentials
const ADMIN_CONFIG = {
  defaultUsername: 'toshitkumar82',
  defaultPassword: 'Alonewolf666',
  recoveryEmail: 'kumartoshit82@gmail.com',
  sessionKey: 'ng_admin_session_token',
  credsKey: 'ng_admin_credentials',
  coursesKey: 'ng_education_courses',
  ordersKey: 'ng_education_orders',
  usersKey: 'ng_education_users',
  webAppUrl: 'https://script.google.com/macros/s/AKfycbzE4aQeBXIGj3P7IqP6vzPeZOC4XERF2_UWdhzk-JyXHSn2ykwKcaYkulTtffYwBpwaHQ/exec'
};

// Initial Default Flagship Courses
const DEFAULT_COURSES = [
  {
    id: 'course_1',
    title: 'Arduino Programming Language',
    category: 'Programming',
    icon: '💻',
    grade: 'Grade 5–10',
    duration: '16 Modules • 20–30 Hours',
    description: 'Master the C/C++ embedded coding language designed for microcontrollers. Learn program flow, syntax, loops, variables, and serial communication.',
    originalPrice: 1999,
    discountPrice: 999,
    discountBadge: '50% OFF',
    active: true,
    modules: 16
  },
  {
    id: 'course_2',
    title: 'Arduino Basics & Electronics',
    category: 'Electronics',
    icon: '⚡',
    grade: 'Grade 5–10',
    duration: '14 Modules • 18–25 Hours',
    description: 'Build a rock-solid foundation in electronic circuits, breadboard prototyping, hardware safety, and core electrical components.',
    originalPrice: 2499,
    discountPrice: 1299,
    discountBadge: '48% OFF',
    active: true,
    modules: 14
  },
  {
    id: 'course_3',
    title: 'Arduino Sensors & Interfacing',
    category: 'Sensors',
    icon: '📡',
    grade: 'Grade 6–10',
    duration: '12 Modules • 15–20 Hours',
    description: 'Interface and calibrate real-world analog and digital sensory devices to capture environmental signals with precision.',
    originalPrice: 2399,
    discountPrice: 1199,
    discountBadge: '50% OFF',
    active: true,
    modules: 12
  },
  {
    id: 'course_4',
    title: 'Arduino Motor Control',
    category: 'Motors',
    icon: '⚙️',
    grade: 'Grade 6–10',
    duration: '12 Modules • 15–20 Hours',
    description: 'Bring mechanical actuation to your projects. Master motor drivers, PWM speed regulation, and precise micro-servo positioning.',
    originalPrice: 2399,
    discountPrice: 1199,
    discountBadge: '50% OFF',
    active: true,
    modules: 12
  },
  {
    id: 'course_5',
    title: 'Robotics & Autonomous Bots',
    category: 'Robotics',
    icon: '🤖',
    grade: 'Grade 6–10',
    duration: '12 Modules • 20–30 Hours',
    description: 'Build 3 flagship robotics projects: an autonomous obstacle-avoiding bot, high-speed line tracker, and a multi-axis servo robotic arm.',
    originalPrice: 3999,
    discountPrice: 1999,
    discountBadge: '50% OFF',
    active: true,
    modules: 12
  },
  {
    id: 'course_6',
    title: 'Home Automation & Smart Agriculture',
    category: 'Automation',
    icon: '🏡',
    grade: 'Grade 6–10',
    duration: '12 Modules • 15–20 Hours',
    description: 'Build smart automated systems for modern living: relay-driven automated appliances and automatic soil-moisture irrigation systems.',
    originalPrice: 2999,
    discountPrice: 1499,
    discountBadge: '50% OFF',
    active: true,
    modules: 12
  },
  {
    id: 'course_7',
    title: 'Arduino IoT & Wi-Fi',
    category: 'IoT',
    icon: '🌐',
    grade: 'Grade 7–10',
    duration: '12 Modules • 20–30 Hours',
    description: 'Connect microcontrollers to the global internet. Transmit sensor data to live cloud dashboards and control hardware anywhere via smartphone.',
    originalPrice: 2999,
    discountPrice: 1499,
    discountBadge: '50% OFF',
    active: true,
    modules: 12
  },
  {
    id: 'course_8',
    title: 'Displays & Advanced Projects',
    category: 'Advanced',
    icon: '🚀',
    grade: 'Grade 7–10',
    duration: '12 Modules • 20–30 Hours',
    description: 'Master graphic displays, wireless transceivers (RF/Bluetooth), multi-protocol communication (SPI/I2C), and build complex capstone systems.',
    originalPrice: 3599,
    discountPrice: 1799,
    discountBadge: '50% OFF',
    active: true,
    modules: 12
  },
  {
    id: 'course_9',
    title: 'Python Programming Masterclass',
    category: 'Programming',
    icon: '🐍',
    grade: 'Grade 6–12',
    duration: '18 Modules • 30–40 Hours',
    description: 'Learn Python from fundamentals to advanced development, automation, data handling, SQLite databases, REST APIs and capstone project building.',
    originalPrice: 3999,
    discountPrice: 1999,
    discountBadge: '50% OFF',
    active: true,
    modules: 18
  }
];

// Initial Realistic Orders for Approval Verification
const DEFAULT_ORDERS = [
  {
    id: 'ORD-8921',
    studentName: 'Aarav Patel',
    parentName: 'Sanjay Patel',
    phone: '+91 98765 43210',
    email: 'sanjay.patel@gmail.com',
    courseId: 'course_4',
    courseName: 'Autonomous Smart Car & Robotics',
    amount: 1999,
    paymentMode: 'UPI / QR Code',
    transactionId: 'UPI-9823471029',
    timestamp: '21-Oct-2026, 01:45 PM',
    approved: false
  },
  {
    id: 'ORD-8920',
    studentName: 'Ananya Sharma',
    parentName: 'Vikram Sharma',
    phone: '+91 98123 45678',
    email: 'vikram.sharma@yahoo.com',
    courseId: 'course_1',
    courseName: 'Arduino Programming Language',
    amount: 999,
    paymentMode: 'Net Banking',
    transactionId: 'TXN-4902183921',
    timestamp: '21-Oct-2026, 11:30 AM',
    approved: true
  },
  {
    id: 'ORD-8919',
    studentName: 'Rohan Deshmukh',
    parentName: 'Sunita Deshmukh',
    phone: '+91 97654 32109',
    email: 'deshmukh.sunita@gmail.com',
    courseId: 'course_5',
    courseName: 'AI, Computer Vision & Edge ML',
    amount: 2499,
    paymentMode: 'UPI / QR Code',
    transactionId: 'UPI-7712093841',
    timestamp: '20-Oct-2026, 05:15 PM',
    approved: false
  }
];

// Initial Realistic Logins
const DEFAULT_USERS = [
  {
    id: 'USR-101',
    name: 'Rahul Verma',
    email: 'rahul.verma@gmail.com',
    phone: '+91 98451 23456',
    source: 'Google',
    location: 'New Delhi, India',
    ip: '103.21.124.89',
    deviceType: 'Desktop',
    os: 'Windows 11',
    browser: 'Chrome 122',
    timestamp: '21-Oct-2026, 02:10 PM'
  },
  {
    id: 'USR-102',
    name: 'Pooja Iyer',
    email: 'pooja.iyer@gmail.com',
    phone: '+91 97321 65498',
    source: 'Google',
    location: 'Bengaluru, Karnataka',
    ip: '49.207.198.42',
    deviceType: 'Mobile',
    os: 'Android 14',
    browser: 'Chrome Mobile',
    timestamp: '21-Oct-2026, 12:40 PM'
  },
  {
    id: 'USR-103',
    name: 'Kabir Malhotra',
    email: 'kabir.m@dpsrkp.edu.in',
    phone: '+91 99100 23456',
    source: 'Direct Email',
    location: 'Noida, Uttar Pradesh',
    ip: '157.34.82.11',
    deviceType: 'Tablet',
    os: 'iPadOS 17',
    browser: 'Safari',
    timestamp: '21-Oct-2026, 10:15 AM'
  }
];

// State Store
class AdminState {
  constructor() {
    this.initCredentials();
    this.initData();
  }

  initCredentials() {
    let savedCreds = localStorage.getItem(ADMIN_CONFIG.credsKey);
    if (!savedCreds) {
      const defaultData = {
        username: ADMIN_CONFIG.defaultUsername,
        password: ADMIN_CONFIG.defaultPassword,
        recoveryEmail: ADMIN_CONFIG.recoveryEmail,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(ADMIN_CONFIG.credsKey, JSON.stringify(defaultData));
      this.credentials = defaultData;
    } else {
      this.credentials = JSON.parse(savedCreds);
    }
  }

  initData() {
    // Courses
    let savedCourses = localStorage.getItem(ADMIN_CONFIG.coursesKey);
    if (!savedCourses) {
      localStorage.setItem(ADMIN_CONFIG.coursesKey, JSON.stringify(DEFAULT_COURSES));
      this.courses = DEFAULT_COURSES;
    } else {
      this.courses = JSON.parse(savedCourses);
    }

    // Orders
    let savedOrders = localStorage.getItem(ADMIN_CONFIG.ordersKey);
    if (!savedOrders) {
      localStorage.setItem(ADMIN_CONFIG.ordersKey, JSON.stringify(DEFAULT_ORDERS));
      this.orders = DEFAULT_ORDERS;
    } else {
      this.orders = JSON.parse(savedOrders);
    }

    // Users
    let savedUsers = localStorage.getItem(ADMIN_CONFIG.usersKey);
    if (!savedUsers) {
      localStorage.setItem(ADMIN_CONFIG.usersKey, JSON.stringify(DEFAULT_USERS));
      this.users = DEFAULT_USERS;
    } else {
      this.users = JSON.parse(savedUsers);
    }
  }

  saveCourses() {
    localStorage.setItem(ADMIN_CONFIG.coursesKey, JSON.stringify(this.courses));
    this.syncToCloud('sync_courses', { courses: this.courses });
  }

  saveOrders() {
    localStorage.setItem(ADMIN_CONFIG.ordersKey, JSON.stringify(this.orders));
    this.syncToCloud('sync_orders', { orders: this.orders });
  }

  saveCredentials() {
    localStorage.setItem(ADMIN_CONFIG.credsKey, JSON.stringify(this.credentials));
  }

  async syncToCloud(action, payload) {
    if (!ADMIN_CONFIG.webAppUrl) return;
    try {
      await fetch(ADMIN_CONFIG.webAppUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...payload, adminUser: this.credentials.username, timestamp: new Date().toISOString() })
      });
    } catch (e) {
      console.warn('Admin cloud sync note:', e);
    }
  }
}

const state = new AdminState();
let currentOtp = null;
let currentOtpExpiry = null;

// =====================================================================
// AUTHENTICATION & SESSION MANAGEMENT
// =====================================================================
function isAuthenticated() {
  return sessionStorage.getItem(ADMIN_CONFIG.sessionKey) === 'logged_in_active';
}

function renderAuthView() {
  const authWrap = document.getElementById('adminAuthWrap');
  const appLayout = document.getElementById('adminAppLayout');
  
  if (isAuthenticated()) {
    authWrap.style.display = 'none';
    appLayout.style.display = 'flex';
    document.getElementById('adminDisplayUsername').textContent = state.credentials.username;
    renderAllViews();
  } else {
    authWrap.style.display = 'flex';
    appLayout.style.display = 'none';
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const usernameInput = document.getElementById('adminUserInput').value.trim();
  const passwordInput = document.getElementById('adminPassInput').value;
  const alertBox = document.getElementById('authAlertBox');

  // Verify Credentials
  const validUser = (usernameInput === state.credentials.username || usernameInput.toLowerCase() === state.credentials.recoveryEmail.toLowerCase());
  const validPass = (passwordInput === state.credentials.password);

  if (validUser && validPass) {
    sessionStorage.setItem(ADMIN_CONFIG.sessionKey, 'logged_in_active');
    alertBox.style.display = 'none';
    showToast('Login successful! Welcome Admin.');
    renderAuthView();
  } else {
    alertBox.textContent = 'Invalid Admin ID or Password. Please try again.';
    alertBox.className = 'auth-alert-box auth-alert-error';
    alertBox.style.display = 'block';
  }
}

function handleLogout() {
  sessionStorage.removeItem(ADMIN_CONFIG.sessionKey);
  showToast('Logged out successfully.');
  renderAuthView();
}

// =====================================================================
// 2-STEP EMAIL VERIFICATION & PASSWORD RESET
// =====================================================================
function openForgotPasswordModal() {
  const modal = document.getElementById('modalForgotPass');
  document.getElementById('stepSendOtp').style.display = 'block';
  document.getElementById('stepVerifyOtp').style.display = 'none';
  document.getElementById('stepSetNewPass').style.display = 'none';
  document.getElementById('forgotAlert').style.display = 'none';
  modal.classList.add('active');
}

function closeForgotPasswordModal() {
  document.getElementById('modalForgotPass').classList.remove('active');
}

async function requestPasswordResetOtp() {
  const emailInput = document.getElementById('recoveryEmailInput').value.trim();
  const alertBox = document.getElementById('forgotAlert');

  if (emailInput.toLowerCase() !== state.credentials.recoveryEmail.toLowerCase()) {
    alertBox.textContent = `Email does not match registered admin email (${state.credentials.recoveryEmail})`;
    alertBox.className = 'auth-alert-box auth-alert-error';
    alertBox.style.display = 'block';
    return;
  }

  // Generate 6-Digit OTP
  currentOtp = Math.floor(100000 + Math.random() * 900000).toString();
  currentOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

  alertBox.textContent = 'Sending 6-digit OTP to ' + state.credentials.recoveryEmail + '...';
  alertBox.className = 'auth-alert-box auth-alert-success';
  alertBox.style.display = 'block';

  // Send Email via Webhook to Apps Script
  try {
    await fetch(ADMIN_CONFIG.webAppUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'send_admin_otp',
        recipient: state.credentials.recoveryEmail,
        otpCode: currentOtp,
        timestamp: new Date().toISOString()
      })
    });
  } catch (err) {
    console.warn('Email dispatch warning:', err);
  }

  setTimeout(() => {
    document.getElementById('stepSendOtp').style.display = 'none';
    document.getElementById('stepVerifyOtp').style.display = 'block';
    document.getElementById('sentEmailNote').textContent = state.credentials.recoveryEmail;
    alertBox.style.display = 'none';
    showToast(`Verification code sent to ${state.credentials.recoveryEmail}!`);
    
    // Fallback alert for developer convenience in sandbox
    console.log(`[ADMIN 2-STEP CODE]: ${currentOtp}`);
  }, 1200);
}

function verifyResetOtp() {
  const enteredOtp = document.getElementById('otpInput').value.trim();
  const alertBox = document.getElementById('forgotAlert');

  if (Date.now() > currentOtpExpiry) {
    alertBox.textContent = 'OTP has expired. Please request a new one.';
    alertBox.className = 'auth-alert-box auth-alert-error';
    alertBox.style.display = 'block';
    return;
  }

  if (enteredOtp === currentOtp) {
    document.getElementById('stepVerifyOtp').style.display = 'none';
    document.getElementById('stepSetNewPass').style.display = 'block';
    alertBox.style.display = 'none';
    showToast('OTP verified successfully!');
  } else {
    alertBox.textContent = 'Invalid verification code. Please check your email.';
    alertBox.className = 'auth-alert-box auth-alert-error';
    alertBox.style.display = 'block';
  }
}

function saveNewPassword() {
  const newPass = document.getElementById('newPasswordInput').value;
  const confirmPass = document.getElementById('confirmPasswordInput').value;
  const alertBox = document.getElementById('forgotAlert');

  if (newPass.length < 6) {
    alertBox.textContent = 'Password must be at least 6 characters long.';
    alertBox.className = 'auth-alert-box auth-alert-error';
    alertBox.style.display = 'block';
    return;
  }

  if (newPass !== confirmPass) {
    alertBox.textContent = 'Passwords do not match.';
    alertBox.className = 'auth-alert-box auth-alert-error';
    alertBox.style.display = 'block';
    return;
  }

  state.credentials.password = newPass;
  state.credentials.updatedAt = new Date().toISOString();
  state.saveCredentials();

  closeForgotPasswordModal();
  showToast('Password updated successfully! Please log in.');
  currentOtp = null;
}

// =====================================================================
// RENDER ALL VIEWS (DASHBOARD, COURSES, ORDERS, USERS)
// =====================================================================
function renderAllViews() {
  renderDashboardMetrics();
  renderCoursesTable();
  renderOrdersTable();
  renderUsersTable();
}

// 1. Dashboard Metrics
function renderDashboardMetrics() {
  const pendingOrders = state.orders.filter(o => !o.approved).length;
  const totalRevenue = state.orders.filter(o => o.approved).reduce((sum, o) => sum + Number(o.amount), 0);
  const activeCourses = state.courses.filter(c => c.active).length;

  document.getElementById('metricPendingOrders').textContent = pendingOrders;
  document.getElementById('metricTotalRevenue').textContent = '₹' + totalRevenue.toLocaleString('en-IN');
  document.getElementById('metricTotalUsers').textContent = state.users.length;
  document.getElementById('metricActiveCourses').textContent = activeCourses;

  const orderBadge = document.getElementById('sidebarOrderBadge');
  if (pendingOrders > 0) {
    orderBadge.style.display = 'inline-block';
    orderBadge.textContent = pendingOrders;
  } else {
    orderBadge.style.display = 'none';
  }

  // Quick summary table on dashboard
  const quickOrdersBody = document.getElementById('dashRecentOrdersBody');
  quickOrdersBody.innerHTML = state.orders.slice(0, 4).map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.studentName}</td>
      <td>${o.courseName}</td>
      <td><strong>₹${Number(o.amount).toLocaleString('en-IN')}</strong></td>
      <td>
        <span class="badge-status ${o.approved ? 'badge-approved' : 'badge-pending'}">
          ${o.approved ? '✅ Approved' : '⏳ Pending'}
        </span>
      </td>
      <td>
        <label class="approval-switch" title="Toggle Course Access">
          <input type="checkbox" ${o.approved ? 'checked' : ''} onchange="toggleOrderApproval('${o.id}')">
          <span class="slider-round"></span>
        </label>
      </td>
    </tr>
  `).join('');
}

// 2. Course Manager
function renderCoursesTable() {
  const tbody = document.getElementById('coursesTableBody');
  tbody.innerHTML = state.courses.map(c => `
    <tr>
      <td>
        <div style="display:flex; align-items:center; gap:12px;">
          <span style="font-size:1.4rem;">${c.icon || '📘'}</span>
          <div>
            <strong>${c.title}</strong>
            <div style="font-size:0.78rem; color:#64748B;">${c.grade} • ${c.duration}</div>
          </div>
        </div>
      </td>
      <td><span class="badge-status badge-active">${c.category}</span></td>
      <td>
        <div>
          <strong style="color:#0E6258; font-size:1.05rem;">₹${Number(c.discountPrice).toLocaleString('en-IN')}</strong>
          ${c.originalPrice ? `<del style="font-size:0.8rem; color:#94A3B8; margin-left:4px;">₹${Number(c.originalPrice).toLocaleString('en-IN')}</del>` : ''}
        </div>
        ${c.discountBadge ? `<span style="font-size:0.75rem; background:#FEF3C7; color:#D97706; padding:2px 6px; border-radius:4px; font-weight:700;">${c.discountBadge}</span>` : ''}
      </td>
      <td>
        <span class="badge-status ${c.active ? 'badge-approved' : 'badge-draft'}">
          ${c.active ? 'Active (Live)' : 'Draft (Hidden)'}
        </span>
      </td>
      <td>
        <label class="approval-switch" title="Toggle Live on Home Page">
          <input type="checkbox" ${c.active ? 'checked' : ''} onchange="toggleCourseActive('${c.id}')">
          <span class="slider-round"></span>
        </label>
      </td>
      <td>
        <div style="display:flex; gap:8px;">
          <button class="btn-secondary-action" style="padding:6px 12px; font-size:0.82rem;" onclick="openEditCourseModal('${c.id}')">Edit</button>
          <button class="btn-secondary-action" style="padding:6px 10px; font-size:0.82rem; color:#EF4444;" onclick="deleteCourse('${c.id}')">✕</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function toggleCourseActive(courseId) {
  const course = state.courses.find(c => c.id === courseId);
  if (course) {
    course.active = !course.active;
    state.saveCourses();
    renderCoursesTable();
    renderDashboardMetrics();
    showToast(`Course "${course.title}" is now ${course.active ? 'LIVE on Website' : 'Hidden from Website'}!`);
  }
}

function openAddCourseModal() {
  document.getElementById('courseModalTitle').textContent = 'Add New Course';
  document.getElementById('courseForm').reset();
  document.getElementById('courseEditId').value = '';
  document.getElementById('modalCourse').classList.add('active');
}

function openEditCourseModal(courseId) {
  const course = state.courses.find(c => c.id === courseId);
  if (!course) return;

  document.getElementById('courseModalTitle').textContent = 'Edit Course & Pricing';
  document.getElementById('courseEditId').value = course.id;
  document.getElementById('courseInputTitle').value = course.title;
  document.getElementById('courseInputCategory').value = course.category;
  document.getElementById('courseInputIcon').value = course.icon || '🚀';
  document.getElementById('courseInputGrade').value = course.grade || 'Grade 5–10';
  document.getElementById('courseInputDuration').value = course.duration || '16 Modules • 25 Hours';
  document.getElementById('courseInputOrigPrice').value = course.originalPrice;
  document.getElementById('courseInputDiscPrice').value = course.discountPrice;
  document.getElementById('courseInputBadge').value = course.discountBadge || '';
  document.getElementById('courseInputDesc').value = course.description || '';
  document.getElementById('courseInputActive').checked = course.active;

  document.getElementById('modalCourse').classList.add('active');
}

function closeCourseModal() {
  document.getElementById('modalCourse').classList.remove('active');
}

function handleCourseFormSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('courseEditId').value;
  const title = document.getElementById('courseInputTitle').value.trim();
  const category = document.getElementById('courseInputCategory').value.trim();
  const icon = document.getElementById('courseInputIcon').value.trim() || '📘';
  const grade = document.getElementById('courseInputGrade').value.trim();
  const duration = document.getElementById('courseInputDuration').value.trim();
  const origPrice = Number(document.getElementById('courseInputOrigPrice').value) || 0;
  const discPrice = Number(document.getElementById('courseInputDiscPrice').value) || 0;
  const badge = document.getElementById('courseInputBadge').value.trim();
  const desc = document.getElementById('courseInputDesc').value.trim();
  const active = document.getElementById('courseInputActive').checked;

  if (editId) {
    // Update existing course
    const course = state.courses.find(c => c.id === editId);
    if (course) {
      course.title = title;
      course.category = category;
      course.icon = icon;
      course.grade = grade;
      course.duration = duration;
      course.originalPrice = origPrice;
      course.discountPrice = discPrice;
      course.discountBadge = badge;
      course.description = desc;
      course.active = active;
      showToast('Course updated successfully!');
    }
  } else {
    // Add new course
    const newCourse = {
      id: 'course_' + Date.now(),
      title,
      category,
      icon,
      grade,
      duration,
      originalPrice: origPrice,
      discountPrice: discPrice,
      discountBadge: badge,
      description: desc,
      active
    };
    state.courses.unshift(newCourse);
    showToast('New course created and saved!');
  }

  state.saveCourses();
  closeCourseModal();
  renderCoursesTable();
  renderDashboardMetrics();
}

function deleteCourse(courseId) {
  if (confirm('Are you sure you want to delete this course from the portal?')) {
    state.courses = state.courses.filter(c => c.id !== courseId);
    state.saveCourses();
    renderCoursesTable();
    renderDashboardMetrics();
    showToast('Course deleted.');
  }
}

// 3. Orders & Payment Approvals
function renderOrdersTable() {
  const tbody = document.getElementById('ordersTableBody');
  tbody.innerHTML = state.orders.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>
        <strong>${o.studentName}</strong>
        <div style="font-size:0.78rem; color:#64748B;">Parent: ${o.parentName || 'N/A'}</div>
      </td>
      <td>
        <div>${o.phone}</div>
        <div style="font-size:0.78rem; color:#64748B;">${o.email}</div>
      </td>
      <td><strong>${o.courseName}</strong></td>
      <td>
        <strong style="color:#0E6258;">₹${Number(o.amount).toLocaleString('en-IN')}</strong>
        <div style="font-size:0.76rem; color:#64748B;">${o.paymentMode}</div>
      </td>
      <td>
        <code style="background:#F1F5F9; padding:2px 6px; border-radius:4px; font-size:0.8rem;">${o.transactionId || 'Pending'}</code>
      </td>
      <td>
        <span class="badge-status ${o.approved ? 'badge-approved' : 'badge-pending'}">
          ${o.approved ? '✅ Approved' : '⏳ Pending Approval'}
        </span>
      </td>
      <td>
        <label class="approval-switch" title="Toggle Approval Status">
          <input type="checkbox" ${o.approved ? 'checked' : ''} onchange="toggleOrderApproval('${o.id}')">
          <span class="slider-round"></span>
        </label>
      </td>
    </tr>
  `).join('');
}

function toggleOrderApproval(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (order) {
    order.approved = !order.approved;
    state.saveOrders();
    renderOrdersTable();
    renderDashboardMetrics();
    showToast(`Order ${order.id} for "${order.studentName}" is now ${order.approved ? 'APPROVED (Access Granted)' : 'PENDING'}`);
  }
}

// 4. Users Directory
function renderUsersTable() {
  const tbody = document.getElementById('usersTableBody');
  tbody.innerHTML = state.users.map(u => `
    <tr>
      <td><strong>${u.id}</strong></td>
      <td>
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:1.2rem;">${u.source === 'Google' ? '🌐' : '✉️'}</span>
          <strong>${u.name}</strong>
        </div>
      </td>
      <td>${u.email}</td>
      <td>${u.phone || '—'}</td>
      <td>
        <span class="badge-status ${u.source === 'Google' ? 'badge-approved' : 'badge-active'}">
          ${u.source}
        </span>
      </td>
      <td>
        <div>${u.location || 'India'}</div>
        <div style="font-size:0.75rem; color:#64748B;">IP: ${u.ip || '—'}</div>
      </td>
      <td>
        <div>${u.deviceType || 'Desktop'}</div>
        <div style="font-size:0.75rem; color:#64748B;">${u.os || ''} • ${u.browser || ''}</div>
      </td>
      <td>${u.timestamp || 'Recent'}</td>
    </tr>
  `).join('');
}

// Switch Tabs
function switchAdminTab(tabName) {
  document.querySelectorAll('.admin-tab-pane').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-tab-btn').forEach(el => el.classList.remove('active'));

  const targetPane = document.getElementById('pane_' + tabName);
  const targetBtn = document.getElementById('tabBtn_' + tabName);

  if (targetPane) targetPane.classList.add('active');
  if (targetBtn) targetBtn.classList.add('active');

  // Mobile sidebar close on click
  if (window.innerWidth <= 991) {
    document.getElementById('adminSidebar').classList.remove('open');
  }
}

// Toast helper
function showToast(message) {
  let toast = document.getElementById('adminToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'adminToast';
    toast.className = 'admin-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderAuthView();

  // Login form submit
  const loginForm = document.getElementById('adminLoginForm');
  if (loginForm) loginForm.addEventListener('submit', handleLoginSubmit);

  // Mobile sidebar toggle
  const sidebarToggle = document.getElementById('btnSidebarToggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      document.getElementById('adminSidebar').classList.toggle('open');
    });
  }
});
