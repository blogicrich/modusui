import apiLib from '../services/apiLib.js'

export const moduleCliAdminPerson = {
  state: {
    people: [],
    loading: false,
    error: null
  },
  mutations: {
    SET_PEOPLE_LOAD_STATE (state, loading) {
      state.loading = loading
    },
    SET_PEOPLE_ERROR_STATE (state, error) {
      state.error = error
    },
    SET_PEOPLE (state, people) {
      state.people = people
    }
  },
  actions: {
    async fetchPeople ({ commit }) {
      try {
        commit('SET_PEOPLE_LOAD_STATE', true)
        commit('SET_PEOPLE_ERROR_STATE', null)
        commit('SET_PEOPLE', await apiLib.getData('/cliadmin/person'))
      } catch (err) {
        commit('SET_PEOPLE_ERROR_STATE', err)
      } finally {
        commit('SET_PEOPLE_LOAD_STATE', false)
      }
    }
  }
}
