<template>
  <v-container>
    <!-- <v-layout row wrap> -->
      <!-- <v-flex xs12 md6> -->
        <v-card class="ma-0">
          <!-- <v-flex xs12 md6> -->
          <v-card-title class="subheader"> {{ groupHeader }} </v-card-title>
          <v-divider
            class="mx-2"
            color="#00a1cd">
          </v-divider>
          <!-- <v-layout align-start justify-space-around column fill-height> -->
            <v-card-title> {{ groupDescription }} </v-card-title>
          <!-- </v-layout> -->
            <v-layout>
              <v-card-title class="subheader"> {{ radioHeader }}</v-card-title>
              <v-radio-group
                class="mx-2"
                v-model="value"
                :mandatory="false"
                color="primary"
                row
              >
                <v-radio
                  v-for="radio in radioConfig"
                  :key="radio.label"
                  :label="radio.label"
                  :value="radio.value"
                  >
                </v-radio>
              </v-radio-group>
            </v-layout>
          <!-- </v-flex> -->
        </v-card>
      <!-- </v-flex> -->
    <!-- </v-layout> -->
  </v-container>
</template>

<script>

export default {
  name: 'BaseRadioOptionsSelectComponent',
  data () {
    return {
      value: ''
    }
  },
  props: {
    radioConfig: Array,
    groupHeader: String,
    groupDescription: String,
    radioHeader: String
  }
  // computed: {
  // },
  // methods: {
  // }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
