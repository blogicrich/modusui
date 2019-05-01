<template>
  <v-container>
    <BaseViewHeader
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
      addBtnTitle="New Gender Option"
      :loading="loading"
      :error="error"
      :loaded="loaded"
      :errorMsg="errorMsg"
      :loadingMsg="loadingMsg"
      :loadedMsg="loadedMsg"
      item-key="genderId"
      searchLabel="Search Records..."
      tableTitle="Gender Option Records"
      newDialogTitle="Add a New Gender Option"
      editDialogTitle="Edit Gender Option Records"
      delDialogTitle="Confirm deletetion of selected items?"
      msgDel="Are you sure you want to delete the selected items?"
      :editRules="editRules"
      @newItem="addItem"
      @itemsEdited="editItems"
      @deleteSelected="deleteItem"
      @itemsCancelled="refreshItems"
    />
    <v-snackbar v-model="snack" bottom :timeout="timeout" :color="snackColor">
      {{ snackText }}
      <v-btn flat @click="snack = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'
import validation from '@/mixins/validation'

export default {
  name: 'ContainerTypes',
  mixins: [crudRoutines],
  components: {
    BaseDataTable
  },
  data () {
    return {
      // BaseViewHeader 
      headerIcon: 'wc',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Gender Options',
      // BaseDataTable
      items: [],
      editPerms: { create: true, update: true, delete: true },
      crudIdKey: 'genderId',
      snackColor: '',
      editRules: payload => [],
      snackText: '',
      snack: false,
      timeout: 6000,
      loading: true,
      loaded: false,
      error: false,
      errorMsg: ' ',
      loadingMsg: ' ',
      loadedMsg: ' ',
      delUrl: 'sysadmin/gender-options',
      updateUrl: 'sysadmin/gender-options',
      readUrl: 'sysadmin/gender-options',
      createUrl: 'sysadmin/gender-options',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'wc',
      iconAdd: 'add',
      headers: [
        {
          text: 'genderId',
          align: 'left',
          sortable: true,
          value: 'genderId',
          cellType: 'tb',
          hidden: true,
          editable: true
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
          text: 'Target Consumption',
          align: 'left',
          sortable: true,
          value: 'targetConsumption',
          cellType: 'tb',
          hidden: false,
          editable: true
        }
      ],
      newItem: [
        {
          description: '',
          cellType: 'tb',
          attr: 'description',
          cellLabel: 'Description',
          menuItems: [],
          validators: payload => {
            return [validation.validateAlphabetical(payload), validation.validateRequired(payload)]
          }
        },
        {
          volume: '',
          cellType: 'tb',
          attr: 'targetConsumption',
          cellLabel: 'Target Consumption',
          menuItems: [],
          validators: payload => {
            return [validation.validateRequired(payload)]
          }
        }
      ],
      defaultItem: [{ genderId: 0, description: '', targetConsumption: 0 }]
    }
  },
  methods: {
    resetItem () {
      this.newItem = [
        {
          text: 'Description',
          align: 'left',
          sortable: true,
          value: 'description',
          cellType: 'tb',
          hidden: false,
          editable: true,
          validators: payload => {
            return [validation.validateAlphabetical(payload), validation.validateRequired(payload)]
          }
        },
        {
          text: 'Target Consumption',
          align: 'left',
          sortable: true,
          value: 'targetConsumption',
          cellType: 'tb',
          hidden: false,
          editable: true,
          validators: payload => {
            return [validation.validateRequired(payload)]
          }
        }
      ]
      this.defaultItem = [
        { genderId: 0, description: '', targetConsumption: 0 }
      ]
    },
    notify (items) {
      this.showSnack(items.snackText, items.snackColor)
    }
  },
  created () {
    this.getItems(this.readUrl)
  }
}

</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
