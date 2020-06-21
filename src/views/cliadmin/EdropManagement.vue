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
    <BaseDataTable
      ref="baseDataTable"
      class="mx-4"
      :headers="headers"
      :items="items"
      :editPerms="editPerms"
      :newItem="newItem"
      :primaryColor="primaryColor"
      :secondaryColor="secondaryColor"
      :recordIcon="icon"
      :addRecordIcon="iconAdd"
      addBtnTitle="New eDroplet"
      :loading="loading"
      :loaded="loaded"
      :error="error"
      :errorMsg="errorMsg"
      :loadingMsg="loadingMsg"
      :loadedMsg="loadedMsg"
      :crudIdKey="crudIdKey"
      item-key="macAddress"
      searchLabel="Search Records..."
      tableTitle="User's eDroplets"
      editDialogTitle="Edit eDroplet Records"
      delDialogTitle="Confirm deletetion of selected items?"
      msgDel="Are you sure you want to delete the selected items?"

      @newItem="addItem"
      @itemsEdited="editItems"
      @deleteSelected="deleteItem"
      @itemsCancelled="getItems(readUrl)"
    >
      <template v-slot:newSlot="{ item, itemKey }">
        <v-text-field
          class="ma-1"
          :label="item.cellLabel"
          v-model="item[item.attr]"
          :color="primaryColor"
          outline
          required
          validate-on-blur
          :rules="newItem[itemKey].validators"
        ></v-text-field>
      </template>
      <template v-slot:editSlot="{ item, itemKey, property }">
        <v-layout row align-center justify-start>
          <h2 class="ma-1 text-primary" >{{ item['macAddress'] + ' : ' }}</h2>
          <v-text-field
            :label="newItem.find(attribute => attribute.attr === itemKey).cellLabel"
            v-model="item[itemKey]"
            class="ma-1"
            :color="primaryColor"
            outline
            required
            validata-on-blur
            :rules="newItem.find(attribute => attribute.attr === itemKey).validators"
          >{{ property }}
          </v-text-field>
        </v-layout>
      </template>
    </BaseDataTable>
  </v-container>
</template>

<script>

import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import { dataTableNavGuard } from '@/mixins/dataTableNavGuard.js'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'
import BaseUserSelect from '@/components/base/BaseUserSelectComponent'
import { mapState } from 'vuex'
import validation from '@/mixins/validation'

export default {
  name: 'EdropletManagement',
  mixins: [dataTableNavGuard, crudRoutines, validation],
  components: {
    BaseDataTable,
    BaseUserSelect
  },
  computed: {
    ...mapState({
      selectedUser: state => state.dashboardUsers.selectedUser,
      dashboardUsers: state => state.dashboardUsers.dashboardUsers
    }),
    urls: function () {
      return [{
        ref: [{ statusId: 1, status: 'Live' }, { statusId: 0, status: 'Inactive' }],
        attr: 'operationalStatus',
        key: 'statusId'
      }]
    }
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'local_drink',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'eDroplet Management',
      // BaseDataTable
      crudIdKey: 'baseId',
      items: [],
      editPerms: { create: false, update: true, delete: false },
      loading: true,
      loaded: false,
      error: false,
      errorMsg: ' ',
      loadingMsg: ' ',
      loadedMsg: ' ',
      updateUrl: '/cliadmin/edropman',
      readUrl: '/cliadmin/edropman/',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'local_drink',
      iconAdd: 'build',
      headers: [
        {
          text: 'Base Identifier',
          align: 'left',
          sortable: false,
          value: 'baseId',
          cellType: 'tb',
          hidden: true,
          editable: false
        },
        {
          text: 'Visual Identifier',
          align: 'left',
          sortable: false,
          value: 'visualId',
          cellType: 'tb',
          hidden: true,
          editable: false
        },
        {
          text: 'Registration Date',
          align: 'left',
          sortable: false,
          value: 'dateFirstRegistered',
          cellType: 'tb',
          hidden: true,
          editable: false
        },
        {
          text: 'Status Identifier',
          align: 'left',
          sortable: false,
          value: 'statusId',
          cellType: 'tb',
          hidden: true,
          editable: false
        },
        {
          text: 'Mac Address',
          align: 'left',
          sortable: false,
          value: 'macAddress',
          cellType: 'tb',
          hidden: false,
          editable: true
        },
        {
          text: 'Friendly name',
          align: 'left',
          sortable: false,
          value: 'friendlyName',
          cellType: 'tb',
          hidden: false,
          editable: true
        },
        {
          text: 'Base Mode Identifier',
          align: 'left',
          sortable: false,
          value: 'baseModeId',
          cellType: 'tb',
          hidden: true,
          editable: false
        },
        {
          text: 'Base Comms Identifier',
          align: 'left',
          sortable: false,
          value: 'baseCommsId',
          cellType: 'tb',
          hidden: true,
          editable: false
        },
        {
          text: 'Comms Status',
          align: 'left',
          sortable: false,
          value: 'commsStatus',
          cellType: 'md',
          hidden: true,
          editable: false
        },
        {
          text: 'Operational Status',
          align: 'left',
          sortable: false,
          value: 'operationalStatus',
          cellType: 'md',
          hidden: false,
          editable: true
        },
        {
          text: 'Night Light',
          align: 'left',
          sortable: false,
          value: 'nightLight',
          cellType: 'tb',
          hidden: true,
          editable: true
        }
      ],
      newItem: [
        // {
        //   baseId: '',
        //   cellType: 'tb',
        //   attr: 'baseId',
        //   cellLabel: 'Friendly Name'
        // },
        {
          friendlyName: '',
          cellType: 'tb',
          attr: 'friendlyName',
          cellLabel: 'Friendly Name'
        },
        {
          operationalStatus: '',
          cellType: 'md',
          attr: 'operationalStatus',
          cellLabel: 'Operational Status',
          displayVal: 'status',
          returnVal: 'status'
          // menuItems: []
        }
      ],
      defaultItem: [
        {
          baseId: 0,
          friendlyName: '',
          operationalStatus: ''
        }
      ]
    }
  },
  methods: {
    resetItem () {
      // eslint-disable-next-line no-unused-expressions
      this.newItem = [
        // {
        //   baseId: '',
        //   cellType: 'tb',
        //   attr: 'baseId',
        //   cellLabel: 'Friendly Name'
        // },
        {
          friendlyName: '',
          cellType: 'tb',
          attr: 'friendlyName',
          cellLabel: 'Friendly Name'
        },
        {
          operationalStatus: '',
          cellType: 'md',
          attr: 'operationalStatus',
          cellLabel: 'Operational Status',
          displayVal: 'status',
          returnVal: 'status',
          menuItems: []
        }
      ]
    }
  },
  mounted () {
    this.getItems(this.readUrl)
  }
}

</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
