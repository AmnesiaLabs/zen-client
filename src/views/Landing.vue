<template>
  <div
    class="absolute select-none flex justify-between overflow-y-scroll left-0 w-full bg-gray-800"
    style="top: 2.5rem; height: calc(100% - 2.5rem)"
  >
    <div class="h-12 absolute left-0 w-full px-4" style="bottom: 3rem">
      <h2
        @click="next"
        class="w-full cursor-pointer mt-10 bg-blue-500 rounded p-2 text-sm text-gray-200 flex justify-between"
      >
        <span>{{ steps[current]["nextButton"] }}</span
        ><span>&rarr;</span>
      </h2>
    </div>
    <div :class="wizardClass">
      <div class="max-w-md w-full mx-auto bg-gray-700 p-6">
        <div>
          <div class="flex justify-between text-left w-full">
            <h2 class="text text-gray-200">
              {{ steps[current]["text"] }}
            </h2>
            <img
              class="rounded shadow-outline-blue h-5 w-5"
              :src="require('@/assets/zen-icon.png')"
              alt="Workflow"
            />
          </div>
          <div class="w-full flex mt-8">
            <p class="text-gray-300 text-sm">
              {{ steps[current]["paragraph"] }}
            </p>
          </div>
          <div v-if="steps[current]['link']" class="w-full flex mt-8">
            <a
              target="_blank"
              :href="steps[current]['link']"
              class="select-text text-gray-300 text-white underline-none text-sm"
              >Go to download page</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Landing",
  mounted() {
    this.$refs.wizard.$el.classList.add("wizard-open");
  },
  data() {
    return {
      wizardClass: "wizard-hidden wizard-open px-4 flex my-auto w-full",
      current: 0,
      steps: [
        {
          text: "Welcome to Zen!",
          paragraph:
            "Amnesia Labs is proud to release Zen to the public, and we're so happy it made its way to your computer!",
          nextButton: "Continue"
        },
        {
          text: "Did you set up Zen Bridge?",
          paragraph:
            "Zen Bridge is Zen's best friend. Its's what allows Zen to function and if you haven't set it up yet, now is a good time!",
          link: "https://github.com/AmnesiaLabs/zen-bridge",
          nextButton: "It's setup. Continue to login"
        }
      ]
    };
  },
  methods: {
    next() {
      this.wizardClass = "wizard-hidden px-4 flex my-auto w-full";
      setTimeout(() => {
        this.current++;
        this.wizardClass = "wizard-hidden wizard-open px-4 flex my-auto w-full";
      }, 240);
    }
  },
  watch: {
    current: {
      handler: function() {
        if (this.current == this.steps.length) {
          this.$router.push("/login");
        }
      },
      deep: true
    }
  }
};
</script>

<style>
.wizard-hidden {
  opacity: 0;
  transform: translateY(-10px);
  transition: all 240ms ease;
}

.wizard-open {
  opacity: 1;
  transform: translateY(-0.001px);
}
</style>
