<template>
  <v-container>
    <h2 v-if="this.$vuetify.breakpoint.mdAndDown" class="pg-subheader text-primary text-center mx-3" text-xs-center>Container Types</h2>
    <BaseDataTable
      :headers="headers"
      :items="items"
      :newItem="newItem"
      :primaryColor="primaryColor"
      :secondaryColor="secondaryColor"
      :recordIcon="icon"
      :addRecordIcon="iconAdd"
      addBtnTitle="New Container Type"
      :loading="loading"
      :loaded="loaded"
      :error="error"
      :errorMsg="errorMsg"
      :loadingMsg="loadingMsg"
      :loadedMsg="loadedMsg"
      item-key="conditionsId"
      searchLabel="Search Records..."
      tableTitle="Condition Records"
      newDialogTitle="Add a New Condition Type"
      editDialogTitle="Edit Condition Type Records"
      delDialogTitle="Confirm deletetion of selected items?"
      msgDel="Are you sure you want to delete the selected items?"
      @newItem="addItem"
      @itemsEdited="editItems"
      @deleteSelected="deleteItem"
      @itemsCancelled="refreshItems"
    />
  <v-snackbar
    v-model="snack"
    bottom
    :timeout="timeout"
    :color="snackColor"
  >
    {{ snackText }}
    <v-btn flat @click="snack = false">Close</v-btn>
  </v-snackbar>
  </v-container>
</template>

<script>

import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'

export default {
  name: 'ContainerTypes',
  mixins: [crudRoutines],
  components: {
    BaseDataTable
  },
  data () {
    return {
      items: [],
      crudIdKey: 'conditionsId',
      snackColor: '',
      snackText: '',
      snack: false,
      timeout: 6000,
      loading: true,
      loaded: false,
      error: false,
      errorMsg: ' ',
      loadingMsg: ' ',
      loadedMsg: ' ',
      delUrl: 'sysadmin/condition-options',
      updateUrl: 'sysadmin/condition-options',
      readUrl: 'sysadmin/condition-options',
      createUrl: 'sysadmin/condition-options',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'local_pharmacy',
      iconAdd: 'add',
      headers: [
        { text: 'conditionsId', align: 'left', sortable: true, value: 'conditionId', cellType: 'tb', hidden: true, editable: false },
        { text: 'Description', align: 'left', sortable: true, value: 'description', cellType: 'tb', hidden: false, editable: true },
        { text: 'Status', align: 'left', sortable: true, value: 'status', cellType: 'tb', hidden: false, editable: true }
      ],
      newItem: [
        { description: ' ', cellType: 'tb', attr: 'description', cellLabel: 'Description', menuItems: [], validators: [] },
        { status: ' ', cellType: 'tb', attr: 'status', cellLabel: 'Status', menuItems: [], validators: [] }
      ],
      defaultItem: [
        { conditionsId: 0, description: ' ', status: ' ' }
      ]
    }
  },
  methods: {
    resetItem () {
      this.newItem = [
        { description: ' ', cellType: 'tb', attr: 'description', cellLabel: 'Description', menuItems: [], validators: [] },
        { status: ' ', cellType: 'tb', attr: 'status', cellLabel: 'Status', menuItems: [], validators: [] }
      ]
      this.defaultItem = [
        { conditionsId: 0, description: ' ', status: ' ' }
      ]
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
