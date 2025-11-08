const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  generateLesson: (data) => ipcRenderer.invoke('generate-lesson', data),
  practiceConversation: (data) => ipcRenderer.invoke('practice-conversation', data),
  getSuggestions: (data) => ipcRenderer.invoke('get-suggestions', data),
  evaluateProgress: (data) => ipcRenderer.invoke('evaluate-progress', data),
  saveApiKey: (apiKey) => ipcRenderer.invoke('save-api-key', apiKey),
  loadApiKey: () => ipcRenderer.invoke('load-api-key')
});
