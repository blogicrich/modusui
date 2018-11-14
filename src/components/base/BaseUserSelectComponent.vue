<template lang="html">
  <div>
    <v-layout align-start>
      <v-dialog v-model="dialog" persistent scrollable max-width="500px" >
        <SubPageNavButton
          slot="activator"
          v-bind:title="btnTitle"
        ></SubPageNavButton>
        <v-card height="500px">
          <v-card-title>
            <v-layout justify-center fill-height>
              <h2 class="table-header">{{ btnTitle }}</h2>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-title>
            <v-layout justify-space-between>
              <div>
                <v-checkbox
                  v-bind:label="SelectAll"
                  v-model="allUsers"
                  @click.native="selectAll">
                </v-checkbox>
              </div>
              <div>
                <v-icon>search</v-icon>
                <input type="text" class="input-subhead-search" v-model="search" v-bind:placeholder="searchName"/>
              </div>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-layout justify-start column>
              <div v-for="item in filteredName" :value="item.name" :key="item.name">
                <v-checkbox
                  v-model="selectedUsers"
                  :value="item.name"
                  v-bind:label="item.name"
                  @click.native="select">
                </v-checkbox>
                <p><hr class="dialog-hr"><p/>
              </div>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-layout justify-space-around>
              <SubPageNavButton
                @click.native="close"
                title="Cancel"
              ></SubPageNavButton>
              <div v-if="this.selectedUsers.length > 0">
                <SubPageNavButton
                  @click.native="save"
                  title="Save"
                ></SubPageNavButton>
              </div>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import SubPageNavButton from '@/components/sub/SubPageNavButton.vue'

export default {
  components: {
    SubPageNavButton
  },
  name: 'BaseUserSelect',
  data () {
    return {
      dialog: true,
      allSelected: false,
      allUsers: [],
      savedUsers: [],
      selectedUsers: [],
      search: ''
    }
  },
  props: {
    users: Array,
    btnTitle: String,
    SelectAll: String,
    searchName: String
  },
  methods: {
    close () {
      if (this.savedUsers.length >= 1) {
        this.dialog = false
        this.selectedUsers = this.savedUsers
      }
    },
    save () {
      if (this.selectedUsers.length >= 1) {
        this.dialog = false
        this.savedUsers = this.selectedUsers
      }
    },
    selectAll () {
      this.allSelected = !this.allSelected
      if (this.allSelected) {
        let name
        for (name in this.users) {
          this.allUsers.push(this.users[name].name.toString())
        }
        this.selectedUsers = this.allUsers
        this.selectedUsers = this.selectedUsers.slice(1, this.selectedUsers.length)
      }
      else {
        this.allUsers = []
        this.selectedUsers = []
      }
    },
    select () {
      if (this.selectedUsers.length === this.users.length) {
        this.allSelected = true
        for (var i = 0; i < this.users.length; i++) {
          this.allUsers.push(this.users[i].name.toString())
        }
      }
      else{
        this.allSelected = false
        this.allUsers = []
      }
    }
  },
  computed: {
    filteredName () {
      return this.users.filter((name) => {
        const Uppercase = name.name.toUpperCase()
        const searchUppercase = this.search.toUpperCase()
        return Uppercase.match(searchUppercase)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
