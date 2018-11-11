<template>
  <v-container>
    <h2 v-if="this.$vuetify.breakpoint.mdAndDown" class="pg-subheader text-center" text-xs-center>System Administrators</h2>
    <BaseDataTable
      :headers="headers"
      :items="items"
      :newItem="newItem"
      :menuItems="menuItems"
      item-key="username"
      searchLabel="Search Records..."
      tableTitle="System Administrator Records"
      btnTitle="+"
      newDialogTitle="Add a New Administrator Record"
      editDialogTitle="Edit Administrator Records"
      delDialogTitle="Confirm deletetion of selected items?"
      :newItemKey="itemKey"
      :editItemKey="itemKey"
      :headerItemKey="itemKey"
      msgDel="Are you sure you want to delete the selected items?"
      @newItem="addItem"
      @itemsEdited="editItems"
      @deleteSelected="deleteItem"
    />
  </v-container>
</template>

<script>
import { getData } from '@/mixins/apiRequests'
import { postData } from '@/mixins/apiRequests'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'
export default {
  name: 'SystemAdmins',
  mixins: [getData, postData],
  components: {
    BaseDataTable
  },
  data () {
    return {
      items: [],
      name: 'name',
      loading: true,
      // getEndpoint: 'sysadget',
      // postEndpoint: 'sysadcreate',
      delUrl: 'sysaddelete',
      updateUrl: 'sysadupdate',
      itemKey: 'username',
      headers: [
        { text: 'Title', align: 'left', sortable: false, value: 'titleId', cellType: 'md', class: 'hidden' },
        { text: 'Given Name', value: 'givenName', cellType: 'tb', class: 'hidden'},
        { text: 'Family Name', value: 'familyName', cellType: 'tb', class: 'hidden' },
        { text: 'CorporateId', value: 'corporateIdentification', cellType: 'tb', class: 'hidden' },
        { text: 'User Name', value: 'username', cellType: 'tb', class: 'hidden'},
      ],
      newItem: [
        { titleId: 0, cellType: 'md', cellLabel: 'titleId', menuItems: [] },
        { givenName: '', cellType: 'tb', cellLabel: 'givenName', menuItems: [] },
        { familyName: '', cellType: 'tb', cellLabel: 'familyName', menuItems: [] },
        { corporateIdentification: 0, cellType: 'tb', cellLabel: 'corporateIdentification', menuItems: [] },
        { username: '', cellType: 'md', cellLabel: 'username', menuItems: [] },
        { mobileNo: '', cellType: 'tb', cellLabel: 'mobileNo', menuItems: [] }
      ],
      defaultItem: [
        { titleId: 0, givenName: '', familyName: '', corporateIdentification: '', username: '' }
      ],
      menuItems: [],
      urls: [
        { url:'titleget', attr: 'titleId', key: 'shortDescription'},
        { url:'sysadget', attr: 'username', key: 'username'},
      ],
    }
  },
  methods: {
    addItem (item) {
      for (var i = 0; i < item.length; i++) {
        if (item[i].hasOwnProperty('sync')) {
          this.defaultItem[item[i].cellLabel] = item[i].sync
          console.log(item[i].cellLabel, item[i].sync)
        }
      }
      this.items.push(this.defaultItem)
      var obj = {
        titleId:Number(this.defaultItem.titleId),
        givenName:this.defaultItem.givenName,
        familyName:this.defaultItem.familyName,
        corporateIdentification: this.defaultItem.corporateIdentification,
        username: this.defaultItem.username,
        password: this.defaultItem.password,
        mobileNo: this.defaultItem.mobileNo,
        email: this.defaultItem.email
      }
      this.postData(this.postEndpoint, obj )
      console.log("obj: ", obj)
      this.resetItem()
    },
    editItems (items) {
      for (var i = 0; i < item.length; i++) {
        if (item[i].hasOwnProperty('sync')) {
          this.defaultItem[item[i].cellLabel] = item[i].sync
          console.log(item[i].cellLabel, item[i].sync)
        }
      }
      this.items.push(this.defaultItem)
      var obj = {
        titleId:Number(this.defaultItem.titleId),
        givenName:this.defaultItem.givenName,
        familyName:this.defaultItem.familyName,
        corporateIdentification: this.defaultItem.corporateIdentification,
        username: this.defaultItem.username,
        password: this.defaultItem.password,
        mobileNo: this.defaultItem.mobileNo,
        email: this.defaultItem.email
      }
      this.postData('sysadupdate', items)
      console.log("obj: ", obj)
      this.resetItem()
    },
    deleteItem (items) {
      console.log(items)
      var index = 0
      for (var i = 0; i < items.length; i++) {
        index = this.items.indexOf(items[i])
        console.log(items[i].name)
        this.items.splice(index, 1)
      }
      console.log(this.items)
    },
    resetItem () {
      this.newItem = [
        { titleId: 0, cellType: 'md', cellLabel: 'titleId', menuItems: [] },
        { givenName: '', cellType: 'tb', cellLabel: 'givenName', menuItems: [] },
        { familyName: '', cellType: 'tb', cellLabel: 'familyName', menuItems: [] },
        { corporateIdentification: 0, cellType: 'tb', cellLabel: 'corporateIdentification', menuItems: [] },
        { username: '', cellType: 'md', cellLabel: 'username', menuItems: [] },
        { mobileNo: '', cellType: 'tb', cellLabel: 'mobileNo', menuItems: [] }
      ]
      this.defaultItem = [
        { titleId: 0, givenName: '', familyName: '', corporateIdentification: '', username: '' }
      ]
    },
    async setMenuItems (urls) {
      // console.log('Fired!!!!');
      for (var i = 0; i < urls.length; i++) {
        var menuItems = await this.getData(urls[i].url)
        var values = []
        // console.log(menuItems)
        for (var j= 0; j < menuItems.length; j++) {
          console.log('menuItem: ', menuItems[j][urls[i].key])
          values.push(menuItems[j][urls[i].key])
        }
        // console.log('menu vals:', values)
        for (var k = 0; k < this.newItem.length; k++) {
          // console.log('vals: ', values)
          // values = []
          // console.log(this.newItem[k].cellLabel, urls[i].attr);
          if (this.newItem[k].cellLabel === urls[i].attr)
            this.newItem[k].menuItems = values
            // console.log('appeded vals: ', this.newItem[k].menuItems)
            // console.log('appeded vals: ', this.newItem)
        }
      }
      console.log(this.newItem);
    }
  },
  async beforeMount () {
    this.loading = true
    var sysadmins = await this.getData('sysadget')
    this.items = sysadmins
    this.setMenuItems(this.urls)
    this.loading = false
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
