// Exercise functionality
class ExerciseManager {
  constructor() {
    this.currentExercises = [];
    this.currentIndex = 0;
    this.score = 0;
    this.totalQuestions = 0;
  }

  initialize() {
    this.generateExercises();
  }

  generateExercises() {
    const container = document.getElementById('exercise-container');
    const progress = storage.getProgress();
    
    // Get available exercises based on completed lessons
    const completedLessons = progress.lessonsCompleted || [];
    const availableExercises = EXERCISES_BANK.filter(ex => {
      return ex.requiredLessons.every(lesson => completedLessons.includes(lesson));
    });
    
    if (availableExercises.length === 0) {
      container.innerHTML = `
        <div class="exercise-card">
          <h3>Complete more lessons first!</h3>
          <p>You need to complete some lessons to unlock exercises. Practice makes perfect! ☀️</p>
          <button class="primary-btn" onclick="showScreen('lessons-screen')">Go to Lessons</button>
        </div>
      `;
      return;
    }
    
    // Select random exercises (start with 10)
    const numQuestions = Math.min(10, availableExercises.length);
    this.currentExercises = this.shuffleArray(availableExercises).slice(0, numQuestions);
    
    this.renderExercise();
  }

  renderExercise() {
    const container = document.getElementById('exercise-container');
    const exercise = this.currentExercises[this.currentIndex];
    this.totalQuestions++;
    
    let html = `
      <div class="exercise-card">
        <div class="exercise-type">${exercise.level.toUpperCase()}</div>
        <div class="exercise-question">${exercise.question}</div>
        <input type="text" class="exercise-input" placeholder="Type your answer..." />
        ${exercise.explanation ? `<p style="color: var(--text-secondary); font-style: italic; margin-top: 10px; display: none;" class="hint-text">💡 ${exercise.explanation}</p>` : ''}
        <button class="submit-btn">Submit Answer</button>
        <div class="feedback-box" style="display: none;"></div>
        <div style="margin-top: 20px; text-align: center; color: var(--text-secondary);">
          Question ${this.currentIndex + 1} of ${this.currentExercises.length}
        </div>
      </div>
    `;
    
    container.innerHTML = html;
    
    // Add event listeners
    const submitBtn = container.querySelector('.submit-btn');
    const input = container.querySelector('.exercise-input');
    
    submitBtn.addEventListener('click', () => this.checkAnswer(input.value, exercise));
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.checkAnswer(input.value, exercise);
    });
    
    // Focus input
    input.focus();
  }

  checkAnswer(userAnswer, exercise) {
    const feedbackBox = document.querySelector('.feedback-box');
    const normalizedAnswer = userAnswer.trim().toLowerCase();
    const correctAnswer = exercise.answer.toLowerCase();
    
    let isCorrect = normalizedAnswer === correctAnswer;
    
    // Check alternatives
    if (!isCorrect && exercise.alternatives) {
      isCorrect = exercise.alternatives.some(alt => 
        alt.toLowerCase() === normalizedAnswer
      );
    }
    
    if (isCorrect) {
      this.score++;
      feedbackBox.className = 'feedback-box correct';
      feedbackBox.innerHTML = `
        <h4>✓ Correct!</h4>
        <p>${exercise.explanation || 'Great job! Keep it up!'}</p>
      `;
      storage.addXP(20);
      
      // Disable input
      document.querySelector('.exercise-input').disabled = true;
      document.querySelector('.submit-btn').disabled = true;
    } else {
      feedbackBox.className = 'feedback-box incorrect';
      let acceptableAnswers = [exercise.answer];
      if (exercise.alternatives) {
        acceptableAnswers = acceptableAnswers.concat(exercise.alternatives);
      }
      feedbackBox.innerHTML = `
        <h4>✗ Not quite</h4>
        <p>Acceptable answers: <strong>${acceptableAnswers.slice(0, 3).join(', ')}</strong>${acceptableAnswers.length > 3 ? '...' : ''}</p>
        <p style="margin-top: 10px;">${exercise.explanation || ''}</p>
      `;
      
      // Disable input
      document.querySelector('.exercise-input').disabled = true;
      document.querySelector('.submit-btn').disabled = true;
    }
    
    feedbackBox.style.display = 'block';
    
    // Add next button
    setTimeout(() => {
      const nextBtn = document.createElement('button');
      nextBtn.className = 'primary-btn';
      nextBtn.textContent = this.currentIndex < this.currentExercises.length - 1 ? 
        'Next Question →' : 'Finish';
      nextBtn.onclick = () => this.nextExercise();
      feedbackBox.appendChild(nextBtn);
    }, 500);
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  createExercises(completedLessons) {
    // This method is no longer needed but kept for backwards compatibility
    return [];
  }

  nextExercise() {
    this.currentIndex++;
    
    if (this.currentIndex < this.currentExercises.length) {
      this.renderExercise();
    } else {
      this.showResults();
    }
  }

  showResults() {
    const container = document.getElementById('exercise-container');
    const percentage = Math.round((this.score / this.totalQuestions) * 100);
    
    storage.completeExercise(percentage);
    
    // Track completed exercises for progression
    const completedLessons = storage.getProgress().lessonsCompleted;
    const lastLesson = Math.max(0, ...completedLessons);
    
    // Save practice data for unlocking next lessons
    const practiceData = storage.get('practiceData') || {};
    practiceData[`lesson_${lastLesson}`] = (practiceData[`lesson_${lastLesson}`] || 0) + this.score;
    storage.set('practiceData', practiceData);
    
    const progressMessage = this.score >= 3 ? 
      '⚡ Great work! You\'ve unlocked progress towards the next lesson!' : 
      '📚 Keep practicing! Complete more exercises to unlock new content.';
    
    const html = `
      <div class="exercise-card" style="text-align: center;">
        <div class="exercise-type">Results</div>
        <h2 style="font-size: 3em; margin: 20px 0;">
          ${this.score} / ${this.totalQuestions}
        </h2>
        <div style="font-size: 2em; color: var(--accent-color); margin-bottom: 20px;">
          ${percentage}%
        </div>
        <p style="font-size: 1.2em; margin-bottom: 20px;">
          ${this.getFeedback(percentage)}
        </p>
        <p style="color: var(--accent-color); font-weight: bold; margin-bottom: 30px;">
          ${progressMessage}
        </p>
        <div style="display: flex; gap: 15px; justify-content: center;">
          <button class="primary-btn" onclick="exerciseManager.initialize()">
            Try Again
          </button>
          <button class="secondary-btn" onclick="showScreen('home-screen')">
            Back to Home
          </button>
        </div>
      </div>
    `;
    
    container.innerHTML = html;
    
    // Reset for next time
    this.currentIndex = 0;
    this.score = 0;
    this.totalQuestions = 0;
  }

  getFeedback(percentage) {
    if (percentage === 100) return "Perfect! You're a Toki Pona master! 🎉";
    if (percentage >= 80) return "Excellent work! pona mute! 🌟";
    if (percentage >= 60) return "Good job! Keep practicing! 👍";
    if (percentage >= 40) return "Not bad! Review the lessons and try again! 📚";
    return "Keep studying! You'll get better! 💪";
  }

  formatType(type) {
    const types = {
      'translate': 'Translation',
      'multiple-choice': 'Multiple Choice',
      'fill-blank': 'Fill in the Blank'
    };
    return types[type] || type;
  }
}

// Initialize
const exerciseManager = new ExerciseManager();
document.addEventListener('DOMContentLoaded', () => {
  // Initialize exercises when screen is shown
});
