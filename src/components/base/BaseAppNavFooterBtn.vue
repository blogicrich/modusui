<template>
  <!-- <v-container> -->
    <v-layout class="pt-2" row fill height align-start justify-start>
      <!-- <div @mouseover="hovering = !hovering" @mouseout="hovering = !hovering">
          <v-icon
          large
          @click="navigate"
          color="primary"

          >{{ btnIcon }}
          </v-icon> -->
        <!-- </div> -->

          <div class="active">
            <v-tooltip top>
            <v-icon
            slot="activator"
            v-on:mouseover="active = !active"
            large
            @click="navigate"
            color="primary"
            >{{ btnIcon }}
            </v-icon>
            <span>{{ route }}</span>
            </v-tooltip>
          </div>


          <!-- <span >This text has a tooltip</span> -->


    </v-layout>
  <!-- </v-container> -->
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
    // title: String,
    // type: String,
    route: String,
    // outline: Boolean,
    btnIcon: String,
    btnColor: String,
    // btnClass: String,
    // block: Boolean,
    // large: Boolean,
    // medium: Boolean,
    // small: Boolean
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

  .active:hover {
    height: 40px;
    width: 40px;
    background-color: $main-blue;
    border-radius: 50%;
  }
  .active {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
</style>
