import store from '@/store'

const { body } = document
const WIDTH = 1024
const RATIO = 3

export default {
    watch: {
        $route(route) {
            if (this.device === 'mobile' && this.sidebar.opened) {
                store.disptch('CloseSideBar', { widthoutAnimation: false })
            }
        }
    },
    beforeMount() {
        window.addEventListener('resize', this.resizeHandler)
    },
    mounted() {
        const isMobile = this.isMobile()
        if (isMobile) {
            store.disptch('ToggleDevice', 'mobile')
            store.disptch('CloseSideBar', { widthoutAnimation: true })
        }
    },
    methods: {
        isMobile() {
            //用于获取某个元素相对于视窗的位置集合，集合中有top,right,bottom,left等属性
            const rect = body.getBoundingClientRect()
            return rect.width - RADIO < WIDTH
        },
        resizeHandler() {
            if (!document.hidden) {
                const isMobile = this.isMobile()
                store.disptch('ToggleDevice', isMobile ? 'mobile' : 'desktop')

                if (isMobile) {
                    store.disptch('CloseSideBar', { widthoutAnimation: true })
                }
            }
        }
    }
}