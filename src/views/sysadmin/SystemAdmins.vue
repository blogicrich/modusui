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
      @itemsEdited="edit"
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
      itemKey: 'username',
      headers: [
        {
          text: 'Title',
          align: 'left',
          sortable: false,
          value: 'titleId',
          cellType: 'md'
        },
        { text: 'Given Name', value: 'givenName', cellType: 'tb' },
        { text: 'Family Name', value: 'familyName', cellType: 'tb' },
        { text: 'CorporateId', value: 'corporateIdentification', cellType: 'tb' },
        { text: 'User Name', value: 'username', cellType: 'tb' }
      ],
      newItem: [
        { titleId: 0, cellType: 'tb', cellLabel: 'titleId' },
        { givenName: '', cellType: 'tb', cellLabel: 'givenName' },
        { familyName: '', cellType: 'tb', cellLabel: 'familyName' },
        { corporateIdentification: 0, cellType: 'tb', cellLabel: 'corporateIdentification' },
        { username: '', cellType: 'tb', cellLabel: 'username' },
        { password: '', cellType: 'tb', cellLabel: 'password' },
        { mobileNo: '', cellType: 'tb', cellLabel: 'mobileNo' },
        { email: '', cellType: 'tb', cellLabel: 'email' }

      ],
      editItem: [
          { titleId: 0, cellType: 'tb', cellLabel: 'titleId' },
          { givenName: '', cellType: 'tb', cellLabel: 'givenName' },
          { familyName: '', cellType: 'tb', cellLabel: 'familyName' },
          { corporateIdentification: 0, cellType: 'tb', cellLabel: 'corporateIdentification' },
          { username: '', cellType: 'tb', cellLabel: 'username' }
      ],
      defaultItem: [
        { titleId: 0, givenName: '', familyName: '', corporateIdentification: '', username: '' }
      ],
      menuItems: [
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' }
      ]
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
      var obj = { titleId:Number(this.defaultItem.titleId), givenName:this.defaultItem.givenName, familyName:this.defaultItem.familyName, corporateIdentification: this.defaultItem.corporateIdentification, username: this.defaultItem.username, password: this.defaultItem.password, mobileNo: this.defaultItem.mobileNo, email: this.defaultItem.email }
      // console.log('item: ', item)
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
      var obj = { titleId:Number(this.defaultItem.titleId), givenName:this.defaultItem.givenName, familyName:this.defaultItem.familyName, corporateIdentification: this.defaultItem.corporateIdentification, username: this.defaultItem.username, password: this.defaultItem.password, mobileNo: this.defaultItem.mobileNo, email: this.defaultItem.email }
      // console.log('item: ', item)
      this.postData(this.postEndpoint, obj )
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
        { password: '', cellType: 'tb', cellLabel: 'password' },
        { mobileNo: '', cellType: 'tb', cellLabel: 'mobileNo' },
        { email: '', cellType: 'tb', cellLabel: 'email' }

      ]
      this.defaultItem = [
        { titleId: 0, givenName: '', familyName: '', corporateIdentification: '', username: '' }
      ]
    }
  },
  async beforeMount () {
    this.loading = true
    var values = await this.getData('sysadget')
    console.log(values)
    this.items = values
    this.loading = false
    // this.items.splice(values, 1)
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
