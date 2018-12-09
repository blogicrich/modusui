<template>
  <v-container :class="hovering ? 'enter-style' : 'leave-style' " @click="navigate" @mouseenter="setHover" @mouseleave="setHover">
    <v-layout row wrap fill-height align-center justify-start>
      <v-icon
        :class="hovering ? 'mr-3' : 'mr-2'"
        :size="hovering ? '28' : '24'"
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

  // .hoverTrue {
  // transition: all 0.3s ease;
  // // margin: 1vw 0vh 1vw 0vh;
  // cursor: pointer;
  // color: $vuetify-accent;
  //   p {
  //     transition: all 0.3s ease;
  //     font-style: italic;
  //   }
  // }
  // .hoverFalse {
  //   // margin: 1vw 0vh 1vw 0vh;
  //   color: $vuetify-primary;
  //   p {
  //     font-style: normal;
  //   }
  // }

  .enter-style {
    transition: all 0.3s ease;
    cursor: pointer;
    .subheader {
      font-size: 1.2em;
    }
    .text-secondary {
      font-style: italic;
    }
  }
  .leave-style {
    cursor: none;
    .subheader {
      font-size: 1em;
    }
    .text-secondary {
      font-style: normal;
    }
  }
</style>
