<template>
  <v-container fluid>
    <BaseViewHeader
      class="mx-2 mb-2"
      :headerIcon="headerIcon"
      :headerText="headerText"
      hasDivider
    />
    <SubDisplayTable
      ref="subDisplayTable"
      class="mx-4"
      :headers="headers"
      :items="items"
      :expandable="true"
      :tableTitleIcon="headerIcon"
      primaryColor="primary"
      secondaryColor="secondary"
      :tableActionButton="tableActionButtonVisible"
      actionButtonIcon="add"
      actionButtonTitle="Add new User Condition"
      :loading="loadingUserConditions"
      :loaded="!loadingUserConditions"
      :error="errorUserConditions"
      errorMsg="Error loading User Condition records..."
      loadingMsg="Loading User Conditions..."
      item-key="userConditionId"
      searchLabel="Search Records..."
      tableTitle="User Condition Records"
      @row-clicked="updateSelected"
      @action-button-pressed="openNewDialog"
    >
      <v-card v-if="selected" @click="openEditDialog" slot="expandedRow">
        <v-container fluid>
          <v-layout row fill-height justify-end align-center>
            <v-btn :color="$vuetify.theme.primary" dark>
              {{ 'EDIT' }}
            </v-btn>
          </v-layout>
          <v-layout align-center justify-center row fill-height>
            <v-flex xs12 class="d-inline-flex">
              <v-text-field
                v-for="(value, parameter) in selected.condition"
                :key="parameter + '-' + value"
                class="ma-2"
                :value="value"
                :label="parameter"
                :color="$vuetify.theme.primary"
                hide-details
                outline
              >
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </SubDisplayTable>
  </v-container>
</template>

<script>

import { mapState, mapGetters } from 'vuex'
import SubDisplayTable from '@/components/sub/SubDisplayTableComponent.vue'
import validation from '@/mixins/validation'

export default {
  name: 'UserConditions',
  mixins: [validation],
  components: {
    SubDisplayTable
  },
  computed: {
    ...mapState({
      userConditions: state => state.cliAdminUserConditions.cliAdminUserConditions,
      loadingUserConditions: state => state.cliAdminUserConditions.cliAdminUserConditionsLoading,
      errorUserConditions: state => state.cliAdminUserConditions.cliAdminUserConditionsError,
      items: state => state.cliAdminUserConditions.cliAdminUserConditions
    }),
    ...mapGetters([])
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'local_pharmacy',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'User Conditions',
      // Data Table
      selected: null,
      tableActionButtonVisible: true,
      // New Dialog
      newFormVisible: false,
      newFormValid: false,
      // newCommentDate: null,
      showCommentDatePicker: false,
      reportText: '',
      // Edit Dialog
      dialog: false,
      editFormValid: false,
      editFormVisible: false,
      // Delete Confirmation Dialog
      confirmationDialog: false,
      deletingData: false,
      spinnerTimeout: null,
      timeoutDuration: 2000,
      icon: 'menu_book',
      headers: [
        {
          text: 'userId',
          align: 'left',
          sortable: true,
          value: 'userId',
          cellType: 'tb',
          hidden: false,
          editable: false
        },
        // {
        //   text: 'userName',
        //   align: 'left',
        //   sortable: true,
        //   value: 'userName',
        //   cellType: 'tb',
        //   hidden: false,
        //   editable: false
        // },
        {
          text: 'comments',
          align: 'left',
          sortable: true,
          value: 'comments',
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
      ]
    }
  },
  methods: {
    openNewDialog (e) {
      // console.log(e)
    },
    openEditDialog () {
      console.log('EDIT DIALOG OPEN')
    },
    updateSelected (e) {
      this.selected = e.item
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
