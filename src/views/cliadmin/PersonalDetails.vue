<template>
  <v-container>
    <v-layout row>
      <v-flex x12>
        <data-table
          :editPerms="editPerms"
          :headers="headers"
          :items="personalDetails"
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

const getUrl = 'cliadmin/personaldetails'

export default {
  name: 'PersonalDetails',
  mixins: [crudRoutines],
  components: {
    DataTable,
    WizardComponent
  },

  data () {
    return {
      editPerms: { create: false, update: false, delete: false },
      headers: [
        {
          hidden: false,
          text: 'Title',
          value: 'title',
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
      personalDetails: [],
      loading: true,
      loaded: false,
      error: false,
      errorMsg: '',
      loadingMsg: '',
      loadedMsg: ''
    }
  },
  mounted () {
    this.getItems(getUrl)
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
