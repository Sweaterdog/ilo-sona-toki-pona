// Storage management
class Storage {
  constructor() {
    this.storageKey = 'tokiPonaApp';
    this.data = this.loadData();
  }

  loadData() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      return JSON.parse(saved);
    }
    return this.getDefaultData();
  }

  getDefaultData() {
    return {
      user: {
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
        points: 0,
        streak: 0,
        lastVisit: new Date().toISOString()
      },
      progress: {
        lessonsCompleted: [],
        currentLesson: 0,
        exercisesCompleted: 0,
        conversationsHad: 0,
        messagesExchanged: 0,
        accuracy: 0
      },
      vocabulary: {
        learned: [],
        mastered: [],
        learning: []
      },
      achievements: ACHIEVEMENTS_DATA.map(a => ({
        id: a.id,
        unlocked: false,
        unlockedAt: null
      })),
      settings: {
        apiKey: '',
        showTranslations: true,
        particlesEnabled: true,
        soundEnabled: true,
        dailyGoal: 10,
        difficulty: 'medium'
      },
      stats: {
        totalStudyTime: 0,
        sessionsCompleted: 0,
        startDate: new Date().toISOString()
      }
    };
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
  }

  // User methods
  getUser() {
    return this.data.user;
  }

  updateUser(updates) {
    this.data.user = { ...this.data.user, ...updates };
    this.save();
  }

  addXP(amount) {
    this.data.user.xp += amount;
    this.data.user.points += amount;
    
    // Check for level up
    while (this.data.user.xp >= this.data.user.xpToNextLevel) {
      this.data.user.xp -= this.data.user.xpToNextLevel;
      this.data.user.level++;
      this.data.user.xpToNextLevel = Math.floor(this.data.user.xpToNextLevel * 1.5);
      
      // Show level up modal (check if function exists first)
      if (typeof showLevelUp === 'function') {
        showLevelUp(this.data.user.level);
      }
    }
    
    this.save();
    return this.data.user;
  }

  updateStreak() {
    const lastVisit = new Date(this.data.user.lastVisit);
    const now = new Date();
    const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    
    if (daysSince === 1) {
      this.data.user.streak++;
    } else if (daysSince > 1) {
      this.data.user.streak = 1;
    }
    
    this.data.user.lastVisit = now.toISOString();
    this.save();
  }

  // Progress methods
  getProgress() {
    return this.data.progress;
  }

  completeLesson(lessonId) {
    if (!this.data.progress.lessonsCompleted.includes(lessonId)) {
      this.data.progress.lessonsCompleted.push(lessonId);
      this.addXP(100);
      this.checkAchievement('first_lesson');
      if (this.data.progress.lessonsCompleted.length >= 5) {
        this.checkAchievement('five_lessons');
      }
      if (this.data.progress.lessonsCompleted.length >= 13) {
        this.checkAchievement('all_lessons');
      }
    }
    this.save();
  }

  completeExercise(score) {
    this.data.progress.exercisesCompleted++;
    this.data.progress.accuracy = 
      (this.data.progress.accuracy * (this.data.progress.exercisesCompleted - 1) + score) / 
      this.data.progress.exercisesCompleted;
    
    this.addXP(score);
    
    if (score === 100) {
      this.checkAchievement('perfect_exercise');
    }
    
    this.save();
  }

  addConversation() {
    this.data.progress.conversationsHad++;
    this.addXP(50);
    
    if (this.data.progress.conversationsHad === 1) {
      this.checkAchievement('first_conversation');
    }
    if (this.data.progress.conversationsHad >= 10) {
      this.checkAchievement('ten_conversations');
    }
    
    this.save();
  }

  // Vocabulary methods
  getVocabulary() {
    return this.data.vocabulary;
  }

  updateWordStatus(word, status) {
    const vocab = this.data.vocabulary;
    
    // Remove from all arrays
    vocab.learned = vocab.learned.filter(w => w !== word);
    vocab.mastered = vocab.mastered.filter(w => w !== word);
    vocab.learning = vocab.learning.filter(w => w !== word);
    
    // Add to appropriate array
    if (status === 'mastered') {
      vocab.mastered.push(word);
      this.addXP(10);
      
      if (vocab.mastered.length >= 10) {
        this.checkAchievement('ten_words');
      }
      if (vocab.mastered.length >= 50) {
        this.checkAchievement('fifty_words');
      }
      if (vocab.mastered.length >= 120) {
        this.checkAchievement('all_words');
      }
    } else if (status === 'learning') {
      vocab.learning.push(word);
      this.addXP(5);
    } else if (status === 'learned') {
      vocab.learned.push(word);
    }
    
    this.save();
  }

  // Achievement methods
  getAchievements() {
    return this.data.achievements;
  }

  checkAchievement(achievementId) {
    const achievement = this.data.achievements.find(a => a.id === achievementId);
    const achievementData = ACHIEVEMENTS_DATA.find(a => a.id === achievementId);
    
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true;
      achievement.unlockedAt = new Date().toISOString();
      
      // Award points
      this.data.user.points += achievementData.reward;
      
      // Show notification (check if function exists first)
      if (typeof showNotification === 'function') {
        showNotification(`Achievement Unlocked: ${achievementData.name}! +${achievementData.reward} points`, 'success');
      }
      
      this.save();
      return true;
    }
    
    return false;
  }

  // Settings methods
  getSettings() {
    return this.data.settings;
  }

  updateSettings(updates) {
    this.data.settings = { ...this.data.settings, ...updates };
    this.save();
  }

  // Stats methods
  getStats() {
    return this.data.stats;
  }

  addStudyTime(minutes) {
    this.data.stats.totalStudyTime += minutes;
    this.save();
  }

  // Reset
  reset() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
      this.data = this.getDefaultData();
      this.save();
      location.reload();
    }
  }

  // Generic get/set for custom data
  get(key) {
    return this.data[key];
  }

  set(key, value) {
    this.data[key] = value;
    this.save();
  }

  // Export
  export() {
    const dataStr = JSON.stringify(this.data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `toki-pona-backup-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

// Initialize storage
const storage = new Storage();
