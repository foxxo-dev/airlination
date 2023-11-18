const { app, BrowserWindow } = require('electron');

require('@electron/remote/main').initialize();

function createWindow() {
  const win = new BrowserWindow({
    width: 1800,
    height: 1600,
    webPreferences: { nodeIntegration: true, enableRemoteModule: true }
  });

  win.loadURL('http://localhost:3000/');
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('ready', createWindow);
