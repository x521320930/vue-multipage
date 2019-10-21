import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import global from '@/store/global'
import app from './module/app'
import tagsView from './module/tagsView'
import permission from './module/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    global,
    app,
    permission,
    tagsView
  },
  getters
})

export default store
