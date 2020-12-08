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
    },
    async createPerson ({ commit }, newPerson) {
      try {
        commit('SET_PEOPLE_LOAD_STATE', true)
        commit('SET_PEOPLE_ERROR_STATE', null)
        await apiLib.postData('/cliadmin/person', newPerson, false, true)
      } catch (err) {
        commit('SET_PEOPLE_ERROR_STATE', err)
      } finally {
        commit('SET_PEOPLE_LOAD_STATE', false)
      }
    },
    async updatePerson ({ commit }, alteredPerson) {
      try {
        commit('SET_PEOPLE_LOAD_STATE', true)
        commit('SET_PEOPLE_ERROR_STATE', null)
        await apiLib.updateData(`/cliadmin/person/${alteredPerson.deptPersonId}`, alteredPerson, false, true)
      } catch (err) {
        commit('SET_PEOPLE_ERROR_STATE', err)
      } finally {
        commit('SET_PEOPLE_LOAD_STATE', false)
      }
    },
    async deletePerson ({ commit, state }, deptPersonId) {
      try {
        commit('SET_PEOPLE_LOAD_STATE', true)
        commit('SET_PEOPLE_ERROR_STATE', null)
        await apiLib.deleteData(`/cliadmin/person/${deptPersonId}`, false, true)
        if (state.carers) {
          commit('SET_PEOPLE', state.people.filter(person => person.deptPersonId !== deptPersonId))
        }
      } catch (err) {
        commit('SET_PEOPLE_ERROR_STATE', err)
      } finally {
        commit('SET_PEOPLE_LOAD_STATE', false)
      }
    }
  }
}
