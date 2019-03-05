<template>
<el-breadcrumb class="app-breadcrumb" separator="/">
  <transition-group name="breadcrumb">
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  </transition-group>
</el-breadcrumb>   
</template>
<script>
import pathToRegexp from 'path-to-regexp'

export default {
    data(){
      return {
        levelList: null
      }
    },
    watch: {
      $route(){
        this.getBreadcrumb()
      }
    },
    created(){
      this.getBreadcrumb()
    },
    methods: {
      getBreadcrumb(){
        
      }
    }
}
</script>
<style rel="stylesheet/scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
  }
</style>



