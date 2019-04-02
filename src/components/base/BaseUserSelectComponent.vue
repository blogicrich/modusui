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
            <v-layout justify-center align-center fill-height>
              <v-icon large color="primary">person</v-icon>
              <h2 class="table-header">{{ checkUsers }}</h2>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-title>
            <!-- <v-layout justify-space-between> -->
              <!-- <div>
                <v-checkbox
                  v-if="multiple"
                  v-model="allSelected"
                  v-bind:label="selectAll"
                  @change="toggleAll">
                </v-checkbox>
              </div> -->
              <v-layout>
                <v-icon>search</v-icon>
                <input type="text" class="input-subhead-search" v-model="search" v-bind:placeholder="searchName"/>
              </v-layout>
            <!-- </v-layout> -->
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-layout justify-start column>
              <div v-for="item in filteredName" :value="item.comments" :key="item.userId">
              <!-- <div v-for="item in filteredName" :value="item.comments":key="item.userId"> -->
                <v-checkbox
                  v-model="selectedUsers"
                  :value="item.userId"
                  v-bind:label="item.comments"
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
        this.$router.push('/landing')
      } else {
        this.$router.push('/landing')
      }
    },
    save () {
      if (this.selectedUsers.length >= 1) {
        this.dialog = false
        this.savedUsers = this.selectedUsers
        this.allSelectSave = this.allSelected
        console.log(this.selectedUsers[0])
        this.$emit('get-selected-user', this.selectedUsers[0])
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
      return this.users
      // return this.users.filter((name) => {
      // const Uppercase = name.name.toUpperCase()
      // const Uppercase = name.comments.toUpperCase()
      // const searchUppercase = this.search.toUpperCase()
      // return Uppercase.match(searchUppercase)
      // })
    },
    checkUsers () {
      let title
      if (this.multiple) {
        title = 'Select eDroplet Users'
      } else {
        title = 'Select eDroplet User'
      }
      return title
    }
  },
  mounted () {
    console.log(this.users)
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
  .input-subhead-search {
    width: 100%;
    outline: none;
    border-bottom: solid 1px;
    border-color: $vuetify-primary;
    border-radius: 3px;
  }
  .check-subhead-selectall {
    font-weight: bold;
  }
  .selectCard {
    border-radius: 1em;
    height: 500px;
  }
</style>
