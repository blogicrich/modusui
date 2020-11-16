<template>
  <v-container fluid>
    <BaseViewHeader
      class="mx-2 mb-2"
      :headerIcon="headerIcon"
      :headerText="headerText"
      hasDivider
    />
    <SubDisplayTable
      ref="subDisplayTable"
      class="mx-4"
      :headers="headers"
      :items="users"
      :expandable="false"
      :tableTitleIcon="headerIcon"
      primaryColor="primary"
      secondaryColor="secondary"
      :loading="loadingUserSettings"
      :loaded="!loadingUserSettings"
      :error="errorUserSettings"
      errorMsg="Error loading User Settings records..."
      loadingMsg="Loading User Settings..."
      loadedMsg="No User records to display"
      item-key="userId"
      searchLabel="Search Records..."
      tableTitle="User Settings Records"
      @row-clicked="setSelectedUser"
      @action-button-pressed="openDialog"
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
                v-if="!loadingUserSettings && !updatingUserSettings && !deletingUserSettings"
                row
                fill-height
                justify-end
                align-center
              >
                <transition-group name="fade" mode="out-in" appear>
                  <v-btn
                    key="settingsRefreshBtn"
                    :disabled="!editing || parametersPristine"
                    :color="$vuetify.theme.primary"
                    dark
                    @click="$store.commit('RESET_SELECTED_USER_CONDITIONS', { userId: selected.userId })"
                  >
                    <v-icon class="mr-2" small>
                      refresh
                    </v-icon>
                    {{ 'REFRESH' }}
                  </v-btn>
                  <v-btn
                    key="settingsSaveBtn"
                    :disabled="parametersPristine || !editFormValid"
                    :color="$vuetify.theme.primary"
                    dark
                    @click="updateUserSettings()"
                  >
                    <v-icon class="mr-2" small>
                      save
                    </v-icon>
                    {{ 'SAVE' }}
                  </v-btn>
                  <v-btn
                    key="settingsEditBtn"
                    :color="$vuetify.theme.primary"
                    dark
                    @click="editing = !editing"
                  >
                    <v-icon
                      class="mr-2"
                      small
                    >
                      {{ (editing) ? 'lock_open' : 'lock' }}
                    </v-icon>
                    {{ 'EDIT' }}
                  </v-btn>
                </transition-group>
              </v-layout>
              <!-- EDIT ROWS -->
              <!-- <v-layout
                v-show="!loadingUserSettings && !updatingUserSettings && !deletingUserSettings"
                v-for="(item, index) in selected"
                :key="item.userId + '-' + `${index}`"
              > -->
              <v-flex>
                <v-layout
                  row
                  align-center
                  justify-center
                  fill-height
                >
                  <v-menu
                    ref="wakeUpTimePicker"
                    v-model="showWakeUpTimePicker"
                    :close-on-content-click="false"
                    :nudge-right="60"
                    :return-value="wakeUpTime"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        class="mx-3"
                        v-model="wakeUpTime"
                        label="Wake up time"
                        prepend-icon="brightness_5"
                        readonly
                        v-on="on"
                        :rules="[timeValidation.generic]"
                      />
                    </template>
                    <v-time-picker
                      v-if="showWakeUpTimePicker"
                      v-model="wakeUpTime"
                      full-width
                      @click:minute="$refs.wakeUpTimePicker.save(wakeUpTime)"
                    />
                  </v-menu>
                  <v-menu
                    ref="sleepTimePicker"
                    v-model="showSleepTimePicker"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value="sleepTime"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        class="mx-3"
                        v-model="sleepTime"
                        label="Sleep time"
                        prepend-icon="brightness_3"
                        readonly
                        v-on="on"
                        :rules="[timeValidation.generic]"
                      />
                    </template>
                    <v-time-picker
                      v-if="showSleepTimePicker"
                      v-model="sleepTime"
                      full-width
                      @click:minute="$refs.sleepTimePicker.save(sleepTime)"
                    />
                  </v-menu>
                </v-layout>
                <v-layout row wrap fill-height justify-space-between>
                  <!-- <v-flex xs12 lg6>
                    <BaseRadioOptions
                      @radio-option-changed="onChange"
                      :radioConfig="intervalSettings.blueLightFlashingIntervals"
                      :defaultValue="selectedBlueLightFlashingInterval.time"
                      :groupHeader="drinkGroupHeader"
                      :groupDescription="drinkRadioDescription"
                      :radioHeader="drinkRadioHeader"
                      :height="height"
                      suffix=" mins"
                    />
                  </v-flex> -->
                  <!-- <v-flex xs12 lg6>
                    <BaseRadioOptions
                      @radio-option-changed="onChange"
                      :radioConfig="intervalSettings.voiceReminderIntervals"
                      :groupHeader="voiceGroupHeader"
                      :defaultValue="selectedVoiceReminderInterval.time"
                      :groupDescription="voiceRadioDescription"
                      :radioHeader="voiceRadioHeader"
                      :height="height"
                      suffix=" mins"
                    />
                  </v-flex> -->
                </v-layout>
              </v-flex>
              <!-- </v-layout> -->
              <!-- NO SETTINGS RECORD CARD  -->
              <BaseDataTableInfoCard
                v-if="!users.length && loadingUserSettings"
                key="noConditions"
                :loadedMsg="`No user settings data for user: ${selected.username}.`"
                :loaded="!loadingUserSettings"
                :color="$vuetify.theme.primary"
              />
              <!-- UPDATE PROGRESS -->
              <BaseDataTableInfoCard
                key="conditionsProgress"
                :loadingMsg="`Updating ${selected.username} conditions.`"
                :loading="loadingUserSettings || updatingUserSettings || deletingUserSettings"
                :color="$vuetify.theme.primary"
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
import validation from '@/mixins/validation'

export default {
  name: 'UserSettingsManagement',
  mixins: [validation],
  components: {
    SubDisplayTable,
    BaseDataTableInfoCard
  },
  computed: {
    ...mapState({
      // Store data objects
      users: state => state.cliAdminUsers.cliAdminUsers,
      selected: state => state.cliAdminUsers.cliAdminSelectedUser,
      // Store CRUD Booleans
      deletingUserSettings: state => state.cliAdminUsers.cliAdminUsersDeleting,
      updatingUserSettings: state => state.cliAdminUsers.cliAdminUsersError,
      loadingUserSettings: state => state.cliAdminUsers.cliAdminUsersLoading,
      errorUserSettings: state => state.cliAdminUsers.cliAdminUsersError,
      conditionOptions: state => state.commonData.conditionOptions,
      // Options Select
      intervalSettings: state => state.commonData.intervalOptions.blueFlashingLightInterval,
      selectedIntervals: state => state.intervalSettings.intervalSettings.currentSettings
    }),
    parametersPristine () {
      return true
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
      sleepTime: 0,
      showSleepTimePicker: false,
      showWakeUpTimePicker: false,
      wakeUpTime: 0,
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
      timeValidation: {
        generic: value => !!value || 'Required.'
      }
    }
  },
  methods: {
    setSelectedUser (e) {
      this.$store.commit('SET_SELECTED_USER_SETTINGS', { ...e.item })
    },
    showField (param) {
      if (param === 'conditionsId' || param === 'userConditionId') {
        return false
      } else {
        return true
      }
    },
    async updateUserSettings () {
      if (this.$refs.editSettingsForm.validate()) {
        try {

        } catch (error) {
          console.error(error)
        }
      } else {
        this.$refs.editSettingsForm.validate()
      }
    }
  },
  mounted () {},
  destroyed () {}
}

</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
