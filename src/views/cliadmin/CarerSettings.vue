<template>
  <v-container fluid>
    <base-view-header-component
      class="mb-2"
      headerIcon="people"
      headerText="Carer Settings"
      hasDivider
      fullWidth
    />
    <sub-display-table-component
      tableTitleIcon="people"
      :items="items"
      itemKey="deptPersonId"
      :headers="headers"
      :expandable="false"
      :hasRowContent="true"
      :loading="loading"
      :loaded="!loading && !error"
      :error="error"
      errorMsg="Error while loading Carers"
      loadingMsg="Loading Carers..."
      loadedMsg="No Carers to display"
      :infoActionButton="error || ((!items || items.length === 0) && !loading)"
      :infoActionBtnTitle="'Reload Connected Droplets'"
      tableTitle="All Carers in department"
      primaryColor="primary"
      secondaryColor="secondary"
      @row-clicked="handleRowClick"
      @info-action-button-pressed="refresh"
    >
      <v-card
        slot="expandedRow"
        outline
        flat
        class="pb-2"
        v-if="!loading"
      >
        <v-card-title>
          <v-container fluid class="pa-0">
            <v-form v-model="carerValid" @submit.prevent @submit="saveChanges">
              <sub-carer-settings-fields
                v-model="selectedCarer"
                :users="users"
                :alertTypes="alertTypes"
                :communicationMethods="communicationMethods"
              />
              <v-layout>
                <v-spacer />
                <v-btn color="primary" outline :disabled="!carerValid" @click="saveChanges">Save Changes</v-btn>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-title>
      </v-card>
    </sub-display-table-component>
  </v-container>
</template>

<script>
import BaseViewHeaderComponent from '@/components/base/BaseViewHeaderComponent.vue'
import SubDisplayTableComponent from '@/components/sub/SubDisplayTableComponent.vue'
import SubCarerSettingsFields from '@/components/sub/SubCarerSettingsFields.vue'
import { mapState } from 'vuex'
import objectOperations from '../../mixins/objectOperations'

export default {
  components: {
    BaseViewHeaderComponent,
    SubDisplayTableComponent,
    SubCarerSettingsFields
  },
  mixins: [
    objectOperations
  ],
  computed: {
    ...mapState({
      carers: state => state.cliAdminCarer.carers || [],
      users: state => state.cliAdminUsers.cliAdminUsers,
      alertTypes: state => state.commonData.alertTypes,
      communicationMethods: state => state.commonData.communicationMethods,
      loading: state =>
        state.cliAdminCarer.loading ||
        state.cliAdminUsers.cliAdminUsersLoading ||
        state.commonData.commonDataLoadState,
      error: state => state.cliAdminCarer.error || state.cliAdminUsers.cliAdminUsersError
    }),
    items () {
      return this.carers.map((carer) => {
        return {
          raw: carer,
          deptPersonId: carer.deptPerson.deptPersonId,
          salutation: carer.deptPerson.person.salutation,
          userCount: carer.users.length
        }
      })
    },
    isFormPristine () {
      return this.simpleDataDeepCompare(this.selectedCarer, this.selectedCarerOriginal)
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    refresh () {
      this.$store.dispatch('fetchCliAdminUsers')
      this.$store.dispatch('fetchCarers')
      this.$store.dispatch('fetchCommonData')
    },
    handleRowClick (event) {
      this.selectedCarer = {
        deptPersonId: event.item.deptPersonId,
        usersToAssign: event.item.raw.users.map(user => user.userId),
        carerUserMessageMethods: event.item.raw.carerUserMessageMethod.map(item => {
          return {
            userId: item.userId,
            alertTypeId: item.alertType.alertTypeId,
            communicationMethodId: item.communicationMethod.communicationMethodId
          }
        })
      }
      this.selectedCarerOriginal = this.simpleDataDeepCopy(this.selectedCarer)
    },
    saveChanges () {
      this.$store
        .dispatch('updateCarer', this.selectedCarer)
        .then(this.refresh.bind(this))
      this.$store.commit('SET_CARERS', [])
    }
  },
  data () {
    return {
      selectedCarer: null,
      selectedCarerOriginal: null,
      carerValid: false,
      headers: [
        {
          value: 'deptPersonId',
          hidden: true
        },
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'salutation',
          cellType: 'tb'
        },
        {
          text: 'Users assigned',
          align: 'left',
          sortable: false,
          value: 'userCount',
          cellType: 'tb'
        }
      ]
    }
  }
}
</script>
