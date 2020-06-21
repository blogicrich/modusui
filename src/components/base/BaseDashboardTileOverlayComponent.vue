<template>
  <v-container class="transparent overlay" fluid>
    <v-layout class="pt-1" column fill-height align-center justify-center>
      <v-flex grow>
        <v-layout class="ma-2" row fill-height align-center justify-center>
          <v-icon class="mr-3" color="primary" x-large>error</v-icon>
          <span class="text-primary text-center pg-header">{{ message }}</span>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'BaseDashboardTileOverlayComponent',
  data () {
    return {
      hovering: false
    }
  },
  props: {
    message: String
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
  .transparent {
    background-color: transparent;
  }

  .overlay {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
