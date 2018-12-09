<template>
  <v-container>
    <v-layout row wrap>
      <!-- <div class="" style="position: relative; top:75%; right: 0%; height:20%; width:100%; background-color:black;">

      </div> -->
      <v-card class="elevation-8 ma-2 bg">
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout row xs12>
          <!-- <v-flex xs12> -->
          <v-spacer></v-spacer>
          <!-- </v-flex> -->
        </v-layout>
      </v-container>
      </v-card>


      <!-- <v-layout column> -->


          <v-layout v-for="tolerance in hydrationTolerances" column>
            <div class="setters-container">
              <v-text-field
                v-for="(level, key) in tolerance"
                class="ma-2"
                label="Severe Over Hydration"
                placeholder="....."
                append-icon="%"
                required
                type="number"
                v-model.sync="tolerance[key]"
                outline
                >{{ level }}
              </v-text-field>
              <v-spacer></v-spacer>
            </div>
            <!-- <v-card class="elevation-8 white--text setters-container"> -->
            <!-- <v-flex > -->
              <!-- <v-layout row wrap fill-height align-start justify-space-between> -->

              <!-- <v-spacer></v-spacer> -->
              <!-- <v-layout align-end justify-end> -->

            <!-- </v-layout> -->
            <!-- </v-layout> -->
            <!-- </v-flex> -->
            <!-- </v-card> -->
            </v-layout>
          <!-- <v-card-title primary-title>
            <div>
              <div class="headline">

              </div>
              <span></span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark>Button</v-btn>
          </v-card-actions> -->

      <!-- </v-layout> -->
    </v-layout>


    <!-- <v-card
      class="elevation-6 mb-2"
      height="100px"
      >
      <div class="tolerance-card" style="height:100%;width:100%">

      </div>
    </v-card> -->







    <!-- <v-layout v-for="tolerance in hydrationTolerances" column fill-height align-start justify-space-around>
      <v-flex v-for="(level, key) in tolerance">
        <v-layout row wrap fill-height align-start justify-space-between> -->

        <!-- <v-spacer></v-spacer> -->
        <!-- <v-layout align-end justify-end> -->
        <!-- <v-text-field
          class="ma-2"
          label="Severe Over Hydration"
          placeholder="....."
          append-icon="%"
          required
          min="20" max="200"
          type="number"
          v-model="tolerance[key]"
          outline
          reverse
          >{{ level }}
        </v-text-field> -->
      <!-- </v-layout> -->
      <!-- </v-layout> -->
      <!-- </v-flex> -->

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
    <!-- </v-layout> -->
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
      // var cardHeight = 0
      // if (this.$vuetify.breakpoint.smAndUp) cardHeight = '116px'
      // if (this.$vuetify.breakpoint.xsOnly) cardHeight = '90px'
      // return cardHeight
    }
  },
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
  .bg {
    width: 65%;
    height: 100%;
    border-radius: 12px;
    background-image: linear-gradient(red, yellow, green, $vuetify-primary);
  }
  .spacer {
    height:60vh;
  }
</style>
