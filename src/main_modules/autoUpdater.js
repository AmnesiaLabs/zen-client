const electron = require("electron");
const autoUpdater = electron.autoUpdater;

autoUpdater.on("update-available", (ev, info) => {
  log.info("info", info);
  log.info("arguments", arguments);
});
autoUpdater.on("update-not-available", (ev, info) => {
  log.info("info", info);
  log.info("arguments", arguments);
});
autoUpdater.on("error", (ev, err) => {
  log.info("err", err);
  log.info("arguments", arguments);
});
autoUpdater.on("update-downloaded", (ev, info) => {
  log.info("info", info);
  log.info("arguments", arguments);

  setTimeout(function() {
    autoUpdater.quitAndInstall();
  }, 5000);
});

const init = win => {
  autoUpdater.checkForUpdatesAndNotify();
};

module.exports = {
  init
};
