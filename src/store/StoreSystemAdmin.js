import apiLib from '../services/apiLib.js'

export const moduleSystemAdmin = {
  state: {
    // store the data
    sysAdminget: [],
    sysAdminpost: [],
    sysAdminput: []
  },
  mutations: {
    // set the data
    SET_SYSTEMADMINGET (state, data) {
      state.sysAdminget = data
    }
  },
  actions: {
    // get all data
    fetchSystemAdminGet (context) {
      // axios data
      return apiLib.getData('sysadmin/sysadmin').then((response) => {
        return apiLib.getData('sysAdmin/title').then((title) => {
          let array = []
          let counter = 0
          for (let i = 0; i < response.length; i++) {
            let titles = response[i].titleId - 1
            let userTitle = title[titles]
            array.push({ 'personsId': response[i].personsId, 'titleId': response[i].titleId, 'shortDescription': userTitle.shortDescription, 'titleLong': userTitle.longDescription, 'salution': response[i].salution, 'givenName': response[i].givenName, 'familyName': response[i].familyName, 'status': response[i].status })
            if (counter === (response.length - 1)) {
              context.commit('SET_SYSTEMADMINGET', array)
            } else {
              counter++
            }
          }
        })
      })
        .finally(() => {
        })
    },
    fetchSystemAdminPost () {
      return apiLib.postData('sysadmin/sysadmin', this.getters.getterSysAdminPost)
    },
    fetchSysAdminDelete () {
      return apiLib.deleteData('sysadmin/sysadmin/' + this.getters.getterStoreId)
    },
    fetchSysAdminPut () {
      return apiLib.updateData('sysadmin/sysadmin/' + this.getters.getterStoreId, this.getters.getterSysAdminPut)
    }
  },
  getters: {
    // get specific data
    getterSysAdminPost: state => {
      return state.sysAdminpost
    },
    getterSysAdminPut: state => {
      return state.sysAdminput
    }
  }
}
