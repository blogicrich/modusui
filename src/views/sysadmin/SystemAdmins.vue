<template>
  <v-container>
    <h2 v-if="this.$vuetify.breakpoint.mdAndDown" class="pg-subheader text-primary text-center mx-3" text-xs-center>System Administrators</h2>
    <BaseDataTable
      :headers="headers"
      :items="items"
      :editPerms="editPerms"
      :newItem="newItem"
      :primaryColor="primaryColor"
      :secondaryColor="secondaryColor"
      :recordIcon="icon"
      :addRecordIcon="iconAdd"
      addBtnTitle="New Administrator"
      :loading="loading"
      :loaded="loaded"
      :error="error"
      :errorMsg="errorMsg"
      :loadingMsg="loadingMsg"
      :loadedMsg="loadedMsg"
      :crudIdKey="crudIdKey"
      item-key="personsId"
      searchLabel="Search Records..."
      tableTitle="System Administrator Records"
      newDialogTitle="Add a New Administrator Record"
      editDialogTitle="Edit Administrator Records"
      delDialogTitle="Confirm deletetion of selected items?"
      msgDel="Are you sure you want to delete the selected items?"
      @newItem="addItem"
      @itemsEdited="editItems"
      @deleteSelected="deleteItem"
      @itemsCancelled="refreshItems"
    />
  </v-container>
</template>

<script>

import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'

export default {
  name: 'SystemAdmins',
  mixins: [crudRoutines],
  components: {
    BaseDataTable
  },
  data () {
    return {
      crudIdKey: 'personsId',
      items: [],
      editPerms: { create: true, update: true, delete: true },
      snackColor: 'primary',
      snackText: '',
      snack: false,
      timeout: 6000,
      loading: true,
      loaded: false,
      error: false,
      errorMsg: ' ',
      loadingMsg: ' ',
      loadedMsg: ' ',
      delUrl: 'sysadmin/sysadmin',
      updateUrl: 'sysadmin/sysadmin',
      readUrl: 'sysadmin/sysadmin',
      createUrl: 'sysadmin/sysadmin',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'person',
      iconAdd: 'person_add',
      headers: [
        { text: 'PersonsId', align: 'left', sortable: false, value: 'personsId', cellType: 'tb', hidden: true, editable: false },
        { text: 'Title', align: 'left', sortable: false, value: 'titleId', cellType: 'md', hidden: false, editable: true },
        { text: 'Given Name', value: 'givenName', cellType: 'tb', hidden: false, editable: true },
        { text: 'Family Name', value: 'familyName', cellType: 'tb', hidden: false, editable: true },
        { text: 'Salutation', value: 'salutation', cellType: 'tb', hidden: false, editable: true },
        { text: 'Status', value: 'status', cellType: 'tb', hidden: false, editable: false }
      ],
      newItem: [
        { titleId: 0, cellType: 'md', attr: 'titleId', cellLabel: 'Title', displayVal: 'shortDescription', returnVal: 'titleId', menuItems: [], validators: [] },
        { givenName: ' ', cellType: 'tb', attr: 'givenName', cellLabel: 'Given Name', menuItems: [], validators: [] },
        { familyName: ' ', cellType: 'tb', attr: 'familyName', cellLabel: 'Family Name', menuItems: [], validators: [] },
        { corporateId: 0, cellType: 'tb', attr: 'corporateIdentifier', cellLabel: 'Company', menuItems: [], validators: [] },
        { username: ' ', cellType: 'tb', attr: 'username', cellLabel: 'Username', menuItems: [], validators: [] },
      ],
      defaultItem: [
        { personsId: 0, titleId: 0, givenName: '', familyName: '', corporateId: '', username: '' }
      ],
      urls: [
        { url: 'sysadmin/title', attr: 'titleId', key: 'titleId' },
      ]
    }
  },
  methods: {
    resetItem () {
      this.newItem = [
        { titleId: 0, cellType: 'md', attr: 'titleId', cellLabel: 'Title', displayVal: 'shortDescription', returnVal: 'titleId', menuItems: [], validators: [] },
        { givenName: ' ', cellType: 'tb', attr: 'givenName', cellLabel: 'Given Name', menuItems: [], validators: [] },
        { familyName: ' ', cellType: 'tb', attr: 'familyName', cellLabel: 'Family Name', menuItems: [], validators: [] },
        { corporateId: 0, cellType: 'tb', attr: 'corporateIdentifier', cellLabel: 'Company', menuItems: [], validators: [] },
        { username: ' ', cellType: 'tb', attr: 'username', cellLabel: 'Username', menuItems: [], validators: [] },
      ]
      this.defaultItem = [
        { personsId: 0, titleId: 0, givenName: '', familyName: '', corporateId: '', username: '' }
      ]
    }
  },
  mounted () {
    this.getItems(this.readUrl)
  }
}
</script>
<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
