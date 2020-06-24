import apiLib from '../services/apiLib.js'

export const moduleCliAdminClientAdministrator = {
  state: {
    cliAdminClientAdministrators: null,
    cliAdminClientAdministratorsLoading: false,
    cliAdminError: false,
    cliAdminSelectedClientAdmin: {}
  },
  mutations: {
    SET_CLIADMIN_CLIENT_ADMINS (state, data) {
      state.cliAdminClientAdministrators = data
    },
    SET_CLIADMIN_CLIENT_ADMINS_LOAD_STATE (state, data) {
      state.cliAdminClientAdministratorsLoading = data
    },
    SET_CLIADMIN_CLIENT_ADMINS_ERROR (state, data) {
      state.cliAdminError = data
    },
    SET_CLIADMIN_SELECTED_CLIENT_ADMIN (state, data) {
      state.cliAdminSelectedUser = data
    },
    RESET_CLIADMIN_CLIENT_ADMINS_STATE (state) {
      state.cliAdminClientAdministrators = []
      state.cliAdminSelectedUser = {}
      state.cliAdminClientAdministratorsLoading = false
      state.cliAdminError = false
    }
  },
  actions: {
    async fetchCliAdminClientAdministrators (context, payload) {
      try {
        context.commit('SET_CLIADMIN_CLIENT_ADMINS_LOAD_STATE')
        const response = await apiLib.getData('cliadmin/client-administrator')
        if (Array.isArray(response)) {
          context.commit('SET_CLIADMIN_CLIENT_ADMINS', response)
          context.commit('SET_CLIADMIN_SELECTED_CLIENT_ADMIN', response[0])
          context.commit('SET_CLIADMIN_CLIENT_ADMINS_LOAD_STATE', false)
          context.commit('SET_CLIADMIN_CLIENT_ADMINS_ERROR', false)
        } else {
          context.commit('SET_CLIADMIN_CLIENT_ADMINS', [])
          context.commit('SET_CLIADMIN_SELECTED_CLIENT_ADMIN', {})
          context.commit('SET_CLIADMIN_CLIENT_ADMINS_LOAD_STATE', false)
        }
      } catch (error) {
        console.error(error)
        context.commit('SET_CLIADMIN_CLIENT_ADMINS_ERROR', true)
      }
    }
  },
  getters: {

  }
}
