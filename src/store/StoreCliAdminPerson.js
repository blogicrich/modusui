import apiLib from '../services/apiLib.js'

export const moduleCliAdminPerson = {
  state: {
    cliAdminPersons: [],
    cliAdminPersonsLoading: false,
    cliAdminPersonsError: false,
    cliAdminSelectedPerson: false
  },
  mutations: {
    SET_CLIADMIN_PERSONS (state, data) {
      state.cliAdminPersons = data
    },
    SET_CLIADMIN_PERSONS_LOAD_STATE (state, data) {
      state.cliAdminPersonsLoading = data
    },
    SET_CLIADMIN_PERSONS_ERROR (state, data) {
      state.cliAdminError = data
    },
    SET_CLIADMIN_SELECTED_PERSON (state, data) {
      state.cliAdminSelectedPerson = data
    },
    RESET_CLIADMIN_PERSONS_STATE (state) {
      state.cliAdminPersons = []
      state.cliAdminSelectedPerson = {}
      state.cliAdminPersonsLoading = false
      state.cliAdminError = false
    }
  },
  actions: {
    async fetchCliAdminPersons (context, payload) {
      try {
        context.commit('SET_CLIADMIN_PERSONS_LOAD_STATE', true)
        const response = await apiLib.getData('cliadmin/person')
        if (Array.isArray(response)) {
          context.commit('SET_CLIADMIN_PERSONS', response)
          context.commit('SET_CLIADMIN_SELECTED_PERSON', response[0])
          context.commit('SET_CLIADMIN_PERSONS_LOAD_STATE', false)
          context.commit('SET_CLIADMIN_PERSONS_ERROR', false)
        } else {
          context.commit('SET_CLIADMIN_PERSONS', [])
          context.commit('SET_CLIADMIN_SELECTED_PERSON', {})
          context.commit('SET_CLIADMIN_PERSONS_LOAD_STATE', false)
        }
      } catch (error) {
        console.error(error)
        context.commit('SET_CLIADMIN_PERSONS_ERROR', true)
        return error
      }
    }
  },
  getters: {

  }
}
