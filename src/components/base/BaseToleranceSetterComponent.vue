<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs7>
        <v-card id="expandBox1" class="cardBox elevation-6 mb-0" height="75%" :color="level4q" v-model="level4"></v-card>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs4>
        <v-text-field
          onfocus="expandBox1.style.height = '100%'"
          onfocusout="expandBox1.style.height = '65%'"
          label="Severe Over Hydration"
          placeholder="....."
          append-icon="%"
          required
          min="20" max="200"
          type="number"
          v-model="level4"
          outline
        >{{ level4 }}</v-text-field>
      </v-flex>
      <v-flex xs7>
        <v-card id="expandBox2" class="cardBox elevation-6" height="75%" :color="level3q" v-model="level3"></v-card>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs4>
        <v-text-field
          onfocus="expandBox2.style.height = '100%'"
          onfocusout="expandBox2.style.height = '65%'"
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
          label="This should be removed."
          placeholder="Great Hydration"
          outline
        ></v-text-field>
      </v-flex>
      <v-flex xs7>
        <v-card id="expandBox3" class="cardBox elevation-6" height="75%" :color="level2q" v-model="level2"></v-card>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs4>
        <v-text-field
          onfocus="expandBox3.style.height = '100%'"
          onfocusout="expandBox3.style.height = '65%'"
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
        <v-card id="expandBox4" class="cardBox elevation-6" height="75%" :color="level1q" v-model="level1"></v-card>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'BaseToleranceSetter',
  data () {
    return {
    }
  },
  props: {
    level4: Number,
    level3: Number,
    level2: Number,
    level1: Number,
    level4q: String,
    level3q: String,
    colorGreen: String,
    level2q: String,
    level1q: String
  }
}
</script>

<style scoped>
  .cardBox {
    height: 65%;
  }
</style>
