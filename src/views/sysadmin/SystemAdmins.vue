<template>
  <v-container>
    <BaseViewHeader
      v-if="this.$vuetify.breakpoint.mdAndDown"
      :headerIcon="headerIcon"
      :iconColor="iconColor"
      :headerText="headerText"
      hasDivider
    />
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
      item-key="username"
      searchLabel="Search Records..."
      tableTitle="System Administrator Records"
      newDialogTitle="Add a New Administrator Record"
      editDialogTitle="Edit Administrator Records"
      delDialogTitle="Confirm deletetion of selected items?"
      msgDel="Are you sure you want to delete the selected items?"
      :editRules="editRules"
      @newItem="addItem"
      @itemsEdited="editItems"
      @deleteSelected="deleteItem"
      @itemsCancelled="getItems(readUrl)"
    />
  </v-container>
</template>

<script>
import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'
import validation from '@/mixins/validation'

export default {
  name: 'SystemAdmins',
  mixins: [crudRoutines],
  components: {
    BaseDataTable
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'persons',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'System Administrators',
      crudIdKey: 'portalAuthorisedId',
      items: [],
      editRules: () => [],
      editPerms: { create: true, update: true, delete: true },
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
        {
          text: 'PortalId',
          value: 'portalAuthorisedId',
          align: 'left',
          sortable: false,
          cellType: 'tb',
          hidden: true,
          editable: false
        },
        {
          text: 'Title',
          value: 'titleId',
          align: 'left',
          sortable: false,
          cellType: 'md',
          hidden: true,
          editable: true
        },
        {
          text: 'Description',
          value: 'shortDescription',
          align: 'left',
          sortable: false,
          cellType: 'tb',
          hidden: false,
          editable: true
        },
        {
          text: 'Given Name',
          value: 'givenName',
          align: 'left',
          sortable: false,
          cellType: 'tb',
          hidden: false,
          editable: true
        },
        {
          text: 'Family Name',
          value: 'familyName',
          align: 'left',
          sortable: false,
          cellType: 'tb',
          hidden: false,
          editable: true
        },
        {
          text: 'Salutation',
          value: 'salutation',
          align: 'left',
          sortable: false,
          cellType: 'tb',
          hidden: false,
          editable: true
        },
        {
          text: 'Username',
          value: 'username',
          align: 'left',
          sortable: false,
          cellType: 'tb',
          hidden: true,
          editable: true
        },
        {
          text: 'Corporate ID',
          value: 'corporateIdentification',
          cellType: 'tb',
          hidden: true,
          editable: true
        }
      ],
      newItem: [
        {
          titleId: 0,
          cellType: 'md',
          attr: 'titleId',
          cellLabel: 'Title',
          displayVal: 'shortDescription',
          returnVal: 'titleId',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateRequired(payload)
            ]
          }
        },
        {
          givenName: ' ',
          cellType: 'tb',
          attr: 'givenName',
          cellLabel: 'Given Name',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          familyName: ' ',
          cellType: 'tb',
          attr: 'familyName',
          cellLabel: 'Family Name',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          corporateIdentification: 0,
          cellType: 'tb',
          attr: 'corporateIdentification',
          cellLabel: 'Company',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          salutation: '',
          cellType: 'tb',
          attr: 'salutation',
          cellLabel: 'Salutation',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          username: ' ',
          cellType: 'tb',
          attr: 'username',
          cellLabel: 'Username',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          password: ' ',
          cellType: 'tb',
          attr: 'password',
          cellLabel: 'Password',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateRequired(payload)
            ]
          }
        }
      ],
      defaultItem: [
        {
          titleId: 0,
          portalAuthorisedId: 0,
          givenName: '',
          familyName: '',
          corporateIdentification: '',
          username: '',
          password: ''
        }
      ],
      urls: [{ url: 'sysadmin/title', attr: 'titleId', key: 'titleId' }]
    }
  },
  methods: {
    resetItem () {
      this.newItem = [
        {
          titleId: 0,
          cellType: 'md',
          attr: 'titleId',
          cellLabel: 'Title',
          displayVal: 'shortDescription',
          returnVal: 'titleId',
          menuItems: this.newItem['titleId'].menuItems,
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          givenName: ' ',
          cellType: 'tb',
          attr: 'givenName',
          cellLabel: 'Given Name',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          familyName: ' ',
          cellType: 'tb',
          attr: 'familyName',
          cellLabel: 'Family Name',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          corporateIdentification: 0,
          cellType: 'tb',
          attr: 'corporateIdentification',
          cellLabel: 'Company',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          salutation: ' ',
          cellType: 'tb',
          attr: 'salutation',
          cellLabel: 'Family Name',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          username: ' ',
          cellType: 'tb',
          attr: 'username',
          cellLabel: 'Username',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          password: ' ',
          cellType: 'tb',
          attr: 'password',
          cellLabel: 'Password',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateRequired(payload)
            ]
          }
        }
      ]
      this.defaultItem = [
        {
          titleId: 0,
          portalAuthorisedId: 0,
          givenName: '',
          familyName: '',
          corporateIdentification: '',
          username: '',
          password: ''
        }
      ]
    },
    async setData () {
      await this.getItems('sysadmin/sysadmin')
      for (let i = 0; i < this.items.length; i++) {
        for (let item in this.items[i]) {
          if (item === null) {
            Object.defineProperty(this.items[i], 'salutation', {
              value: ' '
            })
          }
        }
      }
    }
  },
  mounted () {
    this.setData()
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
