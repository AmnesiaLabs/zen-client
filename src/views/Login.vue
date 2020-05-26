<template>
  <div
    class="select-none absolute flex justify-between overflow-y-scroll left-0 w-full bg-gray-200"
    style="top: 2.5rem; height: calc(100% - 2.5rem)"
  >
    <div class="px-4 flex my-auto w-full">
      <div class="max-w-md w-full mx-auto">
        <div>
          <div class="flex justify-start w-full h-7 mb-10">
            <img
              class="rounded shadow-outline-blue my-auto h-7 w-7 w-auto"
              :src="require('@/assets/zen-icon.png')"
              alt="Workflow"
            />
            <h2 class="ml-4 my-auto text-gray-700">Welcome to Zen!</h2>
          </div>
          <p class="mt-2 text-left text-sm leading-5 text-gray-900 max-w">
            {{ autoString }}
          </p>
        </div>
        <div class="mt-8">
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm relative">
            <div
              v-if="relay.length < 1"
              class="absolute right-0 top-0 text-xs z-50 h-auto mt-2 flex"
            >
              <span
                @click="setDefault"
                class="px-2 bg-gray-100 rounded text-gray-800 p-1 my-auto mr-2 cursor-pointer hover:opacity-75"
              >
                Use Public
              </span>
            </div>
            <div>
              <input
                @keydown.enter="login"
                aria-label="https://relay.amnesia.software"
                v-model="relay"
                name="relay"
                type="text"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="https://relay.amnesia.software"
              />
            </div>
            <div class="-mt-px relative h-auto">
              <div
                v-if="uuid.length < 1"
                class="absolute right-0 top-0 text-xs z-50 h-full flex"
              >
                <span
                  @click="generate"
                  class="px-2 bg-gray-100 rounded text-gray-800 p-1 my-auto mr-2 cursor-pointer hover:opacity-75"
                >
                  Generate
                </span>
              </div>
              <div
                v-if="uuidValid"
                class="absolute right-0 top-0 text-xs z-50 h-full flex"
              >
                <span
                  @click="generate"
                  class="px-2 bg-gray-100 rounded text-gray-800 p-1 my-auto mr-2 cursor-pointer hover:opacity-75"
                >
                  Scramble
                </span>
              </div>
              <input
                @keydown.enter="login"
                aria-label="UUID"
                v-model="uuid"
                name="uuid"
                type="text"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="15335e98-eb74-4d14-b7c1-de844c4d3434"
              />
            </div>
          </div>
          <div
            class="mt-6"
            :style="
              validCreds ? 'opacity: 1' : 'opacity: 0.4;  pointer-events: none'
            "
          >
            <button
              @click="login"
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:border-blue-600 focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
            >
              <span class="absolute left-0 inset-y pl-3">
                <svg
                  class="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition ease-in-out duration-150"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      relay: "",
      uuid: "",
      welcomeString: "",
      defaults: {
        login: "Fill our your connection details to begin.",
        error: "There was an error signing in to your account."
      },
      autoLogin: false,
      countdown: 0,
      hook: null
    };
  },
  computed: {
    uuidValid: function() {
      return this.uuid.length === 36;
    },
    validCreds: function() {
      return this.uuid.length === 36 && this.relay.length > 8;
    },
    autoString: function() {
      if (this.autoLogin) {
        return `Connecting automatically, wait ${Math.round(this.countdown, 2) +
          1}...`;
      } else if (this.error == "") {
        return this.defaults.login;
      } else {
        return this.defaults.error;
      }
    },
    error: function() {
      let x = this.$store.getters.socket;
      return x.authError;
    }
  },
  mounted() {
    this.$store.commit("log", "App mounted");
    let initSettings = this.$store.getters.getSettings;

    let s = this.$store.getters.getSettings;

    if (s.security.doNotRemember.value == false) {
      this.relay = s.account.relay.value;
      this.uuid = s.account.uuid.value;
      if (s.account.relay.value !== "" && s.account.uuid.value !== "") {
        this.relay = s.account.relay.value;
        this.uuid = s.account.uuid.value;
        this.autoLogin = true;
        this.countdown = s.security.loginTimeout.value;

        this.hook = setInterval(() => {
          if (this.countdown > 0.01) {
            this.countdown = this.countdown - 0.1;
          } else {
            this.login();
          }
        }, 100);
      }
    }
  },

  methods: {
    generate() {
      function uuidv4() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
          c
        ) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      }
      this.uuid = uuidv4();
    },
    setDefault() {
      this.relay = "https://relay.amnesia.software";
    },
    login() {
      if (!this.validCreds) return;
      clearInterval(this.hook);
      this.autoLogin = false;
      this.$store.commit("socketAuth", {
        relay: this.relay,
        uuid: this.uuid
      });
    }
  }
};
</script>
