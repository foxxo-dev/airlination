const { app, BrowserWindow, nativeImage } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { exec } = require('child_process');

require('@electron/remote/main').initialize();

let mainWindow;

console.log(__dirname);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1800,
    height: 1600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'ico.png')
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000/'
      : `file://${path.join(__dirname, 'index.html')}`
  );

  mainWindow.webContents.on(
    'did-fail-load',
    (event, errorCode, errorDescription) => {
      console.error(
        `Failed to load the page: ${errorCode} - ${errorDescription}`
      );
    }
  );

  // Uncomment the following line if you want to open DevTools automatically
  // mainWindow.webContents.openDevTools();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(() => {
  if (isDev) {
    createWindow();
  } else {
    // Start the server and wait for it to finish before creating the window
    exec(
      `node ${path.join(__dirname, '/server/fileSystem.js')}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error starting server: ${error}`);
        } else {
          createWindow();
        }
      }
    );
  }
});

// Additional macOS-specific settings
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

if (process.platform === 'darwin') {
  const image = nativeImage.createFromPath(path.join(__dirname, 'ico.png'));
  app.dock.setIcon(image);
  app.setName('Airlination');
}
