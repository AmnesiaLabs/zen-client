<template>
  <div
    v-show="$store.getters.latency"
    style="margin-left: 4px; margin-top: 8px;z-index: 99999; top: 0px; overflow: hidden; pointer-events: none !important"
    :class="color"
  >
    <div
      class="cursor-default my-auto font-bold tracking-wide opacity-25"
      style="font-size:9px"
    >
      <span v-if="$store.getters.latency !== 'NO'"
        >{{ $store.getters.latency }} MS</span
      >
      <span v-else>NO PING</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "statBar",
  data() {
    return {
      defaultStyle:
        "statbar-fade rounded absolute left-0 h-6 flex py-1 px-2 rounded"
    };
  },
  computed: {
    color() {
      if (!this.$store.getters.latency) return;
      if (this.$store.getters.latency > 90) {
        return this.defaultStyle + " text-yellow-200";
      }
      if (this.$store.getters.latency > 200) {
        return this.defaultStyle + " text-red-200";
      }

      return this.defaultStyle + " text-green-200";
    }
  }
};
</script>

<style scoped>
.bg-ping {
  background: rgba(255, 255, 255, 0.04);
}

.statbar-fade {
  animation: statbarFade 1240ms ease;
}

@keyframes statbarFade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
