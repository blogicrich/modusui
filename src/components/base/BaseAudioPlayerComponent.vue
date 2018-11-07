<template lang="html">
  <v-container>
    <v-flex class="mx-3">
      <v-layout row align-center justify-center>
        <audio
          ref="audio"
          :src="audioFile"
          :type="audioType"
         >
        </audio>
        <v-btn
          class="mx-3"
          fab
          dark
          small
          color="primary"
          @click="play"
        >
          <v-icon>play_arrow</v-icon>
        </v-btn>
        <h2>0.00</h2>
      </v-layout>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: 'BaseAudioPlayerComponent',
  data () {
    return {
      audioData: this.audio
    }
  },
  props: {
    audio: Object,
    audioFile: String,
    audioType: String,
  },
  methods: {
    play () {
      // this.audio.play()
      this.$refs.audio.play(this.audioData)
      // else console.log("audio error")
      // console.log(this.$refs)
    }
  },
  beforeMount () {
    this.audio = new Audio()
    // const el = this.$el.querySelectorAll('audio')[0]
    this.audio.addEventListener('play', this.play)
    // console.log(this.source);
    // var context = new AudioContext()
    // var source = context.createBufferSource()
    // source.buffer = aBuffer
    // source.connect(context.destination)
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
