// Background Animation Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Generate binary code content for the floating elements
    const binaryElements = document.querySelectorAll('.binary-code');
    const binaryStrings = [
        '01010100 01101000 01100101 00100000 01000100 01100001 01110100 01100001', // "The Data"
        '01000001 01101110 01100001 01101100 01111001 01110011 01110100', // "Analyst"
        '01010011 01110001 01101100 00100000 01010000 01111001 01110100 01101000 01101111 01101110', // "Sql Python"
        '01010000 01101111 01110111 01100101 01110010 01000010 01101001', // "PowerBi"
        '01000101 01111000 01100011 01100101 01101100', // "Excel"
        '01010110 01101001 01110011 01110101 01100001 01101100 01101001 01111010 01100001 01110100 01101001 01101111 01101110' // "Visualization"
    ];
    
    binaryElements.forEach((element, index) => {
        // Use a subset of the binary strings to keep content manageable
        const binaryIndex = index % 3;
        element.textContent = binaryStrings[binaryIndex];
    });
    
    // Add subtle mouse movement effect to background elements
    const backgroundElements = document.querySelectorAll('.floating-element');
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });
    
    function updateBackgroundElements() {
        backgroundElements.forEach((element, index) => {
            // Apply subtle parallax effect based on mouse position
            const speed = 0.02 + (index * 0.005);
            const xOffset = mouseX * speed * 20;
            const yOffset = mouseY * speed * 20;
            
            element.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
        
        requestAnimationFrame(updateBackgroundElements);
    }
    
    // Start the animation loop
    updateBackgroundElements();
});

// Preloader functionality
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Error handling for broken images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Add a fallback for broken images
            this.alt = 'Image not available';
            this.style.backgroundColor = '#f0f0f0';
            this.style.color = '#666';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.fontStyle = 'italic';
            this.textContent = 'Image not available';
        });
    });
});

// Error handling for broken links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && (href.startsWith('http') || href.startsWith('https'))) {
                // For external links, add error handling
                this.addEventListener('error', function() {
                    console.warn('Broken link detected:', href);
                });
            }
        });
    });
});

// Register service worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Scroll progress bar
window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    const progressBar = document.getElementById('scroll-progress-bar');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
        // Update ARIA attributes for accessibility
        progressBar.setAttribute('aria-valuenow', Math.round(scrollPercent));
    }
    
    // Show/hide back to top button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        if (scrollTop > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

// Back to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Keyboard accessibility for back to top button
        backToTop.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-active');
            const isExpanded = navLinks.classList.contains('mobile-active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('mobile-active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navLinks.classList.contains('mobile-active')) {
                navLinks.classList.remove('mobile-active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.focus();
            }
        });
    }
});

// --- Smooth Scrolling for Nav Links ---
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId.length > 1) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerOffset = document.querySelector('header').offsetHeight;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 15;
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });
                        
                        // Update active nav link
                        document.querySelectorAll('.nav-links a').forEach(link => {
                            link.setAttribute('aria-current', link === this ? 'page' : 'false');
                        });
                    }
                } else if (targetId === '#hero') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.setAttribute('aria-current', link.getAttribute('href') === '#hero' ? 'page' : 'false');
                    });
                }
            });
            
            // Keyboard accessibility for nav links
            anchor.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.click();
                }
            });
        });

        // --- Fade-in Sections on Scroll (staggered) ---
        const sections = document.querySelectorAll('section');
        const revealSection = function (entries, observer) {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                // add slight stagger using CSS variable
                entry.target.style.setProperty('--reveal-delay', `${Math.min(0.6, entry.intersectionRatio * 0.6)}s`);
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        };
        const sectionObserver = new IntersectionObserver(revealSection, {
            root: null,
            threshold: 0.08,
        });
        sections.forEach(section => {
            sectionObserver.observe(section);
        });

        // --- Staggered Animation for Cards on Scroll ---
        const cards = document.querySelectorAll('.project-card, .certification-card, .skill-item');
        const revealCard = (entries, observer) => {
            entries.forEach((entry, index) => {
                if (!entry.isIntersecting) return;
                // Add a delay based on the card's index in its container
                const delay = (entry.target.getAttribute('data-index') || 0) * 100;
                entry.target.style.animationDelay = `${delay}ms`;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        };
        const cardObserver = new IntersectionObserver(revealCard, { root: null, threshold: 0.1, rootMargin: '0px' });
        cards.forEach((card, index) => {
            card.setAttribute('data-index', index % 5); // Stagger in rows of 5
            cardObserver.observe(card);
        });

        // --- Animation for Timeline Items ---
        const timelineItems = document.querySelectorAll('.timeline-item');
        const revealTimelineItem = (entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        };
        const timelineObserver = new IntersectionObserver(revealTimelineItem, {
            root: null,
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        });
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });


        // Highlight active nav link while scrolling
        const navLinks = document.querySelectorAll('.nav-links a');
        const sectionMap = Array.from(sections).reduce((acc, sec) => {
            acc[sec.id] = sec;
            return acc;
        }, {});

        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + document.querySelector('header').offsetHeight + 20;
            let current = 'hero';
            for (const id in sectionMap) {
                const rectTop = sectionMap[id].offsetTop;
                if (scrollPos >= rectTop) current = id;
            }
            navLinks.forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
            });
        });

        // header compact on scroll
        const headerEl = document.querySelector('header');
        const checkHeader = () => {
            if (window.scrollY > 20) headerEl.classList.add('scrolled'); else headerEl.classList.remove('scrolled');
        };
        checkHeader();
        window.addEventListener('scroll', checkHeader);

        // --- Dark Mode Toggle ---
        // Set website to default to dark mode only
        const body = document.body;
        
        // Apply dark mode by default
        const applyDarkMode = () => {
            body.classList.add('dark-mode');
        };
        
        // Apply dark mode on page load
        applyDarkMode();
        
        // Remove dark mode toggle functionality since we're using dark mode only
        // The toggle button has been removed from HTML

        // --- Enhanced Project Card Effects ---
        const projectCardsElements = document.querySelectorAll('.project-card');
        
        projectCardsElements.forEach(card => {
            // Add mouse move effect for 3D tilt
            card.addEventListener('mousemove', (e) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;
                
                const mouseX = e.clientX - cardCenterX;
                const mouseY = e.clientY - cardCenterY;
                
                const rotateY = (mouseX / cardRect.width) * 10;
                const rotateX = -(mouseY / cardRect.height) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            
            // Reset transform on mouse leave
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-8px)';
            });
            
            // Add shine effect on hover
            card.addEventListener('mouseenter', () => {
                const shine = document.createElement('div');
                shine.className = 'card-shine';
                shine.style.position = 'absolute';
                shine.style.top = '0';
                shine.style.left = '0';
                shine.style.right = '0';
                shine.style.bottom = '0';
                shine.style.background = 'linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 60%)';
                shine.style.zIndex = '1';
                shine.style.opacity = '0';
                card.appendChild(shine);
                
                // Animate the shine effect
                setTimeout(() => {
                    shine.style.transition = 'opacity 0.3s ease, transform 0.6s ease';
                    shine.style.opacity = '1';
                    shine.style.transform = 'translateX(100%)';
                }, 10);
                
                // Remove shine after animation
                setTimeout(() => {
                    shine.style.opacity = '0';
                    setTimeout(() => {
                        if (shine.parentNode) {
                            shine.parentNode.removeChild(shine);
                        }
                    }, 300);
                }, 400);
            });
        });

        // --- Enhanced Certification Card Effects ---
        const certificationCards = document.querySelectorAll('.certification-card');
        
        certificationCards.forEach(card => {
            // Add shine effect on hover
            card.addEventListener('mouseenter', () => {
                const shine = document.createElement('div');
                shine.className = 'shine';
                card.appendChild(shine);
                
                // Remove shine after animation
                setTimeout(() => {
                    if (shine.parentNode) {
                        shine.parentNode.removeChild(shine);
                    }
                }, 600);
            });
            
            // Add subtle pulse effect on hover
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease';
            });
        });

        // --- Simplified Education Card Effects ---
        const educationCards = document.querySelectorAll('.education-card');
        
        educationCards.forEach(card => {
            // Add shine effect on hover
            card.addEventListener('mouseenter', () => {
                const shine = document.createElement('div');
                shine.className = 'shine';
                card.appendChild(shine);
                
                // Remove shine after animation
                setTimeout(() => {
                    if (shine.parentNode) {
                        shine.parentNode.removeChild(shine);
                    }
                }, 800);
            });
            
            // Add subtle pulse effect on hover
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
            });
        });

        // --- Enhanced About Section Effects ---
        const aboutContent = document.querySelector('.about-content');
        
        if (aboutContent) {
            aboutContent.addEventListener('mouseenter', () => {
                // Add subtle pulse effect
                aboutContent.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
            });
        }

        // --- Enhanced Contact Section Effects ---
        const contactLinks = document.querySelectorAll('.contact-links a');
        
        contactLinks.forEach(link => {
            // Add shine effect on hover
            link.addEventListener('mouseenter', () => {
                const shine = document.createElement('div');
                shine.className = 'shine';
                link.appendChild(shine);
                
                // Remove shine after animation
                setTimeout(() => {
                    if (shine.parentNode) {
                        shine.parentNode.removeChild(shine);
                    }
                }, 600);
            });
            
            // Add subtle pulse effect on hover
            link.addEventListener('mouseenter', () => {
                link.style.transition = 'all 0.3s ease';
            });
        });

        // --- Project Filtering Functionality ---
        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filterValue = button.getAttribute('data-filter');
                
                // Filter projects
                projectCardsElements.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                        // Add animation
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Lazy loading for images
        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });