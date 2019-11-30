<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <v-container grid-list-xl>
      <v-layout align-start justify-space-around row wrap>
        <v-flex d-flex xs12 sm12 md6 lg6 xl6>
          <v-text-field 
            label="Base MAC Adress:"
            :read-only="true"
            :value="mac"
          ></v-text-field>
        </v-flex>
        <v-flex d-flex xs12 sm12 md6 lg6 xl6>
          <v-select
            label="Title"
            :items="titles"
            v-model="selectedTitle"
            :rules="rule"
            return-object
            item-value="titleId"
            item-text="longDescription"
            @change="validate()"
          ></v-select>
        </v-flex>
        <!-- <v-flex d-flex xs12 sm12 md6 lg6 xl6>
          <v-text-field 
            label="AKA" 
            :rules="rule" 
            v-model="aka" 
            required 
            @input="validate()"
          ></v-text-field>
        </v-flex> -->
        <v-flex d-flex xs12 sm12 md6 lg6 xl6>
          <v-text-field
            label="Given Name"
            :rules="rule"
            v-model="givenName"
            required
            @input="validate()"
          ></v-text-field>
        </v-flex>
        <v-flex d-flex xs12 sm12 md6 lg6 xl6>
          <v-text-field
            label="Family Name"
            :rules="rule"
            v-model="familyName"
            required
            @input="validate()"
          ></v-text-field>
        </v-flex>
        <v-flex d-flex xs12 sm12 md6 lg6 xl6>
          <v-text-field 
            label="Username" 
            :rules="rule" 
            v-model="username" 
            required 
            @input="validate()"
          ></v-text-field>
        </v-flex>
        <v-flex d-flex xs12 sm12 md6 lg6 xl6>
          <v-text-field 
            label="Password" 
            :rules="rule" 
            v-model="username" 
            required 
            @input="validate()"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>

export default {
  data () {
    return {
      aka: '',
      givenName: '',
      familyName: '',
      // mac: this.$route.query.mac,
      valid: true,
      selectedTitle: '',
      rule: [
        v => !!v || 'This field is required'
      ],
      username: '',
      password: ''
    }
  },
  computed: {
    titles () {
      return []
    },
    mac () {
      return this.$route.query.mac
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
