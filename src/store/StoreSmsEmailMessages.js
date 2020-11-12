import apiLib from '../services/apiLib.js'
import Vue from 'vue'

export const moduleSmsEmailMessages = {
  state: {
    messagesLoading: true,
    _messagesClone: [],
    messages: [],
    selectedMessageIndex: 0
  },
  mutations: {
    SET_MESSAGE_LOAD_STATUS (state, data) {
      state.messagesLoading = data
    },
    SET_MESSAGES (state, data) {
      state.messages = data
      // Shallow clone array and objects of the array.
      state._messagesClone = data.map(element => {
        return { ...element }
      })
    },
    SET_SELECTED_MESSAGE_INDEX (state, index) {
      state.selectedMessageIndex = index
    },
    UPDATE_SELECTED_MESSAGE_SUBJECT (state, subject) {
      Vue.set(state.messages[state.selectedMessageIndex], 'subject', subject)
    },
    UPDATE_SELECTED_MESSAGE_TEXT (state, message) {
      Vue.set(state.messages[state.selectedMessageIndex], 'message', message)
    },
    RESET_MESSAGES (state) {
      state.messages = state._messagesClone.map(message => {
        return { ...message }
      })
    }
  },
  actions: {
    fetchMessages (context) {
      return apiLib.getData('sysadmin/text-messages').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_MESSAGES', [])
          context.commit('SET_SELECTED_MESSAGE_INDEX', 0)
          context.commit('SET_MESSAGE_LOAD_STATUS', false)
        } else {
          context.commit('SET_MESSAGES', response)
          context.commit('SET_SELECTED_MESSAGE_INDEX', 0)
          context.commit('SET_MESSAGE_LOAD_STATUS', false)
        }
      })
    },
    async updateMessages ({ state, commit }) {
      const jobs = []
      for (let i = 0; state.messages.length > i; i++) {
        const message = state.messages[i]
        const originalMessage = state._messagesClone[i]

        if (message.subject !== originalMessage.subject || message.message !== originalMessage.message) {
          jobs.push(apiLib.updateData(`/sysadmin/text-messages/${message.alertMessagesId}`, {
            subject: message.subject,
            message: message.message
          }, false, false))
        }
      }

      commit('SET_MESSAGES', state.messages)
      await Promise.all(jobs)
    },
    changeSelectedAlertType ({ state, commit }, alertType) {
      const currentSelectedMessage = state.messages[state.selectedMessageIndex]
      commit(
        'SET_SELECTED_MESSAGE_INDEX',
        state.messages.findIndex(message =>
          message.alertTypeDescription === alertType &&
          message.communicationTypeDescription === currentSelectedMessage.communicationTypeDescription
        )
      )
    },
    changeSelectedCommsType ({ state, commit }, commsType) {
      const currentSelectedMessage = state.messages[state.selectedMessageIndex]
      commit(
        'SET_SELECTED_MESSAGE_INDEX',
        state.messages.findIndex(message =>
          message.communicationTypeDescription === commsType &&
          message.alertTypeDescription === currentSelectedMessage.alertTypeDescription
        )
      )
    }
  },
  getters: {
    getterAlertTypes: (state) => {
      const alertTypes = new Set()
      state.messages.forEach(message => alertTypes.add(message.alertTypeDescription))
      return Array.from(alertTypes.values())
    },
    getterCommsTypes: (state) => {
      const commsTypes = new Set()
      state.messages.forEach(message => commsTypes.add(message.communicationTypeDescription))
      return Array.from(commsTypes.values())
    },
    getterSelectedMessage: (state) => {
      return state.messages[state.selectedMessageIndex]
    },
    getterIsPristine: (state) => {
      for (let i = 0; state.messages.length > i; i++) {
        const message = state.messages[i]
        const originalMessage = state._messagesClone[i]

        if (message.subject !== originalMessage.subject || message.message !== originalMessage.message) {
          return false
        }
      }
      return true
    }
  }
}
