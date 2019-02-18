<template lang="html">
  <v-container>
    <v-flex class="mx-3" mx4>
      <v-layout row fill-height align-center justify-space-around style="background-color: rgba(0, 161, 205, 0.1); border-radius:10%/50%; width:250px;">
        <audio
          hidden
          controls
          ref="audio"
          :src="audioData"
          :type="audioType"
         >
        </audio>
        <v-spacer></v-spacer>
        <v-flex>
          <v-layout align-center justify-space-around>
          <v-icon
            @click="play"
            >play_arrow
          </v-icon>
          <v-icon
            @click="play"
            >stop
          </v-icon>
        </v-layout>
        </v-flex>
        <v-flex class="mx-3" md3>
          <h2 class="pg-subheader text-white">0.00</h2>
        </v-flex>
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
    console.log(this.audioFile)
  },
  beforeDestroy () {
    this.audio.removeEventListener('play', this.play)
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
