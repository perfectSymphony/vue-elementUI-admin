<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>
  </div>    
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Dashboard',
    computed: {
        ...mapGetters([ 
            // 该辅助函数仅仅是将store中的getter映射到局部计算属性
            //使用对象展开运算符将getter混入 computed 对象中 
            'name',
            'roles'
        ])
    }
}
</script>
<style rel = "stylesheet/scss" lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>


