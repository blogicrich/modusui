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
      :newItem="newItem"
      :editPerms="editPerms"
      :primaryColor="primaryColor"
      :secondaryColor="secondaryColor"
      :recordIcon="icon"
      :addRecordIcon="iconAdd"
      addBtnTitle="New Container Type"
      :loading="loading"
      :loaded="loaded"
      :error="error"
      :errorMsg="errorMsg"
      :loadingMsg="loadingMsg"
      :loadedMsg="loadedMsg"
      item-key="containerTypeId"
      searchLabel="Search Records..."
      tableTitle="Container Type Records"
      newDialogTitle="Add a New Container Type"
      editDialogTitle="Edit Container Type Records"
      delDialogTitle="Confirm deletetion of selected items?"
      msgDel="Are you sure you want to delete the selected items?"

      @newItem="addItem"
      @itemsEdited="editItems"
      @deleteSelected="deleteItem"
      @itemsCancelled="refreshItems"
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
  name: 'ContainerTypes',
  mixins: [dataTableNavGuard, crudRoutines, validation],
  components: {
    BaseDataTable
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'local_drink',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Container Types',
      // BaseDataTable
      items: [],
      crudIdKey: 'containerTypeId',
      editPerms: { create: true, update: true, delete: true },
      loading: true,
      loaded: false,
      error: false,
      errorMsg: ' ',
      loadingMsg: ' ',
      loadedMsg: ' ',
      delUrl: 'sysadmin/container-type',
      updateUrl: 'sysadmin/container-type',
      readUrl: 'sysadmin/container-type',
      createUrl: 'sysadmin/container-type',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'local_drink',
      iconAdd: 'add',
      headers: [
        {
          text: 'containerTypeId',
          align: 'left',
          sortable: true,
          value: 'containerTypeId',
          cellType: 'tb',
          hidden: true,
          editable: true
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
          text: 'Volume',
          align: 'left',
          sortable: true,
          value: 'volume',
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
          menuItems: [],
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
          attr: 'volume',
          cellLabel: 'Volume',
          menuItems: [],
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
        { containerTypeId: 0, description: ' ', volume: 0 }
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
          menuItems: [],
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
          attr: 'volume',
          cellLabel: 'Volume',
          menuItems: [],
          validators: [
            value => !!value || 'Required.',
            value => value.length <= 20 || 'Max 20 characters'
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
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
