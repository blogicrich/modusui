<template>
  <v-layout class="pt-1" row fill height align-center justify-start>
    <v-tooltip :top="top" :right="right" :left="left" :bottom="bottom">
      <span>{{ tip }}</span>
      <v-btn
        slot="activator"
        large
        flat
        icon
        :color="btnColor"
        @click="navigate"
      >
        <v-icon :color="iconColor || 'primary'" large>{{ btnIcon }}</v-icon>
      </v-btn>
    </v-tooltip>
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
  props: {
    bottom: Boolean,
    left: Boolean,
    right: Boolean,
    top: Boolean,
    btnIcon: String,
    btnColor: String,
    iconColor: String,
    tip: String,
    route: String
  },
  methods: {
    navigate () {
      this.$router.push('/' + this.route)
    }
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
