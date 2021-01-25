const electron = require("electron");
const Ffmpeg = require("fluent-ffmpeg");

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    /* other options like width,height*/
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on("video:submit", (event, path) => {
  Ffmpeg.ffprobe(path, (err, metadata) => {
    console.log("Video duration is: ", metadata.format.duration);
    mainWindow.webContents.send("video:metadata", metadata.format.duration);
  });
});
