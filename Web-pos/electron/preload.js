// later printer logic here
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  printBill: () => ipcRenderer.invoke("print-bill"),
});
