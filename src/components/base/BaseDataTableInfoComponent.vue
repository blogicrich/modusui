<template>
  <v-fade-transition>
    <v-layout row fill-height align-center justify-center>
      <v-flex v-if="loading && this.$vuetify.breakpoint.mdAndUp" class="mx-2 mb-5" xs12>
        <v-layout v-if="loading" class="my-3" row fill-height align-center justify-center>
          <v-icon color="primary" size="36">info</v-icon>
          <h2 class="text-xs-center pg-subheader text-primary">{{ loadingMsg }}</h2>
        </v-layout>
        <v-layout justify-center>
          <v-progress-circular
            v-if="loading"
            :size="100"
            :width="7"
            :color="color"
            indeterminate
          ></v-progress-circular>
        </v-layout>
      </v-flex>
      <v-flex v-if="loading && this.$vuetify.breakpoint.smAndDown" class="mx-2 mb-5" xs12>
        <v-layout v-if="loading" class="my-3" row fill-height align-center justify-center>
          <v-icon color="primary" size="24">info</v-icon>
          <h2 class="text-xs-center card-subhead text-primary">{{ loadingMsg }}</h2>
        </v-layout>
        <v-layout justify-center>
          <v-progress-circular
            v-if="loading"
            :size="50"
            :width="5"
            :color="color"
            indeterminate
          ></v-progress-circular>
        </v-layout>
      </v-flex>
      <v-flex class="mx-2" v-if="loaded" xs12>
        <v-layout v-if="loaded && this.$vuetify.breakpoint.mdAndUp"  class="my-3" row fill-height align-center justify-center>
          <v-icon color="warning" size="36">warning</v-icon>
          <h3 class="text-xs-center pg-subheader text-warning">{{ loadedMsg }}</h3>
        </v-layout>
        <v-layout v-if="loaded && this.$vuetify.breakpoint.smAndDown" class="my-3" row fill-height align-center justify-center>
          <v-icon color="warning" size="24">warning</v-icon>
          <h2 class="text-xs-center card-subhead text-warning">{{ loadedMsg }}</h2>
        </v-layout>
      </v-flex>
      <v-flex class="mx-2" v-if="error" xs12>
        <v-layout v-if="error && this.$vuetify.breakpoint.mdAndUp" class="my-3" row fill-height align-center justify-center>
          <v-icon color="error" size="36">error</v-icon>
          <h2 class="text-xs-center pg-subheader text-error">{{ errorMsg }}</h2>
        </v-layout>
        <v-layout v-if="error && this.$vuetify.breakpoint.smAndDown" class="my-3" row fill-height align-center justify-center>
          <v-icon color="error" size="24">error</v-icon>
          <h2 class="text-xs-center card-subhead text-error">{{ errorMsg }}</h2>
        </v-layout>
      </v-flex>
    </v-layout>
</v-fade-transition>
</template>

<script>

export default {
  name: 'BaseDataTableInfoComponent',
  props: {
    // Messages
    loadingMsg: String,
    loadedMsg: String,
    errorMsg: String,
    color: String,
    // Bools
    loading: Boolean,
    loaded: Boolean,
    error: Boolean
  },
  mounted () {
    // console.log(this.loadedMsg)
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
