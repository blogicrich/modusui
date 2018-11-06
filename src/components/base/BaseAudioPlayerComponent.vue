<template lang="html">
  <v-container>
    <v-flex class="mx-3">
      <v-layout row align-center justify-center>
        <audio
          controls
          hidden
          ref="audio"
          :src="sourceMP3"
          type="audio/mpeg"
         >
        </audio>
        <v-btn
          class="mx-3"
          fab
          dark
          small
          color="primary"
          @click = "play"
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
      value: '',
      audio: undefined,
      sourceMP3: require('../../../public/audio/mp3/mpfile.mp3'),
      sourceOgg: require('../../../public/audio/ogg/ogfile.ogg'),
      demoFile: 'https://soundbible.com/mp3/Tyrannosaurus%20Rex%20Roar-SoundBible.com-807702404.mp3'
    }
  },
  props: {

  },
  methods: {
    play() {
      // this.audio.play()
      // if(filePath)
      // var audio = new Audio()
      this.$refs.audio.play('https://soundbible.com/mp3/Tyrannosaurus%20Rex%20Roar-SoundBible.com-807702404.mp3')
      // console.log(audio)
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
  .audio-player {
    margin: 1%;
  }
</style>
