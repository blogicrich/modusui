import apiLib from '../services/apiLib.js'

export const moduleTitles = {
  state: {
    titlesLoading: true,
    titles: []
  },
  mutations: {
    SET_TITLES (state, data) {
      state.titles = data
    },
    SET_TITLES_LOAD_STATUS (state, data) {
      state.sysAdminsLoading = data
    }
  },
  actions: {
    fetchTitles (context) {
      context.commit('SET_TITLES_LOAD_STATUS', true)
      return apiLib.getData('sysadmin/title').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_TITLES', [])
        } else {
          context.commit('SET_TITLES', response)
          context.commit('SET_TITLES_LOAD_STATUS', false)
        }
      })
    }
  }
}
