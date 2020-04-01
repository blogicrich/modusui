import apiLib from '../services/apiLib.js'

export const moduleWizard = {
  state: {
    alertTypes: [],
    communicationMethods: [],
    genders: [],
    parameters: {},
    submittedData: [],
    titles: []
  },
  mutations: {
    // set the data
    SET_ALERTTYPES (state, data) {
      state.alertTypes = data
    },
    SET_COMM_METHODS (state, data) {
      state.communicationMethods = data
    },
    SET_GENDERS (state, data) {
      state.genders = data
    },
    SET_PARAMETERS (state, data) {
      state.parameters = data
    },
    SET_TITLES (state, data) {
      state.titles = data
    },
    SET_PERSON_REG_DETAILS (state, data) {
      state.submittedData = data
    }
  },
  actions: {
    async wizardFirstUserPost (context, payload) {
      let user = await apiLib.postData('cliadmin/wizard/save-first-person-carer-details', payload, true, true).then(response => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_PERSON_REG_DETAILS', [])
        } else {
          context.commit('SET_PERSON_REG_DETAILS', payload)
        }
      })
      return user
    },
    async fetchWizardOptions (context) {
      await apiLib.getData('cliadmin/wizard/get-pre-wizard-information', true, true).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_ALERTTYPES', [])
          context.commit('SET_COMM_METHODS', [])
          context.commit('SET_GENDERS', [])
          context.commit('SET_PARAMETERS', [])
          context.commit('SET_TITLES', [])
          context.commit('SET_PERSON_REG_DETAILS', [])
        } else {
          context.commit('SET_ALERTTYPES', response.alertTypes)
          context.commit('SET_COMM_METHODS', response.communicationMethods)
          context.commit('SET_GENDERS', response.genders)
          context.commit('SET_PARAMETERS', response.parameters)
          context.commit('SET_PERSON_REG_DETAILS', response.submittedData)
          context.commit('SET_TITLES', response.titles)
        }
      })
    },
    purgeWizardRegDetails (context) {
      context.commit('SET_PERSON_REG_DETAILS', [])
    }
  },
  getters: {
    // Wizard Options
    getterWizardAlertTypes: state => state.alertTypes,
    getterWizardCommMethods: state => state.communicationMethods,
    getterWizardGenders: state => state.genders,
    getterWizardParameters: state => state.parameters,
    getterWizardTitles: state => state.titles
  }
}
