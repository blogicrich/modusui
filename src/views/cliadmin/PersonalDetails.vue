<template>
  <v-container>
    <v-layout column>
      <BaseViewHeader
        class="mx-2 mb-4"
        :headerIcon="headerIcon"
        :iconColor="iconColor"
        :headerText="headerText"
        showChips
        :chipsText="userText"
      />
      <v-flex x12>
        <data-table
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
        ></data-table>
      </v-flex>
    </v-layout>
    <v-layout row justify-end>
      <wizard-component/>
    </v-layout>
  </v-container>
</template>

<script>
import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import DataTable from '@/components/base/BaseDataTableComponent'
import WizardComponent from '@/components/base/BaseWizardComponent'

export default {
  name: 'PersonalDetails',
  mixins: [crudRoutines],
  components: {
    DataTable,
    WizardComponent
  },
  computed: {
    carerId () {
      if (this.$store.getters.getterCarerId !== null || this.$store.getters.getterCarerId !== undefined) {
        return this.$store.getters.carerId
      } else {
        return ''
      }
    },
    userText: function () {
      let val = this.$store.getters.getterSelectedUser.givenName
      return val
    }
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
