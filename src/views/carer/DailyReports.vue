<template>
  <v-container fluid>
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
        @user-selected="$store.commit('SET_USER_CONTEXT', $event)"
      />
    </BaseViewHeader>
  </v-container>
</template>

<script>

import BaseUserSelect from '@/components/base/BaseUserSelectComponent'
import { mapState } from 'vuex'

export default {
  name: 'DailyReports',
  components: {
    BaseUserSelect
  },
  computed: {
    ...mapState({
      selectedUser: state => state.dashboardUsers.selectedUser,
      dashboardUsers: state => state.dashboardUsers.dashboardUsers
    })
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'menu_book',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Day Report'
    }
  }
}

</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
