import * as path from "path";
import * as url from "url";

import { app, BrowserWindow, Menu, Tray } from "electron";
import * as isDev from "electron-is-dev";

const baseUrl: string = "http://localhost:3000";

let mainWindow: BrowserWindow | null;

// function iniTrayIcionMenu(): void {
//   let tray: Tray;
//   tray = new Tray('');
// }

function createMainWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const mainWindowUrl: string = url.pathToFileURL(path.join(__dirname, '../build/index.html')).toString();

  mainWindow.loadURL(isDev ? baseUrl : mainWindowUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", (): void => {
    mainWindow = null;
  });
}

app.on("ready", (): void => {
  createMainWindow();
});

app.on("window-all-closed", (): void => {
  app.quit();
});

app.on("activate", (): void => {
  if (mainWindow === null) {
    createMainWindow();
  }
});