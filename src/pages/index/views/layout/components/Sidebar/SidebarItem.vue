<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <el-menu-item
      v-if="!item.children"
      :index="item.name"
      :class="{'submenu-title-noDropdown':!isNest}">
      <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
      <span v-if="item.meta&&item.meta.title" slot="title">{{generateTitle(item.meta.title)}}</span>
    </el-menu-item>
    <el-menu-item
      v-else-if="hasOneShowingChild(item.children) && !onlyOneChild.children&&!item.alwaysShow"
      :index="item.name"
      :class="{'submenu-title-noDropdown':!isNest}">
      <svg-icon v-if="onlyOneChild.meta&&onlyOneChild.meta.icon" :icon-class="onlyOneChild.meta.icon"></svg-icon>
      <span v-if="onlyOneChild.meta&&onlyOneChild.meta.title" slot="title">{{generateTitle(onlyOneChild.meta.title)}}</span>
    </el-menu-item>
    <el-submenu v-else :index="item.name||item.path">
      <template slot="title">
        <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
        <span v-if="item.meta&&item.meta.title" slot="title">{{generateTitle(item.meta.title)}}</span>
      </template>
      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          :is-nest="true"
          class="nest-menu"
          v-if="child.children&&child.children.length>0"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)">
        </sidebar-item>
        <el-menu-item v-else :key="child.name" :index="child.name">
          <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
          <span v-if="child.meta&&child.meta.title" slot="title">{{generateTitle(child.meta.title)}}</span>
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'

export default {
  name: 'SidebarItem',
  props: {
    // route object
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
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild(children) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // temp set(will be used if only has one showing child )
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    resolvePath(...paths) {
      console.log(...paths)
      return path.resolve(this.basePath, ...paths)
    },
    generateTitle (title) {
      return title
    }
  }
}
</script>

