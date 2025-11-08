// Settings functionality
class SettingsManager {
  initialize() {
    this.loadSettings();
    this.setupEventListeners();
  }

  async loadSettings() {
    const settings = storage.getSettings();
    
    // Load API key from config file
    if (window.electronAPI && window.electronAPI.loadApiKey) {
      const result = await window.electronAPI.loadApiKey();
      if (result.apiKey) {
        document.getElementById('api-key-input').value = result.apiKey;
      }
    }
    
    document.getElementById('show-translations').checked = settings.showTranslations;
    document.getElementById('particles-enabled').checked = settings.particlesEnabled;
    document.getElementById('sound-enabled').checked = settings.soundEnabled;
    document.getElementById('daily-goal').value = settings.dailyGoal;
    document.getElementById('difficulty').value = settings.difficulty;
  }

  setupEventListeners() {
    // API Key
    document.getElementById('save-api-key')?.addEventListener('click', async () => {
      const apiKey = document.getElementById('api-key-input').value.trim();
      if (apiKey) {
        // Save to config file via Electron
        if (window.electronAPI && window.electronAPI.saveApiKey) {
          const result = await window.electronAPI.saveApiKey(apiKey);
          if (result.success) {
            storage.updateSettings({ apiKey });
            showNotification('API Key saved successfully!', 'success');
            // Refresh practice mode access
            if (typeof window.checkPracticeAccess === 'function') {
              window.checkPracticeAccess();
            }
          } else {
            showNotification('Failed to save API key: ' + result.error, 'error');
          }
        } else {
          storage.updateSettings({ apiKey });
          showNotification('API Key saved to local storage', 'success');
          // Refresh practice mode access
          if (typeof window.checkPracticeAccess === 'function') {
            window.checkPracticeAccess();
          }
        }
      } else {
        showNotification('Please enter a valid API key', 'error');
      }
    });
    
    // Display settings
    document.getElementById('show-translations')?.addEventListener('change', (e) => {
      storage.updateSettings({ showTranslations: e.target.checked });
      showNotification('Settings updated', 'success');
    });
    
    document.getElementById('particles-enabled')?.addEventListener('change', (e) => {
      storage.updateSettings({ particlesEnabled: e.target.checked });
      showNotification('Settings updated', 'success');
    });
    
    document.getElementById('sound-enabled')?.addEventListener('change', (e) => {
      storage.updateSettings({ soundEnabled: e.target.checked });
      showNotification('Settings updated', 'success');
    });
    
    // Learning settings
    document.getElementById('daily-goal')?.addEventListener('change', (e) => {
      storage.updateSettings({ dailyGoal: parseInt(e.target.value) });
      showNotification('Daily goal updated', 'success');
    });
    
    document.getElementById('difficulty')?.addEventListener('change', (e) => {
      storage.updateSettings({ difficulty: e.target.value });
      showNotification('Difficulty updated', 'success');
    });
    
    // Data management
    document.getElementById('reset-progress')?.addEventListener('click', () => {
      storage.reset();
    });
    
    document.getElementById('export-data')?.addEventListener('click', () => {
      storage.export();
      showNotification('Data exported successfully!', 'success');
    });
  }
}

// Initialize
const settingsManager = new SettingsManager();
document.addEventListener('DOMContentLoaded', () => {
  settingsManager.initialize();
});
