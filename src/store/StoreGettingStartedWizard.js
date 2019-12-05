import apiLib from '../services/apiLib.js'

export const moduleGettingStartedWizard = {
  state: {
    wizardActive: false,
    titles: null,
    registerStatus: null,
    linkDropletStatus: null,
    dropletState: null
  },
  mutations: {
    SET_REGISTER_STATUS (state, status) {
      state.registerStatus = status
    },
    SET_TITLES (state, payload) {
      state.titles = payload
    },
    SET_LINK_DROPLET_STATUS (state, status) {
      state.linkDropletStatus = status
    },
    SET_DROPLET_STATE (state, dropletState) {
      state.dropletState = dropletState
    },
    SET_WIZARD_ACTIVE_STATE (state, active) {
      state.wizardActive = active
    }
  },
  actions: {
    async getTitles ({ commit }) {
      commit('SET_TITLES', await apiLib.getData('public/titles'))
    },

    async checkDropletAvailable ({ commit }, macAddress) {
      commit('SET_DROPLET_STATE', null)
      commit('SET_DROPLET_STATE', (await apiLib.getData(`public/base-available-check/${macAddress}`)).state)
    },

    async createAccount ({ commit }, payload) {
      commit('SET_REGISTER_STATUS', null)

      const { status } = await apiLib.postData('public/register', payload, true, false, true)

      commit('SET_REGISTER_STATUS', status)
    },

    async linkDroplet ({ commit }, payload) {
      commit('SET_LINK_DROPLET_STATUS', null)

      const { status } = await apiLib.postData('cliadmin/wizard/link-new-base-to-account', payload, true, false, true)

      commit('SET_LINK_DROPLET_STATUS', status)
    }
  }
}
