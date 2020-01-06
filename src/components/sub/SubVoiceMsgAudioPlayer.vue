<template lang="html">
  <v-container class="pa-0">
    <v-layout row wrap align-center justify-space-around>
      <v-flex xl2 md3 lg2 sm12 xs12>
          <v-layout row align-center justify-center>
            <h3 class="text-intervals">{{ data.voiceMessagedescription }}</h3>
            <v-icon @click="$refs.file.click()" class="mx-2" color="primary">{{ uploadIcon }}</v-icon>
          </v-layout>
          <v-layout cloumn align-center justify-center>
          <input @change="showSaveFile = true" type="file" style="display:none" ref="file" accept=".mp3">
          <v-btn v-if="showSaveFile" color="primary" @click="saveAudio()">Save changes</v-btn>
        </v-layout>
      </v-flex>
      <v-flex xl5 md3 lg5 sm12 xs12>
        <v-layout row align-center justify-center style="margin: 5px auto;">
          <BaseAudioPlayer class="vuetify-audio" :file="data.audioFile"></BaseAudioPlayer>
        </v-layout>
      </v-flex>
      <v-flex xl4 md4 lg4 sm12 xs12>
        <v-layout row warp align-center justify-center>
            <v-radio-group class="radio-group" :value="value" :mandatory="false" :row="this.$vuetify.breakpoint.name !== 'xs'" :column="this.$vuetify.breakpoint.name === 'xs'">
            <h3 slot="label" class="text-intervals mr-3 my-1" >Message Interval in Minutes:</h3>
            <v-radio @change="showSaveInterval = false" color="primary" v-for="radio in radioConfig" :key="radio.label" :label="radio.label" :value="radio.value" class="radio"></v-radio>
            <!-- <v-btn v-if="showSaveInterval" color="primary" @click="saveInterval()">Save changes</v-btn> -->
          </v-radio-group>
                      <v-btn :disabled="showSaveInterval" fab color="primary" @click="saveInterval()">
                        <v-icon >save</v-icon>
                      </v-btn>
          
        </v-layout>
      </v-flex>
    </v-layout>
    <!-- <v-divider color="#f2f4f4"></v-divider> -->
  </v-container>
</template>

<script>
import BaseAudioPlayer from '@/components/base/BaseAudioPlayer'
import apiLib from '@/services/apiLib'

export default {
  name: 'SubVoiceMsgAudioPlayer',
  components: {
    BaseAudioPlayer
  },
  data () {
    return {
      showSaveFile: false,
      showSaveInterval: true,
      updateSysAdminUrl: 'sysadmin/voice-message/',
      file: ''
    }
  },
  props: {
    radioConfig: Array,
    uploadIcon: String,
    data: Object,
    value: String
  },
  methods: {
    saveAudio () {
      let data = {
        audioFile: this.$refs.file.files[0].name
      }
      apiLib.updateData(this.updateSysAdminUrl + this.data.voiceMessagesId, data, true, true)
      this.showSaveFile = false
    },
    saveInterval () {
      // this.showSaveInterval = false
    }
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";

.vuetify-audio {
  text-align: center;
  padding: 10px;
  border-radius: 5em;
  min-width: 300px;
}

.mx-3 {
  padding: 10px;
  margin: 0;
}

.radio-group {
  max-width: 300px;
}
</style>
