<template>
  <el-menu class="navbar" mode="horizontal">
    <span class="breadcrumb-dir"></span>
    <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,i)  in levelList" :key="i">
          <span class="no-redirect">{{item}}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
    <div class="right-menu">
      <div class="right-menu-item">
        <span class="right-menu-item-text">坐席: 001</span>
      </div>
       <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img class="right-menu-item-img" src="../home/home_menu_administrator.svg"/> -->
          <span class="right-menu-item-text">大管理员</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            修改密码
          </el-dropdown-item>
          <el-dropdown-item>
            退出登录
          </el-dropdown-item>  
        </el-dropdown-menu>  
      </el-dropdown>
      <div class="right-menu-item">
        <img class="right-menu-item-img" src="../home/home_menu_search.svg" title="快速查询"/>
      </div>
      <div class="right-menu-item">
        <img class="right-menu-item-img" src="../home/home_menu_remind.svg" title="闹钟提醒"/>
      </div>
      <div class="right-menu-item">
        <img class="right-menu-item-img" src="../home/home_menu_download.svg" title="下载中心"/>
      </div>
      <div class="right-menu-item">
        <el-badge is-dot class="right-menu-item-badge">
          <img class="right-menu-item-img" src="../home/home_menu_message.svg" title="消息中心"/>
        </el-badge>
      </div>
    </div>
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Hamburger from './Hamburger'
  export default {
    created () {
    },
    components: {
      Hamburger
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      levelList () {
        const visitedViews = this.$store.state.tagsView.visitedViews
        return [].concat(visitedViews)
      }
    },
    methods: {
      toggleSideBar () {
        this.$store.dispatch('toggleSideBar')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
@import '~@/styles/variables.scss';
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  background-color: #FFFFFF;
  .breadcrumb-dir {
    display: inline-block;
    height: 16px;
    width: 4px;
    background-color: #354F8A;
    margin-left: 12px;
    vertical-align: top;
    margin-top: 17px;
  }
  .app-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .el-icon-arrow-right {
      color: #354F8A;
    }
    .no-redirect {
      color: #354F8A;
      cursor: default;
    }
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    margin-right: 20px;
    display: flex;
    align-items: center;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: flex;
      margin: 0 8px;
      &-text {
        font-size: $layout-common-font-size-12;
        color: $layout-common-303133;
        margin-left: 5px;
      }
      &-img {
        cursor: pointer;
      }
      &-badge {
        display: flex;
      }
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        display: flex;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -13px;
          top: 19px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
