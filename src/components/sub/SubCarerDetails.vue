<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm12 md6 lg6 xl6>
          <v-switch
            color="primary"
            v-model="isCarer"
            :label="`This person ${isCarer ? '' : 'NOT'} is a Carer`"
            @input="validate()"
          ></v-switch>
        </v-flex>
        <v-flex d-flex xs12 sm12 md6 lg6 xl6>
          <v-switch
            color="primary"
            v-model="isAdmin"
            :label="`This person ${isAdmin ? '' : 'NOT'} is an Admin`"
            @input="validate()"
          ></v-switch>
        </v-flex>
      </v-layout>

      <v-flex v-if="isCarer">
      <v-layout v-if="!breakpoint" wrap>
        <v-flex d-flex xs12 sm12 md6 lg6 xl6>
          <v-text-field
            label="Username"
            :rules="rule"
            v-model="username"
            required
            @input="validate()"
            height="42px"
          ></v-text-field>
        </v-flex>
        <v-flex d-flex xs12 sm12 md6 lg6 xl6>
          <v-select
            v-model="selectedAlertTypes"
            :items="alertTypes"
            attach
            chips
            label="Alert Messages"
            multiple
            item-text="description"
            item-value="alertTypeId"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout v-else wrap>
        <v-flex d-flex xs12 sm12 md6 lg6 xl6>
          <v-select
            v-model="selectedAlertTypes"
            :items="alertTypes"
            attach
            chips
            label="Alert Messages"
            multiple
            item-text="description"
            item-value="alertTypeId"
          ></v-select>
        </v-flex>
        <v-flex d-flex xs12 sm12 md6 lg6 xl6>
          <v-text-field
            label="Username"
            :rules="rule"
            v-model="username"
            required
            @input="validate()"
            height="42px"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm12 md6 lg6 xl6>
          <v-text-field label="Mobile Phone Number (Optional)" v-model="phoneNumber"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm12 md6 lg6 xl6>
          <v-text-field
            label="Email Address"
            :rules="rule"
            v-model="emailAddress"
            required
            @input="validate()"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-flex d-flex xs12 sm12 md6 lg6 xl6>
        <v-radio-group v-model="row" :mandatory="false" row>
          <v-radio v-model="email" label="Email" :value="email"></v-radio>
          <v-radio v-model="sms" label="SMS" :value="sms"></v-radio>
        </v-radio-group>
      </v-flex>
      </v-flex>
    </v-container>
  </v-form>
</template>

<script>
import { crudRoutines } from '@/mixins/dataTableCRUD.js'

export default {
  mixins: [crudRoutines],
  data () {
    return {
      isAdmin: false,
      isCarer: true,
      row: 'email',
      username: '',
      phoneNumber: '',
      emailAddress: '',
      valid: true,
      email: true,
      sms: false,
      rule: [v => !!v || 'This field is required'],
      selectedAlertTypes: []
    }
  },
  watch: {
    isCarer: function () {
      this.$emit('onvalidation', !this.isCarer)
    },
    isAdmin: function () {
      this.$emit('changeAdmin', this.isAdmin)
    }
  },
  computed: {
    alertTypes () {
      return this.$store.getters.getterWizardAlertTypes
    },
    breakpoint () {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.$emit('onvalidation', true, this.isAdmin, this.isCarer, this.username, this.phoneNumber, this.emailAddress, this.email, this.sms, this.selectedAlertTypes)
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
