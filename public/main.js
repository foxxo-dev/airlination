const { app, BrowserWindow, nativeImage } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { exec } = require('child_process');

require('@electron/remote/main').initialize();

let mainWindow;

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
      : `file://${path.join(__dirname, 'index.html')}`
  );
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (isDev) {
    createWindow();
  } else {
    exec(
      `node ${path.join(__dirname, '/server/fileSystem.js')}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error starting server: ${error.message}`);
          return;
        }
        console.log(`Server started: ${stdout}`);
        createWindow();
      }
    );
  }
});

app.on('ready', () => {
  if (isDev) {
    createWindow();
  } else {
    exec(
      `node ${path.join(__dirname, '/server/fileSystem.js')}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error starting server: ${error.message}`);
          return;
        }
        console.log(`Server started: ${stdout}`);
        createWindow();
      }
    );
  }

  if (process.platform === 'darwin') {
    const image = nativeImage.createFromPath(path.join(__dirname, 'ico.png'));
    app.dock.setIcon(image);
    app.setName('Airlination');
  }
});
