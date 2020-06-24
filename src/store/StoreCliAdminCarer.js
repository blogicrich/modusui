import apiLib from '../services/apiLib.js'

export const moduleCliAdminCarer = {
  state: {
    cliAdminCarers: [],
    cliAdminCarersLoading: false,
    cliAdminError: false
  },
  mutations: {
    SET_CLIADMIN_CARERS (state, data) {
      state.cliAdminCarers = data
    },
    SET_CLIADMIN_CARERS_LOAD_STATE (state, data) {
      state.cliAdminCarersLoading = data
    },
    SET_CLIADMIN_CARERS_ERROR (state, data) {
      state.cliAdminError = data
    },
    RESET_CLIADMIN_CARERS_STATE (state) {
      state.cliAdminCarers = []
      state.cliAdminCarersLoading = false
      state.cliAdminError = false
    }
  },
  actions: {
    async fetchCliAdminCarers (context) {
      try {
        context.commit('SET_CLIADMIN_CARERS_LOAD_STATE')
        const response = await apiLib.getData('cliadmin/carer')
        if (Array.isArray(response)) {
          context.commit('SET_CLIADMIN_CARERS', response)
          context.commit('SET_CLIADMIN_CARERS_LOAD_STATE', false)
          context.commit('SET_CLIADMIN_CARERS_ERROR', false)
        } else {
          context.commit('SET_CLIADMIN_CARERS', [])
          context.commit('SET_CLIADMIN_CARERS_LOAD_STATE', false)
        }
      } catch (error) {
        console.error(error)
        context.commit('SET_CLIADMIN_CARERS_ERROR', true)
      }
    }
  },
  getters: {

  }
}
