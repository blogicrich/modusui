<template>
    <v-layout row fill-height align-center justify-end>
      <v-menu ref="hourlyChartTypeSelector" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            class="text-white"
            color="primary"
            v-on="on"
          >{{ btnTitle }}
            <v-icon class="mr-1" v-if="selectedType === 'Line Chart'" medium right>show_chart</v-icon>
            <v-icon class="mr-1" v-if="selectedType === 'Bar Chart'" medium right>bar_chart</v-icon>
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
    </v-layout>
</template>

<script>

export default {
  name: 'BaseChartSelectionComponent',
  props: {
    chartTypes: Array,
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
