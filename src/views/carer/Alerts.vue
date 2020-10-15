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
    <!-- <BaseDataTable
      ref="baseDataTable"
      class="mx-4"
      :headers="headers"
      :items="items"
      :editPerms="editPerms"
      :primaryColor="primaryColor"
      :secondaryColor="secondaryColor"
      :recordIcon="icon"
      :addRecordIcon="iconAdd"
      addBtnTitle="New Administrator"
      :loading="loading"
      :loaded="loaded"
      :error="error"
      :errorMsg="errorMsg"
      :loadingMsg="loadingMsg"
      :loadedMsg="loadedMsg"
      item-key="username"
      searchLabel="Search Records..."
      tableTitle="Alerts"
      newDialogTitle="Add a New Administrator Record"
      editDialogTitle="Edit Administrator Records"
      delDialogTitle="Confirm deletetion of selected items?"
      msgDel="Are you sure you want to delete the selected items?"
      :editRules="editRules"
      @newItem="addItem"
      @itemsEdited="editItems"
      @deleteSelected="deleteItem"
      @itemsCancelled="refreshItems"
    /> -->
  </v-container>
</template>

<script>

import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import { mapState } from 'vuex'
// import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'
import BaseUserSelect from '@/components/base/BaseUserSelectComponent.vue'
import validation from '@/mixins/validation'

export default {
  name: 'Alerts',
  mixins: [crudRoutines],
  components: {
    // BaseDataTable,
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
      crudIdKey: 'portalAuthorisedId',
      headerText: 'Alerts',
      headerIcon: 'notification_important',
      items: [],
      editRules: () => [],
      editPerms: { create: false, update: false, delete: false },
      loading: true,
      loaded: false,
      error: false,
      errorMsg: '',
      loadingMsg: '',
      loadedMsg: '',
      // readUrl: 'carer/alerts/' + this.selectedUser.userId + '/' + 1552922626,
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'warning',
      iconAdd: 'person_add',
      headers: [
        {
          text: 'datetime',
          value: 'dateTime',
          align: 'left',
          sortable: true,
          cellType: 'tb',
          hidden: false,
          editable: false
        },
        {
          text: 'Alert Type',
          value: 'description',
          align: 'left',
          sortable: false,
          cellType: 'tb',
          hidden: false,
          editable: false
        }
      ],
      newItem: [
        {
          dateTime: '',
          cellType: 'tb',
          attr: 'dateTime',
          cellLabel: 'datetime',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateTime(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          description: '',
          cellType: 'tb',
          attr: 'description',
          cellLabel: 'Alert Type',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        }
      ],
      defaultItem: [
        {
          dateTime: 0,
          description: ''
        }
      ]
    }
  },
  methods: {
    resetItem () {
      this.newItem = [
        {
          dateTime: '',
          cellType: 'tb',
          attr: 'dateTime',
          cellLabel: 'datetime',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateTime(payload),
              validation.validateRequired(payload)
            ]
          }
        },
        {
          description: '',
          cellType: 'tb',
          attr: 'description',
          cellLabel: 'Alert Type',
          menuItems: [],
          validators: payload => {
            return [
              validation.validateAlphabetical(payload),
              validation.validateRequired(payload)
            ]
          }
        }
      ]
      this.defaultItem = [
        {
          dateTime: 0,
          description: ''
        }
      ]
    }
  },
  mounted () {
    // this.getItems(this.readUrl)
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
