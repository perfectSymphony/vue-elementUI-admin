<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script>
import pathToRegexp from 'path-to-regexp'

export default {
    data(){
      return {
        //在别处拿到levelList通过`this.levelList`
        levelList: null
      }
    },
    watch: {
      //监听$route的变化
      //是vue的响应式属性，和在data中写的属性本质上一样，可以通过this的方式拿到
      //watch中监听的对象默认回调函数中的参数值就是newVal和oldVal
      $route(){
        this.getBreadcrumb()
      }
    },
    //created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
    //mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作
    created(){
      this.getBreadcrumb()
    },
    methods: {
      getBreadcrumb(){
        //this.$router实际上就是全局路由对象 任何页面都可以调用push()、go()等方法
        //this.$route表示当前正在用于跳转的路由对象，可以调用其name、path、query、params等
        //filter是默认会传入当前的item，而且filter的第一个参数默认就是当前的item
        let matched = this.$route.matched.filter(item => item.name)
        //console.log(matched)
        //console.log(this.$router)
        const first = matched[0]
        if(first && first.name !== 'dashboard'){
          matched = [{
            path: '/dashboard',
            meta: {
              title: 'Dashboard'
            }
          }].concat(matched)
        }
        this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      },
      pathCompile(path){
        const { params } = this.$route
        var toPath = pathToRegexp.compile(path)
        return toPath(params)
      },
      handleLink(item){
        const { redirect, path } = item
        if(redirect){
          this.$router.push(redirect)
          return
        }
        //$route为当前route跳转对象里面可以获取name、path、query、params
        //$router为VueRouter实例，想要导航到不同的URL，则使用$router.push方法
        this.$router.push(this.pathCompile(path))
      }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>



