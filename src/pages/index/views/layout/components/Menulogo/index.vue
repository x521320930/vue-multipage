<template>
  <div class="scrollbar-wrapper-menu-logo">
    <img class="scrollbar-wrapper-menu-logo-icon" :class="{'is-active': collapse}" :src="menu_logo"/>
    <span class="scrollbar-wrapper-menu-logo-title"></span>
  </div>
</template>
<script>
export default {
  name: 'menuLogo',
  props: {
    collapse: Boolean
  },
  data () {
    return {
      menu_logo: ''
    }
  }
}
</script>

<style lang="scss">
  @import 'src/styles/variables.scss';
  // menu-logo
  .scrollbar-wrapper-menu-logo {
    cursor: default;
    height: 60px;
    line-height: 60px;
    vertical-align: top;
    color: #ffffff;
    &-icon {
      height: 33px;
      width: 33px;
      display: inline-block;
      vertical-align: middle;
      margin-left: 20px;
      transition: margin-left .3s;
      margin-right: 10px;
      &.is-active {
        margin-left: 9px;
      }
    }
    &-title {
      font-weight: 500;
      font-size: 18px;
      display: inline-block;
      vertical-align: middle;
    }
  }
</style>
