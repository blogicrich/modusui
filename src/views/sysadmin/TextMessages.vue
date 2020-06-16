<template lang="html">
  <v-container v-if="!messagesLoading" fluid>
    <BaseViewHeader
      :headerIcon="headerIcon"
      :iconColor="iconColor"
      :headerText="headerText"
      hasDivider
    />
    <v-layout class="mx-4 mb-2" row align-center>
    <v-toolbar v-if="!messagesLoading" color="primary darken-1" dark>
      <v-toolbar-title v-if="$vuetify.breakpoint.smAndUp">Edit sms and Email Messages</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- SELECT MESSAGE ALERT TYPE -->
      <v-menu :nudge-width="100">
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on">
            <span>Alert Type</span>
            <v-icon dark>arrow_drop_down</v-icon>
          </v-toolbar-title>
        </template>

        <v-list>
          <v-list-tile
            v-for="alert in alertTypes"
            :key="alert"
            @click="$store.commit('UPDATE_SELECTED_MESSAGE_ALERT_TYPE', alert)"
          >
            <v-list-tile-title v-text="alert"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <!-- SELECT MESSAGE TYPE -->
      <v-menu :nudge-width="100" v-if="getterMenuItems">
        <template v-slot:activator="{ on }">
  <v-toolbar-title v-on="on">
    <span>Message Type</span>
    <v-icon dark>arrow_drop_down</v-icon>
  </v-toolbar-title>
</template>

        <v-list>
          <v-list-tile
            v-for="item in getterMenuItems"
            :key="item.alertTypeid"
            @click="$store.commit('UPDATE_SELECTED_COMMUNICATION_TYPE', item)"
          >
            <v-list-tile-title v-text="message.alertTypeDescription"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <!-- TOOLBAR BUTTONS -->
      <v-btn :disabled="isPristine" icon @click="save">
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn :disabled="isPristine" icon @click="$store.commit('RESET_SELECTED_MESSAGE', selectedMessage.alertMessagesId)">
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-toolbar>
    </v-layout>
    <v-card class="mx-4" v-if="messages">
      <v-form ref="smsEmailMessages">
        <v-card-title class="text-primary title">{{ selectedMessage.alertTypeDescription }}</v-card-title>
        <v-card-text>
          <v-text-field
            label="Subject"
            :value="getterSelectedSubject"
            color="primaryColor"
            outline
            required
            validate-on-blur
            @input="$store.commit('UPDATE_SELECTED_SUBJECT', { id: selectedMessage.alertMessagesId, value: $event })"
          >
          </v-text-field>
          <v-textarea
            outline
            name="input-7-4"
            label="Message"
            :value="getterSelectedMessage"
            @input="$store.commit('UPDATE_SELECTED_MESSAGE', { id: selectedMessage.alertMessagesId, value: $event })"
          >
          </v-textarea>
        </v-card-text>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>

import { mapState } from 'vuex'
import validation from '@/mixins/validation'

export default {
  name: 'TextMessages',
  mixins: [validation],
  computed: {
    ...mapState({
      messagesLoading: state => state.smsEmailMessages.messagesLoading,
      messages: state => state.smsEmailMessages.messages,
      messagesClone: state => state.smsEmailMessages.messagesClone,
      selectedMessageType: state => state.smsEmailMessages.selectedMessageType,
      selectedMessage: state => state.smsEmailMessages.selectedMessage
    }),
    getterMenuItems () {
      return this.$store.getters.getterMenuItems
    },
    getterSelectedMessage () {
      return this.$store.getters.getterSelectedMessage
    },
    getterSelectedSubject () {
      return this.$store.getters.getterSelectedSubject
    },
    isPristine () {
      return (
        this.messagesClone[this.selectedMessage.alertMessagesId].message === this.selectedMessage.message ||
        this.messagesClone[this.selectedMessage.alertMessagesId].subject === this.selectedMessage.subject
      )
    }
  },
  data () {
    return {
      headerIcon: 'message',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Text / SMS Messages',
      alertTypes: ['SMS', 'Email']
    }
  },
  methods: {
    save () {
      Object.keys(this.messages).forEach(key => {
        if (this.validateMaxChars(this.messages[key].subject, 4) || this.validateMaxChars(this.messages[key].message, 4)) {
          console.log('FALSE -- ', this.validateMaxChars(this.messages[key].subject, 4), this.validateMaxChars(this.messages[key].message, 4), this.messages[key])
        } else {
          return false
        }
      })
      // TBI
      // validate
      // commit to store
    }
  },
  created () {
    this.$store.dispatch('fetchMessages')
  },
  beforeRouteLeave (to, from, next) {
    if (!this.isPristine && !window.confirm('Do you really want to leave? You will lose all unsaved changes!')) {
      return next(false)
    }
    next()
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
