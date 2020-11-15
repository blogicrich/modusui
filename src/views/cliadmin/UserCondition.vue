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
      :items="items"
      :expandable="false"
      :tableTitleIcon="headerIcon"
      primaryColor="primary"
      secondaryColor="secondary"
      :tableActionButton="selectedHasConditions"
      actionButtonIcon="add"
      actionButtonTitle="Add new User Condition"
      :loading="loadingUserConditions"
      :loaded="!loadingUserConditions"
      :error="errorUserConditions"
      errorMsg="Error loading User Condition records..."
      loadingMsg="Loading User Conditions..."
      loadedMsg="No users records to display"
      item-key="userId"
      searchLabel="Search Records..."
      tableTitle="User Condition Records"
      @row-clicked="setSelectedUser"
      @action-button-pressed="openDialog"
    >
      <v-card
        slot="expandedRow"
        flat
        outline
      >
        <v-form
          ref="editConditionsForm"
          v-model="editFormValid"
        >
          <transition-group name="fade" mode="out-in" appear>
            <v-container
              key="conditionsEditing"
              fluid
            >
              <!-- EDIT MODE CARD HEADER-->
              <v-layout
                v-if="!loadingUserConditions && !updatingUserConditions && !deletingUserConditions"
                row
                fill-height
                justify-end
                align-center
              >
                <transition-group name="fade" mode="out-in" appear>
                  <v-btn
                    key="conditionsRefreshBtn"
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
                    key="conditionsSaveBtn"
                    :disabled="parametersPristine || !editFormValid"
                    :color="$vuetify.theme.primary"
                    dark
                    @click="updateUserConditions()"
                  >
                    <v-icon class="mr-2" small>
                      save
                    </v-icon>
                    {{ 'SAVE' }}
                  </v-btn>
                  <v-btn
                    key="conditionsEditBtn"
                    v-if="selectedHasConditions"
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
              <v-layout
                v-show="!loadingUserConditions && !updatingUserConditions && !deletingUserConditions"
                v-for="(item, index) in selected.conditions"
                :key="item.description + '-' + `${index}`"
              >
                <v-flex>
                  <v-layout
                    row
                    align-center
                    justify-center
                    fill-height
                  >
                    <v-text-field
                      v-show="showField(parameter)"
                      v-for="(value, parameter) in item"
                      :key="parameter"
                      :disabled="(parameter !== 'hydrationAdjustment' || !editing) ? true : false"
                      :value="value"
                      :label="(parameter === 'hydrationAdjustment') ? 'adjustment' : parameter"
                      :color="$vuetify.theme.primary"
                      :rules="parameter === 'hydrationAdjustment' ?
                        [conditionValidation.generic, conditionValidation.threeDp] : []"
                      class="ma-2"
                      outline
                      @input="$store.commit('UPDATE_SELECTED_USER_CONDITIONS', {
                        index: index,
                        parameter: parameter,
                        value: $event
                      })"
                    />
                  </v-layout>
                </v-flex>
                <!-- EDIT ROW BUTTONS -->
                <v-flex shrink>
                  <v-layout row fill-height justify-center align-center>
                    <v-btn icon>
                      <v-icon
                        :disabled="!editing"
                        :color="$vuetify.theme.error"
                        @click="deleteConditions(item.userConditionId)"
                      >
                        delete
                      </v-icon>
                    </v-btn>
                  </v-layout>
                </v-flex>
              </v-layout>
              <!-- NO CONDITIONS RECORD CARD  -->
              <BaseDataTableInfoCard
                v-if="!selectedHasConditions && !loadingUserConditions"
                key="noConditions"
                :loadedMsg="`No user condition data for user: ${selected.username}. Add a new user condition to continue.`"
                :loaded="!selectedHasConditions"
                :color="$vuetify.theme.primary"
                :actionBtn="true"
                :actionBtnTitle="`Add a condition for ${selected.username}`"
                @action-button-pressed="openDialog"
              />
              <!-- UPDATE AND DELETE PROGRESS -->
              <BaseDataTableInfoCard
                key="conditionsProgress"
                :loadingMsg="`Updating ${selected.username} conditions.`"
                :loading="loadingUserConditions || updatingUserConditions || deletingUserConditions"
                :color="$vuetify.theme.primary"
                @action-button-pressed="openDialog"
              />
            </v-container>
          </transition-group>
        </v-form>
      </v-card>
    </SubDisplayTable>
    <!-- ADD NEW CONDITIONS DIALOG -->
    <v-dialog
      ref="newConditionsDialog"
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card class="pa-4">
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{ dialogTitle }}</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn icon dark @click="closeDialog" title="cancel and close">
              <v-icon>close</v-icon>
            </v-btn>
            <v-btn
              icon dark
              :disabled="!newFormValid"
              @click="saveNewConditions"
              title="save and close"
            >
              <v-icon>save</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-form
          v-if="newFormVisible"
          v-model="newFormValid"
          ref="newConditionForm"
        >
          <v-container fluid>
            <v-card-title>
              <v-icon medium :color="$vuetify.theme.primary">{{ icon }}</v-icon>
              <span class="pg-subheader text-primary">{{ `Add conditions for: ${selected.username}` }}</span>
            </v-card-title>
            <BaseDataTableInfoCard
              v-if="!conditionOptions.length"
              :errorMsg="`No conditions available for assignment to user. Please contact your System Administrator.`"
              :error="!conditionOptions.length"
              :color="$vuetify.theme.primary"
              :actionBtn="false"
            />
            <v-card-text v-if="conditionOptions.length">
              <v-layout column justify-center align-space-around>
                <v-layout row fill-height justify-center align-space-between>
                  <v-select
                    :items="conditionOptions"
                    class="ma-2"
                    v-model="newCondition.condition"
                    label="Condition"
                    outline
                    required
                    item-text="description"
                    return-object
                    :rules="[conditionValidation.generic]"
                  />
                  <v-text-field
                    :color="$vuetify.theme.primary"
                    label="Adjustment"
                    placeholder="hydration adjustment"
                    class="ma-2"
                    required
                    :rules="[conditionValidation.generic, conditionValidation.threeDp]"
                    v-model="newCondition.adjustment"
                    type="number"
                    full-width
                    clearable
                    box
                    outline
                    rounded
                  />
                  <v-text-field
                    :color="$vuetify.theme.primary"
                    label="Comments"
                    placeholder="comments"
                    class="pa-2"
                    required
                    :rules="[conditionValidation.generic, conditionValidation.text]"
                    v-model="newCondition.comment"
                    type="text"
                    clearable
                    box
                    outline
                    rounded
                  />
                </v-layout>
              </v-layout>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  :disabled="!newFormValid"
                  title="Add Comment to Day Report"
                  dark
                  :color="$vuetify.theme.primary"
                  @click="stageCondition()"
                >
                  Add
                </v-btn>
                <v-btn
                  :disabled="!newParametersPristine"
                  title="Reset Condition"
                  dark
                  :color="$vuetify.theme.primary"
                  @click="$refs.newConditionForm.reset()"
                >
                  RESET
                </v-btn>
              </v-card-actions>
            </v-card-text>
            <!-- Conditions for Submission -->
            <v-list v-if="conditionOptions.length">
              <v-card-title>
                <v-icon medium :color="$vuetify.theme.primary">{{ icon }}</v-icon>
                <span class="pg-subheader text-primary">Conditions for submission:</span>
              </v-card-title>
              <v-fade-transition group hide-on-leave>
                <v-card
                  v-show="!newUserConditions.length"
                  class="pa-2"
                  tile
                  outline
                  key="nokeyforthisbadboy"
                >
                  <v-card-text class="text-center">
                    NO CONDITIONS TO SUBMIT. PLEASE ADD CONDITION FOR SUBMISSION
                  </v-card-text>
                </v-card>
                <v-card
                  v-show="newUserConditions.length"
                  class="pa-2"
                  v-for="(record, index) in newUserConditions"
                  :key="index"
                  tile
                  outline
                >
                  <v-layout>
                    <v-container grid-list-md>
                      <v-layout row fill-height justify-space-between align-center>
                        <v-flex grow>
                          <span class="accent--text">{{ 'condition: ' + record.condition.description }}</span>
                        </v-flex>
                        <v-flex grow>
                          <span class="accent--text">{{ 'comment: ' + record.comment }}</span>
                        </v-flex>
                        <v-flex grow>
                          <span class="accent--text">{{ 'adjustment: ' + record.adjustment }}</span>
                        </v-flex>
                        <v-spacer />
                        <v-icon
                          :color="$vuetify.theme.error"
                          @click="removeStagedCondition(index)"
                        >
                          close
                        </v-icon>
                      </v-layout>
                    </v-container>
                  </v-layout>
                </v-card>
              </v-fade-transition>
            </v-list>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>

import { mapState } from 'vuex'
import SubDisplayTable from '@/components/sub/SubDisplayTableComponent.vue'
import BaseDataTableInfoCard from '@/components/base/BaseDataTableInfoComponent.vue'
import validation from '@/mixins/validation'

export default {
  name: 'UserConditions',
  mixins: [validation],
  components: {
    SubDisplayTable,
    BaseDataTableInfoCard
  },
  computed: {
    ...mapState({
      // Store data objects
      conditionOptions: state => state.commonData.conditionOptions,
      items: state => state.cliAdminUserConditions.cliAdminUserConditions,
      selected: state => state.cliAdminUserConditions.cliAdminSelectedUserConditions,
      userConditions: state => state.cliAdminUserConditions.cliAdminUserConditions,
      newUserConditions: state => state.cliAdminUserConditions.cliAdminNewUserConditions,
      // Store CRUD Booleans
      deletingUserConditions: state => state.cliAdminUserConditions.cliAdminUserConditionsDeleting,
      updatingUserConditions: state => state.cliAdminUserConditions.cliAdminUserConditionsError,
      loadingUserConditions: state => state.cliAdminUserConditions.cliAdminUserConditionsLoading,
      errorUserConditions: state => state.cliAdminUserConditions.cliAdminUserConditionsError
    }),
    newParametersPristine () {
      let isPristine = true
      for (const condition in this.newCondtion) {
        const element = this.newCondtion[condition]
        if (element !== null) {
          isPristine = false
          return
        }
      }
      return isPristine
    },
    parametersPristine () {
      let isPristine = true
      if (this.selected.conditions) {
        const userId = this.selected.userId
        const pristineConditions = this.userConditions.find(e => e.userId === userId).conditions
        for (let i = 0; i < this.selected.conditions.length; i++) {
          const selectedUserCondition = this.selected.conditions[i]
          const pristineUserCondition = pristineConditions[i]
          if (selectedUserCondition.hydrationAdjustment !== pristineUserCondition.hydrationAdjustment) {
            isPristine = false
            return
          }
        }
      }
      return isPristine
    },
    selectedHasConditions () {
      try {
        if (!this.selected || this.selected === undefined || this.selected.conditions.length <= 0) {
          return false
        } else {
          return true
        }
      } catch (error) {
        if (error instanceof TypeError) {
          return false
        } else {
          console.error(error)
        }
        return false
      }
    }
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'local_pharmacy',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'User Conditions',
      // Data Table
      // tableActionButtonVisible: true,
      // Dialog
      dialog: false,
      dialogTitle: 'Add New Conditions',
      // New Condition Form
      newFormVisible: false,
      newFormValid: false,
      newCondition: {
        condition: null,
        comment: null,
        adjustment: null
      },
      // newCommentDate: null,
      showCommentDatePicker: false,
      reportText: '',
      // Edit Form
      editing: false,
      editFormValid: false,
      // dialog: false,
      confirmationDialog: false,
      deletingData: false,
      spinnerTimeout: null,
      timeoutDuration: 2000,
      icon: 'local_pharmacy',
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
        // {
        //   text: 'comments',
        //   align: 'left',
        //   sortable: true,
        //   value: 'comments',
        //   cellType: 'tb',
        //   hidden: false,
        //   editable: true
        // },
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
      conditionValidation: {
        generic: value => !!value || 'Required.',
        threeDp: value => {
          if (this.numeric3dpRegEx.test(value)) {
            return true
          } else {
            return 'Must be decimal to max. 3 decimal places'
          }
        },
        text: value => {
          if (!value) {
            return false
          } else if (value.length <= 80) {
            return true
          } else {
            return '80 Chars or less'
          }
        }
      }
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.newFormVisible = false
      this.newFormValid = false
      if (this.$refs.newConditionForm) this.$refs.newConditionForm.reset()
      this.$store.commit('RESET_NEW_USER_CONDITIONS')
    },
    openDialog () {
      this.dialog = true
      this.newFormVisible = true
    },
    stageCondition () {
      this.$store.commit('ADD_NEW_USER_CONDITION', { ...this.newCondition })
      this.$refs.newConditionForm.reset()
    },
    removeStagedCondition (index) {
      this.$store.commit('REMOVE_NEW_USER_CONDITION', index)
      this.$refs.newConditionForm.reset()
    },
    resetNewCondition () {
      this.$refs.newConditionForm.reset()
    },
    setSelectedUser (e) {
      this.$store.commit('SET_SELECTED_USER_CONDITIONS', { ...e.item })
    },
    showField (param) {
      if (param === 'conditionsId' || param === 'userConditionId') {
        return false
      } else {
        return true
      }
    },
    async deleteConditions (data) {
      try {
        await this.$store.dispatch('deleteCliAdminUserCondition', data)
      } catch (error) {
        console.error(error)
      }
    },
    async saveNewConditions () {
      try {
        await this.$store.dispatch('postNewUserConditions')
        this.$refs.newConditionForm.reset()
      } catch (error) {
        console.error(error)
      }
    },
    async updateUserConditions () {
      if (this.$refs.editConditionsForm.validate()) {
        try {
          const data = []
          const pristineUserConditions = this.userConditions.find(e => e.userId === this.selected.userId).conditions
          for (let i = 0; i < this.selected.conditions.length; i++) {
            const editedHydrationValue = this.selected.conditions[i]
            const pristineHydrationValue = pristineUserConditions.find(e => e.conditionsId === editedHydrationValue.conditionsId)
            if (editedHydrationValue.hydrationAdjustment !== pristineHydrationValue.hydrationAdjustment) {
              data.push({
                userConditionId: editedHydrationValue.userConditionId,
                data: {
                  userId: this.selected.userId,
                  conditionId: editedHydrationValue.conditionsId,
                  comments: editedHydrationValue.comments,
                  adjustment: editedHydrationValue.hydrationAdjustment
                }
              })
            }
          }
          this.$store.dispatch('updateCliAdminUserCondition', data)
        } catch (error) {
          console.error(error)
        }
      } else {
        this.$refs.editConditionsForm.validate()
      }
    }
  },
  mounted () {
    this.$store.dispatch('fetchCliAdminUserConditions')
  },
  destroyed () {
    this.$store.commit('RESET_CLIADMIN_USER_CONDITIONS_STORE_STATE')
  }
}

</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
