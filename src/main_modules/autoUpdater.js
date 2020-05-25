const electron = require("electron");
const autoUpdater = electron.autoUpdater;

autoUpdater.on("update-available", (ev, info) => {
  console.log("log", log);
  console.log("arguments", arguments);
});
autoUpdater.on("update-not-available", (ev, log) => {
  console.log("log", log);
  console.log("arguments", arguments);
});
autoUpdater.on("error", (ev, err) => {
  console.log("err", err);
  console.log("arguments", arguments);
});
autoUpdater.on("update-downloaded", (ev, log) => {
  console.log("log", log);
  console.log("arguments", arguments);

  setTimeout(function() {
    autoUpdater.quitAndInstall();
  }, 5000);
});

const init = () => {
  console.log("checking for updates...");
  autoUpdater.checkForUpdates();
};

module.exports = {
  init
};
