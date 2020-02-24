<template>
  <div>
    <v-layout row align-center justify-center prepend-icon="event">
      <v-icon large>event</v-icon>
      <v-icon @click="subtractDay()" large title="Decrease date by one day">keyboard_arrow_left</v-icon>
      <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date">
        <v-text-field slot="activator" :value="formattedDate" readonly title="Pick a date"></v-text-field>
        <v-date-picker
          color="primary"
          color-header="primary"
          v-model="date"
          :max="maxDate"
          no-title
          scrollable
        >
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(date)">Ok</v-btn>
        </v-date-picker>
      </v-menu>
      <v-icon
        @click="addDay()"
        large
        :disabled="date === maxDate"
        title="Increase date by one day"
      >keyboard_arrow_right</v-icon>
      <v-icon
        @click="refresh()"
        large
        :disabled="!refreshEnabled"
        title="Check for new data"
      >refresh</v-icon>
    </v-layout>
    <v-container fluid grid-list-md d-flex>
      <v-layout fill-height wrap>
        <v-flex xs12 sm12 md8 lg8 xl8>
          <v-card dark v-if="!hourError">
            <sub-hourly-hydration-chart
              v-if="hourLoaded"
              :chartData="dashboardHour"
              :chartTitle="hourChartTitle"
            ></sub-hourly-hydration-chart>
            <v-progress-circular v-else indeterminate color="primary" class="ma-2"></v-progress-circular>
          </v-card>
          <v-alert :value="true" type="info" v-else>Hourly data is not available at this time.</v-alert>
        </v-flex>
        <v-flex d-flex xs12 sm12 md4 lg4 xl4 v-if="!breakpoint">
          <v-card class="userSelect" v-if="!usersError">
            <baseDropletuser
              v-if="usersLoaded"
              @userSelected="$emit('userChange', $event)"
              userHeader="eDroplet Users"
              :users="dashboardUsers"
              :searchName="searchName"
              :primaryColor="primaryColor"
              :usersIcon="usersIcon"
              :alertIcon="alertIcon"
              :clickedUser="selectedUser"
              :btnIcon="btnIcon"
              :alertColor="alertColors"
              :commentIcon="commentIcon"
              :maxCharac="'50'"
              :commentData="commentData"
              @commentText="saveComment"
            ></baseDropletuser>
            <v-progress-circular v-else indeterminate color="primary" class="ma-2"></v-progress-circular>
          </v-card>
          <v-alert :value="true" type="error" v-else>An error occurred while loading users.</v-alert>
        </v-flex>
        <v-flex d-flex xs12 sm12 md12 lg12 xl12>
          <v-layout row wrap>
            <v-flex xs12 sm12 md8 lg8 xl8>
              <v-card dark v-if="!weekError">
                <sub-weekly-hydration-chart
                  v-if="weekLoaded"
                  :chartData="dashboardWeek.dataPoints"
                  class="pb-4"
                  :chartTitle="weekChartTitle"
                />
                <v-progress-circular v-else indeterminate color="primary" class="ma-2"></v-progress-circular>
              </v-card>
              <v-alert :value="true" type="info" v-else>Weekly data is not available at this time.</v-alert>
            </v-flex>
            <v-flex xs12 sm12 md4 lg4 xl4>
              <v-card dark v-if="!dayError">
                <sub-hydration-day-chart
                  v-if="dayLoaded"
                  class="pb-4"
                  :chartTitle="dayChartTitle"
                  :chartData="dashboardDay"
                />
                <v-progress-circular v-else indeterminate color="primary" class="ma-2"></v-progress-circular>
              </v-card>
              <v-alert
                :value="true"
                type="info"
                v-else
              >Daily hydration data is not available at this time.</v-alert>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import baseDropletuser from '@/components/sub/SubUserSelectComponent'
import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import apiLib from '@/services/apiLib'
import SubHourlyHydrationChart from '@/components/sub/SubHourlyHydrationChart'
import SubHydrationDayChart from '@/components/sub/SubHydrationDayChart'
import SubWeeklyHydrationChart from '@/components/sub/SubWeeklyHydrationChart'

export default {
  components: {
    baseDropletuser,
    SubHourlyHydrationChart,
    SubHydrationDayChart,
    SubWeeklyHydrationChart
  },
  mixins: [crudRoutines],
  props: [
    'dashboardUsers',
    'dashboardComment',
    'dashboardHour',
    'dashboardDay',
    'dashboardWeek',
    'usersLoaded',
    'dayLoaded',
    'hourLoaded',
    'weekLoaded',
    'usersError',
    'dayError',
    'hourError',
    'weekError',
    'selectedUser'
  ],
  computed: {
    breakpoint () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true
        case 'sm':
          return true
        default:
          return false
      }
    },

    alertColors () {
      this.setAlertColors()
      return this.alertColor
    },

    formattedDate () {
      return this.$moment(this.date).format('L')
    },

    hourChartTitle () {
      return `Activity on: ${this.formatDate(this.date)}`
    },

    dayChartTitle () {
      return `Daily hydration status: ${this.dashboardDay.consumed.toFixed(2)}L/${this.dashboardDay.target.toFixed(2)}L`
    },

    weekChartTitle () {
      return `Weekly summary (${this.dashboardWeek.average.toFixed(2)} litres per day on average)`
    }
  },
  watch: {
    date () {
      this.$emit('dateChange', this.date)
    }
  },
  mounted () {
    this.date = this.$moment().format('YYYY-MM-DD')
    this.getComment()
  },
  methods: {
    getComment () {
      apiLib.getData(this.readUrl, true, true).then(response => {
        this.commentData = response[0]
      })
    },

    saveComment (newComment) {
      const data = {
        comment: newComment,
        carerId: 12
      }
      apiLib.updateData(this.updateUrl, data, true, true)
    },

    addDay () {
      this.date = this.$moment(this.date, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD')
    },

    subtractDay () {
      this.date = this.$moment(this.date).subtract(1, 'day').format('YYYY-MM-DD')
    },

    refresh () {
      this.$emit('refresh')
      this.refreshEnabled = false

      setTimeout(() => {
        this.refreshEnabled = true
      }, this.refreshCooldown)
    },

    setAlertColors () {
      for (let i = 0; i < this.dashboardUsers.length; i++) {
        if (this.dashboardUsers[i].alertType === 'hydrated') {
          this.alertColor.push('green')
        } else if (this.dashboardUsers[i].alertType === 'dehydrated') {
          this.alertColor.push('red')
        } else if (this.dashboardUsers[i].alertType === 'little dehydrated') {
          this.alertColor.push('orange')
        } else {
          this.alertColor.push('primary')
        }
      }
    },

    formatDate (date) {
      return this.$moment(date).format('LL')
    }
  },
  data () {
    return {
      commentData: '',
      searchName: 'Search user..',
      usersIcon: 'person',
      alertIcon: 'report_problem',
      commentIcon: 'comment',
      btnIcon: 'settings',
      primaryColor: 'primary',
      alertColor: [],
      menu: false,
      date: '',
      maxDate: this.$moment().format('YYYY-MM-DD'),
      refreshEnabled: true,
      refreshCooldown: 2000
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./public/scss/main.scss";
.v-card {
  color: black;
  background-color: $white;
  padding: 5px;
}
.chart {
  display: inline;
}
.userSelect {
  overflow-y: auto;
  overflow-x: hidden;
}
.v-container {
  padding-top: 0;
  margin-top: 0;
}
</style>
