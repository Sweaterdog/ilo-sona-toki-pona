<div align="center">
  <img src="assets/icon.png" alt="Toki Pona App Icon" width="120" height="160">
  <h1>ilo sona toki pona</h1>
  <h3>Learning tool for toki pona</h3>
  <p><i>A beautiful, gamified app for learning the minimalist language</i></p>
  
  <p>
    <img src="https://img.shields.io/badge/Electron-28.0.0-47848F?style=for-the-badge&logo=electron&logoColor=white" alt="Electron">
    <img src="https://img.shields.io/badge/Gemini_API-Powered-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini">
    <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License">
  </p>
</div>

---
## Before continuing...
This is one of my first attempts to do something with toki pona, My experience in it is small, but I wanted to make an app to help me, and others learn the magnificient language that is toki pona.

If there are any translation issues, PLEASE open a github issue!

---

## ✨ What is this?

An interactive desktop application designed to make learning **toki pona** engaging and fun. With AI-powered conversations, gamification features, and a beautiful interface, you'll master the smallest language faster than you think.

<div align="center">
  <table>
    <tr>
      <td><b>🎮 Gamified Learning</b><br/>XP, levels, achievements</td>
      <td><b>🤖 AI Conversations</b><br/>Practice with Gemini API</td>
      <td><b>📚 Structured Lessons</b><br/>From basics to fluency</td>
    </tr>
    <tr>
      <td><b>✍️ Interactive Exercises</b><br/>Instant feedback</td>
      <td><b>📖 120-Word Dictionary</b><br/>Complete vocabulary</td>
      <td><b>🎨 Beautiful Design</b><br/>Dark theme, animations</td>
    </tr>
  </table>
</div>

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ and npm ([Download here](https://nodejs.org/))
- **Gemini API key** (free at [ai.google.dev](https://ai.google.dev))

### Installation

#### Option 1: Manual Setup

**Clone or Download:**
```bash
# Clone with git
git clone https://github.com/yourusername/toki_pona_app.git
cd toki_pona_app

# Or download ZIP and extract, then navigate to folder
```

**Install Dependencies:**
```bash
npm install
npm install @google/generative-ai
```

**Run the App:**
```bash
npm start
```

#### Option 2: Windows Quick Start (Batch Files)

We provide convenient `.bat` files for Windows users:

1. **Download/clone the repository**
2. **Double-click `install.bat`** - Installs all dependencies
3. **Double-click `start.bat`** - Launches the app
4. **Double-click `start-dev.bat`** - Launches with DevTools (for debugging)

**Or, for Linux / MacOS users:**
1. **Download/clone the repository**
2. **Run `chmod +x setup.sh start.sh`** - Makes scripts executable
3. **Run `./setup.sh`** - Installs dependencies
4. **Run `./start.sh`** - Launches the app

> **Note:** You still need Node.js installed first!

### First Launch
1. Open Settings (⚙️ icon)
2. Paste your Gemini API key
3. Start learning!

> **Getting an API key:** Visit [ai.google.dev](https://ai.google.dev) → "Get API Key" → Sign in → Create new key → Copy it!

---

## 🎯 Features

### Learning Modes

<details>
<summary><b>📚 Lessons</b> - Structured learning path</summary>
<br>

- 13 progressive lessons from pronunciation to advanced grammar
- AI-generated content tailored to your progress
- Interactive exercises embedded in each lesson
- 100 XP per completed lesson + bonus points

</details>

<details>
<summary><b>💬 Practice</b> - AI-powered conversations</summary>
<br>

- Chat with Gemini in toki pona
- Get real-time corrections and tips
- Voice input support (speech-to-text)
- Vocabulary limited to what you've learned
- Adaptive difficulty based on your level

</details>

<details>
<summary><b>✍️ Exercises</b> - Test your knowledge</summary>
<br>

- 100+ questions covering all lessons
- Multiple formats: translation, fill-in-blank, multiple choice
- Instant feedback with explanations
- Alternative answer support
- Progression-based unlocking

</details>

<details>
<summary><b>📖 Vocabulary</b> - Master all 120 words</summary>
<br>

- Browse the complete official dictionary
- Track learning status: New → Learning → Mastered
- Search and filter functionality
- Example usage for each word

</details>

<details>
<summary><b>🏆 Achievements</b> - Unlock rewards</summary>
<br>

- 18 unique achievements to discover
- Milestone, streak, and skill-based challenges
- Bonus XP rewards
- Track your completion progress

</details>

---

## 🎮 Gamification System

| Feature | Description |
|---------|-------------|
| **XP & Levels** | Earn experience points, level up, unlock new content |
| **Daily Streaks** | Keep your streak alive for bonus rewards |
| **Achievement System** | 18 achievements with unique rewards |
| **Progress Tracking** | Visualize your learning journey |
| **Lesson Locking** | Complete lessons and practice to unlock new content |

---

## 🛠️ Tech Stack

<table>
  <tr>
    <td align="center" width="100">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg" width="40" height="40" alt="Electron"/>
      <br>Electron
    </td>
    <td align="center" width="100">
      <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" width="40" height="40" alt="Gemini"/>
      <br>Gemini
    </td>
    <td align="center" width="100">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40" height="40" alt="JavaScript"/>
      <br>JavaScript
    </td>
    <td align="center" width="100">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40" height="40" alt="CSS3"/>
      <br>CSS3
    </td>
    <td align="center" width="100">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="40" height="40" alt="HTML5"/>
      <br>HTML5
    </td>
  </tr>
</table>

**Built with:**
- Pure vanilla JavaScript
- LocalStorage for data persistence
- Web Speech API for voice input
- Canvas API for particle animations
- Custom CSS animations and gradients

---

## 📁 Project Structure

```
toki_pona_app/
│
├── 🎯 Core Files
│   ├── main.js              # Electron main process
│   ├── preload.js           # Electron preload bridge
│   ├── gemini-service.js    # AI integration with vocab context
│   ├── index.html           # Main HTML structure
│   ├── styles.css           # All styles & animations
│   ├── install.bat          # Windows installer
│   ├── start.bat            # Windows launcher
│   └── start-dev.bat        # Windows dev mode launcher
│
├── 📊 Data
│   ├── lessons.js           # 13 structured lessons
│   ├── vocabulary.js        # Official 120-word dictionary from "pu"
│   ├── exercises.js         # 100+ practice questions
│   └── achievements.js      # 18 achievement definitions
│
├── 🎨 JavaScript Modules
│   ├── app.js               # Main application logic
│   ├── storage.js           # Data persistence layer
│   ├── gamification.js      # XP, levels, achievements
│   ├── particles.js         # Background animations
│   ├── lessons.js           # Lesson display & progression
│   ├── practice.js          # AI conversation interface
│   ├── exercises.js         # Exercise system
│   ├── vocabulary.js        # Dictionary browser
│   └── settings.js          # Configuration management
│
└── 🎨 Assets
    └── icon.png             # App icon
```

---

## 💡 Usage Tips

| Tip | Why |
|-----|-----|
| **Study daily** | Even 10 minutes keeps your streak and helps retention |
| **Use voice input** | Practice pronunciation with speech-to-text |
| **Don't skip lessons** | Each builds on the previous one |
| **Chat with AI fearlessly** | Mistakes are how you learn! |
| **Mark vocab honestly** | Accurate tracking = better AI responses |

---

## ❌ Current Limitations

This app, while designed to teach someone how to speak toki pona, does not include every single word that the community is inventing on a daily basis.

This app also lacks support Sitelen Pona. Latin characters are easiest to learn to start.

ilo sona toki pona may have subtle bugs somewhere under unique scenarios, if you find one, open a [github issue!](https://github.com/Sweaterdog/ilo-sona-toki-pona/issues/new)

This app has only been tested to work on Linux systems, you may experience bugs on Windows / MacOS. If you do, please open a [github issue.](https://github.com/Sweaterdog/ilo-sona-toki-pona/issues/new)

---

## 🐛 Troubleshooting

<details>
<summary><b>API key not working?</b></summary>

- Verify the key at [ai.google.dev](https://ai.google.dev)
- Check for extra spaces when pasting
- Ensure you haven't exceeded free tier limits (1,500 requests/day)
- Restart the app after adding the key

</details>

<details>
<summary><b>App won't start?</b></summary>

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm start
```

Check Node.js version: `node --version` (needs 16+)

</details>

<details>
<summary><b>Exercises not loading?</b></summary>

- Complete Lesson 0 first to unlock exercises
- Check browser console for errors (DevTools: `npm start -- --dev`)
- Verify `data/exercises.js` exists

</details>

<details>
<summary><b>Performance issues?</b></summary>

- Disable particle effects in Settings
- Close other Electron apps
- Restart the application

</details>

---

## 📚 Learning Resources

Want to dive deeper into toki pona?

- 📖 [Official toki pona book](https://tokipona.org/) by Sonja Lang
- 🌐 [lipu sona pona](https://lipu-sona.pona.la/) - Course that inspired this app's curriculum
- 💬 [ma pona pi toki pona](https://discord.gg/mapona) - Community Discord
- 📺 [12 days of sona pi toki pona](https://www.youtube.com/watch?v=4L-dvvng4Zc) - Video course
- 🔤 [nimi.li](https://nimi.li/) - Interactive dictionary

---

## 📄 License

MIT License - Free to use, modify, and distribute!

---

<div align="center">
  <br>
  <p><b>pona tawa sina!</b></p>
  <p><i>(Good to you!)</i></p>
  <br>
  <p>Made with 💙 for the toki pona community</p>
  <br>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
