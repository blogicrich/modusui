<template lang="html">
  <v-layout column>
    <v-container fill-height align-center justify-center>
      <v-flex xs5 grow>
        <v-layout fluid fill-height align-center justify-start>
          <v-icon large color="primary">group</v-icon>
          <h2 class="table-header">{{ userHeader }}</h2>
        </v-layout>
      </v-flex>
      <v-flex xs7 shrink>
        <v-layout fill-height align-center justify-start>
          <v-icon>search</v-icon>
          <input type="text" class="searchbar" v-model="search" v-bind:placeholder="searchName"/>
        </v-layout>
      </v-flex>
    </v-container>
    <v-container fluid v-for="(item, index) in filteredName" fill-height v-bind:class="{ 'userSelect': getClass(item.userId) }" class="userHoverSelect" :value="item.userId" :key="item.userId" @click="clickedPerson(item)">
      <baseDropletuser
        :primaryColor="primaryColor"
        :userHeader="userHeader"
        :searchName="searchName"
        :usersIcon="usersIcon"
      >
        <v-icon slot="leftSlot" large :color="primaryColor">{{ usersIcon }}</v-icon>
        <v-chip slot="middleFirstNameSlot" color="secondary" text-color="primary">{{ item.givenName }} {{ item.familyName }}</v-chip>
        <span slot="middleSecondNameSlot" :class="alertColor[index] + '--text'">{{ item.hydrationValue }}  {{ item.calculatedTargetConsumption }}</span>
        <span slot="middleThirdNameSlot">{{ item.lastComm }}</span>
        <v-btn flat fab slot="firstRightSlot" to="/alerts"><v-icon medium :color="alertColor[index]">{{ alertIcon }}</v-icon></v-btn>
        <v-btn flat fab slot="secondRightSlot" @click="addComment(item)"><v-icon :color="primaryColor">{{ commentIcon }}</v-icon></v-btn>
        <v-btn flat fab slot="thirdRightSlot" @click="userSettings(item)"><v-icon :color="primaryColor" medium>{{ btnIcon }}</v-icon></v-btn>
      </baseDropletuser>
    </v-container>
    <v-dialog
      v-model="dialogToggle"
      :width="dialogWidth"
      persistent>
      <v-card>
        <v-layout v-if="dialogComment" column>
          <v-layout>
            <v-card-title><h2>{{ titleAddComment }}</h2></v-card-title>
          </v-layout>
          <v-container>
            <v-textarea auto-grow :counter="maxCharac" :rules="commentRules" label="Enter Comment Text" v-model="commentText"></v-textarea>
          </v-container>
          <v-layout justify-space-around>
            <v-card-actions>
              <v-btn :color="primaryColor" flat @click="clearComment">Clear</v-btn>
              <v-btn :color="primaryColor" flat @click="saveComment">Save</v-btn>
              <v-btn :color="primaryColor" flat @click="cancelComment">Cancel</v-btn>
            </v-card-actions>
          </v-layout>
        </v-layout>
        <v-layout v-if="dialogSettings" column>
          <v-layout>
          <v-card-title><h2>{{ titleSettings }}</h2></v-card-title>
          </v-layout>
          <v-container>
          <BaseDataTable
            :headers="headers"
            :items="items"
            :editPerms="editPerms"
            :primaryColor="primaryColor"
            :secondaryColor="secondaryColor"
            :recordIcon="icon"
            :addRecordIcon="iconAdd"
            addBtnTitle="New Administrator"
            :loading="loading"
            :loaded="loaded"
            :error="error"
            :errorMsg="errorMsg"
            :loadingMsg="loadingMsg"
            :loadedMsg="loadedMsg"
            item-key="username"
            searchLabel="Search Records..."
            tableTitle="Assigned eDroplet Bases"
            newDialogTitle="Add a New Administrator Record"
            editDialogTitle="Edit Administrator Records"
            delDialogTitle="Confirm deletetion of selected items?"
            msgDel="Are you sure you want to delete the selected items?"
            @newItem="addItem"
            @itemsEdited="editItems"
            @deleteSelected="deleteItem"
            @itemsCancelled="refreshItems"
          />
            <!-- <v-data-table
              :headers="headers"
              :items="dropletDetail"
              class="elevation-1"
            >
              <template>
                <th v-for="header in headers">{{ header.text }}</th>
              </template>
              <template v-slot:items="props">
                <td v-for="item in props.item">{{ item }}</td>
              </template>
            </v-data-table> -->
          </v-container>
          <v-layout justify-center>
            <v-card-actions>
              <v-btn :color="primaryColor" flat @click="closeSetting">Close</v-btn>
            </v-card-actions>
          </v-layout>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import baseDropletuser from '@/components/base/baseDropletuserComponent.vue'
import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import BaseDataTable from '@/components/base/BaseDataTableComponent.vue'

export default {
  components: {
    baseDropletuser,
    BaseDataTable
  },
  mixins: [crudRoutines],
  data () {
    return {
      search: '',
      clickedUser: [],
      dialogToggle: false,
      dialogSettings: false,
      dialogComment: false,
      dialogWidth: '',
      commentText: '',
      commentSavedText: '',
      commentRules: [
        v => v.length <= this.maxCharac || 'Name must be less than ' + this.maxCharac + ' characters'
      ],
      items: [],
      editPerms: { create: false, update: false, delete: false },
      loading: true,
      loaded: false,
      error: false,
      errorMsg: ' ',
      loadingMsg: ' ',
      loadedMsg: ' ',
      readUrl: 'carer/bases/23',
      secondaryColor: 'primary darken-2',
      icon: 'local_drink',
      iconAdd: 'person_add',
      headers: [
        { text: 'Legend', align: 'left', sortable: false, value: 'legend', cellType: 'tb', hidden: false, editable: true },
        { text: 'Mac Adress', align: 'left', sortable: false, value: 'MacAdress', cellType: 'tb', hidden: false, editable: true },
        { text: 'Friendly Name', align: 'left', sortable: false, value: 'friendlyName', cellType: 'tb', hidden: false, editable: true },
        { text: 'Status', align: 'left', sortable: false, value: 'status', cellType: 'tb', hidden: false, editable: true },
        { text: 'Last Communicated', align: 'left', sortable: false, value: 'LastCommunicated', cellType: 'tb', hidden: false, editable: true }
      ]
    }
  },
  props: {
    userHeader: String,
    primaryColor: String,
    users: Array,
    btnIcon: String,
    alertIcon: String,
    usersIcon: String,
    searchName: String,
    alertColor: Array,
    titleAddComment: String,
    titleSettings: String,
    dropletDetail: Array,
    commentIcon: String,
    maxCharac: String
  },
  computed: {
    filteredName () {
      return this.users.filter((user) => {
        const upperCaseGiv = user.givenName.toLowerCase()
        const upperCaseFam = user.familyName.toLowerCase()
        const upperCase = upperCaseGiv + ' ' + upperCaseFam
        const searchUppercase = this.search.toLowerCase()
        return upperCase.match(searchUppercase)
      })
    }
  },
  methods: {
    clickedPerson (item) {
      this.clickedUser = item
      this.$emit('userSelected', item)
    },
    userSettings (item) {
      this.$emit('userSelected', item)
      this.dialogWidth = 'auto'
      this.dialogToggle = true
      this.dialogSettings = true
    },
    closeSetting () {
      this.dialogToggle = false
      this.dialogSettings = false
    },
    addComment (item) {
      this.dialogWidth = '500'
      this.dialogToggle = true
      this.dialogComment = true
      this.$emit('userSelected', item)
    },
    saveComment () {
      if (this.commentText.length < this.maxCharac) {
        this.commentSavedText = this.commentText
        this.dialogToggle = false
        this.dialogComment = false
        this.$emit('commentText', this.commentSavedText)
      }
    },
    clearComment () {
      this.commentText = ''
    },
    cancelComment () {
      this.commentText = this.commentSavedText
      this.dialogToggle = false
      this.dialogComment = false
    },
    getClass (property) {
      if (this.clickedUser.userId === property) {
        return true
      }
    }
  },
  mounted () {
    this.getItems(this.readUrl)
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
  .userSelect {
    background-color:$table-row-hover;
    cursor: pointer;
  }
  .userHoverSelect:hover {
    background-color:$table-row-hover;
    cursor: pointer;
  }
  .searchbar {
    width: -webkit-fill-available;
    border-bottom: 1px solid $vuetify-primary;
  }
</style>
