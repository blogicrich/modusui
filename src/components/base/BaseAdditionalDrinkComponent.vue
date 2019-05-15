<template>
  <v-container>
    <h2
      v-if="this.$vuetify.breakpoint.mdAndDown"
      class="pg-subheader text-primary text-center mx-3"
      text-xs-center
    >Additional Drinks</h2>
    <BaseDataTable
      :headers="headers"
      :items="drinks"
      :editPerms="{
        create: true,
        update: true,
        delete: true
      }"
      :newItem="newItem"
      :primaryColor="primaryColor"
      :secondaryColor="secondaryColor"
      :recordIcon="icon"
      :addRecordIcon="iconAdd"
      addBtnTitle="Add Drinks"
      :loading="loading"
      :loaded="loaded"
      :error="error"
      :errorMsg="errorMsg"
      :loadingMsg="loadingMsg"
      :loadedMsg="loadedMsg"
      item-key="userId"
      searchLabel="Search Records..."
      tableTitle="Additional Drinks"
      newDialogTitle="Add a Additional Drink"
      editDialogTitle="Edit Additional Drinks"
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
  name: 'SystemAdmins',
  mixins: [crudRoutines],
  components: {
    BaseDataTable
  },
  data () {
    return {
      snackColor: 'primary',
      snackText: '',
      snack: false,
      dashboardUsers: undefined,
      timeout: 6000,
      loading: true,
      loaded: false,
      error: false,
      errorMsg: '',
      loadingMsg: '',
      loadedMsg: '',
      delUrl: 'carer/adddrinks/' + this.$store.state.userId,
      updateUrl: 'carer/adddrinks/' + 21,
      readUrl:
        'carer/adddrinks/' +
        this.$store.state.userId +
        '/' +
        this.$store.state.date,
      createUrl: 'carer/adddrinks/' + 21 + '/' + 2,
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'local_drink',
      iconAdd: 'add',
      pagination: {
        sortBy: 'name'
      },
      selected: [],
      headers: [
        { text: 'Name', align: 'left', sortable: true, cellType: 'tb', value: 'name', editable: true },
        { text: 'Amount', align: 'left', sortable: true, cellType: 'tb', value: 'quantity', editable: true }
      ],
      drinks: [],
      newItem: [
        {
          name: '',
          cellType: 'tb',
          attr: 'name',
          cellLabel: 'Drink Name',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          quantity: '',
          cellType: 'tb',
          attr: 'quantity',
          cellLabel: 'Amount Drank',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateRequired(payload)
            ]
          }
        }
      ],
      defaultItem: [{ name: '', quantity: 0 }]
    }
  },
  methods: {
    resetItem () {
      this.newItem = [
        {
          Name: '',
          cellType: 'tb',
          attr: 'name',
          cellLabel: 'Drink Name',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          Amount: '',
          cellType: 'tb',
          attr: 'amount',
          cellLabel: 'Amount Drank',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        }
      ]
      this.defaultItem = [{ Name: '', Amount: '' }]
    }
  },
  mounted () {
    this.getItems(this.readUrl)
    this.$store.dispatch('fetchDashboardUsersGet')
    this.dashboardUsers = this.$store.state.dashboardUsers.dashboardUsersGet
    console.log('dashboardUsers:', this.$store.state.dashboardUsers.dashboardUsersGet)
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
