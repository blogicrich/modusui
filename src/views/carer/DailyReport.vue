<template>
  <v-container fluid>
    <SubDisplayTable
      ref="SubDisplayTable"
      tableTitle="Daily Report"
      searchLabel="Search Records..."
      :headers="headers"
      :items="comments"
      :tableActionButton="tableActionButtonVisible"
      actionButtonIcon="person_add"
      actionButtonTitle="Add new comment to daily report"
      tableTitleIcon="menu_book"
      item-key="dayReportId"
      :loading="dayReportLoading && !dayReportError"
      :loaded="!dayReportLoading && !dayReportError"
      :error="dayReportError"
      :errorMsg="`Error retrieving comments for ${username}`"
      loadingMsg="Loading Day Report comments"
      loadedMsg="No comments to display"
      :infoActionButton="dayReportError ? true : false"
      :infoActionBtnTitle="`RELOAD DAY REPORT FOR ${username}`"
      @info-action-button-pressed="$store.dispatch('fetchDailyReport')"
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
              :disabled="editCommentPristine"
              icon
              @click="updateSelectedComment"
              title="save and close"
            >
              <v-icon>save</v-icon>
            </v-btn>
            <v-btn
              v-if="newFormVisible"
              :disabled="!newComments.length"
              icon
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
              <v-layout row fill-height align-center justify-start>
                <v-icon class="mr-2" medium :color="$vuetify.theme.primary">{{ icon }}</v-icon>
                <span class="title primary--text text-truncate">Change Selected Comment</span>
              </v-layout>
              <v-spacer />
              <!-- Delete Comment Confirmation Dialog -->
              <v-dialog v-model="confirmationDialog" persistent max-width="500">
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="$vuetify.breakpoint.mdAndUp"
                    large
                    :color="$vuetify.theme.error"
                    v-on="on"
                  >
                    <div class="secondary--text">
                      {{ 'DELETE COMMENT' }}
                    </div>
                  </v-btn>
                  <v-btn
                    v-if="$vuetify.breakpoint.smAndDown"
                    icon
                    :color="$vuetify.theme.error"
                    v-on="on"
                  >
                    <v-icon :color="$vuetify.theme.secondary">
                      {{ 'delete' }}
                    </v-icon>
                  </v-btn>
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
                      <span v-if="deletingData">{{ 'Deleting: comments dated ' + selectedComment.date }}</span>
                      <span v-if="!deletingData">
                        {{ 'You are about to permanently delete a comment from the day report dated: ' +
                          selectedComment.date + '. Are you sure? This action cannot be undone.'
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
            <v-card-text
              key="editComments"
            >
              <!-- Comment Date Picker -->
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
                  :value="selectedComment.date"
                  @input="$store.commit('UPDATE_SELECTED_COMMENT_DATE', $event)"
                  no-title
                  scrollable
                >
                  <v-spacer />
                  <v-btn flat color="primary" @click="showCommentDatePicker = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.commentDateMenu.save(selectedComment.date)">OK</v-btn>
                </v-date-picker>
              </v-menu>

              <!-- EDIT selected comment -->

              <v-textarea
                :color="$vuetify.theme.primary"
                clearable
                label="Day report"
                placeholder="Report Text"
                required
                :rules="[dayReportValidation.generic, dayReportValidation.text]"
                :value="selectedComment.comments"
                box
                outline
                rounded
                @input="$store.commit('UPDATE_SELECTED_COMMENT', $event)"
              />
              <v-card-actions>
                <v-spacer />
                <RowButton
                  key="editCommentsAddBtn"
                  :disabled="editCommentPristine"
                  :btnColor="$vuetify.theme.primary"
                  :btnTitle="'RESET'"
                  :icon="'refresh'"
                  :iconColor="$vuetify.theme.secondary"
                  @row-button-clicked="$store.commit('UNDO_SELECTED_COMMENT', selectedComment.dayReportId)"
                />
              </v-card-actions>
            </v-card-text>
          </v-container>
        </v-form>

        <!-- Add New Comment to Day Report -->

        <v-form v-if="newFormVisible" v-model="newFormValid" ref="newCommentForm">
          <v-container fluid>
            <v-card-title>
              <v-icon class="mr-2" medium :color="$vuetify.theme.primary">{{ icon }}</v-icon>
              <span class="title primary--text">Add new comment</span>
            </v-card-title>

            <!-- New Comment Date Picker -->

            <v-card-text>
              <v-menu
                ref="commentDateMenu"
                v-model="showCommentDatePicker"
                :close-on-content-click="false"
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
                  :value="newCommentDate"
                  no-title
                  scrollable
                  @input="$store.commit('UPDATE_NEW_COMMENT_DATE', $event)"
                >
                  <v-spacer />
                  <v-btn flat color="primary" @click="showCommentDatePicker = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.commentDateMenu.save(newCommentDate)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-card-text>
            <v-card-text>
              <v-textarea
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
              />
              <v-card-actions>
                <v-spacer />
                <RowButton
                  key="dailyReportAddBtn"
                  :disabled="!newComment"
                  :btnColor="$vuetify.theme.primary"
                  :btnTitle="'ADD'"
                  :icon="'add'"
                  :iconColor="$vuetify.theme.secondary"
                  @row-button-clicked="addCommentToDayReport"
                />
                <RowButton
                  key="dailyReportResetBtn"
                  :disabled="newCommentPristine"
                  :btnColor="$vuetify.theme.primary"
                  :btnTitle="'RESET'"
                  :icon="'refresh'"
                  :iconColor="$vuetify.theme.secondary"
                  @row-button-clicked="$refs.newCommentForm.reset()"
                />
              </v-card-actions>
            </v-card-text>

            <!-- Comments for Submission -->

            <v-list>
              <v-card-title>
                <v-icon medium :color="$vuetify.theme.primary">{{ icon }}</v-icon>
                <span class="title primary--text">Comments for submission:</span>
              </v-card-title>
              <v-fade-transition group hide-on-leave>
                <v-card
                  v-show="!newComments.length && !dayReportUpdating && !dayReportError"
                  class="pa-2"
                  tile
                  outline
                  key="commentsSubmissionCard"
                >
                  <v-card-text class="text-xs-center">NO COMMENTS TO SUBMIT. PLEASE ADD COMMENT FOR SUBMISSION</v-card-text>
                </v-card>
                <v-card
                  v-show="newComments.length && !dayReportUpdating && !dayReportError"
                  class="pa-2"
                  v-for="(record, index) in newComments"
                  :key="index"
                  tile
                  outline
                >
                  <v-layout row fill-height align-center justify-center>
                    <v-layout :class="$vuetify.breakpoint.smAndDown ?
                      'column justify-center' :
                      'row fill-height align-center justify-center'"
                    >
                      <v-flex grow>
                        <span class="accent--text">{{ 'comment: ' + record.comment }}</span>
                      </v-flex>
                      <v-spacer />
                      <v-flex grow>
                        <span class="accent--text">{{ 'date: ' + record.date }}</span>
                      </v-flex>
                    </v-layout>
                    <v-spacer />
                    <v-icon
                      color="pink"
                      class="mx-3"
                      @click="$store.commit('REMOVE_NEW_COMMENT', index)"
                    >
                      close
                    </v-icon>
                  </v-layout>
                </v-card>
              </v-fade-transition>
              <BaseDataTableInfoCard
                :loadingMsg="'Updating comment records...'"
                :loading="dayReportUpdating"
                :errorMsg="'Error updating comment'"
                :error="dayReportError && !dayReportUpdating"
                :color="$vuetify.theme.primary"
                :actionBtn="dayReportError ? true : false"
                :actionBtnTitle="`Reset Daily Report`"
                @action-button-pressed="closeDialog"
              />
            </v-list>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>

import SubDisplayTable from '@/components/sub/SubDisplayTableComponent'
import BaseDataTableInfoCard from '@/components/base/BaseDataTableInfoComponent.vue'
import RowButton from '@/components/base/BaseDisplayTableRowBtn.vue'

import { mapState } from 'vuex'

export default {
  name: 'DailyReport',
  components: {
    SubDisplayTable,
    BaseDataTableInfoCard,
    RowButton

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
      dayReportLoading: state => state.dashboardDailyReport.commentsLoading,
      dayReportError: state => state.dashboardDailyReport.commentsError,
      dayReportUpdating: state => state.dashboardDailyReport.commentsUpdating,
      dayReportDeleting: state => state.dashboardDailyReport.commentsDeleting,
      newComment: state => state.dashboardDailyReport.newComment,
      newCommentDate: state => state.dashboardDailyReport.newCommentDate,
      maxDate: state => state.dashboardDailyReport.maxDate
    }),
    newCommentPristine () {
      if (this.newComment === '' || this.newComment === undefined) return true
      else return false
    },
    editCommentPristine () {
      let isPristine = true
      const pristineComment = this.comments.find(report => this.selectedComment.dayReportId === report.dayReportId)
      if (pristineComment) {
        const pristineComment = this.comments.find(report => this.selectedComment.dayReportId === report.dayReportId)
        if (this.selectedComment.comments === pristineComment.comments &&
          this.selectedComment.date === pristineComment.date) {
          isPristine = true
        } else {
          isPristine = false
        }
      }
      return isPristine
      // return false
    },
    username () {
      return this.selectedUser.deptPerson.person.givenName + ' ' + this.selectedUser.deptPerson.person.familyName
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
      // newCommentDate: null,
      showCommentDatePicker: false,
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
        date: value => value <= this.maxDate || 'Date cannot be after today',
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
      this.$store.commit('ADD_NEW_COMMENT', { date: this.newCommentDate, text: this.newComment })
      this.$refs.newCommentForm.reset()
    },
    dialogTitle () {
      if (this.newFormVisible) {
        return 'Add New Comment to Day Report'
      } else {
        return 'Edit Day Report'
      }
    },
    closeDialog () {
      // RESET ALL BOOLEANS AND STORE OBJECTS
      this.$store.commit('RESET_NEW_COMMENT_STATE')
      this.$store.commit('RESET_SELECTED_COMMENT_STATE')
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
    async updateSelectedComment () {
      if (this.$refs.editCommentForm.validate()) {
        try {
          await this.$store.dispatch('updateComment')
          await this.$store.dispatch('fetchDailyReport')
          this.closeDialog()
        } catch (error) {
          console.error(error)
        }
      } else {
        this.$refs.editCommentForm.validate()
      }
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
          that.confirmationDialog = false
        }, this.timeoutDuration)
      } catch (error) {
        console.error(error)
      }
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
  },
  beforeRouteLeave (to, from, next) {
    if (this.newFormVisible || this.editFormVisible || !this.newCommentPristine || !this.editCommentPristine) {
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
