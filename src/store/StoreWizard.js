import apiLib from '../services/apiLib.js'

export const moduleWizard = {
  state: {
    wizardPersonDetails: [],
    wizardUserDetailst: [],
    wizardAdminDetails: [],
    allPersonDetails: []
  },
  mutations: {
    // set the data
    SET_WIZARD (state, data) {
      state.getAllDetails = data
    },
    SET_PERSON_REG_DETAILS (state, data) {
      state.wizardPersonDetails = data
    },
    SET_USER_REG_DETAILS (state, data) {
      state.wizardUserDetails = data
    },
    SET_ADMIN_REG_DETAILS (state, data) {
      state.wizardAdminDetails = data
    },
    PURGE_PERSON_REG_DETAILS (state) {
      state.wizardPersonDetails = []
    },
    PURGE_USER_REG_DETAILS (state) {
      state.wizardUserDetails = []
    },
    PURGE_ADMIN_REG_DETAILS (state) {
      state.wizardAdminUserDetails = []
    }
  },
  actions: {
    async wizardUserPost (context, payload) {
      // TO DO - IMPLEMENT POST REGISTRANTS DETAILS
      // let deptPersonId = null
      let user = await apiLib.postData('cliadmin/wizard/registerUser/1', payload)
      console.log(user)
      return user
    },
    async fetchAllPersonDetails (context) {
      await apiLib.getData('register').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_WIZARD', null)
        } else {
          context.commit('SET_WIZARD', response)
        }
      })
    },
    setWizardPersonRegDetails (context, payload) {
      context.commit('SET_PERSON_REG_DETAILS', payload)
    },
    setWizardUserRegDetails (context, payload) {
      context.commit('SET_USER_REG_DETAILS', payload)
    },
    setWizardAdminRegDetails (context, payload) {
      context.commit('SET_USER_REG_DETAILS', payload)
    },
    postWizardPersonRegDetails (context, payload) {
      // TO DO - IMPLEMENT POST REGISTRANTS DETAILS
    },
    postWizardUserRegDetails (context, payload) {
      // TO DO - IMPLEMENT POST USER DETAILS
    },
    postAdminUserRegDetails (context, payload) {
      // TO DO - IMPLEMENT POST ADMIN DETAILS
    },
    purgeWizardPersonRegDetails (context, payload) {
      context.commit('PURGE_USER_REG_DETAILS', payload)
    },
    purgeWizardUserRegDetails (context, payload) {
      context.commit('PURGE_PERSON_REG_DETAILS', payload)
    },
    purgeWizardAdminRegDetails (context, payload) {
      context.commit('PURGE_ADMIN_REG_DETAILS', payload)
    }
  },
  getters: {
    getterAllPersonDetails: state => state.allPersonDetails,
    getterWizardPersonDetails: state => state.wizardPersonPost,
    getterWizardUserDetails: state => state.wizardUserPost,
    getterWizardAdminDetails: state => state.wizardUserPost
  }
}
