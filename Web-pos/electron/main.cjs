const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
}

app.whenReady().then(createWindow);


// ⭐ PRINT HANDLER
ipcMain.handle("print-bill", async () => {
  const printers = await mainWindow.webContents.getPrintersAsync();

  if (printers.length === 0) {
    throw new Error("No printers found");
  }

  await mainWindow.webContents.print({
    silent: false,      // show print dialog (first test)
    printBackground: true,
  });

  return "Printed";
});
