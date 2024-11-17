document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

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

    // Form submission (you can replace this with your own logic)
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });

    // Add this new code for handling the markdown modal
    const modal = document.getElementById('markdown-modal');
    const closeButton = document.querySelector('.close-button');
    const markdownContent = document.getElementById('markdown-content');

    // Update the Word-Guessing-Game project card's Learn More button
    const wordGuessingGameLink = document.querySelector('.project-card:first-child .btn');
    
    async function loadMarkdownContent() {
        try {
            const response = await fetch('readme_word_guessing_game.md');
            const text = await response.text();
            markdownContent.innerHTML = marked.parse(text);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        } catch (error) {
            console.error('Error loading markdown:', error);
        }
    }

    wordGuessingGameLink.addEventListener('click', (e) => {
        e.preventDefault();
        loadMarkdownContent();
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
});
