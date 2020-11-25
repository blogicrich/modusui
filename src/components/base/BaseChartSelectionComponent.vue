<template>
  <v-flex shrink>
    <v-menu v-if="$vuetify.breakpoint.lgAndUp" ref="hourlyChartTypeSelector" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          :disabled="disabled"
          class="secondary--text"
          color="primary"
          v-on="on"
        >
          {{ btnTitle }}
          <v-icon class="mr-1" v-if="selectedType === 'Line Chart'" large right>show_chart</v-icon>
          <v-icon class="mr-1" v-if="selectedType === 'Bar Chart'" large right>bar_chart</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="(item, index) in chartTypes"
          :key="index"
          @click="tileClicked(item.type)"
        >
          <v-list-tile-title>{{ item.type }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-menu v-if="$vuetify.breakpoint.mdAndDown" ref="hourlyChartTypeSelector" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          :disabled="disabled"
          class="secondary--text"
          icon
          :color="$vuetify.theme.secondary"
          v-on="on"
        >
          <v-icon v-if="selectedType === 'Line Chart'" :color="$vuetify.theme.accent" medium>show_chart</v-icon>
          <v-icon v-if="selectedType === 'Bar Chart'" :color="$vuetify.theme.accent" medium>bar_chart</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="(item, index) in chartTypes"
          :key="index"
          @click="tileClicked(item.type)"
        >
          <v-list-tile-title>{{ item.type }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-flex>
</template>

<script>

export default {
  name: 'BaseChartSelectionComponent',
  props: {
    chartTypes: Array,
    disabled: Boolean,
    btnTitle: String,
    selectedType: String
  },
  methods: {
    tileClicked (value) {
      this.$emit('chart-type-changed', value)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
