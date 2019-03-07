import apiLib from '../services/apiLib.js'

export const moduleTitles = {
  state: {
    // store the data
    titleGet: [],
    titlePost: [],
    titlePut: []
  },
  mutations: {
    // set the data
    SET_TITLES (state, data) {
      state.titleGet = data
    }
  },
  actions: {
    // get all data
    fetchTitlesGet (context) {
      return apiLib.getData('sysadmin/title').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_TITLES', null)
        } else {
          context.commit('SET_TITLES', response)
        }
      })
    },
    fetchTitlesPost () {
      return apiLib.postData('sysadmin/title', this.getters.getterTitlePost)
    },
    fetchTitlesDelete () {
      return apiLib.deleteData('sysadmin/title/' + this.getters.getterStoreId)
    },
    fetchTitlesPut () {
      return apiLib.updateData('sysadmin/title/' + this.getters.getterStoreId, this.getters.getterTitlePut)
    }
  },
  getters: {
    // get specific data
    getterTitlePost: state => {
      return state.titlePost
    },
    getterTitlePut: state => {
      return state.titlePut
    }
  }
}
