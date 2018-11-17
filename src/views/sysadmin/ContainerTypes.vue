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
      item-key="containerTypeId"
      searchLabel="Search Records..."
      tableTitle="Container Type Records"
      newDialogTitle="Add a New Container Type"
      editDialogTitle="Edit Container Type Records"
      delDialogTitle="Confirm deletetion of selected items?"
      msgDel="Are you sure you want to delete the selected items?"
      @newItem="addItem"
      @itemsEdited="editItems"
      @deleteSelected="deleteItem"
      @itemsCancelled="notify"
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
import { getData, postData } from '@/mixins/apiRequests'
import { crudOperations } from '@/mixins/CRUD'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'

export default {
  name: 'ContainerTypes',
  mixins: [getData, postData, crudOperations],
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
      delUrl: 'containerdelete',
      updateUrl: 'containerupdate',
      readUrl: 'containerget',
      createUrl: 'containercreate',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'local_drink',
      iconAdd: 'add',
      headers: [
        { text: 'portalPersonsId', align: 'left', sortable: false, value: 'portalPersonsId', cellType: 'tb', hidden: true, editable: false },
        { text: 'DeptPersonsId', align: 'left', sortable: false, value: 'deptPersonsId', cellType: 'tb', hidden: true, editable: true },
        { text: 'PersonsId', align: 'left', sortable: false, value: 'personsId', cellType: 'tb', hidden: true, editable: true },
        { text: 'containerTypeId', align: 'left', sortable: true, value: 'containerTypeId', cellType: 'tb', hidden: true, editable: true },
        { text: 'Description', align: 'left', sortable: true, value: 'description', cellType: 'tb', hidden: false, editable: true },
        { text: 'Volume', align: 'left', sortable: true, value: 'volume', cellType: 'tb', hidden: false, editable: true }
      ],
      newItem: [
        { description: ' ', cellType: 'tb', attr: 'description', cellLabel: 'Description', menuItems: [], validators: [] },
        { volume: ' ', cellType: 'tb', attr: 'volume', cellLabel: 'Volume', menuItems: [], validators: [] }
      ],
      defaultItem: [
        { deptPersonsId: 0, personsId: 0, containerTypeId: 0, description: ' ', volume: 0 }
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
        { deptPersonsId: 0, personsId: 0, containerTypeId: 0, description: ' ', volume: 0 }
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
