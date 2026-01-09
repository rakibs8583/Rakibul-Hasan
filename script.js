/**
 * Rakibul Hasan - Academic Portfolio Production Script
 * Handles: Neural Network Background, Intersection Observer, and UI Logic
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. LOADER LOGIC ---
    const loader = document.getElementById('loader');
    if (loader) {
        // Simulates system initialization for a professional feel
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    }

    // --- 2. SMOOTH SCROLL REVEAL (Intersection Observer) ---
    // This makes sections fade and slide up as you scroll into them
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animating to save CPU/Battery
                revealObserver.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        revealObserver.observe(el);
    });

    // --- 3. NEURAL NETWORK CANVAS (AI & IoT Metaphor) ---
    const canvas = document.getElementById('neural-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    // Set canvas size
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            // Slow, fluid movement
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'; // Soft blue nodes
            ctx.fill();
        }
    }

    function connect() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                // Only draw line if nodes are close (IoT mesh network effect)
                if (distance < 150) {
                    let opacity = 1 - (distance / 150);
                    ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.2})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function initParticles() {
        setCanvasSize();
        particlesArray = [];
        // Adjust density based on screen size
        let count = (canvas.width * canvas.height) / 18000;
        for (let i = 0; i < Math.min(count, 100); i++) {
            particlesArray.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
        connect();
        requestAnimationFrame(animate);
    }

    // --- 4. EVENT LISTENERS ---
    
    // Re-initialize background on resize
    window.addEventListener('resize', () => {
        initParticles();
    });

    // Mobile Hamburger Menu (Optional logic if you use a mobile nav)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Start background animation
    initParticles();
    animate();

});