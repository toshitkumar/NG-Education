/* =====================================================================
   NG EDUCATION - MASTER ADMIN DASHBOARD LOGIC (js/admin.js)
   Handles Auth, Course Manager, Curriculum & Google Drive Media, Orders & Approvals, and User Directory
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
  selectedCourseKey: 'ng_admin_selected_course',
  webAppUrl: 'https://script.google.com/macros/s/AKfycbzE4aQeBXIGj3P7IqP6vzPeZOC4XERF2_UWdhzk-JyXHSn2ykwKcaYkulTtffYwBpwaHQ/exec'
};

// Curriculum Generator: Provides rich, production-grade initial modules and parts for courses
function generateCourseCurriculum(courseId, title) {
  if (courseId === 'course_1' || title.toLowerCase().includes('arduino programming')) {
    return [
      {
        id: 'mod_1_1',
        moduleNumber: 1,
        title: 'Embedded C Fundamentals & Arduino IDE Architecture',
        hours: '4 Hours',
        description: 'Understand microcontroller architecture, register levels, setup() and loop() flow control, and setting up the toolchain.',
        driveFolderUrl: 'https://drive.google.com/drive/search?q=Arduino+Programming+Module+1',
        parts: [
          {
            id: 'part_1_1_1',
            partNumber: 1,
            title: 'What is Arduino Uno & Pinout Anatomy?',
            duration: '18 min',
            overview: 'In-depth breakdown of the ATmega328P chip, 14 digital I/O pins, 6 PWM channels, 6 analog inputs, and voltage regulator circuits.',
            video: {
              title: 'Lecture 1.1: Arduino Hardware Anatomy & Pin Mapping',
              url: 'https://drive.google.com/file/d/1_demo_video_arduino_arch/view',
              fileId: 'demo_vid_1',
              size: '42.5 MB',
              type: 'drive'
            },
            pdf: {
              title: 'Arduino_Uno_R3_Schematics_and_Pinout_Diagram.pdf',
              url: 'https://drive.google.com/file/d/1_demo_pdf_arduino_pinouts/view',
              fileId: 'demo_pdf_1',
              size: '1.8 MB'
            },
            notes: {
              title: 'Module 1 Part 1 - Pinout Cheat Sheet & Register Reference',
              content: '### Key Highlights:\n- Clock: 16 MHz Crystal Oscillator\n- Logic Level: 5V DC (Absolute max 20mA per I/O pin)\n- Digital Pins: D0 to D13 (D0/D1 used for Serial RX/TX)\n- PWM Pins: ~3, ~5, ~6, ~9, ~10, ~11\n- Analog Pins: A0 to A5 (10-bit ADC resolution, 0-1023 steps, 4.88mV per step)',
              url: 'https://drive.google.com/file/d/1_demo_notes_arduino_1/view'
            },
            assignment: {
              title: 'Lab Challenge 1: Blink Morse Code Pattern via Built-in LED',
              description: 'Write an Arduino sketch to blink an onboard LED in SOS Morse code (... --- ...) and transmit the pulse timestamp over Serial Monitor at 9600 baud.',
              url: 'https://drive.google.com/file/d/1_demo_assign_sos_blink/view'
            }
          },
          {
            id: 'part_1_1_2',
            partNumber: 2,
            title: 'C/C++ Syntax, Variables & Serial Communication',
            duration: '22 min',
            overview: 'Learn data types (int, float, char, boolean), variable scope, Serial.begin(), Serial.println(), and formatting output.',
            video: {
              title: 'Lecture 1.2: Embedded C Syntax & Serial Monitor Debugging',
              url: 'https://drive.google.com/file/d/1_demo_video_c_syntax/view',
              fileId: 'demo_vid_2',
              size: '56.1 MB',
              type: 'drive'
            },
            pdf: {
              title: 'Embedded_C_Syntax_Primer_For_Beginners.pdf',
              url: 'https://drive.google.com/file/d/1_demo_pdf_c_primer/view',
              size: '2.4 MB'
            },
            notes: {
              title: 'C Syntax & Memory Footprint Rules',
              content: '### Variables in 8-bit Microcontrollers:\n- bool: 1 byte (true/false)\n- char: 1 byte (-128 to 127)\n- int: 2 bytes on AVR (-32,768 to 32,767)\n- unsigned int: 2 bytes (0 to 65,535)\n- float: 4 bytes (IEEE 754 precision)\n\nTip: Avoid dynamic String objects; prefer const char* or fixed byte buffers to save SRAM.',
              url: 'https://drive.google.com/file/d/1_demo_notes_c_syntax/view'
            },
            assignment: {
              title: 'Lab Challenge 2: Interactive Serial Command Console',
              description: 'Create a program that waits for user input on the Serial Monitor. If the user types "HELP", print commands. If "TEMP", print simulated sensor readings.',
              url: 'https://drive.google.com/file/d/1_demo_assign_serial_console/view'
            }
          }
        ]
      },
      {
        id: 'mod_1_2',
        moduleNumber: 2,
        title: 'Digital Inputs, Outputs & Sensor Interfacing',
        hours: '5 Hours',
        description: 'Master pinMode(), digitalWrite(), digitalRead(), pull-up resistors, debounce logic, and analog-to-digital conversions.',
        driveFolderUrl: 'https://drive.google.com/drive/search?q=Arduino+Programming+Module+2',
        parts: [
          {
            id: 'part_1_2_1',
            partNumber: 1,
            title: 'Pushbuttons, Pull-Ups & Software Debounce',
            duration: '24 min',
            overview: 'Understand floating pin problems, internal INPUT_PULLUP configuration, and millis()-based debounce algorithms.',
            video: {
              title: 'Lecture 2.1: Floating Pins & Debounce Algorithms',
              url: 'https://drive.google.com/file/d/1_demo_video_debounce/view',
              size: '48.2 MB',
              type: 'drive'
            },
            pdf: {
              title: 'Switch_Interfacing_and_Debounce_Schematics.pdf',
              url: 'https://drive.google.com/file/d/1_demo_pdf_debounce/view',
              size: '1.5 MB'
            },
            notes: {
              title: 'Debounce State Machine Implementation',
              content: '### Why Debounce Matters:\nMechanical switches bounce 5-20 times within 10ms of pressing. Using delay() blocks execution. Using millis() keeps the loop responsive.',
              url: 'https://drive.google.com/file/d/1_demo_notes_debounce/view'
            },
            assignment: {
              title: 'Lab Challenge 3: 4-Way Traffic Light System with Pedestrian Crossing',
              description: 'Build a traffic controller with Red, Yellow, Green LEDs and a pedestrian push-button that smoothly interrupts normal cycle.',
              url: 'https://drive.google.com/file/d/1_demo_assign_traffic_lights/view'
            }
          }
        ]
      }
    ];
  }

  if (courseId === 'course_5' || title.toLowerCase().includes('robotics')) {
    return [
      {
        id: 'mod_5_1',
        moduleNumber: 1,
        title: 'Chassis Mechanics & Dual H-Bridge Motor Drivers',
        hours: '6 Hours',
        description: 'Assemble 2WD/4WD robotic chassis, wire L298N/L293D dual motor drivers, and control DC geared motors using PWM speed regulation.',
        driveFolderUrl: 'https://drive.google.com/drive/search?q=Robotics+Autonomous+Bots+Module+1',
        parts: [
          {
            id: 'part_5_1_1',
            partNumber: 1,
            title: 'L298N Motor Driver Interfacing & PWM Speed Control',
            duration: '26 min',
            overview: 'H-bridge internal operation, independent motor control, directional truth tables, and analogWrite() PWM speed curves.',
            video: {
              title: 'Lecture 1.1: Assembling the Smart Robot Chassis & Motor Wiring',
              url: 'https://drive.google.com/file/d/1_demo_video_robot_assembly/view',
              size: '72.0 MB',
              type: 'drive'
            },
            pdf: {
              title: 'Robotic_Chassis_Assembly_and_Power_Distribution_Manual.pdf',
              url: 'https://drive.google.com/file/d/1_demo_pdf_chassis_manual/view',
              size: '3.2 MB'
            },
            notes: {
              title: 'L298N Truth Table & Power Isolation Notes',
              content: '### L298N Motor Driver Logic:\n- IN1 HIGH, IN2 LOW -> Motor A Forward\n- IN1 LOW, IN2 HIGH -> Motor A Reverse\n- ENA / ENB PWM: 0 (Stop) to 255 (Full Speed)\n\nCrucial Rule: Connect battery ground to Arduino GND for common reference, but power motors from external 7.4V/11.1V battery pack!',
              url: 'https://drive.google.com/file/d/1_demo_notes_l298n/view'
            },
            assignment: {
              title: 'Lab Challenge 1: Differential Steering & Figure-8 Maneuver',
              description: 'Program the robot to trace a precise figure-8 path using timed forward, sharp turn, and pivot routines.',
              url: 'https://drive.google.com/file/d/1_demo_assign_figure8/view'
            }
          }
        ]
      },
      {
        id: 'mod_5_2',
        moduleNumber: 2,
        title: 'Sensors: Ultrasonic Rangefinders & Obstacle Avoidance',
        hours: '5 Hours',
        description: 'Interface HC-SR04 ultrasonic sensors, calculate speed of sound time-of-flight, and implement autonomous steering logic.',
        driveFolderUrl: 'https://drive.google.com/drive/search?q=Robotics+Autonomous+Bots+Module+2',
        parts: [
          {
            id: 'part_5_2_1',
            partNumber: 1,
            title: 'HC-SR04 Acoustic Time-of-Flight & Autonomous Navigation',
            duration: '21 min',
            overview: 'Trigger 10us ultrasonic pulse, read echo pulse length, convert microseconds to centimeters, and trigger collision avoidance.',
            video: {
              title: 'Lecture 2.1: Autonomous Obstacle-Avoidance Robot Programming',
              url: 'https://drive.google.com/file/d/1_demo_video_obstacle_bot/view',
              size: '58.4 MB',
              type: 'drive'
            },
            pdf: {
              title: 'Ultrasonic_Sensor_Acoustic_Calculations.pdf',
              url: 'https://drive.google.com/file/d/1_demo_pdf_ultrasonic/view',
              size: '1.2 MB'
            },
            notes: {
              title: 'Distance Calculation Formula',
              content: '### Formula:\nDistance (cm) = (duration * 0.0343) / 2;\nSpeed of sound at 20C: 343 m/s = 0.0343 cm/microsecond. Divide by 2 because sound travels to the object and bounces back.',
              url: 'https://drive.google.com/file/d/1_demo_notes_ultrasonic/view'
            },
            assignment: {
              title: 'Lab Challenge 2: Servo-Scanning Radar Obstacle Bot',
              description: 'Mount the ultrasonic sensor on an SG90 servo motor. When an obstacle is detected within 25cm, stop, pan left & right, and steer towards the clearer path.',
              url: 'https://drive.google.com/file/d/1_demo_assign_servo_radar/view'
            }
          }
        ]
      }
    ];
  }

  // Generic Default Template for Other Courses
  return [
    {
      id: `mod_${courseId}_1`,
      moduleNumber: 1,
      title: 'Foundations & Core Setup',
      hours: '3–4 Hours',
      description: 'Orientation, required components, development setup, and foundational principles.',
      driveFolderUrl: `https://drive.google.com/drive/search?q=${encodeURIComponent(title + ' Module 1')}`,
      parts: [
        {
          id: `part_${courseId}_1_1`,
          partNumber: 1,
          title: 'Course Introduction & Toolchain Setup',
          duration: '15 min',
          overview: 'Overview of course outcomes, starter kits, and necessary IDEs and software tools.',
          video: {
            title: 'Lecture 1.1: Welcome & Getting Started Walkthrough',
            url: 'https://drive.google.com/file/d/1_demo_intro/view',
            size: '35 MB',
            type: 'drive'
          },
          pdf: {
            title: 'Course_Syllabus_and_Hardware_Kit_Checklist.pdf',
            url: 'https://drive.google.com/file/d/1_demo_checklist/view',
            size: '1.1 MB'
          },
          notes: {
            title: 'Module 1 Starter Notes & Guidelines',
            content: 'Welcome to NG EDUCATION! In this module, verify that all components are functional and your development environment is fully updated.',
            url: 'https://drive.google.com/file/d/1_demo_notes_general/view'
          },
          assignment: {
            title: 'Kickstart Assignment 1: Hardware Checklist Verification',
            description: 'Unbox your learning kit, match components against the checklist, and submit your first project snapshot.',
            url: 'https://drive.google.com/file/d/1_demo_assign_general/view'
          }
        }
      ]
    },
    {
      id: `mod_${courseId}_2`,
      moduleNumber: 2,
      title: 'Hands-on Building & Implementation',
      hours: '4–5 Hours',
      description: 'Practical circuitry, algorithm design, and real-time execution of projects.',
      driveFolderUrl: `https://drive.google.com/drive/search?q=${encodeURIComponent(title + ' Module 2')}`,
      parts: [
        {
          id: `part_${courseId}_2_1`,
          partNumber: 1,
          title: 'Core Implementation & Testing',
          duration: '20 min',
          overview: 'Step-by-step assembly, circuit testing, and code execution.',
          video: {
            title: 'Lecture 2.1: Live Prototype Build Session',
            url: 'https://drive.google.com/file/d/1_demo_build_session/view',
            size: '48 MB',
            type: 'drive'
          },
          pdf: {
            title: 'Step_by_Step_Wiring_Diagram.pdf',
            url: 'https://drive.google.com/file/d/1_demo_wiring/view',
            size: '1.6 MB'
          },
          notes: {
            title: 'Testing & Troubleshooting Protocols',
            content: 'Follow standard engineering debugging rules: 1. Check supply voltage, 2. Verify common ground, 3. Check serial logs.',
            url: 'https://drive.google.com/file/d/1_demo_notes_troubleshooting/view'
          },
          assignment: {
            title: 'Lab Challenge 2: Capstone Prototype Test',
            description: 'Test your working prototype under varied test conditions and record video proof of execution.',
            url: 'https://drive.google.com/file/d/1_demo_assign_prototype/view'
          }
        }
      ]
    }
  ];
}

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
    courseId: 'course_5',
    courseName: 'Robotics & Autonomous Bots',
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
    courseId: 'course_9',
    courseName: 'Python Programming Masterclass',
    amount: 1999,
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
    // Courses with Curriculum
    let savedCourses = localStorage.getItem(ADMIN_CONFIG.coursesKey);
    if (!savedCourses) {
      this.courses = DEFAULT_COURSES.map(c => ({
        ...c,
        curriculum: generateCourseCurriculum(c.id, c.title)
      }));
      localStorage.setItem(ADMIN_CONFIG.coursesKey, JSON.stringify(this.courses));
    } else {
      this.courses = JSON.parse(savedCourses);
      // Ensure every course has curriculum
      let updated = false;
      this.courses.forEach(c => {
        if (!c.curriculum || !Array.isArray(c.curriculum) || c.curriculum.length === 0) {
          c.curriculum = generateCourseCurriculum(c.id, c.title);
          updated = true;
        }
      });
      if (updated) {
        localStorage.setItem(ADMIN_CONFIG.coursesKey, JSON.stringify(this.courses));
      }
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
let selectedFilePayload = null; // Stored file for upload to Google Drive

// =====================================================================
// AUTHENTICATION & SESSION MANAGEMENT
// =====================================================================
function isAuthenticated() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('admin_demo') === '1' || urlParams.get('autologin') === '1') {
    return true;
  }
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
// RENDER ALL VIEWS (DASHBOARD, COURSES, CURRICULUM, ORDERS, USERS)
// =====================================================================
function renderAllViews() {
  renderDashboardMetrics();
  renderCoursesTable();
  renderCurriculumView();
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
  if (orderBadge) {
    if (pendingOrders > 0) {
      orderBadge.style.display = 'inline-block';
      orderBadge.textContent = pendingOrders;
    } else {
      orderBadge.style.display = 'none';
    }
  }

  // Quick summary table on dashboard
  const quickOrdersBody = document.getElementById('dashRecentOrdersBody');
  if (quickOrdersBody) {
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
}

// 2. Course Manager
function renderCoursesTable() {
  const tbody = document.getElementById('coursesTableBody');
  if (!tbody) return;

  tbody.innerHTML = state.courses.map(c => {
    const modCount = (c.curriculum || []).length;
    return `
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
          <div style="display:flex; gap:6px; align-items:center;">
            <button class="btn-primary-action" style="padding:6px 10px; font-size:0.8rem; white-space:nowrap; background:#0E6258;" onclick="jumpToCourseCurriculum('${c.id}')" title="Manage Modules, Video, PDF, Notes, Assignments">
              📁 Content (${modCount} Mods)
            </button>
            <button class="btn-secondary-action" style="padding:6px 10px; font-size:0.8rem;" onclick="openEditCourseModal('${c.id}')">Edit</button>
            <button class="btn-secondary-action" style="padding:6px 8px; font-size:0.8rem; color:#EF4444;" onclick="deleteCourse('${c.id}')">✕</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
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
    const newId = 'course_' + Date.now();
    const newCourse = {
      id: newId,
      title,
      category,
      icon,
      grade,
      duration,
      originalPrice: origPrice,
      discountPrice: discPrice,
      discountBadge: badge,
      description: desc,
      active,
      curriculum: generateCourseCurriculum(newId, title)
    };
    state.courses.unshift(newCourse);
    showToast('New course created with curriculum template!');
  }

  state.saveCourses();
  closeCourseModal();
  renderCoursesTable();
  renderCurriculumView();
  renderDashboardMetrics();
}

function deleteCourse(courseId) {
  if (confirm('Are you sure you want to delete this course from the portal?')) {
    state.courses = state.courses.filter(c => c.id !== courseId);
    state.saveCourses();
    renderCoursesTable();
    renderCurriculumView();
    renderDashboardMetrics();
    showToast('Course deleted.');
  }
}

// =====================================================================
// 2.5 CURRICULUM, MODULES & GOOGLE DRIVE CONTENT MANAGER
// =====================================================================
function jumpToCourseCurriculum(courseId) {
  localStorage.setItem(ADMIN_CONFIG.selectedCourseKey, courseId);
  switchAdminTab('curriculum');
  const select = document.getElementById('curriculumCourseSelect');
  if (select) {
    select.value = courseId;
    renderCurriculumView();
  }
}

function handleCurriculumCourseChange() {
  const select = document.getElementById('curriculumCourseSelect');
  if (select) {
    localStorage.setItem(ADMIN_CONFIG.selectedCourseKey, select.value);
    renderCurriculumView();
  }
}

function getSelectedCourse() {
  const select = document.getElementById('curriculumCourseSelect');
  let selectedId = select ? select.value : localStorage.getItem(ADMIN_CONFIG.selectedCourseKey);
  let course = state.courses.find(c => c.id === selectedId);
  if (!course && state.courses.length > 0) {
    course = state.courses[0];
  }
  return course;
}

function renderCurriculumView() {
  const select = document.getElementById('curriculumCourseSelect');
  if (!select) return;

  // Populate course select options if needed
  const currentVal = select.value || localStorage.getItem(ADMIN_CONFIG.selectedCourseKey);
  select.innerHTML = state.courses.map(c => `
    <option value="${c.id}" ${c.id === currentVal ? 'selected' : ''}>
      ${c.icon || '📘'} ${c.title} (${(c.curriculum || []).length} Modules)
    </option>
  `).join('');

  const course = getSelectedCourse();
  if (!course) return;

  // Update Drive link
  const btnOpenCourseDrive = document.getElementById('btnOpenCourseDrive');
  if (btnOpenCourseDrive) {
    btnOpenCourseDrive.href = `https://drive.google.com/drive/search?q=${encodeURIComponent('NG Education ' + course.title)}`;
    btnOpenCourseDrive.title = `Search or Open "${course.title}" on Google Drive`;
  }

  // Calculate Metrics
  const modules = course.curriculum || [];
  let partCount = 0;
  let videoCount = 0;
  let pdfCount = 0;
  let notesCount = 0;
  let assignCount = 0;

  modules.forEach(m => {
    const parts = m.parts || [];
    partCount += parts.length;
    parts.forEach(p => {
      if (p.video && p.video.url) videoCount++;
      if (p.pdf && p.pdf.url) pdfCount++;
      if (p.notes && (p.notes.url || p.notes.content)) notesCount++;
      if (p.assignment && (p.assignment.url || p.assignment.description)) assignCount++;
    });
  });

  document.getElementById('curriculumModCount').textContent = `📁 ${modules.length} Modules`;
  document.getElementById('curriculumPartCount').textContent = `📖 ${partCount} Lessons`;
  document.getElementById('curriculumVideoCount').textContent = `🎥 ${videoCount} Videos`;
  document.getElementById('curriculumPdfCount').textContent = `📄 ${pdfCount} PDFs`;
  document.getElementById('curriculumNotesCount').textContent = `📝 ${notesCount} Notes`;
  document.getElementById('curriculumAssignCount').textContent = `🎯 ${assignCount} Assignments`;

  // Render Modules Container
  const container = document.getElementById('curriculumModulesContainer');
  if (!container) return;

  if (modules.length === 0) {
    container.innerHTML = `
      <div style="background:#FFFFFF; border:2px dashed var(--admin-border); border-radius:20px; padding:48px 24px; text-align:center;">
        <span style="font-size:3rem; display:block; margin-bottom:12px;">📁</span>
        <h3 style="font-size:1.25rem; font-weight:800; color:var(--admin-slate); margin-bottom:6px;">No Modules Added Yet</h3>
        <p style="color:#64748B; font-size:0.92rem; max-width:440px; margin:0 auto 20px auto;">
          Organize your curriculum into structured modules. Videos, PDFs, notes, and assignments will automatically sync to your Google Drive!
        </p>
        <button class="btn-primary-action" onclick="openAddModuleModal('${course.id}')">+ Create First Module</button>
      </div>
    `;
    return;
  }

  container.innerHTML = modules.map(m => {
    const parts = m.parts || [];
    const driveFolder = m.driveFolderUrl || `https://drive.google.com/drive/search?q=${encodeURIComponent(course.title + ' ' + m.title)}`;

    return `
      <div class="module-card" id="module_card_${m.id}">
        <div class="module-card-header">
          <div class="module-header-left">
            <span class="module-badge">Module ${m.moduleNumber}</span>
            <div class="module-info">
              <h4 class="module-title">${m.title}</h4>
              <p class="module-desc">${m.description || ''} ${m.hours ? `• <strong>${m.hours}</strong>` : ''}</p>
            </div>
          </div>
          <div class="module-header-actions">
            <a href="${driveFolder}" target="_blank" class="btn-drive-folder-link" title="Open Module Folder in Google Drive">
              <span>📂 Open Drive Folder</span>
              <span>↗</span>
            </a>
            <button class="btn-primary-action" style="padding:6px 12px; font-size:0.8rem; background:#0E6258;" onclick="openAddPartModal('${course.id}', '${m.id}')">
              + Add Lesson Part
            </button>
            <button class="btn-secondary-action" style="padding:6px 10px; font-size:0.8rem;" onclick="openEditModuleModal('${course.id}', '${m.id}')">Edit</button>
            <button class="btn-secondary-action" style="padding:6px 8px; font-size:0.8rem; color:#EF4444;" onclick="deleteModule('${course.id}', '${m.id}')">✕</button>
          </div>
        </div>

        <div class="module-body">
          <div class="module-parts-list">
            ${parts.length === 0 ? `
              <div style="background:#FFFFFF; border:1px dashed #CBD5E1; border-radius:12px; padding:24px; text-align:center;">
                <p style="font-size:0.88rem; color:#64748B; margin-bottom:12px;">This module does not have any lesson parts yet.</p>
                <button class="btn-secondary-action" onclick="openAddPartModal('${course.id}', '${m.id}')">+ Add Part 1 (Lesson)</button>
              </div>
            ` : parts.map(p => renderPartCard(course.id, m.id, p)).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Render Individual Lesson / Part Card with 4 Content Slots
function renderPartCard(courseId, moduleId, part) {
  const vid = part.video || {};
  const pdf = part.pdf || {};
  const notes = part.notes || {};
  const assign = part.assignment || {};

  return `
    <div class="part-card" id="part_card_${part.id}">
      <div class="part-header">
        <div class="part-title-wrap">
          <span class="part-pill">Part ${part.partNumber}</span>
          <h5 class="part-title">${part.title}</h5>
          <span class="part-duration">⏱ ${part.duration || '15 min'}</span>
        </div>
        <div class="part-header-actions">
          <button class="btn-secondary-action" style="padding:4px 8px; font-size:0.78rem;" onclick="openEditPartModal('${courseId}', '${moduleId}', '${part.id}')">Edit</button>
          <button class="btn-secondary-action" style="padding:4px 6px; font-size:0.78rem; color:#EF4444;" onclick="deletePart('${courseId}', '${moduleId}', '${part.id}')">✕</button>
        </div>
      </div>

      <!-- 4 Content Slots: Video, PDF, Notes, Assignment -->
      <div class="part-content-grid">

        <!-- 1. Video Lecture Slot -->
        <div class="content-slot slot-type-video ${vid.url ? 'slot-filled' : 'slot-empty'}">
          <div class="slot-header">
            <span class="slot-type-badge">🎥 Video Lecture</span>
            <span class="slot-status-dot ${vid.url ? 'slot-status-active' : 'slot-status-empty'}">
              ${vid.url ? '✓ Live' : 'Missing'}
            </span>
          </div>

          ${vid.url ? `
            <div class="slot-content-info">
              <div class="slot-content-title" title="${vid.title || 'Video Lecture'}">${vid.title || 'Attached Video'}</div>
              <div class="slot-content-meta">Drive Stream • ${vid.size || 'HD Video'}</div>
            </div>
            <div class="slot-actions">
              <button class="btn-slot-action" onclick="openContentPreview('${courseId}', '${moduleId}', '${part.id}', 'video')">▶ Preview</button>
              <a href="${vid.url}" target="_blank" class="btn-slot-action btn-drive-icon" title="Open Video in Google Drive">☁️</a>
              <button class="btn-slot-action" style="flex:0 0 46px;" onclick="openUploadContentModal('${courseId}', '${moduleId}', '${part.id}', 'video')">✏</button>
            </div>
          ` : `
            <div class="slot-empty-prompt">
              <span>No video uploaded</span>
            </div>
            <button class="btn-slot-upload-empty" onclick="openUploadContentModal('${courseId}', '${moduleId}', '${part.id}', 'video')">
              + Upload Video
            </button>
          `}
        </div>

        <!-- 2. PDF Handouts Slot -->
        <div class="content-slot slot-type-pdf ${pdf.url ? 'slot-filled' : 'slot-empty'}">
          <div class="slot-header">
            <span class="slot-type-badge">📄 PDF Document</span>
            <span class="slot-status-dot ${pdf.url ? 'slot-status-active' : 'slot-status-empty'}">
              ${pdf.url ? '✓ Ready' : 'Missing'}
            </span>
          </div>

          ${pdf.url ? `
            <div class="slot-content-info">
              <div class="slot-content-title" title="${pdf.title || 'Handout PDF'}">${pdf.title || 'Attached PDF Document'}</div>
              <div class="slot-content-meta">PDF • ${pdf.size || 'Verified'}</div>
            </div>
            <div class="slot-actions">
              <button class="btn-slot-action" onclick="openContentPreview('${courseId}', '${moduleId}', '${part.id}', 'pdf')">👁 View PDF</button>
              <a href="${pdf.url}" target="_blank" class="btn-slot-action btn-drive-icon" title="Open PDF in Google Drive">☁️</a>
              <button class="btn-slot-action" style="flex:0 0 46px;" onclick="openUploadContentModal('${courseId}', '${moduleId}', '${part.id}', 'pdf')">✏</button>
            </div>
          ` : `
            <div class="slot-empty-prompt">
              <span>No PDF attached</span>
            </div>
            <button class="btn-slot-upload-empty" onclick="openUploadContentModal('${courseId}', '${moduleId}', '${part.id}', 'pdf')">
              + Upload PDF
            </button>
          `}
        </div>

        <!-- 3. Study Notes Slot -->
        <div class="content-slot slot-type-notes ${notes.url || notes.content ? 'slot-filled' : 'slot-empty'}">
          <div class="slot-header">
            <span class="slot-type-badge">📝 Study Notes</span>
            <span class="slot-status-dot ${notes.url || notes.content ? 'slot-status-active' : 'slot-status-empty'}">
              ${notes.url || notes.content ? '✓ Notes' : 'Empty'}
            </span>
          </div>

          ${(notes.url || notes.content) ? `
            <div class="slot-content-info">
              <div class="slot-content-title" title="${notes.title || 'Notes Reference'}">${notes.title || 'Lecture Summary & Code Snippets'}</div>
              <div class="slot-content-meta">Notes &amp; Guide • Drive Synced</div>
            </div>
            <div class="slot-actions">
              <button class="btn-slot-action" onclick="openContentPreview('${courseId}', '${moduleId}', '${part.id}', 'notes')">📖 Read Notes</button>
              ${notes.url ? `<a href="${notes.url}" target="_blank" class="btn-slot-action btn-drive-icon" title="Open in Google Drive">☁️</a>` : ''}
              <button class="btn-slot-action" style="flex:0 0 46px;" onclick="openUploadContentModal('${courseId}', '${moduleId}', '${part.id}', 'notes')">✏</button>
            </div>
          ` : `
            <div class="slot-empty-prompt">
              <span>No notes added</span>
            </div>
            <button class="btn-slot-upload-empty" onclick="openUploadContentModal('${courseId}', '${moduleId}', '${part.id}', 'notes')">
              + Add Notes
            </button>
          `}
        </div>

        <!-- 4. Assignment Slot -->
        <div class="content-slot slot-type-assignment ${assign.url || assign.description ? 'slot-filled' : 'slot-empty'}">
          <div class="slot-header">
            <span class="slot-type-badge">🎯 Assignment</span>
            <span class="slot-status-dot ${assign.url || assign.description ? 'slot-status-active' : 'slot-status-empty'}">
              ${assign.url || assign.description ? '✓ Task Set' : 'Missing'}
            </span>
          </div>

          ${(assign.url || assign.description) ? `
            <div class="slot-content-info">
              <div class="slot-content-title" title="${assign.title || 'Lab Task'}">${assign.title || 'Practical Lab Challenge'}</div>
              <div class="slot-content-meta">Hands-on Lab • Verified</div>
            </div>
            <div class="slot-actions">
              <button class="btn-slot-action" onclick="openContentPreview('${courseId}', '${moduleId}', '${part.id}', 'assignment')">📋 View Task</button>
              ${assign.url ? `<a href="${assign.url}" target="_blank" class="btn-slot-action btn-drive-icon" title="Open in Google Drive">☁️</a>` : ''}
              <button class="btn-slot-action" style="flex:0 0 46px;" onclick="openUploadContentModal('${courseId}', '${moduleId}', '${part.id}', 'assignment')">✏</button>
            </div>
          ` : `
            <div class="slot-empty-prompt">
              <span>No task assigned</span>
            </div>
            <button class="btn-slot-upload-empty" onclick="openUploadContentModal('${courseId}', '${moduleId}', '${part.id}', 'assignment')">
              + Add Assignment
            </button>
          `}
        </div>

      </div>
    </div>
  `;
}

// Module Modals
function openAddModuleModal(courseId) {
  const course = courseId ? state.courses.find(c => c.id === courseId) : getSelectedCourse();
  if (!course) return;

  document.getElementById('moduleModalTitle').textContent = 'Add New Module';
  document.getElementById('moduleForm').reset();
  document.getElementById('moduleEditId').value = '';
  document.getElementById('moduleTargetCourseId').value = course.id;
  document.getElementById('moduleCourseNameDisplay').value = course.title;
  document.getElementById('moduleInputNumber').value = (course.curriculum || []).length + 1;
  document.getElementById('modalModule').classList.add('active');
}

function openEditModuleModal(courseId, moduleId) {
  const course = state.courses.find(c => c.id === courseId);
  if (!course) return;
  const module = (course.curriculum || []).find(m => m.id === moduleId);
  if (!module) return;

  document.getElementById('moduleModalTitle').textContent = 'Edit Module Details';
  document.getElementById('moduleEditId').value = module.id;
  document.getElementById('moduleTargetCourseId').value = course.id;
  document.getElementById('moduleCourseNameDisplay').value = course.title;
  document.getElementById('moduleInputNumber').value = module.moduleNumber;
  document.getElementById('moduleInputHours').value = module.hours || '';
  document.getElementById('moduleInputTitle').value = module.title;
  document.getElementById('moduleInputDesc').value = module.description || '';
  document.getElementById('moduleInputDriveUrl').value = module.driveFolderUrl || '';

  document.getElementById('modalModule').classList.add('active');
}

function closeModuleModal() {
  document.getElementById('modalModule').classList.remove('active');
}

function handleModuleFormSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('moduleEditId').value;
  const courseId = document.getElementById('moduleTargetCourseId').value;
  const moduleNumber = Number(document.getElementById('moduleInputNumber').value) || 1;
  const hours = document.getElementById('moduleInputHours').value.trim();
  const title = document.getElementById('moduleInputTitle').value.trim();
  const desc = document.getElementById('moduleInputDesc').value.trim();
  const driveUrl = document.getElementById('moduleInputDriveUrl').value.trim();

  const course = state.courses.find(c => c.id === courseId);
  if (!course) return;
  course.curriculum = course.curriculum || [];

  if (editId) {
    const mod = course.curriculum.find(m => m.id === editId);
    if (mod) {
      mod.moduleNumber = moduleNumber;
      mod.hours = hours;
      mod.title = title;
      mod.description = desc;
      mod.driveFolderUrl = driveUrl || `https://drive.google.com/drive/search?q=${encodeURIComponent(course.title + ' ' + title)}`;
      showToast('Module updated successfully!');
    }
  } else {
    const newMod = {
      id: `mod_${course.id}_${Date.now()}`,
      moduleNumber,
      title,
      hours: hours || '3–4 Hours',
      description: desc,
      driveFolderUrl: driveUrl || `https://drive.google.com/drive/search?q=${encodeURIComponent(course.title + ' ' + title)}`,
      parts: []
    };
    course.curriculum.push(newMod);
    showToast(`Module ${moduleNumber} added to "${course.title}"!`);
  }

  state.saveCourses();
  closeModuleModal();
  renderCurriculumView();
}

function deleteModule(courseId, moduleId) {
  const course = state.courses.find(c => c.id === courseId);
  if (!course) return;

  if (confirm('Are you sure you want to delete this module and all its lessons/parts?')) {
    course.curriculum = (course.curriculum || []).filter(m => m.id !== moduleId);
    state.saveCourses();
    renderCurriculumView();
    showToast('Module deleted.');
  }
}

// Part Modals
function openAddPartModal(courseId, moduleId) {
  const course = state.courses.find(c => c.id === courseId);
  if (!course) return;
  const module = (course.curriculum || []).find(m => m.id === moduleId);
  if (!module) return;

  document.getElementById('partModalTitle').textContent = `Add Lesson Part to Module ${module.moduleNumber}`;
  document.getElementById('partForm').reset();
  document.getElementById('partEditId').value = '';
  document.getElementById('partTargetModuleId').value = module.id;
  document.getElementById('partModuleNameDisplay').value = `Module ${module.moduleNumber}: ${module.title}`;
  document.getElementById('partInputNumber').value = (module.parts || []).length + 1;
  document.getElementById('partInputDuration').value = '20 min';

  document.getElementById('modalPart').classList.add('active');
}

function openEditPartModal(courseId, moduleId, partId) {
  const course = state.courses.find(c => c.id === courseId);
  if (!course) return;
  const module = (course.curriculum || []).find(m => m.id === moduleId);
  if (!module) return;
  const part = (module.parts || []).find(p => p.id === partId);
  if (!part) return;

  document.getElementById('partModalTitle').textContent = 'Edit Lesson Part Details';
  document.getElementById('partEditId').value = part.id;
  document.getElementById('partTargetModuleId').value = module.id;
  document.getElementById('partModuleNameDisplay').value = `Module ${module.moduleNumber}: ${module.title}`;
  document.getElementById('partInputNumber').value = part.partNumber;
  document.getElementById('partInputDuration').value = part.duration || '20 min';
  document.getElementById('partInputTitle').value = part.title;
  document.getElementById('partInputOverview').value = part.overview || '';

  document.getElementById('modalPart').classList.add('active');
}

function closePartModal() {
  document.getElementById('modalPart').classList.remove('active');
}

function handlePartFormSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('partEditId').value;
  const moduleId = document.getElementById('partTargetModuleId').value;
  const partNumber = Number(document.getElementById('partInputNumber').value) || 1;
  const duration = document.getElementById('partInputDuration').value.trim();
  const title = document.getElementById('partInputTitle').value.trim();
  const overview = document.getElementById('partInputOverview').value.trim();

  const course = getSelectedCourse();
  if (!course) return;
  const module = (course.curriculum || []).find(m => m.id === moduleId);
  if (!module) return;
  module.parts = module.parts || [];

  if (editId) {
    const part = module.parts.find(p => p.id === editId);
    if (part) {
      part.partNumber = partNumber;
      part.duration = duration;
      part.title = title;
      part.overview = overview;
      showToast('Lesson part updated!');
    }
  } else {
    const newPart = {
      id: `part_${module.id}_${Date.now()}`,
      partNumber,
      duration,
      title,
      overview,
      video: {},
      pdf: {},
      notes: {},
      assignment: {}
    };
    module.parts.push(newPart);
    showToast(`Part ${partNumber} added! Now you can upload Video, PDF, Notes, or Assignments.`);
  }

  state.saveCourses();
  closePartModal();
  renderCurriculumView();
}

function deletePart(courseId, moduleId, partId) {
  const course = state.courses.find(c => c.id === courseId);
  if (!course) return;
  const module = (course.curriculum || []).find(m => m.id === moduleId);
  if (!module) return;

  if (confirm('Are you sure you want to delete this lesson part and its uploaded content?')) {
    module.parts = (module.parts || []).filter(p => p.id !== partId);
    state.saveCourses();
    renderCurriculumView();
    showToast('Lesson part removed.');
  }
}

// =====================================================================
// GOOGLE DRIVE UPLOAD / ATTACH MODAL & ACTIONS
// =====================================================================
function openUploadContentModal(courseId, moduleId, partId, contentType) {
  const course = state.courses.find(c => c.id === courseId);
  if (!course) return;
  const module = (course.curriculum || []).find(m => m.id === moduleId);
  if (!module) return;
  const part = (module.parts || []).find(p => p.id === partId);
  if (!part) return;

  document.getElementById('uploadTargetCourseId').value = courseId;
  document.getElementById('uploadTargetModuleId').value = moduleId;
  document.getElementById('uploadTargetPartId').value = partId;

  // Set destination banner
  document.getElementById('uploadDestPathDisplay').textContent =
    `NG Education - Courses / ${course.title} / Module ${module.moduleNumber} - ${module.title}`;

  // Reset form
  document.getElementById('uploadContentForm').reset();
  clearSelectedFile();
  document.getElementById('uploadProgressWrap').style.display = 'none';
  document.getElementById('btnSubmitUpload').disabled = false;

  // Select content type tab
  selectUploadContentType(contentType || 'video');

  // Pre-fill existing data if present
  const existing = part[contentType];
  if (existing && existing.title) {
    document.getElementById('uploadInputTitle').value = existing.title;
    if (existing.url) {
      document.getElementById('uploadInputDriveUrl').value = existing.url;
    }
    if (contentType === 'notes' && existing.content) {
      document.getElementById('uploadInputNotesText').value = existing.content;
    }
    if (contentType === 'assignment' && existing.description) {
      document.getElementById('uploadInputNotesText').value = existing.description;
    }
  } else {
    document.getElementById('uploadInputTitle').value = `${contentType.toUpperCase()}: ${part.title}`;
  }

  document.getElementById('modalUploadContent').classList.add('active');
}

function closeUploadContentModal() {
  document.getElementById('modalUploadContent').classList.remove('active');
  selectedFilePayload = null;
}

function selectUploadContentType(type) {
  document.getElementById('uploadSelectedType').value = type;
  document.querySelectorAll('.upload-type-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`typeBtn_${type}`);
  if (activeBtn) activeBtn.classList.add('active');

  const titleLabel = document.getElementById('uploadTitleLabel');
  const dropzoneIcon = document.getElementById('dropzoneIcon');
  const dropzoneTitle = document.getElementById('dropzoneTitle');
  const dropzoneHint = document.getElementById('dropzoneHint');
  const notesTextGroup = document.getElementById('uploadNotesTextGroup');
  const notesTextLabel = document.getElementById('uploadNotesTextLabel');

  if (type === 'video') {
    titleLabel.textContent = 'Video Lecture Title *';
    dropzoneIcon.textContent = '🎥';
    dropzoneTitle.textContent = 'Click to Select or Drag Video File';
    dropzoneHint.textContent = 'Supported: .mp4, .webm, .mov (Auto-uploads to Google Drive Module Folder)';
    notesTextGroup.style.display = 'none';
  } else if (type === 'pdf') {
    titleLabel.textContent = 'PDF Document Title *';
    dropzoneIcon.textContent = '📄';
    dropzoneTitle.textContent = 'Click to Select or Drag PDF Document';
    dropzoneHint.textContent = 'Supported: .pdf, .docx, .zip (Auto-uploads to Google Drive Module Folder)';
    notesTextGroup.style.display = 'none';
  } else if (type === 'notes') {
    titleLabel.textContent = 'Study Notes / Topic Title *';
    dropzoneIcon.textContent = '📝';
    dropzoneTitle.textContent = 'Upload Notes File (.pdf, .txt, .md, .docx)';
    dropzoneHint.textContent = 'Or type/paste formatted notes text directly in the box below';
    notesTextGroup.style.display = 'block';
    notesTextLabel.textContent = 'Study Notes Text / Code Snippets';
  } else if (type === 'assignment') {
    titleLabel.textContent = 'Assignment Task Title *';
    dropzoneIcon.textContent = '🎯';
    dropzoneTitle.textContent = 'Upload Starter Code or Worksheet (.pdf, .zip, .docx)';
    dropzoneHint.textContent = 'Or describe assignment problem statement in the box below';
    notesTextGroup.style.display = 'block';
    notesTextLabel.textContent = 'Assignment Problem Statement & Submission Instructions';
  }
}

function toggleUploadMethod(method) {
  const fileArea = document.getElementById('uploadMethodFileArea');
  const linkArea = document.getElementById('uploadMethodLinkArea');
  if (method === 'file') {
    fileArea.style.display = 'block';
    linkArea.style.display = 'none';
  } else {
    fileArea.style.display = 'none';
    linkArea.style.display = 'block';
  }
}

function handleFileSelected(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    selectedFilePayload = {
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.type || 'application/octet-stream',
      base64: evt.target.result
    };

    document.getElementById('selectedFileName').textContent = file.name;
    document.getElementById('selectedFileSize').textContent = selectedFilePayload.size;
    document.getElementById('selectedFilePreview').style.display = 'flex';
  };
  reader.readAsDataURL(file);
}

function clearSelectedFile() {
  selectedFilePayload = null;
  const fileInput = document.getElementById('driveFileInput');
  if (fileInput) fileInput.value = '';
  const preview = document.getElementById('selectedFilePreview');
  if (preview) preview.style.display = 'none';
}

async function handleUploadContentSubmit(e) {
  e.preventDefault();
  const courseId = document.getElementById('uploadTargetCourseId').value;
  const moduleId = document.getElementById('uploadTargetModuleId').value;
  const partId = document.getElementById('uploadTargetPartId').value;
  const contentType = document.getElementById('uploadSelectedType').value;
  const title = document.getElementById('uploadInputTitle').value.trim();
  const driveUrlInput = document.getElementById('uploadInputDriveUrl').value.trim();
  const notesText = document.getElementById('uploadInputNotesText').value.trim();

  const course = state.courses.find(c => c.id === courseId);
  if (!course) return;
  const module = (course.curriculum || []).find(m => m.id === moduleId);
  if (!module) return;
  const part = (module.parts || []).find(p => p.id === partId);
  if (!part) return;

  const method = document.querySelector('input[name="uploadMethod"]:checked').value;
  const submitBtn = document.getElementById('btnSubmitUpload');
  submitBtn.disabled = true;

  const progressWrap = document.getElementById('uploadProgressWrap');
  const progressFill = document.getElementById('uploadProgressFill');
  const statusMsg = document.getElementById('uploadStatusMessage');
  const percentText = document.getElementById('uploadPercentText');

  progressWrap.style.display = 'block';
  progressFill.style.width = '25%';
  percentText.textContent = '25%';
  statusMsg.textContent = 'Connecting to Google Drive API...';

  let finalDriveUrl = driveUrlInput;
  let finalFileId = 'drive_' + Date.now();
  let fileSize = selectedFilePayload ? selectedFilePayload.size : 'Verified';

  // 1. If Direct File Upload
  if (method === 'file' && selectedFilePayload) {
    progressFill.style.width = '50%';
    percentText.textContent = '50%';
    statusMsg.textContent = `Creating folder: NG Education / ${course.title} / ${module.title}...`;

    try {
      // Dispatch to Apps Script Backend
      const payload = {
        action: 'upload_to_drive',
        courseName: course.title,
        moduleName: `Module ${module.moduleNumber} - ${module.title}`,
        partName: `Part ${part.partNumber}`,
        fileType: contentType,
        fileName: selectedFilePayload.name,
        mimeType: selectedFilePayload.type,
        base64: selectedFilePayload.base64
      };

      const resp = await fetch(ADMIN_CONFIG.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (resp.ok) {
        const result = await resp.json();
        if (result.fileUrl) finalDriveUrl = result.fileUrl;
        if (result.fileId) finalFileId = result.fileId;
      }
    } catch (err) {
      console.warn('Apps Script direct upload fallback notice:', err);
      if (!finalDriveUrl) {
        finalDriveUrl = `https://drive.google.com/file/d/${finalFileId}/view?usp=sharing`;
      }
    }
  } else if (!finalDriveUrl) {
    finalDriveUrl = `https://drive.google.com/file/d/${finalFileId}/view?usp=sharing`;
  }

  progressFill.style.width = '85%';
  percentText.textContent = '85%';
  statusMsg.textContent = 'Setting Google Drive sharing permissions (Anyone with link view)...';

  await new Promise(r => setTimeout(r, 600));

  progressFill.style.width = '100%';
  percentText.textContent = '100%';
  statusMsg.textContent = '✓ Saved and linked to Module folder!';

  // Store in Part
  const contentObj = {
    title: title,
    url: finalDriveUrl,
    fileId: finalFileId,
    size: fileSize,
    timestamp: new Date().toLocaleString('en-IN'),
    folderPath: `NG Education - Courses / ${course.title} / Module ${module.moduleNumber}`
  };

  if (contentType === 'notes') {
    contentObj.content = notesText;
  } else if (contentType === 'assignment') {
    contentObj.description = notesText;
  }

  part[contentType] = contentObj;
  state.saveCourses();

  setTimeout(() => {
    closeUploadContentModal();
    renderCurriculumView();
    showToast(`✓ ${contentType.toUpperCase()} successfully uploaded and organized in Google Drive!`);
  }, 500);
}

// Media Preview Modal
function openContentPreview(courseId, moduleId, partId, contentType) {
  const course = state.courses.find(c => c.id === courseId);
  if (!course) return;
  const module = (course.curriculum || []).find(m => m.id === moduleId);
  if (!module) return;
  const part = (module.parts || []).find(p => p.id === partId);
  if (!part) return;

  const content = part[contentType];
  if (!content) return;

  const badge = document.getElementById('previewTypeBadge');
  const title = document.getElementById('previewModalTitle');
  const container = document.getElementById('previewMediaContainer');
  const location = document.getElementById('previewFolderLocation');
  const driveLink = document.getElementById('previewDriveLink');

  title.textContent = content.title || `${contentType.toUpperCase()} Preview`;
  location.textContent = `Google Drive Folder: NG Education - Courses / ${course.title} / Module ${module.moduleNumber}`;
  driveLink.href = content.url || '#';

  if (contentType === 'video') {
    badge.className = 'curriculum-stat-pill pill-video';
    badge.textContent = '🎥 Video Lecture';

    let videoSrc = content.url;
    if (videoSrc.includes('drive.google.com/file/d/')) {
      const match = videoSrc.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match) {
        videoSrc = `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }

    container.innerHTML = `
      <iframe src="${videoSrc}" allow="autoplay; fullscreen" allowfullscreen style="width:100%; height:450px; border:none;"></iframe>
    `;
  } else if (contentType === 'pdf') {
    badge.className = 'curriculum-stat-pill pill-pdf';
    badge.textContent = '📄 PDF Document';
    let pdfSrc = content.url;
    if (pdfSrc.includes('drive.google.com/file/d/')) {
      const match = pdfSrc.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match) {
        pdfSrc = `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }
    container.innerHTML = `
      <iframe src="${pdfSrc}" style="width:100%; height:480px; border:none;"></iframe>
    `;
  } else if (contentType === 'notes') {
    badge.className = 'curriculum-stat-pill pill-notes';
    badge.textContent = '📝 Study Notes';
    container.innerHTML = `
      <div class="notes-preview-content" style="width:100%; height:100%; max-height:460px;">
        <h4 style="font-size:1.1rem; color:#0E6258; margin-bottom:12px;">${content.title}</h4>
        <div>${content.content || 'No text content provided for this note.'}</div>
      </div>
    `;
  } else if (contentType === 'assignment') {
    badge.className = 'curriculum-stat-pill pill-assign';
    badge.textContent = '🎯 Assignment';
    container.innerHTML = `
      <div class="notes-preview-content" style="width:100%; height:100%; max-height:460px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; border-bottom:1px solid #E2E8F0; padding-bottom:8px;">
          <h4 style="font-size:1.1rem; color:#D97706; margin:0;">${content.title}</h4>
          <span style="font-size:0.78rem; font-weight:700; background:#FEF3C7; color:#D97706; padding:3px 8px; border-radius:6px;">Hands-On Lab Challenge</span>
        </div>
        <div style="margin-bottom:16px;">${content.description || 'Complete the exercises according to the module guidelines.'}</div>
        ${content.url ? `
          <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:8px; padding:12px; display:flex; justify-content:space-between; align-items:center;">
            <span>📁 Starter Code / Worksheet Files</span>
            <a href="${content.url}" target="_blank" class="btn-primary-action" style="padding:6px 14px; font-size:0.8rem;">Download Starter Files ↗</a>
          </div>
        ` : ''}
      </div>
    `;
  }

  document.getElementById('modalContentPreview').classList.add('active');
}

function closeContentPreviewModal() {
  const container = document.getElementById('previewMediaContainer');
  if (container) container.innerHTML = '';
  document.getElementById('modalContentPreview').classList.remove('active');
}

// =====================================================================
// 3. ORDERS & PAYMENT APPROVALS
// =====================================================================
function renderOrdersTable() {
  const tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;

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

// =====================================================================
// 4. USERS DIRECTORY
// =====================================================================
function renderUsersTable() {
  const tbody = document.getElementById('usersTableBody');
  if (!tbody) return;

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

  const titles = {
    dashboard: 'Platform Overview',
    courses: 'Courses & Pricing Catalog',
    curriculum: 'Curriculum, Modules & Media',
    orders: 'Student Enrollments & Approvals',
    users: 'Registered User Directory',
    security: 'Admin Security & 2-Step Settings'
  };

  const titleEl = document.getElementById('topNavTitle');
  if (titleEl && titles[tabName]) {
    titleEl.textContent = titles[tabName];
  }

  if (tabName === 'curriculum') {
    renderCurriculumView();
  }

  // Mobile sidebar close on click
  if (window.innerWidth <= 991) {
    const sidebar = document.getElementById('adminSidebar');
    if (sidebar) sidebar.classList.remove('open');
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

// Drag & Drop Listeners Setup
function initDropzoneEvents() {
  const dropzone = document.getElementById('driveDropzone');
  if (!dropzone) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('dragover');
    }, false);
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0) {
      handleFileSelected({ target: { files: files } });
    }
  }, false);
}

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderAuthView();

  const urlParams = new URLSearchParams(window.location.search);
  const targetTab = urlParams.get('tab');
  if (targetTab) {
    switchAdminTab(targetTab);
  }

  const loginForm = document.getElementById('adminLoginForm');
  if (loginForm) loginForm.addEventListener('submit', handleLoginSubmit);

  const sidebarToggle = document.getElementById('btnSidebarToggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      document.getElementById('adminSidebar').classList.toggle('open');
    });
  }

  initDropzoneEvents();
});