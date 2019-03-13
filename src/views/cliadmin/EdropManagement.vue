<template>
  <v-container>
    <v-layout row fill-height align-center justify-end wrap>
    <v-icon large color="primary">build</v-icon>
    <h1 class="pg-header">eDroplet Management</h1>
    <v-spacer></v-spacer>
    <BaseUserSelect
      v-if="userPerms"
      :users="users"
      :selectAll="selectAll"
      :searchName="searchName"
      :multiple="multiple"
      @get-selected-user="getSelectedUser"
    />
    </v-layout>
    <v-divider
      class="mx-1 mb-4"
      color="#00a1cd"
      >
    </v-divider>
    <BaseDataTable
      :headers="headers"
      :items="items"
      :editPerms="editPerms"
      :newItem="newItem"
      :primaryColor="primaryColor"
      :secondaryColor="secondaryColor"
      :recordIcon="icon"
      :addRecordIcon="iconAdd"
      addBtnTitle="New Condition"
      :loading="loading"
      :loaded="loaded"
      :error="error"
      :errorMsg="errorMsg"
      :loadingMsg="loadingMsg"
      :loadedMsg="loadedMsg"
      :crudIdKey="crudIdKey"
      item-key="accountId"
      searchLabel="Search Records..."
      tableTitle="eDroplet Records Records"
      editDialogTitle="Edit eDroplet Records"
      delDialogTitle="Confirm deletetion of selected items?"
      msgDel="Are you sure you want to delete the selected items?"
      @itemsEdited="editItems"
      @itemsCancelled="refreshItems"
    />
  </v-container>
</template>

<script>

import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import BaseUserSelect from '@/components/base/BaseUserSelectComponent.vue'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'

export default {
  name: 'EdropletManagement',
  mixins: [crudRoutines],
  components: {
    BaseDataTable,
    BaseUserSelect
  },
  data () {
    return {
      // BaseUserSelect
      multiple: false,
      selectAll: 'Select all',
      searchName: 'Search user..',
      users: [],
      // BaseDataTable
      crudIdKey: 'identifier',
      items: [],
      editPerms: { create: false, update: true, delete: false },
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
      delUrl: '/cliadmin/conditions/1',
      updateUrl: '/cliadmin/conditions/1',
      readUrl: '/cliadmin/conditions/2',
      createUrl: '/cliadmin/conditions/1',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'build',
      iconAdd: 'build',
      headers: [
        { text: 'Identifier', align: 'left', sortable: false, value: 'identifier', cellType: 'tb', hidden: true, editable: false },
        { text: 'Comments', align: 'left', sortable: false, value: 'comments', cellType: 'md', hidden: false, editable: true },
        { text: 'Start Date', value: 'startdate', cellType: 'tb', hidden: false, editable: true },
        { text: 'End Date', value: 'enddate', cellType: 'tb', hidden: false, editable: true },
        { text: 'Status', value: 'status', cellType: 'tb', hidden: false, editable: false }
      ],
      newItem: [
        // { identifier: 0, cellType: 'md', attr: 'identifier', cellLabel: 'id', menuItems: [], validators: [] },
        { comments: ' ', cellType: 'tb', attr: 'comments', cellLabel: 'Comments', menuItems: [], validators: [] },
        { startdate: 0, cellType: 'tb', attr: 'startdate', cellLabel: 'Start Date', menuItems: [], validators: [] },
        { enddate: 0, cellType: 'tb', attr: 'enddate', cellLabel: 'End Date', menuItems: [], validators: [] },
        { status: ' ', cellType: 'tb', attr: 'status', cellLabel: 'Status', menuItems: [], validators: [] }
      ],
      defaultItem: [
        { identifier: 0, comments: ' ', startdate: 0, enddate: 0, status: ' '}
      ],
      // urls: [
      //   { url: 'sysadmin/title', attr: 'titleId', key: 'titleId' }
      // ]
    }
  },
  methods: {
    getSelectedUser (user) {
      let arr = apiLib.getData(this.cliadminReadUrl + user, true).then(response => {
        this.apiData = response
      })
      // this.user = user.userId
      // let vals = apiLib.getData('cliadmin/')
      console.log("USEEEERRRRRRRRRRRRRRRR: ", user)
      // this.getItems(this.readUrl)
    },
    async getvoiceMessage () {
      // if(this.userLevel.find(level => level === 'CLIENT ADMINISTRATOR')) {
        let userData = apiLib.getData('cliadmin/users', true).then(response => {
          this.users = response
          console.log('USERS: ', response)
         })
      // }
      // if (this.userLevel.find(level => level === 'SYSTEM ADMINISTRATOR')) {
      //   await this.$store.dispatch('fetchVoiceMessagesDefaultsGet')
      //   if (this.$store.state.voiceMessages.voiceMessagesDefaultsGet) {
      //     let voiceMessageDefaultStore = this.$store.state.voiceMessages
      //       .voiceMessagesDefaultsGet
      //     for (let index = 0; index < voiceMessageDefaultStore.length; index++) {
      //       const element = voiceMessageDefaultStore[index]
      //       for (let j = 0; j < element.length; j++) {
      //         const el = element[j]
      //         this.apiData.push(el)
      //       }
      //     }
      //   }
      // }
      console.log(this.apiData, 'apiData')
    },
    resetItem () {
      this.newItem = [
        { comments: ' ', cellType: 'tb', attr: 'comments', cellLabel: 'Comments', menuItems: [], validators: [] },
        { startdate: 0, cellType: 'tb', attr: 'startdate', cellLabel: 'Start Date', menuItems: [], validators: [] },
        { enddate: 0, cellType: 'tb', attr: 'enddate', cellLabel: 'End Date', menuItems: [], validators: [] },
        { status: ' ', cellType: 'tb', attr: 'status', cellLabel: 'Status', menuItems: [], validators: [] }
      ]
      this.defaultItem = [
        { identifier: 0, comments: ' ', startdate: 0, enddate: 0, status: ' '}
      ]
    },
  },
  mounted () {
  
  }
}
</script>
<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
