import apiLib from '@/services/apiLib.js'

export const crudRoutines = {
  methods: {
    async addItem (item) {
      // console.log('gfjkhgjkfdhgfdjkghjkfshjkgs', item)
      var row = {}
      for (var i = 0; i < item.length; i++) {
        if (item[i].sync) item[i][item[i].attr] = item[i].sync[item[i].attr]
        Object.keys(item[i]).forEach(function (key) {
          row[item[i].attr] = item[i][item[i].attr]
          // console.log(row[item[i].attr], item[i][item[i].attr])
        })
      }
      await apiLib.postData(this.createUrl, row, true, true).then(() => {
        console.log(row)
        for (var i = 0; i < item.length; i++) {
          Object.keys(item[i]).forEach(function (key) {
            // Return newItem values to null
            item[i][item[i].attr] = null
          })
        }
      })
        .catch(error => {
          console.error(error)
        })
      row = {}
      this.getItems(this.readUrl)
    },

    async deleteItem (items) {
      for (var i = 0; i < items.length; i++) {
        const index = this.items.indexOf(items[i])
        const id = (items[i][this.crudIdKey])
        await apiLib.deleteData(this.delUrl + '/' + id, true, true)
          .then(response => {
            this.items.splice(index, 1)
          })
          .catch(error => {
            console.error(error)
          })
      }
      this.getItems(this.readUrl)
    },

    async editItems (items) {
      for (var i = 0; i < items.length; i++) {
        var editedItem = {}
        var thatDefaultItem = this.defaultItem
        for (var j = 0; j < thatDefaultItem.length; j++) {
          editedItem = Object.assign({}, thatDefaultItem[j])
          Object.keys(thatDefaultItem[j]).forEach(function (key) {
            if (items[i][key]) editedItem[key] = items[i][key]
            // console.log('Looping Inner: ', key, thatDefaultItem[j], items[i][key], editedItem[key])
          })
          // console.log('Update Item: ', thatDefaultItem[j], this.updateUrl + '/' + editedItem[this.crudIdKey], editedItem)
          apiLib.updateData(this.updateUrl + '/' + editedItem[this.crudIdKey], editedItem, false, true)
            .then(() => {})
            .catch(error => {
              console.log(error)
            })
            .finally()
        }
      }
      this.getItems(this.readUrl)
    },

    async getItems (url) {
      this.loading = true
      this.loadingMsg = 'Loading Data - Please Wait'
      var response = await apiLib.getData(url, true, true)
      // console.log("Response: ", response)
      // console.log("Respone Type", Array.isArray(response))
      if (Array.isArray(response) === false) {
        this.items = []
        this.errorMsg = 'Server response error: ' + response + ' - Please contact your system administrator.'
        this.loading = false
        this.loaded = false
        this.error = true
      } else if (response.length === 0) {
        this.items = []
        this.loading = false
        this.loadedMsg = 'No current records to display - There are no entries for this table.'
        this.loaded = true
        this.error = false
        // console.log('FIRRRINGNNGNGNGNNGNGN: ', this.loadedMsg)
      } else {
        // console.log("Items: ", this.items)
        this.items = response
        if (this.urls !== undefined) await this.setMenuItems(this.urls)
        this.loading = false
        this.loaded = false
        this.error = false
      }
    },

    async refreshItems () {
      this.getItems(this.readUrl).then(
        await this.resetItem()
      )
      if (this.urls) await this.setMenuItems(this.urls)
    },

    async setMenuItems (urls) {
      if (urls !== [] || urls !== null) {
        let menuItems = []
        const values = []
        // console.log(urls)
        for (var i = 0; i < urls.length; i++) {
          if (urls[i].url) {
            menuItems = await apiLib.getData(urls[i].url, true, true)
            for (var j = 0; j < menuItems.length; j++) {
              const val = menuItems[j]
              // console.log('menuItem url: ', val)
              // values.push(menuItems[j][urls[i].key])
              values.push(val)
            }
          }
          if (urls[i].ref) {
            menuItems = urls[i].ref
            for (var k = 0; k < menuItems.length; k++) {
              const val = menuItems[k]
              // console.log('menuItem ref: ', val)
              // values.push(menuItems[j][urls[i].key])
              values.push(val)
            }
          }
          for (var l = 0; l < this.newItem.length; l++) {
            if (this.newItem[l].attr === urls[i].attr) { this.newItem[l].menuItems = values }
          }
        }
      }
    }
  }
}
