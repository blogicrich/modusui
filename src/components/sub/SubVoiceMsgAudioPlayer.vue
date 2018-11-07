<template lang="html">
  <v-container class="pa-0">
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
            <BaseAudioPlayer
              :audio="audio"
              :audioFile="audioFile"
              :audioType="audioType"
            />
          </v-layout>
        </v-flex>
        <v-flex class="mx-3">
          <v-layout row align-center justify-center>
            <h3 class="mr-3 my-1">Message Interval in Minutes:</h3>
            <!-- <v-layout row fill height align-end justfy-space-around> -->
              <v-radio-group
                :value="value"
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
  </v-container>
</template>

<script>
import BaseAudioPlayer from '@/components/base/BaseAudioPlayerComponent.vue'
export default {
  name: 'SubVoiceMsgAudioPlayer',
  components: {
    BaseAudioPlayer
  },
  props: {
    radioConfig: Array,
    groupHeader: String,
    groupDescription: String,
    radioHeader: String,
    height: String,
    uploadIcon: String,
    // fileName: String,
    // fileType: String,
    value: String,
    audio: Object,
    audioFile: String,
    audioType: String,
    // audioConfig: Array,
    // sourceMP3:
    // sourceOgg: require('../../../public/audio/ogg/ogfile.ogg'),
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
  .audio-player {
    margin: 1%;
  }
</style>
