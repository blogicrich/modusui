import apiLib from '../services/apiLib.js'

export const moduleWizard = {
  state: {
    wizardPersonPost: [],
    wizardUserPost: [],
    wizardGet: []
  },
  mutations: {
    // set the data
    SET_WIZARD (state, data) {
      state.wizardGet = data
    }
  },
  actions: {
    fetchWizardUserPost () {
      return apiLib.postData('register', this.getters.getterWizardUserPost)
    },
    fetchWizardPersonPost () {
      return apiLib.postData('cliadmin/wizard/registerPerson', this.getters.getterWizardPersonPost)
    },
    async fetchWizardGet (context) {
      await apiLib.getData('register').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_WIZARD', null)
        } else {
          context.commit('SET_WIZARD', response)
        }
      })
    }
  },
  getters: {
    getterWizardPersonPost: state => state.wizardPersonPost,
    getterWizardUserPost: state => state.wizardUserPost
  }
}
