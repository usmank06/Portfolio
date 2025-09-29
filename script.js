document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation buttons
    const navButtons = document.querySelectorAll('.nav-button');

    // Get all popup overlays
    const popupOverlays = document.querySelectorAll('.popup-overlay');

    // Get all close buttons
    const closeButtons = document.querySelectorAll('.close-btn');

    // Simplified popup opening for smooth performance
    function openPopup(popupId) {
        const popup = document.getElementById(popupId + '-popup');
        if (popup) {
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Simplified popup closing
    function closePopup(popup) {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Function to close all popups
    function closeAllPopups() {
        popupOverlays.forEach(popup => {
            if (popup.classList.contains('active')) {
                closePopup(popup);
            }
        });
    }

    // Simplified button click events
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const popupId = this.getAttribute('data-popup');
            openPopup(popupId);
        });
    });

    // Add click event listeners to close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const popup = this.closest('.popup-overlay');
            closePopup(popup);
        });
    });

    // Add click event listeners to overlay backgrounds
    popupOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            // Only close if clicking on the overlay itself, not the popup card
            if (e.target === overlay) {
                closePopup(overlay);
            }
        });
    });

    // Close popup on Escape key press
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllPopups();
        }
    });

    // Prevent popup card clicks from closing the popup
    const popupCards = document.querySelectorAll('.popup-card');
    popupCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // Add smooth scroll behavior for popup content
    const popupContents = document.querySelectorAll('.popup-content');
    popupContents.forEach(content => {
        content.style.scrollBehavior = 'smooth';
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe fancy items for scroll animations
    setTimeout(() => {
        const fancyItems = document.querySelectorAll('.fancy-item');
        fancyItems.forEach(item => {
            observer.observe(item);
        });
    }, 1000);
});

// Enhanced interactions with requested features
document.addEventListener('DOMContentLoaded', function() {
    const isDesktop = window.innerWidth > 1024;
    const isMobile = window.innerWidth <= 768;
    const respectsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Loading screen for all devices (unless reduced motion)
    if (!respectsReducedMotion) {
        const createLoadingScreen = () => {
            const loader = document.createElement('div');
            loader.className = 'loading-screen';
            loader.innerHTML = `
                <div class="loader">
                    <div class="loader-text">USMAN KHAN</div>
                    <div class="loader-bar">
                        <div class="loader-progress"></div>
                    </div>
                </div>
            `;
            document.body.appendChild(loader);
            
            // Simulate loading
            let progress = 0;
            const progressBar = loader.querySelector('.loader-progress');
            
            const loadingInterval = setInterval(() => {
                progress += Math.random() * 15 + 5;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(loadingInterval);
                    
                    setTimeout(() => {
                        loader.style.opacity = '0';
                        setTimeout(() => loader.remove(), 500);
                    }, 500);
                }
                progressBar.style.width = progress + '%';
            }, 80);
        };
        
        createLoadingScreen();
    }

    // Custom Cursor Implementation
    const $bigBall = document.querySelector('.cursor__ball--big');
    const $smallBall = document.querySelector('.cursor__ball--small');
    const $hoverables = document.querySelectorAll('.hoverable');

    // Only initialize cursor on non-mobile devices
    if ($bigBall && $smallBall && !isMobile) {
        // Move the cursor
        function onMouseMove(e) {
            if (typeof TweenMax !== 'undefined') {
                TweenMax.to($bigBall, .4, {
                    x: e.pageX - 15,
                    y: e.pageY - 15
                });
                TweenMax.to($smallBall, .1, {
                    x: e.pageX - 5,
                    y: e.pageY - 7
                });
            }
        }

        // Hover an element
        function onMouseHover() {
            if (typeof TweenMax !== 'undefined') {
                TweenMax.to($bigBall, .3, {
                    scale: 2.5
                });
            }
        }

        function onMouseHoverOut() {
            if (typeof TweenMax !== 'undefined') {
                TweenMax.to($bigBall, .3, {
                    scale: 1
                });
            }
        }

        // Add event listeners
        document.body.addEventListener('mousemove', onMouseMove);
        
        // Add hover effects to hoverable elements
        for (let i = 0; i < $hoverables.length; i++) {
            $hoverables[i].addEventListener('mouseenter', onMouseHover);
            $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
        }
    } else if (isMobile) {
        // Hide cursor on mobile and restore default cursor
        document.body.style.cursor = 'auto';
        const cursorElement = document.querySelector('.cursor');
        if (cursorElement) {
            cursorElement.style.display = 'none';
        }
    }
    
    // Desktop-specific effects
    if (isDesktop && !respectsReducedMotion) {
        // Subtle parallax effect
        const profileImage = document.querySelector('.profile-image');
        let ticking = false;
        
        const updateParallax = (e) => {
            if (!ticking && profileImage) {
                requestAnimationFrame(() => {
                    const mouseX = (e.clientX / window.innerWidth - 0.5) * 5;
                    const mouseY = (e.clientY / window.innerHeight - 0.5) * 5;
                    profileImage.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        document.addEventListener('mousemove', updateParallax);
        
        // Scroll progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                    progressBar.style.width = Math.min(scrolled, 100) + '%';
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        });
    }
    
    // Floating social icons (all devices unless mobile or reduced motion)
    if (!isMobile && !respectsReducedMotion) {
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 0.2}s`;
            icon.classList.add('float');
        });
    }
    
    // Typing animation (desktop and tablet)
    const headerText = document.querySelector('header h1');
    if (headerText && !isMobile && !respectsReducedMotion) {
        const originalText = headerText.textContent;
        headerText.textContent = '';
        headerText.style.opacity = '1';
        
        setTimeout(() => {
            let i = 0;
            const typeWriter = () => {
                if (i < originalText.length) {
                    headerText.textContent += originalText[i];
                    i++;
                    setTimeout(typeWriter, 80);
                }
            };
            typeWriter();
        }, 800);
    }
});
