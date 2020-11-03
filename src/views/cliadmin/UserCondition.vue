<template>
  <v-container fluid>
    <BaseViewHeader
      class="mx-2 mb-2"
      :headerIcon="headerIcon"
      :headerText="headerText"
      hasDivider
    />
    <!-- <BaseDataTable
      ref="baseDataTable"
      class="mx-4"
      :headers="headers"
      :items="getterUserConditions(selectedUser.userId)"
      :editPerms="editPerms"
      :newItem="newItem"
      :primaryColor="primaryColor"
      :secondaryColor="secondaryColor"
      :recordIcon="icon"
      :addRecordIcon="iconAdd"
      addBtnTitle="New Condition"
      :loading="loading"
      :loaded="loaded"
      :error="error"
      :errorMsg="errorMsg"
      :loadingMsg="loadingMsg"
      :loadedMsg="loadedMsg"
      :crudIdKey="crudIdKey"
      item-key="conditionsId"
      searchLabel="Search Records..."
      tableTitle="User Condition Records"
      newDialogTitle="Add a New Condition Record"
      editDialogTitle="Edit Condition Records"
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
      </template>
    </BaseDataTable> -->
    <v-layout class="mx-4 mb-2" row align-center>
    <v-toolbar color="primary darken-1" dark>
      <v-toolbar-title v-if="$vuetify.breakpoint.smAndUp">
        Assign User Conditions
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- SELECT MESSAGE ALERT TYPE -->
      <v-menu :nudge-width="100">
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on">
            <span>Alert Type</span>
            <v-icon dark>arrow_drop_down</v-icon>
          </v-toolbar-title>
        </template>

        <v-list>
          <v-list-tile
            v-for="alertType in getterAlertTypes"
            :key="alertType"
            @click="$store.dispatch('changeSelectedAlertType', alertType)"
          >
            <v-list-tile-title v-text="alertType"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <!-- SELECT MESSAGE TYPE -->
      <v-menu :nudge-width="100">
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on">
            <span>Message Type</span>
            <v-icon dark>arrow_drop_down</v-icon>
          </v-toolbar-title>
        </template>

        <v-list>
          <v-list-tile
            v-for="commsType in getterCommsTypes"
            :key="commsType"
            @click="$store.dispatch('changeSelectedCommsType', commsType)"
          >
            <v-list-tile-title v-text="commsType"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <!-- TOOLBAR BUTTONS -->
      <v-btn
        v-if="$vuetify.breakpoint.smAndDown"
        :disabled="getterIsPristine"
        icon @click="save"
      >
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn
        v-if="$vuetify.breakpoint.smAndDown"
        :disabled="getterIsPristine"
        icon @click="$store.commit('RESET_MESSAGES')"
      >
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-toolbar>
    </v-layout>
  </v-container>
</template>

<script>
import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import { dataTableNavGuard } from '@/mixins/dataTableNavGuard.js'
import { mapState, mapGetters } from 'vuex'
// import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'
import validation from '@/mixins/validation'

export default {
  name: 'UserConditions',
  mixins: [dataTableNavGuard, crudRoutines, validation],
  components: {
    // BaseDataTable
  },
  computed: {
    ...mapState({
      selectedUser: state => state.dashboardUsers.selectedUser,
      dashboardUsers: state => state.dashboardUsers.dashboardUsers,
      items: state => state.cliAdminUserCondition.cliAdminUserConditions
    }),
    ...mapGetters([
      'getterUserConditions'
    ]),
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'local_pharmacy',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'User Conditions',
      // BaseDataTable
      editPerms: { create: true, update: true, delete: true },
      crudIdKey: 'conditionsId',
      loading: true,
      loaded: false,
      error: false,
      errorMsg: ' ',
      loadingMsg: ' ',
      loadedMsg: ' ',
      delUrl: '/cliadmin/user-condition/',
      updateUrl: '/cliadmin/user-condition/',
      readUrl: '/cliadmin/user-condition/',
      createUrl: '/cliadmin/user-condition/',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'local_pharmacy',
      iconAdd: 'add',
      headers: [
        {
          text: 'conditionsId',
          align: 'left',
          sortable: true,
          value: 'conditionId',
          cellType: 'tb',
          hidden: true,
          editable: false
        },
        {
          text: 'Description',
          align: 'left',
          sortable: true,
          value: 'description',
          cellType: 'tb',
          hidden: false,
          editable: true
        },
        {
          text: 'Status',
          align: 'left',
          sortable: true,
          value: 'status',
          cellType: 'tb',
          hidden: false,
          editable: true
        }
      ],
      newItem: [
        {
          description: '',
          cellType: 'tb',
          attr: 'description',
          cellLabel: 'Description',
          validators: [
            value => !!value || 'Required.',
            value => value.length <= 20 || 'Max 20 characters',
            value => {
              if (this.alphabeticalRegEx.test(value)) {
                return true
              } else {
                return 'Alphabetical characters only'
              }
            }
          ]
        },
        {
          comments: '',
          cellType: 'tb',
          attr: 'comments',
          cellLabel: 'Comments',
          validators: [
            value => !!value || 'Required.',
            value => value.length <= 20 || 'Max 20 characters',
            value => {
              if (this.alphabeticalRegEx.test(value)) {
                return true
              } else {
                return 'Alphabetical characters only'
              }
            }
          ]
        },
        {
          volume: '',
          cellType: 'tb',
          attr: 'volume',
          cellLabel: 'Volume',
          validators: [
            value => !!value || 'Required.'
            // value => value.length <= 20 || 'Max 20 characters',
            // value => {
            //   if (this.alphabeticalRegEx.test(value)) {
            //     return true
            //   } else {
            //     return 'Alphabetical characters only'
            //   }
            // }
          ]
        },
        // {
        //   startdate: '',
        //   cellType: 'tb',
        //   attr: 'startdate',
        //   cellLabel: 'Start Date'
        // },
        // {
        //   enddate: '',
        //   cellType: 'tb',
        //   attr: 'enddate',
        //   cellLabel: 'End Date'
        // },
        {
          status: '',
          cellType: 'tb',
          attr: 'status',
          cellLabel: 'Status'
        }
      ],
      defaultItem: [
        {
          conditionsId: 0,
          userId: 0,
          comments: '',
          status: ''
        }
      ]
    }
  },
  methods: {
    resetItem () {
      this.newItem = [
        {
          description: '',
          cellType: 'tb',
          attr: 'description',
          cellLabel: 'Description',
          validators: [
            value => !!value || 'Required.',
            value => value.length <= 20 || 'Max 20 characters',
            value => {
              if (this.alphabeticalRegEx.test(value)) {
                return true
              } else {
                return 'Alphabetical characters only'
              }
            }
          ]
        },
        {
          comments: '',
          cellType: 'tb',
          attr: 'comments',
          cellLabel: 'Comments',
          menuItems: [],
          validators: [
            value => !!value || 'Required.',
            value => value.length <= 20 || 'Max 20 characters',
            value => {
              if (this.alphabeticalRegEx.test(value)) {
                return true
              } else {
                return 'Alphabetical characters only'
              }
            }
          ]
        },
        {
          volume: '',
          cellType: 'tb',
          attr: 'volume',
          cellLabel: 'Volume',
          validators: [
            value => !!value || 'Required.'
            // value => value.length <= 20 || 'Max 20 characters',
            // value => {
            //   if (this.alphabeticalRegEx.test(value)) {
            //     return true
            //   } else {
            //     return 'Alphabetical characters only'
            //   }
            // }
          ]
        },
        // {
        //   startdate: '',
        //   cellType: 'tb',
        //   attr: 'startdate',
        //   cellLabel: 'Start Date'
        // },
        // {
        //   enddate: '',
        //   cellType: 'tb',
        //   attr: 'enddate',
        //   cellLabel: 'End Date'
        // },
        {
          status: '',
          cellType: 'tb',
          attr: 'status',
          cellLabel: 'Status'
        }
      ]
      this.defaultItem = [
        {
          userId: 0,
          conditionsId: 0,
          comment: '',
          startdate: 0,
          enddate: 0,
          status: ''
        }
      ]
    }
  },
  mounted () {
    this.$store.dispatch('fetchCliAdminUserConditions')
  }
}

</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
