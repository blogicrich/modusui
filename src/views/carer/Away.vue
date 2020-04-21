<template>
  <v-container>
    <v-layout class="mx-2" column fill-height justify-center>
      <!-- Page Header -->
      <BaseViewHeader
        v-if="!userText"
        class="mx-2 mb-2"
        :headerIcon="headerIcon"
        :iconColor="iconColor"
        :headerText="headerText"
        hasDivider
      />
      <BaseViewHeader
        v-if="userText"
        class="mx-2 mb-2"
        :headerIcon="headerIcon"
        :iconColor="iconColor"
        :headerText="headerText"
        hasDivider
        showChips
        :chipsText="userText"
      />
      <!-- Date selection form -->
      <v-form ref="dateSelectForm" class="ma-4">
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
                v-model="startDate"
                label="Start date:"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="startDate" no-title scrollable>
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
                v-model="endDate"
                label="End date:"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="endDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="endDateMenu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.endDateMenu.save(endDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-btn color="primary" @click="refreshData(endDate, startDate)">Refresh</v-btn>
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
    },
    readUrl () {
      return 'carer/away/21'
    }
  },
  data: () => ({
    // BaseHeader
    headerIcon: 'calendar_today',
    iconColor: 'primary',
    headerText: 'Away Periods',
    // Start date picker
    startDate: new Date().toISOString().substr(0, 10),
    startDateMenu: false,
    // End date picker
    endDate: new Date().toISOString().substr(0, 10),
    endDateMenu: false,
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
    refreshData () {
      console.log(this.startDate, this.endDate)
      // TO BE IMPLEMENTED:
      // 1. Validatate form data
      // 2. Convert date format to BE requirements
      // 3. Update table with new data 
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
