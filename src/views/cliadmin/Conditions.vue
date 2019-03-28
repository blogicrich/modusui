<template>
  <v-container fluid >
    <v-layout class="mx-4" row fill-height align-center justify-end wrap>
    <v-icon v-if="items.length > 0" large color="primary">local_pharmacy</v-icon>
    <h1 v-if="items.length > 0" class="pg-header">Conditions</h1>
    <v-spacer></v-spacer>
    <BaseUserSelect
      :users="users"
      :selectAll="selectAll"
      :searchName="searchName"
      :multiple="multiple"
      @get-selected-user="getSelectedUser"
    />
    </v-layout>
    <v-container v-if="items.length > 0" fluid>
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
      item-key="conditionsId"
      searchLabel="Search Records..."
      tableTitle="User Condition Records"
      newDialogTitle="Add a New Condition Record"
      editDialogTitle="Edit Condition Records"
      delDialogTitle="Confirm deletetion of selected items?"
      msgDel="Are you sure you want to delete the selected items?"
      @newItem="addItem"
      @itemsEdited="editItems"
      @deleteSelected="deleteItem"
      @itemsCancelled="refreshItems"
    />
  </v-container>
  </v-container>
</template>

<script>

import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import BaseUserSelect from '@/components/base/BaseUserSelectComponent.vue'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'
import apiLib from '@/services/apiLib.js'

export default {
  name: 'Conditions',
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
      userPerms: true,
      editPerms: { create: true, update: true, delete: true },
      // BaseDataTable
      crudIdKey: 'conditionsId',
      items: [],
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
      delUrl: '/cliadmin/conditions',
      updateUrl: '/cliadmin/conditions',
      readUrl: '/cliadmin/conditions',
      createUrl: '/cliadmin/conditions',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'local_pharmacy',
      iconAdd: 'add',
      headers: [
        { text: 'conditionsId', align: 'left', sortable: true, value: 'conditionId', cellType: 'tb', hidden: true, editable: false },
        { text: 'Comments', align: 'left', sortable: true, value: 'comments', cellType: 'tb', hidden: false, editable: true },
        { text: 'Start Date', align: 'left', sortable: true, value: 'startdate', cellType: 'tb', hidden: false, editable: true },
        { text: 'End Date', align: 'left', sortable: true, value: 'enddate', cellType: 'tb', hidden: false, editable: true },
        { text: 'Status', align: 'left', sortable: true, value: 'status', cellType: 'tb', hidden: false, editable: true }
      ],
      newItem: [
        { comments: ' ', cellType: 'tb', attr: 'comments', cellLabel: 'Comments', menuItems: [], validators: [] },
        { startdate: ' ', cellType: 'tb', attr: 'startdate', cellLabel: 'Start Date', menuItems: [], validators: [] },
        { enddate: ' ', cellType: 'tb', attr: 'enddate', cellLabel: 'End Date', menuItems: [], validators: [] },
        { status: ' ', cellType: 'tb', attr: 'status', cellLabel: 'Status', menuItems: [], validators: [] }
      ],
      defaultItem: [
        { conditionsId: 0, comments: ' ', startdate: 0, enddate: 0, status: ' ' }
      ]
    }
  },
  methods: {
    getSelectedUser (user) {
      // let arr = apiLib.getData(this.cliadminReadUrl + user, true).then(response => {
      //   this.apiData = response
      // })
      this.createUrl = '/cliadmin/conditions/' + user
      this.readUrl = '/cliadmin/conditions/' + user
      this.updateUrl = '/cliadmin/conditions/' + user
      this.delUrl = '/cliadmin/conditions/' + user
      this.getItems(this.readUrl)
      // this.user = user.userId
      // let vals = apiLib.getData('cliadmin/')
      // console.log("USEEEERRRRRRRRRRRRRRRR: ", user)
      // this.getItems(this.readUrl)
    },
    getUsersData () {
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
      // console.log(this.apiData, 'apiData')
    },
    resetItem () {
      this.newItem = [
        { comments: ' ', cellType: 'tb', attr: 'comments', cellLabel: 'Comments', menuItems: [], validators: [] },
        { startdate: ' ', cellType: 'tb', attr: 'startdate', cellLabel: 'Start Date', menuItems: [], validators: [] },
        { enddate: ' ', cellType: 'tb', attr: 'enddate', cellLabel: 'End Date', menuItems: [], validators: [] },
        { status: ' ', cellType: 'tb', attr: 'status', cellLabel: 'Status', menuItems: [], validators: [] }
      ]
      this.defaultItem = [
        { conditionsId: 0, comments: ' ', startdate: 0, enddate: 0, status: ' ' }
      ]
    }
  },
  mounted () {
    this.getUsersData()
  }
}
</script>
<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
