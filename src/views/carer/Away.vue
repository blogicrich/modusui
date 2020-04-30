<template>
  <v-container fluid>
    <v-layout column fill-height justify-center>
      <!-- Page Header -->
      <BaseViewHeader
        v-if="!userText"
        class="mx-2 mb-2"
        :headerIcon="headerIcon"
        :headerText="headerText"
        hasDivider
      />
      <BaseViewHeader
        v-if="userText"
        class="mx-2 mb-4"
        :chipsText="userText"
        :headerIcon="headerIcon"
        :headerText="headerText"
        hasDivider
      />
      <!-- Date selection form -->
      <v-form
        ref="dateSelectForm"
        class="ma-4"
        lazy-validation
      >
        <v-layout v-bind="binding">
          <!-- Start date menu picker -->
          <v-menu
            ref="startDateMenu"
            v-model="startDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="startDate"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="startDateFormattedValue"
                label="Start Date"
                prepend-icon="event"
                readonly
                :rules="[startDateValidation]"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker show current :max="endDateMax" v-model="startDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="startDateMenu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.startDateMenu.save(startDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        <!-- End date menu picker -->
          <v-menu
            ref="endDateMenu"
            v-model="endDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="endDate"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="endDateFormattedValue"
                label="End Date"
                prepend-icon="event"
                readonly
                :rules="[endDateValidation]"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker show current :max="endDateMax" v-model="endDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="endDateMenu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.endDateMenu.save(endDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-btn :disabled="startDate > endDate || endDate < startDate" color="primary" @click="refreshData(endDate, startDate)">Refresh</v-btn>
        </v-layout>
      </v-form>
      <!-- Data table -->
      <dataTable
        class="mx-4"
        :tableTitle="legend"
        :headers="headers"
        :primaryColor="primaryColor"
        :items="items"
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
      ></dataTable>
    </v-layout>
  </v-container>
</template>

<script>

import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import dataTable from '@/components/base/BaseDataTableComponent'
import moment from 'moment'

export default {
  mixins: [crudRoutines],
  components: {
    dataTable
  },
  computed: {
    binding: function () {
      const binding = {}
      if (this.$vuetify.breakpoint.mdAndDown) {
        binding.column = true
        binding.row = false
        binding.fillHeight = false
        binding.alignCenter = true
        binding.justifyCenter = true
        binding.justifySpaceBetween = false
      }
      if (this.$vuetify.breakpoint.lgAndUp) {
        binding.column = false
        binding.row = true
        binding.fillHeight = true
        binding.alignCenter = true
        binding.justifyCenter = false
        binding.justifySpaceBetween = true
      }
      return binding
    },
    endDateFormattedValue () {
      return this.endDate ? moment(this.endDate).format('dddd, MMMM Do YYYY') : ''
    },
    readUrl () {
      return 'carer/away/'
    },
    startDateFormattedValue () {
      return this.startDate ? moment(this.startDate).format('dddd, MMMM Do YYYY') : ''
    },
    user: function () {
      console.log(this.$store.getters.getterSelectedUser)
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
  data: () => ({
    // BaseHeader
    headerIcon: 'calendar_today',
    headerText: 'Away Periods',
    // End date picker
    endDate: new Date().toISOString().substr(0, 10),
    endDateMax: new Date().toISOString().substr(0, 10),
    endDateMenu: false,
    // Start date picker
    startDate: new Date(Date.now() - (7 * 86400000)).toISOString().substr(0, 10),
    startDateMenu: false,
    // BaseDataTable
    items: [],
    iconAdd: 'person_add',
    editPerms: { create: false, update: false, delete: false },
    loading: true,
    loaded: false,
    error: false,
    errorMsg: ' ',
    loadingMsg: ' ',
    loadedMsg: ' ',
    legend: 'Away Periods',
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
        editable: false
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
    ]
  }),
  methods: {
    endDateValidation () {
      if (this.endDate >= this.startDate) {
        return true
      } else {
        return 'Select a date after the "Start Date".'
      }
    },
    startDateValidation () {
      if (this.startDate <= this.endDate) {
        return true
      } else {
        return 'Select a date before the "End Date".'
      }
    },
    refreshData () {
      const unixEndDate = new Date(this.endDate).getTime() / 1000
      const unixStartDate = new Date(this.startDate).getTime() / 1000

      if (this.$refs.dateSelectForm.validate()) {
        this.getItems(this.readUrl + this.user.userId + '/' + unixStartDate + '/' + unixEndDate)
      } else {
        this.errorMsg = 'Please check selected date range.'
        this.loaded = false
        this.error = true
      }
    }
  },
  mounted () {
    this.getItems(this.readUrl + this.user.userId + '/' + new Date(this.startDate).getTime() / 1000 + '/' + new Date(this.endDate).getTime() / 1000)
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
