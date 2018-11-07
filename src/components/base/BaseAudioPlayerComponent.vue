<template lang="html">
  <v-container>
    <v-flex class="mx-3">
      <v-layout row align-center justify-center>
        <audio
          ref="audio"
          :src="audioData"
          :type="audioType"
         >
        </audio>
        <v-btn
          class="ml-3"
          fab
          dark
          small
          color="primary"
          @click="play"
        >
          <v-icon>play_arrow</v-icon>
        </v-btn>
        <v-btn
          class="mr-3"
          fab
          dark
          small
          color="error"
          @click="play"
        >
          <v-icon>stop</v-icon>
        </v-btn>
        <h2 class="pg-subheader">0.00</h2>
      </v-layout>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: 'BaseAudioPlayerComponent',
  data () {
    return {
      // audioData: require(this.audioFile)
      // audioData: require('"' + String(this.audioFile) + '"'),
      audioData: require('../../../public/audio/mp3/mpfile.mp3'),
      audio: undefined
    }
  },
  props: {
    audioFile: String,
    audioType: String
  },
  methods: {
    play () {
      this.$refs.audio.play(this.audioData)
    }
  },
  beforeMount () {
    this.audio = new Audio()
    this.audio.addEventListener('play', this.play)
  },
  mounted () {
    console.log(this.audioFile);
  },
  beforeDestroy () {
    this.audio.removeEventListener('play')
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
