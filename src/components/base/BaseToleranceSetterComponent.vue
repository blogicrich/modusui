<template>
  <div>
    <v-form>
      <!-- v-if="$vuetify.breakpoint.lgAndUp" BELONGS INSIDE V-CONTAINER -->
      <v-container>
        <v-layout row wrap>
          <v-flex xs6>
            <v-card class="redBox" onclick="this.style.height = '150px'" v-model="severeOverHydration"></v-card>
          </v-flex>
          <v-flex xs6>
            <v-text-field
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
            <v-card class="yellowBox" onclick="this.style.height = '150px'" v-model="overHydration"></v-card>
          </v-flex>
          <v-flex xs6>
            <v-text-field
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
            <v-card class="greenBox"></v-card>
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
            <v-card class="yellowBox" onclick="this.style.height = '150px'" v-model="underHydration"></v-card>
          </v-flex>
          <v-flex xs6>
            <v-text-field
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
            <v-card class="redBox" onclick="this.style.height = '150px'" v-model="severeUnderHydration"></v-card>
          </v-flex>
          <v-flex xs6>
            <v-text-field
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
    background-color: #FF0000;
    border: 1px solid black;
  }

  .yellowBox {
    height: 75px;
    background-color: #FFFF00;
    border: 1px solid black;
  }

  .greenBox {
    height: 75px;
    background-color: #00FF00;
    border: 1px solid black;
  }
</style>
