const { BrowserWindow } = require("electron");
let intent = true;

const createMainWindow = async (app, loading) => {
  let window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 900,
    height: 800,
    show: false,
    frame: true,
    background: "#111111",
    resizable: true
  });

  window.webContents.once("dom-ready", () => {
    setTimeout(() => {
      loading.hide();
      loading = null;
      window.show();
    }, 3000);
  });

  const urlToLoad = {
    dev: process.env.WEBPACK_DEV_SERVER_URL + "index.html#/login",
    prod: "app://./index.html#/login"
  };

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    require("vue-cli-plugin-electron-builder/lib").installVueDevtools();
    window.loadURL(urlToLoad.dev);
  } else {
    window.loadURL(urlToLoad.prod);
  }

  window.on("close", function(event) {
    if (!intent) {
      event.preventDefault();
      window.hide();
    } else {
      app.quit();
    }
  });

  window.on("minimize", function(event) {
    event.preventDefault();
    window.hide();
  });

  return window;
};

module.exports = {
  createMainWindow
};
