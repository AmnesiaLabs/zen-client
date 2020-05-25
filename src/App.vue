<template>
  <div id="app">
    <topBar v-if="$router.currentRoute.path !== '/loading'" />
    <router-view />
  </div>
</template>

<script>
import topBar from "@/components/window/topBar";

export default {
  name: "App",
  components: {
    topBar
  },
  mounted() {
    if (this.$router.currentRoute.path === "/loading") return;
    this.$store.commit("log", "App mounted");
    let initSettings = this.$store.getters.getSettings;

    this.$store.commit("log", "Respecting auto-login preferences...");
    if (this.$store.getters.getSettings.account.relay.value == "") {
      this.$store.commit("log", "New user, sending to splash wizard...");
      this.$router.push("Landing");
    } else {
      this.$store.commit("log", "Sending to login page...");
      this.$router.push("Login");
    }
  }
};
</script>
