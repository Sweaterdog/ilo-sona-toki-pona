const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { genai } = require('./gemini-service');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      // Enable media devices for speech recognition
      enableRemoteModule: false,
      sandbox: false
    },
    backgroundColor: '#1a1a2e',
    frame: true,
    titleBarStyle: 'default',
    icon: path.join(__dirname, 'assets', 'icon.png')
  });

  // Clear cache to ensure latest UI updates
  mainWindow.webContents.session.clearCache();

  mainWindow.loadFile('index.html');
  
  // Set permissions for media devices
  mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
    if (permission === 'media' || permission === 'microphone') {
      callback(true);
    } else {
      callback(false);
    }
  });

  // Open DevTools in development
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC Handlers for Gemini API
ipcMain.handle('generate-lesson', async (event, data) => {
  try {
    return await genai.generateLesson(data);
  } catch (error) {
    console.error('Error generating lesson:', error);
    return { error: error.message };
  }
});

ipcMain.handle('practice-conversation', async (event, data) => {
  try {
    return await genai.practiceConversation(data);
  } catch (error) {
    console.error('Error in practice conversation:', error);
    return { error: error.message };
  }
});

ipcMain.handle('get-suggestions', async (event, data) => {
  try {
    return await genai.getSuggestions(data);
  } catch (error) {
    console.error('Error getting suggestions:', error);
    return { error: error.message };
  }
});

ipcMain.handle('evaluate-progress', async (event, data) => {
  try {
    return await genai.evaluateProgress(data);
  } catch (error) {
    console.error('Error evaluating progress:', error);
    return { error: error.message };
  }
});

// Config file handlers
ipcMain.handle('save-api-key', async (event, apiKey) => {
  try {
    const configPath = path.join(__dirname, 'config.json');
    const config = { geminiApiKey: apiKey };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    
    // Reinitialize Gemini with new API key
    genai.initialize(apiKey);
    
    return { success: true };
  } catch (error) {
    console.error('Error saving API key:', error);
    return { error: error.message };
  }
});

ipcMain.handle('load-api-key', async () => {
  try {
    const configPath = path.join(__dirname, 'config.json');
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return { apiKey: config.geminiApiKey || '' };
    }
    return { apiKey: '' };
  } catch (error) {
    console.error('Error loading API key:', error);
    return { apiKey: '' };
  }
});
