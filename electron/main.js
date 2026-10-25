const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const serve = require('electron-serve');

const isDev = !app.isPackaged && process.env.NODE_ENV !== 'production';

// Register static file serve for production build (out/ directory)
const loadURL = serve({ directory: 'out' });

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1180,
    height: 780,
    minWidth: 840,
    minHeight: 560,
    title: 'DataLens',
    backgroundColor: '#262624',
    show: false, // will show when ready-to-show
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  // Smooth appearance without white flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  if (isDev) {
    const port = process.env.PORT || 3000;
    mainWindow.loadURL(`http://localhost:${port}`);
    // Open DevTools in dev mode
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    loadURL(mainWindow);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// IPC Handlers
ipcMain.handle('app:get-system-info', () => {
  return {
    platform: process.platform,
    arch: process.arch,
    node: process.versions.node,
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    appVersion: app.getVersion(),
  };
});

ipcMain.handle('app:get-version', () => {
  return app.getVersion();
});

ipcMain.handle('app:ping', (_event, message) => {
  return `Pong from Electron Main Process! Received: "${message}" at ${new Date().toLocaleTimeString()}`;
});

ipcMain.on('window:minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window:maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on('window:close', () => {
  if (mainWindow) mainWindow.close();
});

ipcMain.handle('window:is-maximized', () => {
  return mainWindow ? mainWindow.isMaximized() : false;
});

// App Lifecycle
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
