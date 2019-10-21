const tagsView = {
  state: {
    visitedViews: [],
    iframeUrl: ''
  },
  mutations: {
    ADD_VISITED_VIEWS: (state, view) => {
      state.visitedViews = view
    },
    // iframe ulr
    SET_IFRAMEURL: (state, view) => {
      state.iframeUrl = view
    }
  },
  actions: {
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    }
  }
}

export default tagsView
