<template>
  <div v-if="!item.hidden" class="menu-wrapper">
      <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
        <app-link :to = "resolvePath(onlyOneChild.path)">
          <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
            <item :meta="Object.assign({},item.meta,onlyOneChild.meta)"/>

          </el-menu-item>          
        </app-link>
      </template>
      <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)">
        <template slot="title">
            <item :meta = "item.meta" />
        </template>
        <sidebar-item 
          v-if="child in item.children"
          :is-nest="true"
          :item="child"
          :key="child.path"
          base-path="resolvePath(child.path)"
          class="nest-menu"
        />
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
          console.log(item)
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

