export const crudOperations = {
  methods: {
    async addItem (item) {
      var row = {}
      for (var i = 0; i < item.length; i++) {
        var that = this
        Object.keys(item[i]).forEach(function (key) {
          if (key === 'sync') row[item[i].cellLabel] = item[i].sync
        })
        // console.log(row);
      }
      await this.postData(this.createUrl, row)
      this.getItems(this.readUrl)
      this.resetItem()
      this.showSnack('Item Added', 'success')
    },
    async deleteItem (items) {
      var index = 0
      for (var i = 0; i < items.length; i++) {
        index = this.items.indexOf(items[i])
        // console.log(items[i][this.idKey], items[i], this.idKey)
        await this.postData(this.delUrl, { personsId: items[i][this.idKey] })
        this.items.splice(index, 1)
      }
      this.getItems(this.readUrl)
      this.showSnack('Items Deleted', 'success')
    },
    async editItems (items) {
      // console.log("FIRING!!");
      for (var i = 0; i < items.length; i++) {
        var defaultItem = this.defaultItem
        var row = {}
        var editedItems = []
        for (var j = 0; j < defaultItem.length; j++) {
          Object.keys(defaultItem[j]).forEach(function (key) {
            if (items[i][key]) defaultItem[j][key] = items[i][key]
            // console.log("Looping Inner: ", key, defaultItem[j][key], items[i][key])
          })
          await this.postData(this.updateUrl, defaultItem[j])
          console.log(this.defaultItem[j])
        }
      }
      this.showSnack('Items Edited', 'success')
      this.getItems(this.readUrl)
      this.resetItem()
      // console.log(this.defaultItem)
    },
    async getItems (url) {
      this.loading = true
      this.loadingMsg = "Loading Data - Please Wait"
      var response = await this.getData(this.readUrl)
      // console.log("Response: ", response)
      // console.log("Respone Type", Array.isArray(response))
      if (Array.isArray(response) === false) {
        this.items = []
        this.errorMsg = "Server response error: " + response + " - Please contact your system adminsitrator."
        this.loading = false
        this.loaded = false
        this.error = true
        this.errorColor
      } else if (response.length <= 0) {
        this.items = []
        this.loadedMsg = "No current records to display - There are no entries for this table."
        this.loading = false
        this.loaded = true
        this.error = false
      } else {
        // console.log("Items: ", this.items)
        this.items = response
        if (this.urls) this.setMenuItems(this.urls)
        this.loading = false
        this.loaded = false
        this.error = false
      }

    },
    showSnack (message, color) {
      this.snackColor = color
      this.snackText = message
      this.snack = true
    },
    async setMenuItems (urls) {
      if (urls !== [] || urls !== null) {
        for (var i = 0; i < urls.length; i++) {
          var menuItems = await this.getData(urls[i].url)
          var values = []
          for (var j = 0; j < menuItems.length; j++) {
            // console.log('menuItem: ', menuItems[j][urls[i].key])
            values.push(menuItems[j][urls[i].key])
          }
          for (var k = 0; k < this.newItem.length; k++) {
            if (this.newItem[k].attr === urls[i].attr) { this.newItem[k].menuItems = values }
          }
        }
      }
    }
  }
}

// export const postData = {
//   methods: {
//     postData (url, params) {
//       // this.isLoading = true
//       const response = async function () {
//         try {
//           // that.isLoading
//           const axGet = await axios({
//             method: 'post',
//             timeout: 5000,
//             headers: { 'Content-Type': 'application/json' },
//             url: 'http://172.16.16.79:3000/' + url,
//             // url: 'http://127.0.0.1:3000/' + url,
//             data: JSON.stringify(params),
//           })
//           // this.isLoading = false
//           console.log(axGet.data)
//           return axGet.data
//         } catch (err) {
//           // console.log(err)
//           return err
//         }
//       }
//       // this.isLoading = false
//       return response()
//     }
//   }
// }
