<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <v-container grid-list-xl>
      <v-layout align-start justify-space-around row wrap>
        <v-flex d-flex xs12 sm12 md6 lg6 xl6>
          <v-select
            v-if="titles"
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
        <v-flex d-flex xs12 sm12 md6 lg6 xl6>
          <v-text-field
            label="AKA"
            :rules="rule"
            v-model="aka"
            required
            @input="validate()"
          ></v-text-field>
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

export default {
  data () {
    return {
      aka: '',
      givenName: '',
      familyName: '',
      valid: true,
      selectedTitle: '',
      rule: [
        v => !!v || 'This field is required'
      ]
    }
  },
  computed: {
    titles () {
      const data = this.$store.getters.getterWizardTitles
      console.log(this.$store.getters.getterWizardTitles)
      return data
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
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
