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
        <v-card class="pa-2 my-3">
          <h2 class="ma-2 pg-subheader text-primary">Message Type: Reminders</h2>
          <v-divider class="ma-2" color="#00a1cd">
          </v-divider>
          <SubVoiceMsgAudioPlayer
            v-for="voiceMessage in reminders"
            :radioConfig="msgReminderIntervalSettings"
            :groupDescription="msgReminderRadioDescription"
            :radioHeader="msgRadioHeader"
            :uploadIcon="uploadIcon"
            :audioFile="voiceMessage.audioFile"
            :fileName="voiceMessage.voiceMessagedescription"
          />
        </v-card>
        <v-card class="pa-2 my-3">
          <h2 class="ma-2 pg-subheader text-primary">Message Type: Praises</h2>
          <v-divider class="ma-2" color="#00a1cd">
          </v-divider>
          <SubVoiceMsgAudioPlayer
            v-for="voiceMessage in praises"
            :radioConfig="msgPraiseIntervalSettings"
            :groupDescription="msgPraiseRadioDescription"
            :radioHeader="msgRadioHeader"
            :uploadIcon="uploadIcon"
            :audioFile="voiceMessage.audioFile"
            :fileName="voiceMessage.voiceMessagedescription"
          />
        </v-card>
        <v-card class="pa-2 my-3">
          <h2 class="ma-2 pg-subheader text-primary">Message Type: Instruct</h2>
          <v-divider class="ma-2" color="#00a1cd">
          </v-divider>
          <SubVoiceMsgAudioPlayer
            v-for="voiceMessage in instructs"
            :radioConfig="msgInstructIntervalSettings"
            :groupDescription="msgInstructRadioDescription"
            :radioHeader="msgRadioHeader"
            :uploadIcon="uploadIcon"
            :audioFile="voiceMessage.audioFile"
            :fileName="voiceMessage.voiceMessagedescription"
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
import { isPending } from 'q';

export default {
  name: 'VoiceMessageViewComponent',
  components: {
    selectComponent,
    SubVoiceMsgAudioPlayer
  },
  data() {
    return {
      reminders: [],
      praises: [],
      instructs: [],
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
      msgReminderIntervalSettings: [
        { label: '20', value: 20 },
        { label: '40', value: 40 },
        { label: '60', value: 60 },
        { label: 'Never', value: 'Never' }
      ],
      msgPraiseIntervalSettings: [
        { label: '20', value: 20 },
        { label: '40', value: 40 },
        { label: '60', value: 60 },
        { label: 'Never', value: 'Never' }
      ],
      msgInstructIntervalSettings: [
        { label: '20', value: 20 },
        { label: 'Never', value: 'Never' }
      ],
      msgReminderRadioDescription: 'Time betweeen drink reminders - (Blue light flashing)',
      msgPraiseRadioDescription: 'Time betweeen drink praises - (Blue light flashing)',
      msgInstructRadioDescription: 'Time between drink instructions - (Blue light flashing)',
      msgRadioHeader: 'Time interval in minutes:',
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
    setTypes () {
      for (let i = 0; i < this.apiData.length; i++) {
        let voiceMessageType = this.apiData[i].voiceMessagedescription
        let voiceMessage = this.apiData[i]
        voiceMessageType.includes('Reminder') 
          ? this.reminders.push(voiceMessage) :
        voiceMessageType.includes('Praise') 
          ? this.praises.push(voiceMessage) :
        voiceMessageType.includes('Instruct')
          ? this.instructs.push(voiceMessage) : ''
      }
    },
    getSelectedUser (user) {
      let arr = apiLib.getData(this.cliadminReadUrl + user, true).then(response => {
        this.apiData = response
      })
    },
    async getvoiceMessage () {
      if(this.userLevel.find(level => level === 'CLIENT ADMINISTRATOR')) {
        let userData = apiLib.getData('cliadmin/users', true).then(response => {
          this.users = response
         })
      }
      if (this.userLevel.find(level => level === 'SYSTEM ADMINISTRATOR')) {
        await this.$store.dispatch('fetchVoiceMessagesDefaultsGet')
        if (this.$store.state.voiceMessages.voiceMessagesDefaultsGet) {
          let voiceMessageDefaultStore = await this.$store.state.voiceMessages.voiceMessagesDefaultsGet
          for (let i = 0; i < voiceMessageDefaultStore.length; i++) {
            for (let j = 0; j < voiceMessageDefaultStore[i].length; j++) {
              this.apiData.push(voiceMessageDefaultStore[i][j])
            }
          }
        }
      }
      this.setTypes()
    }
  },
  mounted () {
    this.getvoiceMessage()
  },
  beforeRouteLeave (to, from, next) {
    const answer = window.confirm(
      'Do you really want to leave? You will loose all unsaved changes!'
    )
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
