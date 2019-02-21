<template>
  <v-container>
    <h2 v-if="this.$vuetify.breakpoint.mdAndDown" class="pg-subheader text-primary text-center mx-3" text-xs-center>Gender Options</h2>
    <BaseDataTable
      :headers="headers"
      :items="items"
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
      delUrl: 'sysadmin/gender-options',
      updateUrl: 'sysadmin/gender-options',
      readUrl: 'sysadmin/gender-options',
      createUrl: 'sysadmin/gender-options',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'wc',
      iconAdd: 'add',
      headers: [
        { text: 'portalPersonsId', align: 'left', sortable: false, value: 'portalPersonsId', cellType: 'tb', hidden: true, editable: false },
        { text: 'DeptPersonsId', align: 'left', sortable: false, value: 'deptPersonsId', cellType: 'tb', hidden: true, editable: true },
        { text: 'PersonsId', align: 'left', sortable: false, value: 'personsId', cellType: 'tb', hidden: true, editable: true },
        { text: 'genderId', align: 'left', sortable: true, value: 'genderId', cellType: 'tb', hidden: true, editable: true },
        { text: 'Description', align: 'left', sortable: true, value: 'description', cellType: 'tb', hidden: false, editable: true },
        { text: 'Target Consumption', align: 'left', sortable: true, value: 'targetConsumption', cellType: 'tb', hidden: false, editable: true }
      ],
      newItem: [
        { description: ' ', cellType: 'tb', attr: 'description', cellLabel: 'Description', menuItems: [], validators: [] },
        { volume: ' ', cellType: 'tb', attr: 'targetConsumption', cellLabel: 'Target Consumption', menuItems: [], validators: [] }
      ],
      defaultItem: [
        { deptPersonsId: 0, personsId: 0, genderId: 0, description: ' ', targetConsumption: 0 }
      ]
      // urls: [
      //   { url: 'titleget', attr: 'titleId', key: 'titleId' },
      //   { url: 'sysadget', attr: 'username', key: 'username' }
      // ]
    }
  },
  methods: {
    resetItem () {
      this.newItem = [
        { description: ' ', cellType: 'tb', attr: 'description', cellLabel: 'Description', menuItems: [], validators: [] },
        { volume: ' ', cellType: 'tb', attr: 'volume', cellLabel: 'Volume', menuItems: [], validators: [] }
      ]
      this.defaultItem = [
        { deptPersonsId: 0, personsId: 0, description: ' ', volume: 0 }
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
