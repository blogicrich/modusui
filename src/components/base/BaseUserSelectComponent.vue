<template lang="html">
  <div>
    <v-layout align-start>
      <v-dialog v-model="dialog" persistent scrollable max-width="500px" >
        <SubPageNavButton
          slot="activator"
          v-model="checkUsers"
          :title="checkUsers"
        ></SubPageNavButton>
        <v-card class="selectCard">
          <v-card-title>
            <v-layout justify-center fill-height>
              <h2 class="table-header">{{ checkUsers }}</h2>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-title>
            <v-layout justify-space-between>
              <div>
                <v-checkbox
                  v-if="multiple"
                  v-model="allSelected"
                  v-bind:label="selectAll"
                  @change="toggleAll">
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
              <div v-for="item in filteredName" :value="item.name":key="item.userId">
                <v-checkbox
                  v-model="selectedUsers"
                  :value="item.userId"
                  v-bind:label="item.name"
                  @click.native="select">
                </v-checkbox>
                <p><hr class="dialog-hr"/><p/>
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
      allSelectSave: '',
      allSelected: false,
      savedUsers: [],
      selectedUsers: [],
      search: ''
    }
  },
  props: {
    multiple: Boolean,
    users: Array,
    selectAll: String,
    searchName: String
  },
  methods: {
    close () {
      if (this.savedUsers.length >= 1) {
        this.dialog = false
        this.selectedUsers = this.savedUsers
        this.allSelected = this.allSelectSave
      }
    },
    save () {
      if (this.selectedUsers.length >= 1) {
        this.dialog = false
        this.savedUsers = this.selectedUsers
        this.allSelectSave = this.allSelected
        this.$emit('get-selected-user', this.selectedUsers[0].userId)
      }
    },
    toggleAll (checked) {
      if (checked) {
        this.selectedUsers = []
        for (var i = 0; i < this.users.length; i++) {
          this.selectedUsers.push(this.users[i].name.toString())
        }
      } else {
        this.selectedUsers = []
      }
    },
    select () {
      if (this.multiple) {
        this.$emit('user-selected', this.selectedUsers)
        if (this.selectedUsers.length === this.users.length) {
          this.allSelected = true
          
        } else {
          this.allSelected = false
        }
      } else {
        if (this.selectedUsers.length === 2) {
          this.selectedUsers = this.selectedUsers.slice(1, 2)
          this.$emit('user-selected', this.selectedUsers)
        }
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
    },
    checkUsers () {
      let title
      if (this.multiple) {
        title = 'Select Users'
      } else {
        title = 'Select User'
      }
      return title
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
  .input-subhead-search {
    outline: none;
    border-bottom: solid 1px;
    border-color: $vuetify-primary;
    border-radius: 3px;
  }
  .check-subhead-selectall {
    font-weight: bold;
  }
  .selectCard {
    height: 500px;
  }
</style>
