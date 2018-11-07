<template lang="html">
  <v-container>
    <selectComponent class="mx-2"></selectComponent>
    <v-layout>
      <v-flex xs12>
        <h1 class="pg-header ma-2">Voice Messages</h1>
        <v-card class="pa-2 my-3">
          <h2 class="pg-subheader ma-2">Message Type: Reminder</h2>
          <v-divider
            class="ma-2"
            color="#00a1cd"
            >
          </v-divider>
          <SubVoiceMsgAudioPlayer
            v-for="(config, key, index) in msgReminderConfig" :key="index"
            :radioConfig="msgReminderIntervalSettings"
            :groupHeader="msgReminderGroupHeader"
            :groupDescription="msgReminderRadioDescription"
            :radioHeader="msgReminderRadioHeader"
            :uploadIcon="uploadIcon"
            :audioFile="config.source"
            :audioType="config.audioType"
            :fileName="config.fileName"
          />
          <v-divider
            class="ma-2"
            color="#f2f4f4"
            >
          </v-divider>
        </v-card>
        <v-card class="pa-2 my-3">
          <h2 class="pg-subheader ma-2">Message Type: Instruction</h2>
          <v-divider
            class="ma-2"
            color="#00a1cd"
            >
          </v-divider>
          <SubVoiceMsgAudioPlayer
            v-for="(config, key, index) in msgInstructConfig" :key="index"
            :radioConfig="msgInstructIntervalSettings"
            :groupHeader="msgInstructGroupHeader"
            :groupDescription="msgInstructRadioDescription"
            :radioHeader="msgInstructRadioHeader"
            :uploadIcon="uploadIcon"
            :audioFile="config.source"
            :audioType="config.audioType"
            :fileName="config.fileName"
          />
          <v-divider
            class="ma-2"
            color="#f2f4f4"
            >
          </v-divider>
        </v-card>
        <v-card class="pa-2 my-2">
          <h2 class="pg-subheader ma-2">Message Type: Praise</h2>
          <v-divider
            class="ma-2"
            color="#00a1cd"
            >
          </v-divider>
          <SubVoiceMsgAudioPlayer
            v-for="(config, key, index) in msgInstructConfig" :key="index"
            :radioConfig="msgInstructIntervalSettings"
            :groupHeader="msgInstructGroupHeader"
            :groupDescription="msgInstructRadioDescription"
            :radioHeader="msgInstructRadioHeader"
            :uploadIcon="uploadIcon"
            :audioFile="config.source"
            :audioType="config.audioType"
            :fileName="config.fileName"
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
      msgReminderIntervalSettings: [
        { label: '20', value: 20 },
        { label: '40', value: 40 },
        { label: '60', value: 60 },
        { label: 'Never', value: 'Never' }
      ],
      msgReminderGroupHeader: 'Blue light flashing interval options',
      msgReminderRadioDescription: 'Time betweeen drink reminders - (Blue light flashing)',
      msgReminderRadioHeader: 'Please select an option from the following:',
      messages: ['msg1', 'msg2', 'msg3'],
      uploadIcon: 'cloud_upload',
      msgReminderConfig: [
        {
          source: '../../../public/audio/mp3/mpfile.mp3', audioType: 'audio/mpeg', audioRef: 'audio', fileName: 'msg_001'
        },
        {
          source: '../../../public/audio/mp3/mpfile.mp3', audioType: 'audio/mpeg', audioRef: 'audio', fileName: 'msg_002'
        },
        {
          source: '../../../public/audio/mp3/mpfile.mp3', audioType: 'audio/mpeg', audioRef: 'audio', fileName: 'msg_003'
        }
      ],
      msgInstructIntervalSettings: [
        { label: '20', value: 20 },
        { label: '40', value: 40 },
        { label: '60', value: 60 },
        { label: 'Never', value: 'Never' }
      ],
      msgInstructGroupHeader: 'Blue light flashing interval options',
      msgInstructRadioDescription: 'Time betweeen drink reminders - (Blue light flashing)',
      msgInstructRadioHeader: 'Please select an option from the following:',
      messages: ['msg1', 'msg2', 'msg3'],
      msgInstructConfig: [
        {
          source: '../../../public/audio/mp3/mpfile.mp3', audioType: 'audio/mpeg', audioRef: 'audio', fileName: 'msg_001'
        },
        {
          source: '../../../public/audio/mp3/mpfile.mp3', audioType: 'audio/mpeg', audioRef: 'audio', fileName: 'msg_002'
        },
        {
          source: '../../../public/audio/mp3/mpfile.mp3', audioType: 'audio/mpeg', audioRef: 'audio', fileName: 'msg_003'
        }
      ],
      msgInstructIntervalSettings: [
        { label: '20', value: 20 },
        { label: '40', value: 40 },
        { label: '60', value: 60 },
        { label: 'Never', value: 'Never' }
      ],
      msgInstructGroupHeader: 'Blue light flashing interval options',
      msgInstructRadioDescription: 'Time betweeen drink reminders - (Blue light flashing)',
      msgInstructRadioHeader: 'Please select an option from the following:',
      messages: ['msg1', 'msg2', 'msg3'],
      msgInstructConfig: [
        {
          source: '../../../public/audio/mp3/mpfile.mp3', audioType: 'audio/mpeg', audioRef: 'audio', fileName: 'msg_001'
        },
        {
          source: '../../../public/audio/mp3/mpfile.mp3', audioType: 'audio/mpeg', audioRef: 'audio', fileName: 'msg_002'
        },
        {
          source: '../../../public/audio/mp3/mpfile.mp3', audioType: 'audio/mpeg', audioRef: 'audio', fileName: 'msg_003'
        }
      ],
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
