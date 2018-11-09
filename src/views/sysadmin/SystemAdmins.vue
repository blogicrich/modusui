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
      getEndpoint: 'sysadget',
      postEndpoint: 'sysadcreate',
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
        { titleId: 0, cellType: 'md', cellLabel: 'titleId', },
        { givenName: '', cellType: 'md', cellLabel: 'givenName' },
        { familyName: '', cellType: 'tb', cellLabel: 'familyName' },
        { corporateIdentification: 0, cellType: 'tb', cellLabel: 'corporateIdentification' },
        { username: '', cellType: 'tb', cellLabel: 'username' },
        { mobileNo: '', cellType: 'tb', cellLabel: 'mobileNo' }
      ],
      defaultItem: [
        { titleId: 0, givenName: '', familyName: '', corporateIdentification: '', username: '' }
      ],
      menuItems: [],
      urls: [
        { url:'titleget', key:'shortDescription'},
        { url:'sysadget', key:'username'},
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
        { titleId: 0, cellType: 'tb', cellLabel: 'titleId' },
        { givenName: '', cellType: 'tb', cellLabel: 'givenName' },
        { familyName: '', cellType: 'tb', cellLabel: 'familyName' },
        { corporateIdentification: 0, cellType: 'tb', cellLabel: 'corporateIdentification' },
        { username: '', cellType: 'tb', cellLabel: 'username' },
        { mobileNo: '', cellType: 'tb', cellLabel: 'mobileNo' },
      ]
      this.defaultItem = [
        { titleId: 0, givenName: '', familyName: '', corporateIdentification: '', username: '' }
      ]
    },
    async setMenuItems (urls) {
      for (var i = 0; i < urls.length; i++) {
        var items = await this.getData(urls[i].url)
        var options = []
        for (var j= 0; j < items.length; j++) {
          if (items[j].hasOwnProperty(urls[i].key))
          options.push(items[j][urls[i].key])
        }
        this.menuItems.push({[urls[i].key]:[options]})
        console.log(options)
        console.log(this.menuItems);
      }
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
