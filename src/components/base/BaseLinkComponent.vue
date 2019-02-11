<template>
  <v-container :class="hovering ? 'enter-style' : 'leave-style' " @click="navigate" @mouseenter="setHover" @mouseleave="setHover">
    <v-layout row wrap fill-height align-center justify-start>
      <v-icon
        :size="28"
        :color="colorIcon"
        :to="link"
      >
        {{ icon }}
      </v-icon>
      <span class="subheader">{{ routerTitle }}</span>
    </v-layout>
    <v-layout class="mt-2" row wrap fill-height align-center justify-start>
      <span class="text-secondary">{{ tooltipText }}</span>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'BaseLinkComponent',
  data () {
    return {
      hovering: false
    }
  },
  props: {
    routerTitle: String,
    link: String,
    tooltipText: String,
    icon: String,
    colorIcon: String,
    test: String
  },
  methods: {
    navigate () {
      this.$router.push(this.link)
    },
    setHover () {
      this.hovering = !this.hovering
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";

  .enter-style {
    cursor: pointer;
    .subheader {
      transition: all 0.6s ease;
      margin-left: 10px;
      font-size: 1.2em;
    }
    .text-secondary {
      transition: all 0.6s ease;
      font-style: italic;
      color: $vuetify-primary;
    }
  }
  .leave-style {
    cursor: none;
    .subheader {
      transition: all 0.6s ease;
      margin-left: 4px;
      font-size: 1em;
    }
    .text-secondary {
      transition: all 0.6s ease;
      font-style: normal;
      color: $dark-blue-grey;
    }
  }
</style>
