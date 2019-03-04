import apiLib from '@/services/apiLib'

export const crudRoutines = {
  methods: {
    // call actions
    letActionHappenGet () {
      return this.$store.dispatch('fetchSystemAdminGet')
    },
    letActionHappenPost () {
      return this.$store.dispatch('fetchSystemAdminPost')
    },
    letActionHappenDelete () {
      return this.$store.dispatch('fetchSysAdminDelete')
    },
    letActionHappenPut () {
      return this.$store.dispatch('fetchSysAdminPut')
    },
    // end call actions

    // add item (done)
    async addItem (item) {
      var row = {}
      for (var i = 0; i < item.length; i++) {
        Object.keys(item[i]).forEach(function (key) {
          if (key === 'sync') row[item[i].attr] = item[i].sync
        })
      }
      this.$store.state.systemAdmin.sysAdminpost = await row
      await this.letActionHappenPost()
      this.refreshItems('Item Added', 'success')
      this.resetItem()
    },
    // end add item

    // delete item
    async deleteItem (items) {
      var index = 0
      for (var i = 0; i < items.length; i++) {
        index = this.items.indexOf(items[i])
        this.$store.state.storeId = await items[i].personsId
        await this.letActionHappenDelete()
        this.items.splice(index, 1)
      }
      this.getItems(this.readUrl)
      this.showSnack('Items Deleted', 'success')
    },
    // end delete item

    // update item
    async editItems (items) {
      console.log("BDTC: ", items)
      for (var i = 0; i < items.length; i++) {
        var defaultItem = this.defaultItem
        for (var j = 0; j < defaultItem.length; j++) {
          Object.keys(defaultItem[j]).forEach(function (key) {
            if (items[i][key]) defaultItem[j][key] = items[i][key]
          })
          this.$store.state.storeId = await items[i].personsId
          this.$store.state.systemAdmin.sysAdminput = await defaultItem
          await this.letActionHappenPut()
        }
      }
      this.showSnack('Items Edited', 'success')
      this.getItems(this.readUrl)
      if (this.newItem) {
        this.resetItem()
      }
    },
    // end update item

    // get item (done)
    async getItems (url) {
      this.loading = true
      this.loadingMsg = 'Loading Data - Please Wait'
      await this.letActionHappenGet()
      var response = await this.$store.state.systemAdmin.sysAdminget
      // console.log('Response: ', response)
      if (Array.isArray(response) === false) {
        this.items = []
        this.errorMsg = 'Server response error: ' + response + ' - Please contact your system adminsitrator.'
        this.loading = false
        this.loaded = false
        this.error = true
      } else if (response.length <= 0) {
        this.items = []
        this.loadedMsg = 'No current records to display - There are no entries for this table.'
        this.loading = false
        this.loaded = true
        this.error = false
      } else {
        this.items = response
        if (this.urls) this.setMenuItems(this.urls)
        this.loading = false
        this.loaded = false
        this.error = false
      }
    },
    // end get item

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
            console.log('menuItem: ', menuItems[j][urls[i].attr])
            values.push(menuItems[j])//[urls[i].attr])
          }
          for (var k = 0; k < this.newItem.length; k++) {
            if (this.newItem[k].attr === urls[i].attr) { this.newItem[k].menuItems = values }
          }
        }
      }
    },
    menuValue (valueKey, row) {
      console.log("1: ", row);
      return [1,2,3]
    },
    menuText (textKey, row) {
      console.log("2: ", row);
      return ['one', 'two', 'three']
    }
  }
}
