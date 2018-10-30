<template>
  <v-container fluid>
    <BaseRadioOptions
      :radioConfig="radioConfig"
      :groupHeader="groupHeader"
      :groupDescription="groupDescription"
      :radioHeader="radioHeader"
    />
  </v-container>
</template>

<script>
import BaseRadioOptions from '@/components/base/BaseRadioOptionsSelectComponent.vue'
export default {
  name: 'IntervalOptions',
  components: {
    BaseRadioOptions
  },
  data () {
    return {
      radioConfig: [
        { label: 'Radio-1', value: '1' },
        { label: 'Radio-2', value: '2' },
        { label: 'Radio-3', value: '3' },
        { label: 'Radio-4', value: '4' }
      ],
      groupHeader: 'Blue light flashing interval options',
      groupDescription: 'Time betweeen drink reminders - (Blue light flashing)',
      radioHeader: 'Please select an option from the following:'
    }
  },
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
