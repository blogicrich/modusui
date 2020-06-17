import apiLib from '../services/apiLib.js'
import Vue from 'vue'

export const moduleSmsEmailMessages = {
  state: {
    messagesLoading: true,
    messagesClone: {},
    messages: {},
    selectedMessage: {},
    messageAlertType: '',
    messageCommsType: ''
  },
  mutations: {
    SET_MESSAGE_LOAD_STATUS (state, data) {
      state.messagesLoading = data
    },
    SET_MESSAGES (state, data) {
      data.forEach(e => {
        state.messages[e.alertMessagesId] = Object.assign({}, state.messages[e.alertMessagesId], e)
        // state.messages[e.alertMessagesId] = { ...state.messages[e.alertMessagesId], e }
      })
      state.messagesClone = Object.assign({}, state.messagesClone, JSON.parse(JSON.stringify(state.messages)))
    },
    SET_SELECTED_MESSAGE (state, data) {
      state.selectedMessage = Object.assign({}, state.selectedMessage, data)
      // state.selectedMessage = { ...state.selectedMessage, ...data }
    },
    UPDATE_SELECTED_MESSAGE_COMMS_TYPE (state, data) {
      state.messageCommsType = data
    },
    UPDATE_SELECTED_MESSAGE_ALERT_TYPE (state, data) {
      state.messageAlertType = data
    },
    UPDATE_SELECTED_SUBJECT (state, data) {
      // state.messages[data.id] = Object.assign({}, state.messages[data.id], { subject: data.value })
      // state.messages[data.id] = { ...state.messages[data.id], subject: data.value }
      Vue.set(state.messages[data.id], 'subject', data.value)
    },
    UPDATE_SELECTED_MESSAGE (state, data) {
      // state.messages[data.id] = Object.assign({}, state.messages[data.id], { message: data.value })
      state.messages[data.id] = { ...state.messages[data.id], message: data.value }
    },
    RESET_SELECTED_MESSAGE (state, data) {
      const oldData = state.messagesClone[data]
      // state.messages[data] = Object.assign({}, state.messages[data], oldData)
      state.messages[data] = { ...state.messages[data], ...oldData }
    }
  },
  actions: {
    fetchMessages (context) {
      return apiLib.getData('sysadmin/text-messages').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_MESSAGES', {})
          context.commit('SET_MESSAGE_LOAD_STATUS', false)
        } else {
          context.commit('SET_MESSAGES', response)
          context.commit('UPDATE_SELECTED_MESSAGE_COMMS_TYPE', response[0].communicationTypeDescription)
          context.commit('UPDATE_SELECTED_MESSAGE_ALERT_TYPE', response[0].alertTypeDescription)
          context.commit('SET_MESSAGE_LOAD_STATUS', false)
        }
      })
    },
    async updateMessages (context) {
      const keys = Object.keys(context.state.messages)

      for (let index = 0; index < keys.length; index++) {
        const key = keys[index]

        const payload = { message: context.state.messages[key].message, subject: context.state.messages[key].subject }
        if (String(context.state.messages[key].message) !== String(context.state.messagesClone[key].message) || String(context.state.messages[key].subject) !== String(context.state.messagesClone[key].subject)) {
          await apiLib.updateData('sysadmin/text-messages/' + key, payload, false, true)
        }
      }
      context.commit('SET_MESSAGES', Object.values(context.state.messages))
    }
  },
  getters: {
    getterMenuItems: (state) => (commsType) => {
      return Object.values(state.messages).filter(e => e.communicationTypeDescription === commsType)
    },
    getterSelectedMessage: (state) => (id) => {
      return state.messages[id].message
    },
    getterSelectedSubject: (state) => (id) => {
      return state.messages[id].subject
    }
  }
}
