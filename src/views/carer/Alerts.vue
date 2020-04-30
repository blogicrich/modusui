<template>
  <v-container>
    <h2
      v-if="this.$vuetify.breakpoint.mdAndDown"
      class="pg-subheader text-primary text-center mx-3"
      text-xs-center
    >System Administrators</h2>
    <BaseDataTable
      ref="baseDataTable"
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
      :editRules="editRules"
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
import validation from '@/mixins/validation'

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
      editRules: () => [],
      editPerms: { create: false, update: false, delete: false },
      loading: true,
      loaded: false,
      error: false,
      errorMsg: '',
      loadingMsg: '',
      loadedMsg: '',
      readUrl: 'carer/alerts/' + this.$store.state.userId + '/' + 1552922626,
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'warning',
      iconAdd: 'person_add',
      headers: [
        {
          text: 'datetime',
          value: 'dateTime',
          align: 'left',
          sortable: true,
          cellType: 'tb',
          hidden: false,
          editable: false
        },
        {
          text: 'Alert Type',
          value: 'description',
          align: 'left',
          sortable: false,
          cellType: 'tb',
          hidden: false,
          editable: false
        }
      ],
      newItem: [
        {
          dateTime: '',
          cellType: 'tb',
          attr: 'dateTime',
          cellLabel: 'datetime',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateTime(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          description: '',
          cellType: 'tb',
          attr: 'description',
          cellLabel: 'Alert Type',
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
          dateTime: 0,
          description: ''
        }
      ]
    }
  },
  methods: {
    resetItem () {
      this.newItem = [
        {
          dateTime: '',
          cellType: 'tb',
          attr: 'dateTime',
          cellLabel: 'datetime',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateTime(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          description: '',
          cellType: 'tb',
          attr: 'description',
          cellLabel: 'Alert Type',
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
          dateTime: 0,
          description: ''
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
