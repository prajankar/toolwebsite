// Tool Categories and their tools
const toolCategories = {
    'Image Tools': [
        { name: 'Image to PNG Converter', icon: 'fa-image', url: '/tools/image-to-png.html' },
        { name: 'Image to JPG Converter', icon: 'fa-file-image', url: '/tools/image-to-jpg.html' },
        { name: 'Image Resizer', icon: 'fa-expand', url: '/tools/image-resizer.html' },
        // Add more image tools
    ],
    'Text Tools': [
        { name: 'Word Counter', icon: 'fa-calculator', url: '/tools/word-counter.html' },
        { name: 'Character Counter', icon: 'fa-text-height', url: '/tools/character-counter.html' },
        { name: 'Case Converter', icon: 'fa-font', url: '/tools/case-converter.html' },
        // Add more text tools
    ],
    'Developer Tools': [
        { name: 'JSON Formatter', icon: 'fa-code', url: '/tools/json-formatter.html' },
        { name: 'HTML to Markdown', icon: 'fa-file-code', url: '/tools/html-to-markdown.html' },
        { name: 'CSS Minifier', icon: 'fa-file-alt', url: '/tools/css-minifier.html' },
        // Add more developer tools
    ],
    // Add more categories
};

// Load Header and Footer
document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('header');
    await loadComponent('footer');
    initializeToolsGrid();
    initializeSearch();
});

// Load Component Function
async function loadComponent(component) {
    try {
        const response = await fetch(`/components/${component}.html`);
        const html = await response.text();
        document.getElementById(`${component}-placeholder`).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${component}:`, error);
    }
}

// Initialize Tools Grid
function initializeToolsGrid() {
    const container = document.getElementById('tools-container');
    if (!container) return;

    Object.entries(toolCategories).forEach(([category, tools]) => {
        const categorySection = document.createElement('div');
        categorySection.className = 'col-12 category-section';
        
        categorySection.innerHTML = `
            <h2 class="category-title">${category}</h2>
            <div class="row g-4">
                ${tools.map(tool => createToolCard(tool)).join('')}
            </div>
        `;
        
        container.appendChild(categorySection);
    });
}

// Create Tool Card
function createToolCard(tool) {
    return `
        <div class="col-md-4 col-lg-3">
            <a href="${tool.url}" class="text-decoration-none">
                <div class="tool-card card h-100">
                    <div class="card-body text-center">
                        <div class="tool-icon">
                            <i class="fas ${tool.icon}"></i>
                        </div>
                        <h5 class="card-title">${tool.name}</h5>
                    </div>
                </div>
            </a>
        </div>
    `;
}

// Initialize Search Functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-tools');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const allTools = document.querySelectorAll('.tool-card');
        
        allTools.forEach(toolCard => {
            const toolName = toolCard.querySelector('.card-title').textContent.toLowerCase();
            const parentCol = toolCard.closest('.col-md-4');
            
            if (toolName.includes(searchTerm)) {
                parentCol.style.display = '';
            } else {
                parentCol.style.display = 'none';
            }
        });
    });
}

// Add to Favorites
function addToFavorites(toolUrl) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(toolUrl)) {
        favorites.push(toolUrl);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

// Handle Newsletter Subscription
document.addEventListener('submit', (e) => {
    if (e.target.classList.contains('newsletter-form')) {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        // Here you would typically send this to your backend
        alert('Thank you for subscribing! We will keep you updated.');
    }
}); 