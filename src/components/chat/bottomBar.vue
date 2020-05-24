<template>
  <div
    class="flex justify-between w-full absolute bottom-0 right-0 h-16"
    style="z-index: 99999999"
  >
    <!-- <ResizableTextArea class="absolute bottom-0 right-0 px-4 w-full">
    //     <textarea @click="$emit('userClicked', true)" class="outline-none bg-gray-200 text-gray-800 font-book border-t border-gray-300" style="padding-top: 10px; padding-left: 15px; padding-bottom: 10px; border: none"></textarea>
    // </ResizableTextArea> -->
  </div>
</template>

<script>
export default {
  name: "bottomBar",

  data() {
    return {};
  }
};
</script>

<style>
.outline-none {
  outline: none !important;
}
</style>
