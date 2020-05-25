<template>
  <div
    class="flex justify-between w-full absolute bottom-0 right-0 h-16 overflow-hidden border-t border-gray-300"
    style="z-index: 9999 !important; background: rgb(225, 226, 232)"
  >
    <div class="absolute bottom-0 right-0 px-4 w-full">
      <textarea
        @keydown.enter="enter"
        v-model="msg"
        class="w-full outline-none h-auto bg-transparent text-gray-800 font-book"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "bottomBar",
  methods: {
    enter(e) {
      e.preventDefault();
      this.$store.commit("sendMessage", {
        text: this.msg,
        handle_id: this.$store.getters.getTargetHandle
      });
      console.log(this.msg);
      this.msg = "";
    }
  },
  data() {
    return {
      msg: ""
    };
  }
};
</script>

<style>
.outline-none {
  outline: none !important;
}
</style>
