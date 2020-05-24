<template>
  <div
    @click="targetSend(chat)"
    :class="
      chat.id == $store.getters.targetId
        ? 'person-tile border border-blue-500 hover:shadow-outline cursor-pointer flex flex-col w-full font-medium pt-4 p-3 mt-2 rounded-md shadow-outline'
        : 'person-tile border border-transparent hover:bg-gray-300 cursor-pointer flex flex-col w-full font-medium pt-4 p-3 mt-2 rounded-md'
    "
  >
    <div class="px-3 flex justify-between w-full">
      <span class="truncate my-auto">{{ identifier }}</span>
      <span class="my-auto text-xs opacity-50">{{ lastMessageTime }}</span>
    </div>
    <div class="px-3 mt-1 flex justify-start">
      <div
        v-if="chat.is_unread"
        class="h-3 w-3 my-auto mr-2 bg-blue-400 rounded-full"
      ></div>
      <span class="truncate w-full text-sm font-normal text-gray-700">
        <span
          :class="lastMessage == 'No Preview' ? 'opacity-25' : 'opacity-100'"
          >{{ lastMessage }}</span
        >
      </span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "s",
    ss: "%ss",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "30d+",
    MM: "%dM",
    y: "1y",
    yy: "%dY"
  }
});

export default {
  name: "recentChatsListItem",
  methods: {
    targetSend(p) {
      this.$store.commit("setLoading", true);

      this.$store.commit("targetId", p);

      setTimeout(() => {
        this.$store.commit("setLoading", false);
      }, 500);
    }
  },
  computed: {
    lastMessage() {
      if (
        this.$store.getters.getPreviews.filter(x => x.id == this.identifier)
          .length == 0
      ) {
        return "No Preview";
      } else {
        return this.$store.getters.getPreviews.filter(
          x => x.id == this.identifier
        )[0].text;
      }
    },
    lastMessageTime() {
      if (
        this.$store.getters.getPreviews.filter(x => x.id == this.identifier)
          .length == 0
      ) {
        return "";
      } else {
        return moment(
          this.$store.getters.getPreviews.filter(
            x => x.id == this.identifier
          )[0].date
        ).fromNow();
      }
    },
    identifier() {
      if (this.chat.displayName) return this.chat.displayName;
      if (this.chat.recipientId) return this.chat.recipientId;
      return this.chat.id;
    }
  },
  props: {
    chat: Object
  }
};
</script>

<style>
.person-tile {
  transition: all 140ms ease;
}

::-webkit-scrollbar {
  width: 1px;
  /* Remove scrollbar space */
  background: rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  /* Optional: just make scrollbar invisible */
}

::-webkit-scrollbar-thumb {
  width: 1px;
  background: rgba(24, 24, 24, 0.1);
}
</style>
