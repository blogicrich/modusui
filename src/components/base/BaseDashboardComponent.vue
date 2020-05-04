<template>
  <v-container fluid>
    <!-- HEADER -->
    <v-layout ref="dBoardHeader" row fill-height align-center justify-center grid-list-xl>
      <v-flex xs12 md4></v-flex>
      <v-flex xs12 md4>
        <slot name="headerCenter"></slot>
      </v-flex>
      <v-flex xs12 md4>
        <slot name="headerRight"></slot>
      </v-flex>
    </v-layout>
      <!-- DASHBOARD CONTENT -->
      <v-container fluid grid-list-md>
        <!-- ROW-1 -->
        <v-layout v-bind="binding">
          <v-flex xs12 md8 order-md1 order-xs2>
            <v-card dark>
              <slot name="tileOne"></slot>
              <!-- <v-progress-circular v-if="hourError" indeterminate color="primary" class="ma-2"></v-progress-circular> -->
            </v-card>
          </v-flex>
          <v-flex xs12 md4 order-md2 order-xs1>
            <v-card>
              <slot name="tileTwo"></slot>
            </v-card>
            <!-- <v-alert :value="true" type="error" v-else>An error occurred while loading users.</v-alert> -->
          </v-flex>
        </v-layout>
        <!-- ROW-2 -->
        <v-layout v-bind="binding">
          <v-flex xs12 md8 order-md1 order-xs2>
            <v-card dark>
              <slot name="tileThree"></slot>
              <!-- <v-progress-circular v-if="hourError" indeterminate color="primary" class="ma-2"></v-progress-circular> -->
            </v-card>
          </v-flex>
          <v-flex xs12 md4 order-md2 order-xs1>
            <v-card>
              <slot name="tileFour"></slot>
            </v-card>
            <!-- <v-alert :value="true" type="error" v-else>An error occurred while loading users.</v-alert> -->
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
</template>

<script>

import BaseUserSelect from '@/components/base/BaseUserSelectComponent'
import BaseDataInfoCard from '@/components/base/BaseDataTableInfoComponent'
import SubHourlyHydrationLineChart from '@/components/sub/SubHourlyHydrationLineChart'
import SubHourlyHydrationBarChart from '@/components/sub/SubHourlyHydrationBarChart'
import SubHydrationDayPieChart from '@/components/sub/SubHydrationDayPieChart'
import SubWeeklyHydrationBarChart from '@/components/sub/SubWeeklyHydrationBarChart'

export default {
  components: {
    BaseUserSelect,
    BaseDataInfoCard,
    SubHourlyHydrationLineChart,
    SubHourlyHydrationBarChart,
    SubHydrationDayPieChart,
    SubWeeklyHydrationBarChart
  },
  computed: {
    binding () {
      const binding = {}
      if (this.$vuetify.breakpoint.smAndDown) {
        binding.column = true
        binding.row = false
        binding.fillHeight = false
      }
      if (this.$vuetify.breakpoint.mdAndUp) {
        binding.column = false
        binding.row = true
        binding.fillHeight = true
      }
      return binding
    },
    alertColors () {
      this.setAlertColors()
      return this.alertColor
    }
  },
  watch: {
    date () {
      this.$emit('dateChange', this.date)
    }
  },
  mounted () {
    this.date = this.$moment().format('YYYY-MM-DD')
  },
  methods: {
    setChartType (event) {
      this.hourlyChartType = event
    }
    // formatDate (date) {
    //   return this.$moment(date).format('LL')
    // }
  },
  data () {
    return {
      // BaseDataInfoCard
      errorMsg: String,
      color: String,
      // BaseDataInfoCard Booleans
      loading: false,
      loaded: false,
      error: false
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
  height: 100%;
}
.chart {
  display: inline;
}
</style>
