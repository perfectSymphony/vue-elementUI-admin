<template>
<!-- sidebarItem接收路由，父路由path，父级索引，然后调用自身 -->
  <div v-if="!item.hidden" class="menu-wrapper">
      <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
        <app-link :to = "resolvePath(onlyOneChild.path)">
          <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
            <item :meta="Object.assign({},item.meta,onlyOneChild.meta)"/>

          </el-menu-item>          
        </app-link>
      </template>
      <!-- 创建菜单分组 -->
      <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)">
        <template slot="title">
            <item :meta = "item.meta" />
        </template>
        <!-- 递归调用自身，直到item不含子节点 -->
        <sidebar-item 
          v-for="child in item.children"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu"/>
      </el-submenu> 
  </div>
</template>
<script>

import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'

export default {
    name: 'SidebarItem',
    components: {
      Item,
      AppLink
    },
    // 组件实例的作用域是孤立的，这意味着不能(也不应该)在子组件的模版中直接引用父组件的数据。父组件的数据需要通过props才能下发到子组件中
    // 也就是props是子组件访问父组件数据的唯一接口
    //props是单向数据绑定
    props: {
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data(){
      this.onlyOneChild = null
      return {}
    },
    methods: {
      hasOneShowingChild(children = [], parent){
        const showingChildren = children.filter(item => {
          if(item.hidden){
            return false
          }else{
            //临时存储（只有一个子节点时）
            this.onlyOneChild = item
            return true
          }
        })
        //当只有一个子路由时，则该子路由为默认路由
        if(showingChildren.length == 1){
          return true
        }
          //没有子路由时，只展示父级路由
        if(showingChildren.length === 0){
          this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
          return true
        }
        return false
      },
      resolvePath(routePath){
        if(isExternal(routePath)){
          return routePath
        }
        return path.resolve(this.basePath, routePath)
      }
    }
    
}
</script>
<style scoped>

</style>

