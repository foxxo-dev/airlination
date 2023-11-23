const { app, BrowserWindow, Menu, nativeImage } = require('electron');
const path = require('path');

require('@electron/remote/main').initialize();

function createWindow() {
  const win = new BrowserWindow({
    width: 1800,
    height: 1600,
    webPreferences: { nodeIntegration: true, enableRemoteModule: true }
  });

  win.loadURL('http://localhost:3000/');

  // Set taskbar icon (for Windows and Linux)
  const iconPath = path.join(__dirname, 'ico.png');
  win.setIcon(iconPath);
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('ready', () => {
  createWindow();
});

// Set dock name
const image = nativeImage.createFromPath(path.join(__dirname, 'ico.png'));
app.dock.setIcon(image);
app.setName('Airlination');
