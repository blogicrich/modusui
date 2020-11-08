<template>
  <v-container fluid>
    <BaseViewHeader
      class="mx-2 mb-2"
      :headerIcon="headerIcon"
      :headerText="headerText"
      hasDivider
    />
    <BaseDataTable
      ref="baseDataTable"
      class="mx-4"
      :headers="headers"
      :items="items"
      :editPerms="{ create: false, update: false, delete: false }"
      primaryColor="primary"
      secondaryColor="secondary"
      :tableActionButton="tableActionButtonVisible"
      actionButtonIcon="add"
      actionButtonTitle="Add new User Condition"
      :loading="loadingUserConditions"
      :loaded="!loadingUserConditions"
      :error="errorUserConditions"
      errorMsg="Error loading User COndition records..."
      loadingMsg="Loading User Conditions..."
      item-key="conditionsId"
      searchLabel="Search Records..."
      tableTitle="User Condition Records"

      @action-button-pressed="openNewDialog"
      @row-clicked="openEditDialog"
    />
  </v-container>
</template>

<script>
import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import { mapState, mapGetters } from 'vuex'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'
import validation from '@/mixins/validation'

export default {
  name: 'UserConditions',
  mixins: [validation],
  components: {
    BaseDataTable
  },
  computed: {
    ...mapState({
      userConditions: state => state.cliAdminUserConditions.cliAdminUserConditions,
      loadingUserConditions: state => state.cliAdminUserConditions.cliAdminUserConditionsLoading,
      errorUserConditions: state => state.cliAdminUserConditions.cliAdminUserConditionsError,
      items: state => state.cliAdminUserConditions.cliAdminUserConditions
    }),
    ...mapGetters([
      // 'getterUserConditions'
    ])
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'local_pharmacy',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'User Conditions',
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
    openNewDialog () {

    },
    openEditDialog () {

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
