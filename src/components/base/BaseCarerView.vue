<template>
  <v-container v-if="selectedDate && selectedUser" fluid>
    <!-- HEADER -->
    <BaseViewHeader
      :headerIcon="headerIcon"
      :iconColor="$vuetify.theme.primary"
      :headerText="headerText"
      hasDivider
    >
      <BaseDateSelection
        v-show="ctrSlotVisible"
        slot="ctrViewHeaderColumn"
        :date="selectedDate"
        :maxDate="maxDate"
        :formattedDate="formattedDate"
        @date-change="$store.commit('SET_DASHBOARD_DATE', $event)"
        @add-day="$store.commit('INCREMENT_DASHBOARD_DATE', $event)"
        @subtract-day="$store.commit('DECREMENT_DASHBOARD_DATE', $event)"
      />
      <BaseUserSelect
        v-show="rhSlotVisible"
        slot="rhViewHeaderColumn"
        :users="dashboardUsers"
        :selectedUser="selectedUser"
        @user-selected="$store.commit('SET_USER_CONTEXT', $event)"
      />
    </BaseViewHeader>
    <!-- ROUTE VIEW -->
    <v-slide-y-transition mode="out-in">
      <router-view class="pa-0" @header-changed="setHeader($event)" />
    </v-slide-y-transition>
  </v-container>
</template>

<script>

import BaseDateSelection from '@/components/base/BaseDateSelectionComponent'
import BaseUserSelect from '@/components/base/BaseUserSelectComponent'
import { mapState } from 'vuex'

export default {
  name: 'BaseCarerView',
  components: {
    BaseDateSelection,
    BaseUserSelect
  },
  computed: {
    ...mapState({
      // Dates
      selectedDate: state => state.dashboardDates.dashboardSelectedDate,
      formattedDate: state => state.dashboardDates.dashboardFormattedDate,
      maxDate: state => state.dashboardDates.maxDate,
      // Users
      selectedUser: state => state.dashboardUsers.selectedUser,
      dashboardUsers: state => state.dashboardUsers.dashboardUsers,
      dashboardUsersLoaded: state => state.dashboardUsers.dashboardUsersLoaded
    })
  },
  watch: {
    $route (to, from) {
      to.name === 'away' ? this.ctrSlotVisible = false : this.ctrSlotVisible = true
    }
  },
  data: () => ({
    headerIcon: '',
    headerText: '',
    rhSlotVisible: true,
    ctrSlotVisible: true
  }),
  methods: {
    async setUsers () {
      await this.$store.dispatch('fetchDashboardUsers')
      this.$store.commit('SET_USER_CONTEXT', this.dashboardUsers[0])
    },
    setDates () {
      const date = this.$moment(Date.now()).format('YYYY-MM-DD')
      this.$store.commit('SET_DASHBOARD_DATE', date)
      this.$store.commit('SET_MAX_DATE')
    },
    setHeader (e) {
      this.headerIcon = e.headerIcon
      this.headerText = e.headerText
    }
  },
  mounted () {
    this.setUsers()
    this.setDates()
  }
}
</script>

<style lang="scss" scoped>
@import "./public/scss/main.scss";

.v-card {
  background-color: white;
  padding: 5px;
}

</style>
