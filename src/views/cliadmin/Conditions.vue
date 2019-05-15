<template>
  <v-container fluid>
    <v-layout row fill-height align-center justify-end wrap>
      <BaseViewHeader
        class="mx-4 mb-4"
        :headerIcon="headerIcon"
        :iconColor="iconColor"
        :headerText="headerText"
        hasDivider
      />
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
      item-key="conditionsId"
      searchLabel="Search Records..."
      tableTitle="User Condition Records"
      newDialogTitle="Add a New Condition Record"
      editDialogTitle="Edit Condition Records"
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
import BaseUserSelect from '@/components/base/BaseUserSelectComponent.vue'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'
import validation from '@/mixins/validation'

export default {
  name: 'Conditions',
  mixins: [crudRoutines],
  components: {
    BaseDataTable,
    BaseUserSelect
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'local_pharmacy',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'User Conditions',
      editRules: () => [],
      userPerms: true,
      editPerms: { create: true, update: true, delete: true },
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
      delUrl: '/cliadmin/conditions/' + this.$store.state.userId,
      updateUrl: '/cliadmin/conditions',
      readUrl: '/cliadmin/conditions/' + this.$store.state.userId,
      createUrl: '/cliadmin/conditions',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'local_pharmacy',
      iconAdd: 'add',
      headers: [
        {
          text: 'conditionsId',
          align: 'left',
          sortable: true,
          value: 'conditionId',
          cellType: 'tb',
          hidden: true,
          editable: false
        },
        {
          text: 'Description',
          align: 'left',
          sortable: true,
          value: 'description',
          cellType: 'tb',
          hidden: false,
          editable: true
        },
        {
          text: 'Status',
          align: 'left',
          sortable: true,
          value: 'status',
          cellType: 'tb',
          hidden: false,
          editable: true
        }
      ],
      newItem: [
        {
          comments: '',
          cellType: 'tb',
          attr: 'comments',
          cellLabel: 'Comments',
          menuItems: [],
          validators: payload => {
            return []
          }
        },
        {
          startdate: '',
          cellType: 'tb',
          attr: 'startdate',
          cellLabel: 'Start Date',
          menuItems: [],
          validators: payload => {
            return []
          }
        },
        {
          enddate: '',
          cellType: 'tb',
          attr: 'enddate',
          cellLabel: 'End Date',
          menuItems: [],
          validators: payload => {
            return []
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
        }
      ],
      defaultItem: [
        {
          conditionsId: 0,
          userId: 0,
          comments: '',
          status: ''
        }
      ]
    }
  },
  methods: {
    resetItem () {
      this.newItem = [
        {
          comments: '',
          cellType: 'tb',
          attr: 'comments',
          cellLabel: 'Comments',
          menuItems: [],
          validators: payload => {
            return [
            ]
          }
        },
        {
          startdate: '',
          cellType: 'tb',
          attr: 'startdate',
          cellLabel: 'Start Date',
          menuItems: [],
          validators: payload => {
            return [
            ]
          }
        },
        {
          enddate: '',
          cellType: 'tb',
          attr: 'enddate',
          cellLabel: 'End Date',
          menuItems: [],
          validators: payload => {
            return [
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
            ]
          }
        }
      ]
      this.defaultItem = [
        {
          userId: 0,
          conditionsId: 0,
          comments: '',
          startdate: 0,
          enddate: 0,
          status: ''
        }
      ]
    }
  },
  async mounted () {
    this.getItems(this.readUrl)
  }
}

</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
