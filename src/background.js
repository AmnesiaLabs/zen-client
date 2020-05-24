const { app, BrowserWindow } = require("electron");
const ipc = require("electron").ipcMain;
const { join } = require("path");

const autoUpdater = require("./main_modules/autoUpdater");

const { createLoadingWindow } = require("./main_modules/createLoadingWindow");
const { createMainWindow } = require("./main_modules/createMainWindow");

let window = null;
let loading = null;

app.setAppUserModelId(process.execPath);

app.once("ready", () => {
  autoUpdater.init(window);
  ipc.on("event", function(event, args) {
    if (args.type == "forceQuit") {
      intent = true;
      app.quit();
    }

    if (args.type == "open") {
      window.show();
    }

    if (args.type == "hide") {
      window.hide();
    }

    if (args.type == "notif_clicked") {
      ZEN_UNREAD = 0;
      window.show();
    }
  });

  let loading = createLoadingWindow(app);
  let window = createMainWindow(app, loading);
});
