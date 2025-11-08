// Gamification features
function showNotification(message, type = 'info') {
  const toast = document.getElementById('notification-toast');
  toast.textContent = message;
  toast.className = `notification-toast ${type}`;
  
  setTimeout(() => toast.classList.add('show'), 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function showLevelUp(level) {
  const modal = document.getElementById('level-up-modal');
  const levelSpan = document.getElementById('new-level');
  
  levelSpan.textContent = level;
  modal.classList.add('show');
  
  // Play sound if enabled
  if (storage.getSettings().soundEnabled) {
    playSound('levelup');
  }
}

function closeModal() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => modal.classList.remove('show'));
}

function updateUI() {
  const user = storage.getUser();
  const progress = storage.getProgress();
  const vocab = storage.getVocabulary();
  
  // Update stats in nav
  document.getElementById('streak').textContent = user.streak;
  document.getElementById('points').textContent = user.points;
  document.getElementById('level').textContent = user.level;
  
  // Update XP bar
  const xpPercent = (user.xp / user.xpToNextLevel) * 100;
  document.getElementById('xp-fill').style.width = `${xpPercent}%`;
  document.getElementById('xp-text').textContent = `${user.xp} / ${user.xpToNextLevel} XP`;
  
  // Update home screen stats
  document.getElementById('lessons-completed').textContent = progress.lessonsCompleted.length;
  document.getElementById('exercises-completed').textContent = progress.exercisesCompleted;
  document.getElementById('words-learned').textContent = 
    vocab.learned.length + vocab.learning.length + vocab.mastered.length;
}

function playSound(type) {
  if (!storage.getSettings().soundEnabled) return;
  
  // You can add actual sound files here
  // For now, we'll use the Web Audio API for simple beeps
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  if (type === 'levelup') {
    oscillator.frequency.value = 523.25; // C5
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } else if (type === 'correct') {
    oscillator.frequency.value = 659.25; // E5
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } else if (type === 'incorrect') {
    oscillator.frequency.value = 233.08; // A#3
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  }
}

function animatePoints(element, points) {
  const pointsEl = document.createElement('div');
  pointsEl.textContent = `+${points} XP`;
  pointsEl.style.cssText = `
    position: fixed;
    left: ${element.offsetLeft + element.offsetWidth / 2}px;
    top: ${element.offsetTop}px;
    color: #ffd700;
    font-weight: 700;
    font-size: 1.5em;
    pointer-events: none;
    z-index: 1000;
    animation: floatUp 1s ease-out forwards;
  `;
  
  document.body.appendChild(pointsEl);
  
  setTimeout(() => pointsEl.remove(), 1000);
}

// Add CSS animation for floating points
const style = document.createElement('style');
style.textContent = `
  @keyframes floatUp {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-100px);
    }
  }
`;
document.head.appendChild(style);

// Scroll reveal animation
function revealOnScroll() {
  const reveals = document.querySelectorAll('.scroll-reveal');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('revealed');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);

// Daily goal tracker
function checkDailyGoal() {
  const settings = storage.getSettings();
  const stats = storage.getStats();
  const user = storage.getUser();
  
  const today = new Date().toDateString();
  const lastVisit = new Date(user.lastVisit).toDateString();
  
  if (today !== lastVisit) {
    // New day, reset daily progress
    storage.updateUser({ dailyProgress: 0 });
  }
  
  // Check if daily goal is met
  if (user.dailyProgress >= settings.dailyGoal) {
    storage.checkAchievement('daily_goal_met');
  }
}

// Check for time-based achievements
function checkTimeBasedAchievements() {
  const hour = new Date().getHours();
  
  if (hour >= 0 && hour < 3) {
    storage.checkAchievement('night_owl');
  }
  
  if (hour >= 3 && hour < 6) {
    storage.checkAchievement('early_bird');
  }
  
  // Check streak achievements
  const user = storage.getUser();
  if (user.streak >= 7) {
    storage.checkAchievement('week_streak');
  }
  if (user.streak >= 30) {
    storage.checkAchievement('month_streak');
  }
  
  // Check level achievements
  if (user.level >= 5) {
    storage.checkAchievement('level_5');
  }
  if (user.level >= 10) {
    storage.checkAchievement('level_10');
  }
}

// Initialize gamification
document.addEventListener('DOMContentLoaded', () => {
  updateUI();
  storage.updateStreak();
  checkDailyGoal();
  checkTimeBasedAchievements();
  
  // Update UI periodically
  setInterval(updateUI, 1000);
});
