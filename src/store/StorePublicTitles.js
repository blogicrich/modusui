import apiLib from '../services/apiLib.js'

export const modulePublicTitles = {
  state: {
    loading: false,
    error: null,
    titles: []
  },
  mutations: {
    SET_PUBLIC_TITLES (state, titles) {
      state.titles = titles
    },
    SET_PUBLIC_TITLES_LOAD_STATE (state, loading) {
      state.loading = loading
    },
    SET_PUBLIC_TITLES_ERROR_STATE (state, error) {
      state.error = error
    }
  },
  actions: {
    async fetchPublicTitles ({ commit }) {
      try {
        commit('SET_PUBLIC_TITLES_LOAD_STATE', true)
        commit('SET_PUBLIC_TITLES_ERROR_STATE', null)
        commit('SET_PUBLIC_TITLES', await apiLib.getData('/public/title'))
      } catch (err) {
        commit('SET_PUBLIC_TITLES_ERROR_STATE', err)
      } finally {
        commit('SET_PUBLIC_TITLES_LOAD_STATE', false)
      }
    }
  }
}
