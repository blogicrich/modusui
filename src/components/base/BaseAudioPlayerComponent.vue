<template lang="html">
  <!-- <selectComponent></selectComponent> -->
    <v-container>
      <v-layout>
        <v-flex xs12>
        <h1 class="pg-header">Voice Messages</h1>
        <v-card class="pa-2">
        <h2 class="pg-subheader">Message Type: Reminder</h2>
        <v-divider
          class="ma-2"
          color="#00a1cd"
          >
        </v-divider>
        <v-layout row wrap align-center justify-center>
          <v-flex class="mx-3">
            <v-layout row>
              <h3>{{ fileType }}</h3>
              <v-icon class="mx-3">{{ uploadIcon }}</v-icon>
              <h3>{{ fileName }}</h3>
            </v-layout>
          </v-flex>
          <v-flex class="mx-3">
            <v-layout row align-center justify-center>
            <v-btn
              class="mx-3"
              fab
              dark
              small
              color="primary"
            >
              <v-icon>play_arrow</v-icon>
            </v-btn>
            <h2>0.00</h2>
          </v-layout>
        </v-flex>
          <v-flex class="mx-3">
            <v-layout row align-center justify-center>
              <h3 class="mr-3 my-1">Message Interval in Minutes:</h3>
              <!-- <v-layout row fill height align-end justfy-space-around> -->
                <v-radio-group
                  v-model="value"
                  :mandatory="false"
                  row
                >
                  <v-radio
                    color="primary"
                    v-for="radio in radioConfig"
                    :key="radio.label"
                    :label="radio.label"
                    :value="radio.value"
                    >
                  </v-radio>
                </v-radio-group>
              <!-- </v-layout> -->
            </v-layout>
          </v-flex>
        </v-layout>
        <v-divider
          class="ma-2"
          color="#f2f4f4"
          >
        </v-divider>
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'BaseAudioPlayerComponent',
  data () {
    return {
      value: ''
    }
  },
  props: {
    radioConfig: Array,
    groupHeader: String,
    groupDescription: String,
    radioHeader: String,
    height: String,
    uploadIcon: String,
    fileName: String,
    fileType: String
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
  .audio-player {
    margin: 1%;
  }
</style>
