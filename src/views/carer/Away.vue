<template>
  <v-container fluid>
    <v-layout column fill-height justify-center>
      <v-form
        ref="dateSelectForm"
        class="ma-4"
        lazy-validation
      >
        <v-layout :class="$vuetify.breakpoint.xsOnly ? 'column align-center justify-center' :
          'row fill-height align-center justify-space-between'"
        >
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
              />
            </template>
            <v-date-picker show current :max="endDateMax" v-model="startDate" no-title scrollable>
              <v-spacer />
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
              />
            </template>
            <v-date-picker show current :max="endDateMax" v-model="endDate" no-title scrollable>
              <v-spacer />
              <v-btn flat color="primary" @click="endDateMenu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.endDateMenu.save(endDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-btn :disabled="startDate > endDate || endDate < startDate" color="primary" @click="refreshData(endDate, startDate)">Refresh</v-btn>
        </v-layout>
      </v-form>
      <!-- Data table -->
      <SubDisplayTable
        :tableTitle="legend"
        :headers="headers"
        :items="awayPeriods"
        :hasRowContent="false"
        searchLabel="Search Records..."
        recordIcon="calendar_today"
        item-key="awayId"
        :addRecordIcon="iconAdd"
        :loading="awayLoading || loaded"
        :loaded="!awayLoading && !awayError"
        :error="awayError || dateError"
        :errorMsg="dateError ? 'Please check selected date range' : `Error loading Away periods for ${username}`"
        :loadingMsg="loadingMsg"
        :loadedMsg="loadedMsg"
        :infoActionButton="awayError ? true : false"
        :infoActionBtnTitle="`RELOAD AWAY PERIODS FOR ${username}`"
        @info-action-button-pressed="refreshData()"
      />
    </v-layout>
  </v-container>
</template>

<script>

import SubDisplayTable from '@/components/sub/SubDisplayTableComponent'
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'Away',
  components: {
    SubDisplayTable
  },
  watch: {
    selectedUser () {
      this.getAwayPeriods(
        this.selectedUser.userId,
        new Date(this.startDate).getTime() / 1000,
        new Date(this.endDate).getTime() / 1000
      )
    },
    selectedDate () {
      this.getAwayPeriods(
        this.selectedUser.userId,
        new Date(this.startDate).getTime() / 1000,
        new Date(this.endDate).getTime() / 1000
      )
    }
  },
  computed: {
    ...mapState({
      selectedUser: state => state.dashboardUsers.selectedUser,
      dashboardUsers: state => state.dashboardUsers.dashboardUsers,
      awayLoading: state => state.dashboardAway.awayLoading,
      awayError: state => state.dashboardAway.awayError,
      awayPeriods: state => state.dashboardAway.awayPeriods
    }),
    endDateFormattedValue () {
      return this.endDate ? moment(this.endDate).format('dddd, MMMM Do YYYY') : ''
    },
    startDateFormattedValue () {
      return this.startDate ? moment(this.startDate).format('dddd, MMMM Do YYYY') : ''
    },
    username () {
      return this.selectedUser.deptPerson.person.givenName + ' ' + this.selectedUser.deptPerson.person.familyName
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
    // BaseSubDisplayTable
    items: [],
    iconAdd: 'person_add',
    loaded: false,
    dateError: false,
    loadingMsg: 'Loading Away Periods',
    loadedMsg: 'No data for selected time period',
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
    async getAwayPeriods (id, startDate, endDate) {
      await this.$store.dispatch('fetchAwayPeriods', {
        id: id,
        startDate: startDate,
        endDate: endDate
      })
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
        this.getAwayPeriods(
          this.selectedUser.userId,
          unixStartDate,
          unixEndDate
        )
      } else {
        this.errorMsg = 'Please check selected date range.'
        this.loaded = false
        this.dateError = true
      }
    }
  },
  mounted () {
    try {
      this.getAwayPeriods(
        this.selectedUser.userId,
        new Date(this.startDate).getTime() / 1000,
        new Date(this.endDate).getTime() / 1000
      )
    } catch (error) {
      this.dateError = true
      this.errorMsg = 'Please check your internet connection and refresh page to try again.'
    }
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
