<template>
  <v-container>
    <dataTable
      :tableTitle="legend"
      :headers="headers"
      :addBtnTitle="btnTitle"
      :primaryColor="primaryColor"
      :items="items"
      :newItem="newItem"
      searchLabel="Search Records..."
      recordIcon="calendar_today"
      editDialogTitle="Edit Away Period(s)"
      :secondaryColor="secondaryColor"
      item-key="awayId"
      :readUrl="readUrl"
      :editPerms="editPerms"
      :addRecordIcon="iconAdd"
      :loading="loading"
      :loaded="loaded"
      :error="error"
      :errorMsg="errorMsg"
      :loadingMsg="loadingMsg"
      :loadedMsg="loadedMsg"
      @newItem="addItem"
      @itemsEdited="editItems"
      @deleteSelected="deleteItem"
      @itemsCancelled="refreshItems"
    ></dataTable>
  </v-container>
</template>

<script>

import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import dataTable from '@/components/base/BaseDataTableComponent'
import validation from '@/mixins/validation'

export default {
  mixins: [crudRoutines, validation],
  components: {
    dataTable
  },
  computed: {
    userId () {
      // return this.$store.getters.getterUserId
    },
    readUrl () {
      return 'carer/away/21'
    },
    updateUrl () {
      return 'carer/away/21'
    }
  },
  data: () => ({
    crudIdKey: 'portalAuthorisedId',
    items: [],
    iconAdd: 'person_add',
    editPerms: { create: false, update: true, delete: false },
    loading: true,
    loaded: false,
    error: false,
    errorMsg: ' ',
    loadingMsg: ' ',
    loadedMsg: ' ',
    legend: 'Away Periods',
    // updateUrl: 'carer/away/',
    // readUrl: 'carer/away/',
    primaryColor: 'primary',
    secondaryColor: 'primary darken-2',
    headers: [
      {
        text: 'awayId',
        align: 'left',
        sortable: false,
        value: 'awayId',
        cellType: 'md',
        hidden: true,
        editable: false
      },
      {
        text: 'Drinks Accounted?',
        align: 'left',
        sortable: false,
        value: 'drinksAccounted',
        cellType: 'md',
        hidden: false,
        editable: true
      },
      {
        text: 'Start Date',
        align: 'left',
        sortable: true,
        value: 'startDateTime',
        cellType: 'tb',
        hidden: false,
        editable: false
      },
      {
        text: 'End Date',
        align: 'left',
        sortable: true,
        value: 'endDateTime',
        cellType: 'tb',
        hidden: false,
        editable: false
      }
    ],
    newItem: [
      {
        description: '',
        cellType: 'tb',
        attr: 'drinksAccounted',
        cellLabel: 'Drinks Accounted?',
        menuItems: [],
        validators: payload => {
          return [
            // this.validateNumber(payload)
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
            // this.validateLiters(payload),
            // this.validateRequired(payload)
          ]
        }
      }
    ],
    defaultItem: [
      {
        drinksAccounted: false,
        startDate: '26 Feb 2001, 12:00',
        endDate: '9 Dec 2002, 12:00'
      }
    ],
    btnTitle: 'Record Time Away'
  }),
  methods: {
    resetItem () {
      this.newItem = [
        {
          description: '',
          cellType: 'tb',
          attr: 'drinksAccounted',
          cellLabel: 'Drinks Accounted?',
          menuItems: [],
          validators: payload => {
            return [
              // this.validateNumber(payload)
            ]
          }
        }
      ]
      this.defaultItem = [
        {
          drinksAccounted: false,
          startDate: '26 Feb 2001, 12:00',
          endDate: '9 Dec 2002, 12:00'
        }
      ]
    },
    formatDateAsString: function (date) {
      const options = {
        timeZone: 'UTC',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
      let dateString = date.toLocaleString('en-GB', options)
      return dateString
    }
  },
  mounted () {
    this.getItems(this.readUrl)
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
