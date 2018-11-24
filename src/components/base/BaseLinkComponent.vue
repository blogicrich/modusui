<template>
  <div>
    <v-layout column align-start>
      <div>
        <router-link
          class="text-landing"
          :to="link"
          v-bind:style="{color: colorIcon}"
        >
          <v-icon
            :color="colorIcon"
            :to="link"
          >
            {{ icon }}
          </v-icon>
          <img alt="" src="test"><img>
          <span>{{ routerTitel }}</span>
        </router-link>
      </div>
      <div class="text-tooltip">
        <span>{{ tooltipText }}</span>
      </div>
    </v-layout>
    <br/>
  </div>
</template>

<script>

export default {
  name: 'BaseLinkComponent',
  props: {
    routerTitel: String,
    link: String,
    tooltipText: String,
    icon: String,
    colorIcon: String,
    test: String
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
