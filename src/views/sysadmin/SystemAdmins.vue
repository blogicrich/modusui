<template>
  <v-container>
    <h2 v-if="this.$vuetify.breakpoint.mdAndDown" class="pg-subheader text-center mx-3" text-xs-center>System Administrators</h2>
    <BaseDataTable
      :headers="headers"
      :items="items"
      :newItem="newItem"
      :primaryColor="primaryColor"
      :secondaryColor="secondaryColor"
      :recordIcon="icon"
      item-key="username"
      searchLabel="Search Records..."
      tableTitle="System Administrator Records"
      newDialogTitle="Add a New Administrator Record"
      editDialogTitle="Edit Administrator Records"
      delDialogTitle="Confirm deletetion of selected items?"
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
      delUrl: 'sysaddelete',
      updateUrl: 'sysadupdate',
      getUrl: 'sysadget',
      postUrl: 'sysadcreate',
      itemKey: 'username',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'person',
      headers: [
        { text: 'DeptPersonsId', align: 'left', sortable: false, value: 'deptPersonsId', cellType: 'tb', hidden: true, editable: false },
        { text: 'PersonsId', align: 'left', sortable: false, value: 'personsId', cellType: 'tb', hidden: true, editable: false },
        { text: 'Mobile Number', align: 'left', sortable: false, value: 'mobileNo', cellType: 'tb', hidden: true, editable: true },
        { text: 'password', align: 'left', sortable: false, value: 'password', cellType: 'tb', hidden: true, editable: true },
        { text: 'Email', align: 'left', sortable: false, value: 'email', cellType: 'tb', hidden: true, editable: true },
        { text: 'Title', align: 'left', sortable: false, value: 'titleId', cellType: 'md', hidden: false, editable: true},
        { text: 'Given Name', value: 'givenName', cellType: 'tb', hidden: false, editable: true },
        { text: 'Family Name', value: 'familyName', cellType: 'tb', hidden: false, editable: true },
        { text: 'Company', value: 'corporateIdentification', cellType: 'tb', hidden: false, editable: true },
        { text: 'User Name', value: 'username', cellType: 'tb', hidden: false, editable: true }
      ],
      newItem: [
        { titleId: 0, cellType: 'tb', cellLabel: 'titleId', menuItems: [], validators:[]  },
        { givenName: '', cellType: 'tb', cellLabel: 'givenName', menuItems: [], validators:[]  },
        { familyName: '', cellType: 'tb', cellLabel: 'familyName', menuItems: [], validators:[]  },
        { corporateIdentification: 0, cellType: 'tb', cellLabel: 'corporateIdentification', menuItems: [], validators:[] },
        { username: '', cellType: 'tb', cellLabel: 'username', menuItems: [], validators:[] },
        { mobileNo: '', cellType: 'tb', cellLabel: 'mobileNo', menuItems: [], validators:[] },
        { email: '', cellType: 'tb', cellLabel: 'email', menuItems: [], validators:[] },
        { password: '', cellType: 'tb', cellLabel: 'password', menuItems: [], validators:[] }
      ],
      defaultItem: [
        { titleId: 0, givenName: '', familyName: '', corporateIdentification: '', username: '', mobileNo: '', email: '', password: '' }
      ],
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
          console.log("defaultItem: ", this.defaultItem)
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
      this.postData(this.postUrl, obj)
      console.log("obj: ", obj)
      this.resetItem()
    },
    deleteItem (items) {
      // console.log(items)
      var index = 0
      for (var i = 0; i < items.length; i++) {
        index = this.items.indexOf(items[i])
        console.log(items[i].personsId)
        this.postData(this.delUrl, { personsId:items[i].personsId })
        this.items.splice(index, 1)
      }
      // this.postData(this.delUrl, obj)
      console.log(this.items)
    },
    editItems (items) {
      for (var i = 0; i < items.length; i++) {
        for (const property in items[i]) {
          if (items[i].hasOwnProperty(property)) {
          // console.log("asaddede: ", items[i], property);
            this.defaultItem[property] = items[i][property]
            console.log("Editing Items: ", this.defaultItem[property], items[i][property])
          }
        }
      }
      // this.items.push(this.defaultItem)
      var obj = {
        deptPersonsId: this.defaultItem.deptPersonsId,
        personsId: this.defaultItem.personsId,
        titleId: this.defaultItem.titleId,
        givenName: this.defaultItem.givenName,
        familyName: this.defaultItem.familyName,
        corporateIdentification: this.defaultItem.corporateIdentification,
        username: this.defaultItem.username,
        password: this.defaultItem.password,
        mobileNo: this.defaultItem.mobileNo,
        email: this.defaultItem.email
      }
      this.postData(this.updateUrl, obj)
      console.log("obj: ", obj)
      this.resetItem()
    },
    async getItems (url) {
      this.loading = true
      var sysadmins = await this.getData('sysadget')
      // console.log("fdgfdsgfsg: ", sysadmins);
      this.items = sysadmins
      this.setMenuItems(this.urls)
      this.loading = false
    },
    resetItem () {
      this.newItem = [
        { titleId: 0, cellType: 'tb', cellLabel: 'titleId', menuItems: [], validators:[]  },
        { givenName: '', cellType: 'tb', cellLabel: 'givenName', menuItems: [], validators:[]  },
        { familyName: '', cellType: 'tb', cellLabel: 'familyName', menuItems: [], validators:[]  },
        { corporateIdentification: 0, cellType: 'tb', cellLabel: 'corporateIdentification', menuItems: [], validators:[] },
        { username: '', cellType: 'tb', cellLabel: 'username', menuItems: [], validators:[] },
        { mobileNo: '', cellType: 'tb', cellLabel: 'mobileNo', menuItems: [], validators:[] },
        { email: '', cellType: 'tb', cellLabel: 'email', menuItems: [], validators:[] },
        { password: '', cellType: 'tb', cellLabel: 'password', menuItems: [], validators:[] },
      ]
      this.defaultItem = [
        { titleId: 0, givenName: ' ', familyName: ' ', corporateIdentification: ' ', username: ' ', mobileNo: ' ', password: ' ', email: ' ' }
      ]
    },
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
    }
  },
  created () {
    this.getItems(this.getUrl)
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
