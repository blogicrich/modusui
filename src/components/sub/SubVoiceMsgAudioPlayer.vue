<template lang="html">
  <v-container class="pa-0">
    <v-layout row wrap align-center justify-space-between>
      <v-flex class="mx-3" md2>
        <v-layout row>
          <h3 class="text-intervals">{{ fileName }}</h3>
          <v-icon class="mx-3" medium color="primary">{{ uploadIcon }}</v-icon>
          <h3 class="text-intervals">{{ audioType }}</h3>
        </v-layout>
      </v-flex>
      <v-flex class="mx-3" md2>
        <v-layout row align-center justify-center>
          <BaseAudioPlayer
            :audioFile="audioFile"
            :audioType="audioType"
          />
        </v-layout>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex class="mx-3">
        <v-layout row align-center justify-center>
          <h3 class="text-intervals mr-3 my-1">Message Interval in Minutes:</h3>
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
    fileName: String,
    // fileType: String,
    value: String,
    audio: Object,
    audioFile: String,
    audioType: String
    // audioConfig: Array,
    // sourceMP3:
    // sourceOgg: require('../../../public/audio/ogg/ogfile.ogg'),
  },
  mounted () {
    // console.log(this.audio)
    console.log(this.audioFile)
    console.log(this.audioType)
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
