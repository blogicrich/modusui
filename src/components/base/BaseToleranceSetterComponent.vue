<template>
  <div>
    <v-form>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs6>
            <v-card class="redBox"></v-card>
          </v-flex>
          <v-flex xs6>
            <v-text-field
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
            <v-card class="yellowBox"></v-card>
          </v-flex>
          <v-flex xs6>
            <v-text-field
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
            <v-card class="greenBox"></v-card>
          </v-flex>
          <v-flex xs6>
            <v-card class="greenBox"></v-card>
          </v-flex>
          <v-flex xs6>
            <v-card class="yellowBox"></v-card>
          </v-flex>
          <v-flex xs6>
            <v-text-field
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
            <v-card class="redBox"></v-card>
          </v-flex>
          <v-flex xs6>
            <v-text-field
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
    </v-form>
  </div>
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
      // SevereOverHydration: '200',
      // OverHydration: '120',
      // UnderHydration: '50',
      // SevereUnderHydration: '20'
    }
  },
  props: {
    severeOverHydration: Number,
    overHydration: Number,
    underHydration: Number,
    severeUnderHydration: Number
  }
}
</script>

<style scoped>
  .redBox {
    height: 75px;
    width: 20%;
    background-color: #FF0000;
    border: 1px solid black;
  }

  .yellowBox {
    height: 75px;
    width: 20%;
    background-color: #FFFF00;
    border: 1px solid black;
  }

  .greenBox {
    height: 75px;
    width: 20%;
    background-color: #00FF00;
    border: 1px solid black;
  }
</style>
