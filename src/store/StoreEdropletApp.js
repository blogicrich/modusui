import apiLib from '../services/apiLib.js'

export const moduleEdropletApp = {
  state: {
    // Login
    isActive: false,
    authenticated: false,
    deptPersonsId: null,
    level: [],
    portalAuthorisedId: null,
    authDataLoading: false,
    token: '',
    // Dashboard
    userDataLoading: false,
    storeId: null,
    userId: null,
    carerId: null,
    accountHolderId: null,
    deviceMessageTypeId: null,
    messageNo: null,
    date: null,
    conditionId: null,
    dayReportId: null
  },
  mutations: {
    // Mutate the state. Mutations must be syncronous.
    SET_LOAD_STATUS (state, data) {
      state.authDataLoading = data
    },
    SET_AUTHENTICATION_STATE (state, data) {
      state.authenticated = data
    },
    SET_CARER_ID (state, data) {
      state.carerId = data
    },
    SET_ACCOUNT_HOLDER_ID (state, data) {
      state.accountHolderId = data
    },
    SET_DEPT_PERSON_ID (state, data) {
      state.deptPersonsId = data
    },
    SET_PORTAL_AUTH_ID (state, data) {
      state.portalAuthorisedId = data
    },
    SET_ACTIVE (state, data) {
      state.isActive = data
    },
    SET_LEVEL (state, data) {
      state.level = data
    },
    SET_TOKEN (state, data) {
      state.token = data
    }
  },
  actions: {
    // Actions commit mutations. Actions can be Async! Yay.
    async POST_LOGIN (context, payload) {
      context.commit('SET_LOAD_STATUS', true)
      let data = apiLib.postAuth('login', payload, true).then(response => {
        if (response) {
          if (response.roles) {
            context.commit('SET_AUTHENTICATION_STATE', true)
            context.commit('SET_ACCOUNT_HOLDER_ID', response.accountHolderId)
            context.commit('SET_CARER_ID', response.carerId)
            context.commit('SET_DEPT_PERSON_ID', response.deptPersonsId)
            context.commit('SET_PORTAL_AUTH_ID', response.portalAuthorisedId)
            context.commit('SET_LEVEL', response.roles)
            context.commit('SET_TOKEN', response.token)
            context.commit('SET_ACTIVE', true)
          }
        } else {
          context.commit('SET_LOAD_STATUS', false)
          context.commit('SET_AUTHENTICATION_STATE', false)
          context.commit('SET_CARER_ID', null)
          context.commit('SET_ACCOUNT_HOLDER_ID', null)
          context.commit('SET_DEPT_PERSON_ID', null)
          context.commit('SET_PORTAL_AUTH_ID', null)
          context.commit('SET_LEVEL', [])
          context.commit('SET_TOKEN', null)
          context.commit('SET_LOAD_STATUS', false)
          context.commit('SET_ACTIVE', false)
        }
      })
      return data
    },
    LOGOUT (context) {
      context.commit('SET_LOAD_STATUS', false)
      context.commit('SET_AUTHENTICATION_STATE', false)
      context.commit('SET_CARER_ID', null)
      context.commit('SET_ACCOUNT_HOLDER_ID', null)
      context.commit('SET_DEPT_PERSON_ID', null)
      context.commit('SET_PORTAL_AUTH_ID', null)
      context.commit('SET_LEVEL', [])
      context.commit('SET_TOKEN', null)
      context.commit('SET_LOAD_STATUS', false)
      context.commit('SET_ACTIVE', false)
    }
  },
  getters: {
    // Gets a derived state from the store state - i.e. use of a filter on the state.
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
    getterCarerId: state => state.carerId,
    getterAccountHolderId: state => state.accountHolderId,
    getterDeviceMessageTypeId: state => state.deviceMessageTypeId,
    getterMessageNo: state => state.messageNo,
    getterDate: state => state.date,
    getterConditionId: state => state.conditionId,
    getterDayReportId: state => state.dayReportId
  }
}
