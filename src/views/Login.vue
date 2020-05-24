<template>
<div class="absolute flex justify-between overflow-y-scroll left-0 w-full bg-gray-200" style="top: 2.5rem; height: calc(100% - 2.5rem)">
    <div class="px-4 flex my-auto w-full">
        <div class="max-w-md w-full mx-auto">
            <div>
                <div class="flex justify-start w-full h-7 mb-10">
                    <img class="rounded shadow-outline-blue my-auto h-7 w-7 w-auto" :src="require('@/assets/zen-icon.png')" alt="Workflow" />
                    <h2 class="ml-4 my-auto text-gray-700">Welcome to Zen!</h2>
                </div>
                <p class="mt-2 text-left text-sm leading-5 text-gray-900 max-w">{{ autoString }}</p>
            </div>
            <div class="mt-8">
                <input type="hidden" name="remember" value="true" />
                <div class="rounded-md shadow-sm">
                    <div>
                        <input @keydown.enter="login" aria-label="Email address" v-model="email" name="email" type="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Email address" />
                    </div>
                    <div class="-mt-px">
                        <input @keydown.enter="login" aria-label="Password" v-model="password" name="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Password" />
                    </div>
                </div>
                <div class="mt-6">
                    <button @click="login" type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:border-blue-600 focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                        <span class="absolute left-0 inset-y pl-3">
                            <svg class="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        Sign in
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
            email: "",
            password: "",
            welcomeString: "",
            defaults: {
                login: "Please sign in to your Amnesia Labs account.",
                error: "There was an error signing in to your account."
            },
            autoLogin: false,
            countdown: 0,
            hook: null
        };
    },
    computed: {
        autoString: function () {
            if (this.autoLogin) {
                return `Logging in automatically, wait ${Math.round(this.countdown, 2) +
          1}...`;
            } else if (this.error == "") {
                return this.defaults.login;
            } else {
                return this.defaults.error;
            }
        },
        error: function () {
            let x = this.$store.getters.socket;
            return x.authError;
        }
    },
    mounted() {
        let s = this.$store.getters.getSettings;

        if (s.security == undefined) return;

        if (s.security.doNotRemember.value == false) {
            if (s.account.email.value !== "" && s.account.password.value !== "") {
                this.email = s.account.email.value;
                this.password = s.account.password.value;
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
        login() {
            clearInterval(this.hook);
            this.autoLogin = false;
            if (this.email.length < 3 && this.password.length < 3) return;
            this.$store.commit("socketAuth", {
                email: this.email,
                password: this.password
            });
        }
    }
};
</script>
