<template lang="html">
  <v-container>
    <selectComponent class="mx-2"></selectComponent>
    <v-layout>
      <v-flex xs12>
        <h1 class="pg-header ma-2">Voice Messages</h1>
        <h2 class="pg-subheader ma-2">Message Type: Reminder</h2>
        <v-card class="pa-2">
          <v-divider
            class="ma-2"
            color="#00a1cd"
            >
          </v-divider>
          <SubVoiceMsgAudioPlayer
            v-for="config in audioConfig"
            :radioConfig="drinkIntervalSettings"
            :groupHeader="drinkGroupHeader"
            :groupDescription="drinkRadioDescription"
            :radioHeader="drinkRadioHeader"
            :uploadIcon="uploadIcon"
            :audio="audio"
            :audioFile="audioConfig.source"
            :audioType="audioConfig.audioType"
            :audioConfig="audioConfig"
          />
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
import selectComponent from '../../components/base/BaseUserSelectComponent.vue'
import SubVoiceMsgAudioPlayer from '@/components/sub/SubVoiceMsgAudioPlayer.vue'
export default {
name: 'VoiceMessageViewComponent',
  components: {
    selectComponent,
    SubVoiceMsgAudioPlayer
  },
  data () {
    return {
      value: '',
      drinkIntervalSettings: [
        { label: '20', value: 20 },
        { label: '40', value: 40 },
        { label: '60', value: 60 },
        { label: 'Never', value: 'Never' }
      ],
      drinkGroupHeader: 'Blue light flashing interval options',
      drinkRadioDescription: 'Time betweeen drink reminders - (Blue light flashing)',
      drinkRadioHeader: 'Please select an option from the following:',
      messages: ['msg1', 'msg2','msg3'],
      uploadIcon: 'close',
      value: '',
      audio: undefined,
      // audioFile1: require('../../../public/audio/mp3/mpfile.mp3'),
      // audioFile2: require('../../../public/audio/mp3/mpfile.mp3'),
      // audioFile3: require('../../../public/audio/mp3/mpfile.mp3'),
      audioConfig: [
        {
          source: '../../../public/audio/mp3/mpfile.mp3', audioType: 'audio/mpeg', audioRef:'audio',
        },
        {
          source: '../../../public/audio/mp3/mpfile.mp3', audioType: 'audio/mpeg', audioRef:'audio',
        },
        {
          source: '../../../public/audio/mp3/mpfile.mp3', audioType: 'audio/mpeg', audioRef:'audio',
        }
      ],
      // sourceMP3:
      // sourceOgg: require('../../../public/audio/ogg/ogfile.ogg'),
    }
  },
  props: {

  }
}
</script>

<style lang="css">
</style>
