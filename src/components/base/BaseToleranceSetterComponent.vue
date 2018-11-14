<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6>
        <v-card id="expandBox1" class="cardBox" :color="colorRed" v-model="severeOverHydration"></v-card>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          onfocus="expandBox1.style.height = '100%'"
          onfocusout="expandBox1.style.height = '65%'"
          class="textField pa-3"
          label="Severe Over Hydration"
          placeholder="....."
          append-icon="%"
          required
          min="20" max="200"
          type="number"
          v-model="severeOverHydration"
          box
        >{{ severeOverHydration }}</v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-card id="expandBox2" class="cardBox" :color="colorAmber" v-model="overHydration"></v-card>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          onfocus="expandBox2.style.height = '100%'"
          onfocusout="expandBox2.style.height = '65%'"
          class="textField pa-3"
          label="Over Hydration"
          placeholder="....."
          append-icon="%"
          required
          min="20" max="200"
          type="number"
          v-model="overHydration"
          box
        >{{ overHydration }}</v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-card class="cardBox" :color="colorGreen"></v-card>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          class="textField pa-3"
          label="This should be removed."
          placeholder="Great Hydration"
          box
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-card id="expandBox3" class="cardBox" :color="colorBlue" v-model="underHydration"></v-card>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          onfocus="expandBox3.style.height = '100%'"
          onfocusout="expandBox3.style.height = '65%'"
          class="textField pa-3"
          label="Under Hydration"
          placeholder="....."
          append-icon="%"
          required
          min="20" max="200"
          type="number"
          v-model="underHydration"
          box
        >{{ underHydration }}</v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-card id="expandBox4" class="cardBox" :color="colorDarkBlue" v-model="severeUnderHydration"></v-card>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          onfocus="expandBox4.style.height = '100%'"
          onfocusout="expandBox4.style.height = '65%'"
          class="textField pa-3"
          label="Severe Under Hydration"
          placeholder="....."
          append-icon="%"
          required
          min="20" max="200"
          type="number"
          v-model="severeUnderHydration"
          box
        >{{ severeUnderHydration }}</v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SubPageNavButton from '@/components/sub/SubPageNavButton.vue'

export default {
  components: {
    SubPageNavButton
  },
  name: 'BaseToleranceSetter',
  data () {
    return {
    }
  },
  props: {
    severeOverHydration: Number,
    overHydration: Number,
    underHydration: Number,
    severeUnderHydration: Number,
    colorRed: String,
    colorAmber: String,
    colorGreen: String,
    colorBlue: String,
    colorDarkBlue: String
  }
}
</script>

<style scoped>
  .cardBox {
    height: 65%;
    border: 5px solid pink;
  }
</style>
