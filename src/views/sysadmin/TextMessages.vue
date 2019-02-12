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

import baseTab from '@/components/base/BaseTabbedSelectorComponent.vue'
import { crudOperations } from '@/mixins/CRUD'
import { getData, postData } from '@/mixins/apiRequests'

export default {
  components: {
    baseTab
  },
  mixins: [crudOperations, getData, postData],
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
      startData: [],
      // startData: [
      //   { name: 'Dehydrated', subject: 'Dehydrated', text: 'User is Dehydrated!' },
      //   { name: 'Still Dehydrated', subject: 'Still Dehydrated', text: 'User is still Dehydrated!' },
      //   { name: 'Rehydrated', subject: 'Rehydrated', text: 'User is Rehydrated' },
      //   { name: 'Battery', subject: 'Battery', text: 'Ohnoo the battery' },
      //   { name: 'Base Unit Offline', subject: 'Base unit offline', text: 'Base unit offline .... ' },
      //   { name: 'No Drink', subject: 'No drink', text: 'No drink :(' }
      // ],
      readUrl: 'textmessageget'
    }
  },
  methods: {
    async getMessages (url) {
      var items = await this.getItems(url)
      return items
    }
  },
  mounted () {
    this.startData = this.getMessages(this.readUrl)
    console.log(this.startData)
  },
  beforeRouteLeave (to, from, next) {
    const answer = window.confirm('Do you really want to leave? You will lose all unsaved changes!')
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
