<template>
  <v-container id="login" fluid fill-height>
    <v-flex>
      <v-layout column align-center>
        <v-fade-transition>
          <div id="login-loaded" class="mp_login" v-on:keyup.enter="checkValues">
            <v-layout class="ma-2" column align-center>
              <img
                class="loginresetimg"
                alt=""
                src='../../assets/ed_logo.svg'
                >
              <img>
            </v-layout>
            <v-form>
              <div v-if="isAuthenticating">
                <v-layout row justify-center align-center>
                  <v-progress-circular
                    class="ma-2"
                    :rotate="180"
                    :size="spinnerSize"
                    :width="spinnerWidth"
                    :color="primaryColor"
                    indeterminate
                  >
                  </v-progress-circular>
                  <h2 style="font-size:1em">Authenticating. Please wait...</h2>
                </v-layout>
              </div>
              <v-fade-transition>
                <div v-if="isActive" class="test">
                  <v-flex>
                    <v-layout align-center justify-center>
                      <v-icon class="ma-2" color="error">highlight_off</v-icon>
                      <h2 v-if="$vuetify.breakpoint.smAndDown" style="font-size:1em">{{ msg }}</h2>
                      <h2 v-if="$vuetify.breakpoint.mdAndUp" style="font-size:1.5em">{{ msg }}</h2>
                    </v-layout>
                  </v-flex>
                </div>
              </v-fade-transition>
              <v-layout v-if="!isAuthenticating">
                <v-flex>
                  <v-layout column align-center>
                      <input class="inputloginreset" id="userId" v-bind:class="{ 'creds-input': isActive }" v-model="input.username" type="text" placeholder="userId" name="username">
                      <input class="inputloginreset" id="password" v-bind:class="{ 'creds-input': isActive }" v-model.lazy="input.password" type="password" placeholder="password" name="password">
                      <v-layout class="mb-2" align-end>
                        <router-link to="/passwordreset">
                          <a>Forgotten password?</a>
                        </router-link>
                      </v-layout>
                  </v-layout>
                </v-flex>
                <v-layout align-end justify-end column>
                  <button
                    type="button"
                    v-on:click="checkValues"
                    >
                    Submit
                  </button>
                </v-layout>
              </v-layout>
            </v-form>
          </div>
        </v-fade-transition>
      </v-layout>
    </v-flex>
  </v-container>
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
      values: null
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
  methods: {
    checkValues () {
      this.$emit('authenticate', { password: this.input.password, username: this.input.username })
    }
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";

#login {
  background-color: inherit;
}
h2 {
  color: $dark-blue-grey;
}
button:hover {
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  float: right;
  color: $dark-blue-grey;
  background-color:inherit;
  border-style: solid;
  border-radius: 1vh;
  border-color:  $vuetify-primary;
  box-shadow:0.1vh 0.1vh rgba(0, 181, 229,0.25), 0.5vh 0.5vh rgba(0, 181, 229,0.08);
  padding: 1vh;
  cursor: pointer;
}
#userId {
  color: black;
}
</style>
