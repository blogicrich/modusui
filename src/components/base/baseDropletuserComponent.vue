<template lang="html">
  <v-card width="400" flat>
    <v-layout>
      <v-layout>
        <h2 class="table-header">{{ userHeader }}</h2>
      </v-layout>
      <v-layout justify-end>
        <v-icon>search</v-icon>
        <input type="text" class="input-subhead-search" v-model="search" v-bind:placeholder="searchName"/>
      </v-layout>
    </v-layout>
    <v-card v-for="item in filteredName" :value="item.name" :key="item.name" hover>
      <v-layout row>
        <v-icon large :color="primaryColor">person</v-icon>
        <v-layout column>
          <v-flex>
            {{ item.name }}
          </v-flex>
          <v-flex>
            <span :class='alertColors(item)+ "--text"'>{{ item.hydration }}</span>
          </v-flex>
          <v-flex>
            Last Sync {{ item.sync }}
          </v-flex>
        </v-layout>
        <v-icon medium :color="alertColors(item)">report_problem</v-icon>
        <v-btn @click="" flat fab>
          <v-icon medium :color="primaryColor">settings</v-icon>
        </v-btn>
      </v-layout>
      <br/>
    </v-card>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      alertColor: '',
      search: ''
    }
  },
  props: {
    primaryColor: String,
    userHeader: String,
    users: Array,
    searchName: String,
    searchName: String
  },
  methods: {
    alertColors (item) {
      if (item.alert === 'hydrated') {
        return 'green'
      }
      else if (item.alert === 'little dehydrated'){
        return 'orange'
      }
      else if (item.alert === 'dehydrated') {
        return 'red'
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
