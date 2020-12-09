import apiLib from '../services/apiLib.js'

export const moduleCliAdminClientAdministrator = {
  state: {
    loading: false,
    error: null,
    administrators: null
  },
  mutations: {
    SET_CLIENT_ADMIN_LOADING (state, loading) {
      state.loading = loading
    },
    SET_CLIENT_ADMIN_ERROR (state, error) {
      state.error = error
    },
    SET_CLIENT_ADMINS (state, administrators) {
      state.administrators = administrators
    }
  },
  actions: {
    async fetchClientAdmins ({ commit }) {
      try {
        commit('SET_CLIENT_ADMIN_LOADING', true)
        commit('SET_CLIENT_ADMIN_ERROR', null)
        commit('SET_CLIENT_ADMINS', await apiLib.getData('/cliadmin/client-administrator', false, false, true))
      } catch (err) {
        commit('SET_CLIENT_ADMIN_ERROR', err)
      } finally {
        commit('SET_CLIENT_ADMIN_LOADING', false)
      }
    },
    async createClientAdmin ({ commit }, newClientAdmin) {
      try {
        commit('SET_CLIENT_ADMIN_LOADING', true)
        commit('SET_CLIENT_ADMIN_ERROR', null)
        await apiLib.postData('/cliadmin/client-administrator', newClientAdmin, false, true, true)
      } catch (err) {
        commit('SET_CLIENT_ADMIN_ERROR', err)
      } finally {
        commit('SET_CLIENT_ADMIN_LOADING', false)
      }
    },
    async updateClientAdmin ({ commit }, alteredClientAdmin) {
      try {
        commit('SET_CLIENT_ADMIN_LOADING', true)
        commit('SET_CLIENT_ADMIN_ERROR', null)
        await apiLib.updateData(
          `/cliadmin/client-administrator/${alteredClientAdmin.deptPersonId}`,
          alteredClientAdmin,
          false,
          true,
          true
        )
      } catch (err) {
        commit('SET_CLIENT_ADMIN_ERROR', err)
      } finally {
        commit('SET_CLIENT_ADMIN_LOADING', false)
      }
    },
    async deleteClientAdmin ({ commit, state }, deptPersonId) {
      try {
        commit('SET_CLIENT_ADMIN_LOADING', true)
        commit('SET_CLIENT_ADMIN_ERROR', null)
        await apiLib.deleteData(`/cliadmin/client-administrator/${deptPersonId}`, false, true, true)
        if (state.administrators) {
          commit('SET_CLIENT_ADMINS', state.administrators.filter(admin => admin.deptPersonId !== deptPersonId))
        }
      } catch (err) {
        commit('SET_CLIENT_ADMIN_ERROR', err)
      } finally {
        commit('SET_CLIENT_ADMIN_LOADING', false)
      }
    }
  }
}
