import apiLib from '../services/apiLib.js'

const bounce = 500

export const moduleCliAdminUsers = {
  state: {
    cliAdminUsers: [],
    cliAdminUsersLoading: false,
    cliAdminUsersUpdating: false,
    cliAdminUsersDeleting: false,
    cliAdminUsersError: false
  },
  mutations: {
    SET_CLIADMIN_USERS (state, data) {
      state.cliAdminUsers = data
    },
    SET_CLIADMIN_USERS_LOAD_STATE (state, data) {
      state.cliAdminUsersLoading = data
    },
    SET_CLIADMIN_USERS_UPDATE_STATE (state, data) {
      state.cliAdminUsersUpdating = data
    },
    SET_CLIADMIN_USERS_DELETE_STATE (state, data) {
      state.cliAdminUsersDeleting = data
    },
    SET_CLIADMIN_USERS_ERROR (state, data) {
      state.cliAdminUsersError = data
    },
    RESET_CLIADMIN_USERS_STATE (state) {
      state.cliAdminUsers = []
      state.cliAdminSelectedUser = {}
      state.cliAdminUsersLoading = false
      state.cliAdminUsersError = false
    }
  },
  actions: {
    async fetchCliAdminUsers (context, payload) {
      try {
        context.commit('SET_CLIADMIN_USERS_LOAD_STATE', true)
        const response = await apiLib.getData('cliadmin/user')
        if (Array.isArray(response)) {
          context.commit('SET_CLIADMIN_USERS', response)
          setTimeout(() => {
            context.commit('SET_CLIADMIN_USERS_LOAD_STATE', false)
          }, bounce)
          context.commit('SET_CLIADMIN_USERS_LOAD_STATE', false)
          context.commit('SET_CLIADMIN_USERS_ERROR', false)
        } else {
          context.commit('SET_CLIADMIN_USERS', [])
          context.commit('SET_CLIADMIN_USERS_LOAD_STATE', false)
        }
      } catch (error) {
        console.error(error)
        context.commit('SET_CLIADMIN_USERS_ERROR', true)
      }
    }
  }
}
