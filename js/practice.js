// Practice conversation functionality
class PracticeManager {
  constructor() {
    this.conversationHistory = [];
    this.isListening = false;
  }

  initialize() {
    document.getElementById('send-chat')?.addEventListener('click', () => this.sendMessage());
    document.getElementById('chat-input')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
    document.getElementById('voice-input')?.addEventListener('click', () => this.toggleVoiceInput());
  }

  async sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    this.addMessage(message, 'user');
    input.value = '';
    
    // Show loading
    showLoading(true);
    
    try {
      const userLevel = storage.getUser().level;
      const progress = storage.getProgress();
      const result = await window.electronAPI.practiceConversation({
        userMessage: message,
        conversationHistory: this.conversationHistory,
        userLevel,
        completedLessons: progress.lessonsCompleted || []
      });
      
      if (result.error) {
        showNotification(result.error, 'error');
        if (result.needsConfig) {
          showScreen('settings-screen');
        }
      } else {
        // Add AI response
        this.addMessage(result.response, 'ai', result.translation);
        
        // Show corrections if any
        if (result.corrections && result.corrections.length > 0) {
          this.showCorrections(result.corrections);
        }
        
        // Update stats
        storage.data.progress.messagesExchanged++;
        document.getElementById('msg-count').textContent = storage.data.progress.messagesExchanged;
        
        // Award XP
        storage.addXP(10);
      }
    } catch (error) {
      console.error('Error in conversation:', error);
      showNotification('Failed to get response', 'error');
    } finally {
      showLoading(false);
    }
  }

  addMessage(text, sender, translation = null) {
    const chatArea = document.getElementById('chat-area');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'ai-message';
    
    let html = `
      <div class="message-bubble">
        <p>${text}</p>
    `;
    
    if (translation && storage.getSettings().showTranslations) {
      html += `<p class="translation">(${translation})</p>`;
    }
    
    html += '</div>';
    messageDiv.innerHTML = html;
    
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
    
    // Add to history
    this.conversationHistory.push({
      role: sender,
      content: text,
      translation
    });
    
    // Limit history to last 20 messages
    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-20);
    }
  }

  showCorrections(corrections) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'ai-message';
    messageDiv.innerHTML = `
      <div class="message-bubble" style="background: rgba(255, 193, 7, 0.2); border-left: 3px solid #ffc107;">
        <p><strong>💡 Tips:</strong></p>
        ${corrections.map(c => `<p>• ${c}</p>`).join('')}
      </div>
    `;
    
    const chatArea = document.getElementById('chat-area');
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  toggleVoiceInput() {
    const btn = document.getElementById('voice-input');
    
    if (!this.isListening) {
      this.startVoiceInput();
      btn.classList.add('listening');
      btn.textContent = '⏹️';
    } else {
      this.stopVoiceInput();
      btn.classList.remove('listening');
      btn.textContent = '🎤';
    }
  }

  startVoiceInput() {
    // Check if Speech Recognition is available
    if (typeof window === 'undefined' || (!window.webkitSpeechRecognition && !window.SpeechRecognition)) {
      if (typeof showNotification === 'function') {
        showNotification('Voice input not supported in this browser', 'error');
      }
      console.error('Speech Recognition API not available');
      return;
    }
    
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US'; // Toki Pona uses similar sounds
      
      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const input = document.getElementById('chat-input');
        if (input) {
          input.value = transcript;
        }
        this.isListening = false;
        const voiceBtn = document.getElementById('voice-input');
        if (voiceBtn) {
          voiceBtn.classList.remove('listening');
          voiceBtn.textContent = '🎤';
        }
      };
      
      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        let errorMessage = 'Voice input error';
        
        switch(event.error) {
          case 'network':
            errorMessage = 'Network error - Please check your internet connection';
            break;
          case 'not-allowed':
            errorMessage = 'Microphone access denied - Please allow microphone access';
            break;
          case 'no-speech':
            errorMessage = 'No speech detected - Please try again';
            break;
          case 'aborted':
            errorMessage = 'Voice input was cancelled';
            break;
          case 'audio-capture':
            errorMessage = 'No microphone found or microphone error';
            break;
          case 'service-not-allowed':
            errorMessage = 'Speech recognition service not allowed';
            break;
          default:
            errorMessage = `Voice input error: ${event.error}`;
        }
        
        if (typeof showNotification === 'function') {
          showNotification(errorMessage, 'error');
        }
        this.isListening = false;
        const voiceBtn = document.getElementById('voice-input');
        if (voiceBtn) {
          voiceBtn.classList.remove('listening');
          voiceBtn.textContent = '🎤';
        }
      };
      
      this.recognition.start();
      this.isListening = true;
      if (typeof showNotification === 'function') {
        showNotification('Listening... Speak now!', 'info');
      }
    } catch (error) {
      console.error('Error starting voice input:', error);
      if (typeof showNotification === 'function') {
        showNotification('Failed to start voice input', 'error');
      }
    }
  }

  stopVoiceInput() {
    if (this.recognition) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}

// Initialize
const practiceManager = new PracticeManager();
document.addEventListener('DOMContentLoaded', () => {
  practiceManager.initialize();
});
