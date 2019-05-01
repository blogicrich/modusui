<template>
  <v-container>
    <v-layout row>
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

  data () {
    return {
      editPerms: { create: false, update: false, delete: false },
      getUrl: '/register',
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
    formItems () {
      for (let i = 0; i < this.items[1].length; i++) {
        const element = this.items[1][i]
        this.title.push(element)
      }
    }
  },
  created () {
    this.getItems(this.getUrl).then(() => {
      this.formItems()
    })
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
