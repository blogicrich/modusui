import apiLib from '../services/apiLib.js'

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
      await apiLib.postData(this.createUrl, row)
      this.refreshItems('Item Added', 'success')
      this.resetItem()
    },
    async deleteItem (items) {
      for (var i = 0; i < items.length; i++) {
        let index = this.items.indexOf(items[i])
        let id = Number(items[i][this.crudIdKey])
        // console.log(items[i], this.crudIdKey, this.delUrl, id)
        // console.log('IDDDDDDDDD: ', id)
        // console.log(this.delUrl, + '/' + items[i][this.crudIdKey])
        await apiLib.deleteData(this.delUrl + '/' + id)
        this.items.splice(index, 1)
      }
      this.getItems(this.readUrl)
      this.showSnack('Items Deleted', 'success')
    },

    async editItems (items) {
      for (var i = 0; i < items.length; i++) {
        var defaultItem = this.defaultItem
        var row = {}
        var editedItems = []
        for (var j = 0; j < defaultItem.length; j++) {
          Object.keys(defaultItem[j]).forEach(function (key) {
            if (items[i][key]) defaultItem[j][key] = items[i][key]
            // console.log("Looping Inner: ", key, defaultItem[j], items[i][key])
          })
          console.log("Update Item: ", this.defaultItem[j], this.updateUrl + '/' + defaultItem[j][this.crudIdKey], defaultItem[j])
          await apiLib.updateData(this.updateUrl + '/' + defaultItem[j][this.crudIdKey], defaultItem[j])
        }
        this.showSnack('Items Edited', 'success')
        this.getItems(this.readUrl)
      }
      if (this.newItem) {
        this.resetItem()
      }
    },
    async getItems (url) {
      this.loading = true
      this.loadingMsg = 'Loading Data - Please Wait'
      var response = await apiLib.getData(this.readUrl)
      // console.log("Response: ", response)
      // console.log("Respone Type", Array.isArray(response))
      if (Array.isArray(response) === false) {
        this.items = []
        this.errorMsg = 'Server response error: ' + response + ' - Please contact your system adminsitrator.'
        this.loading = false
        this.loaded = false
        this.error = true
        this.errorColor
      } else if (response.length <= 0) {
        this.items = []
        this.loadedMsg = 'No current records to display - There are no entries for this table.'
        this.loading = false
        this.loaded = true
        this.error = false
      } else {
        console.log("Items: ", this.items)
        this.items = response
        if (this.urls) this.setMenuItems(this.urls)
        this.loading = false
        this.loaded = false
        this.error = false
      }
    },
    async refreshItems (text, color) {
      this.showSnack(text, color)
      await this.getItems(this.readUrl)
    },
    showSnack (message, color) {
      this.snackColor = color
      this.snackText = message
      this.snack = true
    },
    async setMenuItems (urls) {
      if (urls !== [] || urls !== null) {
        for (var i = 0; i < urls.length; i++) {
          var menuItems = await apiLib.getData(urls[i].url)
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
