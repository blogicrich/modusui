<template>
  <v-container fluid>
    <BaseViewHeader
      :headerIcon="headerIcon"
      :headerText="headerText"
      hasDivider
      fullWidth
    />
    <SubDisplayTable
      ref="subDisplayTable"
      :headers="headers"
      :items="users"
      :expandable="false"
      :hasRowContent="true"
      :tableTitleIcon="headerIcon"
      :loading="loadingUserSettings"
      :loaded="!loadingUserSettings && !errorUserSettings"
      :error="errorUserSettings"
      :infoActionButton="errorUserSettings ? true : false"
      :infoActionBtnTitle="'Reload User Settings'"
      errorMsg="Error loading User Settings records..."
      loadingMsg="Loading User Settings..."
      loadedMsg="No User records to display"
      item-key="userId"
      searchLabel="Search Records..."
      tableTitle="User Settings Records"
      @row-clicked="setSelectedUser"
      @info-action-button-pressed="$store.dispatch('setCliAdminUserSettings')"
    >
      <v-card
        slot="expandedRow"
        flat
        outline
      >
        <v-form
          ref="editSettingsForm"
          v-model="editFormValid"
        >
          <transition-group name="fade" mode="out-in" appear>
            <v-container
              key="settingsEditing"
              fluid
            >
              <!-- EDIT MODE CARD HEADER-->
              <v-layout
                v-if="!loadingUserSettings && !updatingUserSettings && !errorUserSettings"
                row
                fill-height
                justify-end
                align-center
              >
                <transition-group name="fade" mode="out-in" appear>
                  <RowButton
                    key="settingsResetBtn"
                    :btnColor="$vuetify.theme.primary"
                    :btnIconColor="$vuetify.theme.primary"
                    :btnTitle="'RESET'"
                    :disabled="parametersPristine || !editing"
                    :icon="'refresh'"
                    :iconColor="$vuetify.theme.secondary"
                    @row-button-clicked="$store.commit('SET_SELECTED_USER_SETTINGS', { userId: selected.userId })"
                  />
                  <RowButton
                    key="settingsSaveBtn"
                    :btnColor="$vuetify.breakpoint.smAndDown ? $vuetify.theme.success : $vuetify.theme.primary"
                    :btnTitle="'SAVE'"
                    :disabled="parametersPristine || !editing"
                    :icon="'save'"
                    :iconColor="$vuetify.theme.secondary"
                    @row-button-clicked="updateUserSettings()"
                  />
                  <RowButton
                    key="settingsEditBtn"
                    :btnColor="$vuetify.theme.primary"
                    :btnTitle="'EDIT'"
                    :icon="editing ? 'lock_open' : 'lock'"
                    :iconColor="$vuetify.theme.secondary"
                    @row-button-clicked="editing = !editing"
                  />
                </transition-group>
              </v-layout>
              <!-- EDIT ROWS -->
              <v-layout
                v-if="!loadingUserSettings && !updatingUserSettings && !errorUserSettings"
                column
              >
                <v-card-title
                  class="title accent--text"
                >
                  {{ `Set Wake and Sleep Times for User: ${selected.username}` }}
                </v-card-title>
                <v-layout
                  row
                  wrap
                  align-center
                  justify-center
                  fill-height
                >
                  <v-flex xs12 md6>
                    <v-menu
                      ref="wakeUpTimePicker"
                      :disabled="!editing"
                      v-model="showWakeUpTimePicker"
                      :close-on-content-click="false"
                      :nudge-right="60"
                      :return-value="wakeUpTime"
                      lazy
                      transition="scale-transition"
                      offset-y
                      :rules="[validation.generic, validation.wakeUpTime]"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          class="ma-2"
                          v-model="wakeUpTime"
                          label="Wake up time"
                          prepend-inner-icon="brightness_5"
                          :disabled="!editing"
                          readonly
                          box
                          outline
                          v-on="on"
                        />
                      </template>
                      <v-time-picker
                        v-if="showWakeUpTimePicker"
                        v-model="wakeUpTime"
                        full-width
                        @click:minute="$refs.wakeUpTimePicker.save(wakeUpTime)"
                      />
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-menu
                      ref="sleepTimePicker"
                      v-model="showSleepTimePicker"
                      :disabled="!editing"
                      :close-on-content-click="false"
                      :nudge-right="60"
                      :return-value="sleepTime"
                      lazy
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          class="ma-2"
                          v-model="sleepTime"
                          label="Sleep time"
                          prepend-inner-icon="brightness_3"
                          :disabled="!editing"
                          readonly
                          box
                          outline
                          v-on="on"
                        />
                      </template>
                      <v-time-picker
                        v-if="showSleepTimePicker"
                        v-model="sleepTime"
                        full-width
                        @click:minute="$refs.sleepTimePicker.save(sleepTime)"
                      />
                    </v-menu>
                  </v-flex>
                </v-layout>
                <v-card-title
                  class="title accent--text"
                >
                  {{ `Set Intervals for User: ${selected.username}` }}
                </v-card-title>
                <v-layout row wrap fill-height justify-space-between>
                  <v-flex xs12 lg6>
                    <v-select
                      :disabled="!editing"
                      :items="lightIntervalSettings"
                      class="ma-2"
                      v-model="lightInterval"
                      label="Blue Flashing Light Interval"
                      outline
                      required
                      item-text="menuText"
                      item-value="blueLightFlashingIntervalId"
                      :rules="[validation.generic]"
                    />
                  </v-flex>
                  <v-flex xs12 lg6>
                    <v-select
                      :disabled="!editing"
                      :items="spokenIntervalSettings"
                      class="ma-2"
                      v-model="spokenInterval"
                      label="Spoken Reminder Interval"
                      outline
                      required
                      item-text="menuText"
                      item-value="spokenReminderId"
                      :rules="[validation.generic]"
                    />
                  </v-flex>
                </v-layout>
              </v-layout>
              <!-- UPDATE PROGRESS -->
              <BaseDataTableInfoCard
                key="conditionsProgress"
                :loadingMsg="`Updating ${selected.username} settings.`"
                errorMsg="Error retrieving User Settings"
                :loading="updatingUserSettings"
                :error="errorUserSettings"
                :color="$vuetify.theme.primary"
                :actionBtn="errorUserSettings ? true : false"
                :actionBtnTitle="`RELOAD SETTINGS FOR ${selected.username}`"
                @action-button-pressed="$store.dispatch('setCliAdminUserSettings')"
              />
            </v-container>
          </transition-group>
        </v-form>
      </v-card>
    </SubDisplayTable>
  </v-container>
</template>

<script>

import { mapState } from 'vuex'
import SubDisplayTable from '@/components/sub/SubDisplayTableComponent.vue'
import BaseDataTableInfoCard from '@/components/base/BaseDataTableInfoComponent.vue'
import RowButton from '@/components/base/BaseDisplayTableRowBtn.vue'
import validation from '@/mixins/validation'

export default {
  name: 'UserSettingsManagement',
  mixins: [validation],
  components: {
    SubDisplayTable,
    BaseDataTableInfoCard,
    RowButton
  },
  computed: {
    ...mapState({
      // Store data objects
      users: state => state.cliAdminUserSettings.cliAdminUserSettings,
      selected: state => state.cliAdminUserSettings.cliAdminSelectedUserSettings,
      // Store CRUD Booleans
      deletingUserSettings: state => state.cliAdminUserSettings.cliAdminUserSettingsDeleting,
      updatingUserSettings: state => state.cliAdminUserSettings.cliAdminUserSettingsUpdating,
      loadingUserSettings: state => state.cliAdminUserSettings.cliAdminUserSettingsLoading,
      errorUserSettings: state => state.cliAdminUserSettings.cliAdminUserSettingsError,
      conditionOptions: state => state.commonData.conditionOptions,
      // Options Select
      lightIntervalSettings: state => state.cliAdminUserSettings.cliAdminLightIntervalOptions,
      spokenIntervalSettings: state => state.cliAdminUserSettings.cliAdminSpokenIntervalOptions
    }),
    /* eslint-ignore-next-line */
    parametersPristine () {
      let isPristine = true
      if (!this.loadingUserSettings && this.selected.userId && this.users.length) {
        const pristineSettings = this.users.find(u => u.userId === this.selected.userId)
        if (
          (this.sleepTime === pristineSettings.sleepTime) &&
          (this.wakeUpTime === pristineSettings.wakeUpTime) &&
          (this.lightInterval === pristineSettings.blueLightFlashingIntervalId) &&
          (this.spokenInterval === pristineSettings.voiceReminderIntervalId)
        ) {
          isPristine = true
        } else {
          isPristine = false
        }
      }
      return isPristine
    },
    wakeUpTime: {
      get () {
        return this.$store.state.cliAdminUserSettings.cliAdminSelectedUserSettings.wakeUpTime
      },
      set (newValue) {
        this.$store.commit('UPDATE_SELECTED_USER_WAKEUPTIME', newValue)
      }
    },
    sleepTime: {
      get () {
        return this.$store.state.cliAdminUserSettings.cliAdminSelectedUserSettings.sleepTime
      },
      set (newValue) {
        this.$store.commit('UPDATE_SELECTED_USER_SLEEPTIME', newValue)
      }
    },
    lightInterval: {
      get () {
        return this.$store.state.cliAdminUserSettings.cliAdminSelectedUserSettings.blueLightFlashingIntervalId
      },
      set (newValue) {
        this.$store.commit('UPDATE_SELECTED_USER_LIGHT_INTERVAL', newValue)
      }
    },
    spokenInterval: {
      get () {
        return this.$store.state.cliAdminUserSettings.cliAdminSelectedUserSettings.voiceReminderIntervalId
      },
      set (newValue) {
        this.$store.commit('UPDATE_SELECTED_USER_SPOKEN_INTERVAL', newValue)
      }
    }
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'access_alarm',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'User Settings Management',
      showCommentDatePicker: false,
      // Edit Form
      editing: false,
      editFormValid: false,
      showSleepTimePicker: false,
      showWakeUpTimePicker: false,
      icon: 'local_pharmacy',
      // Data Table
      headers: [
        {
          text: 'userId',
          align: 'left',
          sortable: true,
          value: 'userId',
          cellType: 'tb',
          hidden: true,
          editable: false
        },
        {
          text: 'User',
          align: 'left',
          sortable: true,
          value: 'username',
          cellType: 'tb',
          hidden: false,
          editable: false
        },
        {
          text: 'comments',
          align: 'left',
          sortable: true,
          value: 'comments',
          cellType: 'tb',
          hidden: false,
          editable: true
        },
        {
          text: 'Status',
          align: 'left',
          sortable: true,
          value: 'status',
          cellType: 'tb',
          hidden: false,
          editable: true
        }
      ],
      validation: {
        generic: value => !!value || 'Required.',
        sleepTime: (value) => {
          if (value > this.wakeUpTime) return true
          else return 'Time must be after Wake up time'
        },
        wakeUpTime: (value) => {
          if (value < this.sleepTime) return true
          else return 'Time must be before Wake up time'
        }
      }
    }
  },
  methods: {
    setSelectedUser (e) {
      this.$store.commit('SET_SELECTED_USER_SETTINGS', { ...e.item })
    },
    async updateUserSettings () {
      if (this.editFormValid) {
        try {
          this.$store.dispatch('updateCliAdminUserSettings')
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  mounted () {
    this.$store.dispatch('setCliAdminUserSettings')
  },
  destroyed () {
    this.$store.commit('RESET_CLIADMIN_USER_SETTINGS_STORE_STATE')
  },
  beforeRouteLeave (to, from, next) {
    if (!this.parametersPristine) {
      const answer = window.confirm('Do you really want to leave? You will lose all unsaved changes!')
      if (answer) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
}

</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
