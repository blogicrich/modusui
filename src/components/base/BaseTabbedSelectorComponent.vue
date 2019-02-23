<template lang="html">
  <div>
    <v-tabs
      color="primary"
      dark
      grow
      show-arrows
    >
    <v-tabs-slider color="white"></v-tabs-slider>
        <v-tab
          v-for="(item, index) in items"
          :key="index"
        >
        {{ item.alertTypeDescription + ' - ' + item.description }}
        </v-tab>
        <v-tabs-items
          v-model="currentItem"
        >
          <v-tab-item
            v-for="(item, index) in items"
            :key="index"
          >
            <v-card flat>
              <v-layout justify-space-around mt-4>
                <v-flex v-if="item.description === 'Email'" lg4 md4 xs12>
                  <h2 class="table-header">{{ cardEmailHeader }}</h2>
                  <v-text-field
                    label="Subject"
                    v-model.sync="item.subject"

                    @input="showBtns"
                  ></v-text-field>
                  <v-textarea
                    label="Email Body"
                    counter
                    maxlength="500"
                    v-model.sync="item.message"

                    @input="showBtns"
                  ></v-textarea>
                </v-flex>
                <v-flex v-if="item.description === 'SMS'" lg4 md4 xs12>
                  <v-layout column justify-space-around mt-4>
                    <h2 class="table-header">{{ cardSmsHeader }}</h2>
                    <v-textarea
                      label="SMS Body"
                      counter
                      maxlength="160"
                      v-model.sync="item.message"

                      @input="showBtns"
                    ></v-textarea>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-container>
                  <v-layout justify-end>
                    <div v-if="btns">
                      <SubPageNavButton
                        @click.native="saveChanges"
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
                  </v-layout>
                </v-container>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
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
      currentItem: '0',
      dialog: false,
      btns: false,
      activeHash: ''
    }
  },
  props: {
    items: Array,
    dialogTitle: String,
    dialogText: String,
    cardEmailHeader: String,
    cardSmsHeader: String,
    loading: Boolean,
    loaded: Boolean,
    error: Boolean,
    errorMsg: String,
    loadingMsg: String,
    loadedMsg: String
  },
  methods: {
    saveChanges () {
      var item = Number(this.currentItem)
      // console.log(item)
      this.$emit('itemsEdited', this.items[item])
    },
    eraseChange () {
      // for (var x = 0; x < this.items.length; x++) {
      //   this.items[x].subject = this.items[x].subject
      //   this.items[x].text = this.items[x].text
      //   this.btns = false
      // }
    },
    switchTab (event) {
      // for (var y = 0; y < this.items.length; y++) {
      //   if (this.items[y].subject !== this.items[y].subject || this.items[y].text !== this.items[y].text) {
      //     this.dialog = true
      //     this.activeHash = event.target.hash
      //     this.activeHash = this.activeHash.replace('#', '')
      //     this.activeHash = this.activeHash.replace(/%20/gi, ' ')
      //     event.stopImmediatePropagation()
      //   }
      // }
    },
    showBtns () {
      // for (var z = 0; z < this.items.length; z++) {
      //   if (this.items[z].subject !== this.items[z].subject || this.items[z].text !== this.items[z].text) {
          this.btns = true
      //     return
      //   } else {
      //     this.btns = false
      //   }
      // }
    },
    dialogCancel () {
      // this.dialog = false
    },
    discard () {
      // this.currentItem = this.activeHash
      // this.eraseChange()
      // this.dialog = false
    }
    // mounted () {
    //   console.log(this.items);
    // }
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
