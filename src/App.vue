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
  mounted() {}
};
</script>
