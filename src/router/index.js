import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Settings from "@/views/Settings.vue";
import Network from "@/views/Network.vue";
import Landing from "@/views/Landing.vue";
import Loading from "@/views/Loading.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/landing",
    name: "Landing",
    component: Landing
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings
  },
  {
    path: "/network",
    name: "Network",
    component: Network
  },
  {
    path: "/loading",
    name: "Loading",
    component: Loading
  }
];

const router = new VueRouter({
  mode: "hash",
  routes
});

export default router;
