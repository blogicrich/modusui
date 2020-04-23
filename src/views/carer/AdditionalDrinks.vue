<template>
  <v-container fluid>
    <v-layout row fill-height justify-center>
      <BaseViewHeader
        v-if="!userText"
        class="mx-2 mb-4"
        :headerIcon="headerIcon"
        :headerText="headerText"
        hasDivider
      />
      <BaseViewHeader
        v-if="userText"
        class="mx-2 mb-4"
        :headerIcon="headerIcon"
        :headerText="headerText"
        hasDivider
        showChips
        :chipsText="userText"
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
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'
import validation from '@/mixins/validation'

export default {
  name: 'AdditionalDrinks',
  mixins: [crudRoutines, validation],
  components: {
    BaseDataTable
  },
  computed: {
    // urls: function () {
    //   return [{ 
    //     ref: [{ statusId: 1, status: 'Live' }, { statusId: 0, status: 'Inactive' }],
    //     attr: 'operationalStatus',
    //     key: 'statusId'
    //   }]
    // },
    user: function () {
      return this.$store.getters.getterSelectedUser
    },
    userText: function () {
      if (this.$store.getters.getterSelectedUser !== null) {
        return this.$store.getters.getterSelectedUser.givenName
      } else {
        return ''
      }
    }
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
    this.getItems(this.readUrl + this.user.userId)
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
