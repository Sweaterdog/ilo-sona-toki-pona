// Vocabulary functionality
class VocabularyManager {
  constructor() {
    this.currentFilter = 'all';
    this.searchQuery = '';
  }

  initialize() {
    this.renderVocabulary();
    
    // Setup search
    document.getElementById('vocab-search')?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase();
      this.renderVocabulary();
    });
    
    // Setup filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.dataset.filter;
        this.renderVocabulary();
      });
    });
  }

  renderVocabulary() {
    const container = document.getElementById('vocab-grid');
    const userVocab = storage.getVocabulary();
    
    let filtered = VOCABULARY_DATA.filter(word => {
      // Apply search filter
      if (this.searchQuery) {
        const matchesSearch = 
          word.word.toLowerCase().includes(this.searchQuery) ||
          word.definition.toLowerCase().includes(this.searchQuery) ||
          word.category.toLowerCase().includes(this.searchQuery);
        
        if (!matchesSearch) return false;
      }
      
      // Apply status filter
      if (this.currentFilter === 'all') return true;
      
      if (this.currentFilter === 'mastered') {
        return userVocab.mastered.includes(word.word);
      }
      if (this.currentFilter === 'learning') {
        return userVocab.learning.includes(word.word);
      }
      if (this.currentFilter === 'new') {
        return !userVocab.mastered.includes(word.word) && 
               !userVocab.learning.includes(word.word) &&
               !userVocab.learned.includes(word.word);
      }
      
      return true;
    });
    
    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
          <p style="font-size: 1.2em; color: var(--text-secondary);">
            No words found matching your criteria
          </p>
        </div>
      `;
      return;
    }
    
    container.innerHTML = filtered.map(word => {
      let status = 'new';
      if (userVocab.mastered.includes(word.word)) status = 'mastered';
      else if (userVocab.learning.includes(word.word)) status = 'learning';
      else if (userVocab.learned.includes(word.word)) status = 'learned';
      
      return `
        <div class="vocab-card" data-word="${word.word}">
          <div class="vocab-word">${word.word}</div>
          <div class="vocab-definition">${word.definition}</div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
            <span class="vocab-status ${status}">${status}</span>
            <select class="word-status-select" data-word="${word.word}">
              <option value="new" ${status === 'new' ? 'selected' : ''}>New</option>
              <option value="learning" ${status === 'learning' ? 'selected' : ''}>Learning</option>
              <option value="mastered" ${status === 'mastered' ? 'selected' : ''}>Mastered</option>
            </select>
          </div>
        </div>
      `;
    }).join('');
    
    // Add event listeners for status changes
    container.querySelectorAll('.word-status-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const word = e.target.dataset.word;
        const newStatus = e.target.value;
        storage.updateWordStatus(word, newStatus);
        
        // Update the visual status badge
        const card = e.target.closest('.vocab-card');
        const badge = card.querySelector('.vocab-status');
        badge.className = `vocab-status ${newStatus}`;
        badge.textContent = newStatus;
        
        showNotification(`"${word}" marked as ${newStatus}`, 'success');
      });
    });
    
    // Add click handlers for flashcard effect
    container.querySelectorAll('.vocab-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('word-status-select')) {
          card.classList.toggle('flipped');
        }
      });
    });
  }
}

// Initialize
const vocabularyManager = new VocabularyManager();
document.addEventListener('DOMContentLoaded', () => {
  vocabularyManager.initialize();
});
