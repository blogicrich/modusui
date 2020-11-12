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
      :expandable="true"
      :tableTitleIcon="headerIcon"
      primaryColor="primary"
      secondaryColor="secondary"
      :tableActionButton="tableActionButtonVisible"
      actionButtonIcon="add"
      actionButtonTitle="Add new User Condition"
      :loading="loadingUserConditions"
      :error="errorUserConditions"
      errorMsg="Error loading User Condition records..."
      loadingMsg="Loading User Conditions..."
      item-key="userId"
      searchLabel="Search Records..."
      tableTitle="User Condition Records"
      @row-clicked="updateSelected"
      @action-button-pressed="openNewDialog"
    >
      <v-card
        v-if="selected"
        slot="expandedRow"
        flat
        outline
      >
        <!-- EDIT CONDITIONS -->
        <v-form v-model="editFormValid" ref="editFrom">
          <v-container fluid>
            <!-- EDIT MODE -->
            <v-layout row fill-height justify-end align-center>
              <v-btn
                :color="$vuetify.theme.primary"
                dark
                @click="editing = !editing"
              >
                <v-icon
                  small
                  class="mr-2"
                >
                  {{ (editing) ? 'lock_open' : 'lock' }}
                </v-icon>
                {{ 'EDIT' }}
              </v-btn>
            </v-layout>

            <v-layout
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
                    :rules="[hydrationAdjustmentValidation.generic, hydrationAdjustmentValidation.threeDp]"
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
              <v-flex shrink>
                <v-layout row fill-height justify-center align-center>
                  <v-btn icon>
                    <v-icon
                      :disabled="!editing"
                      :color="$vuetify.theme.error"
                      @click="$store.dispatch('deleteCliAdminUserCondition', item.userConditionId)"
                    >
                      delete
                    </v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon
                      :disabled="!editing || parametersPristine"
                      :color="$vuetify.theme.primary"
                      @click="$store.commit('RESET_SELECTED_USER_CONDITION', {
                        index: index,
                        userId: selected.userId,
                        conditions: item
                      })"
                    >
                      refresh
                    </v-icon>
                  </v-btn>
                  <v-btn
                    icon
                  >
                    <v-icon
                      :disabled="!editing || parametersPristine"
                      :color="$vuetify.theme.success"
                      class="mr-2"
                      @click="$store.dispatch('updateCliAdminUserCondition',
                          {
                          userConditionId: item.userConditionId,
                          data: {
                            userId: selected.userId,
                            conditionId: item.conditionsId,
                            comments: '',
                            adjustment: item.hydrationAdjustment
                          }
                      })"
                    >
                      save
                    </v-icon>
                  </v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card>
    </SubDisplayTable>
    <!-- ADD NEW CONDITIONS DIALOG -->
    <v-dialog
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
              @click="saveNewConditions"
              title="save and close"
            >
              <v-icon>save</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-form v-if="newFormVisible" v-model="newFormValid" ref="newConditionForm">
          <v-container fluid>
            <v-card-title>
              <v-icon medium :color="$vuetify.theme.primary">{{ icon }}</v-icon>
              <span class="pg-subheader text-primary">Add new comment</span>
            </v-card-title>
            <v-card-text>
              <!-- <v-textarea
                :color="$vuetify.theme.primary"
                label="Day report"
                placeholder="Report Text"
                required
                :rules="[dayReportValidation.generic, dayReportValidation.text]"
                :value="newComment"
                clearable
                box
                outline
                rounded
                @input="$store.commit('UPDATE_NEW_COMMENT', $event)"
              /> -->
              <!-- <v-card-actions>
                <v-spacer />
                <v-btn
                  :disabled="!newComment"
                  title="Add Comment to Day Report"
                  dark
                  :color="$vuetify.theme.primary"
                  @click="addCommentToDayReport"
                >
                  Add
                </v-btn>
                <v-btn
                  :disabled="newCommentPristine"
                  title="Reset Comment"
                  dark
                  :color="$vuetify.theme.primary"
                  @click="$refs.newCommentForm.reset()"
                >
                  RESET
                </v-btn>
              </v-card-actions> -->
            </v-card-text>

            <!-- Comments for Submission -->

            <v-list>
              <v-card-title>
                <v-icon medium :color="$vuetify.theme.primary">{{ icon }}</v-icon>
                <span class="pg-subheader text-primary">Comments for submission:</span>
              </v-card-title>
              <v-fade-transition group hide-on-leave>
                <v-card
                  v-show="!newConditions.length"
                  class="pa-2"
                  tile
                  outline
                  key="nokeyforthisbadboy"
                >
                  <v-card-text class="text-center">NO COMMENTS TO SUBMIT. PLEASE ADD COMMENT FOR SUBMISSION</v-card-text>
                </v-card>
                <v-card
                  v-show="newConditions.length"
                  class="pa-2"
                  v-for="(record, index) in newConditions"
                  :key="index"
                  tile
                  outline
                >
                  <v-layout>
                    <v-flex grow>
                      <span class="accent--text">{{ record.comment }}</span>
                    </v-flex>
                    <v-spacer />
                    <v-flex shrink>
                      <span class="accent--text">{{ record.date }}</span>
                    </v-flex>
                    <v-flex shrink>
                      <v-icon
                        color="pink"
                        class="mx-3"
                        @click="$store.commit('REMOVE_NEW_COMMENT', index)"
                      >
                        close
                      </v-icon>
                    </v-flex>
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
import validation from '@/mixins/validation'

export default {
  name: 'UserConditions',
  mixins: [validation],
  components: {
    SubDisplayTable
  },
  computed: {
    ...mapState({
      // Store data objects
      conditions: state => state.commonData.conditionOptions,
      items: state => state.cliAdminUserConditions.cliAdminUserConditions,
      selected: state => state.cliAdminUserConditions.cliAdminSelectedUserConditions,
      userConditions: state => state.cliAdminUserConditions.cliAdminUserConditions,
      userConditionsClone: state => state.cliAdminUserConditions.cliAdminUserConditionsClone,
      // Store CRUD Booleans
      deletingUserConditions: state => state.cliAdminUserConditions.cliAdminUserConditionsDeleting,
      updatingUserConditions: state => state.cliAdminUserConditions.cliAdminUserConditionsError,
      loadingUserConditions: state => state.cliAdminUserConditions.cliAdminUserConditionsLoading,
      errorUserConditions: state => state.cliAdminUserConditions.cliAdminUserConditionsError
    }),
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
    }
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'local_pharmacy',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'User Conditions',
      // Data Table
      tableActionButtonVisible: true,
      // Dialog
      dialog: false,
      dialogTitle: 'Add New Conditions',
      // New Condition Form
      newFormVisible: false,
      newFormValid: false,
      newConditions: [],
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
      icon: 'menu_book',
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
          text: 'userName',
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
      hydrationAdjustmentValidation: {
        generic: value => !!value || 'Required.',
        threeDp: value => {
          if (this.numeric3dpRegEx.test(value)) {
            return true
          } else {
            return 'Must be decimal to max. 3 decimal places'
          }
        }
      }
    }
  },
  methods: {
    closeDialog () {
      // RESET ALL BOOLEANS AND STORE OBJECTS
      // this.$store.commit('RESET_NEW_CONDITIONS_STATE')
      this.dialog = false
      this.newFormVisible = false
      this.newFormValid = false
      if (this.$refs.newConditionForm) this.$refs.newConditionForm.reset()
    },
    openNewDialog (e) {
      this.dialog = true
      this.newFormVisible = true
    },
    showField (param) {
      if (param === 'conditionsId' || param === 'userConditionId') {
        return false
      } else {
        return true
      }
    },
    saveNewConditions () {
      console.log('SAVING NEW CONDITIONS')
    },
    updateSelected (e) {
      this.$store.commit('SET_SELECTED_USER_CONDITIONS', { ...e.item })
    }
  },
  mounted () {
    this.$store.dispatch('fetchCliAdminUserConditions')
  },
  destroyed () {
    // this.$store.commit('RESET_CLIADMIN_USER_CONDITIONS_STATE')
  }
}

</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
