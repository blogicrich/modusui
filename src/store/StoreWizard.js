import apiLib from '../services/apiLib.js'

export const moduleWizard = {
  state: {
    wizardPersonPost: [],
    wizardUserPost: []
  },
  actions: {
    fetchWizardUserPost: () => apiLib.postData('cliadmin/wizard/registerUser', this.getters.getterWizardPersonPost),
    fetchWizardPersonPost: () => apiLib.postData('cliadmin/wizard/registerPerson', this.getters.getterWizardUserPost)
  },
  getters: {
    getterWizardPersonPost: state => state.wizardPersonPost,
    getterWizardUserPost: state => state.wizardUserPost
  }
}
