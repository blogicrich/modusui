import apiLib from '../services/apiLib.js'

export const moduleSmsEmailMessages = {
  state: {
    messagesLoading: true,
    messagesClone: {},
    messages: {},
    selectedMessage: {},
    selectedMessageAlertType: '',
    selectedCommunicationType: ''
  },
  mutations: {
    SET_MESSAGE_LOAD_STATUS (state, data) {
      state.messagesLoading = data
    },
    SET_MESSAGES (state, data) {
      data.forEach(e => {
        Object.assign(state.messages, { [e.alertMessagesId]: e })
      })
      state.messagesClone = JSON.parse(JSON.stringify(state.messages))
    },
    SET_SELECTED_MESSAGE (state, data) {
      state.selectedMessage = Object.assign({}, state.selectedMessage, data)
    },
    UPDATE_SELECTED_MESSAGE_COMMS_TYPE (state, data) {
      state.selectedCommunicationType = data
    },
    UPDATE_SELECTED_MESSAGE_ALERT_TYPE (state, data) {
      state.selectedMessageAlertType = data
    },
    UPDATE_SELECTED_SUBJECT (state, data) {
      state.selectedMessage = Object.assign({}, state.selectedMessage, { subject: data.value })
    },
    UPDATE_SELECTED_MESSAGE (state, data) {
      state.selectedMessage = Object.assign({}, state.selectedMessage, { message: data.value })
    },
    RESET_SELECTED_MESSAGE (state, data) {
      let oldData = JSON.parse(JSON.stringify(state.messagesClone[data]))
      state.selectedMessage = Object.assign({}, state.selectedMessage, oldData)
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
          context.commit('SET_SELECTED_MESSAGE', response[0])
          context.commit('SET_MESSAGE_LOAD_STATUS', false)
        }
      })
    },
    updateMessages (payload) {
      return apiLib.updateData('sysadmin/text-messages', payload)
    }
  },
  getters: {
    getterSelectedMessage: state => state.selectedMessage.message,
    getterSelectedSubject: state => state.selectedMessage.subject,
    getterMenuItems: state => Object.values(state.messages).filter(
      e => String(e.communicationTypeDescription) === String(state.selectedMessageAlertType)
    )
  }
}
