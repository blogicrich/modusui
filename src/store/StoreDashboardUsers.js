import apiLib from '../services/apiLib.js'

export const moduleDashboardUsers = {
  state: {
    dashboardUsersLoaded: false,
    dashboardUsersUpdating: false,
    dashboardUsers: [],
    selectedUser: deserialize('selectedUser')
  },
  mutations: {
    SET_DASHBOARDUSERS (state, data) {
      state.dashboardUsers = data
      state.dashboardUsersLoaded = true
    },
    SET_USER_CONTEXT (state, user) {
      if (user !== undefined || user !== null) {
        serialize('selectedUser', user)
        state.selectedUser = user
      } else {
        serialize('selectedUser', user)
        state.selectedUser = state.dashboardUsers.find(e => e.userId)
      }
    },
    DECREMENT_USER_CONTEXT (state, user) {
      console.log(state.selectedUser)
    },
    INCREMENT_USER_CONTEXT (state, user) {
      console.log(state.selectedUser)
    }
  },
  actions: {
    async fetchDashboardUsers (context) {
      const response = await apiLib.getData('carer/dashboard-users/', false, false)
      if (typeof response === 'object') {
        context.commit('SET_DASHBOARDUSERS', response)
      } else {
        context.commit('SET_DASHBOARDUSERS', [])
      }
    }
  }
}

function serialize (key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function deserialize (key) {
  if (key !== undefined) return JSON.parse(localStorage.getItem(key))
}
