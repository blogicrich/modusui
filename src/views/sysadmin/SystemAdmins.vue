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
      :addRecordIcon="iconAdd"
      :loading="loading"
      :loaded="loaded"
      :error="error"
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
import { getData, postData } from '@/mixins/apiRequests'
import { crudOperations } from '@/mixins/CRUD'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'

export default {
  name: 'SystemAdmins',
  mixins: [getData, postData, crudOperations],
  components: {
    BaseDataTable
  },
  data () {
    return {
      items: [],
      name: 'name',
      loading: true,
      loaded: false,
      error: false,
      delUrl: 'sysaddelete',
      updateUrl: 'sysadupdate',
      getUrl: 'sysadget',
      postUrl: 'sysadcreate',
      itemKey: 'username',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'person',
      iconAdd: 'person_add',
      headers: [
        { text: 'portalPersonsId', align: 'left', sortable: false, value: 'portalPersonsId', cellType: 'tb', hidden: true, editable: false },
        { text: 'DeptPersonsId', align: 'left', sortable: false, value: 'deptPersonsId', cellType: 'tb', hidden: true, editable: true },
        { text: 'PersonsId', align: 'left', sortable: false, value: 'personsId', cellType: 'tb', hidden: true, editable: true },
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
        { deptPersonsId: 0, personsId: 0, titleId: 0, givenName: '', familyName: '', corporateIdentification: '', username: '', mobileNo: '', email: '', password: '' }
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
      var a = []
      for (var i = 0; i < items.length; i++) {
        a = this.defaultItem
        console.log("Looping Outer", items[i]);
        for (var j = 0; j < a.length; j++) {
          Object.keys(a[j]).forEach(function (key) {
            console.log("Looping Inner: ", key);
          })
        // for (const property in items[i]) {
          // console.log(items[i][property], this.defaultItem[0])

            // Object.keys(items[i]).forEach(function (key) {
            //   console.log(a[j][key]);
            // })
            // if (this.defaultItem[j].hasOwnProperty(property)) {
            //   // this.defaultItem[j].property = items[i][property]
            //   // console.log(this.defaultItem[j]['email'])
            // } else {
            //   console.log(false);
            }
          // }
        }
      // this.resetItem()
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
