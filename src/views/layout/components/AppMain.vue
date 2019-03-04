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
    /* 设置app-main元素的高度为当前窗口(浏览器内部高度)高度-50px(50px为顶部导航的高度) */
    min-height: calc(100vh - 50px); 
    position: relative;
    overflow: hidden;
}
</style>

