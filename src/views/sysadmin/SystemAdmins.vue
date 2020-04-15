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

      @newItem="addItem"
      @itemsEdited="editItems"
      @deleteSelected="deleteItem"
      @itemsCancelled="getItems(readUrl)"
    >
      <template v-slot:newSlot="{ item, itemKey }">
        <v-text-field
          class="ma-1"
          :label="item.cellLabel"
          v-model="item[item.attr]"
          :color="primaryColor"
          outline
          required
          validate-on-blur
          :rules="newItem[itemKey].validators"
        ></v-text-field>
      </template>
      <template v-slot:editSlot="{ item, itemKey, property }">
        <v-text-field
          :label="newItem.find(attribute => attribute.attr === itemKey).cellLabel"
          v-model="item[itemKey]"
          class="ma-1"
          :color="primaryColor"
          outline
          required
          validata-on-blur
          :rules="newItem.find(attribute => attribute.attr === itemKey).validators"
        >{{ property }}
        </v-text-field>
      </template>
    </BaseDataTable>
  </v-container>
</template>

<script>
import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'
import validation from '@/mixins/validation'

export default {
  name: 'SystemAdmins',
  mixins: [crudRoutines, validation],
  components: {
    BaseDataTable
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'persons',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'System Administrators',
      // BaseDataTable
      items: [],
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
      crudIdKey: 'portalAuthorisedId',
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
          // menuItems: []
          // validators: [
          //   value => !!value || 'Required.',
          //   value => value.length <= 20 || 'Max 20 characters',
          //   value => {
          //     if (this.alphabeticalRegEx.test(value)) {
          //       return true
          //     } else {
          //       return 'Alphabetical characters only'
          //     }
          //   }
          // ]
        },
        {
          givenName: ' ',
          cellType: 'tb',
          attr: 'givenName',
          cellLabel: 'Given Name',
          // menuItems: [],
          validators: [
            value => !!value || 'Required.',
            value => value.length <= 20 || 'Max 20 characters',
            value => {
              if (this.alphabeticalRegEx.test(value)) {
                return true
              } else {
                return 'Alphabetical characters only'
              }
            }
          ]
        },
        {
          familyName: ' ',
          cellType: 'tb',
          attr: 'familyName',
          cellLabel: 'Family Name',
          // menuItems: [],
          validators: [
            value => !!value || 'Required.',
            value => value.length <= 20 || 'Max 20 characters',
            value => {
              if (this.alphabeticalRegEx.test(value)) {
                return true
              } else {
                return 'Alphabetical characters only'
              }
            }
          ]
        },
        {
          corporateIdentification: 0,
          cellType: 'tb',
          attr: 'corporateIdentification',
          cellLabel: 'Company',
          // menuItems: [],
          validators: [
            value => !!value || 'Required.',
            value => value.length <= 20 || 'Max 20 characters',
            value => {
              if (this.alphabeticalRegEx.test(value)) {
                return true
              } else {
                return 'Alphabetical characters only'
              }
            }
          ]
        },
        {
          salutation: '',
          cellType: 'tb',
          attr: 'salutation',
          cellLabel: 'Salutation',
          // menuItems: [],
          validators: [
            value => !!value || 'Required.',
            value => value.length <= 20 || 'Max 20 characters',
            value => {
              if (this.alphabeticalRegEx.test(value)) {
                return true
              } else {
                return 'Alphabetical characters only'
              }
            }
          ]
        },
        {
          username: ' ',
          cellType: 'tb',
          attr: 'username',
          cellLabel: 'Username',
          // menuItems: [],
          validators: [
            value => !!value || 'Required.',
            value => value.length <= 20 || 'Max 20 characters',
            value => {
              if (this.alphabeticalRegEx.test(value)) {
                return true
              } else {
                return 'Alphabetical characters only'
              }
            }
          ]
        },
        {
          password: ' ',
          cellType: 'tb',
          attr: 'password',
          cellLabel: 'Password',
          // menuItems: [],
          validators: [
            value => !!value || 'Required.',
            value => value.length <= 20 || 'Max 20 characters',
            value => {
              if (this.alphabeticalRegEx.test(value)) {
                return true
              } else {
                return 'Alphabetical characters only'
              }
            }
          ]
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
          validators: [
            value => !!value || 'Required.',
            value => value.length <= 20 || 'Max 20 characters',
            value => {
              if (this.alphabeticalRegEx.test(value)) {
                return true
              } else {
                return 'Alphabetical characters only'
              }
            }
          ]
        },
        {
          givenName: ' ',
          cellType: 'tb',
          attr: 'givenName',
          cellLabel: 'Given Name',
          // menuItems: [],
          validators: [
            value => !!value || 'Required.',
            value => value.length <= 20 || 'Max 20 characters',
            value => {
              if (this.alphabeticalRegEx.test(value)) {
                return true
              } else {
                return 'Alphabetical characters only'
              }
            }
          ]
        },
        {
          familyName: ' ',
          cellType: 'tb',
          attr: 'familyName',
          cellLabel: 'Family Name',
          // menuItems: [],
          validators: [
            value => !!value || 'Required.',
            value => value.length <= 20 || 'Max 20 characters',
            value => {
              if (this.alphabeticalRegEx.test(value)) {
                return true
              } else {
                return 'Alphabetical characters only'
              }
            }
          ]
        },
        {
          corporateIdentification: 0,
          cellType: 'tb',
          attr: 'corporateIdentification',
          cellLabel: 'Company',
          // menuItems: [],
          validators: [
            value => !!value || 'Required.',
            value => value.length <= 20 || 'Max 20 characters',
            value => {
              if (this.alphabeticalRegEx.test(value)) {
                return true
              } else {
                return 'Alphabetical characters only'
              }
            }
          ]
        },
        {
          salutation: ' ',
          cellType: 'tb',
          attr: 'salutation',
          cellLabel: 'Family Name',
          // menuItems: [],
          validators: [
            value => !!value || 'Required.',
            value => value.length <= 20 || 'Max 20 characters',
            value => {
              if (this.alphabeticalRegEx.test(value)) {
                return true
              } else {
                return 'Alphabetical characters only'
              }
            }
          ]
        },
        {
          username: ' ',
          cellType: 'tb',
          attr: 'username',
          cellLabel: 'Username',
          // menuItems: [],
          validators: [
            value => !!value || 'Required.',
            value => value.length <= 20 || 'Max 20 characters',
            value => {
              if (this.alphabeticalRegEx.test(value)) {
                return true
              } else {
                return 'Alphabetical characters only'
              }
            }
          ]
        },
        {
          password: ' ',
          cellType: 'tb',
          attr: 'password',
          cellLabel: 'Password',
          // menuItems: [],
          validators: [
            value => !!value || 'Required.',
            value => value.length <= 20 || 'Max 20 characters',
            value => {
              if (this.alphabeticalRegEx.test(value)) {
                return true
              } else {
                return 'Alphabetical characters only'
              }
            }
          ]
        }
      ]
      // this.defaultItem = [
      //   {
      //     titleId: 0,
      //     portalAuthorisedId: 0,
      //     givenName: '',
      //     familyName: '',
      //     corporateIdentification: '',
      //     username: '',
      //     password: ''
      //   }
      // ]
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
