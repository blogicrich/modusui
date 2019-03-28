<template>
  <v-container>
    <wizard-component/>
    <data-table
      :editPerms="editPerms"
      :headers="headers"
      :items="items"
      primaryColor="primary"
      recordIcon="person"
      tableTitle="Personal Details"
    ></data-table>
  </v-container>
</template>

<script>
import apiLib from '@/services/apiLib'
import DataTable from '@/components/base/BaseDataTableComponent'
import WizardComponent from '@/components/base/BaseWizardComponent'
console.log(apiLib.getData('', true))

export default {
  name: 'PersonalDetails',
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
      ]
    }
  },
  computed: {
    items: function () {
      let items = [{}]
      return items
    }
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
