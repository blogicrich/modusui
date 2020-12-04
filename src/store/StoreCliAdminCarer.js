import apiLib from '../services/apiLib.js'

export const moduleCliAdminCarer = {
  state: {
    carers: null,
    loading: false,
    error: null
  },
  mutations: {
    SET_CARERS (state, carers) {
      state.carers = carers
    },
    SET_CARER_LOAD_STATE (state, loading) {
      state.loading = loading
    },
    SET_CARER_ERROR_STATE (state, error) {
      state.error = error
    }
  },
  actions: {
    async fetchCarers ({ commit }) {
      try {
        commit('SET_CARER_LOAD_STATE', true)
        commit('SET_CARER_ERROR_STATE', null)
        commit('SET_CARERS', await apiLib.getData('/cliadmin/carer'))
      } catch (err) {
        commit('SET_CARER_ERROR_STATE', err)
      } finally {
        commit('SET_CARER_LOAD_STATE', false)
      }
    }
  }
}
