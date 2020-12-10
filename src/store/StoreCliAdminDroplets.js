import apiLib from '../services/apiLib.js'

export const moduleCliAdminDroplets = {
  state: {
    droplets: null,
    error: null,
    loading: true,
    // Base Availability Check values
    queriedMacAddress: null,
    queryResult: null
  },
  mutations: {
    SET_AVAILABILITY_QUERY_RESULTS (state, { macAddress, availabilityState }) {
      state.queriedMacAddress = macAddress
      state.queryResult = availabilityState
    },
    SET_DROPLET_LOADING_STATE (state, loading) {
      state.loading = loading
    },
    SET_DROPLET_ERROR_STATE (state, error) {
      state.error = error
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
      try {
        commit('SET_DROPLET_LOADING_STATE', true)
        commit('SET_DROPLET_ERROR_STATE', false)
        const response = await apiLib.getData(`/cliadmin/base/${macAddress}/availability-state`, false, false, true)
        commit('SET_AVAILABILITY_QUERY_RESULTS', { macAddress, availabilityState: response.availabilityState })
      } catch (err) {
        commit('SET_DROPLET_ERROR_STATE', err)
      } finally {
        commit('SET_DROPLET_LOADING_STATE', false)
      }
    },
    async fetchDroplets ({ commit }) {
      try {
        commit('SET_DROPLET_LOADING_STATE', true)
        commit('SET_DROPLET_ERROR_STATE', false)
        const response = await apiLib.getData('/cliadmin/base', false, false, true)
        commit('SET_DROPLETS', response)
      } catch (err) {
        commit('SET_DROPLET_ERROR_STATE', err)
      } finally {
        commit('SET_DROPLET_LOADING_STATE', false)
      }
    },
    async registerDroplet ({ commit }, { macAddress, friendlyName }) {
      try {
        commit('SET_DROPLET_LOADING_STATE', true)
        commit('SET_DROPLET_ERROR_STATE', false)
        await apiLib.postData('/cliadmin/base', { macAddress, friendlyName }, false, true, true)
        commit('SET_REGISTER_STATUS', status)
      } catch (err) {
        commit('SET_DROPLET_ERROR_STATE', err)
      } finally {
        commit('SET_DROPLET_LOADING_STATE', false)
      }
    },
    async setDropletName ({ commit }, { friendlyName, baseId }) {
      try {
        commit('SET_DROPLET_LOADING_STATE', true)
        commit('SET_DROPLET_ERROR_STATE', false)
        await apiLib.updateData(`/cliadmin/base/${baseId}/name`, { friendlyName }, false, true, true)
      } catch (err) {
        commit('SET_DROPLET_ERROR_STATE', err)
      } finally {
        commit('SET_DROPLET_LOADING_STATE', false)
      }
    },
    async setDropletUser ({ commit }, { userId, baseId }) {
      try {
        commit('SET_DROPLET_LOADING_STATE', true)
        commit('SET_DROPLET_ERROR_STATE', false)
        await apiLib.updateData(`/cliadmin/base/${baseId}/user`, { userId }, false, true, true)
      } catch (err) {
        commit('SET_DROPLET_ERROR_STATE', err)
      } finally {
        commit('SET_DROPLET_LOADING_STATE', false)
      }
    },
    async unlinkDroplet ({ commit }, baseId) {
      try {
        commit('SET_DROPLET_LOADING_STATE', true)
        commit('SET_DROPLET_ERROR_STATE', false)
        await apiLib.deleteData(`/cliadmin/base/${baseId}`, false, true, true)
      } catch (err) {
        commit('SET_DROPLET_ERROR_STATE', err)
      } finally {
        commit('SET_DROPLET_LOADING_STATE', false)
      }
    }
  }
}
