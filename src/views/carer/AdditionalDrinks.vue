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
      :items="additionalDrinks"
      :editPerms="{ create: false, update: false, delete: true }"
      :primaryColor="primaryColor"
      :secondaryColor="secondaryColor"
      :recordIcon="icon"
      :addRecordIcon="iconAdd"
      :tableActionButton="tableActionButton"
      :actionButtonIcon="newBtnIcon"
      :actionButtonTitle="newBtnTitle"
      :loading="loading"
      :loaded="loaded"
      :error="error"
      :errorMsg="errorMsg"
      :loadingMsg="loadingMsg"
      :loadedMsg="loadedMsg"
      searchLabel="Search Records..."
      tableTitle="Additional Drinks"

      @deleteSelected="deleteItem"
      @action-button-pressed="openNewDialog"
    />

    <!-- CRUD dialog -->

    <v-layout justify-center>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card class="pa-4">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Additional Drinks</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon dark @click="closeDialog" title="cancel and close">
                <v-icon>close</v-icon>
              </v-btn>
              <v-btn
                icon dark
                @click="saveNewDrink"
                title="save and close">
                <v-icon>save</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <!-- Add New Drink -->
          <v-form v-model="newFormValid" ref="newSysAdminDetailsForm">
            <v-container>
              <v-card-title>
                <v-icon medium :color="primaryColor">{{ icon }}</v-icon>
                <span class="pg-subheader text-primary">Add Drink</span>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  class="ma-1"
                  label="Username"
                  v-model="foo1"
                  color="primaryColor"
                  outline
                  required
                  validate-on-blur
                  :rules="newDrinkValidation.generic"
                ></v-text-field>
                <v-text-field
                  class="ma-1"
                  label="Email"
                  v-model="foo2"
                  color="primaryColor"
                  outline
                  required
                  validate-on-blur
                  :rules="newDrinkValidation.email"
                ></v-text-field>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    title="Rest password fields"
                    dark
                    :color="$vuetify.theme.primary"
                    @click="$refs.newSysAdminDetailsForm.reset()"
                  >RESET
                  </v-btn>
                </v-card-actions>
              </v-card-text>
            </v-container>
          </v-form>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>

import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import { dataTableNavGuard } from '@/mixins/dataTableNavGuard.js'
import { mapState } from 'vuex'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'
import BaseUserSelect from '@/components/base/BaseUserSelectComponent.vue'
import validation from '@/mixins/validation'

export default {
  name: 'AdditionalDrinks',
  mixins: [dataTableNavGuard, crudRoutines, validation],
  components: {
    BaseDataTable,
    BaseUserSelect
  },
  computed: {
    ...mapState({
      selectedUser: state => state.dashboardUsers.selectedUser,
      dashboardUsers: state => state.dashboardUsers.dashboardUsers,
      drinks: state => state.dashboardDrinks.drinks,
      additionalDrinks: state => state.dashboardDrinks.additionalDrinks,
      drinksLoading: state => state.dashboardDrinks.drinksLoading
    })
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'local_drink',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Additional Drinks',
      // BaseDataTable
      foo1: '',
      foo2: '',
      newFormVisible: false,
      newFormValid: false,
      dialog: false,
      tableActionButton: true,
      newBtnIcon: 'add',
      newBtnTitle: 'Add Manual Drink',
      crudIdKey: 'dateTime',
      // editPerms: { create: true, update: false, delete: true },
      loading: this.drinksLoading,
      loaded: !this.drinksLoading,
      error: false,
      errorMsg: 'Unable to get additonal drinks data',
      loadingMsg: 'Fetching additional drinks data',
      loadedMsg: 'No Additional Drinks to display',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'local_drink',
      iconAdd: 'add',
      pagination: {
        sortBy: 'dateTime'
      },
      headers: [
        { 
          text: 'Friendly Name', 
          align: 'left', 
          sortable: true, 
          cellType: 'tb', 
          value: 'friendlyName',
          hidden: true,
          editable: true 
        },
        { 
          text: 'MAC Address', 
          align: 'left', 
          sortable: true, 
          cellType: 'tb', 
          value: 'macAddress',
          hidden: false,
          editable: true 
        },
        { 
          text: 'Volume', 
          align: 'left', 
          sortable: true, 
          cellType: 'tb', 
          value: 'volumeInLitres',
          hidden: false,
          editable: true 
        },
        { 
          text: 'Datetime', 
          align: 'left', 
          sortable: true, 
          cellType: 'tb', 
          value: 'dateTime', 
          hidden: true,
          editable: true 
        },
        { 
          text: 'Date', 
          align: 'left', 
          sortable: true, 
          cellType: 'tb', 
          value: 'longFormDate', 
          hidden: false,
          editable: true 
        },
      ],
      newDrinkValidation: {
        generic: [
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
      }
    }
  },
  methods: {
    // STORE CRUD METHODS
    async fetchDashboardDrinks () {
      try {
        this.$store.dispatch('fetchDashboardDrinks')
      } catch (error) {
        this.error = true
      }
    },
    // Dialogs
    closeDialog () {
      this.dialog = false;
      this.newFormVisible = false;
    },
    openNewDialog () {
      this.dialog = true
      this.newFormVisible = true
    },
    saveNewDrink () {
      console.log("SAVING!")
    }
  },
  created () {
    this.fetchDashboardDrinks()
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
