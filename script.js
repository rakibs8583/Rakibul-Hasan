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
        }, 1200);
    }

    // --- 2. SMOOTH SCROLL REVEAL (Intersection Observer) ---
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        revealObserver.observe(el);
    });

    // --- 3. NEURAL NETWORK CANVAS (AI & IoT Metaphor) ---
    const canvas = document.getElementById('neural-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];

        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.3; // Fluid, slow pacing
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(15, 118, 110, 0.4)'; // Premium Emerald nodes
                ctx.fill();
            }
        }

        function connect() {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let dx = particlesArray[a].x - particlesArray[b].x;
                    let dy = particlesArray[a].y - particlesArray[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        let opacity = 1 - (distance / 150);
                        ctx.strokeStyle = `rgba(15, 118, 110, ${opacity * 0.15})`; // Matching mesh network connections
                        ctx.lineWidth = 0.7;
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
            let count = (canvas.width * canvas.height) / 22000; // Optimal density spacing
            for (let i = 0; i < Math.min(count, 80); i++) {
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

        window.addEventListener('resize', () => {
            initParticles();
        });

        initParticles();
        animate();
    }

    // --- 4. MOBILE MENU ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }
});
