import apiLib from '../services/apiLib.js'

export const moduleGettingStartedWizard = {
  state: {
    loading: false,
    error: false,
    wizardActive: false,
    availabilityState: null
  },
  mutations: {
    SET_WIZARD_LOADING (state, loading) {
      state.loading = loading
    },
    SET_WIZARD_ERROR (state, error) {
      state.error = error
    },
    SET_WIZARD_ACTIVE_STATE (state, active) {
      state.wizardActive = active
    },
    SET_WIZARD_BASE_AVAILABILITY_STATE (state, availabilityState) {
      state.availabilityState = availabilityState
    }
  },
  actions: {
    async fetchPublicAvailabilityState ({ commit }, macAddress) {
      try {
        commit('SET_WIZARD_BASE_AVAILABILITY_STATE', null)
        commit('SET_WIZARD_LOADING', true)
        commit('SET_WIZARD_ERROR', null)
        const response = await apiLib.getData(`public/base/${macAddress}/availability-state`, false, false, true)
        commit('SET_WIZARD_BASE_AVAILABILITY_STATE', response.availabilityState)
      } catch (err) {
        commit('SET_WIZARD_ERROR', err)
      } finally {
        commit('SET_WIZARD_LOADING', false)
      }
    },
    async registerAccount ({ commit }, newAccount) {
      try {
        commit('SET_WIZARD_LOADING', true)
        commit('SET_WIZARD_ERROR', null)
        await apiLib.postData('/public/register', newAccount, false, false, true)
      } catch (err) {
        commit('SET_WIZARD_ERROR', err)
      } finally {
        commit('SET_WIZARD_LOADING', false)
      }
    }
  }
}
