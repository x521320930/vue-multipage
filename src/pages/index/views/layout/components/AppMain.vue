<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <iframe v-if="iframeUrl" class="iframe" :src="iframeUrl"></iframe>
      <router-view v-else></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    iframeUrl () {
      return this.$store.state.tagsView.iframeUrl
    }
  }
}
</script>

