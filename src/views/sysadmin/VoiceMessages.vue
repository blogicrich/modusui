<template>
  <v-container>
    <v-layout row align-center fill-height expand>
      <BaseViewHeader
        :headerIcon="headerIcon"
        :iconColor="iconColor"
        :headerText="headerText"
      />
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
            :uploadIcon="uploadIcon"
          />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import apiLib from '@/services/apiLib'
import SubVoiceMsgAudioPlayer from '@/components/sub/SubVoiceMsgAudioPlayer.vue'

export default {
  name: 'VoiceMessageViewComponent',
  components: {
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
      sysadminReadUrl: 'sysadmin/voice-messages',
      uploadIcon: 'cloud_upload'
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
        apiLib.getData(this.cliadminReadUrl, true, true).then(response => {
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
        console.log('api data: ', this.apiData)
      }
      // this.setTypes()
    }
  },
  mounted () {
    this.$store.dispatch('fetchVoiceMessagesDefaults')
    this.getvoiceMessage()
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
