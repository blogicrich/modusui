<template>
  <v-layout class="pt-1" row fill height align-start justify-start>
    <v-tooltip top>
      <span>{{ route }}</span>
      <v-btn
        slot="activator"
        large
        flat
        icon
        :color="btnColor"
        @click="navigate"
      >
        <v-icon color="primary" large>{{ btnIcon }}</v-icon>
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
    route: String,
    btnIcon: String,
    btnColor: String,
  },
  methods: {
    navigate () {
      this.$router.push("/" + this.route)
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
