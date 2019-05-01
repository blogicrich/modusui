<template lang="html">
  <v-container>
    <BaseViewHeader
      :headerIcon="headerIcon"
      :iconColor="iconColor"
      :headerText="headerText"
      hasDivider
    />
    <baseTab
      class="mx-4"
      v-if="items"
      :items="items"
      :loading="loading"
      :loaded="loaded"
      :error="error"
      :errorMsg="errorMsg"
      :loadingMsg="loadingMsg"
      :loadedMsg="loadedMsg"
      :btns="btns"
      dialogTitle= "You are about to lose unsaved data."
      dialogText= "Do you wish to proceed?"
      cardEmailHeader= "Email Message Template"
      cardSmsHeader= "SMS Message Template"
      @itemsEdited="edittedItems(...arguments)"
      @itemsCancelled="refreshItems"
    ></baseTab>
  </v-container>
</template>

<script>

import baseTab from '@/components/base/BaseTabbedSelectorComponent.vue'
import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import apiLib from '@/services/apiLib'

export default {
  name: 'TextMessages',
  components: {
    baseTab
  },
  mixins: [crudRoutines],
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'message',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Text / SMS Messages',
      btns: false,
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
  methods: {
    edittedItems (data, item) {
      apiLib.updateData(this.updateUrl + '/' + this.items[item].alertMessagesId, data, true, true)
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
