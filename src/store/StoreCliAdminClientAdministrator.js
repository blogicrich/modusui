import apiLib from '../services/apiLib.js'

export const moduleCliAdminClientAdministrator = {
  state: {
    loading: false,
    error: null,
    administrators: null
  },
  mutations: {
    SET_CLIENT_ADMIN_LOADING (state, loading) {
      state.loading = loading
    },
    SET_CLIENT_ADMIN_ERROR (state, error) {
      state.error = error
    },
    SET_CLIENT_ADMINS (state, administrators) {
      state.administrators = administrators
    }
  },
  actions: {
    async fetchClientAdmins ({ commit }) {
      try {
        commit('SET_CLIENT_ADMIN_LOADING', true)
        commit('SET_CLIENT_ADMIN_ERROR', null)
        commit('SET_CLIENT_ADMINS', await apiLib.getData('/cliadmin/client-administrator'))
      } catch (err) {
        commit('SET_CLIENT_ADMIN_ERROR', err)
      } finally {
        commit('SET_CLIENT_ADMIN_LOADING', false)
      }
    }
  }
}
