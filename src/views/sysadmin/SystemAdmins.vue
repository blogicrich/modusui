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
      addBtnTitle="New Administrator"
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
      @itemsCancelled="notify"
    />
  <v-snackbar
    v-model="snack"
    bottom
    :timeout="timeout"
    :color="snackColor"
  >
  <!-- <v-snackbar v-if="this.$vuetify.breakpoint.xsAndUp" v-model="snack" :timeout="3000" :color="snackColor"> -->
    {{ snackText }}
    <v-btn flat @click="snack = false">Close</v-btn>
  </v-snackbar>
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
      snackColor: 'primary',
      snackText: '',
      snack: false,
      timeout: 6000,
      loading: true,
      loaded: false,
      error: false,
      delUrl: 'sysaddelete',
      updateUrl: 'sysadupdate',
      readUrl: 'sysadget',
      createUrl: 'sysadcreate',
      itemKey: 'username',
      idKey: 'personsId',
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
        { text: 'Title', align: 'left', sortable: false, value: 'titleId', cellType: 'md', hidden: false, editable: true },
        { text: 'Given Name', value: 'givenName', cellType: 'tb', hidden: false, editable: true },
        { text: 'Family Name', value: 'familyName', cellType: 'tb', hidden: false, editable: true },
        { text: 'Company', value: 'corporateIdentification', cellType: 'tb', hidden: false, editable: true },
        { text: 'User Name', value: 'username', cellType: 'tb', hidden: false, editable: true }
      ],
      newItem: [
        { titleId: 0, cellType: 'md', attr: 'titleId', cellLabel: 'Title', menuItems: [], validators: [] },
        { givenName: ' ', cellType: 'tb', attr: 'givenName', cellLabel: 'Given Name', menuItems: [], validators: [] },
        { familyName: ' ', cellType: 'tb', attr: 'familyName', cellLabel: 'Family Name', menuItems: [], validators: [] },
        { corporateIdentification: 0, cellType: 'tb', attr: 'corporateIdentification', cellLabel: 'Company', menuItems: [], validators: [] },
        { username: ' ', cellType: 'tb', attr: 'username', cellLabel: 'Username', menuItems: [], validators: [] },
        { mobileNo: ' ', cellType: 'tb', attr: 'mobileNo', cellLabel: 'Mobile Number', menuItems: [], validators: [] },
        { email: ' ', cellType: 'tb', attr: 'email', cellLabel: 'Email', menuItems: [], validators: [] },
        { password: ' ', cellType: 'tb', attr: 'password', cellLabel: 'Password', menuItems: [], validators: [] }
      ],
      defaultItem: [
        { deptPersonsId: 0, personsId: 0, titleId: 0, givenName: '', familyName: '', corporateIdentification: '', username: '', mobileNo: '', email: '', password: '' }
      ],
      urls: [
        { url: 'titleget', attr: 'titleId', key: 'titleId' },
        { url: 'sysadget', attr: 'username', key: 'username' }
      ]
    }
  },
  methods: {
    resetItem () {
      this.newItem = [
        { titleId: 0, cellType: 'md', attr: 'titleId', cellLabel: 'Title', menuItems: [], validators: [] },
        { givenName: ' ', cellType: 'tb', attr: 'givenName', cellLabel: 'Given Name', menuItems: [], validators: [] },
        { familyName: ' ', cellType: 'tb', attr: 'familyName', cellLabel: 'Family Name', menuItems: [], validators: [] },
        { corporateIdentification: 0, cellType: 'tb', attr: 'corporateIdentification', cellLabel: 'Company', menuItems: [], validators: [] },
        { username: ' ', cellType: 'tb', attr: 'username', cellLabel: 'Username', menuItems: [], validators: [] },
        { mobileNo: ' ', cellType: 'tb', attr: 'mobileNo', cellLabel: 'Mobile Number', menuItems: [], validators: [] },
        { email: ' ', cellType: 'tb', attr: 'email', cellLabel: 'Email', menuItems: [], validators: [] },
        { password: ' ', cellType: 'tb', attr: 'password', cellLabel: 'Password', menuItems: [], validators: [] }
      ]
      this.defaultItem = [
        { deptPersonsId: 0, personsId: 0, titleId: 0, givenName: '', familyName: '', corporateIdentification: '', username: '', mobileNo: '', email: '', password: '' }
      ]
    },
    notify(items) {
      this.showSnack(items.snackText, items.snackColor)
    }
  },
  created () {
    this.getItems(this.readUrl)
  }
}
</script>
<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
