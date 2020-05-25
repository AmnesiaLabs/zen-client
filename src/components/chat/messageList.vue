<template>
  <div v-if="tm.length > 0">
    <section
      ref="chatWindow"
      class="overflow-y-scroll absolute w-full right-0 bg-gray-200 flex flex-col p-4 pt-24 pb-24"
      style="height: 100%; z-index: 8888;"
    >
      <div
        @contextmenu="handler($event)"
        class="msg relative mb-4"
        v-for="(msg, m) in tm"
        :key="'msg--' + m"
      >
        <div
          :class="
            msg.is_from_me
              ? 'bubble bubble-me float-right bg-blue-500 text-white p-3 rounded-lg'
              : 'bubble bubble-them float-left bg-gray-300 text-black p-3 rounded-lg'
          "
        >
          <aside
            class="msg-meta absolute text-xs text-black select-none rounded"
            :style="
              msg.is_from_me
                ? 'top: -24px; right: 0px;'
                : 'top: -24px; left: 0px'
            "
          ></aside>
          {{ msg.text }}
        </div>
      </div>
    </section>
    <bottomBar v-if="tm.length > 0" />
  </div>
</template>

<script>
import bottomBar from "@/components/chat/bottomBar";
export default {
  name: "messageList",
  props: {
    stage: Array
  },
  components: {
    bottomBar
  },
  computed: {
    targetWatch() {
      return this.$store.getters.targetMessages;
    },
    tm() {
      return this.$store.getters.targetMessages
        ? this.$store.getters.targetMessages
        : [];
    }
  },
  watch: {
    targetWatch: {
      handler: function() {
        setTimeout(() => {
          this.scrollToBottom();
        }, 2);
      }
    }
  },
  mounted() {
    this.scrollToBottom();
  },
  methods: {
    handler: function(e) {
      //do stuff
      e.preventDefault();
    },
    scrollToBottom: function(e) {
      if (!this.$refs.chatWindow) return;
      this.$refs.chatWindow.scrollTop = this.$refs.chatWindow.scrollHeight;
    }
  }
};
</script>

<style scoped>
.bubble:hover > aside.msg-meta {
  opacity: 0.5 !important;
}

aside.msg-meta {
  opacity: 0;
  transition: all 200ms ease;
}

.person-tile {
  transition: all 140ms ease;
}

.msg {
  display: inline-block;
}

.bubble {
  display: inline-block;
  width: auto;
}
</style>
