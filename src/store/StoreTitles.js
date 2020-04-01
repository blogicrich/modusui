import apiLib from '../services/apiLib.js'

export const moduleTitles = {
  state: {
    // store the data
    titles: []
  },
  mutations: {
    // set the data
    SET_TITLES (state, data) {
      state.titles = data
    }
  },
  actions: {
    // get all data
    fetchTitles (context) {
      return apiLib.getData('sysadmin/title').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_TITLES', null)
        } else {
          context.commit('SET_TITLES', response)
        }
      })
    },
    async postTitles (context, payload) {
      if (payload) {
        if (payload.length === 1) {
          return apiLib.postData('sysadmin/title', payload).then(
            context.commit('fetchTitles')
          )
        } else if (payload.length >= 1) {
          payload.forEach(async element => {
            await apiLib.postData('sysadmin/title', element)
          })
          context.commit('fetchTitles')
        }
      } else {
        // IMPLEMENT ERROR CATCHING
      }
    },
    deleteTitles (payload) {
      return apiLib.deleteData('sysadmin/title/', payload)
    },
    updateTitles (payload) {
      return apiLib.updateData('sysadmin/title/', payload)
    }
  },
  getters: {
    // get specific data from state
    getterTitles: state => {
      return state.titlePost
    }
  }
}
