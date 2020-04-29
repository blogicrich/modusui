<template>
  <v-container fluid>
    <v-layout row fill-height justify-center>
      <BaseViewHeader
        v-if="!userText"
        class="mx-2 mb-4"
        :headerIcon="headerIcon"
        :iconColor="iconColor"
        :headerText="headerText"
        hasDivider
      />
      <BaseViewHeader
        v-if="userText"
        class="mx-2 mb-4"
        :chipsText="userText"
        :headerIcon="headerIcon"
        :iconColor="iconColor"
        :headerText="headerText"
        hasDivider
      />
    </v-layout>
    <BaseDataTable
      class="mx-4"
      :headers="headers"
      :items="items"
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
    </BaseDataTable>
  </v-container>
</template>

<script>
import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'
import validation from '@/mixins/validation'

export default {
  name: 'Conditions',
  mixins: [crudRoutines, validation],
  components: {
    BaseDataTable
  },
  computed: {
    user: function () {
      return this.$store.getters.getterSelectedUser
    },
    userText: function () {
      if (this.$store.getters.getterSelectedUser !== null) {
        return this.$store.getters.getterSelectedUser.givenName
      } else {
        return ''
      }
    }
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
      items: [],
      loading: true,
      loaded: false,
      error: false,
      errorMsg: ' ',
      loadingMsg: ' ',
      loadedMsg: ' ',
      delUrl: '/cliadmin/conditions/' + this.$store.state.userId,
      updateUrl: '/cliadmin/conditions' + this.$store.state.userId,
      readUrl: '/cliadmin/conditions/' + this.$store.state.userId,
      createUrl: '/cliadmin/conditions',
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
            value => !!value || 'Required.',
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
            value => !!value || 'Required.',
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
    this.getItems(this.readUrl)
  }
}

</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
