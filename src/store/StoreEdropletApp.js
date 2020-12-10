import apiLib from '../services/apiLib.js'
import moment from 'moment'

export const moduleEdropletApp = {
  state: {
    // Login
    isActive: deserialize('isActive'),
    expiresOn: deserialize('expiresOn', 0),
    // deptPersonsId: deserialize('deptPersonsId'),
    level: deserialize('level', []),
    portalAuthorisedId: deserialize('portalAuthorisedId'),
    authDataLoading: false,
    // Dashboard
    userDataLoading: false,
    storeId: null,
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
    SET_AUTH_EXPIRY (state, data) {
      serialize('expiresOn', data)
      state.expiresOn = data
    },
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
    CLEAR_STATE (state) {
      state.expiresOn = 0
      state.portalAuthorisedId = null
      state.level = null
      state.active = false
      state.authDataLoading = false
      localStorage.clear()
    }
  },
  actions: {
    async POST_LOGIN (context, payload) {
      try {
        context.commit('SET_LOAD_STATUS', true)
        const response = await apiLib.postData('login', payload, true, false, true)
        context.commit('SET_AUTH_EXPIRY', response.expiresOn)
        context.commit('SET_PORTAL_AUTH_ID', response.user.portalAuthorisedId)
        context.commit('SET_LEVEL', response.roles)
        context.commit('SET_ACTIVE', true)
        context.commit('SET_LOAD_STATUS', false)
        return response
      } catch (err) {
        context.commit('CLEAR_STATE')
        return err.response
      } finally {
        context.commit('SET_LOAD_STATUS', false)
      }
    },
    async LOGOUT (context) {
      await apiLib.postData('logout', {}, false, true, false)
      context.commit('CLEAR_STATE')
    },
    async GAIN_ANTI_CSRF_TOKEN (context) {
      await apiLib.postData('gain-pre-login-csrf-token', {}, false, false, false)
    }
  },
  getters: {
    // Login getters
    isActive: state => state.isActive,
    authenticated: state => state.expiresOn > moment().unix(),
    deptPersonsId: state => state.deptPersonsId,
    level: state => state.level,
    portalAuthorisedId: state => state.portalAuthorisedId,
    authDataLoading: state => state.authDataLoading,
    token: state => state.token,
    // Dashboard getters
    getterStoreId: state => state.storeId,
    getterUserId: state => state.userId,
    // getterSelectedUser: state => state.selectedUser,
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
