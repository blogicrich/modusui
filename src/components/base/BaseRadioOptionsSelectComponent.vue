<template>
  <v-flex :class="$vuetify.breakpoint.smAndDown ? 'border-primary pa-2' : 'border-primary pa-4'">
    <h2 v-if="$vuetify.breakpoint.mdAndUp" class="text-center text-primary ma-1"> {{ groupHeader }} </h2>
    <h3 v-if="$vuetify.breakpoint.smAndDown" class="text-center text-primary ma-1"> {{ groupHeader }} </h3>
    <p class="text-left my-2"> {{ groupDescription }} </p>
    <h4 class="text-left text-primary"> {{ radioHeader }}</h4>
    <slot name="options" />
  </v-flex>
</template>

<script>

export default {
  name: 'BaseRadioOptionsSelectComponent',
  props: {
    groupHeader: String,
    groupDescription: String,
    radioHeader: String
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
