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
// 该工具库用来处理 url 中地址与参数
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
        // console.log(matched[0])
        const first = matched[0]
        console.log(this.isDashboard(first))
        if(!this.isDashboard(first)){
          matched = [{
            path: '',
            meta: {
              title: 'dashboard'
            }
          }].concat(matched)
        }
        this.levelList = matched
      },
      isDashboard(route) {
        const name = route && route.name
        if (!name) {
          return false
        }
        return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
      },
      pathCompile(path){
        const { params } = this.$route
        // 快速填充 url 字符串的参数值
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
        console.log(this.pathCompile(path))
      }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  //.app-breadcrumb .el-breadcrumb //中间有空格隔开，表示后代选择器，选择的是.el-breadcrumb内的.el-breadcrumb
  //.app-breadcrumb.el-breadcrumb  //则是在一个元素上，这个元素包括这两个类才会有效果。
  // 在less/scss中的写法：如下面写法所示，<上面是普通的css的写法>

  .app-breadcrumb.el-breadcrumb {
    &.el-breadcrumb {
      display: inline-block;
      font-size: 14px;
      line-height: 50px;
      margin-left: 10px;
      .no-redirect {
        color: #97a8be;
      }      
    }
  }
</style>



