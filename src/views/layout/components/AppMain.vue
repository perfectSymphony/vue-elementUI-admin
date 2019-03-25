<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
                <router-view />
        </transition>
    </section>
</template>
<script>
export default {
    name: "AppMain",
    
}
</script>
<style scoped>
.app-main {
    /* vh就是当前屏幕可见高度的1%  */
    /* 视区所指为浏览器内部的可视区域大小 */
    /* 即window.innerWidth/window.innerHeight大小，不包含任务栏标题栏以及底部工具栏的浏览器区域大小。 */
    /* 100vh == height:100%; */
    /* 设置app-main元素的高度为当前窗口(浏览器内部高度)高度-50px(50px为顶部导航的高度) */
    min-height: calc(100vh - 50px); 
    position: relative;
    overflow: hidden;
}
</style>

