<template>
  <v-container>
    <h2 v-if="this.$vuetify.breakpoint.mdAndDown" class="pg-subheader text-primary text-center mx-3" text-xs-center>System Administrators</h2>
    <BaseDataTable
      :headers="headers"
      :items="items"
      :editPerms="editPerms"
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
      item-key="username"
      searchLabel="Search Records..."
      tableTitle="Alerts"
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
import { log } from 'util';

export default {
  name: 'SystemAdmins',
  mixins: [crudRoutines],
  components: {
    BaseDataTable
  },
  data () {
    return {
      crudIdKey: 'portalAuthorisedId',
      items: [],
      editPerms: { create: false, update: false, delete: false },
      loading: true,
      loaded: false,
      error: false,
      errorMsg: ' ',
      loadingMsg: ' ',
      loadedMsg: ' ',
      readUrl: 'carer/alerts/',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'warning',
      iconAdd: 'person_add',
      headers: [
        { text: 'PortalId', value: 'portalAuthorisedId', align: 'left', sortable: false, cellType: 'tb', hidden: true, editable: false },
        { text: 'Title', value: 'titleId', align: 'left', sortable: false, cellType: 'md', hidden: true, editable: true },
        { text: 'Description', value: 'shortDescription', align: 'left', sortable: false, cellType: 'tb', hidden: false, editable: true },
        { text: 'Given Name', value: 'givenName', align: 'left', sortable: false, cellType: 'tb', hidden: false, editable: true },
        { text: 'Family Name', value: 'familyName', align: 'left', sortable: false, cellType: 'tb', hidden: false, editable: true },
        { text: 'Salutation', value: 'salutation', align: 'left', sortable: false, cellType: 'tb', hidden: false, editable: true },
        { text: 'Username', value: 'username', align: 'left', sortable: false, cellType: 'tb', hidden: true, editable: true },
        { text: 'Corporate ID', value: 'corporateIdentification', cellType: 'tb', hidden: true, editable: true },
      ],
      newItem: [
        { titleId: 0, cellType: 'md', attr: 'titleId', cellLabel: 'Title', displayVal: 'shortDescription', returnVal: 'titleId', menuItems: [], validators: [] },
        { givenName: ' ', cellType: 'tb', attr: 'givenName', cellLabel: 'Given Name', menuItems: [], validators: [] },
        { familyName: ' ', cellType: 'tb', attr: 'familyName', cellLabel: 'Family Name', menuItems: [], validators: [] },
        { corporateIdentification: 0, cellType: 'tb', attr: 'corporateIdentification', cellLabel: 'Company', menuItems: [], validators: [] },
        { salutation: ' ', cellType: 'tb', attr: 'salutation', cellLabel: 'Salutation', menuItems: [], validators: [] },
        { username: ' ', cellType: 'tb', attr: 'username', cellLabel: 'Username', menuItems: [], validators: [] },
        { password: ' ', cellType: 'tb', attr: 'password', cellLabel: 'Password', menuItems: [], validators: [] },
      ],
      defaultItem: [
        { titleId: 0, portalAuthorisedId: 0, givenName: '', familyName: '', corporateIdentification: '', username: '', password: '' }
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
        { corporateIdentification: 0, cellType: 'tb', attr: 'corporateIdentification', cellLabel: 'Company', menuItems: [], validators: [] },
        { salutation: ' ', cellType: 'tb', attr: 'salutation', cellLabel: 'Family Name', menuItems: [], validators: [] },
        { username: ' ', cellType: 'tb', attr: 'username', cellLabel: 'Username', menuItems: [], validators: [] },
        { password: ' ', cellType: 'tb', attr: 'password', cellLabel: 'Password', menuItems: [], validators: [] },
      ]
      this.defaultItem = [
        { titleId: 0, portalAuthorisedId: 0, givenName: '', familyName: '', corporateIdentification: '', username: '', password: '' }
      ]
    },
    async setData () {
      await this.getItems('sysadmin/sysadmin')
      // console.log('jkfvjgklfdslgjfljgfjdsklgjfdslgklfdsjgjfldjglfdsgfdsgfdsgfdsgfds')
      for (let i = 0; i < this.items.length; i++) {
        for (let item in this.items[i]) {
          if (item === null) {
            Object.defineProperty(this.items[i], 'salutation', {
              value: ' '
            })
          }
        }
      }
    },
  },
  mounted () {
    this.getItems(this.readUrl)
  }
}
</script>
<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
