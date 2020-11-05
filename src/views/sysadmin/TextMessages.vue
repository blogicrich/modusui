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
        <v-toolbar-title v-if="$vuetify.breakpoint.smAndUp">
          Edit sms and Email Messages
        </v-toolbar-title>
        <v-spacer />
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
              v-for="alertType in getterAlertTypes"
              :key="alertType"
              @click="$store.dispatch('changeSelectedAlertType', alertType)"
            >
              <v-list-tile-title v-text="alertType" />
            </v-list-tile>
          </v-list>
        </v-menu>
        <!-- SELECT MESSAGE TYPE -->
        <v-menu :nudge-width="100">
          <template v-slot:activator="{ on }">
            <v-toolbar-title v-on="on">
              <span>Message Type</span>
              <v-icon dark>arrow_drop_down</v-icon>
            </v-toolbar-title>
          </template>

          <v-list>
            <v-list-tile
              v-for="commsType in getterCommsTypes"
              :key="commsType"
              @click="$store.dispatch('changeSelectedCommsType', commsType)"
            >
              <v-list-tile-title v-text="commsType" />
            </v-list-tile>
          </v-list>
        </v-menu>
        <!-- TOOLBAR BUTTONS -->
        <v-btn
          v-if="$vuetify.breakpoint.smAndDown"
          :disabled="getterIsPristine"
          icon @click="save"
        >
          <v-icon>save</v-icon>
        </v-btn>
        <v-btn
          v-if="$vuetify.breakpoint.smAndDown"
          :disabled="getterIsPristine"
          icon @click="$store.commit('RESET_MESSAGES')"
        >
          <v-icon>refresh</v-icon>
        </v-btn>
      </v-toolbar>
    </v-layout>
    <v-card class="mx-4" v-if="messages">
      <v-form ref="smsEmailMessagesForm">
        <v-card-title class="text-primary title">
          {{ getterSelectedMessage.alertTypeDescription + ' : ' + getterSelectedMessage.communicationTypeDescription }}
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Subject"
            :value="getterSelectedMessage.subject"
            color="primaryColor"
            outline
            :rules="[required, validateMaxChars(getterSelectedMessage.subject, 254)]"
            @input="$store.commit('UPDATE_SELECTED_MESSAGE_SUBJECT', $event)"
          />
          <v-textarea
            outline
            name="input-7-4"
            label="Message"
            :value="getterSelectedMessage.message"
            :rules="[required, validateMaxChars(getterSelectedMessage.message, 254)]"
            @input="$store.commit('UPDATE_SELECTED_MESSAGE_TEXT', $event)"
          />
        </v-card-text>
      </v-form>
    </v-card>
    <v-layout v-if="!messagesLoading && $vuetify.breakpoint.lgAndUp" row justify-center align-center>
      <v-btn
        :disabled="getterIsPristine"
        class="root-nav-btn mt-3"
        @click="save"
        color="primary"
        large
      >
        Save
        <v-icon class="ma-1">save</v-icon>
      </v-btn>
      <v-btn
        :disabled="getterIsPristine"
        class="root-nav-btn mt-3"
        @click="$store.commit('RESET_MESSAGES')"
        color="primary"
        large
      >
        Reset
        <v-icon class="ma-1">refresh</v-icon>
      </v-btn>
    </v-layout>
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
      selectedMessage: state => state.smsEmailMessages.selectedMessage
    }),
    ...mapGetters([
      'getterIsPristine',
      'getterSelectedMessage',
      'getterCommsTypes',
      'getterAlertTypes'
    ])
  },
  data () {
    return {
      headerIcon: 'message',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Text / SMS Messages',
      // Validators
      required: v => !!v || 'Value required',
      // Mobile action button
      fab: false
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
