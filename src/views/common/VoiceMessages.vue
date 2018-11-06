<template lang="html">
  <v-container>
    <!-- <selectComponent></selectComponent> -->
    <SubVoiceMsgAudioPlayer
      :radioConfig="drinkIntervalSettings"
      :groupHeader="drinkGroupHeader"
      :groupDescription="drinkRadioDescription"
      :radioHeader="drinkRadioHeader"
      :uploadIcon="uploadIcon"
      :fileType="fileType"
      :fileName="fileName"
    />
  </v-container>
</template>

<script>
// import selectComponent from '../../components/base/BaseUserSelectComponent.vue'
import SubVoiceMsgAudioPlayer from '@/components/sub/SubVoiceMsgAudioPlayer.vue'
export default {
name: 'VoiceMessageViewComponent',
  components: {
    // selectComponent,
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
      uploadIcon: 'close',
      fileName: 'fielname.mp3',
      fileType: 'message'
    }
  },
  props: {

  }
}
</script>

<style lang="css">
</style>
