<template>
  <v-container>
    <h2
      v-if="this.$vuetify.breakpoint.mdAndDown"
      class="pg-subheader text-primary text-center mx-3"
      text-xs-center
    >Additional Drinks</h2>
    <BaseDataTable
      :headers="headers"
      :items="drinks"
      :newItem="newItem"
      :primaryColor="primaryColor"
      :secondaryColor="secondaryColor"
      :recordIcon="icon"
      :addRecordIcon="iconAdd"
      addBtnTitle="Add Drinks"
      :loading="loading"
      :loaded="loaded"
      :error="error"
      :errorMsg="errorMsg"
      :loadingMsg="loadingMsg"
      :loadedMsg="loadedMsg"
      item-key="userId"
      searchLabel="Search Records..."
      tableTitle="Additional Drinks"
      newDialogTitle="Add a Additional Drink"
      editDialogTitle="Edit Additional Drinks"
      delDialogTitle="Confirm deletetion of selected items?"
      msgDel="Are you sure you want to delete the selected items?"
      @newItem="addItem"
      @itemsEdited="editItems"
      @deleteSelected="deleteItem"
      @itemsCancelled="refreshItems"
    />
  </v-container>
</template>

<script>
import { crudRoutines } from "@/mixins/dataTableCRUD.js";
import { apiLib } from "@/services/apiLib.js";
import BaseDataTable from "@/components/base/BaseDataTableComponent.vue";

export default {
  name: "SystemAdmins",
  mixins: [crudRoutines],
  components: {
    BaseDataTable
  },
  data() {
    return {
      selected: [],
      snackColor: "primary",
      snackText: "",
      snack: false,
      timeout: 6000,
      loading: true,
      loaded: false,
      error: false,
      errorMsg: "",
      loadingMsg: "",
      loadedMsg: "",
      delUrl: "carer/adddrinks",
      updateUrl: "carer/adddrinks",
      readUrl: "carer/adddrinks",
      createUrl: "carer/adddrinks",
      primaryColor: "primary",
      secondaryColor: "primary darken-2",
      icon: "local_drink",
      iconAdd: "add",
      pagination: {
        sortBy: "name"
      },
      selected: [],
      headers: [
        { text: "Name", value: "name" },
        { text: "Amount", value: "amount" }
      ],
      drinks: [],
      newItem: [
        {
          Name: "",
          cellType: "tb",
          attr: "name",
          cellLabel: "Drink Name",
          menuItems: [],
          validators: []
        },
        {
          Amount: "",
          cellType: "tb",
          attr: "amount",
          cellLabel: "Amount Drank",
          menuItems: [],
          validators: []
        }
      ],
      defaultItem: [{ Name: "", Amount: "" }]
    };
  },
  methods: {
    resetItem() {
      this.newItem = [
        {
          Name: "",
          cellType: "tb",
          attr: "name",
          cellLabel: "Drink Name",
          menuItems: [],
          validators: []
        },
        {
          Amount: "",
          cellType: "tb",
          attr: "amount",
          cellLabel: "Amount Drank",
          menuItems: [],
          validators: []
        }
      ];
      this.defaultItem = [{ Name: "", Amount: "" }];
    }
  },
  mounted() {
    this.getItems(this.readUrl);
  }
};
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>