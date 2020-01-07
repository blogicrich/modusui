<template>
  <v-container>
    <v-layout row align-center fill-height expand>
      <BaseViewHeader
        :headerIcon="headerIcon"
        :iconColor="iconColor"
        :headerText="headerText"
      />
        <!-- <v-spacer></v-spacer> -->
        <!-- <selectComponent
          v-if="user.find(level => level === 'CLIENT ADMINISTRATOR')"
          slot="search"
          :users="users"
          :selectAll="selectAll"
          :searchName="searchName"
          :multiple="multiple"
          @get-selected-user="getSelectedUser"
        ></selectComponent> -->
    </v-layout>
    <v-layout v-if="apiData">
      <v-flex xs12>
        <v-card class="pa-2 my-3">
          <h2 class="ma-2 pg-subheader text-primary">Message Type: Reminders</h2>
          <p class="ma-2"> {{ msgReminderRadioDescription }}</p>
          <v-divider class="ma-2" color="#00a1cd">
          </v-divider>
          <SubVoiceMsgAudioPlayer
            v-for="voiceMessage in reminders"
            :data="voiceMessage"
            :key="voiceMessage.voiceMessagesId"
            :radioConfig="msgReminderIntervalSettings"
            :uploadIcon="uploadIcon"
          />
        </v-card>
        <v-card class="pa-2 my-3">
          <h2 class="ma-2 pg-subheader text-primary">Message Type: Praises</h2>
          <p class="ma-2"> {{ msgPraiseRadioDescription }}</p>
          <v-divider class="ma-2" color="#00a1cd">
          </v-divider>
          <SubVoiceMsgAudioPlayer
            v-for="voiceMessage in praises"
            :data="voiceMessage"
            :key="voiceMessage.voiceMessagesId"
            :radioConfig="msgPraiseIntervalSettings"
            :uploadIcon="uploadIcon"
          />
        </v-card>
        <v-card class="pa-2 my-3">
          <h2 class="ma-2 pg-subheader text-primary">Message Type: Instruct</h2>
          <p class="ma-2"> {{ msgInstructRadioDescription }}</p>
          <v-divider class="ma-2" color="#00a1cd">
          </v-divider>
          <SubVoiceMsgAudioPlayer
            v-for="voiceMessage in instructs"
            :data="voiceMessage"
            :key="voiceMessage.voiceMessagesId"
            :radioConfig="msgInstructIntervalSettings"
            :uploadIcon="uploadIcon"
          />
        </v-card>
      </v-flex>
    </v-layout>
    <!-- <v-layout row align-center fill-height v-else> -->
      <!-- <v-alert :value="true" type="error" >No data found.</v-alert> -->
    <!-- </v-layout> -->
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
  computed: {
    user: function () {
      return this.$store.getters.level
    },
    apiData: function () {
      return this.$store.state.voiceMessages.voiceMessagesDefaults
    }
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'record_voice_over',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Voice Message Management',
      reminders: [],
      praises: [],
      instructs: [],
      multiple: false,
      selectAll: 'Select all',
      searchName: 'Search user..',
      editedItems: [],
      users: [],
      // user: JSON.parse(localStorage.getItem('auth')).level,
      sysadminReadUrl: 'sysadmin/voice-messages',
      sysadminWriteUrl: 'sysadmin/voice-message',
      cliadminReadUrl: 'cliadmin/voicemessage/',
      cliadminWriteUrl: 'cliadmin/voicemessage/',
      newDefaultValue: false,
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
      msgReminderRadioDescription: 'Time between drink reminders - (Blue light flashing)',
      msgPraiseRadioDescription: 'Time between drink praises - (Blue light flashing)',
      msgInstructRadioDescription: 'Time between drink instructions - (Blue light flashing)',
      msgRadioHeader: 'Time interval in minutes:'
    }
  },
  methods: {
    setTypes () {
      for (let i = 0; i < this.apiData.length; i++) {
        let voiceMessageType = this.apiData[i].voiceMessagedescription
        let voiceMessage = this.apiData[i]
        if (voiceMessageType.includes('Reminder')) {
          this.reminders.push(voiceMessage)
        } else if (voiceMessageType.includes('Praise')) {
          this.praises.push(voiceMessage)
        } else if (voiceMessageType.includes('Instruct')) {
          this.instructs.push(voiceMessage)
        }
      }
    },
    getSelectedUser (user) {
      apiLib.getData(this.cliadminReadUrl + user, true, true).then(response => {
        this.apiData = response
      })
    },
    async getvoiceMessage () {
      if (this.user.find(level => level === 'CLIENT ADMINISTRATOR')) {
        apiLib.getData('cliadmin/users', true, true).then(response => {
          this.users = response
        })
      }
      if (this.user.find(level => level === 'SYSTEM ADMINISTRATOR')) {
        await this.$store.dispatch('fetchVoiceMessagesDefaults')
        // console.log('voice defaults: ', this.$store.state.voiceMessages.voiceMessagesDefaults)
        this.setTypes()
        // if (this.$store.state.voiceMessages.voiceMessagesDefaults) {
          // let voiceMessageDefaultStore = this.$store.state.voiceMessages.voiceMessagesDefaults
          // for (let i = 0; i < voiceMessageDefaultStore.length; i++) {
            // for (let j = 0; j < voiceMessageDefaultStore[i].length; j++) {
              // this.apiData.push(voiceMessageDefaultStore[i])
            // }
          // }
        // }
        // console.log('api data: ', this.apiData)
      }
      // this.setTypes()
    }
  },
  mounted () {
    this.$store.dispatch('fetchVoiceMessagesDefaults')
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
