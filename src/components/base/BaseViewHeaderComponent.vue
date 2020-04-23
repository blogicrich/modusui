<template>
  <v-container fluid>
    <v-layout class="mx-0 py-0" column justify-center>
      <v-layout v-if="$vuetify.breakpoint.lgAndUp" row fill-height align-center justify-start>
        <v-icon class="ml-1 mr-2" large :color="$vuetify.theme.primary">{{ headerIcon }}</v-icon>
        <h1 class="my-3 pg-header text-primary">{{ headerText }}</h1>
        <v-spacer></v-spacer>
        <v-layout v-if="showChips" row align-center justify-end>
          <v-icon outline medium class="mx-2" color="primary">person</v-icon>
          <v-chip
            class="ml-1 mt-3 mb-3"
            color="secondary"
            text-color="primary"
          >{{ chipsText }}</v-chip>
        </v-layout>
      </v-layout>
      <v-layout v-if="$vuetify.breakpoint.mdOnly" row fill-height align-center justify-start>
        <v-icon class="ml-1 mr-2" medium :color="$vuetify.theme.primary">{{ headerIcon }}</v-icon>
        <h2 class="my-0 text-primary">{{ headerText }}</h2>
        <v-spacer></v-spacer>
        <v-layout v-if="showChips" row align-center justify-end>
          <v-icon outline medium class="mx-2" color="primary">person</v-icon>
          <v-chip
            class="ml-1 mt-3 mb-3"
            color="secondary"
            text-color="primary"
          >{{ chipsText }}</v-chip>
        </v-layout>
      </v-layout>
      <v-layout v-if="$vuetify.breakpoint.smAndDown" row fill-height align-center justify-start>
        <v-icon class="ml-1 mr-2" small :color="$vuetify.theme.primary">{{ headerIcon }}</v-icon>
        <h3 class="my-0 text-primary">{{ headerText }}</h3>
        <v-spacer></v-spacer>
        <v-layout v-if="showChips" row align-center justify-end>
          <v-icon outline small class="mx-2" color="primary">person</v-icon>
          <v-chip
            class="ml-1 mt-3 mb-3"
            color="secondary"
            text-color="primary"
          >{{ chipsText }}</v-chip>
        </v-layout>
      </v-layout>
      <v-spacer></v-spacer>
      <v-layout row fill-height align-end justify-end>
        <v-flex align-center justify-end>
          <slot name="search"></slot>
        </v-flex>
        <v-flex align-center justify-end>
          <slot name="filter"></slot>
        </v-flex>
      </v-layout>
    </v-layout>
  <v-divider class="mx-2 mt-4" v-if="hasDivider" :color="$vuetify.theme.primary"></v-divider>
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
    hasDivider: Boolean,
    chipsText: String,
    showChips: Boolean
  }
}
</script>
<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
