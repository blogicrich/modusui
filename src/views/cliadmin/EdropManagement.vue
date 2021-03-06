<template>
  <v-container fluid>
    <base-view-header-component
      class="mb-2"
      headerIcon="local_drink"
      headerText="Manage Connected Droplets"
      hasDivider
      fullWidth
    />
    <sub-display-table-component
      tableTitleIcon="local_drink"
      :items="items"
      itemKey="baseId"
      :headers="headers"
      :expandable="false"
      :loading="loading"
      :loaded="!loading && !error"
      :error="error"
      errorMsg="Error while loading Connected Droplets"
      loadingMsg="Loading Connected Droplets..."
      loadedMsg="No Connected Droplets to display"
      :infoActionButton="error || ((!droplets || droplets.length === 0) && !loading)"
      :infoActionBtnTitle="'Reload Connected Droplets'"
      :tableActionButton="true"
      actionButtonIcon="add"
      actionButtonTitle="Add new Connected Droplet"
      tableTitle="All Connected Droplets in this account"
      primaryColor="primary"
      secondaryColor="secondary"
      @row-clicked="handleRowClick"
      @action-button-pressed="wizardDialog = true"
      @info-action-button-pressed="$store.dispatch('fetchDroplets')"
    />
    <v-dialog v-model="editDialog" max-width="700">
      <v-card>
        <v-card-title primary-title>
          <v-container fluid pa-0>
            <div class="headline">Edit Connected Droplet</div>
            <base-droplet-editor
              v-if="editDialog"
              :baseId="editBaseId"
              @done-editing="editDialog = false"
            />
          </v-container>
        </v-card-title>
      </v-card>
    </v-dialog>
    <v-dialog v-model="wizardDialog" max-width="700">
      <v-card>
        <v-card-title primary-title>
          <v-container fluid pa-0>
            <div class="headline">Add Connected Droplet to account</div>
            <base-droplet-wizard
              v-if="wizardDialog"
              @done="wizardDialog = false"
            />
          </v-container>
        </v-card-title>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import SubDisplayTableComponent from '@/components/sub/SubDisplayTableComponent.vue'
import BaseViewHeaderComponent from '@/components/base/BaseViewHeaderComponent.vue'
import BaseDropletEditor from '@/components/base/BaseDropletEditor.vue'
import BaseDropletWizard from '@/components/base/BaseDropletWizard'

import { mapState } from 'vuex'

export default {
  name: 'EdropletManagement',
  computed: {
    ...mapState({
      loading: state => state.cliAdminDroplets.loading,
      droplets: state => state.cliAdminDroplets.droplets,
      error: state => state.cliAdminDroplets.error
    }),
    items () {
      if (this.droplets) {
        return this.droplets.map((droplet) => {
          return {
            macAddress: droplet.macAddress,
            friendlyName: droplet.friendlyName || 'No name set',
            assignedTo: droplet.user ? droplet.user.salutation : 'Not assigned',
            baseId: droplet.baseId
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
  methods: {
    handleRowClick (event) {
      this.editBaseId = event.item.baseId
      this.editDialog = true
    }
  },
  data () {
    return {
      editDialog: false,
      editBaseId: null,
      wizardDialog: false,
      headers: [
        {
          value: 'baseId',
          hidden: true
        },
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
    BaseViewHeaderComponent,
    BaseDropletEditor,
    BaseDropletWizard
  }
}
</script>
