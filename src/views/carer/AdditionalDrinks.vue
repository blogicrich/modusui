<template>
  <v-container fluid>
    <v-layout row fill-height justify-center>
      <BaseViewHeader
        class="mx-2 mb-2"
        :headerIcon="headerIcon"
        :headerText="headerText"
        hasDivider
      >
        <BaseUserSelect
          slot="rhViewHeaderColumn"
          :users="dashboardUsers"
          :selectedUser="selectedUser"
          @user-selected="$store.commit('SET_SELECTED_USER', $event)"
        />
      </BaseViewHeader>
    </v-layout>
    <BaseDataTable
      ref="baseDataTable"
      class="mx-4"
      :headers="headers"
      :items="items"
      :editPerms="editPerms"
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
      newDialogTitle="Add Additional Drinks"
      delDialogTitle="Confirm deletetion of selected items?"
      msgDel="Are you sure you want to delete the selected items?"

      @newItem="addItem"
      @itemsEdited="editItems"
      @deleteSelected="deleteItem"
      @itemsCancelled="getItems(readUrl)"
    >
    <!-- NEW DIALOG SLOT CONTENT -->
    </BaseDataTable>
  </v-container>
</template>

<script>

import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import { dataTableNavGuard } from '@/mixins/dataTableNavGuard.js'
import { mapState } from 'vuex'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'
import BaseUserSelect from '@/components/base/BaseUserSelectComponent.vue'
import validation from '@/mixins/validation'

export default {
  name: 'AdditionalDrinks',
  mixins: [dataTableNavGuard, crudRoutines, validation],
  components: {
    BaseDataTable,
    BaseUserSelect
  },
  computed: {
    ...mapState({
      selectedUser: state => state.eDropletApp.selectedUser,
      dashboardUsers: state => state.dashboardUsers.dashboardUsers
    })
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'local_drink',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Additional Drinks',
      // BaseDataTable
      crudIdKey: 'baseId',
      items: [],
      editPerms: { create: true, update: false, delete: true },
      loading: true,
      loaded: false,
      error: false,
      errorMsg: '',
      loadingMsg: '',
      loadedMsg: '',
      delUrl: 'carer/adddrinks/',
      readUrl: 'carer/adddrinks/',
      createUrl: 'carer/adddrinks/',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'local_drink',
      iconAdd: 'add',
      // pagination: {
      //   sortBy: 'name'
      // },
      headers: [
        { text: 'Name', align: 'left', sortable: true, cellType: 'tb', value: 'name', editable: true },
        { text: 'Amount', align: 'left', sortable: true, cellType: 'tb', value: 'quantity', editable: true }
      ],
      newItem: [
        {
          name: '',
          cellType: 'tb',
          attr: 'name',
          cellLabel: 'Drink Name',
          validators: []
        },
        {
          quantity: '',
          cellType: 'tb',
          attr: 'quantity',
          cellLabel: 'Amount Drank',
          validators: []
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
          validators: []
        },
        {
          Amount: '',
          cellType: 'tb',
          attr: 'amount',
          cellLabel: 'Amount Drank',
          validators: []
        }
      ]
    }
  },
  mounted () {
    this.getItems(this.readUrl + this.selectedUser.userId)
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
