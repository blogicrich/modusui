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
    <!-- <v-layout grid-list row align-center justify-center> -->
      <v-flex class="mx-4">
        <v-textarea
          :color="$vuetify.theme.primary"
          clearable
          label="Day report"
          placeholder="Report Text"
          required
          :rules="dayReportValidation"
          v-model="reportText"
          box
          outline
          rounded
          type="number"
          >
        </v-textarea>
      </v-flex>
    <!-- </v-layout> -->
    <v-layout v-if="$vuetify.breakpoint.lgAndUp" row justify-center align-center>
      <v-btn
        :disabled="parametersPristine"
        class="root-nav-btn mt-3"
        @click="save"
        color="primary"
        large
        >Save
        <v-icon class="ma-1">save</v-icon>
      </v-btn>
      <v-btn
        :disabled="parametersPristine"
        class="root-nav-btn mt-3"
        @click="reset"
        color="primary"
        large
        >Reset
        <v-icon class="ma-1">refresh</v-icon>
      </v-btn>
    </v-layout>
    <v-speed-dial
      v-if="$vuetify.breakpoint.mdAndDown"
      :disabled="parametersPristine"
      v-model="fab"
      fixed
      :bottom="true"
      :right="true"
      direction="top"
      transition="v-fade-transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="primary"
          dark
          fab
        >
          <v-icon>edit</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
      </template>
      <v-btn
        @click="save"
        color="primary"
        fab
        dark
        small
      >
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn
        @click="reset"
        color="primary"
        fab
        dark
        small
      >
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-container>
</template>

<script>

import BaseUserSelect from '@/components/base/BaseUserSelectComponent'
import { mapState } from 'vuex'

export default {
  name: 'DailyReport',
  components: {
    BaseUserSelect
  },
  computed: {
    ...mapState({
      selectedUser: state => state.dashboardUsers.selectedUser,
      dashboardUsers: state => state.dashboardUsers.dashboardUsers
    }),
    parametersPristine () {
      if (this.reportText.length >= 1) {
        return false
      } else {
        return true
      }
    }
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'menu_book',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Day Report',
      // TextArea
      reportText: '',
      dayReportValidation: [
        value => !!value || 'Required.',
        value => value.length <= 320 || 'Max 320 characters'
      ]
    }
  },
  methods: {
    reset () {
      this.reportText = ''
    },
    save () {
      console.log(this.reportText)
    }
  }
}

</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
