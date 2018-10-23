<template>
  <v-container id="login-waiting" fluid>
    <v-flex>
      <v-layout column align-center>
        <v-fade-transition>
          <div id="login-loaded" class="mp_login" v-on:keyup.enter="submitCredentials">
            <v-layout class="ma-2" column align-center>
              <img
                alt=""
                src="../../assets/ed_logo.svg"
                >
              <img>
            </v-layout>
            <form>
              <div v-if="isAuthenticating">
                <v-layout row align-center>
                  <v-progress-circular
                    class="ma-2"
                    :rotate="180"
                    :size="30"
                    :width="3"
                    color="#F6AE2A"
                    indeterminate
                  >
                  </v-progress-circular>
                  <h2 style="font-size:1em">Authenticating. Please wait...</h2>
                </v-layout>
              </div>
              <v-fade-transition>
                <div v-if="isFalse">
                  <v-flex>
                    <v-layout align-center justify-center>
                      <v-icon class="ma-2" color="error">highlight_off</v-icon>
                      <h2 v-if="$vuetify.breakpoint.smAndDown" style="font-size:1em">{{ msg }}</h2>
                      <h2 v-if="$vuetify.breakpoint.mdAndUp" style="font-size:1.5em">{{ msg }}</h2>
                    </v-layout>
                  </v-flex>
                </div>
              </v-fade-transition>
              <v-flex>
              <v-layout column align-center>
                  <input  id="userId" v-bind:class="{ 'creds-input': isFalse }" v-model="input.userId" type="text" placeholder="userId" name="userId">
                  <input id="password" v-bind:class="{ 'creds-input': isFalse }" v-model.lazy="input.password" type="password" placeholder="password" name="password">
                  <v-layout class="mb-2" align-end>
                    <a>Forgotten password?</a>
                  </v-layout>
              </v-layout>
              </v-flex>
              <v-layout align-end justify-end column>
                <button
                  type="button"
                  v-on:click="submitCredentials"
                  >
                  Submit
                </button>
              </v-layout>
            </form>
          </div>
        </v-fade-transition>
      </v-layout>
    </v-flex>
  </v-container>
</template>

<script>

export default {
  name: 'Login',
  data: function () {
    return {
      input: {
        password: null,
        userId: null
      },
      isFalse: false,
      // isLoading: true,
      isAuthenticating: false,
      spinText: '',
      errMsg: undefined,
      hide: false,
      msg: '',
      meta: null,
      values: null
    }
  },
  methods: {
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    async submitCredentials () {
      if (this.input.password !== null && this.input.userId !== null) {
        // this.isAuthenticating = true
        // this.isFalse = false
        // this.values = await authentication.login('http://bh-app.westeurope.cloudapp.azure.com:3000/00zlog', this.input.userId, this.input.password, this.meta[0].username[0].adId, this.meta[0].password[0].adId)
        if (this.input.password === 'eDroplet' && this.input.userId === 'eDroplet') {
          this.$emit('authenticated', { state: true, userId: this.input.userId })
          // this.isAuthenticating = false
        } else {
          this.$emit('authenticated', { state: false, userId: this.input.userId })
          // this.isAuthenticating = false
          this.msg = 'Incorrect user id or password.'
          this.isFalse = true
          this.input.password = null
          this.input.userId = null
        }
      } else if (this.input.password === null || this.input.userId === null) {
        this.msg = 'You must complete both fields.'
        this.isFalse = true
      } else {
        this.msg = 'Incorrect user id or password.'
        this.isFalse = true
      }
    }
  }
}
</script>

<style scoped lang="scss">

#login-waiting {
  // width: 75vw;
}
.mp_login {
  // width:50vw;
  // position:relative;
  // left: 25vw;
  // top: 25vh;
}
.mp_loading {
  // height: 100vh;
  // top: 30vh;
}
img {
  width: 35vh;
}
input[type=text], input[type=password] {
  width:inherit;
  padding: 0.5vh;
  margin:1vh;
  border-radius: 0.5vh;
  border-color: rgb(0, 181, 229);
  border-style: solid;
}
.creds-input {
  width:inherit;
  padding: 0.5vh;
  margin:1vh;
  border-radius: 0.5vh;
  border-color: rgb(0, 181, 229);
  border-style: solid;
  background-color: rgb(250, 245, 240);
}
.msgFalse {
  color: red;
}
.msgTrue {
  color: black;
}
button {
  float: right;
  color: black;
  background-color:inherit;
  border-color:  rgb(0, 181, 229);
  border-style: solid;
  border-radius: 1vh;
  box-shadow: 0 0 0.5vh 0.5vh rgba(0, 181, 229,0.0);
  padding: 1vh;
  cursor: pointer;
}
button:hover {
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  float: right;
  color: black;
  background-color:inherit;
  border-style: solid;
  border-radius: 1vh;
  border-color:  rgb(0, 181, 229);
  box-shadow:0.1vh 0.1vh rgba(0, 181, 229,0.25), 0.5vh 0.5vh rgba(0, 181, 229,0.08);
  padding: 1vh;
  cursor: pointer;
}
#userId {
  color: black;
}
</style>
