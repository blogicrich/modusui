<template>
  <v-container fluid>
    <BaseViewHeader
      class="mx-2 mb-2"
      :headerIcon="headerIcon"
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
    <data-table
      ref="baseDataTable"
      class="mx-4"
      :editPerms="editPerms"
      :headers="headers"
      :items="title"
      :loading="loading"
      :loaded="loaded"
      :error="error"
      :errorMsg="errorMsg"
      :loadingMsg="loadingMsg"
      :loadedMsg="loadedMsg"
      primaryColor="primary"
      recordIcon="person"
      tableTitle="Personal Details"
    />
    <v-layout row justify-end>
      <wizard-component />
    </v-layout>
  </v-container>
</template>

<script>
import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import { dataTableNavGuard } from '@/mixins/dataTableNavGuard.js'
import DataTable from '@/components/base/BaseDataTableComponent'
import WizardComponent from '@/components/base/BaseWizardComponent'
import { mapState } from 'vuex'
import BaseUserSelect from '@/components/base/BaseUserSelectComponent'

export default {
  name: 'PersonalDetails',
  mixins: [dataTableNavGuard, crudRoutines],
  components: {
    DataTable,
    WizardComponent,
    BaseUserSelect
  },
  computed: {
    ...mapState({
      selectedUser: state => state.dashboardUsers.selectedUser,
      dashboardUsers: state => state.dashboardUsers.dashboardUsers
    })
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'person',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Personal Details',
      // BaseDataTable
      readUrl: 'cliadmin/personnelsettings' + this.$store.state.eDropletApp.carerId,
      editPerms: { create: false, update: false, delete: false },
      // getUrl: '',
      headers: [
        {
          hidden: false,
          text: 'Title',
          value: 'longDescription',
          sortable: true,
          celltype: 'tb',
          align: 'left'
        },
        {
          hidden: false,
          text: 'Given Name',
          value: 'givenName',
          sortable: true,
          celltype: 'tb',
          align: 'left'
        },
        {
          hidden: false,
          text: 'Family Name',
          value: 'familyName',
          sortable: true,
          celltype: 'tb',
          align: 'left'
        },
        {
          hidden: false,
          text: 'AKA',
          value: 'salutation',
          sortable: true,
          celltype: 'tb',
          align: 'left'
        },
        {
          hidden: false,
          text: 'User Name',
          value: 'itemName',
          sortable: true,
          celltype: 'tb',
          align: 'left'
        }
      ],
      items: [],
      title: [],
      loading: true,
      loaded: false,
      error: false,
      errorMsg: '',
      loadingMsg: '',
      loadedMsg: ''
    }
  },
  methods: {
    async getWizardInfo () {
      await this.$store.dispatch('fetchWizardOptions')
      await this.$store.dispatch('fetchEDropmanGet')
    }
  },
  created () {
    this.getItems(this.getUrl).then(() => {
      this.getWizardInfo()
    })
  },
  mounted () {
    console.log('fjkdjgkjkg: ', this.$store.state.eDropletApp.carerId)
    const parameters = this.$route.query
    console.log('params: ', parameters)
  }
}
</script>
