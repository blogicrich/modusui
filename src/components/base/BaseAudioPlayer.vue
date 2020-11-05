<template>
  <v-flex class="audio-card" :id="'audio-' + uniqid" transition="slide-x-transition">
    <v-card-text class="card-text">
      <v-btn dark icon class="audio-button" @click.native="playing ? stop() : play()" :disabled="!loaded">
        <v-icon v-if="!playing || paused">play_arrow</v-icon>
        <v-icon v-else>stop</v-icon>
      </v-btn>

      <v-menu v-model="menu" offset-y row>
        <v-btn slot="activator" dark icon class="audio-button" :disabled="!loaded">
          <v-icon v-if="volumeValue >= 50">volume_up</v-icon>
          <v-icon v-else-if="volumeValue < 50 && volumeValue !== 0">volume_down</v-icon>
          <v-icon v-else-if="volumeValue === 0">volume_off</v-icon>
        </v-btn>
        <v-card>
          <v-list style="padding:15px 0 10px 0;">
            <v-list-tile>
              <v-slider v-model="volumeValue" thumb-label @input="volume()" :thumb-size="20" />
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
      <p style="display:inline;text-align:center;" class="text-white" dark icon>{{ timeLeft }}</p>
      <v-layout row>
        <v-flex offset-xs1 xs10>
          <v-slider dark color="white" class="progressSlider" step="0.1" tick-size="0.1" always-dirty @click.native="setPosition()" v-model="percentage" :disabled="!loaded" />
        </v-flex>
      </v-layout>
    </v-card-text>
    <audio id="player" ref="player" @ended="ended" @canplay="canPlay" :src="file" />
  </v-flex>
</template>
<script>
const formatTime = second => new Date(second * 1000).toISOString().substr(14, 5)

export default {
  name: 'BaseAudioPlayer',
  props: {
    file: {
      type: String,
      default: null
    },
    ended: {
      type: Function,
      default: () => { }
    },
    canPlay: {
      type: Function,
      default: () => { }
    }
  },
  computed: {
    duration: function () {
      return this.audio ? formatTime(this.totalDuration) : ''
    }
  },
  data () {
    return {
      firstPlay: true,
      isMuted: false,
      loaded: false,
      playing: false,
      paused: false,
      percentage: 0,
      currentTime: '',
      audio: undefined,
      totalDuration: '',
      menu: false,
      volumeValue: 100,
      uniqid: null,
      timeLeft: ''
    }
  },
  watch: {
    currentTime: function () {
      this.timeLeft = this.audio ? formatTime(parseInt(this.totalDuration) - parseInt(this.audio.currentTime)) : ''
    }
  },
  methods: {
    // Set position on slider
    setPosition () {
      this.audio.currentTime = this.audio.duration / 100 * this.percentage
    },
    // Stop playing audio file
    stop () {
      // Setting both vars to false
      this.paused = this.playing = false
      this.audio.pause()
      this.audio.currentTime = 0
    },
    // Play if not already playing
    play () {
      if (this.playing) return
      this.paused = false
      // First play then set playing to true
      this.audio.play().then((setPlaying) => {
        this.playing = true
      })
    },
    // Pause if not already paused
    pause () {
      this.paused = !this.paused;
      (this.paused) ? this.audio.pause() : this.audio.play()
    },
    volume () {
      // Mute the volume
      if (this.volumeValue === 0) {
        this.isMuted = true
        this.audio.muted = this.isMuted
        // Set it to selected value
      } else {
        this.isMuted = false
        this.audio.muted = this.isMuted
        this.audio.volume = this.volumeValue / 100
      }
    },
    // Handle audio duration
    handleLoaded: function () {
      if (this.audio.readyState >= 2) {
        this.totalDuration = parseInt(this.audio.duration)
        this.loaded = true
        this.timeLeft = formatTime(parseInt(this.totalDuration) - parseInt(this.audio.currentTime))
        if (this.autoPlay) this.audio.play()
      } else {
        // console.log('Failed to load audio file')
      }
    },
    // Handle slider position
    handlePlayingUI: function (e) {
      this.percentage = this.audio.currentTime / this.audio.duration * 100
      this.currentTime = formatTime(this.audio.currentTime)
    },
    // Handle pausing and playing
    handlePlayPause: function (e) {
      if (e.type === 'play' && this.firstPlay) {
        this.audio.currentTime = 0
        if (this.firstPlay) this.firstPlay = false
      }
      if (e.type === 'pause' && this.paused === false && this.playing === false) this.currentTime = '00:00'
    },
    // Handle end of audio file
    handleEnded () {
      this.paused = this.playing = false
    },
    // Initialize the audio file and its controls
    init: function () {
      this.audio.addEventListener('timeupdate', this.handlePlayingUI)
      this.audio.addEventListener('loadeddata', this.handleLoaded)
      this.audio.addEventListener('pause', this.handlePlayPause)
      this.audio.addEventListener('play', this.handlePlayPause)
      this.audio.addEventListener('ended', this.handleEnded)
    }
  },
  mounted () {
    // Assigning audio to DOM element with ref attribute with value of 'player'
    this.audio = this.$refs.player
    this.init()
    this.audio.volume = this.volumeValue / 100
    // console.log(this.audio)
  },
  created () {
    // Set unique id for component
    this.uniqid = Math.floor(Math.random() * 1000000)
  }
}
</script>

<style lang="scss" scoped>
@import "./public/scss/main.scss";
.audio-card {
  background-color: $vuetify-primary;
  border-radius: 5em;
}

.audio-button {
  padding: 0;
  margin: 5px;
}

.volumeSlider {
  padding-top: 5px;
  overflow: hidden;
}

.audio-slider {
  margin: 0;
  padding: 0;
}

.time {
  padding: 0;
  margin: 0;
}

.card-text {
  margin: 0;
  padding: 0;
}

.progressSlider {
  margin: 0;
  padding: 0;
  height: 40px;
}
</style>
