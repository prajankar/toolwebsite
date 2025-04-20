// Component Management System
class ComponentManager {
    constructor() {
        this.components = new Map();
        this.loadedComponents = new Set();
    }

    // Register a new component
    register(name, component) {
        this.components.set(name, component);
    }

    // Load a component dynamically
    async load(name) {
        if (this.loadedComponents.has(name)) {
            return;
        }

        try {
            const component = this.components.get(name);
            if (component) {
                await component.init();
                this.loadedComponents.add(name);
            }
        } catch (error) {
            console.error(`Error loading component ${name}:`, error);
        }
    }

    // Unload a component
    unload(name) {
        if (this.loadedComponents.has(name)) {
            const component = this.components.get(name);
            if (component && component.destroy) {
                component.destroy();
            }
            this.loadedComponents.delete(name);
        }
    }
}

// Create global component manager instance
window.componentManager = new ComponentManager();

// Header Component
const headerComponent = {
    init: async function() {
        const header = document.getElementById('header-placeholder');
        if (header) {
            // Initialize dropdown menus
            const dropdowns = header.querySelectorAll('.dropdown-toggle');
            dropdowns.forEach(dropdown => {
                dropdown.addEventListener('click', (e) => {
                    e.preventDefault();
                    const menu = dropdown.nextElementSibling;
                    menu.classList.toggle('show');
                });
            });

            // Close dropdowns when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.matches('.dropdown-toggle')) {
                    const dropdowns = header.querySelectorAll('.dropdown-menu.show');
                    dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
                }
            });
        }
    },
    destroy: function() {
        // Cleanup if needed
    }
};

// Footer Component
const footerComponent = {
    init: async function() {
        const footer = document.getElementById('footer-placeholder');
        if (footer) {
            // Initialize newsletter form
            const form = footer.querySelector('.newsletter-form');
            if (form) {
                form.addEventListener('submit', this.handleNewsletter);
            }

            // Initialize social media links
            const socialLinks = footer.querySelectorAll('.social-links a');
            socialLinks.forEach(link => {
                link.addEventListener('click', this.handleSocialClick);
            });
        }
    },
    handleNewsletter: function(e) {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        // Here you would typically send this to your backend
        console.log('Newsletter subscription:', email);
    },
    handleSocialClick: function(e) {
        const platform = e.currentTarget.getAttribute('data-platform');
        // Analytics tracking could be added here
        console.log('Social click:', platform);
    },
    destroy: function() {
        // Cleanup if needed
    }
};

// Register components
componentManager.register('header', headerComponent);
componentManager.register('footer', footerComponent);

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await componentManager.load('header');
    await componentManager.load('footer');
}); 