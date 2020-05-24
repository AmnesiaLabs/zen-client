<template>
  <header
    class="drag select-none w-full h-10 z-0"
    style="z-index: 9999999999 !important"
  >
    <loadingIndicator />
    <statBar />
    <div :class="cssTopBar" style="z-index: 9999999999 !important">
      <div
        @click="openMenu"
        class="flex justify-start no-drag h-10 w-auto inline-block"
      >
        <div @contextmenu="handler($event)" :class="cssMenu">
          <div :class="cssTopBarBrand">
            <img
              class="w-4 h-4 mx-auto"
              :src="require('@/assets/zen-icon.png')"
            />
          </div>
          <transition name="fade">
            <div
              @mouseover="clearPending"
              @mouseleave="pendingClose"
              style="z-index: 9999999; top: 2.44rem"
              v-if="menu"
              class="absolute left-0 w-48 shadow-lg"
            >
              <div class="bg-gray-900 rounded-b">
                <router-link
                  :to="'/'"
                  class="block p-4 text-xs text-gray-200 hover:bg-gray-700 cursor-default"
                  >Messages</router-link
                >
                <router-link tag="div" :to="'/network'" :class="cssConnection">
                  <p :class="cssConnectionText">
                    {{
                      $store.getters.socketConnected
                        ? "Network"
                        : "Disconnected"
                    }}
                  </p>
                  <svg
                    :class="cssConnectionIcon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </router-link>
                <router-link
                  :to="'/settings'"
                  class="block p-4 text-xs text-gray-200 hover:bg-gray-700 cursor-default"
                  >Preferences</router-link
                >
                <div
                  @click="$store.dispatch('forceQuit')"
                  class="block p-4 text-xs text-gray-200 hover:bg-gray-700 rounded-b cursor-default"
                >
                  Force Quit
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="no-drag content-right flex justify-start h-10 w-24 relative">
        <div
          title="Minimize"
          @click="$store.dispatch('minimizeWindow')"
          class="text-gray-200 my-auto p-1 hover:text-red-300 hover:bg-red-900 w-full h-10 flex"
        >
          <svg
            class="inline-block w-3 h-3 m-auto opacity-50 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 172 172"
          >
            <g
              fill="none"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style="mix-blend-mode: normal"
            >
              <path d="M0,172v-172h172v172z" fill="none"></path>
              <g id="original-icon" fill="currentColor">
                <path
                  d="M151.3786,0.0646c-2.70569,0.52923 -38.40024,32.09495 -38.40024,32.09495l-14.07061,-13.90264c-1.62077,-1.60754 -3.78028,-2.15093 -5.94351,-1.61508c-2.16323,0.53585 -3.78575,2.13997 -3.78575,4.27674c-4.86892,26.75262 -2.70042,58.32464 -2.70042,59.39633c0,1.07169 0.53016,2.13263 1.61508,3.20433c0.54246,1.07169 2.17109,1.60217 3.25601,1.60217c1.08492,0.53585 32.98575,2.69019 60.02944,-2.66166c2.16323,-0.53585 3.78596,-2.15269 4.32843,-3.74699c0.54246,-2.14338 0.00569,-4.27137 -1.61508,-5.87891l-14.07061,-13.91557c0,0 31.3716,-35.85683 31.91406,-38.52945c0.54246,-3.74431 -2.15971,-9.62859 -6.48617,-13.3729c-3.79062,-4.28015 -10.28662,-7.48717 -14.07062,-6.95132zM60.37831,86c-11.49258,0.06615 -26.23506,0.86434 -39.75691,3.54026c-2.16323,0.53585 -3.78596,2.14659 -4.32843,4.27675c-0.54246,1.60754 -0.00569,3.74162 1.61508,5.34915l14.07061,13.91557c0,0 -31.3716,35.85683 -31.91406,38.52945c-0.54246,3.74431 2.15972,9.62859 6.48618,13.37289c3.79062,4.28015 10.28661,7.48717 14.07061,6.95132c2.70569,-0.52923 38.40024,-32.09495 38.40024,-32.09495l14.07061,13.90264c1.62077,1.60754 3.78028,2.15093 5.94351,1.61509c1.62077,-0.53585 3.24329,-2.13997 3.78575,-4.27674c4.86892,-26.75262 2.70042,-58.32464 2.70042,-59.39634c0,-1.07169 -0.53016,-2.13263 -1.61508,-3.20433c-0.54246,-1.07169 -2.17109,-1.60217 -3.25601,-1.60217c-0.54246,-0.26792 -8.77996,-0.94476 -20.27253,-0.8786z"
                ></path>
              </g>
            </g>
          </svg>
        </div>
        <!--  <div @click="sendHide" class="cursor-pointer my-auto p-1 hover:bg-red-900 text-red-500 w-10 h-10 flex">
                    <svg class="fill-current w-5 h-5 m-auto" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L8.58579 10L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L10 11.4142L11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.4142 10L12.7071 8.70711C13.0976 8.31658 13.0976 7.68342 12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L10 8.58579L8.70711 7.29289Z" fill="currentColor" />
                    </svg>
                </div> -->
      </div>
    </div>
  </header>
</template>
<script>
import loadingIndicator from "@/components/window/loadingIndicator";
const ipc = require("electron").ipcRenderer;
import statBar from "@/components/window/statBar";

export default {
  name: "topBar",
  components: {
    loadingIndicator,
    statBar
  },
  data() {
    return {
      menu: false,
      wait: null
    };
  },
  methods: {
    handler: function(e) {
      if (this.$store.getters.socketAuth) {
        this.$router.push("/");
      }
      e.preventDefault();
    },
    clearPending() {
      if (this.wait !== null) {
        clearTimeout(this.wait);
      }
    },
    openMenu() {
      if (!this.$store.getters.socketAuth) return;
      this.menu = !this.menu;

      if (this.menu == true) {
        this.wait = null;
      }
    },
    pendingClose() {
      this.wait = setTimeout(this.closeMenu, 1000);
    },
    closeMenu() {
      this.wait = null;
      this.menu = false;
    }
  },
  computed: {
    cssMenu() {
      if (
        this.$store.getters.socketConnected &&
        this.$store.getters.socketAuth
      ) {
        return "group relative flex border-b-2 border-green-500";
      } else {
        return "group relative flex border-b-2 border-red-500";
      }
    },
    cssConnection() {
      if (
        this.$store.getters.socketConnected &&
        this.$store.getters.socketAuth
      ) {
        return "hover:bg-gray-700 block flex justify-between p-4 text-xs bg-gray-900 cursor-default";
      } else {
        return "block flex justify-between p-4 text-xs bg-gray-900 cursor-default";
      }
    },
    cssConnectionText() {
      if (
        this.$store.getters.socketConnected &&
        this.$store.getters.socketAuth
      ) {
        return "my-auto text-gray-300";
      } else {
        return "my-auto text-red-400";
      }
    },
    cssConnectionIcon() {
      if (
        this.$store.getters.socketConnected &&
        this.$store.getters.socketAuth
      ) {
        return "my-auto w-5 h-5 text-green-300 p-1 rounded bg-opacque-white fill-current";
      } else {
        return "my-auto w-5 h-5 text-red-400 p-1 rounded bg-opacque-white fill-current";
      }
    },
    cssTopBar() {
      if (this.$store.getters.isDark) {
        return "mx-auto bg-gray-900 w-full h-10 flex justify-between border-b border-gray-600";
      } else {
        return "mx-auto bg-gray-900 w-full h-10 flex justify-between border-b border-gray-800";
      }
    },
    cssTopBarBrand() {
      let c = "w-48 h-10 my-auto flex p-3";
      if (this.$store.getters.isDark) {
        return `${c} bg-gray-800 hover:bg-gray-700`;
      } else {
        if (this.menu) {
          return `${c} bg-gray-800`;
        } else {
          if (!this.$store.getters.socketAuth) {
            return `${c} `;
          } else {
            return `${c} hover:bg-gray-700`;
          }
        }
      }
    }
  }
};
</script>
<style scoped>
.router-link-exact-active {
  background: #1c64f2 !important;
}

.bg-opacque-white {
  background: rgba(255, 255, 255, 0.1);
}

.bg-opacque-black {
  background: rgba(0, 0, 0, 0.1);
}

.fade-enter-active,
.fade-leave-active {
  transform: translateY(0.01px);
  transition: all 150ms ease-in-out;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
