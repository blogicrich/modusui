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
      :items= "items"
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
      @newItem="addItem"
      @itemsEdited="editItems"
      @deleteSelected="deleteItem"
      @itemsCancelled="refreshItems"
    ></baseTab>
    <v-snackbar
      v-model="snack"
      bottom
      :timeout="timeout"
      :color="snackColor"
    >
      {{ snackText }}
      <v-btn flat @click="snack = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>

import baseTab from '@/components/base/BaseTabbedSelectorComponent.vue'
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
      snackColor: 'primary',
      snackText: '',
      snack: false,
      timeout: 6000,
      loading: true,
      loaded: false,
      error: false,
      errorMsg: ' ',
      loadingMsg: ' ',
      loadedMsg: ' ',
      updateUrl: 'sysadmin/test-messages',
      readUrl: 'sysadmin/test-messages',
      defaultItem: [
        { alertMessagesId: 0, alertNo: 0, alertTypeDescription: 0, alertTypeId: '', communicationMethodId: '', communicationType: '', description: '', message: '', status: '', subject: '' }
      ]
    }
  },
  created () {
    this.getData(this.readUrl).then(data => {
      this.items = data
      console.log(data)
      console.log('Items: ', this.items)
    })
      .catch(err => console.log(err))
      .finally(() => {
      // ROUTER TO STD PAGE IF ERR?
      })
  },
  beforeRouteLeave (to, from, next) {
    const answer = window.confirm('Do you really want to leave? You will loose all unsaved changes!')
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
