const { contextBridge, ipcRenderer } = require('electron');

// Expose IPC API to the renderer process
contextBridge.exposeInMainWorld('electron', {
  quit: () => ipcRenderer.send('app-quit'),
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  // Add other API methods as needed
}); 