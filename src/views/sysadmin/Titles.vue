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
      addBtnTitle="New Title"
      :loading="loading"
      :loaded="loaded"
      :error="error"
      :errorMsg="errorMsg"
      :loadingMsg="loadingMsg"
      :loadedMsg="loadedMsg"
      item-key="titleId"
      searchLabel="Search Records..."
      tableTitle="Title Records"
      newDialogTitle="Add a New Title"
      editDialogTitle="Edit Titles"
      delDialogTitle="Confirm deletetion of selected items?"
      msgDel="Are you sure you want to delete the selected items?"

      @newItem="addItem"
      @itemsEdited="editItems"
      @deleteSelected="deleteItem"
      @itemsCancelled="getItems(readUrl)"
    >
      <!-- eslint-disable-next-line -->
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
        />
      </template>
      <!-- eslint-disable-next-line -->
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
  name: 'Titles',
  mixins: [dataTableNavGuard, crudRoutines, validation],
  components: {
    BaseDataTable
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'perm_identity',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Titles',
      // BaseDataTable
      items: [],
      editPerms: { create: true, update: true, delete: true },
      name: 'name',
      loading: true,
      loaded: false,
      error: false,
      errorMsg: '',
      loadingMsg: '',
      loadedMsg: '',
      delUrl: 'sysadmin/title',
      updateUrl: 'sysadmin/title',
      readUrl: 'sysadmin/title',
      createUrl: 'sysadmin/title',
      itemKey: 'titleId',
      crudIdKey: 'titleId',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'perm_identity',
      iconAdd: 'add',
      headers: [
        {
          text: 'Title',
          align: 'left',
          sortable: false,
          value: 'titleId',
          cellType: 'tb',
          hidden: true
        },
        {
          text: 'Abbreviation',
          align: 'left',
          sortable: false,
          value: 'shortDescription',
          cellType: 'tb',
          hidden: false
        },
        {
          text: 'Description',
          align: 'left',
          sortable: false,
          value: 'longDescription',
          cellType: 'tb',
          hidden: false
        }
      ],
      newItem: [
        {
          shortDescription: '',
          cellType: 'tb',
          attr: 'shortDescription',
          cellLabel: 'Abbreviation',
          // menuItems: [],
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
          longDescription: '',
          cellType: 'tb',
          attr: 'longDescription',
          cellLabel: 'Description',
          // menuItems: [],
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
        }
      ],
      defaultItem: [
        { titleId: 0, shortDescription: '', longDescription: '' }
      ]
    }
  },
  methods: {
    resetItem () {
      this.newItem = [
        {
          shortDescription: '',
          cellType: 'tb',
          cellLabel: 'shortDescription',
          // menuItems: [],
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
          longDescription: '',
          cellType: 'tb',
          cellLabel: 'longDescription',
          // menuItems: [],
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
        }
      ]
      // this.defaultItem = [
      //   { titleId: 0, shortDescription: '', longDescription: '' }
      // ]
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
