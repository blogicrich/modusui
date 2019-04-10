<template>
  <v-container class="mx-4" fluid>
    <v-layout row fill-height align-center justify-end wrap>
      <v-icon large color="primary">local_drink</v-icon>
      <h1 class="pg-header">eDroplet Management</h1>
      <v-spacer></v-spacer>
      <!-- <BaseUserSelect
      v-if="userPerms"
      :users="users"
      :selectAll="selectAll"
      :searchName="searchName"
      :multiple="multiple"
      @get-selected-user="getSelectedUser"
      />-->
    </v-layout>
    <v-divider class="mx-1 mb-4" color="#00a1cd"></v-divider>
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
      tableTitle="User's eDroplets"
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
import validation from '@/mixins/validation'

export default {
  name: 'EdropletManagement',
  mixins: [crudRoutines],
  components: {
    BaseDataTable,
    BaseUserSelect
  },
  data() {
    return {
      // BaseUserSelect
      multiple: false,
      selectAll: 'Select all',
      searchName: 'Search user..',
      users: [],
      // BaseDataTable
      crudIdKey: 'identifier',
      items: [],
      userLevel: JSON.parse(localStorage.getItem('auth')).level,
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
      updateUrl: '/cliadmin/edropman/',
      readUrl: '/cliadmin/edropman/',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'local_drink',
      iconAdd: 'build',
      headers: [
        {
          text: 'Identifier',
          align: 'left',
          sortable: false,
          value: 'userId',
          cellType: 'tb',
          hidden: true,
          editable: false
        },
        {
          text: 'User Status',
          align: 'left',
          sortable: false,
          value: 'userStatus',
          cellType: 'md',
          hidden: true,
          editable: false
        },
        {
          text: 'mac address',
          align: 'left',
          sortable: false,
          value: 'macAddress',
          cellType: 'tb',
          hidden: false,
          editable: true
        },
        {
          text: 'Friendly name',
          align: 'left',
          sortable: false,
          value: 'friendlyName',
          cellType: 'tb',
          hidden: false,
          editable: true
        },
        {
          text: 'Status',
          align: 'left',
          sortable: false,
          value: 'status',
          cellType: 'tb',
          hidden: false,
          editable: true
        },
        {
          text: 'Operational status',
          align: 'left',
          sortable: false,
          value: 'operationalStatus',
          cellType: 'tb',
          hidden: false,
          editable: true
        },
        {
          text: 'Night Light',
          align: 'left',
          sortable: false,
          value: 'nightLight',
          cellType: 'tb',
          hidden: false,
          editable: true
        }
      ],
      newItem: [
        // { identifier: 0, cellType: 'md', attr: 'identifier', cellLabel: 'id', menuItems: [], validators: [] },
        {
          userId: 0,
          cellType: 'tb',
          attr: 'userId',
          cellLabel: 'Identifier',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          userStatus: ' ',
          cellType: 'tb',
          attr: 'userStatus',
          cellLabel: 'User Status',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          macAddress: ' ',
          cellType: 'tb',
          attr: 'macAddress',
          cellLabel: 'mac address',
          menuItems: [],
          validators: payload => {
            return []
          }
        },
        {
          friendlyName: ' ',
          cellType: 'tb',
          attr: 'friendlyName',
          cellLabel: 'Friendly Name',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          status: ' ',
          cellType: 'tb',
          attr: 'status',
          cellLabel: 'Status',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          operationalStatus: ' ',
          cellType: 'tb',
          attr: 'operationalStatus',
          cellLabel: 'Operational status',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          nightLight: ' ',
          cellType: 'tb',
          attr: 'nightLight',
          cellLabel: 'Night Light',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        }
      ],
      defaultItem: [
        {
          userId: 0,
          userStatus: '',
          macAddress: '',
          friendlyName: '',
          status: '',
          operationalStatus: '',
          nightLight: ''
        }
      ]
      // urls: [
      //   { url: 'sysadmin/title', attr: 'titleId', key: 'titleId' }
      // ]
    }
  },
  computed: {
    userPerms() {
      if (this.userLevel.find(level => level === 'CLIENT ADMINISTRATOR')) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    getSelectedUser(user) {
      this.updateUrl = '/cliadmin/edropman/' + user
      this.readUrl = '/cliadmin/edropman/' + user
      this.getItems(this.readUrl)
      // this.user = user.userId
      // let vals = apiLib.getData('cliadmin/')
      console.log('USER: ', user)
      // this.getItems(this.readUrl)
    },
    async getvoiceMessage() {
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
    resetItem() {
      this.newItem = [
        {
          userId: 0,
          cellType: 'tb',
          attr: 'userId',
          cellLabel: 'Identifier',
          menuItems: [],
          validators: payload => {
            return []
          }
        },
        {
          userStatus: '',
          cellType: 'tb',
          attr: 'userStatus',
          cellLabel: 'User Status',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          macAddress: '',
          cellType: 'tb',
          attr: 'macAddress',
          cellLabel: 'mac address',
          menuItems: [],
          validators: payload => {
            return []
          }
        },
        {
          friendlyName: '',
          cellType: 'tb',
          attr: 'friendlyName',
          cellLabel: 'Friendly Name',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }

        },
        {
          status: '',
          cellType: 'tb',
          attr: 'status',
          cellLabel: 'Status',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          operationalStatus: '',
          cellType: 'tb',
          attr: 'operationalStatus',
          cellLabel: 'Operational status',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          nightLight: '',
          cellType: 'tb',
          attr: 'nightLight',
          cellLabel: 'Night Light',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        }
      ]
      this.defaultItem = [
        {
          userId: 0,
          userStatus: '',
          macAddress: '',
          friendlyName: '',
          status: '',
          operationalStatus: '',
          nightLight: ''
        }
      ]
    }
  },
  mounted() {
    this.getItems(this.readUrl)
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
