<template lang="html">
  <v-layout column>
    <v-container fill-height align-center justify-center>
      <v-flex xs5 grow>
        <v-layout fill-height align-center justify-start>
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
    <v-container v-for="(item, index) in filteredName" fill-height v-bind:class="{ 'userSelect': getClass(item.name) }" class="userHoverSelect" :value="item.name" :key="item.name" @click="clickedPerson(item)">
      <baseDropletuser
        :primaryColor="primaryColor"
        :userHeader="userHeader"
        :searchName="searchName"
        :usersIcon="usersIcon"
      >
        <v-icon slot="leftSlot" large :color="primaryColor">{{ usersIcon }}</v-icon>
        <span slot="middleFirstNameSlot">{{ item.name }}</span>
        <span slot="middleSecondNameSlot" :class="alertColor[index] + '--text'">{{ item.hydration }}</span>
        <span slot="middleThirdNameSlot">{{ item.sync }}</span>
        <v-btn flat fab slot="firstRightSlot" to="/alerts"><v-icon medium :color="alertColor[index]">{{ alertIcon }}</v-icon></v-btn>
        <v-btn flat fab slot="secondRightSlot" @click="addMessage(item)"><v-icon :color="primaryColor">{{ commentIcon }}</v-icon></v-btn>
        <v-btn flat fab slot="thirdRightSlot" @click="userSettings(item)"><v-icon :color="primaryColor" medium>{{ btnIcon }}</v-icon></v-btn>
      </baseDropletuser>
    </v-container>
    <v-dialog
      v-model="dialogToggle"
      min-width="500"
      persistent>
      <v-card>
        <v-layout v-if="dialogComment" column>
          <v-layout>
            <v-card-title><h2>{{ titleAddComment }}</h2></v-card-title>
          </v-layout>
          <v-container>
            <v-text-field label="Enter Comment Text"></v-text-field>
          </v-container>
          <v-layout justify-space-around>
            <v-card-actions>
              <v-btn :color="primaryColor" flat @click="closeDialog">Delete</v-btn>
              <v-btn :color="primaryColor" flat @click="closeDialog">Save</v-btn>
              <v-btn :color="primaryColor" flat @click="closeDialog">Cancel</v-btn>
            </v-card-actions>
          </v-layout>
        </v-layout>
        <v-layout v-if="dialogSettings" column>
          <v-layout>
          <v-card-title><h2>{{ titleSettings }}</h2></v-card-title>
          </v-layout>
          <v-container>
            <v-data-table
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
            </v-data-table>
          </v-container>
          <v-layout justify-center>
            <v-card-actions>
              <v-btn :color="primaryColor" flat @click="closeDialog">Close</v-btn>
            </v-card-actions>
          </v-layout>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import baseDropletuser from '@/components/base/baseDropletuserComponent.vue'

export default {
  components: {
    baseDropletuser
  },
  data () {
    return {
      search: '',
      clickedUser: [],
      dialogToggle: false,
      dialogSettings: false,
      dialogComment: false,
      headers: [
        { text: 'Legend', align: 'left', sortable: false, value: 'legend', cellType: 'tb', hidden: true, editable: true },
        { text: 'Mac Adress', align: 'left', sortable: false, value: 'MacAdress', cellType: 'tb', hidden: true, editable: true },
        { text: 'Friendly Name', align: 'left', sortable: false, value: 'friendlyName', cellType: 'tb', hidden: true, editable: true },
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
    // commentIcon: String
  },
  computed: {
    filteredName () {
      return this.users.filter((name) => {
        const Uppercase = name.name.toUpperCase()
        const searchUppercase = this.search.toUpperCase()
        return Uppercase.match(searchUppercase)
      })
    }
  },
  methods: {
    clickedPerson (item) {
      this.clickedUser = item
      this.$emit('userSelected', item)
      console.log()
    },
    userSettings (item) {
      console.log('sett')
      this.$emit('userSelected', item)
      this.dialogToggle = true
      this.dialogSettings = true
    },
    addMessage (item) {
      this.dialogToggle = true
      this.dialogComment = true
      this.$emit('userSelected', item)
    },
    closeDialog () {
      this.dialogToggle = false
      this.dialogComment = false
      this.dialogSettings = false
      this.$emit('dataUser', this.clickedUser)
    },
    getClass (property) {
      if (this.clickedUser.name === property) {
        return true
      }
    }
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
