<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <menu-logo :collapse="isCollapse"></menu-logo>
    <!-- background-color="rgba(36, 68, 142, 1)" -->
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="defaultActive"
      :collapse="isCollapse"
      text-color="#bfcbd9"
      @select="handleMenuSelect"
      active-text-color="#FFFFFF">
      <sidebar-item 
        v-for="route in permission_routers"
        :key="route.name"
        :item="route"
        :base-path="route.path">
      </sidebar-item>
    </el-menu>
    <div class="hamburger" @click="toggleSideBar">
      <i :class="{ 'el-icon-caret-right': isCollapse }" class="el-icon-caret-left"></i>
    </div>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import menuLogo from '../Menulogo'
import { constantRouterMap } from '../../../../router/index.js'
import { getNode } from '@/utils/tools.js'
export default {
  components: { menuLogo, SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  data () {
    return {
      defaultActive: '我的工作'
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    },
    handleMenuSelect (index, indexPath) {
      console.log(index, indexPath)
      if (this.defaultActive == index) return
      this.defaultActive = index
      const { node } = getNode(constantRouterMap, index)
      this.$store.commit('SET_IFRAMEURL', node.meta.iframeUrl)
      // 当前菜单
      this.$store.dispatch('addVisitedViews', indexPath)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

