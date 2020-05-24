<template>
<div>
<!--
    <section class="flex justify-between bg-gray-200 border-b border-gray-300 absolute right-0 px-3 w-full h-auto py-2">
        <p class="select-none text-md my-auto inline-block">{{ handleName }}</p>
        <div class="flex justify-start w-auto">
            <svg @click="attachmentDrawer = !attachmentDrawer" :class="cssAttachmentDrawerButton" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L9.29289 10.7071C9.48043 10.8946 9.73478 11 10 11C10.2652 11 10.5196 10.8946 10.7071 10.7071L12.7071 8.70711C13.0976 8.31658 13.0976 7.68342 12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L11 7.58579L11 3C11 2.44771 10.5523 2 10 2C9.44771 2 9 2.44772 9 3V7.58579L8.70711 7.29289Z" fill="currentColor" />
                <path d="M3 5C3 3.89543 3.89543 3 5 3H6C6.55228 3 7 3.44772 7 4C7 4.55228 6.55228 5 6 5L5 5V12H7L8 14H12L13 12H15V5H14C13.4477 5 13 4.55228 13 4C13 3.44772 13.4477 3 14 3H15C16.1046 3 17 3.89543 17 5V15C17 16.1046 16.1046 17 15 17H5C3.89543 17 3 16.1046 3 15V5Z" fill="currentColor" />
            </svg>
        </div>
    </section>
   
    <transition name="attachmentDrawer" class="overflow-hidden">
        <section v-show="attachmentDrawer" class="flex justify-start overflow-x-scroll bg-gray-200 absolute pr-4 w-1/2 md:w-3/4 h-20" style="top: 5.5rem; z-index: 9999 !important; right: 0px">
            <div v-for="index in 30" :key="index" class="flex-none ml-4 my-auto h-12 w-12 bg-gray-300 rounded"></div>
        </section>
    </transition>
     -->
    <section class="select-none overflow-y-scroll  left-0 bg-gray-200 px-2 py-2 flex flex-col" style="height: calc(100vh - 2.5em); top: 2.5rem">
        <chatNavItem v-for="(t, ta) in $store.getters.contactList" :key="ta" :chat="t" />
    </section>
    <statBar />
  </div>
</div>
</template>

<script>
import chatNavItem from "@/components/chat/chatNavItem";
import statBar from "@/components/window/statBar"

export default {
    name: "chatNav",
    components: {
        chatNavItem,
        statBar
    },
    methods: {
        handler: function (e) {
            e.preventDefault();
        },
        onTarget: function (e) {
            this.$emit("setTarget", e);
        }
    },
    watch: {
        attachmentDrawer: {
            handler: function (x, y) {
                this.$store.commit("setLoading", true);
                setTimeout(() => {
                    this.$store.commit("setLoading", false);
                }, 500);
            }
        },
    },
    computed: {
        handleName() {
            return this.$store.getters.getTargetIdentifier
        },
        cssAttachmentDrawerButton() {
            let c;
            if (this.attachmentDrawer) {
                c = `bg-blue-300 text-blue-700`;
            } else {
                c = `bg-gray-300 text-gray-600`;
            }
            return `${c} w-8 h-8 my-auto rounded p-2 hover:opacity-75 cursor-pointer fill-current`;
        }
    },

    data() {
        return {
            attachmentDrawer: false
        };
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

.attachmentDrawer-enter-active,
.attachmentDrawer-leave-active {
    transform: translateY(-0.001px);
    opacity: 1;
    transition: all 190ms ease;
}

.attachmentDrawer-enter,
.attachmentDrawer-leave-to

/* .fade-leave-active below version 2.1.8 */
    {
    transform: translateY(-4em);
    opacity: 0;
}
</style>
