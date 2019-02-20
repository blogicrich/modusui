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
  <v-layout v-for="(item, index) in filteredName" :value="item.name" :key="item.name">
    <baseDropletuser
      :primaryColor="primaryColor"
      :userHeader="userHeader"
      :searchName="searchName"
      :usersIcon="usersIcon"
    >
      <v-icon slot="personIconSlot" large :color="primaryColor">{{ usersIcon }}</v-icon>
      <span slot="nameSlot">{{ item.name }}</span>
      <span slot="hydratationSlot" :class="alertColor[index] + '--text'">{{ item.hydration }}</span>
      <span slot="syncSlot">{{ item.sync }}</span>
      <v-icon medium slot="iconSlot" :color="alertColor[index]">{{ alertIcon }}</v-icon>
      <v-btn flat fab slot="iconBtnSlot"><v-icon medium>{{ btnIcon }}</v-icon></v-btn>
    </baseDropletuser>
  </v-layout>
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
      search: ''
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
    alertColor: Array
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
