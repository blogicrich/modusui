<template lang="html">
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-layout row align-start justify-space-between>
          <h1 class="pg-header ma-2">Voice Messages</h1>
          <v-spacer></v-spacer>
          <selectComponent
            :users="users"
            :selectAll="selectAll"
            :searchName="searchName"
            :multiple="multiple"
          ></selectComponent>
        </v-layout>
        <v-card class="pa-2 my-3">
          <h2 class="ma-2 pg-subheader text-primary">{{ msgReminderGroupHeader}}</h2>
          <v-divider
            class="ma-2"
            color="#00a1cd"
            >
          </v-divider>
          <SubVoiceMsgAudioPlayer
            v-for="(config, key, index) in msgReminderConfig" :key="'msgRem' + config.fileName"
            :radioConfig="msgReminderIntervalSettings"
            :groupHeader="msgReminderGroupHeader"
            :groupDescription="msgReminderRadioDescription"
            :radioHeader="msgReminderRadioHeader"
            :uploadIcon="uploadIcon"
            :audioFile="config.source"
            :audioType="config.audioType"
            :fileName="config.fileName"
            :config="config"
          />

        </v-card>
        <v-card class="pa-2 my-3">
          <h2 class="pg-subheader text-primary ma-2">{{ msgInstructGroupHeader }}</h2>
          <v-divider
            class="ma-2"
            color="#00a1cd"
            >
          </v-divider>
          <SubVoiceMsgAudioPlayer
            v-for="(config, key, index) in msgInstructConfig" :key="'msgIns' + '-' + config.fileName"
            :radioConfig="msgInstructIntervalSettings"
            :groupHeader="msgInstructGroupHeader"
            :groupDescription="msgInstructRadioDescription"
            :radioHeader="msgInstructRadioHeader"
            :uploadIcon="uploadIcon"
            :audioFile="config.source"
            :audioType="config.audioType"
            :fileName="config.fileName"
            :config="config"
          />
        </v-card>
        <v-card class="pa-2 my-2">
          <h2 class="pg-subheader text-primary ma-2">{{ msgPraiseGroupHeader }}</h2>
          <v-divider
            class="ma-2"
            color="#00a1cd"
            >
          </v-divider>
          <SubVoiceMsgAudioPlayer
            v-for="(config, key, index) in msgPraiseConfig" :key="'msgPr' + '-' + config.fileName"
            :radioConfig="msgPraiseIntervalSettings"
            :groupHeader="msgPraiseGroupHeader"
            :groupDescription="msgPraiseRadioDescription"
            :radioHeader="msgPraiseRadioHeader"
            :uploadIcon="uploadIcon"
            :audioFile="config.source"
            :audioType="config.audioType"
            :fileName="config.fileName"
            :config="config"
          />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import apiLib from '@/services/apiLib'
import selectComponent from '@/components/base/BaseUserSelectComponent.vue'
import SubVoiceMsgAudioPlayer from '@/components/sub/SubVoiceMsgAudioPlayer.vue'

export default {
  name: 'VoiceMessageViewComponent',
  components: {
    selectComponent,
    SubVoiceMsgAudioPlayer
  },
  mixins: [getData],
  data () {
    return {
      users: [
        { name: 'Elsa' },
        { name: 'Tamara' },
        { name: 'Daniek' },
        { name: 'Mitchell' },
        { name: 'Jasper' },
        { name: 'Bram' },
        { name: 'Kevin' },
        { name: 'Julian' },
        { name: 'Patricia' },
        { name: 'Marcel' },
        { name: 'Fred' },
        { name: 'Joke' },
        { name: 'Kaily' },
        { name: 'Bryan' },
        { name: 'Michelle' },
        { name: 'Lisa' },
        { name: 'Cheyenne' },
        { name: 'Shalina' },
        { name: 'Naomi' },
        { name: 'Leeroy' }
      ],
      multiple: true,
      selectAll: 'Select all',
      searchName: 'Search user..',
      uploadIcon: 'cloud_upload',
      // Messages reminders
      msgReminderIntervalSettings: [
        { label: '20', value: 20 },
        { label: '40', value: 40 },
        { label: '60', value: 60 },
        { label: 'Never', value: 'Never' }
      ],
      msgReminderGroupHeader: 'Message Type: Reminders',
      msgReminderRadioDescription: 'Time betweeen drink reminders - (Blue light flashing)',
      msgReminderRadioHeader: 'Time interval in minutes:',
      msgReminderConfig: [
        { source: 'http://www.noiseaddicts.com/samples_1w72b820/290.mp3', audioType: 'audio/mpeg', audioRef: 'audio', fileName: 'msg_001' },
        { source: 'http://www.noiseaddicts.com/samples_1w72b820/290.mp3', audioType: 'audio/mpeg', audioRef: 'audio', fileName: 'msg_002' },
        { source: 'http://www.noiseaddicts.com/samples_1w72b820/290.mp3', audioType: 'audio/mpeg', audioRef: 'audio', fileName: 'msg_003' }
      ],
      // Messages instructions
      msgInstructIntervalSettings: [
        { label: '20', value: 20 },
        { label: '40', value: 40 },
        { label: '60', value: 60 },
        { label: 'Never', value: 'Never' }
      ],
      msgInstructGroupHeader: 'Message Type: Instructions',
      msgInstructRadioDescription: 'Time betweeen drink reminders - (Blue light flashing)',
      msgInstructRadioHeader: 'Please select an option from the following:',
      msgInstructConfig: [
        { source: 'http://www.noiseaddicts.com/samples_1w72b820/290.mp3', audioType: 'audio/mpeg', audioRef: 'audio', fileName: 'msg_001' },
        { source: 'http://www.noiseaddicts.com/samples_1w72b820/290.mp3', audioType: 'audio/mpeg', audioRef: 'audio', fileName: 'msg_002' },
        { source: 'http://www.noiseaddicts.com/samples_1w72b820/290.mp3', audioType: 'audio/mpeg', audioRef: 'audio', fileName: 'msg_003' }
      ],
      // Messages praise
      msgPraiseIntervalSettings: [
        { label: '20', value: 20 },
        { label: '40', value: 40 },
        { label: '60', value: 60 },
        { label: 'Never', value: 'Never' }
      ],
      msgPraiseGroupHeader: 'Message Type: Praise',
      msgPraiseRadioDescription: 'Time betweeen drink reminders - (Blue light flashing)',
      msgPraiseRadioHeader: 'Please select an option from the following:',
      msgPraiseConfig: [
        { source: 'http://www.noiseaddicts.com/samples_1w72b820/290.mp3', audioType: 'audio/mpeg', audioRef: 'audio', fileName: 'msg_001' },
        { source: 'http://www.noiseaddicts.com/samples_1w72b820/290.mp3', audioType: 'audio/mpeg', audioRef: 'audio', fileName: 'msg_002' },
        { source: 'http://www.noiseaddicts.com/samples_1w72b820/290.mp3', audioType: 'audio/mpeg', audioRef: 'audio', fileName: 'msg_003' }
      ]
    }
  },
  beforeRouteLeave (to, from, next) {
    const answer = window.confirm('Do you really want to leave? You will loose all unsaved changes!')
    if (answer) {
      next()
    } else {
      next(false)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
