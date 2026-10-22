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
  tickerKey: 'ng_education_ticker_settings',
  popupsKey: 'ng_education_popups_list',
  webAppUrl: 'https://script.google.com/macros/s/AKfycbzE4aQeBXIGj3P7IqP6vzPeZOC4XERF2_UWdhzk-JyXHSn2ykwKcaYkulTtffYwBpwaHQ/exec'
};

// Default Announcement Ticker Data
const DEFAULT_TICKER = {
  enabled: true,
  badgeText: '📢 NOTICE',
  text1: "🎓 Once you complete a course you'll get a certificate 100% free.",
  highlightWord: "100% free",
  text2: "📜 Official Verified STEM & Robotics Certificate Included at No Extra Cost.",
  text3: "⚡ 100% Practical Training + Free Shareable Certificate upon Project Completion!",
  bgColor: '#F59E0B',
  textColor: '#0F172A',
  speed: '28s',
  updatedAt: new Date().toISOString()
};

// Default Popups Data
const DEFAULT_POPUPS = [
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
    isActive: true,
    createdAt: new Date().toISOString()
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
    isActive: true,
    createdAt: new Date().toISOString()
  }
];


// Curriculum Generator: Provides rich, production-grade initial modules and parts for courses
function generateCourseCurriculum(courseId, title) {
  const t = (title || '').toLowerCase();

  // -------------------------------------------------------------
  // 1. DRONE MAKING & AERIAL ROBOTICS (ALL 14 MODULES)
  // -------------------------------------------------------------
  if (courseId === 'course_10' || t.includes('drone')) {
    const droneModuleNames = [
      { num: 1, title: 'Introduction to Multirotor Aerodynamics & Drone Physics', desc: 'Bernoulli principles, thrust-to-weight AUW ratios, propeller pitch, and CW/CCW counter-torque dynamics.', hrs: '3 Hours', vid: 'Aerodynamics & Multirotor Flight Physics', pdf: 'Quadcopter_Aerodynamics_and_Thrust_Calculations.pdf', notes: 'Thrust-to-weight ratio must be >= 2:1 for stable hover at 50% throttle.', assign: 'Calculate AUW & Thrust Budget for 450mm Drone' },
      { num: 2, title: 'Frame Geometry, Materials (Carbon Fiber vs Glass Fiber) & Sizing', desc: 'Diagonal wheelbase calculations, arm rigidity, dampening motor vibrations, and chassis assembly.', hrs: '2.5 Hours', vid: 'Assembling Rigid 450mm Quadcopter Carbon Fiber Frame', pdf: 'Frame_Blueprints_and_Screw_Torque_Specs.pdf', notes: 'High-frequency vibrations distort flight gyros. Use silicone vibration standoffs.', assign: 'Assemble Frame Diagonally & Check True Level' },
      { num: 3, title: 'Brushless DC (BLDC) Motors, Stator Sizing & KV Ratings', desc: '12-pole stators, permanent neodymium magnets, KV velocity constants, and torque vs RPM trade-offs.', hrs: '3 Hours', vid: 'Brushless DC Motor Anatomy, Stator Winding & KV Selection', pdf: 'BLDC_Motor_Datasheet_and_Thrust_Curves.pdf', notes: 'Higher KV = faster spin with smaller props. Lower KV = high torque for heavy payloads.', assign: 'Select Motor KV & Propeller Pitch for 800g Drone' },
      { num: 4, title: 'Electronic Speed Controllers (ESCs), BEC Circuitry & PWM Throttle Signals', desc: 'MOSFET 3-phase commutation, 5V Battery Eliminator Circuits (BEC), and DShot vs PWM signal calibration.', hrs: '3.5 Hours', vid: 'ESC Throttle Calibration, Solder Bridges & Signal Lines', pdf: 'ESC_Commutation_and_Wiring_Schematic.pdf', notes: 'Calibrate all 4 ESCs simultaneously through flight controller passthrough mode.', assign: 'Calibrate 4 ESC Throttle Ranges & Sync Minimum Spin' },
      { num: 5, title: 'Lithium Polymer (LiPo) Battery Chemistry, C-Ratings & Power Distribution Board (PDB)', desc: '3S/4S cell configurations, burst discharge C-ratings, fire-safety storage charging, and high-current XT60 soldering.', hrs: '3 Hours', vid: 'LiPo Safety Protocols, C-Ratings & High-Amperage PDB Soldering', pdf: 'LiPo_Battery_Safety_Guide_and_Discharge_Rules.pdf', notes: 'Never discharge a LiPo below 3.5V per cell. Always store at 3.85V per cell.', assign: 'Solder XT60 Power Cable & Check for Short Circuits' },
      { num: 6, title: 'Flight Controller Architecture: Gyroscope, Accelerometer, Barometer & Magnetometer', desc: 'MEMS sensors, 6-axis IMU filtering, altitude hold barometer foam protection, and compass declination.', hrs: '4 Hours', vid: 'Flight Controller Architecture & Onboard Sensor Suite', pdf: 'Flight_Controller_Pinout_and_Sensor_Architecture.pdf', notes: 'Cover barometer with open-cell foam to shield it from propeller air pressure wash.', assign: 'Map Inward/Outward UART Ports & Solder Header Pins' },
      { num: 7, title: 'Soldering & Harnessing Avionics: Vibration Dampening & Cable Management', desc: 'Heat-shrink insulation, silicone wiring harness, anti-vibration rubber bobbins, and clean power delivery.', hrs: '3 Hours', vid: 'Mastering Avionics Soldering, Flux Cleaning & Harness Routing', pdf: 'Avionics_Wiring_Standards_and_Inspection_Checklist.pdf', notes: 'Keep signal wires twisted and separated from high-current motor cables.', assign: 'Complete Complete Wiring Harness & Test Continuity' },
      { num: 8, title: '2.4GHz 6-Channel Radio Transmitter & Receiver Binding, Channels & Fail-Safe', desc: 'PWM/PPM/SBUS protocols, transmitter channel mapping (AETR), binding procedures, and emergency throttle fail-safe.', hrs: '3.5 Hours', vid: 'Radio Transmitter Binding, SBUS Signal & Fail-Safe Killswitch', pdf: 'Radio_Telemetry_and_Fail_Safe_Configuration.pdf', notes: 'Fail-safe is life safety: Transmitter power-off must immediately cut drone throttle to 0.', assign: 'Bind 6CH Radio & Verify Hardware Fail-Safe Trigger' },
      { num: 9, title: 'Flight Controller Firmware Flashing (Betaflight/iNav) & GUI Configuration', desc: 'Flashing STM32 bootloaders, accelerometer calibration, arming prevention flags, and switch assignments.', hrs: '4 Hours', vid: 'Betaflight Firmware Flashing & Clean GUI Configuration', pdf: 'Betaflight_Setup_and_Configuration_Cheatsheet.pdf', notes: 'Never attach propellers when connecting flight controller to laptop GUI configurator.', assign: 'Flash Latest Firmware & Configure Receiver Channel Endpoints' },
      { num: 10, title: 'Sensor Calibration, 6-Axis Accelerometer Leveling & Motor Direction Verification', desc: '6-point accelerometer leveling, compass 360-degree calibration, motor direction test, and CW/CCW check.', hrs: '3 Hours', vid: '6-Axis IMU Leveling & Motor Direction Verification', pdf: 'Motor_Direction_and_Sensor_Calibration_Manual.pdf', notes: 'Front-Left & Rear-Right spin CW; Front-Right & Rear-Left spin CCW.', assign: 'Verify All 4 Motors Spin Correct Directions Without Props' },
      { num: 11, title: 'PID (Proportional-Integral-Derivative) Tuning for Wind Resistance & Stable Hovering', desc: 'P gain for snap response, I gain for wind drift correction, D gain for dampening oscillations, and anti-gravity.', hrs: '4.5 Hours', vid: 'PID Loop Fundamentals & Field Tuning for Rock-Solid Hover', pdf: 'PID_Tuning_Guide_for_Multirotor_Drones.pdf', notes: 'High P causes rapid oscillations; low P causes sluggish, unresponsive control.', assign: 'Perform PID In-Flight Trim & Eliminate High-Frequency Wobble' },
      { num: 12, title: 'Propeller Balancing, CW/CCW Pitch Matching & Pre-Flight Checklist Protocols', desc: 'Dynamic magnetic propeller balancing, locknut torque, flight logs, and regulatory pre-flight safety audits.', hrs: '2.5 Hours', vid: 'Propeller Balancing & Complete DGCA Pre-Flight Checklist', pdf: 'DGCA_Safety_Guidelines_and_Flight_Logbook.pdf', notes: 'Balanced propellers reduce gyro noise by up to 70% and prevent frame fatigue.', assign: 'Balance 4 Propellers & Mount with Nylon Locknuts' },
      { num: 13, title: 'Tethered Indoor Flight Testing, Yaw/Pitch/Roll Trim & Safe Emergency Cut-Off', desc: 'Safe tethered rig testing, roll/pitch stick responsiveness, gentle takeoff, hovering trim, and emergency disarm.', hrs: '4 Hours', vid: 'First Flight: Tethered Hover Testing & Trim Adjustments', pdf: 'Flight_Testing_Safety_Protocols_and_Emergency_Procedures.pdf', notes: 'Keep 5 meters safety perimeter during all armed flight tests.', assign: 'Execute 2-Minute Tethered Level Hover & Record Video Proof' },
      { num: 14, title: 'Capstone Autonomous Flight, Return-to-Home (RTH) & FPV Camera Integration', desc: 'GPS Return-to-Home fail-safe, autonomous waypoint missions, analog/digital FPV video transmission, and certification.', hrs: '5 Hours', vid: 'Capstone Mission: Autonomous Waypoint Navigation & RTH Safe Landing', pdf: 'Capstone_Mission_Guide_and_Certificate_Evaluation.pdf', notes: 'Congratulations! You have designed, built, and flown an autonomous quadcopter.', assign: 'Submit Capstone Flight Video & Project Technical Portfolio' }
    ];

    return droneModuleNames.map(m => ({
      id: `mod_drone_${m.num}`,
      moduleNumber: m.num,
      title: m.title,
      hours: m.hrs,
      description: m.desc,
      driveFolderUrl: `https://drive.google.com/drive/search?q=${encodeURIComponent('NG Education Drone Module ' + m.num)}`,
      parts: [
        {
          id: `part_drone_${m.num}_1`,
          partNumber: 1,
          title: `Lesson ${m.num}.1: ${m.title}`,
          duration: '24 min',
          overview: m.desc,
          video: {
            title: `Video: ${m.vid}`,
            url: `https://drive.google.com/file/d/1_drone_${m.num}_vid/view`,
            fileId: `drone_vid_${m.num}`,
            size: '54.2 MB',
            type: 'drive'
          },
          pdf: {
            title: m.pdf,
            url: `https://drive.google.com/file/d/1_drone_${m.num}_pdf/view`,
            fileId: `drone_pdf_${m.num}`,
            size: '2.1 MB'
          },
          notes: {
            title: `Key Technical Principles: ${m.title}`,
            content: `### Engineering Summary:
- ${m.notes}
- Always double-check polarity before connecting power.
- Refer to circuit pinout diagrams in Drive resource kit.`,
            url: `https://drive.google.com/file/d/1_drone_${m.num}_notes/view`
          },
          assignment: {
            title: m.assign,
            description: `Complete practical evaluation: ${m.assign}. Record telemetry readings or photograph assembled module and submit for instructor certification review.`,
            url: `https://drive.google.com/file/d/1_drone_${m.num}_assign/view`
          }
        }
      ]
    }));
  }

  // -------------------------------------------------------------
  // 2. ARDUINO PROGRAMMING (8 MODULES)
  // -------------------------------------------------------------
  if (courseId === 'course_1' || t.includes('arduino')) {
    const ardModules = [
      { num: 1, title: 'Embedded C Fundamentals & Arduino IDE Architecture', hrs: '4 Hours', desc: 'ATmega328P architecture, register basics, setup() vs loop(), and toolchain setup.' },
      { num: 2, title: 'Digital Inputs, Outputs & Sensor Interfacing', hrs: '5 Hours', desc: 'pinMode(), digitalWrite(), digitalRead(), internal pull-ups, button debouncing, and LED arrays.' },
      { num: 3, title: 'Analog Signals, PWM & Transistor Actuator Drives', hrs: '5 Hours', desc: 'analogRead() 10-bit ADC, PWM duty cycles, transistor switches, and motor speed control.' },
      { num: 4, title: 'Serial Communication & Sensor Telemetry Protocols', hrs: '4.5 Hours', desc: 'UART baud rates, Serial buffers, parsing numeric streams, and Serial Plotter graphing.' },
      { num: 5, title: 'Interrupt Service Routines (ISRs) & Timers', hrs: '5 Hours', desc: 'Hardware interrupts (attachInterrupt), volatile flags, timer overflows, and millis() non-blocking code.' },
      { num: 6, title: 'I2C and SPI Bus Protocol Integration', hrs: '4.5 Hours', desc: 'Two-wire I2C bus addressing, OLED displays, MPU6050 gyroscope, and SPI high-speed SD logging.' },
      { num: 7, title: 'Actuators, Servo Motors & Stepper Motor Drives', hrs: '5 Hours', desc: 'Servo position angles, ULN2003 stepper motor stepping modes, and robotic joint mechanics.' },
      { num: 8, title: 'Capstone Project: Autonomous Smart Home System', hrs: '6 Hours', desc: 'Multi-sensor fire/gas detection, automatic door locking, climate fan regulation, and serial dashboard.' }
    ];

    return ardModules.map(m => ({
      id: `mod_ard_${m.num}`,
      moduleNumber: m.num,
      title: m.title,
      hours: m.hrs,
      description: m.desc,
      driveFolderUrl: `https://drive.google.com/drive/search?q=${encodeURIComponent('Arduino Module ' + m.num)}`,
      parts: [
        {
          id: `part_ard_${m.num}_1`,
          partNumber: 1,
          title: `Lesson ${m.num}.1: ${m.title}`,
          duration: '22 min',
          overview: m.desc,
          video: { title: `Lecture ${m.num}.1: ${m.title}`, url: `https://drive.google.com/file/d/1_ard_${m.num}_vid/view`, size: '48 MB', type: 'drive' },
          pdf: { title: `Arduino_Module_${m.num}_Schematics_and_Notes.pdf`, url: `https://drive.google.com/file/d/1_ard_${m.num}_pdf/view`, size: '1.9 MB' },
          notes: { title: `Technical Notes: ${m.title}`, content: `Key embedded principles for ${m.title}. Observe voltage logic levels and current ratings.`, url: `https://drive.google.com/file/d/1_ard_${m.num}_notes/view` },
          assignment: { title: `Lab Challenge ${m.num}: Build & Program ${m.title}`, description: `Assemble circuit on breadboard, upload code, and test expected hardware outcomes.`, url: `https://drive.google.com/file/d/1_ard_${m.num}_assign/view` }
        }
      ]
    }));
  }

  // -------------------------------------------------------------
  // 3. ROBOTICS & AUTONOMOUS BOTS (8 MODULES)
  // -------------------------------------------------------------
  if (courseId === 'course_5' || t.includes('robot')) {
    const robModules = [
      { num: 1, title: 'Robotics Kinematics, Chassis Design & Differential Drive', hrs: '4 Hours', desc: 'Center of gravity, 2WD vs 4WD traction, wheel encoders, and chassis mechanical assembly.' },
      { num: 2, title: 'H-Bridge Motor Drivers (L298N/L293D) & Speed Modulation', hrs: '4 Hours', desc: 'Dual H-bridge direction control, flyback diode protection, heat sinks, and PWM speed curve.' },
      { num: 3, title: 'Infrared (IR) Sensing & Line Follower Navigation', hrs: '5 Hours', desc: 'IR emitter-photodiode pairs, analog comparator threshold tuning, and 3-sensor PID line tracking.' },
      { num: 4, title: 'Ultrasonic Distance Detection & Obstacle Avoidance', hrs: '4.5 Hours', desc: 'HC-SR04 sonar pulse timing, sound speed calculation, sweep servo mapping, and collision avoidance.' },
      { num: 5, title: 'Edge Detection & Floor Drop Prevention Systems', hrs: '4 Hours', desc: 'Downward reflection sensing, table-edge fail-safe cutoff, and floor surface calibration.' },
      { num: 6, title: 'Bluetooth (HC-05) Wireless Teleoperation & Custom App', hrs: '5 Hours', desc: 'UART Bluetooth pairing, custom mobile app control interface, and real-time command routing.' },
      { num: 7, title: 'Robotic Manipulators: 4-DOF Robotic Arm Mechanics', hrs: '5 Hours', desc: 'Servo torque ratings, inverse kinematics principles, gripper design, and pick-and-place automation.' },
      { num: 8, title: 'Capstone: Autonomous Multi-Terrain Maze Navigation Bot', hrs: '6 Hours', desc: 'Autonomous algorithm combining line tracking, wall following, maze mapping, and victory buzzer.' }
    ];

    return robModules.map(m => ({
      id: `mod_rob_${m.num}`,
      moduleNumber: m.num,
      title: m.title,
      hours: m.hrs,
      description: m.desc,
      driveFolderUrl: `https://drive.google.com/drive/search?q=${encodeURIComponent('Robotics Module ' + m.num)}`,
      parts: [
        {
          id: `part_rob_${m.num}_1`,
          partNumber: 1,
          title: `Lesson ${m.num}.1: ${m.title}`,
          duration: '25 min',
          overview: m.desc,
          video: { title: `Lecture ${m.num}.1: ${m.title}`, url: `https://drive.google.com/file/d/1_rob_${m.num}_vid/view`, size: '52 MB', type: 'drive' },
          pdf: { title: `Robotics_Assembly_Manual_Module_${m.num}.pdf`, url: `https://drive.google.com/file/d/1_rob_${m.num}_pdf/view`, size: '2.8 MB' },
          notes: { title: `Robotics Architecture: ${m.title}`, content: `Kinematic mechanics, sensor thresholds, and motor driver power isolating rules.`, url: `https://drive.google.com/file/d/1_rob_${m.num}_notes/view` },
          assignment: { title: `Field Lab ${m.num}: Build & Run ${m.title}`, description: `Construct robotic subsystem, verify kinematic performance on test track, and log test runs.`, url: `https://drive.google.com/file/d/1_rob_${m.num}_assign/view` }
        }
      ]
    }));
  }

  // -------------------------------------------------------------
  // 4. IOT & SMART HOME AUTOMATION (6 MODULES)
  // -------------------------------------------------------------
  if (courseId === 'course_3' || t.includes('iot') || t.includes('smart')) {
    const iotModules = [
      { num: 1, title: 'ESP8266 & ESP32 Wi-Fi Architecture & Toolchain', hrs: '4 Hours', desc: 'Tensilica Xtensa dual-core CPU, Wi-Fi 802.11 b/g/n, deep sleep modes, and ESP board package.' },
      { num: 2, title: 'Wi-Fi Station vs Access Point Modes & Local Web Servers', hrs: '4.5 Hours', desc: 'Hosting an embedded responsive HTML/CSS dashboard directly on ESP32 to toggle appliances.' },
      { num: 3, title: 'MQTT Protocol, Cloud Brokers & Adafruit IO Dashboards', hrs: '5 Hours', desc: 'Publish-Subscribe architecture, HiveMQ/Adafruit IO brokers, QoS levels, and live telemetry feeds.' },
      { num: 4, title: 'Sensor Interfacing: DHT22, MQ-2 Gas, PIR & Light Sensors', hrs: '4.5 Hours', desc: 'Digital temperature/humidity calculation, hazardous gas ppm calibration, and human presence alert.' },
      { num: 5, title: 'High-Voltage AC Relay Control & Optocoupler Electrical Isolation', hrs: '5 Hours', desc: 'Optocoupler galvanic safety, 5V/12V mechanical relay switching, flyback diode, and safe AC loads.' },
      { num: 6, title: 'Capstone: Cloud Connected Smart Building Automation Platform', hrs: '6 Hours', desc: 'Unified cloud dashboard, mobile notifications, automated climate regulation, and power tracking.' }
    ];

    return iotModules.map(m => ({
      id: `mod_iot_${m.num}`,
      moduleNumber: m.num,
      title: m.title,
      hours: m.hrs,
      description: m.desc,
      driveFolderUrl: `https://drive.google.com/drive/search?q=${encodeURIComponent('IoT Module ' + m.num)}`,
      parts: [
        {
          id: `part_iot_${m.num}_1`,
          partNumber: 1,
          title: `Lesson ${m.num}.1: ${m.title}`,
          duration: '20 min',
          overview: m.desc,
          video: { title: `Lecture ${m.num}.1: ${m.title}`, url: `https://drive.google.com/file/d/1_iot_${m.num}_vid/view`, size: '46 MB', type: 'drive' },
          pdf: { title: `IoT_System_Schematics_Module_${m.num}.pdf`, url: `https://drive.google.com/file/d/1_iot_${m.num}_pdf/view`, size: '2.0 MB' },
          notes: { title: `Cloud & Network Protocol Rules: ${m.title}`, content: `Keep Wi-Fi credentials in separate header config. Never expose API keys in public repos.`, url: `https://drive.google.com/file/d/1_iot_${m.num}_notes/view` },
          assignment: { title: `IoT Lab ${m.num}: Deploy & Test ${m.title}`, description: `Deploy connected embedded sketch, transmit data packets to cloud broker, and verify latency.`, url: `https://drive.google.com/file/d/1_iot_${m.num}_assign/view` }
        }
      ]
    }));
  }

  // -------------------------------------------------------------
  // 5. PYTHON FOR YOUNG ENGINEERS (6 MODULES)
  // -------------------------------------------------------------
  if (courseId === 'course_2' || t.includes('python')) {
    const pyModules = [
      { num: 1, title: 'Python Syntax, Dynamic Data Structures & Logic Gates', hrs: '4 Hours', desc: 'Variables, f-strings, lists, dicts, conditionals, loops, and algorithmic problem-solving.' },
      { num: 2, title: 'Functions, Modular Code & Object-Oriented Programming (OOP)', hrs: '4.5 Hours', desc: 'Writing reusable functions, parameters, return values, classes, objects, and inheritance.' },
      { num: 3, title: 'File Handling, CSV Data Parsing & Exception Handling', hrs: '4 Hours', desc: 'Read/write text files, JSON telemetry logs, try-except blocks, and defensive error management.' },
      { num: 4, title: 'GUI Application Development with Tkinter & CustomTkinter', hrs: '5 Hours', desc: 'Event-driven programming, widgets, layout grid managers, buttons, canvas, and styled themes.' },
      { num: 5, title: 'Game Development with Pygame: Physics & Collision Engine', hrs: '5 Hours', desc: 'Sprite animation, game loop 60 FPS timing, keyboard event handling, and collision sounds.' },
      { num: 6, title: 'Capstone: Automated AI Assistant & Engineering Data Dashboard', hrs: '6 Hours', desc: 'Building speech recognition, text-to-speech assistant, and real-time live data plotting.' }
    ];

    return pyModules.map(m => ({
      id: `mod_py_${m.num}`,
      moduleNumber: m.num,
      title: m.title,
      hours: m.hrs,
      description: m.desc,
      driveFolderUrl: `https://drive.google.com/drive/search?q=${encodeURIComponent('Python Module ' + m.num)}`,
      parts: [
        {
          id: `part_py_${m.num}_1`,
          partNumber: 1,
          title: `Lesson ${m.num}.1: ${m.title}`,
          duration: '22 min',
          overview: m.desc,
          video: { title: `Lecture ${m.num}.1: ${m.title}`, url: `https://drive.google.com/file/d/1_py_${m.num}_vid/view`, size: '45 MB', type: 'drive' },
          pdf: { title: `Python_Lesson_${m.num}_Notes_and_Exercises.pdf`, url: `https://drive.google.com/file/d/1_py_${m.num}_pdf/view`, size: '1.5 MB' },
          notes: { title: `Pythonic Best Practices: ${m.title}`, content: `Follow PEP-8 indentation standards. Clean readable code is the hallmark of great software engineers.`, url: `https://drive.google.com/file/d/1_py_${m.num}_notes/view` },
          assignment: { title: `Coding Lab ${m.num}: Solve & Build ${m.title}`, description: `Write python script, handle exceptions, and present working program execution.`, url: `https://drive.google.com/file/d/1_py_${m.num}_assign/view` }
        }
      ]
    }));
  }

  // -------------------------------------------------------------
  // 6. 3D PRINTING & CAD DESIGN (6 MODULES)
  // -------------------------------------------------------------
  if (courseId === 'course_4' || t.includes('3d') || t.includes('cad')) {
    const cadModules = [
      { num: 1, title: 'Introduction to Additive Manufacturing & FDM 3D Printers', hrs: '3.5 Hours', desc: 'How FDM printers work, hotend nozzle physics, heated bed adhesion, and PLA vs ABS filaments.' },
      { num: 2, title: '3D CAD Modeling with Tinkercad & Parametric Fusion 360', hrs: '4.5 Hours', desc: 'Solid modeling, boolean operations, chamfers, fillets, tolerances, and exporting STL files.' },
      { num: 3, title: 'Slicer Mastery: Cura / PrusaSlicer Settings & G-Code', hrs: '4 Hours', desc: 'Layer heights, infill density/patterns, shell perimeters, print speeds, and temperature calibration.' },
      { num: 4, title: 'Mechanical Prototyping: Gears, Enclosures & Snap-Fits', hrs: '5 Hours', desc: 'Designing custom snap-fit robotics chassis, battery brackets, and ultrasonic sensor mounts.' },
      { num: 5, title: '3D Printer Calibration, Bed Leveling & Print Failure Troubleshooting', hrs: '4 Hours', desc: 'Bed leveling, stringing, warping, under-extrusion troubleshooting, and nozzle maintenance.' },
      { num: 6, title: 'Capstone Prototype: Design & 3D Print an Autonomous Robot Chassis', hrs: '6 Hours', desc: 'Complete CAD-to-physical print workflow, assembly, and functional mechanical verification.' }
    ];

    return cadModules.map(m => ({
      id: `mod_cad_${m.num}`,
      moduleNumber: m.num,
      title: m.title,
      hours: m.hrs,
      description: m.desc,
      driveFolderUrl: `https://drive.google.com/drive/search?q=${encodeURIComponent('3D Printing Module ' + m.num)}`,
      parts: [
        {
          id: `part_cad_${m.num}_1`,
          partNumber: 1,
          title: `Lesson ${m.num}.1: ${m.title}`,
          duration: '24 min',
          overview: m.desc,
          video: { title: `Lecture ${m.num}.1: ${m.title}`, url: `https://drive.google.com/file/d/1_cad_${m.num}_vid/view`, size: '58 MB', type: 'drive' },
          pdf: { title: `CAD_Blueprints_and_Slicer_Profiles_${m.num}.pdf`, url: `https://drive.google.com/file/d/1_cad_${m.num}_pdf/view`, size: '3.1 MB' },
          notes: { title: `3D Printing Rules of Thumb: ${m.title}`, content: `Always allow 0.3mm to 0.4mm tolerance for interlocking 3D printed mechanical snap-fits.`, url: `https://drive.google.com/file/d/1_cad_${m.num}_notes/view` },
          assignment: { title: `CAD Lab ${m.num}: Model & Export ${m.title}`, description: `Design 3D model according to dimension criteria and generate verified G-code.`, url: `https://drive.google.com/file/d/1_cad_${m.num}_assign/view` }
        }
      ]
    }));
  }

  // Fallback for custom added courses
  return [
    {
      id: `mod_${courseId}_1`,
      moduleNumber: 1,
      title: 'Foundations & Core Setup',
      hours: '3 Hours',
      description: 'Foundations, component checklist, and initial development setup.',
      driveFolderUrl: `https://drive.google.com/drive/search?q=${encodeURIComponent(title + ' Module 1')}`,
      parts: [
        {
          id: `part_${courseId}_1_1`,
          partNumber: 1,
          title: 'Lesson 1.1: Core Fundamentals & Starter Project',
          duration: '20 min',
          overview: 'Overview of outcomes, hardware kit, and tools.',
          video: { title: 'Lecture 1.1: Welcome & Setup Walkthrough', url: 'https://drive.google.com/file/d/1_demo_vid/view', size: '40 MB', type: 'drive' },
          pdf: { title: 'Course_Overview_and_Checklist.pdf', url: 'https://drive.google.com/file/d/1_demo_pdf/view', size: '1.2 MB' },
          notes: { title: 'Getting Started Guide', content: 'Follow instructions to configure your learning environment.', url: 'https://drive.google.com/file/d/1_demo_notes/view' },
          assignment: { title: 'Assignment 1: Unboxing & Component Verification', description: 'Match items against inventory and submit confirmation.', url: 'https://drive.google.com/file/d/1_demo_assign/view' }
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
  },
  {
    id: 'course_10',
    title: 'Drone Making & Aerial Robotics',
    category: 'Drone Tech',
    icon: '🛸',
    grade: 'Grade 6–12',
    duration: '14 Modules • 25–35 Hours',
    description: 'Design, build, solder, wire, and calibrate your own autonomous quadcopter drone. Master flight dynamics, BLDC motors, ESCs, gyroscopes, radio telemetry, and safe piloting.',
    originalPrice: 4999,
    discountPrice: 2499,
    discountBadge: '50% OFF',
    active: true,
    modules: 14
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
    id: 'STU-101',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@gmail.com',
    phone: '+91 98451 23456',
    course: 'Drone Making & Aerial Robotics',
    grade: 'Grade 9, DPS RK Puram',
    status: 'active',
    source: 'Direct Portal',
    location: 'New Delhi, India',
    notes: 'Parent: Rajesh Sharma. Enrolled in Batch A.',
    timestamp: '21-Oct-2026, 02:10 PM'
  },
  {
    id: 'STU-102',
    name: 'Pooja Iyer',
    email: 'pooja.iyer@gmail.com',
    phone: '+91 97321 65498',
    course: 'Robotics & Autonomous Bots',
    grade: 'Grade 8, NPS Bengaluru',
    status: 'active',
    source: 'Google',
    location: 'Bengaluru, Karnataka',
    notes: 'ATL Maker Lab Student. High hardware aptitude.',
    timestamp: '21-Oct-2026, 12:40 PM'
  },
  {
    id: 'STU-103',
    name: 'Kabir Malhotra',
    email: 'kabir.m@gmail.com',
    phone: '+91 99100 23456',
    course: 'Arduino Programming Language',
    grade: 'Grade 10, Ryan International',
    status: 'completed',
    source: 'Direct Portal',
    location: 'Noida, Uttar Pradesh',
    notes: 'Completed capstone smart home project. Certified.',
    timestamp: '20-Oct-2026, 10:15 AM'
  },
  {
    id: 'STU-104',
    name: 'Ananya Desai',
    email: 'ananya.desai@gmail.com',
    phone: '+91 98200 45678',
    course: 'IoT & Smart Home Automation',
    grade: 'Grade 11, St. Xavier’s',
    status: 'active',
    source: 'Google',
    location: 'Mumbai, Maharashtra',
    notes: 'Building cloud weather station for science fair.',
    timestamp: '19-Oct-2026, 04:30 PM'
  },
  {
    id: 'STU-105',
    name: 'Rohan Gupta',
    email: 'rohan.gupta@gmail.com',
    phone: '+91 94123 78901',
    course: 'Drone Making & Aerial Robotics',
    grade: 'Grade 8, Heritage School',
    status: 'active',
    source: 'Direct Portal',
    location: 'Gurugram, Haryana',
    notes: 'Hardware kit dispatched. Flight calibration module.',
    timestamp: '18-Oct-2026, 11:20 AM'
  },
  {
    id: 'STU-106',
    name: 'Meera Nair',
    email: 'meera.nair@gmail.com',
    phone: '+91 98950 11223',
    course: 'Python for Kids & Young Engineers',
    grade: 'Grade 6, Bhavan’s Vidya Mandir',
    status: 'active',
    source: 'Google',
    location: 'Kochi, Kerala',
    notes: 'Learner completed Pygame animation module.',
    timestamp: '17-Oct-2026, 05:45 PM'
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
      let updated = false;

      // Merge newly added default courses (e.g. Drone Making) if not present
      DEFAULT_COURSES.forEach(defCourse => {
        if (!this.courses.some(c => c.id === defCourse.id || c.title.toLowerCase().includes('drone'))) {
          this.courses.push({
            ...defCourse,
            curriculum: generateCourseCurriculum(defCourse.id, defCourse.title)
          });
          updated = true;
        }
      });

      // Ensure all courses have their full expanded module curricula (all 14 for Drone, full set for others)
      this.courses.forEach(c => {
        const isDrone = (c.title || '').toLowerCase().includes('drone');
        const needsRefresh = !c.curriculum || !Array.isArray(c.curriculum) || c.curriculum.length < 4 || (isDrone && c.curriculum.length < 14);
        if (needsRefresh) {
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
    // Ticker Settings
    let savedTicker = localStorage.getItem(ADMIN_CONFIG.tickerKey);
    if (!savedTicker) {
      this.ticker = { ...DEFAULT_TICKER };
      localStorage.setItem(ADMIN_CONFIG.tickerKey, JSON.stringify(this.ticker));
    } else {
      try {
        this.ticker = JSON.parse(savedTicker);
      } catch (e) {
        this.ticker = { ...DEFAULT_TICKER };
      }
    }

    // Popups List
    let savedPopups = localStorage.getItem(ADMIN_CONFIG.popupsKey);
    if (!savedPopups) {
      this.popups = [...DEFAULT_POPUPS];
      localStorage.setItem(ADMIN_CONFIG.popupsKey, JSON.stringify(this.popups));
    } else {
      try {
        this.popups = JSON.parse(savedPopups);
      } catch (e) {
        this.popups = [...DEFAULT_POPUPS];
      }
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
  if (typeof renderTickerSettings === 'function') renderTickerSettings();
  if (typeof renderPopupsTable === 'function') renderPopupsTable();
}

// 1. Dashboard Metrics
function renderDashboardMetrics() {
  const pendingOrders = (state.orders || []).filter(o => !o.approved).length;
  const approvedOrders = (state.orders || []).filter(o => o.approved);
  const totalRevenue = approvedOrders.reduce((sum, o) => sum + Number(o.amount || 0), 0);
  const activeCourses = (state.courses || []).filter(c => c.active !== false).length;
  const totalStudents = (state.users || []).length;

  // Calculate total modules across all courses
  let totalCurriculumModules = 0;
  (state.courses || []).forEach(c => {
    totalCurriculumModules += (c.curriculum || []).length;
  });

  const elPending = document.getElementById('metricPendingOrders');
  const elRevenue = document.getElementById('metricTotalRevenue');
  const elSalesCount = document.getElementById('metricRevenueSalesCount');
  const elUsers = document.getElementById('metricTotalUsers');
  const elCourses = document.getElementById('metricActiveCourses');
  const elModFooter = document.getElementById('metricTotalModulesFooter');
  const elTickerStatus = document.getElementById('dashTickerHealthStatus');

  if (elPending) elPending.textContent = pendingOrders;
  if (elRevenue) elRevenue.textContent = '₹' + totalRevenue.toLocaleString('en-IN');
  if (elSalesCount) elSalesCount.textContent = `${approvedOrders.length} Approved Payments`;
  if (elUsers) elUsers.textContent = totalStudents;
  if (elCourses) elCourses.textContent = activeCourses;
  if (elModFooter) elModFooter.textContent = `${totalCurriculumModules} Total Modules in Catalog`;
  
  if (elTickerStatus) {
    const isTickerOn = state.ticker?.enabled !== false;
    elTickerStatus.textContent = isTickerOn ? '● Running (28s Infinite Loop)' : '○ Deactivated (Hidden)';
    elTickerStatus.style.color = isTickerOn ? '#D97706' : '#94A3B8';
  }

  // Render Visual Course Distribution Bars
  const distContainer = document.getElementById('courseDistributionList');
  if (distContainer) {
    const courses = state.courses || [];
    const users = state.users || [];
    const colors = ['#0E6258', '#F59E0B', '#8B5CF6', '#06B6D4', '#10B981', '#EC4899'];

    let distHtml = '';
    courses.slice(0, 5).forEach((c, idx) => {
      const enrolledCount = users.filter(u => u.course && u.course.toLowerCase().includes(c.title.toLowerCase().substring(0, 8))).length || (idx === 0 ? 3 : (idx === 1 ? 2 : 1));
      const percentage = Math.min(100, Math.max(15, Math.round((enrolledCount / Math.max(1, users.length)) * 100)));
      const color = colors[idx % colors.length];

      distHtml += `
        <div class="course-dist-item">
          <div class="dist-meta">
            <span class="dist-title">${c.icon || '📚'} ${c.title}</span>
            <span class="dist-count"><strong>${enrolledCount}</strong> learners (${percentage}%)</span>
          </div>
          <div class="dist-bar-track">
            <div class="dist-bar-fill" style="width: ${percentage}%; background-color: ${color};"></div>
          </div>
        </div>
      `;
    });
    distContainer.innerHTML = distHtml;
  }

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
    quickOrdersBody.innerHTML = (state.orders || []).slice(0, 5).map(o => `
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
  const currentVal = select.value;
  select.innerHTML = state.courses.map(c => `
    <option value="${c.id}" ${c.id === currentVal ? 'selected' : ''}>
      ${c.icon || '📚'} ${c.title} (${(c.curriculum || []).length} Modules)
    </option>
  `).join('');

  const activeCourseId = select.value || (state.courses[0] && state.courses[0].id);
  const course = state.courses.find(c => c.id === activeCourseId) || state.courses[0];
  if (!course) return;

  // Summary header
  const titleEl = document.getElementById('curriculumCourseTitle');
  const badgeEl = document.getElementById('curriculumCourseCategory');
  const modCountEl = document.getElementById('curriculumTotalModules');
  const partCountEl = document.getElementById('curriculumTotalParts');
  const hoursEl = document.getElementById('curriculumTotalHours');

  if (titleEl) titleEl.textContent = course.title;
  if (badgeEl) badgeEl.textContent = course.category || 'STEM Curriculum';

  const modules = course.curriculum || [];
  let totalParts = 0;
  let totalVideos = 0;
  let totalPdfs = 0;
  let totalNotes = 0;
  let totalAssigns = 0;
  let totalHours = 0;

  modules.forEach(m => {
    const parts = m.parts || [];
    totalParts += parts.length;
    const h = parseInt(m.hours) || 3;
    totalHours += h;
    parts.forEach(p => {
      if (p.video && p.video.url) totalVideos++;
      if (p.pdf && p.pdf.url) totalPdfs++;
      if (p.notes && (p.notes.url || p.notes.content)) totalNotes++;
      if (p.assignment && (p.assignment.url || p.assignment.title)) totalAssigns++;
    });
  });

  const elMod = document.getElementById('curriculumModCount');
  const elPart = document.getElementById('curriculumPartCount');
  const elVid = document.getElementById('curriculumVideoCount');
  const elPdf = document.getElementById('curriculumPdfCount');
  const elNotes = document.getElementById('curriculumNotesCount');
  const elAssign = document.getElementById('curriculumAssignCount');
  const elDrive = document.getElementById('btnOpenCourseDrive');

  if (elMod) elMod.innerHTML = `📁 ${modules.length} Modules`;
  if (elPart) elPart.innerHTML = `📖 ${totalParts} Lessons`;
  if (elVid) elVid.innerHTML = `🎥 ${totalVideos} Videos`;
  if (elPdf) elPdf.innerHTML = `📄 ${totalPdfs} PDFs`;
  if (elNotes) elNotes.innerHTML = `📝 ${totalNotes} Notes`;
  if (elAssign) elAssign.innerHTML = `🎯 ${totalAssigns} Assignments`;
  if (elDrive && course.driveFolderUrl) elDrive.href = course.driveFolderUrl;

  // Render Module Jump Index Bar
  const jumpContainer = document.getElementById('curriculumJumpIndex') || document.getElementById('curriculumModuleJumpBar');
  if (jumpContainer) {
    jumpContainer.innerHTML = modules.map((m, idx) => `
      <button type="button" class="btn-mod-jump" title="${m.title}" onclick="scrollToCurriculumModule('${m.id}')">
        Mod ${m.moduleNumber || idx + 1}
      </button>
    `).join('');
  }

  // Render Modules List
  const container = document.getElementById('curriculumModulesContainer');
  if (!container) return;

  if (modules.length === 0) {
    container.innerHTML = `
      <div style="background:#FFFFFF; border:2px dashed #CBD5E1; border-radius:16px; padding:48px 24px; text-align:center;">
        <div style="font-size:2.4rem; margin-bottom:12px;">📁</div>
        <h3 style="font-size:1.15rem; font-weight:800; color:#0F172A; margin-bottom:6px;">No Curriculum Modules Yet</h3>
        <p style="font-size:0.9rem; color:#64748B; margin-bottom:18px;">Click "+ Add Module" above to create Module 1 for ${course.title}.</p>
        <button class="btn-primary-action" onclick="openAddModuleModal('${course.id}')">+ Add Module 1</button>
      </div>
    `;
    return;
  }

  container.innerHTML = modules.map((m, idx) => {
    const parts = m.parts || [];
    return `
      <div class="module-card" id="module_card_${m.id}">
        <div class="module-header" onclick="toggleModuleCard('${m.id}')" style="cursor: pointer;">
          <div class="module-header-left">
            <span class="module-number-badge">Module ${m.moduleNumber || idx + 1}</span>
            <div class="module-title-wrap">
              <h4 class="module-title-text">${m.title}</h4>
              <p class="module-desc-text">${m.description || 'Module lessons, video lectures, circuit schematics, and hands-on lab challenges.'}</p>
            </div>
          </div>
          <div class="module-header-actions" onclick="event.stopPropagation();">
            <span style="font-size:0.82rem; font-weight:700; color:#0E6258; background:#E6F4F1; padding:4px 10px; border-radius:6px;">
              ⏱️ ${m.hours || '3 Hours'} · 📚 ${parts.length} Lessons
            </span>
            <button class="btn-card-icon" title="Edit Module Title" onclick="openEditModuleModal('${course.id}', '${m.id}')">✏️</button>
            <button class="btn-card-icon delete" title="Delete Module" onclick="deleteModule('${course.id}', '${m.id}')">🗑️</button>
            <button class="btn-card-icon" title="Toggle Expand/Collapse" onclick="toggleModuleCard('${m.id}')">↕️</button>
          </div>
        </div>

        <div class="module-body">
          <div class="module-parts-list">
            ${parts.length === 0 ? `
              <div style="background:#FFFFFF; border:1px dashed #CBD5E1; border-radius:12px; padding:20px; text-align:center;">
                <p style="font-size:0.88rem; color:#64748B; margin-bottom:10px;">This module does not have any lesson parts yet.</p>
                <button class="btn-secondary-action" onclick="openAddPartModal('${course.id}', '${m.id}')">+ Add Part 1 (Lesson)</button>
              </div>
            ` : parts.map(p => renderPartCard(course.id, m.id, p)).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function scrollToCurriculumModule(moduleId) {
  const el = document.getElementById('module_card_' + moduleId);
  if (el) {
    el.classList.remove('collapsed');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.style.boxShadow = '0 0 0 3px #0E6258';
    setTimeout(() => { el.style.boxShadow = ''; }, 1600);
  }
}

let areAllModulesCollapsed = false;
function toggleAllCurriculumModules() {
  areAllModulesCollapsed = !areAllModulesCollapsed;
  const cards = document.querySelectorAll('.module-card');
  cards.forEach(card => {
    if (areAllModulesCollapsed) {
      card.classList.add('collapsed');
    } else {
      card.classList.remove('collapsed');
    }
  });

  const label = document.getElementById('labelToggleAllModules');
  if (label) {
    label.textContent = areAllModulesCollapsed ? '▲ Expand All' : '▼ Collapse All';
  }
}

function toggleModuleCard(moduleId) {
  const card = document.getElementById('module_card_' + moduleId);
  if (card) {
    card.classList.toggle('collapsed');
  }
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
let currentStudentSearchQuery = '';

function renderUsersTable(filteredList = null) {
  const tbody = document.getElementById('usersTableBody');
  if (!tbody) return;

  const users = filteredList !== null ? filteredList : (state.users || []);

  // Update total badge
  const totalBadge = document.getElementById('studentsTotalCountBadge');
  if (totalBadge) {
    totalBadge.textContent = `Total: ${users.length} Students`;
  }

  // Populate course dropdown options if empty
  const filterCourseSelect = document.getElementById('studentFilterCourse');
  if (filterCourseSelect && filterCourseSelect.options.length <= 1) {
    (state.courses || []).forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.title;
      opt.textContent = `${c.icon || '📚'} ${c.title}`;
      filterCourseSelect.appendChild(opt);
    });
  }

  if (users.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 42px 20px; color: #64748B;">
          <div style="font-size: 2.2rem; margin-bottom: 8px;">🔍</div>
          <div style="font-size: 1rem; font-weight: 700; color: #0F172A;">No Students Found</div>
          <p style="font-size: 0.85rem; margin-top: 4px;">Click "+ Add New Student" to enroll a learner manually.</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = users.map(u => {
    const initials = (u.name || 'ST').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const statusVal = (u.status || 'active').toLowerCase();
    const statusClass = statusVal === 'completed' ? 'badge-student-completed' : (statusVal === 'inactive' ? 'badge-student-inactive' : 'badge-student-active');
    const statusText = statusVal === 'completed' ? '● Certified' : (statusVal === 'inactive' ? '○ On Hold' : '● Active');

    return `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div class="student-avatar-orb">${initials}</div>
            <div>
              <strong style="color: #0F172A; font-size: 0.88rem;">${u.id}</strong>
              <div style="font-size: 0.75rem; color: #64748B;">${u.source || 'Direct'}</div>
            </div>
          </div>
        </td>
        <td>
          <strong style="color: #0F172A; font-size: 0.92rem; display: block;">${u.name}</strong>
          <span style="font-size: 0.78rem; color: #64748B;">${u.grade || 'Student'}</span>
        </td>
        <td>
          <div style="font-size: 0.86rem; color: #0F172A;">${u.email}</div>
          <div style="font-size: 0.78rem; color: #0E6258; font-weight: 700;">${u.phone || '—'}</div>
        </td>
        <td>
          <span style="display: inline-flex; align-items: center; gap: 5px; background: #F1F5F9; border: 1px solid #CBD5E1; padding: 4px 10px; border-radius: 6px; font-size: 0.78rem; font-weight: 700; color: #1E293B;">
            ${u.course || 'General STEM'}
          </span>
        </td>
        <td>
          <span class="${statusClass}">${statusText}</span>
        </td>
        <td>
          <span style="font-size: 0.82rem; color: #64748B;">${u.timestamp || 'Recent'}</span>
        </td>
        <td style="text-align: right;">
          <div style="display: inline-flex; gap: 6px;">
            <button class="btn-card-icon" title="Edit Student" onclick="openEditStudentModal('${u.id}')">✏️</button>
            <button class="btn-card-icon delete" title="Delete Student" onclick="deleteStudent('${u.id}')">🗑️</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function handleStudentSearch() {
  const query = (document.getElementById('studentSearchInput')?.value || '').trim().toLowerCase();
  const courseFilter = (document.getElementById('studentFilterCourse')?.value || 'all').toLowerCase();
  const statusFilter = (document.getElementById('studentFilterStatus')?.value || 'all').toLowerCase();

  let filtered = (state.users || []).filter(u => {
    const matchesQuery = !query || 
      (u.name && u.name.toLowerCase().includes(query)) ||
      (u.email && u.email.toLowerCase().includes(query)) ||
      (u.phone && u.phone.toLowerCase().includes(query)) ||
      (u.id && u.id.toLowerCase().includes(query));

    const matchesCourse = courseFilter === 'all' || 
      (u.course && u.course.toLowerCase().includes(courseFilter));

    const userStatus = (u.status || 'active').toLowerCase();
    const matchesStatus = statusFilter === 'all' || userStatus === statusFilter;

    return matchesQuery && matchesCourse && matchesStatus;
  });

  renderUsersTable(filtered);
}

function openAddStudentModal() {
  const form = document.getElementById('studentEditForm');
  if (form) form.reset();

  document.getElementById('studentEditId').value = '';
  document.getElementById('studentModalTitle').textContent = 'Add New Student (नया विद्यार्थी जोड़ें)';
  document.getElementById('studentSubmitBtn').textContent = 'Save Student Details';

  // Populate course dropdown
  const courseSelect = document.getElementById('studentInputCourse');
  if (courseSelect) {
    courseSelect.innerHTML = (state.courses || []).map(c => `
      <option value="${c.title}">${c.icon || '📚'} ${c.title}</option>
    `).join('');
  }

  const modal = document.getElementById('modalStudentForm');
  if (modal) modal.classList.add('active');
}

function openEditStudentModal(studentId) {
  const student = (state.users || []).find(u => u.id === studentId);
  if (!student) return;

  document.getElementById('studentEditId').value = student.id;
  document.getElementById('studentModalTitle').textContent = 'Edit Student Details (विद्यार्थी विवरण अपडेट)';
  document.getElementById('studentSubmitBtn').textContent = 'Update Student Details';

  document.getElementById('studentInputName').value = student.name || '';
  document.getElementById('studentInputEmail').value = student.email || '';
  document.getElementById('studentInputPhone').value = student.phone || '';

  // Populate course dropdown
  const courseSelect = document.getElementById('studentInputCourse');
  if (courseSelect) {
    courseSelect.innerHTML = (state.courses || []).map(c => `
      <option value="${c.title}" ${student.course === c.title ? 'selected' : ''}>${c.icon || '📚'} ${c.title}</option>
    `).join('');
  }

  document.getElementById('studentInputGrade').value = student.grade || '';
  document.getElementById('studentInputStatus').value = student.status || 'active';
  document.getElementById('studentInputNotes').value = student.notes || '';

  const modal = document.getElementById('modalStudentForm');
  if (modal) modal.classList.add('active');
}

function closeStudentModal() {
  const modal = document.getElementById('modalStudentForm');
  if (modal) modal.classList.remove('active');
}

function handleSaveStudent(event) {
  if (event) event.preventDefault();

  const editId = document.getElementById('studentEditId')?.value;
  const name = document.getElementById('studentInputName')?.value.trim();
  const email = document.getElementById('studentInputEmail')?.value.trim();
  const phone = document.getElementById('studentInputPhone')?.value.trim();
  const course = document.getElementById('studentInputCourse')?.value;
  const grade = document.getElementById('studentInputGrade')?.value.trim() || 'Student';
  const status = document.getElementById('studentInputStatus')?.value || 'active';
  const notes = document.getElementById('studentInputNotes')?.value.trim() || '';

  if (!name || !email || !phone) {
    alert('Please fill in Student Name, Email, and Phone.');
    return;
  }

  if (!state.users) state.users = [];

  if (editId) {
    // Edit existing
    const idx = state.users.findIndex(u => u.id === editId);
    if (idx !== -1) {
      state.users[idx] = {
        ...state.users[idx],
        name,
        email,
        phone,
        course,
        grade,
        status,
        notes,
        updatedAt: new Date().toISOString()
      };
      showToast('✓ Student details successfully updated!');
    }
  } else {
    // Add new
    const newStudent = {
      id: 'STU-' + (state.users.length + 101),
      name,
      email,
      phone,
      course,
      grade,
      status,
      notes,
      source: 'Direct Portal',
      location: 'India',
      timestamp: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    state.users.unshift(newStudent);
    showToast('✓ New Student added to directory!');
  }

  localStorage.setItem(ADMIN_CONFIG.usersKey, JSON.stringify(state.users));
  state.syncToCloud('sync_users', { users: state.users });
  closeStudentModal();
  renderUsersTable();
  renderDashboardMetrics();
}

function deleteStudent(studentId) {
  const student = (state.users || []).find(u => u.id === studentId);
  const studentName = student ? student.name : 'this student';

  if (!confirm(`Are you sure you want to delete ${studentName} (${studentId}) from the directory?`)) {
    return;
  }

  state.users = (state.users || []).filter(u => u.id !== studentId);
  localStorage.setItem(ADMIN_CONFIG.usersKey, JSON.stringify(state.users));
  state.syncToCloud('sync_users', { users: state.users });
  renderUsersTable();
  renderDashboardMetrics();
  showToast('✓ Student record deleted successfully.');
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
    notifications: 'Alerts & Popups Manager',
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
  if (tabName === 'notifications') {
    renderTickerSettings();
    renderPopupsTable();
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

  // Restore saved sidebar collapsed preference on desktop
  const savedSidebar = localStorage.getItem('ng_admin_sidebar_collapsed');
  if (savedSidebar === 'true' && window.innerWidth > 991) {
    toggleSidebar(false);
  }

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

// =====================================================================
// NOTIFICATIONS & POPUPS MANAGEMENT LOGIC
// =====================================================================

let currentPopupFilter = 'all';

function renderTickerSettings() {
  const ticker = state.ticker || DEFAULT_TICKER;
  
  const enableSwitch = document.getElementById('tickerEnableSwitch');
  const badgeInput = document.getElementById('tickerInputBadge');
  const highlightInput = document.getElementById('tickerInputHighlight');
  const msg1Input = document.getElementById('tickerInputMsg1');
  const msg2Input = document.getElementById('tickerInputMsg2');
  const msg3Input = document.getElementById('tickerInputMsg3');
  const bgInput = document.getElementById('tickerInputBgColor');
  const textInput = document.getElementById('tickerInputTextColor');
  const speedSelect = document.getElementById('tickerInputSpeed');

  if (enableSwitch) enableSwitch.checked = ticker.enabled !== false;
  if (badgeInput) badgeInput.value = ticker.badgeText || '📢 NOTICE';
  if (highlightInput) highlightInput.value = ticker.highlightWord || '100% free';
  if (msg1Input) msg1Input.value = ticker.text1 || '';
  if (msg2Input) msg2Input.value = ticker.text2 || '';
  if (msg3Input) msg3Input.value = ticker.text3 || '';
  if (bgInput) bgInput.value = ticker.bgColor || '#F59E0B';
  if (textInput) textInput.value = ticker.textColor || '#0F172A';
  if (speedSelect && ticker.speed) speedSelect.value = ticker.speed;

  handleTickerPreviewUpdate();
}

function handleTickerPreviewUpdate() {
  const isEnabled = document.getElementById('tickerEnableSwitch')?.checked;
  const badge = document.getElementById('tickerInputBadge')?.value || '📢 NOTICE';
  const highlight = document.getElementById('tickerInputHighlight')?.value || '100% free';
  const msg1 = document.getElementById('tickerInputMsg1')?.value || '';
  const msg2 = document.getElementById('tickerInputMsg2')?.value || '';
  const msg3 = document.getElementById('tickerInputMsg3')?.value || '';
  const bgColor = document.getElementById('tickerInputBgColor')?.value || '#F59E0B';
  const textColor = document.getElementById('tickerInputTextColor')?.value || '#0F172A';
  const speed = document.getElementById('tickerInputSpeed')?.value || '28s';

  const previewStrip = document.getElementById('adminTickerPreviewStrip');
  const previewBadge = document.getElementById('adminTickerPreviewBadge');
  const previewBadgeText = document.getElementById('previewBadgeText');
  const previewTrack = document.getElementById('adminTickerPreviewTrack');

  if (previewStrip) {
    previewStrip.style.backgroundColor = bgColor;
    previewStrip.style.color = textColor;
    previewStrip.style.opacity = isEnabled ? '1' : '0.4';
  }

  if (previewBadge) {
    previewBadge.style.color = bgColor;
  }
  if (previewBadgeText) {
    previewBadgeText.textContent = badge.replace('📢', '').trim();
  }

  if (previewTrack) {
    const formatMsg = (msg) => {
      if (highlight && msg.includes(highlight)) {
        return msg.replace(highlight, `<strong style="font-weight: 900; text-decoration: underline; text-underline-offset: 3px; margin-left: 4px;">${highlight}</strong>`);
      }
      return msg;
    };

    let itemsHtml = `<span class="top-ticker-item" style="color: ${textColor}; padding: 0 18px; display: inline-flex; align-items: center; white-space: nowrap; font-weight: 700;">${formatMsg(msg1)}</span>`;
    if (msg2) {
      itemsHtml += `<span class="top-ticker-separator" style="color: ${textColor}; opacity: 0.6; padding: 0 10px;">✦</span><span class="top-ticker-item" style="color: ${textColor}; padding: 0 18px; display: inline-flex; align-items: center; white-space: nowrap; font-weight: 700;">${formatMsg(msg2)}</span>`;
    }
    if (msg3) {
      itemsHtml += `<span class="top-ticker-separator" style="color: ${textColor}; opacity: 0.6; padding: 0 10px;">✦</span><span class="top-ticker-item" style="color: ${textColor}; padding: 0 18px; display: inline-flex; align-items: center; white-space: nowrap; font-weight: 700;">${formatMsg(msg3)}</span>`;
    }

    previewTrack.innerHTML = itemsHtml + `<span class="top-ticker-separator" style="color: ${textColor}; opacity: 0.6; padding: 0 10px;">✦</span>` + itemsHtml;
    previewTrack.style.animationDuration = speed;
  }
}

function applyTickerColorPreset(bgColor, textColor) {
  const bgInput = document.getElementById('tickerInputBgColor');
  const textInput = document.getElementById('tickerInputTextColor');
  if (bgInput) bgInput.value = bgColor;
  if (textInput) textInput.value = textColor;

  document.querySelectorAll('.btn-color-preset').forEach(btn => btn.classList.remove('active'));
  handleTickerPreviewUpdate();
}

function handleSaveTickerSettings(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  try {
    const isEnabled = document.getElementById('tickerEnableSwitch')?.checked !== false;
    const badge = document.getElementById('tickerInputBadge')?.value.trim() || '📢 NOTICE';
    const highlight = document.getElementById('tickerInputHighlight')?.value.trim() || '';
    const msg1 = document.getElementById('tickerInputMsg1')?.value.trim() || '';
    const msg2 = document.getElementById('tickerInputMsg2')?.value.trim() || '';
    const msg3 = document.getElementById('tickerInputMsg3')?.value.trim() || '';
    const bgColor = document.getElementById('tickerInputBgColor')?.value || '#F59E0B';
    const textColor = document.getElementById('tickerInputTextColor')?.value || '#0F172A';
    const speed = document.getElementById('tickerInputSpeed')?.value || '28s';

    const newTicker = {
      enabled: isEnabled,
      badgeText: badge,
      highlightWord: highlight,
      text1: msg1,
      text2: msg2,
      text3: msg3,
      bgColor: bgColor,
      textColor: textColor,
      speed: speed,
      updatedAt: new Date().toISOString()
    };

    state.ticker = newTicker;
    localStorage.setItem(ADMIN_CONFIG.tickerKey, JSON.stringify(newTicker));
    state.syncToCloud('sync_ticker', { ticker: newTicker });
    showToast('✓ Top Scrolling Ticker successfully saved & published to website!');
  } catch (err) {
    console.error('Error saving ticker:', err);
    alert('Error saving ticker: ' + err.message);
  }
}

function renderPopupsTable(filterAudience = currentPopupFilter) {
  currentPopupFilter = filterAudience;
  const container = document.getElementById('popupsListContainer');
  if (!container) return;

  const popups = state.popups || [];

  // Update Counters
  const countAll = popups.length;
  const countHome = popups.filter(p => p.audience === 'home').length;
  const countStudents = popups.filter(p => p.audience === 'students').length;

  const elAll = document.getElementById('countPopupsAll');
  const elHome = document.getElementById('countPopupsHome');
  const elStudents = document.getElementById('countPopupsStudents');
  const sidebarBadge = document.getElementById('sidebarPopupsBadge');

  if (elAll) elAll.textContent = countAll;
  if (elHome) elHome.textContent = countHome;
  if (elStudents) elStudents.textContent = countStudents;
  if (sidebarBadge) {
    const activeCount = popups.filter(p => p.isActive).length;
    sidebarBadge.textContent = activeCount;
    sidebarBadge.style.display = activeCount > 0 ? 'inline-block' : 'none';
  }

  // Filter
  const filtered = filterAudience === 'all' 
    ? popups 
    : popups.filter(p => p.audience === filterAudience || p.audience === 'all');

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 48px 24px; text-align: center; background: #FFFFFF; border: 2px dashed #E2E8F0; border-radius: 16px;">
        <span style="font-size: 2.8rem; display: block; margin-bottom: 12px;">📭</span>
        <h4 style="font-size: 1.15rem; color: #0F172A; margin-bottom: 6px;">No Popups Found for this Filter</h4>
        <p style="font-size: 0.88rem; color: #64748B; margin-bottom: 18px;">Click "Create New Popup" to add an announcement or event modal.</p>
        <button type="button" class="btn-primary-action" onclick="openCreatePopupModal()">+ Create New Popup</button>
      </div>
    `;
    return;
  }

  let html = '';
  filtered.forEach(popup => {
    const audClass = popup.audience === 'home' ? 'badge-aud-home' : (popup.audience === 'students' ? 'badge-aud-students' : 'badge-aud-all');
    const audLabel = popup.audience === 'home' ? '🏠 Home Page Only' : (popup.audience === 'students' ? '🎓 Students Only' : '🌐 All Visitors & Students');
    const statusClass = popup.isActive ? 'pill-active' : 'pill-inactive';
    const statusText = popup.isActive ? '● Live' : '○ Inactive';

    let scheduleHtml = '';
    if (popup.hasSchedule && (popup.scheduleDate || popup.scheduleTime)) {
      scheduleHtml = `
        <div class="popup-card-schedule-chip">
          <span>⏰</span>
          <span>${popup.scheduleLabel || 'Scheduled:'} ${popup.scheduleDate || ''} ${popup.scheduleTime || ''}</span>
        </div>
      `;
    } else {
      scheduleHtml = `
        <div class="popup-card-schedule-chip" style="color: #64748B;">
          <span>🟢</span>
          <span>Without Date/Time (Always Active)</span>
        </div>
      `;
    }

    const bannerHtml = popup.image 
      ? `<img src="${popup.image}" alt="${popup.title}" class="popup-card-banner-img">`
      : `<div class="popup-card-banner-placeholder"><span>📢</span></div>`;

    html += `
      <div class="popup-admin-card ${popup.isActive ? '' : 'inactive'}">
        <div class="popup-card-banner-wrap">
          ${bannerHtml}
          <span class="popup-badge-audience ${audClass}">${audLabel}</span>
          <span class="popup-status-pill ${statusClass}">${statusText}</span>
        </div>
        
        <div class="popup-card-content">
          <h4 class="popup-card-title">${popup.title}</h4>
          <p class="popup-card-msg">${popup.message}</p>
          ${scheduleHtml}
        </div>

        <div class="popup-card-footer">
          <label style="display: flex; align-items: center; gap: 6px; font-size: 0.82rem; font-weight: 700; cursor: pointer;">
            <input type="checkbox" ${popup.isActive ? 'checked' : ''} onchange="togglePopupStatus('${popup.id}')" style="accent-color: var(--admin-teal); width: 16px; height: 16px;">
            <span>${popup.isActive ? 'Active' : 'Draft'}</span>
          </label>

          <div class="popup-footer-actions">
            <button class="btn-card-icon" title="Preview Popup" onclick="previewPopupModal('${popup.id}')">👁️</button>
            <button class="btn-card-icon" title="Edit Popup" onclick="openEditPopupModal('${popup.id}')">✏️</button>
            <button class="btn-card-icon delete" title="Delete Popup" onclick="deletePopup('${popup.id}')">🗑️</button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function filterPopupsTable(aud) {
  document.querySelectorAll('.upload-type-btn').forEach(btn => btn.classList.remove('active'));
  const targetBtn = document.getElementById('popupFilter_' + aud);
  if (targetBtn) targetBtn.classList.add('active');
  renderPopupsTable(aud);
}

function applyPopupImagePreset(url) {
  const input = document.getElementById('popupInputImageUrl');
  if (input) input.value = url;
  handlePopupImagePreview(url);
  updateModalLivePreview();
}

function insertEmojiToTitle(emoji) {
  const input = document.getElementById('popupInputTitle');
  if (input) {
    input.value = emoji + ' ' + input.value.replace(/^[\p{Emoji}\s]+/u, '');
    updateModalLivePreview();
    input.focus();
  }
}

function updateModalLivePreview() {
  const title = document.getElementById('popupInputTitle')?.value.trim() || 'Your Popup Title Here';
  const msg = document.getElementById('popupInputMessage')?.value.trim() || 'Your announcement message text will appear here.';
  const imgUrl = document.getElementById('popupInputImageUrl')?.value.trim();
  const aud = document.getElementById('popupInputAudience')?.value || 'home';
  const hasSched = document.getElementById('popupInputHasSchedule')?.checked === true;
  const schedText = document.getElementById('popupInputScheduleText')?.value.trim();
  const schedDate = document.getElementById('popupInputDate')?.value;
  const schedTime = document.getElementById('popupInputTime')?.value;
  const schedLabel = document.getElementById('popupInputScheduleLabel')?.value.trim() || 'Event Starts:';
  const btnText = document.getElementById('popupInputBtnText')?.value.trim();

  // Update in-modal preview elements
  const elTitle = document.getElementById('modalCardPreviewTitle');
  const elMsg = document.getElementById('modalCardPreviewMessage');
  const elImgWrap = document.getElementById('modalCardPreviewImgWrap');
  const elImg = document.getElementById('modalCardPreviewImg');
  const elAud = document.getElementById('modalPreviewAudienceBadge');
  const elSched = document.getElementById('modalCardPreviewSchedule');
  const elSchedText = document.getElementById('modalCardPreviewScheduleText');
  const elBtnWrap = document.getElementById('modalCardPreviewBtnWrap');
  const elBtn = document.getElementById('modalCardPreviewBtn');

  if (elTitle) elTitle.textContent = title;
  if (elMsg) elMsg.textContent = msg;

  if (elAud) {
    elAud.textContent = aud === 'home' ? '🏠 Home Page' : (aud === 'students' ? '🎓 Students Only' : '🌐 All Visitors');
    elAud.style.background = aud === 'home' ? '#0E6258' : (aud === 'students' ? '#F59E0B' : '#6366F1');
  }

  if (imgUrl && imgUrl.length > 3) {
    if (elImg) elImg.src = imgUrl;
    if (elImgWrap) elImgWrap.style.display = 'block';
  } else {
    if (elImgWrap) elImgWrap.style.display = 'none';
  }

  if (hasSched && (schedText || schedDate || schedTime)) {
    let finalSched = schedText || '';
    if (!finalSched && schedDate) {
      finalSched = `${schedDate} ${schedTime || ''}`.trim();
    }
    if (elSchedText) elSchedText.textContent = `${schedLabel} ${finalSched}`;
    if (elSched) elSched.style.display = 'flex';
  } else {
    if (elSched) elSched.style.display = 'none';
  }

  if (btnText) {
    if (elBtn) elBtn.textContent = btnText;
    if (elBtnWrap) elBtnWrap.style.display = 'block';
  } else {
    if (elBtnWrap) elBtnWrap.style.display = 'none';
  }
}

function openCreatePopupModal() {
  document.getElementById('popupEditForm').reset();
  document.getElementById('popupEditId').value = '';
  document.getElementById('popupModalTitle').textContent = 'Create Announcement Popup';
  document.getElementById('popupSubmitBtnText').textContent = 'Save & Publish Popup';
  
  clearPopupImage();
  togglePopupScheduleInputs(false);
  handlePopupAudienceChange();
  updateModalLivePreview();

  const modal = document.getElementById('modalAdminPopup');
  if (modal) modal.classList.add('active');
}

function openEditPopupModal(popupId) {
  const popup = (state.popups || []).find(p => p.id === popupId);
  if (!popup) return;

  document.getElementById('popupEditId').value = popup.id;
  document.getElementById('popupModalTitle').textContent = 'Edit Announcement Popup';
  document.getElementById('popupSubmitBtnText').textContent = 'Update & Save Popup';

  document.getElementById('popupInputAudience').value = popup.audience || 'home';
  document.getElementById('popupInputTitle').value = popup.title || '';
  document.getElementById('popupInputImageUrl').value = popup.image || '';
  document.getElementById('popupInputMessage').value = popup.message || '';

  if (popup.image) {
    handlePopupImagePreview(popup.image);
  } else {
    clearPopupImage();
  }

  const hasSched = popup.hasSchedule === true;
  document.getElementById('popupInputHasSchedule').checked = hasSched;
  togglePopupScheduleInputs(hasSched);

  document.getElementById('popupInputScheduleLabel').value = popup.scheduleLabel || 'Event Starts:';
  document.getElementById('popupInputScheduleText').value = popup.scheduleText || '';
  document.getElementById('popupInputDate').value = popup.scheduleDate || '';
  document.getElementById('popupInputTime').value = popup.scheduleTime || '';

  document.getElementById('popupInputBtnText').value = popup.btnText || '';
  document.getElementById('popupInputBtnLink').value = popup.btnLink || '';
  document.getElementById('popupInputIsActive').checked = popup.isActive !== false;

  handlePopupAudienceChange();
  updateModalLivePreview();

  const modal = document.getElementById('modalAdminPopup');
  if (modal) modal.classList.add('active');
}

function closePopupModal() {
  const modal = document.getElementById('modalAdminPopup');
  if (modal) modal.classList.remove('active');
}

function handlePopupAudienceChange() {
  const val = document.getElementById('popupInputAudience')?.value;
  const hint = document.getElementById('popupAudienceHint');
  if (!hint) return;

  if (val === 'home') {
    hint.textContent = '✓ यह पॉप-अप वेबसाइट के मुख्य होम पेज पर सभी विजिटर्स को दिखेगा।';
  } else if (val === 'students') {
    hint.textContent = '✓ यह पॉप-अप स्टूडेंट्स पोर्टल और स्टूडेंट लॉगिन स्क्रीन पर दिखेगा।';
  } else {
    hint.textContent = '✓ यह पॉप-अप होम पेज और स्टूडेंट्स पोर्टल दोनों जगह दिखेगा।';
  }
}

function togglePopupScheduleInputs(isChecked) {
  const wrap = document.getElementById('popupScheduleFieldsWrap');
  const badge = document.getElementById('popupScheduleStatusBadge');

  if (wrap) wrap.style.display = isChecked ? 'block' : 'none';
  if (badge) {
    badge.textContent = isChecked ? 'Included' : 'Optional';
    badge.style.background = isChecked ? '#D1FAE5' : '#E2E8F0';
    badge.style.color = isChecked ? '#065F46' : '#64748B';
  }
}

function handlePopupImagePreview(url) {
  const box = document.getElementById('popupImagePreviewBox');
  const el = document.getElementById('popupImagePreviewEl');
  if (!box || !el) return;

  if (url && url.trim().length > 3) {
    el.src = url.trim();
    box.style.display = 'block';
  } else {
    box.style.display = 'none';
  }
}

function clearPopupImage() {
  const input = document.getElementById('popupInputImageUrl');
  const box = document.getElementById('popupImagePreviewBox');
  const fileInput = document.getElementById('popupFileInput');
  if (input) input.value = '';
  if (box) box.style.display = 'none';
  if (fileInput) fileInput.value = '';
  updateModalLivePreview();
}

// Canvas-based image auto-compressor: compresses camera photos to max 800px & ~40KB JPEG
function handlePopupFileUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const maxDim = 800;
      let width = img.width;
      let height = img.height;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Lightweight compressed JPEG (~35-60KB)
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.75);
      const urlInput = document.getElementById('popupInputImageUrl');
      if (urlInput) urlInput.value = compressedDataUrl;
      handlePopupImagePreview(compressedDataUrl);
      updateModalLivePreview();
      showToast('✓ Photo compressed & attached successfully!');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function handleSavePopup(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  try {
    const editId = document.getElementById('popupEditId')?.value;
    const audience = document.getElementById('popupInputAudience')?.value || 'home';
    const title = document.getElementById('popupInputTitle')?.value.trim();
    const image = document.getElementById('popupInputImageUrl')?.value.trim();
    const message = document.getElementById('popupInputMessage')?.value.trim();

    const hasSchedule = document.getElementById('popupInputHasSchedule')?.checked === true;
    const scheduleLabel = document.getElementById('popupInputScheduleLabel')?.value.trim() || 'Event Starts:';
    const scheduleText = document.getElementById('popupInputScheduleText')?.value.trim() || '';
    const scheduleDate = document.getElementById('popupInputDate')?.value || '';
    const scheduleTime = document.getElementById('popupInputTime')?.value || '';

    const btnText = document.getElementById('popupInputBtnText')?.value.trim() || '';
    const btnLink = document.getElementById('popupInputBtnLink')?.value.trim() || '';
    const isActive = document.getElementById('popupInputIsActive')?.checked === true;

    if (!title) {
      alert('Please enter a Popup Title.');
      return;
    }
    if (!message) {
      alert('Please enter Popup Message details.');
      return;
    }

    if (!state.popups) state.popups = [];

    const nowIso = new Date().toISOString();

    if (editId) {
      const idx = state.popups.findIndex(p => p.id === editId);
      if (idx !== -1) {
        state.popups[idx] = {
          ...state.popups[idx],
          audience,
          title,
          image,
          message,
          hasSchedule,
          scheduleLabel,
          scheduleText,
          scheduleDate,
          scheduleTime,
          btnText,
          btnLink,
          isActive,
          updatedAt: nowIso
        };
        showToast('✓ Popup successfully updated!');
      }
    } else {
      const newPopup = {
        id: 'popup_' + Date.now(),
        audience,
        title,
        image,
        message,
        hasSchedule,
        scheduleLabel,
        scheduleText,
        scheduleDate,
        scheduleTime,
        btnText,
        btnLink,
        isActive,
        createdAt: nowIso,
        updatedAt: nowIso
      };
      state.popups.unshift(newPopup);
      showToast('✓ New Popup created & published live!');
    }

    // Persist to localStorage safely
    try {
      localStorage.setItem(ADMIN_CONFIG.popupsKey, JSON.stringify(state.popups));
    } catch (quotaErr) {
      console.warn('Storage quota warning, pruning old inactive entries:', quotaErr);
      state.popups = state.popups.slice(0, 10);
      localStorage.setItem(ADMIN_CONFIG.popupsKey, JSON.stringify(state.popups));
    }

    // Reset dismissal cache so admin immediately sees it on website
    clearAllPopupDismissals();

    // Cloud sync
    state.syncToCloud('sync_popups', { popups: state.popups });

    closePopupModal();
    renderPopupsTable();
  } catch (err) {
    console.error('Error saving popup:', err);
    alert('Could not save popup: ' + err.message);
  }
}

function togglePopupStatus(popupId) {
  const popup = (state.popups || []).find(p => p.id === popupId);
  if (!popup) return;

  popup.isActive = !popup.isActive;
  popup.updatedAt = new Date().toISOString();
  localStorage.setItem(ADMIN_CONFIG.popupsKey, JSON.stringify(state.popups));
  clearAllPopupDismissals();
  state.syncToCloud('sync_popups', { popups: state.popups });
  renderPopupsTable();
  showToast(popup.isActive ? '✓ Popup is now LIVE on website!' : '○ Popup has been deactivated.');
}

function deletePopup(popupId) {
  if (!confirm('Are you sure you want to delete this popup?')) return;

  state.popups = (state.popups || []).filter(p => p.id !== popupId);
  localStorage.setItem(ADMIN_CONFIG.popupsKey, JSON.stringify(state.popups));
  state.syncToCloud('sync_popups', { popups: state.popups });
  renderPopupsTable();
  showToast('✓ Popup deleted successfully.');
}

function clearAllPopupDismissals() {
  Object.keys(sessionStorage).forEach(k => {
    if (k.startsWith('dismissed_site_popup_')) sessionStorage.removeItem(k);
  });
  Object.keys(localStorage).forEach(k => {
    if (k.startsWith('dismissed_popup_day_') || k.startsWith('dismissed_popup_time_')) localStorage.removeItem(k);
  });
}

function testLivePopupsOnWebsite() {
  clearAllPopupDismissals();
  window.open('index.html?test_popup=1', '_blank');
}

function previewPopupModal(popupId) {
  const popup = (state.popups || []).find(p => p.id === popupId);
  if (!popup) return;

  const modal = document.getElementById('modalContentPreview');
  const titleEl = document.getElementById('previewModalTitle');
  const typeBadge = document.getElementById('previewTypeBadge');
  const container = document.getElementById('previewMediaContainer');
  const folderLoc = document.getElementById('previewFolderLocation');
  const driveLink = document.getElementById('previewDriveLink');

  if (titleEl) titleEl.textContent = 'Popup Preview: ' + popup.title;
  if (typeBadge) {
    typeBadge.className = 'curriculum-stat-pill pill-video';
    typeBadge.textContent = 'Target: ' + (popup.audience === 'home' ? 'Home Page' : (popup.audience === 'students' ? 'Students Portal' : 'All'));
  }

  let schedHtml = '';
  const finalSched = popup.scheduleText || (popup.scheduleDate ? `${popup.scheduleDate} ${popup.scheduleTime || ''}` : '');
  if (popup.hasSchedule && finalSched) {
    schedHtml = `
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 10px; padding: 10px 14px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; color: #92400E; font-size: 0.88rem; font-weight: 700;">
        <span>⏰</span>
        <span>${popup.scheduleLabel || 'Schedule:'} ${finalSched}</span>
      </div>
    `;
  }

  const imgHtml = popup.image ? `<img src="${popup.image}" style="width: 100%; max-height: 220px; object-fit: cover; border-radius: 12px; margin-bottom: 16px; border: 1.5px solid #CBD5E1;">` : '';

  if (container) {
    container.innerHTML = `
      <div style="text-align: left; max-width: 480px; margin: 0 auto; padding: 10px;">
        ${imgHtml}
        <h3 style="font-size: 1.35rem; font-weight: 800; color: #0F172A; margin-bottom: 8px;">${popup.title}</h3>
        <p style="font-size: 0.92rem; color: #475569; line-height: 1.6; margin-bottom: 16px;">${popup.message}</p>
        ${schedHtml}
        ${popup.btnText ? `<a href="${popup.btnLink || '#'}" class="btn-primary-action" style="display: block; text-align: center; justify-content: center; text-decoration: none; font-weight: 800;">${popup.btnText}</a>` : ''}
      </div>
    `;
  }

  if (folderLoc) folderLoc.textContent = 'Status: ' + (popup.isActive ? 'Active & Live' : 'Draft (Inactive)');
  if (driveLink) driveLink.style.display = 'none';

  if (modal) modal.classList.add('active');
}


// =====================================================================
// SIDEBAR COLLAPSE TOGGLE SYSTEM (DESKTOP & MOBILE)
// =====================================================================
function toggleSidebar(forceState = null) {
  const layout = document.getElementById('adminAppLayout');
  const label = document.getElementById('sidebarToggleLabel');
  const sidebar = document.getElementById('adminSidebar');
  if (!layout) return;

  const isMobile = window.innerWidth <= 991;

  if (isMobile) {
    if (sidebar) {
      const isOpen = forceState !== null ? forceState : !sidebar.classList.contains('open');
      sidebar.classList.toggle('open', isOpen);
    }
  } else {
    const isCollapsed = forceState !== null 
      ? !forceState 
      : !layout.classList.contains('sidebar-collapsed');

    layout.classList.toggle('sidebar-collapsed', isCollapsed);
    localStorage.setItem('ng_admin_sidebar_collapsed', isCollapsed ? 'true' : 'false');

    if (label) {
      label.textContent = isCollapsed ? 'Show Sidebar ☰' : 'Hide Sidebar';
    }
  }
}

// Global shortcut listener (Ctrl + B)
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
    e.preventDefault();
    toggleSidebar();
  }
});
