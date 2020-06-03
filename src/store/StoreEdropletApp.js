import apiLib from '../services/apiLib.js'

export const moduleEdropletApp = {
  state: {
    // Login
    isActive: deserialize('isActive'),
    authenticated: deserialize('authenticated', false),
    // deptPersonsId: deserialize('deptPersonsId'),
    level: deserialize('level', []),
    portalAuthorisedId: deserialize('portalAuthorisedId'),
    authDataLoading: false,
    token: deserialize('token'),
    // Dashboard
    userDataLoading: false,
    storeId: null,
    selectedUser: deserialize('selectedUser'),
    // carerId: deserialize('carerId'),
    // accountHolderId: null,
    deviceMessageTypeId: null,
    messageNo: null,
    date: null,
    conditionId: null,
    dayReportId: null
  },
  mutations: {
    SET_LOAD_STATUS (state, data) {
      state.authDataLoading = data
    },
    SET_AUTHENTICATION_STATE (state, data) {
      serialize('authenticated', data)
      state.authenticated = data
    },
    // SET_CARER_ID (state, data) {
    //   serialize('carerId', data)
    //   state.carerId = data
    // },
    // SET_ACCOUNT_HOLDER_ID (state, data) {
    //   serialize('accountHolderId', data)
    //   state.accountHolderId = data
    // },
    // SET_DEPT_PERSON_ID (state, data) {
    //   serialize('deptPersonsId', data)
    //   state.deptPersonsId = data
    // },
    SET_PORTAL_AUTH_ID (state, data) {
      serialize('portalAuthorisedId', data)
      state.portalAuthorisedId = data
    },
    SET_ACTIVE (state, data) {
      serialize('isActive', data)
      state.isActive = data
    },
    SET_LEVEL (state, data) {
      serialize('level', data)
      state.level = data
    },
    SET_TOKEN (state, data) {
      serialize('token', data)
      state.token = data
    },
    SET_SELECTED_USER (state, user) {
      serialize('selectedUser', user)
      state.selectedUser = user
    }
  },
  actions: {
    async POST_LOGIN (context, payload) {
      context.commit('SET_LOAD_STATUS', true)
      let data = apiLib.postAuth('login', payload, false, false).then(response => {
        if (response) {
          if (response.roles) {
            localStorage.clear()
            context.commit('SET_AUTHENTICATION_STATE', true)
            // context.commit('SET_ACCOUNT_HOLDER_ID', response.accountHolderId)
            // context.commit('SET_CARER_ID', response.carerId)
            // context.commit('SET_DEPT_PERSON_ID', response.deptPersonsId)
            context.commit('SET_PORTAL_AUTH_ID', response.user.portalAuthorisedId)
            context.commit('SET_LEVEL', response.roles)
            context.commit('SET_TOKEN', response.token)
            context.commit('SET_ACTIVE', true)
            context.commit('SET_LOAD_STATUS', false)
          } else {
            return response
          }
        } else {
          context.dispatch('LOGOUT')
        }
      })
      return data
    },
    LOGOUT (context) {
      // context.commit('SET_LOAD_STATUS', false)
      context.commit('SET_AUTHENTICATION_STATE', false)
      // context.commit('SET_CARER_ID', null)
      // context.commit('SET_ACCOUNT_HOLDER_ID', null)
      // context.commit('SET_DEPT_PERSON_ID', null)
      context.commit('SET_PORTAL_AUTH_ID', null)
      context.commit('SET_LEVEL', [])
      context.commit('SET_TOKEN', null)
      context.commit('SET_ACTIVE', false)
      context.commit('SET_LOAD_STATUS', false)
      localStorage.clear()
    }
  },
  getters: {
    // Login getters
    isActive: state => state.isActive,
    authenticated: state => state.authenticated,
    deptPersonsId: state => state.deptPersonsId,
    level: state => state.level,
    portalAuthorisedId: state => state.portalAuthorisedId,
    authDataLoading: state => state.authDataLoading,
    token: state => state.token,
    // Dashboard getters
    getterStoreId: state => state.storeId,
    getterUserId: state => state.userId,
    getterSelectedUser: state => state.selectedUser,
    getterCarerId: state => state.carerId,
    getterAccountHolderId: state => state.accountHolderId,
    getterDeviceMessageTypeId: state => state.deviceMessageTypeId,
    getterMessageNo: state => state.messageNo,
    getterDate: state => state.date,
    getterConditionId: state => state.conditionId,
    getterDayReportId: state => state.dayReportId
  }
}

function serialize (key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function deserialize (key) {
  if (key !== undefined) return JSON.parse(localStorage.getItem(key))
}
