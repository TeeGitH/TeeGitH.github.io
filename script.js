document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor functionality
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    
    window.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            // Update main cursor
            cursorDot.style.transform = `translate3d(${e.clientX - 2.5}px, ${e.clientY - 2.5}px, 0)`;
            cursorCircle.style.transform = `translate3d(${e.clientX - 12.5}px, ${e.clientY - 12.5}px, 0)`;
        });
    });

    // Add hover effect to all clickable elements
    const clickableElements = document.querySelectorAll('a, button, input[type="submit"], .btn, .scroll-arrow, .journey-card, .project-card, .blog-card, .flash-build-card');
    
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            cursorCircle.classList.add('hover');
            const circleX = e.clientX - 25;
            const circleY = e.clientY - 25;
            cursorCircle.style.transform = `translate3d(${circleX}px, ${circleY}px, 0)`;
        });
        
        element.addEventListener('mouseleave', (e) => {
            cursorCircle.classList.remove('hover');
            const circleX = e.clientX - 12.5;
            const circleY = e.clientY - 12.5;
            cursorCircle.style.transform = `translate3d(${circleX}px, ${circleY}px, 0)`;
        });
    });

    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add this new code for handling the markdown modal
    const modal = document.getElementById('markdown-modal');
    const closeButton = document.querySelector('.close-button');
    const markdownContent = document.getElementById('markdown-content');

    // Update the Word-Guessing-Game project card's Learn More button
    const wordGuessingGameLink = document.querySelector('.project-card:first-child .btn');
    const llmTwinLink = document.querySelector('.project-card:nth-child(2) .btn');
    const personaFineTuningLink = document.querySelector('.project-card:nth-child(3) .btn');
    
    async function loadMarkdownContent(markdownFile) {
        try {
            const response = await fetch(markdownFile);
            if (!response.ok) {
                throw new Error('Failed to load markdown content');
            }
            const text = await response.text();
            markdownContent.innerHTML = marked.parse(text);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } catch (error) {
            console.error('Error loading markdown:', error);
            alert('Failed to load content. Please try again.');
        }
    }

    wordGuessingGameLink.addEventListener('click', (e) => {
        e.preventDefault();
        loadMarkdownContent('project_docs/readme_word_guessing_game.md');
    });

    llmTwinLink.addEventListener('click', (e) => {
        e.preventDefault();
        loadMarkdownContent('project_docs/Building_LLMs_Twins.md');
    });

    personaFineTuningLink.addEventListener('click', (e) => {
        e.preventDefault();
        loadMarkdownContent('project_docs/persona_AI_FineTuning.md');
    });

    // Close modal when clicking the close button
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close modal when clicking outside the content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });

    // Journeys section scroll functionality
    const journeysContainer = document.querySelector('#journeys .journeys-grid');
    const journeysLeftArrow = document.querySelector('#journeys .scroll-arrow.left');
    const journeysRightArrow = document.querySelector('#journeys .scroll-arrow.right');

    // Scroll amount for each arrow click (adjust as needed)
    const scrollAmount = 300;

    // Update arrow visibility for Journeys section
    function updateJourneysArrowVisibility() {
        journeysLeftArrow.classList.toggle('hidden', journeysContainer.scrollLeft <= 0);
        journeysRightArrow.classList.toggle('hidden', 
            journeysContainer.scrollLeft + journeysContainer.clientWidth >= journeysContainer.scrollWidth);
    }

    // Add click handlers for Journeys arrows
    journeysLeftArrow.addEventListener('click', () => {
        journeysContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    journeysRightArrow.addEventListener('click', () => {
        journeysContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Update Journeys arrow visibility on scroll and resize
    journeysContainer.addEventListener('scroll', updateJourneysArrowVisibility);
    window.addEventListener('resize', updateJourneysArrowVisibility);

    // Initial Journeys arrow visibility check
    updateJourneysArrowVisibility();

    // Flash Build carousel functionality
    const flashBuildCarousel = document.querySelector('.flash-build-carousel');
    const flashBuildLeftArrow = document.querySelector('#flash-build .scroll-arrow.left');
    const flashBuildRightArrow = document.querySelector('#flash-build .scroll-arrow.right');

    // Update arrow visibility for Flash Build section
    function updateFlashBuildArrowVisibility() {
        flashBuildLeftArrow.classList.toggle('hidden', flashBuildCarousel.scrollLeft <= 0);
        flashBuildRightArrow.classList.toggle('hidden', 
            flashBuildCarousel.scrollLeft + flashBuildCarousel.clientWidth >= flashBuildCarousel.scrollWidth);
    }

    // Add click handlers for Flash Build arrows
    flashBuildLeftArrow.addEventListener('click', () => {
        flashBuildCarousel.scrollBy({
            left: -flashBuildCarousel.offsetWidth,
            behavior: 'smooth'
        });
    });

    flashBuildRightArrow.addEventListener('click', () => {
        flashBuildCarousel.scrollBy({
            left: flashBuildCarousel.offsetWidth,
            behavior: 'smooth'
        });
    });

    // Update Flash Build arrow visibility on scroll and resize
    flashBuildCarousel.addEventListener('scroll', updateFlashBuildArrowVisibility);
    window.addEventListener('resize', updateFlashBuildArrowVisibility);

    // Initial Flash Build arrow visibility check
    updateFlashBuildArrowVisibility();

    // Function to get URL parameters
    function getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Function to display dynamic content based on URL parameter
    function displayDynamicContent() {
        const sectionParam = getUrlParameter('section'); // Example parameter
        const dynamicContentDivs = {
            home: document.getElementById('home-content'),
            about: document.getElementById('about-content'),
            projects: document.getElementById('projects-content'),
            insights: document.getElementById('insights-content'),
            journeys: document.getElementById('journeys-content'),
            contact: document.getElementById('contact-content')
        };

        // Example content based on the 'section' parameter
        if (sectionParam) {
            switch (sectionParam) {
                case 'home':
                    dynamicContentDivs.home.innerHTML = '<p>Welcome to my personalized home section!</p>';
                    break;
                case 'about':
                    dynamicContentDivs.about.innerHTML = '<p>Here is some special information about me!</p>';
                    break;
                case 'projects':
                    dynamicContentDivs.projects.innerHTML = '<p>Check out my featured projects!</p>';
                    break;
                case 'insights':
                    dynamicContentDivs.insights.innerHTML = '<p>Insights tailored for you!</p>';
                    break;
                case 'journeys':
                    dynamicContentDivs.journeys.innerHTML = '<p>Explore my unique journeys!</p>';
                    break;
                case 'contact':
                    dynamicContentDivs.contact.innerHTML = '<p>Contact me for personalized inquiries!</p>';
                    break;
                default:
                    break;
            }

            // Scroll to the specified section
            const sectionElement = document.getElementById(sectionParam);
            if (sectionElement) {
                sectionElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // Call the function to display content based on URL parameters
    displayDynamicContent();

    // Function to set theme
    function setTheme(isDark) {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('darkMode', isDark);
    }

    // Check for saved user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('darkMode');
    
    // Set initial theme
    if (savedTheme !== null) {
        setTheme(savedTheme === 'true');
    } else {
        setTheme(prefersDark.matches);
    }

    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
        // Only update if user hasn't set a preference
        if (localStorage.getItem('darkMode') === null) {
            setTheme(e.matches);
        }
    });

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        setTheme(!isDark);
    });

    // Update the contact form submission handler
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const form = this;
        const confirmationModal = document.getElementById('confirmation-modal');
        
        fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                // Show confirmation modal
                confirmationModal.style.display = 'block';
                form.reset();
                
                // Handle the OK button click
                const confirmBtn = confirmationModal.querySelector('.confirm-btn');
                confirmBtn.onclick = function() {
                    confirmationModal.style.display = 'none';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                };

                // Close modal when clicking outside
                window.onclick = function(event) {
                    if (event.target === confirmationModal) {
                        confirmationModal.style.display = 'none';
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                };
            } else {
                throw new Error('Failed to send message');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error sending message. Please try again.');
        });
    });

    // Setup typing sound
    const typingSound = document.getElementById('typing-sound');
    const messageInput = document.getElementById('message');
    const emailInput = document.getElementById('email');
    let typingTimeout;

    function playTypingSound() {
        if (typingSound.paused) {
            typingSound.currentTime = 0;
            typingSound.play();
        } else {
            // If sound is already playing, restart it
            typingSound.currentTime = 0;
        }
    }

    function handleTyping(event) {
        // Only play sound for actual typing keys and backspace/delete
        const validKeys = [
            'Backspace', 'Delete', 
            ...Array.from('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,!?@#$%^&*()_+-=[]{}|;:\'"`~<>/\\')
        ];
        
        if (validKeys.includes(event.key)) {
            const sound = document.getElementById('typing-sound');
            console.log('Key pressed:', event.key); // Debug log
            
            try {
                sound.currentTime = 0;
                sound.volume = document.getElementById('typing-volume').value / 100;
                const playPromise = sound.play();
                
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log('Sound played successfully'); // Debug log
                        })
                        .catch(error => {
                            console.error('Error playing sound:', error);
                        });
                }
            } catch (error) {
                console.error('Error with sound:', error);
            }
        }
    }

    function handleKeyUp() {
        const sound = document.getElementById('typing-sound');
        if (!sound.paused) {
            sound.pause();
            sound.currentTime = 0;
            console.log('Sound stopped'); // Debug log
        }
    }

    // Add event listeners for both keydown and keyup
    document.getElementById('message').addEventListener('keydown', handleTyping);
    document.getElementById('message').addEventListener('keyup', handleKeyUp);
    document.getElementById('email').addEventListener('keydown', handleTyping);
    document.getElementById('email').addEventListener('keyup', handleKeyUp);

    // Add this to your JavaScript
    document.getElementById('typing-volume').addEventListener('input', function(e) {
        const volume = e.target.value / 100;
        document.getElementById('typing-sound').volume = volume;
    });

    // Add this after your DOMContentLoaded event starts
    const sound = document.getElementById('typing-sound');
    sound.addEventListener('loadeddata', () => {
        console.log('Sound file loaded successfully');
    });
    sound.addEventListener('error', (e) => {
        console.error('Error loading sound file:', e);
    });

    // Video carousel functionality
    const videoCarousel = document.querySelector('.video-carousel');
    const videoLeftArrow = document.querySelector('#favorite-videos .video-arrow.left');
    const videoRightArrow = document.querySelector('#favorite-videos .video-arrow.right');
    const videoCards = videoCarousel.querySelectorAll('.video-card');
    let currentVideoIndex = 0;
    
    // Update arrow visibility for Video section
    function updateVideoArrows() {
        videoLeftArrow.style.display = currentVideoIndex === 0 ? 'none' : 'flex';
        videoRightArrow.style.display = currentVideoIndex >= videoCards.length - 1 ? 'none' : 'flex';
    }

    // Scroll to specific video
    function scrollToVideo(index) {
        if (index >= 0 && index < videoCards.length) {
            currentVideoIndex = index;
            const cardWidth = videoCarousel.offsetWidth;
            videoCarousel.scrollTo({
                left: cardWidth * index,
                behavior: 'smooth'
            });
            updateVideoArrows();
        }
    }

    // Add click handlers for Video arrows
    videoLeftArrow.addEventListener('click', () => {
        scrollToVideo(currentVideoIndex - 1);
    });

    videoRightArrow.addEventListener('click', () => {
        scrollToVideo(currentVideoIndex + 1);
    });

    // Handle manual scrolling
    videoCarousel.addEventListener('scroll', () => {
        const cardWidth = videoCarousel.offsetWidth;
        currentVideoIndex = Math.round(videoCarousel.scrollLeft / cardWidth);
        updateVideoArrows();
    });

    // Update on window resize
    window.addEventListener('resize', () => {
        scrollToVideo(currentVideoIndex);
    });

    // Initial setup
    updateVideoArrows();
});
