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
    >
      <v-card
        slot="expandedRow"
        outline
        flat
        class="pb-2"
        v-if="!loading && !selectedLoading && !clientAdminsError && selected"
      >
        <v-card-title>
          <v-container fluid pa-2>
            <h2 class="mb-4">Title &amp; Name</h2>
            <v-form @submit.prevent>
              <sub-person-details-fields :titles="titles" v-model="selected.raw.person" />
              <v-layout>
                <v-spacer />
                <v-btn color="primary" class="mr-0" type="submit">Save Changes</v-btn>
              </v-layout>
            </v-form>
          </v-container>
          <v-container fluid pa-2 v-if="selectedCredentials">
            <h2 class="mb-4">Credentials</h2>
            <v-form @submit.prevent>
              <sub-credentials-fields edit-mode v-model="editableSelectedCredentials" />
              <v-layout>
                <v-spacer />
                <v-btn color="primary" class="mr-0" type="submit">Save Changes</v-btn>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-title>
        <v-layout class="pl-2 ml-3" v-if="isSelectedRootAccount" row align-center>
          <v-icon class="mr-1">info_outline</v-icon>
          <div>This person is the account holder and can therefore not be removed.</div>
        </v-layout>
        <v-card-actions>
          <v-btn
            class="ml-3"
            color="error"
            flat
            :disabled="isSelectedRootAccount"
          >
            Delete Person<v-icon>delete</v-icon>
          </v-btn>
          <v-spacer />
          <template v-if="!isSelectedRootAccount">
            <v-btn color="warning" flat v-if="isSelectedClientAdmin">Remove as Administrator<v-icon>remove</v-icon></v-btn>
            <v-btn color="primary" flat v-else>Make Administrator<v-icon>add</v-icon></v-btn>
          </template>
          <template>
            <v-btn color="warning" flat v-if="isSelectedCarer">Remove as Carer<v-icon>remove</v-icon></v-btn>
            <v-btn color="primary" flat v-else>Make Carer<v-icon>add</v-icon></v-btn>
          </template>
          <template>
            <v-btn color="warning" flat v-if="isSelectedUser">Remove as User<v-icon>remove</v-icon></v-btn>
            <v-btn color="primary" flat v-else>Make User<v-icon>add</v-icon></v-btn>
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
  </v-container>
</template>

<script>
import SubDisplayTableComponent from '@/components/sub/SubDisplayTableComponent.vue'
import BaseViewHeaderComponent from '@/components/base/BaseViewHeaderComponent.vue'
import SubPersonDetailsFields from '@/components/sub/SubPersonDetailsFields.vue'
import SubCredentialsFields from '@/components/sub/SubCredentialsFields.vue'
import { mapState } from 'vuex'

export default {
  components: {
    BaseViewHeaderComponent,
    SubDisplayTableComponent,
    SubPersonDetailsFields,
    SubCredentialsFields
  },
  computed: {
    ...mapState({
      loading: state => state.cliAdminPerson.loading || state.publicTitles.loading,
      error: state => state.cliAdminPerson.error || state.publicTitles.error,
      peopleRaw: state => state.cliAdminPerson.people,
      titles: state => state.publicTitles.titles,
      clientAdminsLoading: state => state.cliAdminClientAdministrator.loading,
      clientAdminsError: state => state.cliAdminClientAdministrator.error,
      clientAdmins: state => state.cliAdminClientAdministrator.administrators,
      carers: state => state.cliAdminCarer.carers,
      carersLoading: state => state.cliAdminCarer.loading,
      carersError: state => state.cliAdminCarer.error
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
      return this.selected.user !== null
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
    }
  },
  mounted () {
    this.$store.dispatch('fetchPeople')
    this.$store.dispatch('fetchPublicTitles')
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
    simpleDataDeepCopy (object) {
      return JSON.parse(JSON.stringify(object))
    }
  },
  watch: {
    selectedCredentials () {
      this.editableSelectedCredentials = this.simpleDataDeepCopy(this.selectedCredentials)
    }
  },
  data () {
    return {
      selected: null,
      editableSelectedCredentials: null,
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
