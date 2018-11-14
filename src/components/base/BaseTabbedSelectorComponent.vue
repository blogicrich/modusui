<template lang="html">
  <div>
    <v-tabs
        v-model="currentItem"
        slider-color="blue"
      >
      <v-layout justify-space-around>
        <v-tab
          v-for="item in changedData"
          v-on:click.capture="switchTab($event)"
          :href="'#tab-' + item.name"
          :key="item.name"
          active-class="currentItem"
        >
        {{ item.name }}
        </v-tab>
      </v-layout>
    </v-tabs>
    <v-container>
      <v-tabs-items v-model="currentItem">
        <v-tab-item
          v-for="(item, index) in changedData"
          :value="'tab-' + item.name"
          :key="'tab-' + item.name"
        >
          <v-card flat>
            <v-card-text>
              <v-layout justify-space-around wrap>
                <v-flex lg4 md4 xs12>
                  <h2 class="table-header">{{ cardEmailHeader }}</h2>
                  <v-text-field
                    label="Subject"
                    v-model="item.subject"
                    :value="startData[index].subject"
                    @input="showBtns"
                  ></v-text-field>
                  <v-textarea
                    label="Email Body"
                    v-model="item.text"
                    :value="startData[index].text"
                    @input="showBtns"
                  ></v-textarea>
                </v-flex>
                <v-flex lg4 md4 xs12>
                  <h2 class="table-header">{{ cardSmsHeader }}</h2>
                    <v-textarea
                      label="SMS Body"
                      counter
                      maxlength="160"
                      v-model="item.text"
                      :value="startData[index].text"
                      @input="showBtns"
                    ></v-textarea>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-container>
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
              </v-container>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <v-layout align-content-center>
        <v-dialog
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
        </v-dialog>
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
    changedData: Array,
    startData: Array,
    dialogTitle: String,
    dialogText: String,
    cardEmailHeader: String,
    cardSmsHeader: String
  },
  methods: {
    saveItem () {
      for (var i = 0; i < this.startData.length; i++) {
        if (this.startData[i].subject !== this.changedData.subject || this.startData[i].text !== this.changedData[i].text) {
          this.startData[i].subject = this.changedData[i].subject
          this.startData[i].text = this.changedData[i].text
          this.btns = false
        }
      }
    },
    eraseChange () {
      for (var i = 0; i < this.startData.length; i++) {
        this.changedData[i].subject = this.startData[i].subject
        this.changedData[i].text = this.startData[i].text
        this.btns = false
      }
    },
    switchTab (event) {
      for (var x = 0; x < this.changedData.length; x++) {
        if (this.changedData[x].subject !== this.startData[x].subject || this.changedData[x].text !== this.startData[x].text) {
          this.dialog = true
          this.activeHash = event.target.hash
          this.activeHash = this.activeHash.replace('#', '')
          this.activeHash = this.activeHash.replace(/%20/gi, ' ')
          event.stopImmediatePropagation()
        }
      }
    },
    showBtns () {
      for (var i = 0; i < this.startData.length; i++) {
        if (this.changedData[i].subject !== this.startData[i].subject || this.changedData[i].text !== this.startData[i].text) {
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
