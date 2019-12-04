<template>
  <v-container fluid>
    <v-layout row fill-height align-center justify-end wrap>
      <BaseViewHeader
        class="mx-2 mb-4"
        :headerIcon="headerIcon"
        :iconColor="iconColor"
        :headerText="headerText"
        hasDivider
      />
      <v-spacer></v-spacer>
    </v-layout>
    <BaseDataTable
      class="mx-4"
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
      item-key="macAddress"
      searchLabel="Search Records..."
      tableTitle="User's eDroplets"
      editDialogTitle="Edit eDroplet Records"
      delDialogTitle="Confirm deletetion of selected items?"
      msgDel="Are you sure you want to delete the selected items?"
      :editRules="editRules"
      @itemsEdited="editItems"
      @itemsCancelled="refreshItems"
    />
  </v-container>
</template>

<script>
import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'
import validation from '@/mixins/validation'

export default {
  name: 'EdropletManagement',
  mixins: [crudRoutines, validation],
  components: {
    BaseDataTable
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'local_drink',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'eDroplet Management',
      // BaseDataTable
      crudIdKey: 'identifier',
      items: [],
      userLevel: JSON.parse(localStorage.getItem('auth')).level,
      editPerms: { create: false, update: true, delete: false },
      editRules: payload => {
        return [this.validateAlphabetical(payload), this.validateRequired(payload)]
      },
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
        // {
        //   text: 'Friendly name',
        //   align: 'left',
        //   sortable: false,
        //   value: 'friendlyName',
        //   cellType: 'tb',
        //   hidden: false,
        //   editable: true
        // },
        // {
        //   text: 'Status',
        //   align: 'left',
        //   sortable: false,
        //   value: 'status',
        //   cellType: 'tb',
        //   hidden: false,
        //   editable: true
        // },
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
              this.validateAlphabetical(payload),
              this.validateRequired(payload)
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
              this.validateAlphabetical(payload),
              this.validateRequired(payload)
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
        // {
        //   friendlyName: ' ',
        //   cellType: 'tb',
        //   attr: 'friendlyName',
        //   cellLabel: 'Friendly Name',
        //   menuItems: [],
        //   validators: payload => {
        //     return [
        //       this.validateAlphabetical(payload),
        //       this.validateRequired(payload)
        //     ]
        //   }
        // },
        // {
        //   status: ' ',
        //   cellType: 'tb',
        //   attr: 'status',
        //   cellLabel: 'Status',
        //   menuItems: [],
        //   validators: payload => {
        //     return [
        //       this.validateAlphabetical(payload),
        //       this.validateRequired(payload)
        //     ]
        //   }
        // },
        {
          operationalStatus: ' ',
          cellType: 'tb',
          attr: 'operationalStatus',
          cellLabel: 'Operational status',
          menuItems: [],
          validators: payload => {
            return [
              this.validateAlphabetical(payload),
              this.validateRequired(payload)
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
              this.validateAlphabetical(payload),
              this.validateRequired(payload)
            ]
          }
        }
      ],
      defaultItem: [
        {
          userId: 0,
          userStatus: '',
          macAddress: '',
          // friendlyName: '',
          // status: '',
          operationalStatus: '',
          nightLight: ''
        }
      ]
      // urls: [
      //   { url: 'sysadmin/title', attr: 'titleId', key: 'titleId' }
      // ]
    }
  },
  methods: {
    resetItem () {
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
              this.validateAlphabetical(payload),
              this.validateRequired(payload)
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
        // {
        //   friendlyName: '',
        //   cellType: 'tb',
        //   attr: 'friendlyName',
        //   cellLabel: 'Friendly Name',
        //   menuItems: [],
        //   validators: payload => {
        //     return [
        //       this.validateAlphabetical(payload),
        //       this.validateRequired(payload)
        //     ]
        //   }

        // },
        // {
        //   status: '',
        //   cellType: 'tb',
        //   attr: 'status',
        //   cellLabel: 'Status',
        //   menuItems: [],
        //   validators: payload => {
        //     return [
        //       this.validateAlphabetical(payload),
        //       this.validateRequired(payload)
        //     ]
        //   }
        // },
        {
          operationalStatus: '',
          cellType: 'tb',
          attr: 'operationalStatus',
          cellLabel: 'Operational status',
          menuItems: [],
          validators: payload => {
            return [
              this.validateAlphabetical(payload),
              this.validateRequired(payload)
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
              this.validateAlphabetical(payload),
              this.validateRequired(payload)
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
  mounted () {
    this.getItems(this.readUrl)
  }
}

</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
