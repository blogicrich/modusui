<template>
  <v-container fluid>
    <!-- <BaseViewHeader
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
    </BaseViewHeader> -->
    <BaseDataTable
      ref="baseDataTable"
      class="mx-4"
      :headers="headers"
      :items="additionalDrinks"
      :editPerms="{ create: false, update: false, delete: false }"
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
      @action-button-pressed="openNewDialog"
    />

    <!-- CRUD dialog -->

    <v-layout justify-center>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card class="pa-4">
          <v-toolbar dark fixed color="primary">
            <v-toolbar-title>Additional Drinks</v-toolbar-title>
            <v-spacer />
            <v-toolbar-items>
              <v-btn icon dark @click="closeDialog" title="cancel and close">
                <v-icon>close</v-icon>
              </v-btn>
              <v-btn
                icon dark
                @click="saveNewDrinks"
                title="save and close"
              >
                <v-icon>save</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <!-- Add New Drink -->

          <v-form v-model="newFormValid" v-if="containerTypes" ref="newDrinkForm" class="mt-4">
            <v-container>
              <v-card class="mt-5 pa-3" tile outline>
                <v-card-title>
                  <v-icon medium :color="primaryColor">{{ icon }}</v-icon>
                  <span class="pg-subheader text-primary">Add Drink</span>
                </v-card-title>
                <v-layout row wrap>
                  <v-flex xs12 sm4>
                    <v-select
                      v-if="containerTypes"
                      :items="containerTypes"
                      v-model="containerType"
                      label="Container Type"
                      width="20"
                      outline
                      required
                      item-value="containerTypeId"
                      item-text="description"
                      :rules="newDrinkValidation.generic"
                    />
                  </v-flex>
                  <v-flex xs12 sm4>
                    <v-text-field
                      class="mx-3"
                      :value="getContainerVolume()"
                      label="Volume (L)"
                      prepend-icon=""
                      readonly
                      disabled
                    />
                  </v-flex>
                  <v-flex xs12 sm4>
                    <v-text-field
                      class="mx-3"
                      v-model="drinkQty"
                      label="Quanity"
                      prepend-icon="local_drink"
                      type="number"
                      :rules="newDrinkValidation.numerical"
                    />
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12>
                    <v-menu
                      ref="drinkDatePicker"
                      v-model="showDrinkDatePicker"
                      :close-on-content-click="false"
                      :nudge-right="60"
                      :return-value="drinkDate"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="drinkDate"
                          label="Date"
                          prepend-icon="calender_today"
                          readonly
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-if="showDrinkDatePicker"
                        v-model="drinkDate"
                        full-width
                        @click:minute="$refs.drinkDatePicker.save(drinkDate)"
                      />
                    </v-menu>
                  </v-flex>
                  <v-flex xs12>
                    <v-menu
                      ref="drinkTimePicker"
                      v-model="showDrinkTimePicker"
                      :close-on-content-click="false"
                      :nudge-right="60"
                      :return-value="drinkTime"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          class="mx-3"
                          v-model="drinkTime"
                          label="Time"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                        />
                      </template>
                      <v-time-picker
                        v-if="showDrinkTimePicker"
                        v-model="drinkTime"
                        full-width
                        @click:minute="$refs.drinkTimePicker.save(drinkTime)"
                      />
                    </v-menu>
                  </v-flex>
                </v-layout>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    title="Add a new drink"
                    dark
                    :color="$vuetify.theme.primary"
                    @click="addNewDrink()"
                  >
                    ADD
                  </v-btn>
                  <v-btn
                    title="Reset form"
                    dark
                    :color="$vuetify.theme.primary"
                    @click="$refs.newDrinkForm.reset()"
                  >
                    RESET
                  </v-btn>
                </v-card-actions>
              </v-card>

              <!-- DRINK SUBMISSION LISTING -->

              <v-list>
                <v-card-title>
                  <v-icon medium :color="primaryColor">{{ icon }}</v-icon>
                  <span class="pg-subheader text-primary">Drinks for Submission:</span>
                </v-card-title>
                <v-fade-transition group hide-on-leave>
                  <v-card
                    v-show="!newDrinks.length"
                    class="pa-2"
                    tile
                    outline
                    key="nokeyforthisbadboy"
                  >
                    <v-card-text class="text-center">NO DRINKS TO SUBMIT. PLEASE ADD NEW DRINK ABOVE</v-card-text>
                  </v-card>
                  <v-card
                    v-show="newDrinks.length"
                    class="pa-2"
                    v-for="(drink, index) in newDrinks"
                    :key="index"
                    tile
                    outline
                  >
                    <v-layout>
                      <v-flex grow>
                        <span class="accent--text">{{
                          drink.quantity +
                            ' x ' +
                            drink.description +
                            ': ' +
                            Number(drink.volume * drink.quantity).toFixed(2) +
                            ' (L)' +
                            ' on ' +
                            drink.date +
                            ' at ' +
                            drink.time }}</span>
                      </v-flex>
                      <v-flex shrink>
                        <v-icon
                          color="pink"
                          @click="$store.commit('REMOVE_NEW_DRINK', index)"
                        >
                          close
                        </v-icon>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-fade-transition>
              </v-list>
            </v-container>
          </v-form>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>

import { dataTableNavGuard } from '@/mixins/dataTableNavGuard.js'
import { mapState } from 'vuex'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'
// import BaseUserSelect from '@/components/base/BaseUserSelectComponent.vue'
import validation from '@/mixins/validation'

export default {
  name: 'AdditionalDrinks',
  mixins: [dataTableNavGuard, validation],
  components: {
    BaseDataTable
    // BaseUserSelect
  },
  computed: {
    ...mapState({
      selectedUser: state => state.dashboardUsers.selectedUser,
      selectedDate: state => state.dashboardDates.dashboardSelectedDate,
      dashboardUsers: state => state.dashboardUsers.dashboardUsers,
      drinks: state => state.dashboardDrinks.drinks,
      additionalDrinks: state => state.dashboardDrinks.additionalDrinks,
      drinksLoading: state => state.dashboardDrinks.drinksLoading,
      containerTypes: state => state.commonData.containerTypes,
      newDrinks: state => state.dashboardDrinks.newDrinks
    })
  },
  watch: {
    selectedUser () {
      this.fetchDashboardDrinks()
    },
    selectedDate () {
      this.fetchDashboardDrinks()
    }
  },
  // props: {
  //   selectedUser: Object,
  //   dashboardUsers: Object
  // },
  data () {
    return {
      // BaseViewHeader
      // headerIcon: 'local_drink',
      // iconColor: this.$vuetify.theme.primary,
      // headerText: 'Additional Drinks',
      // Add Drinks Dialog
      showContainerTypePicker: true,
      showDrinkTimePicker: true,
      showDrinkDatePicker: true,
      containerType: '',
      drinkTime: '',
      drinkDate: '',
      drinkQty: '',
      // BaseDataTable
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
          text: 'Volume (L)',
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
          value: 'longFormDate',
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
        }
      ],
      newDrinkValidation: {
        generic: [
          value => !!value || 'Required.'
        ],
        numerical: [
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
      this.dialog = false
      this.newFormVisible = false
      this.$store.commit('RESET_NEW_DRINKS')
    },
    openNewDialog () {
      this.dialog = true
      this.newFormVisible = true
    },
    addNewDrink () {
      console.log(this.newDrinks, this.drinkDate, this.drinkTime, this.containerType, Number(this.drinkQty))
      this.$store.commit('ADD_NEW_DRINK', {
        quantity: Number(this.drinkQty),
        containerTypeId: this.containerType,
        volume: this.containerTypes.find(container => container.containerTypeId === this.containerType).volume,
        description: this.containerTypes.find(container => container.containerTypeId === this.containerType).description,
        time: this.drinkTime,
        date: this.drinkDate
      })
      this.$refs.newDrinkForm.reset()
    },
    saveNewDrinks () {
      this.$store.dispatch('postNewDrinks')
    },
    getContainerVolume () {
      const volume = this.containerType ? `${this.containerTypes.find(container => container.containerTypeId === this.containerType).volume}` : 'Select Container Type'
      return `${volume}`
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
