<template lang="html">
  <v-container>
    <v-layout row align-center fill-height>
      <v-icon v-if="apiData.length > 0" large color="primary">settings</v-icon>
      <h1 v-if="apiData.length > 0" class="pg-header">eDroplet Administration</h1>
      <v-spacer></v-spacer>
      <selectComponent
        v-if="userPerms"
        :users="users"
        :selectAll="selectAll"
        :searchName="searchName"
        :multiple="multiple"
        @get-selected-user="getSelectedUser"
      ></selectComponent>
    </v-layout>
    <v-layout v-if="apiData.length > 0">
      <v-flex xs12>
        <v-layout row align-start justify-space-between>
          <h1 class="pg-header ma-2">Voice Messages</h1>
          <v-spacer></v-spacer>
          <selectComponent
            :users="users"
            :selectAll="selectAll"
            :searchName="searchName"
            :multiple="multiple"
            @get-selected-user="getSelectedUser"
          ></selectComponent>
        </v-layout>
        <v-card class="pa-2 my-3" v-for="config in apiData" :key="'msgRem' + config.voiceMessagesId">
          <h2 class="ma-2 pg-subheader text-primary">Message Type: {{ config.voiceMessagedescription }}</h2>
          <v-divider class="ma-2" color="#00a1cd">
          </v-divider>
          <SubVoiceMsgAudioPlayer
            :radioConfig="msgReminderIntervalSettings"
            :groupHeader="msgReminderGroupHeader"
            :groupDescription="msgReminderRadioDescription"
            :radioHeader="msgReminderRadioHeader"
            :uploadIcon="uploadIcon"
            :audioFile="'https://s1.vocaroo.com/media/download_temp/Vocaroo_s1pex2ARQm9Y.mp3'"
            :fileName="config.voiceMessagedescription"
          />
        </v-card>
        <!-- <v-card class="pa-2 my-3">
          <h2 class="pg-subheader text-primary ma-2">Message Type: {{ msgInstructGroupHeader }}</h2>
          <v-divider
            class="ma-2"
            color="#00a1cd"
            >
          </v-divider>
          <SubVoiceMsgAudioPlayer
            v-for="config in apiData" :key="'msgRem' + config.voiceMessagesId"
            :radioConfig="msgReminderIntervalSettings"
            :groupHeader="msgReminderGroupHeader"
            :groupDescription="msgReminderRadioDescription"
            :radioHeader="msgReminderRadioHeader"
            :uploadIcon="uploadIcon"
            :audioFile="config.audioFile"
            :fileName="config.voiceMessagedescription"
          />
        </v-card>
        <v-card class="pa-2 my-2">
          <h2 class="pg-subheader text-primary ma-2">Message Type: {{ msgPraiseGroupHeader }}</h2>
          <v-divider
            class="ma-2"
            color="#00a1cd"
            >
          </v-divider>
          <SubVoiceMsgAudioPlayer
            v-for="config in apiData" :key="'msgRem' + config.voiceMessagesId"
            :radioConfig="msgReminderIntervalSettings"
            :groupHeader="msgReminderGroupHeader"
            :groupDescription="msgReminderRadioDescription"
            :radioHeader="msgReminderRadioHeader"
            :uploadIcon="uploadIcon"
            :audioFile="config.audioFile"
            :fileName="config.voiceMessagedescription"
          />
        </v-card> -->
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
  data() {
    return {
      multiple: false,
      selectAll: 'Select all',
      searchName: 'Search user..',
      apiData: [],
      editedItems: [],
      users: [],
      userLevel: JSON.parse(localStorage.getItem('auth')).level,
      sysadminReadUrl: 'sysadmin/voice-messages',
      sysadminWriteUrl: 'sysadmin/voice-message',
      cliadminReadUrl: 'cliadmin/voicemessage/',
      cliadminWriteUrl: 'cliadmin/voicemessage/',
      newDefaultValue: false,
      multiple: false,
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
      msgReminderGroupHeader: 'Reminders',
      msgReminderRadioDescription:
        'Time betweeen drink reminders - (Blue light flashing)',
      msgReminderRadioHeader: 'Time interval in minutes:',
      msgReminderConfig: [
        {
          source: 'http://www.noiseaddicts.com/samples_1w72b820/290.mp3',
          fileName: 'msg_003'
        }
      ],
      // // Messages instructions
      //   msgInstructIntervalSettings: [
      //     { label: '20', value: 20 },
      //     { label: '40', value: 40 },
      //     { label: '60', value: 60 },
      //     { label: 'Never', value: 'Never' }
      //   ],
      //   msgInstructGroupHeader: 'Instructions',
      //   msgInstructRadioDescription:
      //     'Time between drink reminders - (Blue light flashing)',
      //   msgInstructRadioHeader: 'Please select an option from the following:',
      //   msgInstructConfig: [
      //     {
      //       source: 'http://www.noiseaddicts.com/samples_1w72b820/290.mp3',
      //       audioType: 'audio/mpeg',
      //       audioRef: 'audio',
      //       fileName: 'msg_001'
      //     },
      //     {
      //       source: 'http://www.noiseaddicts.com/samples_1w72b820/290.mp3',
      //       audioType: 'audio/mpeg',
      //       audioRef: 'audio',
      //       fileName: 'msg_002'
      //     },
      //     {
      //       source: 'http://www.noiseaddicts.com/samples_1w72b820/290.mp3',
      //       audioType: 'audio/mpeg',
      //       audioRef: 'audio',
      //       fileName: 'msg_003'
      //     }
      //   ],
      // // Messages praise
      //   msgPraiseIntervalSettings: [
      //     { label: '20', value: 20 },
      //     { label: '40', value: 40 },
      //     { label: '60', value: 60 },
      //     { label: 'Never', value: 'Never' }
      //   ],
      //   msgPraiseGroupHeader: 'Praise',
      //   msgPraiseRadioDescription:
      //     'Time betweeen drink reminders - (Blue light flashing)',
      //   msgPraiseRadioHeader: 'Please select an option from the following:',
      //   msgPraiseConfig: [
      //     {
      //       source: 'http://www.noiseaddicts.com/samples_1w72b820/290.mp3',
      //       audioType: 'audio/mpeg',
      //       audioRef: 'audio',
      //       fileName: 'msg_001'
      //     },
      //     {
      //       source: 'http://www.noiseaddicts.com/samples_1w72b820/290.mp3',
      //       audioType: 'audio/mpeg',
      //       audioRef: 'audio',
      //       fileName: 'msg_002'
      //     },
      //     {
      //       source: 'http://www.noiseaddicts.com/samples_1w72b820/290.mp3',
      //       audioType: 'audio/mpeg',
      //       audioRef: 'audio',
      //       fileName: 'msg_003'
      //     }
      //   ],
    }
  },
  computed: {
    userPerms () {
      if (this.userLevel.find(level => level === 'CLIENT ADMINISTRATOR')) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    getSelectedUser (user) {
      let arr = apiLib.getData(this.cliadminReadUrl + user, true).then(response => {
        this.apiData = response
      })
      // this.user = user.userId
      // let vals = apiLib.getData('cliadmin/')
      console.log("USEEEERRRRRRRRRRRRRRRR: ", user)
      // this.getItems(this.readUrl)
    },
    async getvoiceMessage () {
      if(this.userLevel.find(level => level === 'CLIENT ADMINISTRATOR')) {
        let userData = apiLib.getData('cliadmin/users', true).then(response => {
          this.users = response
          console.log('USERS: ', response)
         })
      }
      if (this.userLevel.find(level => level === 'SYSTEM ADMINISTRATOR')) {
        await this.$store.dispatch('fetchVoiceMessagesDefaultsGet')
        if (this.$store.state.voiceMessages.voiceMessagesDefaultsGet) {
          let voiceMessageDefaultStore = this.$store.state.voiceMessages
            .voiceMessagesDefaultsGet
          for (let index = 0; index < voiceMessageDefaultStore.length; index++) {
            const element = voiceMessageDefaultStore[index]
            for (let j = 0; j < element.length; j++) {
              const el = element[j]
              this.apiData.push(el)
            }
          }
        }
      }
      console.log(this.apiData, 'apiData')
    }
  },
  mounted () {
    this.getvoiceMessage()
  },
  beforeRouteLeave (to, from, next) {
    // const answer = window.confirm(
    //   'Do you really want to leave? You will loose all unsaved changes!'
    // )
    // if (answer) {
    //   next()
    // } else {
    //   next(false)
    // }
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
