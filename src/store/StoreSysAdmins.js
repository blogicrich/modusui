import apiLib from '../services/apiLib.js'

export const moduleSystemAdministrators = {
  state: {
    sysAdminsLoading: true,
    sysAdmins: [],
    selectedSysAdmin: {},
    selectedSysAdminCopy: {},
    newPassword: '',
    duplicateNewPassword: '',
    newSysAdmin: {
      titleId: '',
      username: '',
      // password: '',
      email: '',
      mobileNo: '',
      givenName: '',
      familyName: '',
      salutation: ''
    },
    payload: {
      titleId: '',
      username: '',
      // password: '',
      email: '',
      mobileNo: '',
      givenName: '',
      familyName: '',
      salutation: ''
    }
  },
  mutations: {
    SET_SYSADMINS (state, data) {
      state.sysAdmins = data
    },
    SET_SELECTED_SYSADMIN (state, data) {
      state.selectedSysAdmin = data
      state.selectedSysAdminCopy = JSON.parse(JSON.stringify(data))
    },
    SET_SYSADMINS_LOAD_STATUS (state, data) {
      state.sysAdminsLoading = data
    },
    // PASSWORD - UPDATE AND CREATE
    SET_SYSADMIN_NEW_PASSWORD (state, data) {
      state.newPassword = data
    },
    SET_SYSADMIN_DUPLICATE_NEW_PASSWORD (state, data) {
      state.duplicateNewPassword = data
    },
    // UPDATE SELECTED SYSADMIN
    SET_SELECTED_SYSADMIN_TITLE (state, data) {
      state.selectedSysAdmin.titleId = data
    },
    SET_SELECTED_SYSADMIN_USERNAME (state, data) {
      state.selectedSysAdmin.username = data
    },
    SET_SELECTED_SYSADMIN_EMAIL (state, data) {
      state.selectedSysAdmin.email = data
    },
    SET_SELECTED_SYSADMIN_MOBILE_NO (state, data) {
      state.selectedSysAdmin.mobileNo = data
    },
    SET_SELECTED_SYSADMIN_GIVEN_NAME (state, data) {
      state.selectedSysAdmin.givenName = data
    },
    SET_SELECTED_SYSADMIN_FAMILY_NAME (state, data) {
      state.selectedSysAdmin.familyName = data
    },
    SET_SELECTED_SYSADMIN_SALUTATION (state, data) {
      state.selectedSysAdmin.salutation = data
    },
    UNDO_SELECTED_SYSADMIN (state) {
      state.selectedSysAdmin = JSON.parse(JSON.stringify(state.selectedSysAdminCopy))
    },
    // UPDATE NEW SYSADMIN
    SET_NEW_SYSADMIN_TITLE (state, data) {
      state.newSysAdmin.titleId = data
    },
    SET_NEW_SYSADMIN_USERNAME (state, data) {
      state.newSysAdmin.username = data
    },
    SET_NEW_SYSADMIN_EMAIL (state, data) {
      state.newSysAdmin.email = data
    },
    SET_NEW_SYSADMIN_MOBILE_NO (state, data) {
      state.newSysAdmin.mobileNo = data
    },
    SET_NEW_SYSADMIN_GIVEN_NAME (state, data) {
      state.newSysAdmin.givenName = data
    },
    SET_NEW_SYSADMIN_FAMILY_NAME (state, data) {
      state.newSysAdmin.familyName = data
    },
    SET_NEW_SYSADMIN_SALUTATION (state, data) {
      state.newSysAdmin.salutation = data
    },
    // API Objects
    SET_PAYLOAD_NEW (state) {
      Object.keys(state.payload).forEach(function (key) {
        state.payload[key] = state.newSysAdmin[key]
      })
    },
    SET_PAYLOAD_SELECTED (state) {
      Object.keys(state.payload).forEach(function (key) {
        state.payload[key] = state.selectedSysAdmin[key]
      })
    },
    RESET_PAYLOAD (state) {
      Object.keys(state.payload).forEach(function (key) {
        state.payload[key] = ''
      })
    }
  },
  actions: {
    async fetchSystemAdmins (context) {
      context.commit('SET_SYSADMINS_LOAD_STATUS', true)
      return apiLib.getData('sysadmin/sysadmin', true).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_SYSADMINS', [])
        } else {
          context.commit('SET_SYSADMINS', response)
          context.commit('SET_SYSADMINS_LOAD_STATUS', false)
        }
      })
    },

    async updateSysAdmin (context) {
      const portalId = context.state.selectedSysAdmin.portalAuthorisedId
      const payload = context.state.payload
      context.commit('RESET_PAYLOAD')
      context.commit('SET_PAYLOAD_SELECTED')
      context.commit('SET_SYSADMINS_LOAD_STATUS', true)
      const update = await apiLib.updateData('sysadmin/sysadmin/' + portalId, payload, false, true).then(
        context.commit('SET_SYSADMINS_LOAD_STATUS', false)
      )
      return update
    },

    async postNewSysAdmin (context) {
      const payload = { ...context.state.newSysAdmin, password: context.state.newPassword }
      context.commit('RESET_PAYLOAD')
      context.commit('SET_PAYLOAD_NEW')
      context.commit('SET_SYSADMINS_LOAD_STATUS', true)
      const update = await apiLib.postData('sysadmin/sysadmin/', payload, true, true).then(
        context.dispatch('fetchSystemAdmins'),
        context.commit('SET_SYSADMINS_LOAD_STATUS', false) 
      )
      return update
    },
    async deleteSelectedSysAdmin (context) {
      const portalId = context.state.selectedSysAdmin.portalAuthorisedId
      context.commit('SET_SYSADMINS_LOAD_STATUS', true)
      const update = await apiLib.deleteData('sysadmin/sysadmin/' + portalId, true, true).then(
        context.commit('SET_SYSADMINS_LOAD_STATUS', false)
      )
      return update
    },
    resetSysAdminsState (context) {
      context.commit('SET_SYSADMINS', [])
      context.commit('SET_SELECTED_SYSADMIN', {})
      context.commit('RESET_PAYLOAD')
      context.commit('SET_SYSADMIN_NEW_PASSWORD', '')
      context.commit('SET_SYSADMIN_DUPLICATE_NEW_PASSWORD', '')
      context.commit('SET_NEW_SYSADMIN_TITLE', '')
      context.commit('SET_NEW_SYSADMIN_USERNAME', '')
      context.commit('SET_NEW_SYSADMIN_EMAIL', '')
      context.commit('SET_NEW_SYSADMIN_MOBILE_NO', '')
      context.commit('SET_NEW_SYSADMIN_GIVEN_NAME', '')
      context.commit('SET_NEW_SYSADMIN_FAMILY_NAME', '')
      context.commit('SET_NEW_SYSADMIN_SALUTATION', '')
    },
    resetBoundFields (context) {
      context.commit('SET_SELECTED_SYSADMIN', {})
      context.commit('RESET_PAYLOAD')
      context.commit('SET_SYSADMIN_NEW_PASSWORD', '')
      context.commit('SET_SYSADMIN_DUPLICATE_NEW_PASSWORD', '')
      context.commit('SET_NEW_SYSADMIN_TITLE', '')
      context.commit('SET_NEW_SYSADMIN_USERNAME', '')
      context.commit('SET_NEW_SYSADMIN_EMAIL', '')
      context.commit('SET_NEW_SYSADMIN_MOBILE_NO', '')
      context.commit('SET_NEW_SYSADMIN_GIVEN_NAME', '')
      context.commit('SET_NEW_SYSADMIN_FAMILY_NAME', '')
      context.commit('SET_NEW_SYSADMIN_SALUTATION', '')
    }
  }
}
