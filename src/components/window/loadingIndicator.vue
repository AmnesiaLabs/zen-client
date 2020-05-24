<template>
    <vue-progress-bar />
</template>
<script>
export default {
    name: 'loadingIndicator',
    data() {
        return {
            timeFunc: null,
            timeoutSeconds: 5,
        }
    },
    methods: {
        timeout() {
            if (this.$store.getters.getLoading == true) {
                this.$Progress.fail()
            }
        }
    },
    watch: {
        '$store.getters.getLoading': {
            handler: function(x, y) {
                let timefunc;
                if (this.$store.getters.getLoading) {
                    this.$Progress.start()
                    this.timefunc = setTimeout(this.timeout, 1000 * this.timeoutSeconds)
                } else {
                    clearTimeout(this.timefunc)
                    if (this.$store.getters.socket.authError == '') {
                        this.$Progress.finish()
                    } else {
                        this.$Progress.fail()
                    }
                }
            }
        },

    }
}
</script>