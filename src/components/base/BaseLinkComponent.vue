<template>
  <v-container :class="hovering ? 'enter-style' : 'leave-style' " @click="navigate" @mouseenter="setHover" @mouseleave="setHover">
    <v-layout row wrap fill-height align-center justify-start>
      <v-icon
        :size="iconSize"
        :color="colorIcon"
        :to="link"
      >
        {{ icon }}
      </v-icon>
      <span class="route-title primary--text">{{ routerTitle }}</span>
    </v-layout>
    <v-layout class="mt-2" row wrap fill-height align-center justify-start>
      <span class="route-title description">{{ tooltipText }}</span>
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
  computed: {
    /* eslint-disable vue/return-in-computed-property */
    iconSize () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '20'
        case 'sm': return '22'
        case 'md': return '24'
        case 'lg': return '28'
        case 'xl': return '38'
      }
    }
    /* eslint-disable vue/return-in-computed-property */
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
  @media screen and (min-width: 340px) { // Aligned with Vuetify breakpoint values
    .route-title {
      font-weight: bold;
      color: var(--v-primary-base);
    }
    .enter-style {
      cursor: pointer;
      .route-title {
        transition: all 0.6s ease;
        margin-left: 10px;
        font-size: 1.1em;
      }
      .description {
        transition: all 0.6s ease;
        font-style: italic;
        color: var(--v-primary-base);
      }
    }
    .leave-style {
      cursor: none;
      .route-title {
        transition: all 0.6s ease;
        margin-left: 4px;
        font-size: 1em;
      }
      .description {
        transition: all 0.6s ease;
        font-style: normal;
        color: var(--v-accent-base);
      }
    }
  }
    @media screen and (min-width: 1264px) { // Aligned with Vuetify breakpoint values
    .route-title {
      font-weight: bold;
      color: var(--v-primary-base-base);
    }
    .enter-style {
      cursor: pointer;
      .route-title {
        transition: all 0.6s ease;
        margin-left: 10px;
        font-size: 0.9em;
      }
      .description {
        transition: all 0.6s ease;
        font-style: italic;
        color: var(--v-primary-base-base);
      }
    }
    .leave-style {
      cursor: none;
      .route-title {
        transition: all 0.6s ease;
        margin-left: 4px;
        font-size: 0.8em;
      }
      .description {
        transition: all 0.6s ease;
        font-style: normal;
        color: var(--v-accent-base);
      }
    }
  }

  @media screen and (min-width: 1904px) { // Aligned with Vuetify breakpoint values
    .enter-style {
      cursor: pointer;
      .route-title {
        transition: all 0.6s ease;
        margin-left: 10px;
        font-size: 1.4em;
      }
      .description {
        transition: all 0.6s ease;
        font-style: italic;
        color: var(--v-primary-base);
      }
    }
    .leave-style {
      cursor: none;
      .route-title {
        transition: all 0.6s ease;
        margin-left: 4px;
        font-size: 1.3em;
      }
      .description {
        transition: all 0.6s ease;
        font-style: normal;
        color: var(--v-accent-base);
      }
    }
  }
</style>
