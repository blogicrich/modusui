<template>
  <v-container fluid>
    <base-view-header-component
      class="mb-2"
      headerIcon="local_drink"
      headerText="Manage Connected Droplets"
      hasDivider
    />
    <sub-display-table-component
      class="mx-4"
      :items="items"
      :headers="headers"
      :expandable="false"
      :loading="loading"
      :tableActionButton="true"
      actionButtonIcon="add"
      actionButtonTitle="Add new Connected Droplet"
      tableTitle="All Connected Droplets in this account"
      primaryColor="primary"
      secondaryColor="secondary"
    />
  </v-container>
</template>

<script>
import SubDisplayTableComponent from '@/components/sub/SubDisplayTableComponent'
import { mapState } from 'vuex'
import BaseViewHeaderComponent from '../../components/base/BaseViewHeaderComponent.vue'

export default {
  name: 'EdropletManagement',
  computed: {
    ...mapState({
      loading: state => state.cliAdminDroplets.loading,
      droplets: state => state.cliAdminDroplets.droplets
    }),
    items () {
      if (this.droplets) {
        return this.droplets.map((droplet) => {
          return {
            macAddress: droplet.macAddress,
            friendlyName: droplet.friendlyName || 'No name set',
            assignedTo: droplet.user ? droplet.user.salutation : 'Not assigned'
          }
        })
      } else {
        return []
      }
    }
  },
  mounted () {
    this.$store.dispatch('fetchDroplets')
  },
  data () {
    return {
      headers: [
        {
          text: 'MAC Address',
          align: 'left',
          sortable: true,
          value: 'macAddress',
          cellType: 'tb',
          hidden: false,
          editable: false
        },
        {
          text: 'Friendly name',
          align: 'left',
          sortable: false,
          value: 'friendlyName',
          cellType: 'tb',
          hidden: false,
          editable: false
        },
        {
          text: 'Assigned to',
          align: 'left',
          sortable: false,
          value: 'assignedTo',
          cellType: 'tb',
          hidden: false,
          editable: false
        }
      ]
    }
  },
  components: {
    SubDisplayTableComponent,
    BaseViewHeaderComponent
  }
}
</script>
