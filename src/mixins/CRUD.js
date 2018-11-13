export const crudOperations = {
  methods: {
    async setMenuItems (urls) {
      for (var i = 0; i < urls.length; i++) {
        var menuItems = await this.getData(urls[i].url)
        var values = []
        for (var j= 0; j < menuItems.length; j++) {
          // console.log('menuItem: ', menuItems[j][urls[i].key])
          values.push(menuItems[j][urls[i].key])
        }
        for (var k = 0; k < this.newItem.length; k++) {
          if (this.newItem[k].cellLabel === urls[i].attr)
            this.newItem[k].menuItems = values
        }
      }
    },
    async getItems (url) {
      this.loading = true
      this.loaded = false
      this.hide = false
      var sysadmins = await this.getData(this.getUrl)
      // console.log("fdgfdsgfsg: ", sysadmins);
      this.items = sysadmins
      this.setMenuItems(this.urls)
      this.error = false
      this.loading = false
      this.loaded = true
      this.hide = true
    },
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
