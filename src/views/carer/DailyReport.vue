<template>
  <v-container fluid>
    <BaseViewHeader
      v-if="this.$vuetify.breakpoint.mdAndDown"
      :headerIcon="headerIcon"
      :iconColor="iconColor"
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

      :loading="dayReportLoading"
      :loaded="!dayReportLoading"
      :error="dayReportError"
      errorMsg="Error fetching data. Please check your internet connection and try again"
      loadingMsg="Loading comments"
      loadedMsg="No comments to display"

      @row-clicked="openEditDialog"
      @action-button-pressed="openNewDialog"
    />
    <!-- <v-layout justify-center v-if="selectedSysAdmin"> -->
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card class="pa-4">
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{ dialogTitle() }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="closeDialog" title="cancel and close">
              <v-icon>close</v-icon>
            </v-btn>
            <v-btn
              v-if="editFormVisible"
              icon dark
              @click="updateSelectedComment"
              title="save and close">
              <v-icon>save</v-icon>
            </v-btn>
            <v-btn
              v-if="newFormVisible"
              icon dark
              @click="saveNewComments"
              title="save and close">
              <v-icon>save</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <!-- Update Existing Comment -->
        <v-form v-if="editFormVisible" v-model="editFormValid" ref="editCommentForm">
          <v-container>
            <v-card-title>
              <v-icon medium :color="primaryColor">{{ icon }}</v-icon>
              <span class="pg-subheader text-primary">Change Selected Comment</span>
              <v-spacer></v-spacer>
              <!-- Delete Comment Confirmation Dialog -->
              <v-dialog v-model="confirmationDialog" persistent max-width="500">
                <template v-slot:activator="{ on }">
                  <v-btn dark large :color="$vuetify.theme.error" v-on="on">DELETE COMMENT</v-btn>
                </template>
                <v-card>
                  <v-card-title
                    class="headline warning lighten-2"
                  >
                    <v-icon class="mr-3" medium :color="$vuetify.theme.error">Warning</v-icon>
                    Delete Comment from Day Report?
                  </v-card-title>
                  <v-card-text>
                  <v-layout class="text-xs-center" column align-center>
                    <v-progress-circular v-if="deletingData" indeterminate color="primary" :value="80"></v-progress-circular>
                    <span v-if="deletingData">{{ 'Deleting: ' + selectedUsername }}</span>
                    <span v-if="!deletingData">{{ 'You are about to permanently delete this System Administrator: ' + selectedUsername + '. Are you sure? This action cannot be undone.' }}</span>
                  </v-layout>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-spacer></v-spacer>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :color="$vuetify.theme.primary" flat @click.native.prevent="confirmationDialog = false">Cancel</v-btn>
                    <v-btn :color="$vuetify.theme.primary" flat @click.native.prevent="deleteSelectedComment">Delete</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-title>
            <v-card-text v-if="dayReportValidation">
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
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  title="Rest password fields"
                  dark
                  :color="$vuetify.theme.primary"
                  @click="$store.commit('UNDO_SELECTED_SYSADMIN')"
                >RESET
                </v-btn>
              </v-card-actions>
            </v-card-text>
          </v-container>
        </v-form>
        <!-- Add New Comment to Day Report -->
        <v-form v-if="newFormVisible" v-model="newFormValid" ref="newCommentForm">
          <v-container>
            <v-card-title>
              <v-icon medium :color="$vuetify.theme.primary">{{ icon }}</v-icon>
              <span class="pg-subheader text-primary">Add new comment</span>
            </v-card-title>
            <v-card-text>
              <v-textarea
                :color="$vuetify.theme.primary"
                label="Day report"
                placeholder="Report Text"
                required
                :rules="dayReportValidation"
                :value="newDayReportComment"
                clearable
                box
                outline
                rounded
                @input="$store.commit('UPDATE_NEW_COMMENT', $event)"
                >
              </v-textarea>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="newCommentPristine"
                  title="Add Comment to Day Report"
                  dark
                  :color="$vuetify.theme.primary"
                  @click="addCommentToDayReport"
                >Add
                </v-btn>
                <v-btn
                  :disabled="newCommentPristine"
                  title="Reset Comment"
                  dark
                  :color="$vuetify.theme.primary"
                  @click="$refs.newCommentForm.reset()"
                >RESET
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
                  v-for="(comment, index) in newComments"
                  :key="index"
                  tile
                  outline
                >
                  <v-layout>
                    <v-flex grow>
                      <span class="accent--text">{{ comment }}</span>
                    </v-flex>
                    <v-flex shrink>
                      <v-icon 
                        color="pink"
                        @click="$store.commit('REMOVE_NEW_COMMENT', index)"
                      >close</v-icon>
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

import BaseUserSelect from '@/components/base/BaseUserSelectComponent'
import BaseDataTable from '@/components/base/BaseDataTableComponent'
import { mapState } from 'vuex'

export default {
  name: 'DailyReport',
  components: {
    BaseUserSelect,
    BaseDataTable
  },
  computed: {
    ...mapState({
      selectedUser: state => state.dashboardUsers.selectedUser,
      dashboardUsers: state => state.dashboardUsers.dashboardUsers,
      comments: state => state.dashboardDailyReport.comments,
      newComments: state => state.dashboardDailyReport.newComments,
      dayReportLoading: state => state.dashboardDailyReport.dailyReportLoading,
      dayReportError: state => state.dashboardDailyReport.dayReportError,
      newDayReportComment: state => state.dashboardDailyReport.newComment
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
      // BaseViewHeader
      headerIcon: 'menu_book',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Day Report',
      // BaseDataTable
      tableActionButtonVisible: true,
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
      // Edit Dialog
      confirmationDialog: false,
      dialog: false,
      icon: 'menu_book',
      reportText: '',
      newFormVisible: false,
      newFormValid: false,
      editFormVisible: false,
      dayReportValidation: [
        value => !!value || 'Required.',
        value => value.length <= 320 || 'Max 320 characters'
      ]
    }
  },
  methods: {
    addCommentToDayReport () {
      this.$store.commit('ADD_NEW_COMMENT')
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
      // REST ALL BOOLEANS AND STORE OBJECTS
      this.$store.commit('RESET_DAILY_REPORT_STATE')
      this.dialog = false
      this.editFormVisible = false
      this.editFormValid = false
      this.newFormVisible = false
      this.newFormValid = false
      if (this.$refs.editCommentForm) this.$refs.editCommentForm.reset()
      if (this.$refs.newCommentForm) this.$refs.newCommentForm.reset()
      this.reportText = ''
    },
    openEditDialog () {
      // this.$store.commit('SET_SELECTED_SYSADMIN', value)
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
    deleteSelectedComment () {

    },
    saveNewComments () {
      if (this.newFormVisible && this.newFormValid) {
        this.$store.dispatch('postNewComments')
      } 
      // else {
      //   this.$refs.newCommentForm.validate()
      // }
    }
  },
  created () {
    this.$store.dispatch('fetchDailyReport')
  },
}

</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
