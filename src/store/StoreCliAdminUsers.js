import apiLib from '../services/apiLib.js'

export const moduleCliAdminUsers = {
  state: {
    cliAdminUsers: [],
    cliAdminUsersLoading: false,
    cliAdminError: false,
    cliAdminSelectedUser: {}
  },
  mutations: {
    SET_CLIADMIN_USERS (state, data) {
      state.cliAdminUsers = data
    },
    SET_CLIADMIN_USERS_LOAD_STATE (state, data) {
      state.cliAdminUsersLoading = data
    },
    SET_CLIADMIN_USERS_ERROR (state, data) {
      state.cliAdminError = data
    },
    SET_CLIADMIN_SELECTED_USER (state, data) {
      state.cliAdminSelectedUser = data
    },
    RESET_CLIADMIN_USERS_STATE (state) {
      state.cliAdminUsers = []
      state.cliAdminSelectedUser = {}
      state.cliAdminUsersLoading = false
      state.cliAdminError = false
    }
  },
  actions: {
    async fetchCliAdminUsers (context, payload) {
      try {
        context.commit('SET_CLIADMIN_USERS_LOAD_STATE')
        const response = await apiLib.getData('cliadmin/carer')
        if (Array.isArray(response)) {
          context.commit('SET_CLIADMIN_USERS', response)
          context.commit('SET_CLIADMIN_SELECTED_USER', response[0])
          context.commit('SET_CLIADMIN_USERS_LOAD_STATE', false)
          context.commit('SET_CLIADMIN_USERS_ERROR', false)
        } else {
          context.commit('SET_CLIADMIN_USERS', [])
          context.commit('SET_CLIADMIN_SELECTED_USER', {})
          context.commit('SET_CLIADMIN_USERS_LOAD_STATE', false)
        }
      } catch (error) {
        console.error(error)
        context.commit('SET_CLIADMIN_USERS_ERROR', true)
      }
    }
  },
  getters: {

  }
}
