<template>
  <v-container>
    <h2 v-if="this.$vuetify.breakpoint.mdAndDown" class="pg-subheader text-primary text-center mx-3" text-xs-center>Titles</h2>
    <BaseDataTable
      :headers="headers"
      :items="items"
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
      :loadedMsg:="loadedMsg"
      item-key="titleId"
      searchLabel="Search Records..."
      tableTitle="Titles"
      newDialogTitle="Add a New Title"
      editDialogTitle="Edit Titles"
      delDialogTitle="Confirm deletetion of selected items?"
      msgDel="Are you sure you want to delete the selected items?"
      @newItem="addItem"
      @itemsEdited="editItems"
      @deleteSelected="deleteItem"
    />
  </v-container>
</template>

<script>
import { getData, postData } from '@/mixins/apiRequests'
import { crudOperations } from '@/mixins/CRUD'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'

export default {
  name: 'SystemAdmins',
  mixins: [getData, postData, crudOperations],
  components: {
    BaseDataTable
  },
  data () {
    return {
      items: [],
      name: 'name',
      loading: true,
      loaded: false,
      error: false,
      errorMsg: ' ',
      loadingMsg: ' ',
      loadedMsg: ' ',
      delUrl: 'titledelete',
      updateUrl: 'titleupdate',
      readUrl: 'titleget',
      createUrl: 'titlecreate',
      itemKey: 'titleId',
      idKey: 'titleId',
      primaryColor: 'primary',
      secondaryColor: 'primary darken-2',
      icon: 'perm_identity',
      iconAdd: 'add',
      headers: [
        { text: 'Title', align: 'left', sortable: false, value: 'titleId', cellType: 'tb', hidden: true },
        { text: 'Abbreviation', align: 'left', sortable: false, value: 'shortDescription', cellType: 'tb', hidden: false },
        { text: 'Description', align: 'left', sortable: false, value: 'longDescription', cellType: 'tb', hidden: false }
      ],
      newItem: [
        // { titleId: 0, cellType: 'tb', cellLabel: 'titleId', menuItems: [], validators:[]  },
        { shortDescription: '', cellType: 'tb', attr: 'shortDescription', cellLabel: 'Abbreviation', menuItems: [], validators: [] },
        { LongDescription: '', cellType: 'tb', attr: 'longDescription', cellLabel: 'Description', menuItems: [], validators: [] }
      ],
      defaultItem: [
        { titleId: 0, shortDescription: ' ', longDescription: ' ' }
      ],
      urls: []
    }
  },
  methods: {
    resetItem () {
      this.newItem = [
        // { titleId: 0, cellType: 'tb', cellLabel: 'titleId', menuItems: [], validators:[]  },
        { shortDescription: '', cellType: 'tb', cellLabel: 'shortDescription', menuItems: [], validators: [] },
        { LongDescription: '', cellType: 'tb', cellLabel: 'longDescription', menuItems: [], validators: [] }
      ]
      this.defaultItem = [
        { titleId: 0, shortDescription: ' ', longDescription: ' ' }
      ]
    }
  },
  created () {
    this.getItems(this.readUrl)
  }
}
</script>
<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
