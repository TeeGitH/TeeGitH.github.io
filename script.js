document.addEventListener('DOMContentLoaded', () => {
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
    const journeysGrid = document.querySelector('.journeys-grid');
    const leftArrow = document.querySelector('.scroll-arrow.left');
    const rightArrow = document.querySelector('.scroll-arrow.right');

    // Scroll amount for each arrow click (adjust as needed)
    const scrollAmount = 300;

    // Update arrow visibility
    function updateArrowVisibility() {
        leftArrow.classList.toggle('hidden', journeysGrid.scrollLeft <= 0);
        rightArrow.classList.toggle('hidden', 
            journeysGrid.scrollLeft + journeysGrid.clientWidth >= journeysGrid.scrollWidth);
    }

    // Add click handlers for arrows
    leftArrow.addEventListener('click', () => {
        journeysGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    rightArrow.addEventListener('click', () => {
        journeysGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Update arrow visibility on scroll and resize
    journeysGrid.addEventListener('scroll', updateArrowVisibility);
    window.addEventListener('resize', updateArrowVisibility);

    // Initial arrow visibility check
    updateArrowVisibility();

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

    // Flash Build carousel functionality
    const flashBuildCarousel = document.querySelector('.flash-build-carousel');
    const flashBuildLeftArrow = document.querySelector('#flash-build .scroll-arrow.left');
    const flashBuildRightArrow = document.querySelector('#flash-build .scroll-arrow.right');
    
    // GitHub confirmation modal functionality
    const githubModal = document.getElementById('github-confirm-modal');
    const githubProceedBtn = document.getElementById('github-proceed-btn');
    const githubCancelBtn = document.getElementById('github-cancel-btn');
    let pendingGithubUrl = '';

    // Handle GitHub link clicks
    document.querySelector('.github-btn').addEventListener('click', (e) => {
        e.preventDefault();
        pendingGithubUrl = e.currentTarget.href;
        githubModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Handle proceed to GitHub
    githubProceedBtn.addEventListener('click', () => {
        if (pendingGithubUrl) {
            window.open(pendingGithubUrl, '_blank');
        }
        githubModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Handle cancel
    githubCancelBtn.addEventListener('click', () => {
        githubModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close GitHub modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === githubModal) {
            githubModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close GitHub modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && githubModal.style.display === 'block') {
            githubModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Since we currently only have one card, hide the arrows
    // You can remove these lines when you add more projects
    flashBuildLeftArrow.style.display = 'none';
    flashBuildRightArrow.style.display = 'none';

    // This function will be useful when you add more projects
    function updateFlashBuildArrows() {
        const cards = flashBuildCarousel.querySelectorAll('.flash-build-card');
        if (cards.length <= 1) {
            flashBuildLeftArrow.style.display = 'none';
            flashBuildRightArrow.style.display = 'none';
        } else {
            flashBuildLeftArrow.style.display = 'flex';
            flashBuildRightArrow.style.display = 'flex';
        }
    }

    // Initial arrow visibility check
    updateFlashBuildArrows();

    // Add click handlers for arrows (will be useful when you add more projects)
    flashBuildLeftArrow.addEventListener('click', () => {
        // Implementation for showing previous project
    });

    flashBuildRightArrow.addEventListener('click', () => {
        // Implementation for showing next project
    });

    // Initial arrow visibility check
    updateFlashBuildArrows();
});
