import apiLib from '../services/apiLib.js'

export const moduleCliAdminUserConditions = {
  state: {
    cliAdminUserConditions: [],
    cliAdminUserConditionsLoading: false,
    cliAdminUserConditionsError: false
  },
  mutations: {
    SET_CLIADMIN_USER_CONDITIONS (state, data) {
      state.cliAdminUserConditions = data
    },
    SET_CLIADMIN_USER_CONDITIONS_LOAD_STATE (state, data) {
      state.cliAdminUserConditionsLoading = data
    },
    SET_CLIADMIN_USER_CONDITIONS_ERROR (state, data) {
      state.cliAdminUserConditionsError = data
    },
    RESET_CLIADMIN_USER_CONDITIONS_STATE (state) {
      state.cliAdminUserConditions = []
      state.cliAdminUserConditionsLoading = false
      state.cliAdminUserConditionsError = false
    }
  },
  actions: {
    async fetchCliAdminUserConditions (context) {
      try {
        context.commit('SET_CLIADMIN_USER_CONDITIONS_LOAD_STATE', true)
        const response = await apiLib.getData('cliadmin/user-condition')
        if (Array.isArray(response)) {
          context.commit('SET_CLIADMIN_USER_CONDITIONS', response)
          context.commit('SET_CLIADMIN_USER_CONDITIONS_LOAD_STATE', false)
          context.commit('SET_CLIADMIN_USER_CONDITIONS_ERROR', false)
        } else {
          context.commit('SET_CLIADMIN_USER_CONDITIONS', [])
          context.commit('SET_CLIADMIN_SELECTED_CLIENT_ADMIN', {})
          context.commit('SET_CLIADMIN_USER_CONDITIONS_LOAD_STATE', false)
        }
      } catch (error) {
        console.error(error)
        context.commit('SET_CLIADMIN_USER_CONDITIONS_ERROR', true)
      }
    }
  },
  getters: {
    getterUserConditions: (state) => (userId) => {
      return state.cliAdminUserConditions.filter(conditions => conditions.userId === userId)
    }
  }
}
