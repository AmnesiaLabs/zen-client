<template>
  <div
    class="bg-gray-900 text-white w-screen h-screen relative flex select-none"
  >
    <div class="m-auto w-64 flex flex-col">
      <p class="m-auto">
        <img
          style="max-height: 33px; padding: 4px; background: rgba(0,0,0,0.5); border-radius: 4px"
          :src="require('@/assets/icon_default.png')"
        />
      </p>
      <p class="w-auto mx-auto mt-6 text-sm">
        Zen is starting up.
      </p>
      <div class="w-auto fade-up mt-8 flex">
        <div class="mx-auto text-xs">{{ funString }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {
      strings: [
        "🚀 Checking for updates...",
        "💕 Verifying services...",
        "🙏 Waiting on host!",
        "🙏 Trying again..."
      ],
      interval: null,
      num: 0
    };
  },
  computed: {
    funString: function() {
      return this.strings[this.num];
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.num = this.num + 1;
      if (this.num === 4) {
        this.num = 0;
      }
    }, 2500);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
* {
  font-family: "Inter", sans-serif;
}
@-webkit-keyframes grad {
  0% {
    background-position: 2% 0%;
  }

  50% {
    background-position: 99% 100%;
  }

  100% {
    background-position: 2% 0%;
  }
}

@-moz-keyframes grad {
  0% {
    background-position: 2% 0%;
  }

  50% {
    background-position: 99% 100%;
  }

  100% {
    background-position: 2% 0%;
  }
}

@keyframes grad {
  0% {
    background-position: 2% 0%;
  }

  50% {
    background-position: 99% 100%;
  }

  100% {
    background-position: 2% 0%;
  }
}

@keyframes fade {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

.fade-up {
  font-size: 11px;
  width: auto;
  display: inline-block;
  opacity: 1;
  transform: translateY(0px);
  animation: fade 1800ms ease;
  background: rgba(255, 255, 255, 0.07);
  padding: 12px;
  border-radius: 8px;
}
</style>
