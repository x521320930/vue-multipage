<template>
  <div class="app-wrapper" :class="classObj">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <!-- <tags-view></tags-view> -->
      <app-main></app-main>
    </div>
    
  </div>
</template>

<script>
  import { Sidebar, Navbar, AppMain } from './components'
  export default {
    name: 'layout',
    components: {
      Sidebar,
      Navbar,
      AppMain
    },
    mounted () {
      console.log(this.$route)
    },
    computed: {
      sidebar () {
        return this.$store.state.app.sidebar
      },
      device () {
        return this.$store.state.app.device
      },
      classObj () {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened
          // withoutAnimation: this.sidebar.withoutAnimation,
          // mobile: this.device === 'mobile'
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
