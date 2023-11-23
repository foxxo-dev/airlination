const { app, BrowserWindow, Menu, nativeImage } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { exec } = require('child_process');

require('@electron/remote/main').initialize();

let mainWindow; // Declare a variable to hold the main window instance

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1800,
    height: 1600,
    webPreferences: { nodeIntegration: true, enableRemoteModule: true },
    icon: path.join(__dirname, 'ico.png')
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000/'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  // Set taskbar icon (for Windows and Linux)
  const iconPath = path.join(__dirname, 'ico.png');
  mainWindow.setIcon(iconPath);
  // exec(`wmctrl -r "Airlination" -b add,above`);
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (isDev) exec(`node ${path.join(__dirname, './server/fileSystem.js')}`);
  else exec(`node ${path.join(__dirname, '../build/server/fileSystem.js')}`);
  if (!mainWindow) createWindow(); // Create window only if it doesn't exist
});

app.on('ready', () => {
  if (isDev) exec(`node ${path.join(__dirname, './server/fileSystem.js')}`);
  else exec(`node ${path.join(__dirname, '../build/server/fileSystem.js')}`);
  createWindow();
  if (process.platform === 'darwin') {
    const image = nativeImage.createFromPath(path.join(__dirname, 'ico.png'));
    app.dock.setIcon(image);
    app.setName('Airlination');
  }
});
