<template>
  <v-flex :class="$vuetify.breakpoint.smAndDown ? 'border-primary pa-2' : 'border-primary pa-4'">
    <v-layout row fill-height align-center justify-center>
      <v-icon
        :color="$vuetify.theme.accent"
        medium
      >
        {{ groupIcon }}
      </v-icon>
      <h2 class="text-center text-primary title ma-2"> {{ groupHeader }} </h2>
    </v-layout>
    <!-- <h3 v-if="$vuetify.breakpoint.smAndDown" class="text-center text-primary ma-1 title"> {{ groupHeader }} </h3> -->
    <p class="text-left my-2 subheader"> {{ groupDescription }} </p>
    <h3 class="text-left text-primary subheader"> {{ radioHeader }}</h3>
    <slot name="options" />
  </v-flex>
</template>

<script>

export default {
  name: 'BaseRadioOptionsSelectComponent',
  props: {
    groupIcon: String,
    groupHeader: String,
    groupDescription: String,
    radioHeader: String
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
