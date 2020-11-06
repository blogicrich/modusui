<template>
  <v-container fluid>
    <BaseDataTable
      ref="baseDataTable"
      class="mx-4"
      tableTitle="Daily Report"
      searchLabel="Search Records..."
      :headers="headers"
      :items="comments"
      :editPerms="{ create: false, update: false, delete: false }"
      primaryColor="primary"
      secondaryColor="secondary"
      :tableActionButton="tableActionButtonVisible"
      actionButtonIcon="person_add"
      actionButtonTitle="Add new comment to daily report"
      recordIcon="menu_book"
      item-key="dayReportId"
      crudIdKey="dayReportId"

      :loading="dayReportLoading"
      :loaded="!dayReportLoading"
      :error="dayReportError"
      errorMsg="Error fetching data. Please check your internet connection and try again"
      loadingMsg="Loading comments"
      loadedMsg="No comments to display"

      @action-button-pressed="openNewDialog"
      @row-clicked="openEditDialog"
    />
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card class="pa-4">
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{ dialogTitle() }}</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn icon dark @click="closeDialog" title="cancel and close">
              <v-icon>close</v-icon>
            </v-btn>
            <v-btn
              v-if="editFormVisible"
              icon dark
              @click="updateSelectedComment"
              title="save and close"
            >
              <v-icon>save</v-icon>
            </v-btn>
            <v-btn
              v-if="newFormVisible"
              icon dark
              @click="saveNewComments"
              title="save and close"
            >
              <v-icon>save</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <!-- Update Existing Comment -->
        <v-form v-if="editFormVisible" v-model="editFormValid" ref="editCommentForm">
          <v-container>
            <v-card-title>
              <v-icon medium :color="$vuetify.theme.primary">{{ icon }}</v-icon>
              <span class="pg-subheader text-primary">Change Selected Comment</span>
              <v-spacer />
              <!-- Delete Comment Confirmation Dialog -->
              <v-dialog v-model="confirmationDialog" persistent max-width="500">
                <template v-slot:activator="{ on }">
                  <v-btn dark large :color="$vuetify.theme.error" v-on="on">DELETE COMMENT</v-btn>
                </template>
                <v-card>
                  <v-card-title
                    class="headline warning lighten-2"
                  >
                    <v-icon class="mr-3" medium :color="$vuetify.theme.error">warning</v-icon>
                    Delete Comment from Day Report?
                  </v-card-title>
                  <v-card-text>
                    <v-layout class="text-xs-center" column align-center>
                      <v-progress-circular v-if="deletingData" indeterminate color="primary" :value="80" />
                      <span v-if="deletingData">{{ 'Deleting: comments dated' + selectedComment.date }}</span>
                      <span v-if="!deletingData">
                        {{ 'You are about to permanently delete a comment from the day report dated: ' +
                          selectedComment.date + ' at ' +
                          selectedComment.time +
                          '. Are you sure? This action cannot be undone.'
                        }}
                      </span>
                    </v-layout>
                  </v-card-text>
                  <v-divider />
                  <v-spacer />
                  <v-card-actions>
                    <v-spacer />
                    <v-btn :color="$vuetify.theme.primary" flat @click.native.prevent="confirmationDialog = false">Cancel</v-btn>
                    <v-btn :color="$vuetify.theme.primary" flat @click.native.prevent="deleteSelectedComment">Delete</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-title>
            <!-- EDIT Form Fields -->
            <v-card-text>
              <v-menu
                ref="commentDateMenu"
                v-model="showCommentDatePicker"
                :close-on-content-click="false"
                :return-value.sync="selectedComment.date"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :value="selectedComment.date"
                    label="Comment Date"
                    prepend-icon="event"
                    readonly
                    :rules="[dayReportValidation.generic, dayReportValidation.date]"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  show
                  current
                  :max="maxDate"
                  v-model="selectedComment.date"
                  no-title scrollable
                >
                  <v-spacer />
                  <v-btn flat color="primary" @click="showCommentDatePicker = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.commentDateMenu.save(selectedComment.date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
              <!-- Comment Time Picker -->
              <v-menu
                ref="commentTimePicker"
                v-model="showCommentTimePicker"
                :close-on-content-click="false"
                :return-value="selectedComment.time"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="selectedComment.time"
                    label="Time"
                    prepend-icon="access_time"
                    readonly
                    v-on="on"
                    @input="$store.commit('UPDATE_NEW_COMMENT_TIME', $event)"
                  />
                </template>
                <v-time-picker
                  v-if="showCommentTimePicker"
                  v-model="selectedComment.time"
                  full-width
                  @click:minute="$refs.commentTimePicker.save(selectedComment.time)"
                />
              </v-menu>
              <v-textarea
                :color="$vuetify.theme.primary"
                clearable
                label="Day report"
                placeholder="Report Text"
                required
                :rules="[dayReportValidation.generic, dayReportValidation.date]"
                v-model="selectedComment.comments"
                box
                outline
                rounded
                type="number"
              />
              <v-card-actions>
                <v-spacer />
                <v-btn
                  title="Rest password fields"
                  dark
                  :color="$vuetify.theme.primary"
                  @click="$store.commit('UNDO_SELECTED_SYSADMIN')"
                >
                  RESET
                </v-btn>
              </v-card-actions>
            </v-card-text>
          </v-container>
        </v-form>

        <!-- Add New Comment to Day Report -->

        <v-form v-if="newFormVisible" v-model="newFormValid" ref="newCommentForm">
          <v-container fluid>
            <v-card-title>
              <v-icon medium :color="$vuetify.theme.primary">{{ icon }}</v-icon>
              <span class="pg-subheader text-primary">Add new comment</span>
            </v-card-title>

            <!-- New Comment Date Picker -->

            <v-card-text>
              <v-menu
                ref="commentDateMenu"
                v-model="showCommentDatePicker"
                :close-on-content-click="false"
                :return-value.sync="newCommentDate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :value="newCommentDate"
                    label="Comment Date"
                    prepend-icon="event"
                    readonly
                    :rules="[dayReportValidation.generic, dayReportValidation.date]"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  show
                  current
                  :max="maxDate"
                  v-model="newCommentDate"
                  no-title scrollable
                >
                  <v-spacer />
                  <v-btn flat color="primary" @click="showCommentDatePicker = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.commentDateMenu.save(newCommentDate)">OK</v-btn>
                </v-date-picker>
              </v-menu>
              <!-- New Comment Time Picker -->
              <v-menu
                ref="commentTimePicker"
                v-model="showCommentTimePicker"
                :close-on-content-click="false"
                :return-value="newCommentTime"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="newCommentTime"
                    label="Time"
                    prepend-icon="access_time"
                    readonly
                    v-on="on"
                    @input="$store.commit('UPDATE_NEW_COMMENT_TIME', $event)"
                  />
                </template>
                <v-time-picker
                  v-if="showCommentTimePicker"
                  v-model="newCommentTime"
                  full-width
                  @click:minute="$refs.commentTimePicker.save(newCommentTime)"
                />
              </v-menu>
            </v-card-text>
            <v-card-text>
              <v-textarea
                :color="$vuetify.theme.primary"
                label="Day report"
                placeholder="Report Text"
                required
                :rules="[dayReportValidation.generic, dayReportValidation.text]"
                :value="newDayReportComment"
                clearable
                box
                outline
                rounded
                @input="$store.commit('UPDATE_NEW_COMMENT', $event)"
              />
              <v-card-actions>
                <v-spacer />
                <v-btn
                  :disabled="!newDayReportComment"
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
              </v-card-actions>
            </v-card-text>

            <!-- Comments for Submission -->

            <v-list>
              <v-card-title>
                <v-icon medium :color="$vuetify.theme.primary">{{ icon }}</v-icon>
                <span class="pg-subheader text-primary">Comments for submission:</span>
              </v-card-title>
              <v-fade-transition group hide-on-leave>
                <v-card
                  v-show="!newComments.length"
                  class="pa-2"
                  tile
                  outline
                  key="nokeyforthisbadboy"
                >
                  <v-card-text class="text-center">NO COMMENTS TO SUBMIT. PLEASE ADD COMMENT FOR SUBMISSION</v-card-text>
                </v-card>
                <v-card
                  v-show="newComments.length"
                  class="pa-2"
                  v-for="(record, index) in newComments"
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
                      <span class="accent--text">{{ record.datetime }}</span>
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

import BaseDataTable from '@/components/base/BaseDataTableComponent'
import { mapState } from 'vuex'

export default {
  name: 'DailyReport',
  components: {
    BaseDataTable
  },
  watch: {
    selectedUser () {
      this.$store.dispatch('fetchDailyReport')
    },
    dashboardSelectedDate () {
      this.$store.dispatch('fetchDailyReport')
    }
  },
  computed: {
    ...mapState({
      selectedUser: state => state.dashboardUsers.selectedUser,
      dashboardSelectedDate: state => state.dashboardDates.dashboardSelectedDate,
      dashboardUsers: state => state.dashboardUsers.dashboardUsers,
      comments: state => state.dashboardDailyReport.comments,
      newComments: state => state.dashboardDailyReport.newComments,
      selectedComment: state => state.dashboardDailyReport.selectedComment,
      dayReportLoading: state => state.dashboardDailyReport.dailyReportLoading,
      dayReportError: state => state.dashboardDailyReport.dayReportError,
      newDayReportComment: state => state.dashboardDailyReport.newComment,
      newDayReportCommentDate: state => state.dashboardDailyReport.newCommentDate,
      maxDate: state => state.dashboardDates.maxDate
    }),
    newCommentPristine () {
      return false
    },
    editCommentPristine () {
      return false
    }
  },
  data () {
    return {
      // BaseDataTable
      tableActionButtonVisible: true,
      selected: [],
      headers: [
        {
          text: 'dayReportId',
          value: 'dayReportId',
          align: 'left',
          sortable: false,
          cellType: 'tb',
          hidden: true,
          editable: false
        },
        {
          text: 'userId',
          value: 'userId',
          align: 'left',
          sortable: false,
          cellType: 'tb',
          hidden: true,
          editable: false
        },
        {
          text: 'Comment',
          value: 'comments',
          align: 'left',
          sortable: true,
          cellType: 'tb',
          hidden: false,
          editable: true
        },
        {
          text: 'Report Date',
          value: 'date',
          align: 'left',
          sortable: false,
          cellType: 'tb',
          hidden: false,
          editable: false
        }
      ],
      // New Dialog
      newFormVisible: false,
      newFormValid: false,
      newCommentDate: null,
      // newCommentDateMenu: false,
      newCommentTime: null,
      showCommentTimePicker: false,
      showCommentDatePicker: false,
      commentTime: null,
      reportText: '',
      // Edit Dialog
      dialog: false,
      editFormValid: false,
      editFormVisible: false,
      // Delete Confirmation Dialog
      confirmationDialog: false,
      deletingData: false,
      spinnerTimeout: null,
      timeoutDuration: 2000,
      icon: 'menu_book',
      dayReportValidation: {
        generic: value => !!value || 'Required.',
        date: value => !!value || 'Required.',
        // date: value => value <= this.maxDate || 'Date cannot be after today',
        text: value => {
          if (value) {
            return value.length <= 320 ? true : 'Max 320 characters'
          } else {
            return 'required'
          }
        }
      }
    }
  },
  methods: {
    addCommentToDayReport () {
      this.$store.commit('ADD_NEW_COMMENT', { date: this.newCommentDate, time: this.newCommentTime, text: this.newDayReportComment })
      this.$refs.newCommentForm.reset()
    },
    deleteItems (e) {
      console.log(e)
    },
    dialogTitle () {
      if (this.newFormVisible) {
        return 'Add New Comment to Day Report'
      } else {
        return 'Edit Day Report'
      }
    },
    editItems (e) {
      console.log(e)
    },
    closeDialog () {
      // REST ALL BOOLEANS AND STORE OBJECTS
      // this.$store.commit('RESET_DAILY_REPORT_STATE')
      this.dialog = false
      this.editFormVisible = false
      this.editFormValid = false
      this.newFormVisible = false
      this.newFormValid = false
      if (this.$refs.editCommentForm) this.$refs.editCommentForm.reset()
      if (this.$refs.newCommentForm) this.$refs.newCommentForm.reset()
    },
    openEditDialog (e) {
      this.$store.commit('SET_SELECTED_COMMENT', e)
      this.editFormVisible = true
      this.newFormVisible = false
      this.dialog = true
    },
    openNewDialog () {
      this.newFormVisible = true
      this.editFormVisible = false
      this.dialog = true
    },
    updateSelectedComment () {

    },
    async deleteSelectedComment () {
      const that = this
      try {
        this.deletingData = true
        await this.$store.dispatch('deleteComment', this.selectedComment)
        await this.$store.dispatch('fetchDailyReport')
        this.spinnerTimeout = setTimeout(function () {
          that.closeDialog()
          that.deletingData = false
        }, this.timeoutDuration)
      } catch (error) {
        // TBI
      }
    },
    refreshItems () {

    },
    async saveNewComments () {
      if (this.newFormVisible) {
        await this.$store.dispatch('postNewComments').then(
          this.closeDialog()
        )
      }
    }
  },
  created () {
    this.$store.dispatch('fetchDailyReport')
  }
}

</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
