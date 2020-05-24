<template>
<div class="select-none absolute overflow-y-scroll left-0 w-full bg-gray-200" style="top: 2.5rem; height: calc(100% - 2.5rem)">
    <div class="flex justify-between h-22 w-full pr-6 pb-2 bg-gray-100">
        <div class="py-5 px-6">
            <h3 class="leading-6 font-medium text-gray-900">
                Preferences
            </h3>
            <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                Change certain options and behaviors
            </p>
        </div>
        <button @click="save" class="inline-block h-10 rounded-md border border-transparent px-4 bg-blue-600 text-base my-auto leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
            Save
        </button>
    </div>
    <div class="h-16 bg-gray-100 w-full">
        <div class="pl-6 flex items-baseline ">
            <div @click="pane = 0" :class="pane == 0 ? `${style.tabs.enabled}` : `${style.tabs.disabled}`">Core</div>
            <div @click="pane = 1" :class="pane == 1 ? `${style.tabs.enabled} ml-3` : `${style.tabs.disabled} ml-3`">Console</div>
            <!-- <div @click="pane = 2" :class="pane == 2 ? `${style.tabs.enabled} ml-3` : `${style.tabs.disabled} ml-3`">About</div> -->
        </div>
    </div>
    <div v-if="pane == 0" class="flex flex-col">
        <div class="relative w-full overflow-hidden">
            <div class="w-full overflow-hidden h-full">
                <div v-for="(setting, s) in Object.keys(pending)" :key="`setting-${s}`">
                    <div class="w-full px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        {{ setting }} Options
                    </div>
                    <div class="w-full relative bg-gray-60">
                        <div class="w-full block md:flex justify-between border-b border-gray-200" v-for="(param, p) in pending[setting]">
                            <div class="w-auto px-6 pt-6">
                                <div class="flex">
                                    <div class="w-full relative">
                                        <div class="text-sm leading-5 font-medium text-gray-900">{{ param.name }}</div>
                                        <div class="text-sm leading-5 text-gray-500 w-auto truncate">{{ param.desc }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="px-6 pt-4 mb-6">
                                <div class="">
                                    <div v-if="typeof param.value == 'string'">
                                        <div v-if="p == 'password'">
                                            <div class="h-10 opacity-50 block w-full p-2 sm:text-sm sm:leading-5" v-if="pending.security.doNotRemember.value">
                                                N/A
                                            </div>
                                            <div v-else>
                                                <input :type="p == 'password' ? 'password' : 'text'" v-model="param.value" class="form-input block w-full p-2 sm:text-sm sm:leading-5 h-10" :placeholder="p" />
                                            </div>
                                        </div>
                                        <div v-if="p == 'email'">
                                            <div class="h-10 opacity-50 block w-full p-2 sm:text-sm sm:leading-5" v-if="pending.security.doNotRemember.value">
                                                N/A
                                            </div>
                                            <div v-else>
                                                <input :type="p == 'password' ? 'password' : 'text'" v-model="param.value" class="form-input block w-full p-2 sm:text-sm sm:leading-5 h-10" :placeholder="p" />
                                            </div>
                                        </div>
                                        <div v-if="p !== 'password' && p !== 'email'">
                                            <input :type="p == 'password' ? 'password' : 'text'" v-model="param.value" class="form-input block w-full p-2 sm:text-sm sm:leading-5" :placeholder="p" />
                                        </div>
                                    </div>
                                    <div v-if="typeof param.value == 'number'">
                                        <input v-model="param.value" type="number" min="0" class="form-input block w-full p-2 sm:text-sm sm:leading-5" :placeholder="p" />
                                    </div>
                                    <div v-if="typeof param.value == 'boolean'">
                                        <button @click="param.value = !param.value" :class="param.value ? 'inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5' : 'inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-gray-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray transition ease-in-out duration-150 sm:text-sm sm:leading-5'">
                                            {{ param.value ? 'Enabled' : 'Disabled' }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="pane == 1" class="flex flex-col">
        <div>
            <div class="align-middle inline-block min-w-full overflow-hidden border-b border-gray-200">
                <table class="min-w-full">
                    <thead>
                        <tr>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Live Output
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-gray-200 text-sm">
                        <tr v-for="(c, i) in $store.getters.getConsole">
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div class="flex items-center">
                                    <div>
                                        <div class="font-mono text-gray-400">{{ Date(c.timestamp) | timeAgo }}</div>
                                    </div>
                                    <div class="ml-4">
                                        <div class="leading-5 font-mono text-gray-900">{{ c.line }}</div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'Settings',
    data() {
        return {
            pending: {},
            pane: 0,
            style: {
                tabs: {
                    enabled: 'px-3 py-2 rounded-md text-sm font-medium text-gray-100 bg-gray-700 transition ease-in-out duration-150',
                    disabled: 'cursor-pointer px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-white hover:bg-gray-300 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150'
                }
            }
        }
    },

    filters: {
        timeAgo(o) {
            return moment(o).format('h:mm:ss a');
        }
    },
    methods: {
        save: function () {
            this.$store.commit('doSettingsWrite', this.pending)
        }
    },
    mounted() {
        this.pending = this.$store.getters.getSettings
    }
}
</script>
