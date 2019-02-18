
<template>
  <v-container grid-list-lg>
    <v-layout row align-center justify-center prepend-icon="event">
      <v-icon large>event</v-icon>
      <v-icon @click="subDate()" large>keyboard_arrow_left</v-icon>
      <v-menu ref="menu" v-model="menu" :close-on-content-click="true" :return-value.sync="date">
        <v-text-field slot="activator" v-model="date" readonly></v-text-field>
        <v-date-picker v-model="date" no-title scrollable>
          <v-btn flat color="white" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="white" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
      <v-icon @click="addDate()" large>keyboard_arrow_right</v-icon>
    </v-layout>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm12 md8 lg8 xl8>
        <v-layout row wrap>
          <v-flex d-flex xs12 sm12 md12 lg12 xl12>
            <v-card dark>
              <v-card-title class="headline">Line chart</v-card-title>
              <!-- Insert component here -->
              <!-- <charts :chartType="Line" :lineData="lineChartData" /> -->
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm12 md12 lg12 xl12>
            <v-layout row wrap>
              <v-flex d-flex xs12 sm7 md7 lg7 xl7>
                <v-card dark>
                  <v-card-title class="headline">Bar chart</v-card-title>
                  <!-- Insert component here -->
                  <!-- <charts :chartType="Bar" :barChartData="barChartData" /> -->
                </v-card>
              </v-flex>
              <v-flex d-flex xs12 sm5 md5 lg5 xl5>
                <v-card dark>
                  <v-card-title class="headline">Doughnut chart</v-card-title>
                  <!-- Insert component here -->
                  <!-- <charts :chartType="Doughnut" :doughnutChartData="doughnutChartData" /> -->
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm12 md4 lg4 xl4 child-flex>
        <v-card dark>
          <v-card-title class="headline">User select</v-card-title>
          <!-- Insert component here -->
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      menu: false,
      date: new Date().toISOString().substr(0, 10)
    }
  },
  methods: {
    addDate: function () {
      let dateNow = new Date(this.date)
      this.date = dateNow.setDate(new Date(dateNow.getDate() + 1))
      this.date = dateNow.toISOString().substr(0, 10);
    },
    subDate: function () {
      let dateNow = new Date(this.date)
      this.date = dateNow.setDate(new Date(dateNow.getDate() - 1))
      this.date = dateNow.toISOString().substr(0, 10)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./public/scss/main.scss";
.v-card {
  background-color: $vuetify-primary;
}
</style>
