<template>
  <v-container>
    <v-layout v-for="tolerance in hydrationTolerances" column fill-height align-end justify-end>
      <v-flex v-for="(level, key) in tolerance" xs6>
        <v-layout row wrap fill-height align-start justify-start>
        <v-card
          class="elevation-6 mb-0"
          :height="height"
          color="blue"
          >
        </v-card>
        <!-- <v-spacer></v-spacer> -->
        <v-text-field
          class="ma-0"
          label="Severe Over Hydration"
          placeholder="....."
          append-icon="%"
          required
          min="20" max="200"
          type="number"
          v-model="tolerance[key]"
          outline
          >{{ level }}
        </v-text-field>
      </v-layout>
      </v-flex>

      <!-- <v-flex v-for="(level, index) in tolerance" xs4>

      </v-flex> -->

      <!-- <v-flex xs7>
        <v-card class="cardBox elevation-6" height="75%" :color="level3q" v-model="level3"></v-card>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs4>
        <v-text-field
          label="Over Hydration"
          placeholder="....."
          append-icon="%"
          required
          min="20" max="200"
          type="number"
          v-model="level3"
          outline
        >{{ level3 }}</v-text-field>
      </v-flex>
      <v-flex xs7>
        <v-card class="cardBox" height="75%" :color="colorGreen"></v-card>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs4>
        <v-text-field
          value="Great Hydration"
          outline
        ></v-text-field>
      </v-flex>
      <v-flex xs7>
        <v-card class="cardBox elevation-6" height="75%" :color="level2q" v-model="level2"></v-card>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs4>
        <v-text-field
          label="Under Hydration"
          placeholder="....."
          append-icon="%"
          required
          min="20" max="200"
          type="number"
          v-model="level2"
          outline
        >{{ level2 }}</v-text-field>
      </v-flex>
      <v-flex xs7>
        <v-card class="cardBox elevation-6" height="75%" :color="level1q" v-model="level1"></v-card>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs4>
        <v-text-field
          onfocus="expandBox4.style.height = '100%'"
          onfocusout="expandBox4.style.height = '65%'"
          label="Severe Under Hydration"
          placeholder="....."
          append-icon="%"
          required
          min="20" max="200"
          type="number"
          v-model="level1"
          outline
        >{{ level1 }}</v-text-field>
      </v-flex> -->
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'BaseToleranceSetter',
  data () {
    return {
      tols: ''
    }
  },
  props: {
    hydrationTolerances: Array

    // level4: Number,
    // level3: Number,
    // level2: Number,
    // level1: Number,
    // level4q: String,
    // level3q: String,
    // colorGreen: String,
    // level2q: String,
    // level1q: String
  },
  computed: {
    height () {
      var cardHeight = 0
      if (this.$vuetify.breakpoint.smAndUp) cardHeight = '116px'
      if (this.$vuetify.breakpoint.xsOnly) cardHeight = '90px'
      return cardHeight
    }
  },
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
