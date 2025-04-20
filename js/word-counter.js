// Word Counter Tool Functionality
class WordCounter {
    constructor() {
        this.textInput = document.getElementById('text-input');
        this.wordCount = document.getElementById('word-count');
        this.charCount = document.getElementById('char-count');
        this.charCountNoSpaces = document.getElementById('char-count-no-spaces');
        this.sentenceCount = document.getElementById('sentence-count');
        this.paragraphCount = document.getElementById('paragraph-count');
        this.readingTime = document.getElementById('reading-time');
        this.speakingTime = document.getElementById('speaking-time');
        this.clearButton = document.getElementById('clear-text');
        this.copyButton = document.getElementById('copy-text');

        this.initialize();
    }

    initialize() {
        // Add event listeners
        this.textInput.addEventListener('input', () => this.updateCounts());
        this.clearButton.addEventListener('click', () => this.clearText());
        this.copyButton.addEventListener('click', () => this.copyText());

        // Initialize counts
        this.updateCounts();
    }

    updateCounts() {
        const text = this.textInput.value;

        // Count words
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        this.wordCount.textContent = words.length;

        // Count characters
        this.charCount.textContent = text.length;
        this.charCountNoSpaces.textContent = text.replace(/\s/g, '').length;

        // Count sentences
        const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
        this.sentenceCount.textContent = sentences.length;

        // Count paragraphs
        const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0);
        this.paragraphCount.textContent = paragraphs.length;

        // Calculate reading time (average reading speed: 200 words per minute)
        const readingTimeMinutes = Math.ceil(words.length / 200);
        this.readingTime.textContent = `Approximately ${readingTimeMinutes} minute${readingTimeMinutes !== 1 ? 's' : ''}`;

        // Calculate speaking time (average speaking speed: 130 words per minute)
        const speakingTimeMinutes = Math.ceil(words.length / 130);
        this.speakingTime.textContent = `Approximately ${speakingTimeMinutes} minute${speakingTimeMinutes !== 1 ? 's' : ''}`;
    }

    clearText() {
        this.textInput.value = '';
        this.updateCounts();
    }

    async copyText() {
        try {
            await navigator.clipboard.writeText(this.textInput.value);
            this.showToast('Text copied to clipboard!');
        } catch (err) {
            this.showToast('Failed to copy text. Please try again.');
        }
    }

    showToast(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        
        // Add toast to document
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Remove toast after animation
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// Initialize Word Counter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WordCounter();
}); 