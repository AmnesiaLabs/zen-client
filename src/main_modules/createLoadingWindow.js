const { BrowserWindow } = require("electron");
const createLoadingWindow = app => {
  loading = new BrowserWindow({
    width: 300,
    height: 300,
    show: false,
    frame: false,
    transparent: true,
    resizable: false
  });

  loading.once("ready-to-show", () => {
    loading.show();
  });

  let url = require("url").format({
    protocol: "file",
    slashes: true,
    pathname: require("path").join(__dirname, "assets", "loading.html")
  });

  loading.loadURL(url);

  return loading;
};

module.exports = {
  createLoadingWindow
};
