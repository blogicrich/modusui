<template>
  <v-container>
    <h2
      v-if="this.$vuetify.breakpoint.mdAndDown"
      class="pg-subheader text-primary text-center mx-3"
      text-xs-center
    >Titles</h2>
    <BaseDataTable
      :headers="headers"
      :items="items"
      :editPerms="editPerms"
      :newItem="newItem"
      :primaryColor="primaryColor"
      :secondaryColor="secondaryColor"
      :recordIcon="icon"
      :addRecordIcon="iconAdd"
      addBtnTitle="New Title"
      :loading="loading"
      :loaded="loaded"
      :error="error"
      :errorMsg="errorMsg"
      :loadingMsg="loadingMsg"
      :loadedMsg="loadedMsg"
      item-key="titleId"
      searchLabel="Search Records..."
      tableTitle="Titles"
      newDialogTitle="Add a New Title"
      editDialogTitle="Edit Titles"
      delDialogTitle="Confirm deletetion of selected items?"
      msgDel="Are you sure you want to delete the selected items?"
      :validators="validators"
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
  data() {
    return {
      items: [],
      valid: false,
      editPerms: { create: true, update: true, delete: true },
      name: 'name',
      loading: true,
      loaded: false,
      error: false,
      errorMsg: '',
      loadingMsg: '',
      loadedMsg: '',
      delUrl: 'sysadmin/title',
      updateUrl: 'sysadmin/title',
      readUrl: 'sysadmin/title',
      createUrl: 'sysadmin/title',
      itemKey: 'titleId',
      crudIdKey: 'titleId',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'perm_identity',
      iconAdd: 'add',
      editRules: payload => {
        return [validation.validateAlphabetical(payload), validation.validateRequired(payload)]
      },
      headers: [
        {
          text: 'Title',
          align: 'left',
          sortable: false,
          value: 'titleId',
          cellType: 'tb',
          hidden: true
        },
        {
          text: 'Abbreviation',
          align: 'left',
          sortable: false,
          value: 'shortDescription',
          cellType: 'tb',
          hidden: false
        },
        {
          text: 'Description',
          align: 'left',
          sortable: false,
          value: 'longDescription',
          cellType: 'tb',
          hidden: false
        }
      ],
      newItem: [
        {
          shortDescription: '',
          cellType: 'tb',
          attr: 'shortDescription',
          cellLabel: 'Abbreviation',
          menuItems: [],
          validators: payload => {
            return [validation.validateAlphabetical(payload), validation.validateRequired(payload)]
          }
        },
        {
          longDescription: '',
          cellType: 'tb',
          attr: 'longDescription',
          cellLabel: 'Description',
          menuItems: [],
          validators: payload => {
            return [validation.validateAlphabetical(payload), validation.validateRequired(payload)]
          }
        }
      ],
      defaultItem: [
        { titleId: 0, shortDescription: '', longDescription: '' }
      ],
      urls: []
    }
  },
  methods: {
    validateItems (selected) {
    // longDescription: 'To'
    // shortDescription: 'T'
    // titleId: 32
      for (let i = 0; i < selected.length; i++) {
        for (const key in selected[i]) {
          if (selected[i].hasOwnProperty(key)) {
            const element = selected[i][key]
            console.log(element)
            if (validation.validateAlphabetical(validation.validateRequired(element.shortDescription)) && validation.validateAlphabetical(validation.validateRequired(element.longDescription))) {
              this.editItems(element)
            } else {
              this.valid = false
            }
          }
        }
      }
    },
    resetItem() {
      this.newItem = [
        {
          shortDescription: '',
          cellType: 'tb',
          cellLabel: 'shortDescription',
          menuItems: this.newItem['shortDescription'].menuItems,
          validators: payload => {
            return [validation.validateAlphabetical(payload), validation.validateRequired(payload)]
          }
        },
        {
          longDescription: '',
          cellType: 'tb',
          cellLabel: 'longDescription',
          menuItems: this.newItem['longDescription'].menuItems,
          validators: payload => {
            return [validation.validateAlphabetical(payload), validation.validateRequired(payload)]
          }
        }
      ]
      this.defaultItem = [
        { titleId: 0, shortDescription: '', longDescription: '' }
      ]
    }
  },
  mounted() {
    this.getItems(this.readUrl)
    console.log(this.items)
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
