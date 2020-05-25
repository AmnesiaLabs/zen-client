const { BrowserWindow } = require("electron");
const createLoadingWindow = () => {
  let window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 300,
    height: 230,
    show: false,
    frame: false,
    transparent: true,
    resizable: false
  });

  const urlToLoad = {
    dev: process.env.WEBPACK_DEV_SERVER_URL + "index.html#/loading",
    prod: "app://./index.html#/loading"
  };

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    window.loadURL(urlToLoad.dev);
  } else {
    window.loadURL(urlToLoad.prod);
  }
  console.log(urlToLoad);

  window.webContents.once("dom-ready", () => {
    window.show();
  });

  return window;
};

module.exports = {
  createLoadingWindow
};
