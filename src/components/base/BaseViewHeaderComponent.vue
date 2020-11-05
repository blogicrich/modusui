<template>
  <v-container fluid>
    <v-layout row wrap fill-height align-center justify-center>
      <v-flex xs12 md4>
        <v-fade-transition>
          <v-layout row fill-height align-center justify-start>
            <v-fade-transition>
              <v-icon class="ml-1 mr-2" v-if="$vuetify.breakpoint.mdAndUp" large :color="$vuetify.theme.primary">{{ headerIcon }}</v-icon>
              <v-icon class="ml-1 mr-2" v-if="$vuetify.breakpoint.smOnly" medium :color="$vuetify.theme.primary">{{ headerIcon }}</v-icon>
              <v-icon class="ml-1 mr-2" v-if="$vuetify.breakpoint.xsOnly" small :color="$vuetify.theme.primary">{{ headerIcon }}</v-icon>
            </v-fade-transition>
            <v-fade-transition>
              <h1 class="pg-header text-primary header-container">{{ headerText }}</h1>
            </v-fade-transition>
          </v-layout>
        </v-fade-transition>
      </v-flex>
      <v-flex xs12 md4>
        <v-fade-transition>
          <slot name="ctrViewHeaderColumn" />
        </v-fade-transition>
      </v-flex>
      <v-flex xs12 md4>
        <slot name="rhViewHeaderColumn" />
      </v-flex>
    </v-layout>
    <v-divider class="mt-2" v-if="hasDivider" :color="$vuetify.theme.primary" />
  </v-container>
</template>

<script>

export default {
  name: 'BaseViewHeader',
  props: {
    headerIcon: String,
    headerText: String,
    hasDivider: Boolean
  }
}
</script>
<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
