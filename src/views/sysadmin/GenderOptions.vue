<template>
  <v-container fluid>
    <BaseViewHeader
      v-if="this.$vuetify.breakpoint.mdAndDown"
      :headerIcon="headerIcon"
      :iconColor="iconColor"
      :headerText="headerText"
      hasDivider
      fullWidth
    />
    <BaseDataTable
      ref="baseDataTable"
      :headers="headers"
      :items="items"
      :editPerms="editPerms"
      :newItem="newItem"
      :primaryColor="primaryColor"
      :secondaryColor="secondaryColor"
      :recordIcon="icon"
      :addRecordIcon="iconAdd"
      addBtnTitle="New Gender Option"
      :loading="loading"
      :error="error"
      :loaded="loaded"
      :errorMsg="errorMsg"
      :loadingMsg="loadingMsg"
      :loadedMsg="loadedMsg"
      item-key="genderId"
      searchLabel="Search Records..."
      tableTitle="Gender Option Records"
      newDialogTitle="Add a New Gender Option"
      editDialogTitle="Edit Gender Option Records"
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
          :rules="newItem[itemKey].validators"
        />
      </template>
      <template v-slot:editSlot="{ item, itemKey, property }">
        <v-text-field
          :label="newItem.find(attribute => attribute.attr === itemKey).cellLabel"
          v-model="item[itemKey]"
          class="ma-1"
          :color="primaryColor"
          outline
          required
          :rules="newItem.find(attribute => attribute.attr === itemKey).validators"
        >
          {{ property }}
        </v-text-field>
      </template>
    </BaseDataTable>
  </v-container>
</template>

<script>
import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import { dataTableNavGuard } from '@/mixins/dataTableNavGuard.js'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'
import validation from '@/mixins/validation'

export default {
  name: 'GenderOptions',
  mixins: [dataTableNavGuard, crudRoutines, validation],
  components: {
    BaseDataTable
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'wc',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Gender Options',
      // BaseDataTable
      items: [],
      editPerms: { create: true, update: true, delete: true },
      crudIdKey: 'genderId',
      loading: true,
      loaded: false,
      error: false,
      errorMsg: ' ',
      loadingMsg: ' ',
      loadedMsg: ' ',
      delUrl: 'sysadmin/gender-options',
      updateUrl: 'sysadmin/gender-options',
      readUrl: 'sysadmin/gender-options',
      createUrl: 'sysadmin/gender-options',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'wc',
      iconAdd: 'add',
      headers: [
        {
          text: 'genderId',
          align: 'left',
          sortable: true,
          value: 'genderId',
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
          text: 'Target Consumption',
          align: 'left',
          sortable: true,
          value: 'targetConsumption',
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
            value => {
              if (this.alphabeticalRegEx.test(value)) {
                return true
              } else {
                return 'Alphabetical characters only'
              }
            },
            value => {
              if (value) {
                return value.length <= 20 || 'Max 20 characters'
              } else {
                return 'Value required'
              }
            }
          ]
        },
        {
          volume: '',
          cellType: 'tb',
          attr: 'targetConsumption',
          cellLabel: 'Target Consumption',
          validators: [
            value => !!value || 'Required.',
            value => {
              if (this.numeric3dpRegEx.test(value)) {
                return true
              } else {
                return 'Consumption to 3dp'
              }
            }
          ]
        }
      ],
      defaultItem: [
        { genderId: 0, description: '', targetConsumption: 0 }
      ]
    }
  },
  methods: {
    resetItem () {
      this.newItem = [
        {
          text: 'Description',
          align: 'left',
          sortable: true,
          value: 'description',
          cellType: 'tb',
          hidden: false,
          editable: true,
          validators: [
            value => !!value || 'Required.',
            value => {
              if (this.alphabeticalRegEx.test(value)) {
                return true
              } else {
                return 'Alphabetical characters only'
              }
            },
            value => {
              if (value) {
                return value.length <= 20 || 'Max 20 characters'
              } else {
                return 'Value required'
              }
            }
          ]
        },
        {
          text: 'Target Consumption',
          align: 'left',
          sortable: true,
          value: 'targetConsumption',
          cellType: 'tb',
          hidden: false,
          editable: true,
          validators: [
            value => !!value || 'Required.',
            value => {
              if (this.numeric3dpRegEx.test(value)) {
                return true
              } else {
                return 'Consumption to 3dp'
              }
            }
          ]
        }
      ]
    }
  },
  mounted () {
    this.getItems(this.readUrl)
  }
}

</script>
