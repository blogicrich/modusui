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
      :readUrl ="readUrl"
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

import apiLib from '@/services/apiLib'
import store from '@/store'
import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import dataTable from '@/components/base/BaseDataTableComponent'
import validation from '@/mixins/validation'
// const awayEndpoint = 'carer/away/' + store.getters.getterUserId

export default {
  mixins: [crudRoutines],
  components: {
    dataTable
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
    updateUrl: 'carer/away/21',
    readUrl: 'carer/away/21',
    primaryColor: 'primary',
    secondaryColor: 'primary darken-2',
    items: [],
    // awayPeriods: [
    //   {
    //     awayId: 0,
    //     startDate: new Date("March 8, 2019 09:30:00"),
    //     endDate: new Date("March 10, 2019 16:30:00"),
    //     drinksAccounted: true
    //   },
    //   {
    //     awayId: 1,
    //     startDate: new Date("March 6, 2019 11:15:00"),
    //     endDate: new Date("March 12, 2019 19:00:00"),
    //     drinksAccounted: false
    //   },
    //   {
    //     awayId: 2,
    //     startDate: new Date("February 26, 2001 12:00:00"),
    //     endDate: new Date("December 9, 2002 12:00:00"),
    //     drinksAccounted: false
    //   }
    // ],
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
        value: 'startDate',
        cellType: 'tb',
        hidden: false,
        editable: false
      },
      {
        text: 'End Date',
        align: 'left',
        sortable: true,
        value: 'endDate',
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
            validation.validateNumber(payload),
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
    defaultItem: [
      {
        drinksAccounted: false,
        startDate: '26 Feb 2001, 12:00',
        endDate: '9 Dec 2002, 12:00'
      }
    ],
    btnTitle: 'Record Time Away',
    primaryColor: 'primary'
  }),
  // computed: {
  //   items: function() {
  //     let items = [];

  //     for (let i = 0; i < this.awayPeriods.length; i++) {
  //       let awayPeriod = this.awayPeriods[i];
  //       let item = {
  //         awayId: awayPeriod.awayId,
  //         startDate: this.formatDateAsString(awayPeriod.startDate),
  //         endDate: this.formatDateAsString(awayPeriod.endDate),
  //         drinksAccounted: awayPeriod.drinksAccounted
  //       };
  //       items.push(item);
  //     }
  //     return items;
  //   }
  // },
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
              validation.validateNumber(payload)
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
    // console.log('URL: ' + this.readUrl)
    this.getItems(this.readUrl)
    // console.log(this.loadedMsg)
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
