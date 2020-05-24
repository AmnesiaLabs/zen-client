import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VTooltip from "v-tooltip";
import "@/assets/css/tailwind.css";
import "@/assets/css/extras.css";
import VueProgressBar from "vue-progressbar";
require("typeface-inter");
require("./renderer.js");

import ResSplitPane from "vue-resize-split-pane";
Vue.component("rs-panes", ResSplitPane);

Vue.use(VueProgressBar, {
  color: "#3f83f8",
  failedColor: "red",
  height: "6px"
});

Vue.use(VTooltip);

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
