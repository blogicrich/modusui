<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <v-container grid-list-xl>
      <v-layout align-start justify-space-around row wrap>
        <v-flex d-flex xs12 sm12 md6 lg6 xl6>
          <v-select
            label="Title"
            :items="titles"
            v-model="selectedTitle"
            :rules="rule"
            @change="validate()"
          ></v-select>
        </v-flex>
        <v-flex d-flex xs12 sm12 md6 lg6 xl6>
          <v-text-field label="AKA" :rules="rule" v-model="aka" required @input="validate()"></v-text-field>
        </v-flex>
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
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import apiLib from '@/services/apiLib'

export default {
  data () {
    return {
      aka: '',
      givenName: '',
      familyName: '',
      valid: true,
      selectedTitle: '',
      titles: [],
      rule: [
        v => !!v || 'This field is required'
      ]
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.$emit('onvalidation', true, this.selectedTitle, this.givenName, this.familyName, this.aka)
      } else {
        this.$emit('onvalidation', false)
      }
    }
  },
  mounted () {
    apiLib.getData('register').then((response) => {
      for (let i = 0; i < response[1].length; i++) {
        const element = response[1][i].longDescription
        this.titles.push(element)
      }
    })
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
