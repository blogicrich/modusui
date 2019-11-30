export const crudRoutines = {
  methods: {
    async addItem (item) {

    },
    async deleteItem (items) {

    },
    async editItems (items) {

    },
    async fetchData (action) {
      try {
        this.$store.dispatch(action)
      } catch (error) {
        // Best practice for error reporting????
        this.items = []
        this.errorMsg = 'Server response error: ' + error + ' - Please contact your system adminsitrator.'
        this.loading = false
        this.loaded = false
        this.error = true
      }
    },
    async refreshItems () {
      // await this.getItems(this.readUrl)
      this.resetItem()
      // if (this.urls) await this.setMenuItems(this.urls)
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
  },
  mounted () {
    this.fetchData('FETCH')
    // this.getItems(this.readUrl)
  }
}
