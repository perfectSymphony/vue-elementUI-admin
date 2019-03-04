<template>
    <!-- 使用component标签，使用linkProps(to)绑定数据(参数 ‘to’ 中所包含的数据)
    component标签切换组件
     -->
    <component v-bind="linkProps(to)">
        <!-- <slot/> -->
    </component>
</template>
<script>
import { isExternal } from '@/utils/validate'

export default {
    props: {
        to: {
            type: String,
            required: true
        }
    },

    methods: {
        linkProps(url){
            if(isExternal(url)){
                return {
                    is: 'a',
                    href: url,
                    target: '_blank',
                    rel: 'noopener'
                }
            }
            return {
                is: 'router-link',
                to: url
            }
        }
    }
}
</script>
<style scoped>

</style>

