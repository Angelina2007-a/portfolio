/* ==========================================================================
   ANGELINA RAJ — PORTFOLIO INTERACTIVE ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Mouse Glow Follower Logic
  const cursorGlow = document.getElementById('cursorGlow');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    if (cursorGlow) {
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
    }
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // 3. Navbar Scroll Class & Active Links
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 4. Mobile Drawer Menu Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMobileNav() {
    mobileNavOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileNav);
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileNav));

  // 5. Scroll Reveal Observer with Fallback
  const revealItems = document.querySelectorAll('.reveal-item');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealItems.forEach(el => revealObserver.observe(el));

  // 6. Complete Projects Data Repository for Interactive Modal
  const PROJECTS_DATA = {
    terraflow: {
      category: 'AI × IoT × SUSTAINABLE AGRICULTURE',
      title: 'Terraflow',
      overview: 'AI-driven smart irrigation and precision agriculture platform that estimates crop water demand based on real-time sensor feedback and micro-climate forecasting.',
      problem: 'Traditional agriculture relies on manual or static timer-based watering schedules, causing up to 40% water waste, nutrient leaching, and suboptimal crop yields.',
      approach: 'Integrated real-time soil moisture, ambient temperature, humidity, and crop growth stage metrics into machine learning models running edge inference on ESP32 microcontrollers to automate micro-irrigation.',
      outcome: 'Reduced water consumption significantly while preserving optimal soil moisture levels and improving crop health.',
      tags: ['ESP32', 'Python', 'Machine Learning', 'IoT Sensors', 'Precision Ag'],
      github: 'https://github.com/Angelina2007-a'
    },
    meditriage: {
      category: 'AI × HEALTHCARE',
      title: 'Smart MediTriage-AI',
      overview: 'AI-based healthcare triage and decision-support system designing rapid intake risk stratification, patient prioritization, and emergency decision assistance.',
      problem: 'Emergency departments and community clinics experience critical bottlenecks during initial patient assessment, leading to treatment delays for high-risk patients.',
      approach: 'Developed an intelligent clinical decision-support pipeline using natural language processing and risk classification models to categorize patient intake symptoms and vital signs.',
      outcome: 'Streamlined initial patient intake and provided healthcare workers with instant automated risk scores to prioritize urgent clinical cases.',
      tags: ['Python', 'NLP', 'Decision Support', 'Scikit-Learn', 'REST API'],
      github: 'https://github.com/Angelina2007-a'
    },
    kubescaleai: {
      category: 'AI × CLOUD × KUBERNETES',
      title: 'KubeScaleAI',
      overview: 'Cloud-native AI infrastructure workspace orchestrating containerized machine learning workloads with Docker, Kubernetes, Minikube, and Linux automation.',
      problem: 'Machine learning inference services frequently bottleneck or waste cloud resources when handling variable traffic surges without automated scaling.',
      approach: 'Built containerized ML microservices deployed on Kubernetes clusters using Minikube, implementing horizontal pod autoscaling, resource limits, and custom ingress rules.',
      outcome: 'Achieved seamless cloud-native scaling for AI microservices with reliable zero-downtime rolling updates.',
      tags: ['Docker', 'Kubernetes', 'Minikube', 'Linux', 'Git/GitHub'],
      github: 'https://github.com/Angelina2007-a'
    },
    riceseed: {
      category: 'COMPUTER VISION × SENSORS × ML',
      title: 'Hybrid vs Non-Hybrid Rice Seed Classification',
      overview: 'Multimodal AI classification distinguishing Hybrid vs Non-Hybrid rice seeds using AS726X spectral sensing and MLX90640 thermal imaging with machine learning.',
      problem: 'Distinguishing hybrid from non-hybrid rice seeds manually is labor-intensive, error-prone, and destroys seed samples during biochemical testing.',
      approach: 'Combined multi-spectral reflectance data from AS726X sensors with thermal signatures captured via MLX90640 thermal imaging into a multimodal Random Forest feature matrix.',
      outcome: 'Delivered high-accuracy non-destructive seed sorting without damaging crop viability.',
      tags: ['AS726X Spectral', 'MLX90640 Thermal', 'Random Forest', 'OpenCV'],
      github: 'https://github.com/Angelina2007-a'
    },
    'qubo-qaoa': {
      category: 'QUANTUM COMPUTING × OPTIMIZATION',
      title: 'QUBO-QAOA Traffic Signal Optimization',
      overview: 'Quantum-inspired optimization approach for traffic signal timing under dynamically changing urban traffic conditions.',
      problem: 'Conventional fixed-time signal timing cycles cannot adapt to sudden congestion surges at complex multi-road urban intersections.',
      approach: 'Formulated signal phase scheduling as a Quadratic Unconstrained Binary Optimization (QUBO) problem and executed simulations via Quantum Approximate Optimization Algorithm (QAOA).',
      outcome: 'Demonstrated notable reductions in simulated vehicle delay and intersection queue lengths compared to static baseline timing.',
      tags: ['QUBO', 'QAOA Algorithm', 'Python', 'Qiskit / Optimization'],
      github: 'https://github.com/Angelina2007-a'
    },
    hvac: {
      category: 'AI × AUTOMATION',
      title: 'AI-Driven HVAC Control System',
      overview: 'Predictive climate and energy control system optimizing HVAC power consumption while maintaining occupant thermal comfort parameters.',
      problem: 'Standard HVAC controllers consume excessive power by reacting strictly to threshold triggers rather than predicting thermal load demand.',
      approach: 'Implemented a predictive machine learning loop utilizing occupancy patterns, outdoor weather forecasts, and room thermal dynamics to regulate setpoints proactively.',
      outcome: 'Substantially lowered energy consumption while maintaining indoor thermal comfort thresholds.',
      tags: ['Predictive ML', 'IoT Sensors', 'Automation', 'Thermal Dynamics'],
      github: 'https://github.com/Angelina2007-a'
    },
    'infra-planner': {
      category: 'AI × INFRASTRUCTURE',
      title: 'Predictive Infrastructure Planner',
      overview: 'Machine learning framework forecasting structural wear, urban growth patterns, and preemptive maintenance scheduling for smart cities.',
      problem: 'Reactive municipal maintenance leads to unexpected structural failures, traffic disruptions, and inflated emergency repair budgets.',
      approach: 'Applied time-series forecasting and spatial clustering on historical maintenance, traffic density, and sensor data to compute failure probabilities.',
      outcome: 'Enabled municipal planners to schedule proactive repairs prior to critical infrastructure failure.',
      tags: ['Time-Series ML', 'Geospatial', 'Scikit-Learn', 'Analytics'],
      github: 'https://github.com/Angelina2007-a'
    },
    'gemini-editor': {
      category: 'GENERATIVE AI',
      title: 'Gemini-Powered Image Editor',
      overview: 'Multimodal generative AI photo editor integrating Google Gemini API for intelligent context-aware image manipulation and natural language edits.',
      problem: 'Advanced photo editing software requires steep learning curves for non-technical users attempting complex visual transformations.',
      approach: 'Integrated Google Gemini API endpoints with an HTML5 Canvas front-end to process natural language editing instructions, automated background segmentation, and generative fills.',
      outcome: 'Simplified photo editing workflows into conversational prompt-driven creative enhancements.',
      tags: ['Google Gemini API', 'JavaScript', 'Canvas API', 'REST API'],
      github: 'https://github.com/Angelina2007-a'
    },
    'surveillance-iot': {
      category: 'IoT × COMPUTER VISION',
      title: 'Smart Surveillance & Inventory System',
      overview: 'Distributed IoT camera and vision pipeline delivering real-time anomaly detection, automated inventory tracking, and telemetry alerting.',
      problem: 'Manual inventory monitoring and facility security operate separately, leaving operational blindspots and requiring heavy labor.',
      approach: 'Deployed edge camera modules running lightweight object detection linked via MQTT to a central telemetry dashboard for stock level tracking and security alerts.',
      outcome: 'Provided continuous inventory tracking and instant security anomaly notifications.',
      tags: ['OpenCV', 'ESP32-CAM', 'Edge AI', 'MQTT'],
      github: 'https://github.com/Angelina2007-a'
    }
  };

  // 7. Interactive Project Modal Logic
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const projectCards = document.querySelectorAll('.project-card');

  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalOverview = document.getElementById('modalOverview');
  const modalProblem = document.getElementById('modalProblem');
  const modalApproach = document.getElementById('modalApproach');
  const modalOutcome = document.getElementById('modalOutcome');
  const modalTags = document.getElementById('modalTags');
  const modalGithubBtn = document.getElementById('modalGithubBtn');

  function openProjectModal(id) {
    const data = PROJECTS_DATA[id];
    if (!data) return;

    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalOverview.textContent = data.overview;
    modalProblem.textContent = data.problem;
    modalApproach.textContent = data.approach;
    modalOutcome.textContent = data.outcome;
    modalGithubBtn.href = data.github;

    modalTags.innerHTML = '';
    data.tags.forEach(tag => {
      const chip = document.createElement('span');
      chip.textContent = tag;
      modalTags.appendChild(chip);
    });

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project-id');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });

  // 8. Interactive Research Background Canvas (Nodes & Signals)
  const canvas = document.getElementById('nodeCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    });

    const nodes = [];
    const nodeCount = Math.floor(width / 25);

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1
      });
    }

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      // Draw lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 180, 216, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Update & draw nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00B4D8';
        ctx.fill();
      });

      requestAnimationFrame(renderCanvas);
    }
    renderCanvas();
  }

  // 9. View Certificates Button
  const viewCertificatesBtn = document.getElementById('viewCertificatesBtn');
  if (viewCertificatesBtn) {
    viewCertificatesBtn.addEventListener('click', () => {
      alert('Certificates module: Verified academic records and certifications from KGiSL & AI coursework. PDF link ready for download.');
    });
  }

  // 10. Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  const formToast = document.getElementById('formToast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('formName');
      const emailInput = document.getElementById('formEmail');
      const messageInput = document.getElementById('formMessage');
      
      let isValid = true;

      // Clear previous error states
      [nameInput, emailInput, messageInput].forEach(inp => {
        if (inp) inp.parentElement.classList.remove('error');
      });

      if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add('error');
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('error');
        isValid = false;
      }

      if (!messageInput.value.trim()) {
        messageInput.parentElement.classList.add('error');
        isValid = false;
      }

      if (isValid) {
        formToast.className = 'form-toast success';
        formToast.textContent = 'Thank you! Your message draft is confirmed. Connect directly at angelinaraj.ai@gmail.com';
        contactForm.reset();
        setTimeout(() => {
          formToast.style.display = 'none';
        }, 6000);
      }
    });
  }
});
