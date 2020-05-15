<template>
  <v-container class="pa-3" ref="dashboard" fluid grid-list-md>
    <!-- HEADER -->
    <v-layout ref="dashboard-header" v-bind="binding">
      <v-flex xs12 md4>
        <slot name="dashboardHeaderLeft"></slot>
      </v-flex>
      <v-flex xs12 md4>
        <slot name="dashboardHeaderCenter"></slot>
      </v-flex>
      <v-flex xs12 md4>
        <slot name="dashboardHeaderRight"></slot>
      </v-flex>
    </v-layout>
    <!-- DASHBOARD CONTENT -->
    <!-- ROW-1 -->
    <v-layout v-bind="binding">
      <v-flex xs12 md8 order-xs1>
        <v-card class="pa-3" hover>
          <slot name="tileOne"></slot>
        </v-card>
      </v-flex>
      <v-flex xs12 md4 order-xs2>
        <v-card hover class="pa-3">
          <slot name="tileTwo"></slot>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- ROW-2 -->
    <v-layout v-bind="binding">
      <v-flex xs12 md8 order-xs3>
        <v-card hover class="pa-3" dark>
          <slot name="tileThree"></slot>
        </v-card>
      </v-flex>
      <v-flex xs12 md4 order-xs4>
        <v-card hover class="pa-3">
          <slot name="tileFour"></slot>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'BaseDashboardComponent',
  computed: {
    binding () {
      const binding = {}
      if (this.$vuetify.breakpoint.smAndDown) {
        binding.column = true
        binding.row = false
        binding.fillHeight = false
      }
      if (this.$vuetify.breakpoint.mdAndUp) {
        binding.column = false
        binding.row = true
        binding.fillHeight = true
      }
      return binding
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./public/scss/main.scss";

.v-card {
  background-color: $white;
  padding: 5px;
}

</style>
