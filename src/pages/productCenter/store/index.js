import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import global from '@/store/global'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    global
  },
  getters
})

export default store
