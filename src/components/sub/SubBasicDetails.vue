<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <v-container grid-list-xl>
      <v-layout align-start justify-space-around row wrap>
          <v-flex d-flex xs6 sm6 md6 lg6 xl6>
            <v-select label="Title" :items="titles" v-model="selectedTitle" :rules="rule"  @change="validate()"></v-select> 
          </v-flex>
          <v-flex d-flex xs6 sm6 md6 lg6 xl6>
            <v-text-field label="AKA" :rules="rule" v-model="aka" required @input="validate()"></v-text-field>
        </v-flex>
        <v-flex d-flex xs6 sm6 md6 lg6 xl6>
          <v-text-field label="Given Name" :rules="rule" v-model="givenName" required @input="validate()"></v-text-field>
        </v-flex>
        <v-flex d-flex xs6 sm6 md6 lg6 xl6>
          <v-text-field label="Family Name" :rules="rule" v-model="familyName" required @input="validate()"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      // titles: [],
      aka: null,
      givenName: null,
      familyName: null,
      valid: true,
      selectedTitle: null,
      titles: ['Mr.', 'Ms.', 'Dr.'],
      rule: [
        v => !!v || 'This field is required'
      ]
    }
  },
  mounted() {
    this.$store.dispatch("fetchTitlesGet").then(() => {
      this.setTitles()
    })
  },
  methods: {
    setTitles() {
      if(this.$store.state.titels.titleGet) {
        for (let index = 0; index < this.$store.state.titels.titleGet.length; index++) {
          const element = this.$store.state.titels.titleGet[index].shortDescription
          this.titles.push(element)
        }
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.$emit('onvalidation', true, this.selectedTitle, this.givenName, this.familyName, this.aka)
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