<template>
  <div
    class="absolute left-0 w-full"
    style="height: calc(100% - 2.5rem); top: 2.5em"
  >
    <rs-panes
      class="w-full h-full"
      :size="$store.getters.dashboardPaneSize"
      :step="1"
      :split-to="$store.getters.dashboardPaneLayout"
      :allow-resize="true"
      :min-size="120"
      :resizerColor="'rgba(0,0,0,0)'"
      :resizerBorderThickness="10"
      :resizerBorderColor="'rgba(0,0,0,0)'"
      v-on:update:size="paneSize"
    >
      <chatNav style="width: 100%;" slot="firstPane" />
      <messageList slot="secondPane" />
    </rs-panes>
  </div>
</template>

<script>
import chatNav from "@/components/chat/chatNav";
import messageList from "@/components/chat/messageList";
import bottomBar from "@/components/chat/bottomBar";

export default {
  name: "Dashboard",

  components: {
    chatNav,
    messageList,
    bottomBar
  },

  data() {
    return {
      targetId: 0
    };
  },

  created() {
    this.$store.commit("setLoading", true);
  },

  mounted() {
    this.$store.commit("socketAuth", {
      relay: this.$store.getters.getSettings.account.relay.value,
      uuid: this.$store.getters.getSettings.account.uuid.value
    });
    setTimeout(() => {
      this.$store.commit("setLoading", false);
    }, 500);
  },

  methods: {
    setTarget(e) {
      this.targetId = e;
    },
    paneSize(e) {
      this.$store.commit("dashboardPaneSize", e);
    },
    toggleDark() {
      this.$store.commit("setLoading", true);
      this.$store.commit("toggleDark");
      setTimeout(() => {
        this.$store.commit("setLoading", false);
      }, 500);
    }
  }
};
</script>
