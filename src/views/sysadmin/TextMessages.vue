<template lang="html">
  <baseTab
    :changedData= "changedData"
    :startData= "startData"
    dialogTitle= "You are about to lose unsaved data."
    dialogText= "Do you wish to proceed?"
    cardEmailHeader= "Email Message Template"
    cardSmsHeader= "SMS Message Template"
  ></baseTab>
</template>

<script>
import baseTab from '../../components/base/BaseTabbedSelectorComponent.vue'
export default {
  components: {
    baseTab
  },
  data () {
    return {
      changedData: [
        { name: 'Dehydrated', subject: 'Dehydrated', text: 'User is Dehydrated!' },
        { name: 'Still Dehydrated', subject: 'Still Dehydrated', text: 'User is still Dehydrated!' },
        { name: 'Rehydrated', subject: 'Rehydrated', text: 'User is Rehydrated' },
        { name: 'Battery', subject: 'Battery', text: 'Ohnoo the battery' },
        { name: 'Base Unit Offline', subject: 'Base unit offline', text: 'Base unit offline .... ' },
        { name: 'No Drink', subject: 'No drink', text: 'No drink :(' }
      ],
      startData: [
        { name: 'Dehydrated', subject: 'Dehydrated', text: 'User is Dehydrated!' },
        { name: 'Still Dehydrated', subject: 'Still Dehydrated', text: 'User is still Dehydrated!' },
        { name: 'Rehydrated', subject: 'Rehydrated', text: 'User is Rehydrated' },
        { name: 'Battery', subject: 'Battery', text: 'Ohnoo the battery' },
        { name: 'Base Unit Offline', subject: 'Base unit offline', text: 'Base unit offline .... ' },
        { name: 'No Drink', subject: 'No drink', text: 'No drink :(' }
      ]
    }
  }
}
</script>

<style lang="css">
</style>
