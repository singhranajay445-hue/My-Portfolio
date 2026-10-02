/**
 * KRISHNA RAGHUWANSHI — PORTFOLIO CORE JAVASCRIPT
 * Subtle, high-performance interactions and interactive neural network canvas
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMouseGlow();
  initNeuralCanvas();
  initScrollReveal();
  initCopyActions();
  initContactForm();
  initBackToTop();
  initCardInteractions();
});

/* ==========================================================================
   1. Navbar & Navigation Handling
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-drawer-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  // Handle scroll blur & shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileDrawer.querySelectorAll('.mobile-drawer-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Active section indicator via IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));
}

/* ==========================================================================
   2. Subtle Mouse Following Ambient Glow
   ========================================================================== */
function initMouseGlow() {
  const glow = document.querySelector('.mouse-glow');
  if (!glow || window.innerWidth < 768) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function render() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;
    glow.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

/* ==========================================================================
   3. Neural Intelligence Canvas (Hero Visual)
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let particles = [];
  const particleCount = 42;
  let mouse = { x: null, y: null, radius: 120 };
  let animationFrameId;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    initParticles();
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 25 + Math.random() * (Math.min(width, height) * 0.38);
      particles.push({
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        baseX: width / 2 + Math.cos(angle) * radius,
        baseY: height / 2 + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        size: Math.random() * 2 + 1.5,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseVal: Math.random() * Math.PI,
        color: Math.random() > 0.4 ? 'rgba(56, 189, 248, ' : 'rgba(129, 140, 248, '
      });
    }
  }

  // Track mouse relative to canvas
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  let rotation = 0;

  function draw() {
    ctx.clearRect(0, 0, width, height);

    rotation += 0.002;
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw central abstract core
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);

    // Outer orbital ring
    ctx.beginPath();
    ctx.arc(0, 0, Math.min(width, height) * 0.36, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 12]);
    ctx.stroke();

    // Inner orbital ring
    ctx.beginPath();
    ctx.arc(0, 0, Math.min(width, height) * 0.22, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(129, 140, 248, 0.12)';
    ctx.setLineDash([8, 8]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Update and draw particles & connections
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];

      // Subtle natural drifting
      p.x += p.vx;
      p.y += p.vy;

      // Soft boundary bounce within viewport
      if (p.x < 15 || p.x > width - 15) p.vx *= -1;
      if (p.y < 15 || p.y > height - 15) p.vy *= -1;

      // Mouse interactive deflection
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 3;
          p.y -= (dy / dist) * force * 3;
        }
      }

      // Draw connecting lines to nearby nodes
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 80;

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.22;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw node
      p.pulseVal += p.pulseSpeed;
      const currentSize = p.size + Math.sin(p.pulseVal) * 0.6;
      const nodeAlpha = 0.5 + Math.sin(p.pulseVal) * 0.3;

      ctx.beginPath();
      ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
      ctx.fillStyle = p.color + nodeAlpha + ')';
      ctx.fill();

      // Subtle node glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, currentSize * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = p.color + (nodeAlpha * 0.15) + ')';
      ctx.fill();
    }

    // Connect some particles to central core
    for (let i = 0; i < 6; i++) {
      let p = particles[i];
      const dx = centerX - p.x;
      const dy = centerY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(34, 211, 238, 0.09)`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    // Central luminous nucleus
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0; // reset

    animationFrameId = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}

/* ==========================================================================
   4. Scroll Reveal via IntersectionObserver
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   5. Copy Actions with Toast Notification
   ========================================================================== */
function initCopyActions() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  let toastTimer;

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-copy-label') || 'Text';

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`${label} copied to clipboard`);
      }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`${label} copied to clipboard`);
      });
    });
  });
}

/* ==========================================================================
   6. Contact Form & Mailto Builder
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('quickContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const topic = document.getElementById('senderTopic').value.trim();
    const message = document.getElementById('senderMessage').value.trim();

    const recipient = 'krishnaraghuvanshi363@gmail.com';
    const subject = encodeURIComponent(`[Portfolio Connect] ${topic || 'Connecting with Krishna'}`);
    const bodyContent = `Hi Krishna,\n\n${message}\n\nFrom: ${name} (${email})`;
    const body = encodeURIComponent(bodyContent);

    // Launch default email client
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
}

/* ==========================================================================
   7. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   8. Subtle Interactive Tilt for Cards
   ========================================================================== */
function initCardInteractions() {
  const cards = document.querySelectorAll('.focus-card, .timeline-card, .skills-category-card');
  if (window.innerWidth < 1024) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
