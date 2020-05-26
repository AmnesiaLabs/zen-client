const fs = require("fs");
const path = require("path");
const electron = require("electron");
const appPath = electron.remote.app.getPath("userData");

const load = () => {
  let jsonSettings;
  try {
    let f = fs.readFileSync(path.join(appPath, "/settings.json"));
    jsonSettings = JSON.parse(f);
    console.log("Loaded configuration file!", appPath + "/settings.json");
    console.log(jsonSettings);
  } catch (e) {
    window.console.log(
      `Generating settings config file... ${path.join(
        appPath,
        "/settings.json"
      )}`
    );
    fs.writeFileSync(
      path.join(appPath, "/settings.json"),
      JSON.stringify(require("./config.default.js").ob)
    );
  }
  return jsonSettings;
};

const save = s => {
  try {
    fs.writeFileSync(path.join(appPath, "/settings.json"), JSON.stringify(s));
  } catch (e) {
    window.alert(e);
    window.console.log(
      `Couldn't write to config file.. ${path.join(appPath, "/settings.json")}`
    );
  }
  return;
};

module.exports = {
  load,
  save
};
