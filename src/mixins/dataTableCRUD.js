import apiLib from '@/services/apiLib.js'

export const crudRoutines = {
  methods: {
    async addItem (item) {
      var row = {}
      for (var i = 0; i < item.length; i++) {
        Object.keys(item[i]).forEach(function (key) {
          // console.log(item[i].sync)
          if (key === 'sync') row[item[i].attr] = item[i].sync
        })
      }
      // console.log('data: ', row)
      await apiLib.postData(this.createUrl, row, true, true).then(response => {
        return response
      })
        .catch(error => {
          console.error(error)
        })
      this.refreshItems()
    },

    async deleteItem (items) {
      for (var i = 0; i < items.length; i++) {
        let index = this.items.indexOf(items[i])
        let id = (items[i][this.crudIdKey])
        // console.log(items[i], this.crudIdKey, this.delUrl, id)
        // console.log('id: ', id)
        // console.log(this.delUrl, + '/' + items[i][this.crudIdKey])
        await apiLib.deleteData(this.delUrl + '/' + id, true, true)
          .then(response => {
            this.items.splice(index, 1)
          })
          .catch(error => {
            console.error(error)
          })
      }
      this.refreshItems()
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
      this.refreshItems()
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
      await this.getItems(this.readUrl)
      await this.resetItem()
      if (this.urls) await this.setMenuItems(this.urls)
    },

    async setMenuItems (urls) {
      if (urls !== [] || urls !== null) {
        for (var i = 0; i < urls.length; i++) {
          var menuItems = await apiLib.getData(urls[i].url, true, true)
          var values = []
          for (var j = 0; j < menuItems.length; j++) {
            let val = menuItems[j]
            // console.log('menuItem: ', val)
            // values.push(menuItems[j][urls[i].key])
            values.push(val)
          }
          for (var k = 0; k < this.newItem.length; k++) {
            if (this.newItem[k].attr === urls[i].attr) { this.newItem[k].menuItems = values }
          }
        }
      }
    }
  }
}
