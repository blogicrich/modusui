<template>
  <v-layout class="pa-1" row fill-height align-center justify-center>
    <v-flex grow @click.stop="$emit('nav-btn-clicked')">
      <v-tooltip :top="top" :right="right" :left="left" :bottom="bottom">
        <span>{{ tip }}</span>
        <v-btn
          slot="activator"
          large
          flat
          icon
          :color="btnColor"
          :disabled="enabled"
        >
          <v-icon :color="iconColor || 'primary'" large>{{ btnIcon }}</v-icon>
        </v-btn>
      </v-tooltip>
      <span class="secondary--text">{{ title }}</span>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'BaseAppNavFooterBtn',
  data () {
    return {
      hovering: false
    }
  },
  computed: {
    enabled () {
      if (String(this.name) === String(this.$route.name)) return true
      else return false
    }
  },
  props: {
    bottom: Boolean,
    left: Boolean,
    right: Boolean,
    top: Boolean,
    btnIcon: String,
    btnColor: String,
    iconColor: String,
    tip: String,
    title: String,
    route: String,
    name: String
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";

  .active {
    display:none;
  }
  .hover v-icon {
    color: white;
  }
</style>
