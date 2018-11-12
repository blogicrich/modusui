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
              <h2>{{ btnTitle }}</h2>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-title>
            <v-layout justify-space-between>
              <div>
                <input type="checkbox" v-model="allSelected" @click="selectAll"/>
                <label class="check-subhead-selectall"> {{ SelectAll }}</label>
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
                <input  type="checkbox"
                        :value="item.name"
                        v-model="userIds"
                        @click="select"
                />
                <label> {{ item.name }}</label>
                <p><hr class="dialog-hr"><p/>
                <br/>
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
              <div v-if="this.userIds.length > 0">
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
      selectedUsers: [],
      userIds: [],
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
      if (this.selectedUsers.length >= 1) {
        this.dialog = false
        this.userIds = this.selectedUsers
      }
    },
    save () {
      if (this.userIds.length >= 1) {
        this.dialog = false
        this.selectedUsers = this.userIds
      }
    },
    selectAll () {
      this.allSelected = !this.allSelected
      this.userIds = []
      if (this.allSelected) {
        let name
        for (name in this.users) {
          this.userIds.push(this.users[name].name.toString())
        }
      }
    },
    select () {
      this.allSelected = false
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
