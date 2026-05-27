/* ===================================================
   ACADEMIC PORTFOLIO — script.js
   - IoT Mesh Network Canvas Background
   - Navbar scroll effect
   - Mobile menu toggle
   - Scroll-triggered fade-in animations
=================================================== */

(() => {
  'use strict';

  // ================================================
  // 1. IoT MESH NETWORK CANVAS
  // ================================================
  const canvas = document.getElementById('mesh-canvas');
  const ctx = canvas.getContext('2d');

  // Color palette — soft emerald/teal, very transparent
  const COLORS = {
    node: 'rgba(16, 185, 129, 0.22)',
    nodePulse: 'rgba(52, 211, 153, 0.35)',
    edge: 'rgba(16, 185, 129, 0.07)',
    edgeActive: 'rgba(52, 211, 153, 0.18)',
    packet: 'rgba(52, 211, 153, 0.7)',
  };

  const CONFIG = {
    nodeCount: 55,         // number of mesh nodes
    connectionDist: 160,   // max pixel distance to draw an edge
    speed: 0.28,           // base movement speed
    nodeRadius: 2.8,       // base dot radius
    pulseRadius: 7,        // outer pulse ring radius
    pulseFreq: 0.002,      // how often a node "pings"
    packetFreq: 0.003,     // how often a data packet travels an edge
  };

  let nodes = [];
  let packets = [];
  let W = 0, H = 0;

  // Resize canvas to fill viewport
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  // Create a single mesh node
  function makeNode() {
    const angle = Math.random() * Math.PI * 2;
    const speed = (0.3 + Math.random() * 0.7) * CONFIG.speed;
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: 1.8 + Math.random() * 2,
      pulseT: 0,          // pulse timer (0 = inactive)
      pulseDur: 0,
    };
  }

  // Create a data-packet traveling from nodeA to nodeB
  function makePacket(a, b) {
    return {
      ax: a.x, ay: a.y,
      bx: b.x, by: b.y,
      t: 0,            // 0→1 travel progress
      speed: 0.008 + Math.random() * 0.012,
    };
  }

  // Initialize nodes
  function initNodes() {
    nodes = [];
    for (let i = 0; i < CONFIG.nodeCount; i++) {
      nodes.push(makeNode());
    }
  }

  // Update physics each frame
  function update() {
    const W2 = W, H2 = H;
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;

      // Soft wrap at edges (slightly inset so nodes don't cluster at edges)
      if (n.x < -20) n.x = W2 + 20;
      else if (n.x > W2 + 20) n.x = -20;
      if (n.y < -20) n.y = H2 + 20;
      else if (n.y > H2 + 20) n.y = -20;

      // Random direction drift (gentle turbulence)
      n.vx += (Math.random() - 0.5) * 0.004;
      n.vy += (Math.random() - 0.5) * 0.004;

      // Clamp speed
      const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
      if (spd > CONFIG.speed * 1.8) {
        n.vx = (n.vx / spd) * CONFIG.speed * 1.8;
        n.vy = (n.vy / spd) * CONFIG.speed * 1.8;
      }

      // Trigger a pulse randomly
      if (n.pulseT <= 0 && Math.random() < CONFIG.pulseFreq) {
        n.pulseT = 1;
        n.pulseDur = 60 + Math.floor(Math.random() * 40);
      }
      if (n.pulseT > 0) n.pulseT -= 1 / n.pulseDur;
    });

    // Update packets
    packets = packets.filter(p => p.t < 1);
    packets.forEach(p => { p.t += p.speed; });

    // Randomly spawn new packets on connected pairs
    if (Math.random() < CONFIG.packetFreq && packets.length < 12) {
      const dist2 = CONFIG.connectionDist * CONFIG.connectionDist;
      // Pick a random node and find a neighbour
      const ai = Math.floor(Math.random() * nodes.length);
      const a = nodes[ai];
      const neighbours = nodes.filter((b, i) => {
        if (i === ai) return false;
        const dx = b.x - a.x, dy = b.y - a.y;
        return (dx * dx + dy * dy) < dist2;
      });
      if (neighbours.length > 0) {
        const b = neighbours[Math.floor(Math.random() * neighbours.length)];
        packets.push(makePacket(a, b));
      }
    }
  }

  // Draw one frame
  function draw() {
    ctx.clearRect(0, 0, W, H);

    const dist2 = CONFIG.connectionDist * CONFIG.connectionDist;

    // --- Draw edges ---
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > dist2) continue;

        const alpha = 1 - d2 / dist2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(16, 185, 129, ${0.06 * alpha})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }

    // --- Draw packets ---
    packets.forEach(p => {
      const x = p.ax + (p.bx - p.ax) * p.t;
      const y = p.ay + (p.by - p.ay) * p.t;
      const fade = p.t < 0.1 ? p.t / 0.1 : p.t > 0.9 ? (1 - p.t) / 0.1 : 1;
      ctx.beginPath();
      ctx.arc(x, y, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(52, 211, 153, ${0.7 * fade})`;
      ctx.fill();
    });

    // --- Draw nodes ---
    nodes.forEach(n => {
      // Pulse ring
      if (n.pulseT > 0) {
        const prog = 1 - n.pulseT;
        const pr = CONFIG.pulseRadius * (0.4 + prog * 0.6);
        const pa = (1 - prog) * 0.25;
        ctx.beginPath();
        ctx.arc(n.x, n.y, pr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(52, 211, 153, ${pa})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Core dot
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      const isPulsing = n.pulseT > 0.5;
      ctx.fillStyle = isPulsing ? COLORS.nodePulse : COLORS.node;
      ctx.fill();
    });
  }

  // Animation loop
  let raf;
  function loop() {
    update();
    draw();
    raf = requestAnimationFrame(loop);
  }

  function startCanvas() {
    resize();
    initNodes();
    loop();
  }

  window.addEventListener('resize', () => {
    resize();
    // redistribute nodes gently on resize
    nodes.forEach(n => {
      if (n.x > W) n.x = Math.random() * W;
      if (n.y > H) n.y = Math.random() * H;
    });
  });

  // ================================================
  // 2. NAVBAR SCROLL BEHAVIOR
  // ================================================
  const navbar = document.getElementById('navbar');

  function onScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ================================================
  // 3. MOBILE MENU TOGGLE
  // ================================================
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // ================================================
  // 4. SCROLL-TRIGGERED FADE-IN ANIMATIONS
  // ================================================
  function initScrollAnimations() {
    // Sections and cards to animate
    const targets = [
      ...document.querySelectorAll('.edu-card'),
      ...document.querySelectorAll('.tl-item'),
      ...document.querySelectorAll('.pub-item'),
      ...document.querySelectorAll('.skill-group'),
      ...document.querySelectorAll('.pillar'),
      ...document.querySelectorAll('.section-header'),
    ];

    targets.forEach((el, i) => {
      el.classList.add('fade-in');
      // Stagger within groups
      const delay = (i % 5) * 80;
      el.style.transitionDelay = `${delay}ms`;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    });

    targets.forEach(el => observer.observe(el));
  }

  // ================================================
  // 5. ACTIVE NAV LINK HIGHLIGHT (scroll spy)
  // ================================================
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    });

    sections.forEach(s => observer.observe(s));

    // Add active style via CSS
    const style = document.createElement('style');
    style.textContent = `.nav-links a.active { color: var(--emerald); }`;
    document.head.appendChild(style);
  }

  // ================================================
  // INIT
  // ================================================
  document.addEventListener('DOMContentLoaded', () => {
    startCanvas();
    onScroll();
    initScrollAnimations();
    initScrollSpy();
  });

})();
