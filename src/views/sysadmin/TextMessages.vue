<template lang="html">
  <v-container fluid ma-0 pa-0>
    <h2 class="pg-subheader text-primary">eDroplet Administration - Reminder Messages</h2>
    <v-divider
      class="mx-1 mb-3"
      color="#00a1cd"
      >
    </v-divider>
    <baseTab
      v-if="items"
      :items="items"
      :loading="loading"
      :loaded="loaded"
      :error="error"
      :errorMsg="errorMsg"
      :loadingMsg="loadingMsg"
      :loadedMsg="loadedMsg"
      dialogTitle= "You are about to lose unsaved data."
      dialogText= "Do you wish to proceed?"
      cardEmailHeader= "Email Message Template"
      cardSmsHeader= "SMS Message Template"
      @itemsEdited="editItems"
      @itemsCancelled="refreshItems"
    ></baseTab>
  </v-container>
</template>

<script>

import baseTab from '@/components/base/BaseTabbedSelectorComponent.vue'
import apiLib from '@/services/apiLib.js'
import { crudRoutines } from '@/mixins/dataTableCRUD.js'

export default {
  name: 'TextMessages',
  components: {
    baseTab
  },
  mixins: [crudRoutines],
  data () {
    return {
      items: [],
      crudIdKey: 'alertMessagesId',
      infoMsgColor: 'primary',
      loading: true,
      loaded: false,
      error: false,
      errorMsg: ' ',
      loadingMsg: ' ',
      loadedMsg: ' ',
      updateUrl: 'sysadmin/text-messages',
      readUrl: 'sysadmin/text-messages',
      defaultItem: [
        { alertMessagesId: 0, alertTypeDescription: 0, alertTypeId: '', communicationTypeDescription: '', communicationType: '', message: '', status: '', subject: '' }
      ]
    }
  },
  mounted () {
    this.getItems(this.readUrl)
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
