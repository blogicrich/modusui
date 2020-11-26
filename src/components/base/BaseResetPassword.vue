<template>
  <v-layout class="mx-3" align-center justify-center column>
    <router-link to="/login">
      <v-img contain :height="imageSize" :width="imageSize" :src="require('@/assets/ed_logo.svg')" />
    </router-link>
    <v-form ref="forgotpwform" @submit.prevent="checkEmail">
      <v-layout class="mx-3" align-center justify-center column>
        <span
          class="body-1 text-xs-center"
        >
          {{ instructions }}
        </span>
        <v-text-field
          class="mt-2"
          v-model="email"
          :hint="hint"
          label="email"
          type="email"
          name="email"
          outline
          single-line
          full-width
          :rules="emailRules"
        />
      </v-layout>
      <v-layout row fill-height align-end justify-end>
        <v-btn
          :disabled="!validateEmail(email)"
          :color="$vuetify.theme.primary"
          @click="checkEmail"
        >
          <v-icon
            class="mr-2"
            :color="$vuetify.theme.secondary"
          >
            send
          </v-icon>
          <div
            class="secondary--text"
          >
            {{ 'SEND EMAIL' }}
          </div>
        </v-btn>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script>

import validation from '@/mixins/validation'

export default {
  name: 'BaseResetPassword',
  mixins: [
    validation
  ],
  computed: {
    /* eslint-disable vue/return-in-computed-property */
    imageSize () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '200'
        case 'sm': return '300'
        case 'md': return '300'
        case 'lg': return '400'
        case 'xl': return '450'
      }
    }
  },
  data () {
    return {
      email: undefined,
      emailRules: [
        (v) => !!v || 'Email address is required',
        (v) => this.emailRegEx.test(v) || 'Email address must be valid',
        (v) => this.validateMaxChars(v, 256) || 'Email address too long'
      ],
      hint: 'Please enter valid email address',
      instructions: 'Please enter your email address below and click the "Send E-mail" button.'
    }
  },
  methods: {
    checkEmail: function () {
      if (!this.email || !this.$refs.forgotpwform.validate()) {
        alert('Valid email is required.')
      } else {
        // Implement successful email submission
        alert('Please check your e-mail for a link to reset your password.')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
