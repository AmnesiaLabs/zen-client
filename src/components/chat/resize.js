export default {
    methods: {
        resizeTextarea(event) {
            event.target.style.height = 'auto'
            event.target.style.height = (event.target.scrollHeight) + 'px'
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.$el.setAttribute('style', 'height:' + (this.$el.scrollHeight) + 'px;overflow-y:hidden;padding-top: 10px;padding-left:15px; padding-bottom: 10px')
        })

        this.$el.addEventListener('input', this.resizeTextarea)
    },
    beforeDestroy() {
        this.$el.removeEventListener('input', this.resizeTextarea)
    },
    render() {
        return this.$slots.default[0]
    },
}