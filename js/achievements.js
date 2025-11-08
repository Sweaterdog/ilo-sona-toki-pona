// Achievements functionality
class AchievementsManager {
  initialize() {
    this.renderAchievements();
  }

  renderAchievements() {
    const container = document.getElementById('achievements-grid');
    const userAchievements = storage.getAchievements();
    
    container.innerHTML = ACHIEVEMENTS_DATA.map(achievement => {
      const userAch = userAchievements.find(a => a.id === achievement.id);
      const unlocked = userAch?.unlocked || false;
      
      return `
        <div class="achievement-card ${unlocked ? 'unlocked' : ''}">
          <div class="achievement-icon">${achievement.icon}</div>
          <div class="achievement-name">${achievement.name}</div>
          <div class="achievement-description">${achievement.description}</div>
          <div class="achievement-reward">+${achievement.reward} points</div>
          ${unlocked && userAch.unlockedAt ? 
            `<div style="margin-top: 10px; font-size: 0.8em; color: var(--text-secondary);">
              Unlocked: ${new Date(userAch.unlockedAt).toLocaleDateString()}
            </div>` : 
            ''
          }
        </div>
      `;
    }).join('');
    
    // Calculate completion percentage
    const unlockedCount = userAchievements.filter(a => a.unlocked).length;
    const totalCount = ACHIEVEMENTS_DATA.length;
    const percentage = Math.round((unlockedCount / totalCount) * 100);
    
    // Add summary at the top
    const summary = document.createElement('div');
    summary.style.cssText = `
      grid-column: 1/-1;
      text-align: center;
      padding: 30px;
      background: var(--card-bg);
      border-radius: var(--border-radius);
      margin-bottom: 20px;
    `;
    summary.innerHTML = `
      <h3 style="font-size: 2em; margin-bottom: 15px;">
        ${unlockedCount} / ${totalCount} Achievements
      </h3>
      <div style="width: 100%; max-width: 500px; margin: 0 auto;">
        <div class="xp-bar">
          <div class="xp-fill" style="width: ${percentage}%"></div>
        </div>
        <p style="margin-top: 10px; font-size: 1.2em; color: var(--accent-color);">
          ${percentage}% Complete
        </p>
      </div>
    `;
    
    container.insertBefore(summary, container.firstChild);
  }
}

// Initialize
const achievementsManager = new AchievementsManager();
document.addEventListener('DOMContentLoaded', () => {
  // Will initialize when screen is shown
});
