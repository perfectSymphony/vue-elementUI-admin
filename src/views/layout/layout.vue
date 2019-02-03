
<template>
<div class="app-wrapper">
    <div class="main-container">
        <navbar/>
    </div>
</div>
</template>
<script>
import { Navbar } from './components'

export default {
    name: 'Layout',
    components: {
        Navbar
    },
    computed: {
        
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
// @import "src/styles/mixin.scss";
// .app-wrapper {
//     @include clearfix;
//     position: relative;
//     height: 100%;
//     width: 100%;
// }

// .drawer-bg {
//     background: #000;
//     opacity: 0.3;
//     width: 100%;
//     top: 0;
//     height: 100%;
//     position: absolute;
//     z-index: 999;
// }
</style>


