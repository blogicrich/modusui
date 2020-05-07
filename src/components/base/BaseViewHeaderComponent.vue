<template>
  <v-container fluid>
    <v-layout column justify-center>
      <v-layout row fill-height align-center justify-start >
        <v-layout class="header-container">
          <v-icon class="ml-1 mr-2" v-if="$vuetify.breakpoint.mdAndUp" large :color="$vuetify.theme.primary">{{ headerIcon }}</v-icon>
          <v-icon class="ml-1 mr-2" v-if="$vuetify.breakpoint.smOnly" medium :color="$vuetify.theme.primary">{{ headerIcon }}</v-icon>
          <v-icon class="ml-1 mr-2" v-if="$vuetify.breakpoint.xsOnly" small :color="$vuetify.theme.primary">{{ headerIcon }}</v-icon>
          <h1 class="pg-header text-primary header-container">{{ headerText }}</h1>
        </v-layout>
        <v-layout v-if="chipsText" row align-center justify-end>
          <slot name="rhColumn"></slot>
          <!-- <v-icon class="mx-2" v-if="$vuetify.breakpoint.mdAndUp" outline medium :color="$vuetify.theme.primary">person</v-icon>
          <v-icon class="mx-2" v-if="$vuetify.breakpoint.smAndDown" outline small :color="$vuetify.theme.primary">person</v-icon>
          <v-chip
            v-if="$vuetify.breakpoint.mdAndUp"
            color="secondary"
            text-color="primary"
          >{{ chipsText }}
          </v-chip>
          <v-chip
            v-if="$vuetify.breakpoint.smAndDown"
            small
            color="secondary"
            text-color="primary"
          >{{ chipsText }}
          </v-chip> -->
        </v-layout>
      </v-layout>
    </v-layout>
  <v-divider class="mt-2" v-if="hasDivider" :color="$vuetify.theme.primary"></v-divider>
  </v-container>
</template>

<script>

export default {
  name: 'BaseViewHeader',
  data () {
    return {

    }
  },
  props: {
    headerIcon: String,
    headerText: String,
    hasDivider: Boolean
    // chipsText: String
  }
}
</script>
<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
