<template>
  <v-container fluid>
    <BaseViewHeader
      v-if="this.$vuetify.breakpoint.mdAndDown"
      :headerIcon="headerIcon"
      :iconColor="iconColor"
      :headerText="headerText"
      hasDivider
      fullWidth
    />
    <SubDisplayTable
      ref="subDisplayTable"
      :headers="headers"
      :items="sysAdmins"
      :expandable="false"
      :tableTitleIcon="headerIcon"
      :tableActionButton="true"
      actionButtonIcon="person_add"
      actionButtonTitle="Add new System Administrator"
      :infoActionButton="error ? true : false"
      :infoActionBtnTitle="'Reload System Administrators'"
      :loading="loading"
      :loaded="!loading && !error"
      :error="error"
      errorMsg="Error fetching data. Please check your internet connection."
      loadingMsg="Loading System Administrators"
      loadedMsg="No System Administrators records to display"
      item-key="portalAuthorisedId"
      searchLabel="Search Records..."
      tableTitle="System Administrators"
      @row-clicked="openEditDialog"
      @action-button-pressed="openNewDialog"
      @info-action-button-pressed="$store.dispatch('fetchSystemAdmins')"
    />
    <!-- CRUD dialog -->
    <v-layout justify-center v-if="selectedSysAdmin">
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
                :disabled="!editFormValid && !passwordFormValid"
                icon dark
                @click="updateSelectedSysAdmin"
                title="save and close"
              >
                <v-icon>save</v-icon>
              </v-btn>
              <v-btn
                v-if="newFormVisible"
                :disabled="!newFormValid || !passwordFormValid"
                icon dark
                @click="saveNewSysAdmin"
                title="save and close"
              >
                <v-icon>save</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <!-- Change Password -->
          <v-form v-model="passwordFormValid" ref="editSysAdminPasswordForm">
            <v-container>
              <!-- Warning message - Shown if editing logged in user -->
              <v-layout v-if="isCurrentUser" row fill-height align-center justify-center>
                <v-icon class="mr-2" medium :color="$vuetify.theme.warning">info</v-icon>
                <span class="warning--text headline font-weight-bold text-xs-center-xs ma-2">You are editing the user currently logged into the portal. If you successfully change the password you will be directed back to the log in screen</span>
              </v-layout>
              <v-card-title>
                <v-icon class="mr-2" medium :color="$vuetify.theme.primary">{{ icon }}</v-icon>
                <span v-show="editFormVisible" class="title primary--text">Change System Administrator Password</span>
                <span v-show="newFormVisible" class="title primary--text">Set System Administrator Password</span>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  class="ma-1"
                  label="New Password"
                  v-model="newPassword"
                  :color="$vuetify.theme.primary"
                  outline
                  clearable
                  :type="passwordMasked ? 'text' : 'password'"
                  :rules="passwordValidation"
                />
                <v-text-field
                  class="ma-1"
                  label="Repeat New Password"
                  v-model="duplicateNewPassword"
                  :color="$vuetify.theme.primary"
                  outline
                  clearable
                  :type="passwordMasked ? 'text' : 'password'"
                  :rules="passwordValidation"
                />
                <v-card-actions>
                  <v-spacer />
                  <v-btn :color="$vuetify.theme.primary" @click="setPasswordMask">
                    <v-icon
                      title="Password visibility"
                      medium
                      :color="$vuetify.theme.secondary"
                    >
                      {{ passwordMasked ? 'visibility' : 'visibility_off' }}
                    </v-icon>
                  </v-btn>
                  <v-btn
                    title="Rest password fields"
                    dark
                    :color="$vuetify.theme.primary"
                    @click="$refs.editSysAdminPasswordForm.reset()"
                  >
                    RESET
                  </v-btn>
                </v-card-actions>
              </v-card-text>
            </v-container>
          </v-form>
          <!-- Change Existing SysAdmin Details -->
          <v-form v-if="editFormVisible" v-model="editFormValid" ref="editSysAdminDetailsForm">
            <v-container>
              <v-card-title>
                <v-icon class="mr-2" medium :color="$vuetify.theme.primary">{{ icon }}</v-icon>
                <span class="title primary--text">Change System Admin Details</span>
                <v-spacer />
                <!-- Delete Confirmation Dialog -->
                <v-dialog v-model="confirmationDialog" persistent max-width="500">
                  <template v-slot:activator="{ on }">
                    <v-btn dark large :color="$vuetify.theme.error" v-on="on">DELETE SYSTEM ADMINISTRATOR</v-btn>
                  </template>
                  <v-card>
                    <v-card-title
                      class="headline warning lighten-2"
                    >
                      <v-icon class="mr-3" medium :color="$vuetify.theme.error">warning</v-icon>
                      Delete System Administrator?
                    </v-card-title>
                    <v-card-text>
                      <v-layout class="text-xs-center" column align-center>
                        <v-progress-circular v-if="deletingData" indeterminate color="primary" :value="80" />
                        <span v-if="deletingData">{{ 'Deleting: ' + selectedUsername }}</span>
                        <span v-if="!deletingData">{{ 'You are about to permanently delete this System Administrator: ' + selectedUsername + '. Are you sure? This action cannot be undone.' }}</span>
                      </v-layout>
                    </v-card-text>
                    <v-divider />
                    <v-spacer />
                    <v-card-actions>
                      <v-spacer />
                      <v-btn :color="$vuetify.theme.primary" flat @click.native.prevent="confirmationDialog = false">Cancel</v-btn>
                      <v-btn :color="$vuetify.theme.primary" flat @click.native.prevent="deleteSysAdmin">Delete</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-title>
              <v-card-text v-if="sysAdminDetailsValidation">
                <v-text-field
                  class="ma-1"
                  label="username"
                  v-model="selectedUsername"
                  :color="$vuetify.theme.primary"
                  outline
                  required
                  :rules="sysAdminDetailsValidation.generic"
                />
                <v-text-field
                  class="ma-1"
                  label="email"
                  v-model="selectedEmail"
                  :color="$vuetify.theme.primary"
                  outline
                  required
                  :rules="sysAdminDetailsValidation.email"
                />
                <v-text-field
                  class="ma-1"
                  label="mobile"
                  v-model="selectedMobileNo"
                  :color="$vuetify.theme.primary"
                  outline
                  required
                  :rules="sysAdminDetailsValidation.mobileNo"
                />
                <v-select
                  v-if="titles"
                  :items="titles"
                  v-model="selectedTitle"
                  label="Title"
                  outline
                  required
                  item-value="titleId"
                  item-text="shortDescription"
                  :rules="sysAdminDetailsValidation.titles"
                />
                <v-text-field
                  class="ma-1"
                  label="givenName"
                  v-model="selectedGivenName"
                  :color="$vuetify.theme.primary"
                  outline
                  required
                  :rules="sysAdminDetailsValidation.generic"
                />
                <v-text-field
                  class="ma-1"
                  label="familyName"
                  v-model="selectedFamilyName"
                  :color="$vuetify.theme.primary"
                  outline
                  required
                  :rules="sysAdminDetailsValidation.generic"
                />
                <v-text-field
                  class="ma-1"
                  label="salutation"
                  v-model="selectedSalutation"
                  :color="$vuetify.theme.primary"
                  outline
                  required
                  :rules="sysAdminDetailsValidation.generic"
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
          <!-- Add New System Administrator -->
          <v-form v-if="newFormVisible" v-model="newFormValid" ref="newSysAdminDetailsForm">
            <v-container>
              <v-card-title>
                <v-icon class="mr-2" medium :color="$vuetify.theme.primary">{{ icon }}</v-icon>
                <span class="title primary--text">Add new System Administrator</span>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  class="ma-1"
                  label="Username"
                  v-model="newUsername"
                  :color="$vuetify.theme.primary"
                  outline
                  required
                  :rules="sysAdminDetailsValidation.generic"
                />
                <v-text-field
                  class="ma-1"
                  label="Email"
                  v-model="newEmail"
                  :color="$vuetify.theme.primary"
                  outline
                  required
                  :rules="sysAdminDetailsValidation.email"
                />
                <v-text-field
                  class="ma-1"
                  label="Mobile"
                  v-model="newMobileNo"
                  :color="$vuetify.theme.primary"
                  outline
                  required
                  :rules="sysAdminDetailsValidation.mobileNo"
                />
                <v-select
                  v-if="titles"
                  :items="titles"
                  v-model="newTitle"
                  label="Title"
                  outline
                  item-value="titleId"
                  item-text="shortDescription"
                  :rules="sysAdminDetailsValidation.titles"
                />
                <v-text-field
                  class="ma-1"
                  label="Given Name"
                  v-model="newGivenName"
                  :color="$vuetify.theme.primary"
                  outline
                  required
                  :rules="sysAdminDetailsValidation.generic"
                />
                <v-text-field
                  class="ma-1"
                  label="Family Name"
                  v-model="newFamilyName"
                  :color="$vuetify.theme.primary"
                  outline
                  required
                  :rules="sysAdminDetailsValidation.generic"
                />
                <v-text-field
                  class="ma-1"
                  label="Salutation"
                  v-model="newSalutation"
                  :color="$vuetify.theme.primary"
                  outline
                  required
                  :rules="sysAdminDetailsValidation.generic"
                />
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    title="Rest password fields"
                    dark
                    :color="$vuetify.theme.primary"
                    @click="$refs.newSysAdminDetailsForm.reset()"
                  >
                    RESET
                  </v-btn>
                </v-card-actions>
              </v-card-text>
            </v-container>
          </v-form>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>

import SubDisplayTable from '@/components/sub/SubDisplayTableComponent.vue'
import validation from '@/mixins/validation'
import { mapState } from 'vuex'

export default {
  name: 'SystemAdmins',
  mixins: [validation],
  components: {
    SubDisplayTable
  },
  computed: {
    ...mapState({
      currentUser: state => state.eDropletApp.portalAuthorisedId,
      sysAdmins: state => state.systemAdmins.sysAdmins,
      loading: state => state.systemAdmins.sysAdminsLoading,
      error: state => state.systemAdmins.sysAdminsError,
      selectedSysAdmin: state => state.systemAdmins.selectedSysAdmin,
      titles: state => state.titles.titles
    }),
    isCurrentUser () {
      if (this.selectedSysAdmin.portalAuthorisedId === this.currentUser) return true
      else return false
    },
    // Password
    newPassword: {
      get () {
        return this.$store.state.systemAdmins.newPassword
      },
      set (value) {
        this.$store.commit('SET_SYSADMIN_NEW_PASSWORD', value)
      }
    },
    duplicateNewPassword: {
      get () {
        return this.$store.state.systemAdmins.duplicateNewPassword
      },
      set (value) {
        this.$store.commit('SET_SYSADMIN_DUPLICATE_NEW_PASSWORD', value)
      }
    },
    // New Sys Admin
    newTitle: {
      get () {
        return this.$store.state.systemAdmins.newSysAdmin.titleId
      },
      set (value) {
        this.$store.commit('SET_NEW_SYSADMIN_TITLE', value)
      }
    },
    newUsername: {
      get () {
        return this.$store.state.systemAdmins.newSysAdmin.username
      },
      set (value) {
        this.$store.commit('SET_NEW_SYSADMIN_USERNAME', value)
      }
    },
    newEmail: {
      get () {
        return this.$store.state.systemAdmins.newSysAdmin.email
      },
      set (value) {
        this.$store.commit('SET_NEW_SYSADMIN_EMAIL', value)
      }
    },
    newMobileNo: {
      get () {
        return this.$store.state.systemAdmins.newSysAdmin.mobileNo
      },
      set (value) {
        this.$store.commit('SET_NEW_SYSADMIN_MOBILE_NO', value)
      }
    },
    newGivenName: {
      get () {
        return this.$store.state.systemAdmins.newSysAdmin.givenName
      },
      set (value) {
        this.$store.commit('SET_NEW_SYSADMIN_GIVEN_NAME', value)
      }
    },
    newFamilyName: {
      get () {
        return this.$store.state.systemAdmins.newSysAdmin.familyName
      },
      set (value) {
        this.$store.commit('SET_NEW_SYSADMIN_FAMILY_NAME', value)
      }
    },
    newSalutation: {
      get () {
        return this.$store.state.systemAdmins.newSysAdmin.salutation
      },
      set (value) {
        this.$store.commit('SET_NEW_SYSADMIN_SALUTATION', value)
      }
    },
    // Selected Sys Admin
    selectedTitle: {
      get () {
        return this.$store.state.systemAdmins.selectedSysAdmin.titleId
      },
      set (value) {
        this.$store.commit('SET_SELECTED_SYSADMIN_TITLE', value)
      }
    },
    selectedUsername: {
      get () {
        return this.$store.state.systemAdmins.selectedSysAdmin.username
      },
      set (value) {
        this.$store.commit('SET_SELECTED_SYSADMIN_USERNAME', value)
      }
    },
    selectedEmail: {
      get () {
        return this.$store.state.systemAdmins.selectedSysAdmin.email
      },
      set (value) {
        this.$store.commit('SET_SELECTED_SYSADMIN_EMAIL', value)
      }
    },
    selectedMobileNo: {
      get () {
        return this.$store.state.systemAdmins.selectedSysAdmin.mobileNo
      },
      set (value) {
        this.$store.commit('SET_SELECTED_SYSADMIN_MOBILE_NO', value)
      }
    },
    selectedGivenName: {
      get () {
        return this.$store.state.systemAdmins.selectedSysAdmin.givenName
      },
      set (value) {
        this.$store.commit('SET_SELECTED_SYSADMIN_GIVEN_NAME', value)
      }
    },
    selectedFamilyName: {
      get () {
        return this.$store.state.systemAdmins.selectedSysAdmin.familyName
      },
      set (value) {
        this.$store.commit('SET_SELECTED_SYSADMIN_FAMILY_NAME', value)
      }
    },
    selectedSalutation: {
      get () {
        return this.$store.state.systemAdmins.selectedSysAdmin.salutation
      },
      set (value) {
        this.$store.commit('SET_SELECTED_SYSADMIN_SALUTATION', value)
      }
    }
  },
  data () {
    return {
      // Dialogs
      icon: 'person',
      // BaseViewHeader
      headerIcon: 'persons',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'System Administrators',
      // SubDisplayTable
      headers: [
        {
          text: 'PortalId',
          value: 'portalAuthorisedId',
          align: 'left',
          sortable: false,
          cellType: 'tb',
          hidden: true,
          editable: true
        },
        {
          text: 'Username',
          value: 'username',
          align: 'left',
          sortable: false,
          cellType: 'md',
          hidden: false,
          editable: true
        },
        {
          text: 'Title',
          value: 'titleId',
          align: 'left',
          sortable: false,
          cellType: 'md',
          hidden: true,
          editable: true
        },
        {
          text: 'Description',
          value: 'shortDescription',
          align: 'left',
          sortable: false,
          cellType: 'tb',
          hidden: false,
          editable: true
        },
        {
          text: 'Given Name',
          value: 'givenName',
          align: 'left',
          sortable: false,
          cellType: 'tb',
          hidden: false,
          editable: true
        },
        {
          text: 'Family Name',
          value: 'familyName',
          align: 'left',
          sortable: false,
          cellType: 'tb',
          hidden: false,
          editable: true
        },
        {
          text: 'Salutation',
          value: 'salutation',
          align: 'left',
          sortable: false,
          cellType: 'tb',
          hidden: false,
          editable: true
        }
      ],
      // CRUD Dialog
      dialog: false,
      // Delete Confirmation Dialog
      confirmationDialog: false,
      deletingData: false,
      spinnerTimeout: null,
      timeoutDuration: 2000,
      // Change Password Form
      passwordMasked: true,
      passwordFormValid: false,
      passwordValidation: [
        value => {
          if (this.newFormVisible) return !!value || 'Value required.'
        },
        value => {
          if (value) return value.length >= 8 || 'Password must be more than 8 characters.'
          else return 'Value required'
        },
        value => {
          if (value) return value.length <= 72 || 'Password must be less than 72 characters.'
          else return 'Value required'
        },
        value => {
          if (value === this.duplicatePasword || value === this.newPassword) return true
          else return 'Passwords must match'
        }
      ],
      // New System Admin Form
      newFormVisible: false,
      newFormValid: false,
      // Edit System Admin Form
      editFormVisible: false,
      editFormValid: false,
      // Edit and New Form Validators
      sysAdminDetailsValidation: {
        generic: [
          value => !!value || 'Required.',
          value => {
            if (this.alphabeticalRegEx.test(value)) {
              return true
            } else {
              return 'Alphabetical characters only'
            }
          },
          value => {
            if (value) return value.length <= 20 || 'Max 20 characters'
            else return 'Value required'
          }
        ],
        email: [
          value => !!value || 'Required.',
          value => {
            if (this.emailRegEx.test(value)) {
              return true
            } else {
              return 'Must be a valid email address'
            }
          }
        ],
        mobileNo: [
          value => {
            if (this.alphaNumericRegEx.test(value)) {
              return true
            } else {
              return 'Numeric characters only'
            }
          }
        ],
        titles: [
          value => !!value || 'Required.'
        ]
      }
    }
  },
  methods: {
    dialogTitle () {
      if (this.editFormVisible) return 'Edit Selected System Administrator'
      else return 'Add new System Administrator'
    },
    openNewDialog () {
      this.newFormVisible = true
      this.editFormVisible = false
      this.dialog = true
    },
    openEditDialog (value) {
      this.$store.commit('SET_SELECTED_SYSADMIN', value.item)
      this.editFormVisible = true
      this.newFormVisible = false
      this.dialog = true
    },
    closeDialog () {
      // RESET ALL BOOLEANS AND STORE OBJECTS
      this.$store.dispatch('resetBoundFields')
      this.dialog = false
      this.editFormVisible = false
      this.editFormValid = false
      this.newFormVisible = false
      this.newFormValid = false
      this.passwordFormValid = false
      if (this.$refs.editSysAdminPasswordForm) this.$refs.editSysAdminPasswordForm.reset()
      if (this.$refs.editSysAdminDetailsForm) this.$refs.editSysAdminDetailsForm.reset()
      if (this.$refs.newSysAdminDetailsForm) this.$refs.newSysAdminDetailsForm.reset()
    },
    setPasswordMask () {
      if (this.passwordMasked) this.passwordMasked = false
      else this.passwordMasked = true
    },
    // STORE CRUD METHODS
    async getSysAdmins () {
      try {
        this.$store.dispatch('fetchSystemAdmins')
        this.$store.dispatch('fetchTitles')
      } catch (error) {
        console.error(error)
        this.error = true
      }
    },
    async saveNewSysAdmin () {
      if (this.$refs.newSysAdminDetailsForm.validate()) {
        try {
          await this.$store.dispatch('postNewSysAdmin')
          this.getSysAdmins()
        } catch (error) {
          console.error(error)
        }
      } else {
        this.$refs.editSysAdminPasswordForm.validate()
        this.$refs.newSysAdminDetailsForm.validate()
      }
    },
    async updateSelectedSysAdmin () {
      if (this.newPassword) this.$refs.editSysAdminPasswordForm.validate()
      if (this.$refs.editSysAdminDetailsForm.validate()) {
        try {
          await this.$store.dispatch('updateSysAdmin')
          // Check if user is current and re-direct to login
          if (this.isCurrentUser) {
            this.$store.dispatch('LOGOUT')
          } else {
            await this.$store.dispatch('fetchSystemAdmins')
          }
        } catch (error) {
          console.error(error)
        }
      } else {
        this.$refs.editSysAdminDetailsForm.validate()
      }
    },
    async deleteSysAdmin () {
      const that = this
      try {
        this.deletingData = true
        await this.$store.dispatch('deleteSelectedSysAdmin', this.selectedSysAdmin)
        await this.$store.dispatch('fetchSystemAdmins')
        this.spinnerTimeout = setTimeout(function () {
          that.closeDialog()
          that.deletingData = false
        }, this.timeoutDuration)
      } catch (error) {
        console.error(error)
      }
    }
  },
  created () {
    this.getSysAdmins()
  },
  beforeDestroy () {
    this.$store.dispatch('resetSysAdminsState')
    clearTimeout(this.spinnerTimeout)
  }
}
</script>
