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
            v-for="alert in commsTypes"
            :key="alert"
            @click="$store.commit('UPDATE_SELECTED_MESSAGE_COMMS_TYPE', alert)"
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
            v-for="item in getterMenuItems(messageCommsType)"
            :key="item.alertTypeid"
            @click="$store.commit('UPDATE_SELECTED_MESSAGE_ALERT_TYPE', item.alertTypeDescription)"
          >
            <v-list-tile-title v-text="item.alertTypeDescription"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <!-- TOOLBAR BUTTONS -->
      <v-btn
        v-if="$vuetify.breakpoint.xsOnly"
        :disabled="isPristine"
        icon @click="save">
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn
        v-if="$vuetify.breakpoint.smAndDown"
        :disabled="isPristine"
        icon @click="$store.commit('RESET_SELECTED_MESSAGE', selectedMessage.alertMessagesId)"
      >
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-toolbar>
    </v-layout>
    <v-card class="mx-4" v-if="messages">
      <v-form ref="smsEmailMessagesForm">
        <v-card-title class="text-primary title">{{ messageCommsType + ' : ' + messageAlertType }}</v-card-title>
        <v-card-text>
          <v-text-field
            label="Subject"
            :value="getterSelectedSubject(selectedMessage.alertMessagesId)"
            color="primaryColor"
            outline
            :rules="[required, validateMaxChars(getterSelectedSubject, 78)]"
            @input="$store.commit('UPDATE_SELECTED_SUBJECT', { id: selectedMessage.alertMessagesId, value: $event })"
          >
          </v-text-field>
          <v-textarea
            outline
            name="input-7-4"
            label="Message"
            :value="getterSelectedMessage(selectedMessage.alertMessagesId)"
            :rules="[required, validateMaxChars(getterSelectedSubject, 160)]"
            @input="$store.commit('UPDATE_SELECTED_MESSAGE', { id: selectedMessage.alertMessagesId, value: $event })"
          >
          </v-textarea>
        </v-card-text>
      </v-form>
    </v-card>
    <v-layout v-if="!messagesLoading && $vuetify.breakpoint.lgAndUp" row justify-center align-center>
      <v-btn
        :disabled="isPristine"
        class="root-nav-btn mt-3"
        @click="save"
        color="primary"
        large
        >Save
        <v-icon class="ma-1">save</v-icon>
      </v-btn>
      <v-btn
        :disabled="isPristine"
        class="root-nav-btn mt-3"
        @click="$store.commit('RESET_SELECTED_MESSAGE', selectedMessage.alertMessagesId)"
        color="primary"
        large
        >Reset
        <v-icon class="ma-1">refresh</v-icon>
      </v-btn>
    </v-layout>
    <v-speed-dial
      v-if="!messagesLoading  && !isPristine && $vuetify.breakpoint.mdAndDown"
      :disabled="isPristine"
      v-model="fab"
      fixed
      :bottom="true"
      :right="true"
      direction="top"
      transition="v-fade-transition"
    >
      <template v-slot:activator>
      <v-btn
        v-model="fab"
        color="primary"
        dark
        fab
      >
        <v-icon>edit</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      </template>
      <v-btn
        @click="save"
        color="primary"
        fab
        dark
        small
      >
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn
        @click="$store.commit('RESET_SELECTED_MESSAGE', selectedMessage.alertMessagesId)"
        color="primary"
        fab
        dark
        small
      >
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-container>
</template>

<script>

import { mapState, mapGetters } from 'vuex'
import validation from '@/mixins/validation'

export default {
  name: 'TextMessages',
  mixins: [validation],
  computed: {
    ...mapState({
      messagesLoading: state => state.smsEmailMessages.messagesLoading,
      messages: state => state.smsEmailMessages.messages,
      messagesClone: state => state.smsEmailMessages.messagesClone,
      messageAlertType: state => state.smsEmailMessages.messageAlertType,
      messageCommsType: state => state.smsEmailMessages.messageCommsType,
      selectedMessage: state => state.smsEmailMessages.selectedMessage
    }),
    ...mapGetters([
      'getterMenuItems',
      'getterSelectedMessage',
      'getterSelectedSubject'
    ]),
    isPristine () {
      return Object.keys(this.messages).forEach(key => {
        if (String(this.messages[key].message) !== String(this.messagesClone[key].message)) {
          return false
        }
      })
    }
  },
  data () {
    return {
      headerIcon: 'message',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Text / SMS Messages',
      commsTypes: ['SMS', 'Email'],
      // Validators
      required: v => !!v || 'Value required',
      // Mobile action button
      fab: false
    }
  },
  watch: {
    getterSelectedSubject () {
      console.log('I Have Changed!!!!')
    },
    messageAlertType () {
      const newMessage = Object.values(this.messages).find(e => e.communicationTypeDescription === this.messageCommsType && e.alertTypeDescription === this.messageAlertType)
      this.$store.commit('SET_SELECTED_MESSAGE', newMessage)
    },
    messageCommsType () {
      const newMessage = Object.values(this.messages).find(e => e.communicationTypeDescription === this.messageCommsType && e.alertTypeDescription === this.messageAlertType)
      this.$store.commit('SET_SELECTED_MESSAGE', newMessage)
    }
  },
  methods: {
    save () {
      if (this.$refs.smsEmailMessagesForm.validate()) {
        this.$store.dispatch('updateMessages')
      } else {
        this.$refs.smsEmailMessagesForm.validate()
      }
    }
  },
  mounted () {
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
