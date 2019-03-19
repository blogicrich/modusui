import apiLib from '../services/apiLib.js'

export const moduleWizard = {
  state: {
    wizardPersonPost: [],
    wizardUserPost: []
  },
  actions: {
    fetchWizardUserPost () {
      return apiLib.postData('cliadmin/wizard/registerUser', this.getters.getterWizardUserPost)
    },
    fetchWizardPersonPost () {
      return apiLib.postData('cliadmin/wizard/registerPerson', this.getters.getterWizardPersonPost)
    }
  },
  getters: {
    getterWizardPersonPost: state => state.wizardPersonPost,
    getterWizardUserPost: state => state.wizardUserPost
  }
}
