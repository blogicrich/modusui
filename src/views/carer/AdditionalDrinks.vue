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
          <v-form v-model="newFormValid" v-if="containerTypes" ref="newSysAdminDetailsForm">
            <v-container>
              <v-card-title>
                <v-icon medium :color="primaryColor">{{ icon }}</v-icon>
                <span class="pg-subheader text-primary">Add Drink</span>
              </v-card-title>
              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-date-picker v-model="pickerDate" :color="$vuetify.theme.primary"></v-date-picker>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-time-picker v-model="pickerTime" :color="$vuetify.theme.primary"></v-time-picker>
                </v-flex>
              </v-layout>
              <v-container fluid grid-list-xl>
                <v-flex xs6>
                  <v-card-text
                    v-for="(container, index) in containerTypes"
                    :key="`containers-${container.containerTypeId}-${index}`"
                  >{{ container.description + ' (' + container.volume +' L)' }}
                    <v-text-field
                      v-model="newDrinks[container.containerTypeId]"
                      color="primaryColor"
                      outline
                      required
                      validate-on-blur
                      :rules="newDrinkValidation.generic"
                    ></v-text-field>
                    <v-text-field
                      class="ma-1"
                      color="primaryColor"
                      label:="Total Volume"
                      :value="(Number(container.volume) * Number(newDrinks[container.containerTypeId])) + ' L'"
                    >
                    </v-text-field>
                  </v-card-text>
                </v-flex>
              </v-container>
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
      drinksLoading: state => state.dashboardDrinks.drinksLoading,
      containerTypes: state => state.commonData.containerTypes
    })
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'local_drink',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Additional Drinks',
      newDrinks: {},
      // BaseDataTable
      // foo1: '',
      // foo2: '',
      pickerDate: '',
      pickerTime: '',
      newFormVisible: false,
      newFormValid: false,
      dialog: false,
      tableActionButton: true,
      newBtnIcon: 'add',
      newBtnTitle: 'Add Manual Drink',
      crudIdKey: 'dateTime',
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
          hidden: true,
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
          // value => !!value || 'Required.',
          // value => value.length <= 20 || 'Max 20 characters',
          value => {
            if (this.numericalRegEx.test(value)) {
              return true
            } else {
              return 'Numerical characters only'
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
        this.$store.dispatch('fetchCommonData')
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
      console.log(this.newDrinks, this.pickerDate, this.pickerTime)
      // this.$store.commit('SET_NEW_DRINKS', { newDrinks: this.newDrinks, dateTime: this.pickerDate })
      this.$store.dispatch('postAdditionalDrinks', { newDrinks: this.newDrinks, dateTime: this.pickerDate })
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
