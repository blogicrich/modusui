import apiLib from '../services/apiLib.js'

export const moduleSystemAdminData = {
  state: {
    // store the data
    sysAdminget: [],
    sysAdminpost: [],
    sysAdminput: [],
    storeId: [],
    url: []
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
      // console.log('iii');
      // axios data
      return apiLib.getData(this.getters.getterUrl).then((response) => {
        return apiLib.getData('sysAdmin/title').then((title) => {
          let array = []
          let counter = 0
          for (let i = 0; i < response.length; i++) {
            let titles = response[i].titleId - 1
            let userTitle = title[titles]
            array.push({ 'personsId': response[i].personsId, 'titleId': response[i].titleId, 'titleShort': userTitle.shortDescription, 'titleLong': userTitle.longDescription, 'salution': response[i].salution, 'givenName': response[i].givenName, 'familyName': response[i].familyName, 'status': response[i].status })
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
      return apiLib.postData(this.getters.getterUrl, this.getters.getterDataPost)
    },
    fetchSysAdminDelete () {
      return apiLib.deleteData(this.getters.getterUrl + this.getters.getterStoreId)
    },
    fetchSysAdminPut () {
      // console.log('sysadmin/sysadmin/' + this.getters.getterStoreId)
      return apiLib.updateData(this.getters.getterUrl + this.getters.getterStoreId, this.getters.getterDataPut)
    }
  },
  getters: {
    // get specific data
    getterDataPost: state => {
      return state.sysAdminpost
    },
    getterStoreId: state => {
      return state.storeId
    },
    getterDataPut: state => {
      return state.sysAdminput
    },
    getterUrl: state => {
      return state.url
    }
  }
}
