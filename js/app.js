// Main app functionality
let currentScreen = 'home-screen';

// Screen navigation
function showScreen(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Show target screen
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
    currentScreen = screenId;
    
    // Initialize screen-specific content
    initializeScreen(screenId);
  }
}

function initializeScreen(screenId) {
  switch(screenId) {
    case 'lessons-screen':
      lessonsManager.renderLessonsPath();
      break;
    case 'exercises-screen':
      exerciseManager.initialize();
      break;
    case 'vocabulary-screen':
      vocabularyManager.renderVocabulary();
      break;
    case 'achievements-screen':
      achievementsManager.renderAchievements();
      break;
    case 'practice-screen':
      // Reset conversation if needed
      break;
    case 'settings-screen':
      settingsManager.loadSettings();
      break;
  }
}

// Loading overlay
function showLoading(show) {
  const overlay = document.getElementById('loading-overlay');
  if (show) {
    overlay.classList.add('show');
  } else {
    overlay.classList.remove('show');
  }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  // Setup mode card navigation
  document.querySelectorAll('.mode-card').forEach(card => {
    card.addEventListener('click', () => {
      const mode = card.dataset.mode;
      
      // Check if practice mode requires API key
      if (mode === 'practice') {
        const settings = storage.getSettings();
        if (!settings.apiKey) {
          // Show API key required modal
          const modal = document.getElementById('api-key-modal');
          if (modal) {
            modal.classList.add('show');
          }
          // Grey out the practice card
          card.classList.add('locked');
          return;
        }
      }
      
      showScreen(`${mode}-screen`);
    });
  });
  
  // Setup back buttons
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const currentScreenEl = document.querySelector('.screen.active');
      
      // Determine where to go back
      if (currentScreenEl?.id === 'lesson-view-screen') {
        showScreen('lessons-screen');
      } else {
        showScreen('home-screen');
      }
    });
  });
  
  // Close modals on click outside
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // ESC to go back
    if (e.key === 'Escape') {
      if (document.querySelector('.modal.show')) {
        closeModal();
      } else if (currentScreen !== 'home-screen') {
        showScreen('home-screen');
      }
    }
  });
  
  // Initialize UI
  updateUI();
  
  // Check API key and update practice card
  checkPracticeAccess();
  
  // Show welcome message for first-time users
  const user = storage.getUser();
  if (user.level === 1 && user.points === 0) {
    setTimeout(() => {
      showNotification('pona tawa sina! Welcome to your Toki Pona learning journey! 🌟', 'success');
    }, 1000);
  }
  
  // Check for daily streak
  storage.updateStreak();
  
  // Setup periodic updates
  setInterval(() => {
    updateUI();
  }, 5000);
  
  console.log('Toki Pona Learning App initialized!');
  console.log('pona tawa sina! 🌟');
});

// Export functions for global use
window.showScreen = showScreen;
window.showLoading = showLoading;
window.closeModal = closeModal;

// Check if practice mode should be accessible
async function checkPracticeAccess() {
  let hasApiKey = false;
  
  // Check config file first
  if (window.electronAPI && window.electronAPI.loadApiKey) {
    const result = await window.electronAPI.loadApiKey();
    hasApiKey = result.apiKey && result.apiKey.length > 0;
  }
  
  // Fall back to localStorage
  if (!hasApiKey) {
    const settings = storage.getSettings();
    hasApiKey = settings.apiKey && settings.apiKey.length > 0;
  }
  
  // Grey out practice card if no API key
  const practiceCard = document.querySelector('.mode-card[data-mode="practice"]');
  if (practiceCard) {
    if (!hasApiKey) {
      practiceCard.classList.add('locked');
    } else {
      practiceCard.classList.remove('locked');
    }
  }
}

// Re-check practice access after settings change
window.checkPracticeAccess = checkPracticeAccess;

// Handle navigation events
window.addEventListener('popstate', () => {
  // Handle browser back button if needed
});

// Add touch/swipe support for mobile (future enhancement)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 100;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swiped left
      console.log('Swiped left');
    } else {
      // Swiped right - go back
      if (currentScreen !== 'home-screen') {
        showScreen('home-screen');
      }
    }
  }
}

// Performance monitoring
if (performance && performance.mark) {
  performance.mark('app-loaded');
  window.addEventListener('load', () => {
    performance.mark('app-ready');
    performance.measure('app-load-time', 'app-loaded', 'app-ready');
    
    const loadTime = performance.getEntriesByName('app-load-time')[0];
    console.log(`App loaded in ${loadTime.duration.toFixed(2)}ms`);
  });
}

// Error handling
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  showNotification('An error occurred. Please try again.', 'error');
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  showNotification('An error occurred. Please try again.', 'error');
});

// Visibility change - pause/resume features
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('App hidden');
    // Pause animations, sounds, etc.
  } else {
    console.log('App visible');
    // Resume features
    updateUI();
  }
});

// Save data before closing
window.addEventListener('beforeunload', () => {
  storage.save();
});

// Development helpers
if (process && process.argv && process.argv.includes('--dev')) {
  window.devTools = {
    storage,
    addXP: (amount) => storage.addXP(amount),
    unlockAchievement: (id) => storage.checkAchievement(id),
    resetProgress: () => storage.reset(),
    showScreen,
    LESSONS_DATA,
    VOCABULARY_DATA,
    ACHIEVEMENTS_DATA
  };
  console.log('Dev tools available at window.devTools');
}
