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
        <v-icon medium slot="firstRightSlot" :color="alertColor[index]">{{ alertIcon }}</v-icon>
        <v-icon @click="userSettings" :color="primaryColor" slot="secondRightSlot" medium>{{ btnIcon }}</v-icon>
      </baseDropletuser>
    </v-container>
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
      clickedUser: []
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
  },
  methods: {
    clickedPerson (item) {
      this.clickedUser = item
      console.log(item);
      this.$emit('userSelected', item)
    },
    userSettings () {
      console.log('settings')
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
