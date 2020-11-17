import apiLib from '../services/apiLib.js'

export const moduleCliAdminDroplets = {
  state: {
    droplets: null,
    loading: true,
    // Base Availability Check values
    queriedMacAddress: null,
    queryResult: null,
    // Register values
    dropletRegisterStatus: null
  },
  mutations: {
    SET_AVAILABILITY_QUERY_RESULTS (state, { macAddress, availabilityState }) {
      state.queriedMacAddress = macAddress
      state.queryResult = availabilityState
    },
    SET_LOADING_STATE (state, loading) {
      state.loading = loading
    },
    SET_DROPLETS (state, droplets) {
      state.droplets = droplets
    },
    SET_REGISTER_STATUS (state, status) {
      state.dropletRegisterStatus = status
    }
  },
  actions: {
    async fetchAvailabilityState ({ commit }, macAddress) {
      commit('SET_LOADING_STATE', true)
      const response = await apiLib.getData(`/cliadmin/base/${macAddress}/availability-state`)
      commit('SET_AVAILABILITY_QUERY_RESULTS', { macAddress, availabilityState: response.availabilityState })
      commit('SET_LOADING_STATE', false)
    },
    async fetchDroplets ({ commit }) {
      commit('SET_LOADING_STATE', true)
      const response = await apiLib.getData('/cliadmin/base')
      commit('SET_DROPLETS', response)
      commit('SET_LOADING_STATE', false)
    },
    async registerDroplet ({ commit }, macAddress) {
      commit('SET_LOADING_STATE', true)
      const { status } = await apiLib.postData(
        '/cliadmin/base',
        {
          macAddress
        },
        true,
        true,
        true
      )
      commit('SET_REGISTER_STATUS', status)
      commit('SET_LOADING_STATE', false)
    },
    async setDropletName ({ commit }, { friendlyName, baseId }) {
      commit('SET_LOADING_STATE', true)
      await apiLib.updateData(`/cliadmin/base/${baseId}/name`, { friendlyName }, true, true)
      commit('SET_LOADING_STATE', false)
    },
    async setDropletUser ({ commit }, { userId, baseId }) {
      commit('SET_LOADING_STATE', true)
      await apiLib.updateData(`/cliadmin/base/${baseId}/user`, { userId }, true, true)
      commit('SET_LOADING_STATE', false)
    },
    async unlinkDroplet ({ commit }, baseId) {
      commit('SET_LOADING_STATE', true)
      await apiLib.deleteData(`/cliadmin/base/${baseId}`, true, true)
      commit('SET_LOADING_STATE', false)
    }
  }
}
