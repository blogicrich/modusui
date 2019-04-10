<template>
  <v-container>
    <h2
      v-if="this.$vuetify.breakpoint.mdAndDown"
      class="pg-subheader text-primary text-center mx-3"
      text-xs-center
    >Container Types</h2>
    <BaseDataTable
      :headers="headers"
      :items="items"
      :newItem="newItem"
      :editPerms="editPerms"
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
      @itemsCancelled="refreshItems"
    />
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
  data() {
    return {
      items: [],
      crudIdKey: 'containerTypeId',
      editPerms: { create: true, update: true, delete: true },
      loading: true,
      loaded: false,
      error: false,
      errorMsg: ' ',
      loadingMsg: ' ',
      loadedMsg: ' ',
      delUrl: 'sysadmin/container-type',
      updateUrl: 'sysadmin/container-type',
      readUrl: 'sysadmin/container-type',
      createUrl: 'sysadmin/container-type',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'local_drink',
      iconAdd: 'add',
      headers: [
        {
          text: 'containerTypeId',
          align: 'left',
          sortable: true,
          value: 'containerTypeId',
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
          text: 'Volume',
          align: 'left',
          sortable: true,
          value: 'volume',
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
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          volume: '',
          cellType: 'tb',
          attr: 'volume',
          cellLabel: 'Volume',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateLiters(payload),
              validation.validateRequired(payload)
            ]
          }
        }
      ],
      defaultItem: [{ containerTypeId: 0, description: ' ', volume: 0 }]
    }
  },
  methods: {
    resetItem() {
      this.newItem = [
        {
          description: '',
          cellType: 'tb',
          attr: 'description',
          cellLabel: 'Description',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          volume: '',
          cellType: 'tb',
          attr: 'volume',
          cellLabel: 'Volume',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateLiters(payload),
              validation.validateRequired(payload)
            ]
          }
        }
      ]
      this.defaultItem = [{ containerTypeId: 0, description: ' ', volume: 0 }]
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
