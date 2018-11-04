<template lang="html">
  <div>
    <v-layout align-start>
      <v-dialog v-model="dialog" persistent scrollable max-width="500px" >
        <v-btn slot="activator" color="primary">{{ btnTitle }}</v-btn>
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
                <input type="text" class="input-subhead-search" v-model="search" placeholder="Search user.."/>
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
              <v-btn flat color="primary darken-1" @click.native="close">Cancel</v-btn>
              <div v-if="this.userIds.length > 0">
                <v-btn color="primary darken-1" flat @click.native="save">Save</v-btn>
              </div>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: true,
      allSelected: false,
      users: [
        { name: 'Elsa' },
        { name: 'Tamara' },
        { name: 'Daniek' },
        { name: 'Mitchell' },
        { name: 'Jasper' },
        { name: 'Bram' },
        { name: 'Kevin' },
        { name: 'Julian' },
        { name: 'Patricia' },
        { name: 'Marcel' },
        { name: 'Fred' },
        { name: 'Joke' },
        { name: 'Kaily' },
        { name: 'Bryan' },
        { name: 'Michelle' },
        { name: 'Lisa' },
        { name: 'Cheyenne' },
        { name: 'Shalina' },
        { name: 'Naomi' },
        { name: 'Leeroy' }
      ],
      selectedUsers: [],
      userIds: [],
      search: '',
      btnTitle: 'Select Users',
      SelectAll: 'Select all',
      searchName: 'Search user..'
    }
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
