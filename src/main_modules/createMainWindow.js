const { BrowserWindow } = require("electron");
let intent = true;

const {
  createProtocol,
  installVueDevtools,
} = require("vue-cli-plugin-electron-builder/lib");

const createMainWindow = (app, loading) => {
  let window = new BrowserWindow({
    icon: require("path").join(__dirname, "assets", "icon_default.png"),
    webPreferences: {
      nodeIntegration: true,
    },
    width: 900,
    height: 800,
    show: false,
    frame: true,
    background: "#111111",
    resizable: true,
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) await installVueDevtools();

  window.webContents.once("dom-ready", () => {
    setTimeout(() => {
      window.show();
      loading.hide();
      loading = null;
    }, 1500);
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    window.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
  } else {
    createProtocol("app");
    window.loadURL("app://./index.html");
  }

  window.on("close", function (event) {
    if (!intent) {
      event.preventDefault();
      window.hide();
    } else {
      app.quit();
    }
  });

  window.on("minimize", function (event) {
    event.preventDefault();
    window.hide();
  });

  return window;
};

module.exports = {
  createMainWindow,
};
