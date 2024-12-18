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
            const response = await fetch(`project_docs/${markdownFile}`);
            const text = await response.text();
            markdownContent.innerHTML = marked.parse(text);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } catch (error) {
            console.error('Error loading markdown:', error);
        }
    }

    wordGuessingGameLink.addEventListener('click', (e) => {
        e.preventDefault();
        loadMarkdownContent('readme_word_guessing_game.md');
    });

    llmTwinLink.addEventListener('click', (e) => {
        e.preventDefault();
        loadMarkdownContent('Building_LLMs_Twins.md');
    });

    personaFineTuningLink.addEventListener('click', (e) => {
        e.preventDefault();
        loadMarkdownContent('persona_AI_FineTuning.md');
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
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('darkMode');
    
    // Set initial theme
    if (savedTheme !== null) {
        setTheme(savedTheme === 'true');
    } else {
        setTheme(prefersDark);
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        setTheme(!isDark);
    });
});
