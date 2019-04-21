<template>
    <!-- 使用component标签，使用linkProps(to)绑定数据(参数 ‘to’ 中所包含的数据)
    component标签切换组件
     -->
    <component v-bind="linkProps(to)">
        <slot/>
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
            // console.log(url)
            if(isExternal(url)){
                return {
                    is: 'a',
                    href: url,
                    target: '_blank',
                    rel: 'noopener'
                }
            }
            return {
                //<router-link>组件支持用户在具有路由功能的应用中点击导航，
                //通过to属性指定目标地址，默认渲染为带有正确连接的<a>标签，可以通过设置tag属性生成别的标签
                is: 'router-link',
                to: url
            }
        }
    }
}
</script>
<style scoped>

</style>

