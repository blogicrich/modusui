<template>
  <v-fade-transition>
    <v-layout row fill-height align-center justify-center>
      <v-flex class="mx-2 mb-5" v-if="loading" xs12>
        <!-- <v-card class="elevation-3 ma-2 my-5" color="inherit"> -->
          <!-- <v-card-title primary-title> -->
              <v-layout class="my-3" row fill-height align-center justify-center>
                <v-icon :color="color" size="36">info</v-icon>
                <h2 class="text-xs-center pg-subheader">{{ infoMsg }}</h2>
              </v-layout>
          <!-- </v-card-title> -->
          <!-- <v-card-text class="elevation-3" color="error"> -->

            <v-layout justify-center>
              <v-progress-circular
                v-if="spinner"
                :size="100"
                :width="7"
                :color="color"
                indeterminate
              ></v-progress-circular>
            </v-layout>
          <!-- </v-card-text> -->
        <!-- </v-card> -->
      </v-flex>
      <v-flex v-if="error" xs12>
        <!-- <v-card class="elevation-3 ma-2 my-5" color="inherit"> -->
          <!-- <v-card-title primary-title> -->
              <v-layout class="my-3" row fill-height align-center justify-center>
                <v-icon color="error" size="48">error</v-icon>
                <h2 class="text-xs-center pg-header text-error">{{ errorMsg }}</h2>
              </v-layout>
          <!-- </v-card-title> -->
          <!-- <v-card-text class="elevation-3" color="error"> -->

            <v-layout justify-center>

            </v-layout>
          <!-- </v-card-text> -->
        <!-- </v-card> -->
      </v-flex>
    </v-layout>
</v-fade-transition>
</template>

<script>

export default {
  name: 'BaseGermDataTableComponent',
  props: {
    // Messages
    infoMsg: String,
    infoTitle: String,
    spinner: Boolean,
    errorMsg: String,
    color: String,
    // Bools
    loading: Boolean,
    loaded: Boolean,
    error: Boolean,
    hide: Boolean
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./public/scss/main.scss";
.abs-position {
    height: 30%;
    width: 50%;
    position: absolute;
    top:25;
    left:25;
}
#cell {
  margin: 2vw;
}
</style>
