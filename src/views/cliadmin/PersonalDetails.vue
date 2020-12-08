<template>
  <v-container fluid>
    <base-view-header-component
      class="mb-2"
      headerIcon="person"
      headerText="Manage People"
      hasDivider
      fullWidth
    />
    <sub-display-table-component
      tableTitleIcon="person"
      :items="people"
      itemKey="deptPersonId"
      :headers="headers"
      :expandable="false"
      :hasRowContent="true"
      :loading="loading"
      :loaded="!loading && !error"
      :error="error"
      errorMsg="Error while loading People"
      loadingMsg="Loading People..."
      loadedMsg="No people to display"
      :infoActionButton="error || ((!people || people.length === 0) && !loading)"
      :infoActionBtnTitle="'Reload people'"
      :tableActionButton="true"
      actionButtonIcon="add"
      actionButtonTitle="Add new person"
      tableTitle="All people in department"
      primaryColor="primary"
      secondaryColor="secondary"
      @info-action-button-pressed="$store.dispatch('fetchPeople')"
      @row-clicked="handleRowClick"
      @action-button-pressed="showNewPersonPrompt"
    >
      <v-card
        slot="expandedRow"
        outline
        flat
        class="pb-2"
        v-if="!loading && !selectedLoading && !clientAdminsError && selected"
      >
        <v-card-title>
          <v-container fluid class="pa-0">
            <v-form @submit.prevent @submit="saveChanges" v-model="editsValid">
              <v-layout row wrap>
                <v-flex xs12 md6 pa-4>
                  <h2 class="mb-4">Title &amp; Name</h2>
                  <sub-person-details-fields :titles="titles" v-model="selected.raw.person" />
                </v-flex>
                <v-flex xs12 md6 pa-4 v-if="selectedCredentials">
                  <h2 class="mb-4">Credentials</h2>
                  <sub-credentials-fields edit-mode v-model="editableSelectedCredentials" />
                </v-flex>
              </v-layout>
              <v-layout>
                <v-spacer />
                <v-btn
                  :disabled="isFormPristine || !editsValid"
                  color="primary"
                  class="mr-4"
                  type="submit"
                >
                  Save Changes
                </v-btn>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-title>
        <v-layout class="pl-3 ml-4" v-if="isSelectedRootAccount" row align-center>
          <v-icon class="mr-1">info_outline</v-icon>
          <div>This person is the account holder and can therefore not be removed.</div>
        </v-layout>
        <v-card-actions class="ml-4 pl-3 mr-4 pr-3">
          <v-btn outline color="error" :disabled="isSelectedRootAccount" @click="showPersonDeletePrompt">
            Delete Person<v-icon>delete</v-icon>
          </v-btn>
          <v-spacer />
          <template v-if="!isSelectedRootAccount">
            <v-btn color="warning" outline v-if="isSelectedClientAdmin" @click="showAdminDeletePrompt">Remove as Administrator<v-icon>remove</v-icon></v-btn>
            <v-btn color="primary" outline v-else @click="makeAdmin">Make Administrator<v-icon>add</v-icon></v-btn>
          </template>
          <template>
            <v-btn color="warning" outline v-if="isSelectedCarer" @click="showCarerDeletePrompt">Remove as Carer<v-icon>remove</v-icon></v-btn>
            <v-btn color="primary" outline v-else @click="makeCarer">Make Carer<v-icon>add</v-icon></v-btn>
          </template>
          <template>
            <v-btn color="warning" outline v-if="isSelectedUser" @click="showUserDeletePrompt">Remove as User<v-icon>remove</v-icon></v-btn>
            <v-btn color="primary" outline v-else @click="showUserPrompt">Make User<v-icon>add</v-icon></v-btn>
          </template>
        </v-card-actions>
      </v-card>
      <v-card v-else flat slot="expandedRow">
        <v-layout class="pl-2 ma-3" row align-center>
          <v-progress-circular indeterminate color="primary" class="mr-3" />
          <span>Loading related data...</span>
        </v-layout>
      </v-card>
    </sub-display-table-component>

    <v-dialog v-model="showPrompt" max-width="600" v-if="selected">
      <v-card>
        <v-card-title primary-title>
          <v-container fluid pa-0>
            <div class="headline">{{ promptTitle }}</div>
            <div>{{ promptText }}</div>
          </v-container>
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn flat color="primary" @click="showPrompt = false">Cancel</v-btn>
          <v-btn color="error" @click="promptAction"><v-icon class="mr-2">warning</v-icon>Proceed</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="newPersonPrompt" max-width="800" v-if="!loading">
      <v-card>
        <v-form v-model="newPersonValid" @submit.prevent @submit="saveNewPerson">
          <v-card-title primary-title>
            <v-container fluid pa-0>
              <div class="headline">Add a new person</div>
              <sub-person-details-fields v-model="newPerson" :titles="titles" />
            </v-container>
          </v-card-title>
          <v-card-actions class="pa-3">
            <v-btn flat color="primary" @click="newPersonPrompt = false" class="mr">Cancel</v-btn>
            <v-spacer />
            <v-btn flat color="primary" type="submit" :disabled="!newPersonValid">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="newCredentialsPrompt" max-width="800" v-if="!loading">
      <v-card>
        <v-form v-model="newCredentialsValid" @submit.prevent @submit="newCredentialsAction">
          <v-card-title primary-title>
            <v-container fluid pa-0>
              <div class="headline">Add credentials</div>
              <sub-credentials-fields v-model="newCredentials" />
            </v-container>
          </v-card-title>
          <v-card-actions class="pa-3">
            <v-btn flat color="primary" @click="newCredentialsPrompt = false" class="mr">Cancel</v-btn>
            <v-spacer />
            <v-btn flat color="primary" type="submit" :disabled="!newCredentialsValid">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="newUserPrompt" max-width="800" v-if="!loading">
      <v-card>
        <v-form v-model="newUserValid" @submit.prevent @submit="saveUser">
          <v-card-title primary-title>
            <v-container fluid pa-0>
              <div class="headline">Add credentials</div>
              <sub-user-details-fields v-model="newUser" :genders="genderOptions" />
            </v-container>
          </v-card-title>
          <v-card-actions class="pa-3">
            <v-btn flat color="primary" @click="newUserPrompt = false" class="mr">Cancel</v-btn>
            <v-spacer />
            <v-btn flat color="primary" type="submit" :disabled="!newUserValid">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import SubDisplayTableComponent from '@/components/sub/SubDisplayTableComponent.vue'
import BaseViewHeaderComponent from '@/components/base/BaseViewHeaderComponent.vue'
import SubPersonDetailsFields from '@/components/sub/SubPersonDetailsFields.vue'
import SubCredentialsFields from '@/components/sub/SubCredentialsFields.vue'
import SubUserDetailsFields from '@/components/sub/SubUserDetailsFields.vue'
import { mapState } from 'vuex'
import objectOperations from '../../mixins/objectOperations'

export default {
  components: {
    BaseViewHeaderComponent,
    SubDisplayTableComponent,
    SubPersonDetailsFields,
    SubCredentialsFields,
    SubUserDetailsFields
  },
  mixins: [
    objectOperations
  ],
  computed: {
    ...mapState({
      loading: state =>
        state.cliAdminPerson.loading ||
        state.publicTitles.loading ||
        state.commonData.commonDataLoadState ||
        state.cliAdminUsers.cliAdminUsersLoading,
      error: state => state.cliAdminPerson.error || state.publicTitles.error,
      peopleRaw: state => state.cliAdminPerson.people,
      titles: state => state.publicTitles.titles,
      clientAdminsLoading: state => state.cliAdminClientAdministrator.loading,
      clientAdminsError: state => state.cliAdminClientAdministrator.error,
      clientAdmins: state => state.cliAdminClientAdministrator.administrators,
      carers: state => state.cliAdminCarer.carers,
      carersLoading: state => state.cliAdminCarer.loading,
      carersError: state => state.cliAdminCarer.error,
      genderOptions: state => state.commonData.genderOptions
    }),
    selectedLoading () {
      return this.clientAdminsLoading || this.carersLoading
    },
    selectedError () {
      return this.clientAdminsError
    },
    people () {
      if (Array.isArray(this.peopleRaw) && !this.loading) {
        return this.peopleRaw.map((person) => {
          return {
            raw: person,
            deptPersonId: person.deptPersonId,
            title: this.getTitleById(person.person.titleId).longDescription,
            fullName: `${person.person.givenName} ${person.person.familyName}`,
            salutation: person.person.salutation,
            isPortalAuthorised: person.portalAuthorised !== null ? 'Yes' : 'No',
            roles: this.createFormattedRoleList(person)
          }
        })
      } else {
        return []
      }
    },
    isSelectedClientAdmin () {
      return this.selected &&
        this.selected.raw.portalAuthorised !== null &&
        this.selected.raw.portalAuthorised.roles.find(role => role.description === 'CLIENT ADMINISTRATOR') !== undefined
    },
    isSelectedRootAccount () {
      return this.selectedClientAdmin !== null && this.selectedClientAdmin.isAccountHolder
    },
    isSelectedCarer () {
      return this.selected &&
        this.selected.raw.portalAuthorised !== null &&
        this.selected.raw.portalAuthorised.roles.find(role => role.description === 'CARER') !== undefined
    },
    isSelectedUser () {
      return this.selected.raw.user !== null
    },
    selectedClientAdmin () {
      if (!this.isSelectedClientAdmin || !this.clientAdmins) {
        return null
      }

      return this.clientAdmins.find(admin => admin.deptPersonsId === this.selected.deptPersonId) || null
    },
    selectedCarer () {
      if (!this.isSelectedCarer || !this.carers) {
        return null
      }

      return this.carers.find(carer => carer.deptPerson.deptPersonId === this.selected.deptPersonId) || null
    },
    selectedCredentials () {
      if (this.selectedClientAdmin) {
        return this.selectedClientAdmin
      }

      if (this.selectedCarer) {
        return this.selectedCarer.deptPerson.portalAuthorised
      }

      return null
    },
    personChanges () {
      return !this.simpleDataDeepCompare(this.selected, this.selectedOriginal)
    },
    credentialChanges () {
      if (!this.selectedCredentials) {
        return false
      }

      return !this.simpleDataDeepCompare(this.editableSelectedCredentials, this.editableSelectedCredentialsOriginal)
    },
    isFormPristine () {
      return !this.personChanges && !this.credentialChanges
    }
  },
  mounted () {
    this.$store.dispatch('fetchPeople')
    this.$store.dispatch('fetchPublicTitles')
    this.$store.dispatch('fetchCommonData')
  },
  methods: {
    createFormattedRoleList (person) {
      const roles = []

      if (person.portalAuthorised) {
        for (const { description } of person.portalAuthorised.roles) {
          roles.push(description
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.substring(1))
            .join(' ')
          )
        }
      }

      if (person.user) {
        roles.push('User')
      }

      return roles.sort().join(', ')
    },
    getTitleById (titleId) {
      return this.titles.find(title => title.titleId === titleId)
    },
    handleRowClick (event) {
      this.selected = this.simpleDataDeepCopy(event.item)
      this.selectedOriginal = this.simpleDataDeepCopy(event.item)

      if (event.item.raw.portalAuthorised) {
        const roles = event.item.raw.portalAuthorised.roles.map(role => role.description)

        if (roles.includes('CLIENT ADMINISTRATOR')) {
          if (!this.clientAdmins) {
            this.$store.dispatch('fetchClientAdmins')
          }
        }

        if (roles.includes('CARER')) {
          if (!this.carers) {
            this.$store.dispatch('fetchCarers')
          }
        }
      }
    },
    reloadSelected () {
      this.$store.commit('SET_CLIENT_ADMINS', null)
      this.$store.commit('SET_CARERS', null)
      this.handleRowClick({ item: this.people.find(person => person.deptPersonId === this.selected.deptPersonId) })
    },
    showCarerDeletePrompt () {
      this.promptTitle = `Delete ${this.selected.salutation} as carer`
      this.promptText = `
        This will revoke this person's access to all user data. If they are not an administrator then this will also
        prevent them from logging in. This cannot be undone.
      `
      this.promptAction = this.deleteSelectedCarer.bind(this)
      this.showPrompt = true
    },
    deleteSelectedCarer () {
      this.showPrompt = false
      return this.$store
        .dispatch('deleteCarer', this.selected.deptPersonId)
        .then(() => {
          this.$store.dispatch('fetchPeople')
        })
    },
    showUserDeletePrompt () {
      this.promptTitle = `Delete ${this.selected.salutation} as user`
      this.promptText = `
        Any linked Connected Droplets will become available. Any future drink data from this user is discarded. This
        cannot be undone.
      `
      this.promptAction = this.deleteSelectedUser.bind(this)
      this.showPrompt = true
    },
    deleteSelectedUser () {
      this.showPrompt = false
      return this.$store
        .dispatch('deleteCliAdminUser', this.selected.raw.user.userId)
        .then(() => {
          this.$store.dispatch('fetchPeople')
        })
    },
    showAdminDeletePrompt () {
      this.promptTitle = `Delete ${this.selected.salutation} as administrator`
      this.promptText = `
        This user will lose the ability to modify settings for other people. If they are not a carer then they will also
        lose the ability to log in. This cannot be undone.
      `
      this.promptAction = this.deleteSelectedAdmin.bind(this)
      this.showPrompt = true
    },
    deleteSelectedAdmin () {
      this.showPrompt = false
      return this.$store
        .dispatch('deleteClientAdmin', this.selected.deptPersonId)
        .then(() => {
          this.$store.dispatch('fetchPeople')
        })
    },
    showPersonDeletePrompt () {
      this.promptTitle = `Delete ${this.selected.salutation}`
      this.promptText = `
        All data from this person will become inaccessible. All access rights for this person will be revoked. This
        cannot be undone.
      `
      this.promptAction = this.deleteSelectedPerson.bind(this)
      this.showPrompt = true
    },
    async deleteSelectedPerson () {
      this.showPrompt = false
      const jobs = []

      if (this.isSelectedClientAdmin) {
        jobs.push(this.deleteSelectedAdmin())
      }

      if (this.isSelectedCarer) {
        jobs.push(this.deleteSelectedCarer())
      }

      if (this.isSelectedUser) {
        jobs.push(this.deleteSelectedUser())
      }

      await Promise.all(jobs)
      this.$store
        .dispatch('deletePerson', this.selected.deptPersonId)
        .then(() => {
          this.$store.dispatch('fetchPeople')
        })
    },
    showNewPersonPrompt () {
      this.newPerson = {
        titleId: 0,
        givenName: '',
        familyName: '',
        salutation: ''
      }
      this.newPersonPrompt = true
    },
    saveNewPerson () {
      this.newPersonPrompt = false
      return this.$store
        .dispatch('createPerson', this.newPerson)
        .then(() => {
          this.$store.dispatch('fetchPeople')
        })
    },
    saveEditedPerson () {
      return this.$store
        .dispatch('updatePerson', { ...this.selected.raw.person, deptPersonId: this.selected.deptPersonId })
        .then(() => {
          this.$store.dispatch('fetchPeople')
        })
    },
    saveEditedCredentials () {
      if (this.isSelectedClientAdmin) {
        return this.$store
          .dispatch('updateClientAdmin', {
            deptPersonId: this.selected.deptPersonId,
            ...this.editableSelectedCredentials
          })
          .then(() => this.$store.dispatch('fetchPeople'))
      } else {
        return this.$store
          .dispatch('updateCarer', {
            deptPersonId: this.selected.deptPersonId,
            ...this.editableSelectedCredentials,
            usersToAssign: this.selectedCarer.users.map(user => user.userId),
            carerUserMessageMethods: this.selectedCarer.carerUserMessageMethod.map((item) => {
              return {
                carerUserMessageMethodId: item.carerUserMessageMethodId,
                alertTypeId: item.alertType.alertTypeId,
                communicationMethodId: item.communicationMethod.communicationMethodId
              }
            })
          })
          .then(() => this.$store.dispatch('fetchPeople'))
      }
    },
    async saveChanges () {
      const jobs = []

      if (this.personChanges) {
        jobs.push(this.saveEditedPerson())
      }

      if (this.credentialChanges) {
        jobs.push(this.saveEditedCredentials())
      }

      await Promise.all(jobs)
      return this.$store.dispatch('fetchPeople')
    },
    makeCarer () {
      const dispatch = (credentials = {}) => {
        return this.$store
          .dispatch('createCarer', {
            deptPersonId: this.selected.deptPersonId,
            carerUserMessageMethods: [],
            usersToAssign: [],
            ...credentials
          })
          .then(() => {
            this.$store.dispatch('fetchPeople')
          })
      }
      if (this.selectedCredentials) {
        dispatch()
      } else {
        this.resetCredentialsPrompt()
        this.newCredentialsAction = () => {
          this.newCredentialsPrompt = false
          dispatch(this.newCredentials)
        }
        this.newCredentialsPrompt = true
      }
    },
    makeAdmin () {
      const dispatch = (credentials = {}) => {
        this.$store
          .dispatch('createClientAdmin', { deptPersonId: this.selected.deptPersonId, ...credentials })
          .then(() => {
            this.$store.dispatch('fetchPeople')
          })
      }

      if (this.selectedCredentials) {
        dispatch()
      } else {
        this.resetCredentialsPrompt()
        this.newCredentialsAction = () => {
          this.newCredentialsPrompt = false
          dispatch(this.newCredentials)
        }
        this.newCredentialsPrompt = true
      }
    },
    resetCredentialsPrompt () {
      this.newCredentials = {
        username: '',
        email: '',
        mobileNo: '',
        password: ''
      }
    },
    showUserPrompt () {
      this.newUser = {
        genderId: null,
        wakeUpTime: 25200,
        showWakeUpTimePicker: false,
        sleepTime: 79200,
        showSleepTimePicker: false,
        voiceMessageVolume: 75,
        dailyOtherHydrationConsumption: 0,
        miscellaneousAdjustment: 0,
        comments: ''
      }
      this.newUserPrompt = true
    },
    saveUser () {
      this.newUserPrompt = false
      this.$store.dispatch('createCliAdminUser', {
        ...this.newUser,
        deptPersonId: this.selected.deptPersonId
      }).then(() => this.$store.dispatch('fetchPeople'))
    }
  },
  watch: {
    selectedCredentials () {
      this.editableSelectedCredentials = this.simpleDataDeepCopy(this.selectedCredentials)
      this.editableSelectedCredentialsOriginal = this.simpleDataDeepCopy(this.selectedCredentials)
    },
    people () {
      if (this.people.length !== 0 && this.selected) {
        this.reloadSelected()
      }
    }
  },
  data () {
    return {
      editsValid: false,
      selected: null,
      selectedOriginal: null,
      editableSelectedCredentials: null,
      editableSelectedCredentialsOriginal: null,
      showPrompt: false,
      promptTitle: '',
      promptText: '',
      promptAction: () => {},
      newPersonPrompt: false,
      newPersonValid: false,
      newPerson: {
        titleId: 0,
        givenName: '',
        familyName: '',
        salutation: ''
      },
      newCredentialsPrompt: false,
      newCredentialsValid: false,
      newCredentials: {
        username: '',
        email: '',
        mobileNo: '',
        password: ''
      },
      newUserPrompt: false,
      newUserValid: false,
      newUser: {
        genderId: null,
        wakeUpTime: 25200,
        showWakeUpTimePicker: false,
        sleepTime: 79200,
        showSleepTimePicker: false,
        voiceMessageVolume: 75,
        dailyOtherHydrationConsumption: 0,
        miscellaneousAdjustment: 0,
        comments: ''
      },
      newCredentialsAction: () => {},
      headers: [
        {
          value: 'deptPersonId',
          hidden: true
        },
        {
          text: 'Title',
          align: 'left',
          sortable: true,
          value: 'title',
          cellType: 'tb'
        },
        {
          text: 'Full name',
          align: 'left',
          sortable: true,
          value: 'fullName',
          cellType: 'tb'
        },
        {
          text: 'Salutation',
          align: 'left',
          sortable: false,
          value: 'salutation',
          cellType: 'tb'
        },
        {
          text: 'Roles',
          align: 'left',
          sortable: false,
          value: 'roles',
          cellType: 'tb'
        }
      ]
    }
  }
}
</script>
