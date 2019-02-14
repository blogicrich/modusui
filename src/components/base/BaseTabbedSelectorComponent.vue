<template lang="html">
  <div>
    <v-tabs
        v-if="items"
        v-model="currentItem"
        slider-color="white"
        color="primary"
        dark
      >
      <v-layout justify-space-around>
        <v-tab
          v-for="item in items"
          v-on:click.capture="switchTab($event)"
          :href="'#tab-' + item.alertMessagesId"
          :key="item.alertMessagesId"
          active-class="currentItem"
        >
        {{ item.alertTypeDescription }}
        </v-tab>
      </v-layout>
    </v-tabs>
    <v-container>
      <v-tabs-items v-model="currentItem">
        <v-tab-item
          v-for="(item, index) in items"
          :value="'tab-' + item.alertMessagesId"
          :key="'tab-' + item.alertMessagesId"
        >
          <v-card flat>
            <v-card-text>
              <v-layout justify-space-around wrap>
                <v-flex lg4 md4 xs12>
                  <h2 class="table-header">{{ cardEmailHeader }}</h2>
                  <v-text-field
                    label="Subject"
                    v-model="item.subject"
                    :value="item.subject"
                    @input="showBtns"
                  ></v-text-field>
                  <v-textarea
                    label="Email Body"
                    v-model="item.message"
                    :value="item.message"
                    @input="showBtns"
                  ></v-textarea>
                </v-flex>
                <v-flex lg4 md4 xs12>
                  <h2 class="table-header">{{ cardSmsHeader }}</h2>
                    <v-textarea
                      label="SMS Body"
                      counter
                      maxlength="160"
                      v-model="item.message"
                      :value="item.message"
                      @input="showBtns"
                    ></v-textarea>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <!-- <v-container>
                <v-layout justify-end>
                  <div v-if="btns">
                    <SubPageNavButton
                      @click.native="saveItem"
                      title="Save"
                    ></SubPageNavButton>
                  </div>
                  &nbsp;
                  <div v-if="btns">
                    <SubPageNavButton
                      @click.native="eraseChange"
                      title="Cancel"
                    ></SubPageNavButton>
                  </div>
                  &nbsp;
                  <SubLandingNavButton
                    title="Home"
                    route="/landing"
                  >
                  </SubLandingNavButton>
                </v-layout>
              </v-container> -->
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <v-layout align-content-center>
        <!-- <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
        >
          <v-card>
            <v-layout column justify-center>
            <v-card-title>
              <h3>{{ dialogTitle }}</h3>
            </v-card-title>
            <v-card-text>
              {{ dialogText }}
            </v-card-text>
            <v-card-actions>
              <v-layout justify-center>
                  <SubPageNavButton
                    @click.native="discard"
                    title="Discard"
                  ></SubPageNavButton>
                  &nbsp; &nbsp;
                  <SubPageNavButton
                    @click.native="dialogCancel"
                    title="Cancel"
                  ></SubPageNavButton>
                </v-layout>
            </v-card-actions>
          </v-layout>
          </v-card>
        </v-dialog> -->
      </v-layout>
    </v-container>
  </div>
</template>

<script>

import SubPageNavButton from '@/components/sub/SubPageNavButton.vue'
import SubLandingNavButton from '@/components/sub/SubLandingNavButton.vue'

export default {
  components: {
    SubPageNavButton,
    SubLandingNavButton
  },
  name: 'BaseTabbedSelector',
  data () {
    return {
      dialog: false,
      btns: false,
      activeHash: '',
      currentItem: ''
    }
  },
  props: {
    items: Array,
    dialogTitle: String,
    dialogText: String,
    cardEmailHeader: String,
    cardSmsHeader: String
  },
  methods: {
    saveItem () {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].subject !== this.items.subject || this.items[i].text !== this.items[i].text) {
          this.items[i].subject = this.items[i].subject
          this.items[i].text = this.items[i].text
          this.btns = false
        }
      }
    },
    eraseChange () {
      for (var x = 0; x < this.items.length; x++) {
        this.items[x].subject = this.items[x].subject
        this.items[x].text = this.items[x].text
        this.btns = false
      }
    },
    switchTab (event) {
      for (var y = 0; y < this.items.length; y++) {
        // if (this.items[y].subject !== this.items[y].subject || this.items[y].text !== this.items[y].text) {
          this.dialog = true
          this.activeHash = event.target.hash
          this.activeHash = this.activeHash.replace('#', '')
          this.activeHash = this.activeHash.replace(/%20/gi, ' ')
          event.stopImmediatePropagation()
        // }
      }
    },
    showBtns () {
      for (var z = 0; z < this.items.length; z++) {
        if (this.items[z].subject !== this.items[z].subject || this.items[z].text !== this.items[z].text) {
          this.btns = true
          return
        } else {
          this.btns = false
        }
      }
    },
    dialogCancel () {
      this.dialog = false
    },
    discard () {
      this.currentItem = this.activeHash
      this.eraseChange()
      this.dialog = false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
