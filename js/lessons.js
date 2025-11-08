// Lessons functionality
class LessonsManager {
  constructor() {
    this.currentLesson = null;
    this.currentSection = 0;
    this.lessonStartTime = null;
    this.exerciseAttempts = {};
    this.sectionCompleted = {};
    this.exerciseInputs = {}; // Store user inputs
  }

  initialize() {
    this.renderLessonsPath();
    this.setupLessonView();
  }

  renderLessonsPath() {
    const container = document.getElementById('lessons-path');
    const progress = storage.getProgress();
    
    container.innerHTML = LESSONS_DATA.map((lesson, index) => {
      const completed = progress.lessonsCompleted.includes(lesson.id);
      
      // Lesson is locked if previous lesson is not completed
      const locked = index > 0 && !progress.lessonsCompleted.includes(index - 1);
      
      // Lesson requires practice if completed but not enough exercises done
      const needsPractice = completed && index < LESSONS_DATA.length - 1 && 
                           !this.hasCompletedRequiredPractice(lesson.id);
      
      return `
        <div class="lesson-node" style="animation-delay: ${index * 0.1}s">
          <div class="lesson-circle ${completed ? 'completed' : ''} ${locked ? 'locked' : ''}" 
               data-lesson="${lesson.id}">
            ${locked ? '🔒' : completed ? '✓' : lesson.icon}
          </div>
          <div class="lesson-info ${locked ? 'locked' : ''}" 
               data-lesson="${lesson.id}">
            <h3>Lesson ${lesson.id}: ${lesson.title}</h3>
            <p>${lesson.description}</p>
            <div class="lesson-meta">
              <span>📝 ${lesson.words.length} words</span>
              <span>⏱️ ${lesson.sections.length * 5} min</span>
              ${completed ? '<span>✓ Completed</span>' : ''}
              ${needsPractice ? '<span style="color: var(--accent-color);">⚡ Practice needed to unlock next lesson</span>' : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');
    
    // Add click handlers
    container.querySelectorAll('[data-lesson]').forEach(el => {
      const lessonId = parseInt(el.dataset.lesson);
      const locked = lessonId > 0 && !progress.lessonsCompleted.includes(lessonId - 1);
      
      el.addEventListener('click', () => {
        if (locked) {
          this.showLockedMessage(lessonId);
        } else {
          this.openLesson(lessonId);
        }
      });
    });
  }

  hasCompletedRequiredPractice(lessonId) {
    const practiceData = storage.get('practiceData') || {};
    const requiredScore = 3; // At least 3 correct answers from practice
    return (practiceData[`lesson_${lessonId}`] || 0) >= requiredScore;
  }

  showLockedMessage(lessonId) {
    const previousLesson = lessonId - 1;
    const message = `Complete Lesson ${previousLesson} first, then practice your skills in Practice Mode to unlock this lesson!`;
    showNotification(message, 'info');
  }

  async openLesson(lessonId) {
    this.currentLesson = LESSONS_DATA.find(l => l.id === lessonId);
    if (!this.currentLesson) return;
    
    this.lessonStartTime = Date.now();
    this.currentSection = 0;
    
    showScreen('lesson-view-screen');
    document.getElementById('lesson-title').textContent = 
      `Lesson ${this.currentLesson.id}: ${this.currentLesson.title}`;
    
    // Check if we need AI-generated content
    if (this.currentLesson.sections.length === 0 || this.currentLesson.sections.length < 3) {
      await this.generateLessonContent();
    }
    
    this.renderLesson();
  }

  async generateLessonContent() {
    showLoading(true);
    
    try {
      const strugglingTopics = this.getStrugglingTopics();
      const userLevel = storage.getUser().level;
      
      const result = await window.electronAPI.generateLesson({
        lessonNumber: this.currentLesson.id,
        userLevel,
        strugglingTopics
      });
      
      if (result.error) {
        showNotification(result.error, 'error');
        if (result.needsConfig) {
          showScreen('settings-screen');
        }
      } else {
        // Parse and add AI-generated content
        this.currentLesson.sections = this.parseAILesson(result);
      }
    } catch (error) {
      console.error('Error generating lesson:', error);
      showNotification('Failed to generate lesson content', 'error');
    } finally {
      showLoading(false);
    }
  }

  parseAILesson(aiData) {
    const sections = [];
    
    // Vocabulary section
    if (aiData.vocabulary && aiData.vocabulary.length > 0) {
      sections.push({
        type: 'vocabulary',
        title: 'New Vocabulary',
        items: aiData.vocabulary
      });
    }
    
    // Grammar section
    if (aiData.grammar) {
      sections.push({
        type: 'grammar',
        title: 'Grammar',
        content: aiData.grammar
      });
    }
    
    // Mnemonics section
    if (aiData.mnemonics && aiData.mnemonics.length > 0) {
      sections.push({
        type: 'tips',
        title: 'Memory Tips',
        content: aiData.mnemonics.join('\n\n')
      });
    }
    
    // Cultural note
    if (aiData.culturalNote) {
      sections.push({
        type: 'cultural',
        title: 'Cultural Context',
        content: aiData.culturalNote
      });
    }
    
    // Exercises
    if (aiData.exercises && aiData.exercises.length > 0) {
      sections.push({
        type: 'practice',
        title: 'Practice Exercises',
        exercises: aiData.exercises
      });
    }
    
    return sections;
  }

  renderLesson() {
    const content = document.getElementById('lesson-content');
    const section = this.currentLesson.sections[this.currentSection];
    
    if (!section) {
      this.completeLesson();
      return;
    }
    
    // Save current input values before re-rendering
    this.saveExerciseInputs();
    
    const sectionKey = `${this.currentLesson.id}-${this.currentSection}`;
    
    let html = `<div class="lesson-section active">`;
    html += `<h3>${section.title}</h3>`;
    
    if (section.content) {
      // Convert markdown-style formatting
      let formattedContent = section.content
        // Convert code blocks with backticks
        .replace(/```([^`]+)```/g, '<pre style="background: var(--card-bg); padding: 15px; border-radius: 8px; overflow-x: auto;"><code>$1</code></pre>')
        // Convert inline code
        .replace(/`([^`]+)`/g, '<code style="background: var(--card-bg); padding: 2px 6px; border-radius: 4px;">$1</code>')
        // Convert bold
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        // Convert line breaks
        .replace(/\n/g, '<br>');
      
      html += `<p>${formattedContent}</p>`;
    }
    
    if (section.type === 'vocabulary' && section.items) {
      html += '<div class="vocab-list">';
      section.items.forEach(item => {
        html += `
          <div class="vocab-item">
            <strong>${item.word}</strong> - ${item.definition}
            ${item.examples ? `<br><em>Examples: ${item.examples.join(', ')}</em>` : ''}
          </div>
        `;
      });
      html += '</div>';
    }
    
    if (section.type === 'practice' && section.exercises) {
      html += '<div class="practice-section">';
      section.exercises.forEach((ex, i) => {
        const exerciseId = `ex-${sectionKey}-${i}`;
        const attempts = this.exerciseAttempts[exerciseId] || 0;
        const maxAttempts = 3;
        const savedValue = this.exerciseInputs[exerciseId] || '';
        
        html += `
          <div class="example-box" id="${exerciseId}">
            <strong>Exercise ${i + 1}:</strong> ${ex.question}
            <div class="exercise-input-container" style="margin-top: 15px;">
              <input type="text" 
                     id="${exerciseId}-input" 
                     class="exercise-input" 
                     placeholder="Type your answer..."
                     value="${savedValue}"
                     ${attempts >= maxAttempts ? 'disabled' : ''}
                     style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid var(--border-color); background: var(--surface-color); color: var(--text-primary);">
              <button class="check-answer-btn" 
                      id="${exerciseId}-btn"
                      ${attempts >= maxAttempts ? 'disabled' : ''}
                      style="margin-top: 10px; padding: 10px 20px; background: var(--accent-color); color: white; border: none; border-radius: 5px; cursor: pointer;">
                Check Answer
              </button>
              <div id="${exerciseId}-feedback" class="feedback-box" style="display: none; margin-top: 10px; padding: 10px; border-radius: 5px;"></div>
              <div id="${exerciseId}-attempts" style="margin-top: 5px; color: var(--text-secondary); font-size: 0.9em;">
                ${attempts > 0 ? `Attempts: ${attempts}/${maxAttempts}` : ''}
              </div>
            </div>
          </div>
        `;
      });
      html += '</div>';
    }
    
    html += '</div>';
    content.innerHTML = html;
    
    // Add event listeners for practice exercises
    if (section.type === 'practice' && section.exercises) {
      section.exercises.forEach((ex, i) => {
        const exerciseId = `ex-${sectionKey}-${i}`;
        const btn = document.getElementById(`${exerciseId}-btn`);
        const input = document.getElementById(`${exerciseId}-input`);
        
        if (btn && input) {
          const checkAnswer = () => this.checkExerciseAnswer(exerciseId, ex, input.value);
          btn.addEventListener('click', checkAnswer);
          input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkAnswer();
          });
          
          // Save input on change
          input.addEventListener('input', () => {
            this.exerciseInputs[exerciseId] = input.value;
          });
        }
      });
    }
    
    this.updateLessonProgress();
  }

  saveExerciseInputs() {
    // Save all current exercise inputs before navigating
    const inputs = document.querySelectorAll('.exercise-input');
    inputs.forEach(input => {
      if (input.id) {
        this.exerciseInputs[input.id.replace('-input', '')] = input.value;
      }
    });
  }

  updateLessonProgress() {
    const dotsContainer = document.getElementById('lesson-dots');
    dotsContainer.innerHTML = '';
    
    this.currentLesson.sections.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = 'progress-dot';
      if (index === this.currentSection) dot.classList.add('active');
      if (index < this.currentSection) dot.classList.add('completed');
      dot.addEventListener('click', () => this.goToSection(index));
      dotsContainer.appendChild(dot);
    });
    
    document.getElementById('prev-section').disabled = this.currentSection === 0;
    
    // Update Next button text when on last section
    const nextBtn = document.getElementById('next-section');
    if (this.currentSection >= this.currentLesson.sections.length - 1) {
      nextBtn.textContent = 'Complete Lesson ✓';
    } else {
      nextBtn.textContent = 'Next →';
    }
    nextBtn.disabled = false; // Never disable, just change text
  }

  nextSection() {
    if (this.currentSection < this.currentLesson.sections.length - 1) {
      this.currentSection++;
      this.renderLesson();
    } else {
      this.completeLesson();
    }
  }

  prevSection() {
    if (this.currentSection > 0) {
      this.currentSection--;
      this.renderLesson();
    }
  }

  goToSection(index) {
    if (index >= 0 && index < this.currentLesson.sections.length) {
      this.currentSection = index;
      this.renderLesson();
    }
  }

  checkExerciseAnswer(exerciseId, exercise, userAnswer) {
    const feedbackBox = document.getElementById(`${exerciseId}-feedback`);
    const attemptsBox = document.getElementById(`${exerciseId}-attempts`);
    const input = document.getElementById(`${exerciseId}-input`);
    const btn = document.getElementById(`${exerciseId}-btn`);
    
    if (!this.exerciseAttempts[exerciseId]) {
      this.exerciseAttempts[exerciseId] = 0;
    }
    
    this.exerciseAttempts[exerciseId]++;
    const attempts = this.exerciseAttempts[exerciseId];
    const maxAttempts = 3;
    
    const normalizedAnswer = userAnswer.trim().toLowerCase();
    const correctAnswer = exercise.answer.toLowerCase();
    
    // Check if answer matches main answer or any alternatives
    let isCorrect = normalizedAnswer === correctAnswer;
    
    if (!isCorrect && exercise.alternatives) {
      isCorrect = exercise.alternatives.some(alt => 
        normalizedAnswer === alt.toLowerCase()
      );
    }
    
    if (isCorrect) {
      feedbackBox.style.display = 'block';
      feedbackBox.style.background = 'rgba(46, 204, 113, 0.2)';
      feedbackBox.style.border = '1px solid #2ecc71';
      feedbackBox.style.color = '#2ecc71';
      feedbackBox.innerHTML = `✓ Correct! ${exercise.explanation || 'Great job!'}`;
      input.disabled = true;
      btn.disabled = true;
      
      // Mark section as having completed exercises
      const sectionKey = `${this.currentLesson.id}-${this.currentSection}`;
      this.sectionCompleted[sectionKey] = true;
    } else {
      if (attempts >= maxAttempts) {
        feedbackBox.style.display = 'block';
        feedbackBox.style.background = 'rgba(231, 76, 60, 0.2)';
        feedbackBox.style.border = '1px solid #e74c3c';
        feedbackBox.style.color = '#e74c3c';
        
        // Show all acceptable answers
        let acceptableAnswers = [exercise.answer];
        if (exercise.alternatives) {
          acceptableAnswers = acceptableAnswers.concat(exercise.alternatives);
        }
        
        feedbackBox.innerHTML = `✗ Acceptable answers: <strong>${acceptableAnswers.join(', ')}</strong><br>${exercise.explanation || ''}`;
        input.disabled = true;
        btn.disabled = true;
      } else {
        feedbackBox.style.display = 'block';
        feedbackBox.style.background = 'rgba(241, 196, 15, 0.2)';
        feedbackBox.style.border = '1px solid #f1c40f';
        feedbackBox.style.color = '#f39c12';
        feedbackBox.innerHTML = `✗ Not quite. Try again! (${maxAttempts - attempts} attempts left)`;
      }
    }
    
    attemptsBox.textContent = `Attempts: ${attempts}/${maxAttempts}`;
    attemptsBox.style.display = 'block';
  }

  completeLesson() {
    const timeSpent = Math.floor((Date.now() - this.lessonStartTime) / 1000 / 60);
    storage.addStudyTime(timeSpent);
    
    // Check time-based achievements
    if (timeSpent < 5) {
      storage.checkAchievement('speed_demon');
    }
    if (timeSpent > 30) {
      storage.checkAchievement('thorough');
    }
    
    storage.completeLesson(this.currentLesson.id);
    
    // Mark words as learned
    this.currentLesson.words.forEach(word => {
      storage.updateWordStatus(word, 'learned');
    });
    
    showNotification(`Lesson ${this.currentLesson.id} completed! +100 XP`, 'success');
    showScreen('lessons-screen');
    this.renderLessonsPath();
  }

  getStrugglingTopics() {
    // Analyze user progress to find struggling topics
    const progress = storage.getProgress();
    const topics = [];
    
    if (progress.accuracy < 70) {
      topics.push('sentence structure');
    }
    
    return topics;
  }

  setupLessonView() {
    document.getElementById('next-section')?.addEventListener('click', () => this.nextSection());
    document.getElementById('prev-section')?.addEventListener('click', () => this.prevSection());
    
    // Dictionary button
    document.getElementById('dictionary-btn')?.addEventListener('click', () => this.showDictionary());
    
    // Dictionary search
    document.getElementById('dictionary-search')?.addEventListener('input', (e) => {
      this.filterDictionary(e.target.value);
    });
  }

  showDictionary() {
    const modal = document.getElementById('dictionary-modal');
    const content = document.getElementById('dictionary-content');
    
    if (!modal || !content) return;
    
    // Get all learned words from completed lessons
    const progress = storage.getProgress();
    const learnedWords = [];
    
    LESSONS_DATA.forEach(lesson => {
      if (progress.lessonsCompleted.includes(lesson.id) || lesson.id <= this.currentLesson.id) {
        lesson.words.forEach(word => {
          const vocabData = VOCABULARY_DATA.find(v => v.word === word);
          if (vocabData && !learnedWords.find(w => w.word === word)) {
            learnedWords.push(vocabData);
          }
        });
      }
    });
    
    // Render dictionary
    content.innerHTML = learnedWords.map(word => `
      <div class="vocab-item" style="padding: 15px; background: var(--card-bg); border-radius: 10px;">
        <strong style="color: var(--accent-color); font-size: 1.2em;">${word.word}</strong> 
        <span style="color: var(--text-secondary);">- ${word.definition}</span>
      </div>
    `).join('');
    
    modal.classList.add('show');
  }

  filterDictionary(searchTerm) {
    const items = document.querySelectorAll('#dictionary-content .vocab-item');
    const term = searchTerm.toLowerCase();
    
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(term) ? 'block' : 'none';
    });
  }
}

// Initialize
const lessonsManager = new LessonsManager();
document.addEventListener('DOMContentLoaded', () => {
  lessonsManager.initialize();
});
