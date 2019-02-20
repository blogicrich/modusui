<template lang="html">
  <v-layout column>
    <v-layout>
      <v-layout>
        <h2 class="table-header">{{ userHeader }}</h2>
      </v-layout>
      <v-layout justify-end>
        <v-icon>search</v-icon>
        <input type="text" class="input-subhead-search" v-model="search" v-bind:placeholder="searchName"/>
      </v-layout>
    </v-layout>
    <v-layout v-for="item in filteredName" :value="item.name" :key="item.name">
      <v-icon large :color="primaryColor">{{ usersIcon }}</v-icon>
      <v-layout column>
        <v-flex>
          {{ item.name }}
        </v-flex>
        <v-flex>
          <span :class="alertColor + '--text'">{{ item.hydration }}</span>
        </v-flex>
        <v-flex>
          Last Sync {{ item.sync }}
        </v-flex>
      </v-layout>
      <v-icon medium :color="alertColor">{{ alertIcon }}</v-icon>
      <v-btn @click="" flat fab>
        <v-icon medium :color="primaryColor">{{ btnIcon }}</v-icon>
      </v-btn>
      <br/>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      search: ''
    }
  },
  props: {
    primaryColor: String,
    userHeader: String,
    users: Array,
    searchName: String,
    searchName: String,
    usersIcon: String,
    alertIcon: String,
    btnIcon: String,
    alertColor: String
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
