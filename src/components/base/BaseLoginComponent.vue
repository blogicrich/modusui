<template>
  <v-layout column align-center justify-center @keyup.enter="checkValues">
    <v-img
      style="margin:-0px"
      contain
      :height="imageSize"
      :width="imageSize"
      :src="require('@/assets/ed_logo.svg')"
    />
    <v-progress-circular
      v-if="isAuthenticating"
      class="ma-2"
      :rotate="180"
      :size="spinnerSize"
      :width="spinnerWidth"
      :color="primaryColor"
      indeterminate
    />
    <span
      v-if="isAuthenticating && !isActive"
      style="text-xs-center accent--text font-weight-bold"
    >
      Authenticating. Please wait...
    </span>
    <v-layout v-if="msg && !isActive && !isAuthenticating" align-center justify-center>
      <v-icon class="mr-2 mb-1" color="error">highlight_off</v-icon>
      <span class="body-2 text-xs-center accent--text font-weight-bold">{{ msg }}</span>
    </v-layout>
    <v-form
      ref="loginForm"
      v-model="loginFormValid"
      v-if="!isAuthenticating && !isActive"
    >
      <v-layout column align-center justify-center>
        <v-text-field
          v-model="input.username"
          type="text"
          label="username"
          name="username"
          outline
          :rules="[v => !!v || 'Username required!']"
        />
        <v-text-field
          v-model.lazy="input.password"
          type="password"
          label="password"
          name="password"
          outline
          :rules="[v => !!v || 'Password required!']"
        />
        <router-link class="mb-3" to="/passwordreset">
          <a>Forgotten password?</a>
        </router-link>
      </v-layout>
      <v-layout v-if="!isAuthenticating && !isActive" row align-end justify-end>
        <v-btn
          :disabled="!loginFormValid || isAuthenticating"
          :color="$vuetify.theme.primary"
          @click="checkValues"
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
            {{ 'SUBMIT' }}
          </div>
        </v-btn>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script>

export default {
  name: 'BaseLoginComponent',
  data: function () {
    return {
      input: {
        password: null,
        username: null
      },
      spinText: '',
      errMsg: undefined,
      hide: false,
      meta: null,
      values: null,
      loginFormValid: false
    }
  },
  props: {
    msg: String,
    isActive: Boolean,
    isAuthenticating: Boolean,
    primaryColor: String,
    spinnerSize: String,
    spinnerWidth: String
  },
  computed: {
    showSpinner () {
      if (this.isAuthenticating) return true
      else return false
    },
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
  methods: {
    checkValues () {
      if (this.$refs.loginForm.validate()) {
        this.$emit('authenticate', { password: this.input.password, username: this.input.username })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
