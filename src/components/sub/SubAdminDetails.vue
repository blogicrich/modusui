<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <v-container grid-list-xl>
      <v-layout  row wrap>
        <v-flex d-flex xs12 sm12 md6 lg6 xl6 offset-md3 offset-xl3 offset-lg3>
          <v-text-field label="Username" :rules="rule" v-model="submittedData.username" required @input="validate()"></v-text-field>
        </v-flex>
        <v-flex d-flex xs12 sm12 md6 lg6 xl6 offset-md3 offset-xl3 offset-lg3>
          <v-text-field label="Mobile Phone Number (Optional)" v-model="submittedData.phoneNumber" ></v-text-field>
        </v-flex>
        <v-flex d-flex xs12 sm12 md6 lg6 xl6 offset-md3 offset-xl3 offset-lg3>
          <v-text-field label="Email Address" :rules="rule" v-model="submittedData.emailAddress" required @input="validate()"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  // props: ['submittedData'],
  data () {
    return {
      valid: true,
      rule: [
        v => !!v || 'This field is required'
      ]
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.$emit('onvalidation', true, this.submittedData.username, this.submittedData.phoneNumber, this.submittedData.emailAddress)
      } else {
        this.$emit('onvalidation', false)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
