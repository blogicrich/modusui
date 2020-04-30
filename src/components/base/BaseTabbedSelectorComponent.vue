<template lang="html">
  <div>
    <v-tabs
      color="primary"
      dark
      grow
      show-arrows
    >
    <v-tabs-slider color="white"></v-tabs-slider>
        <v-tab v-for="(item, index) in items" :key="index">
        <span>
      <v-badge color="red" right v-if="itemIsEmpty(item)">
          <span>{{ item.alertTypeDescription + ' - ' + item.communicationTypeDescription }}</span>
        <template v-slot:badge>
          <span>!</span>
        </template>
      </v-badge>
      <v-badge v-else>
        <span>{{ item.alertTypeDescription + ' - ' + item.communicationTypeDescription }}</span>
      </v-badge>
        </span>
        </v-tab>
        <v-tabs-items
          v-model="currentItem"
        >
          <v-tab-item
            v-for="(item, index) in items"
            :key="index"
          >
          <keep-alive>
            <v-card flat>
              <v-layout class="mx-2" align-start justify-space-around>
                <v-flex v-if="item.communicationTypeDescription === 'Email'" lg8 md8 xs12>
                  <h2 class="table-header mt-4">{{ cardEmailHeader }}</h2>
                  <BaseDataTableInfoCard
                    :errorMsg="errorMsg"
                    :loadingMsg="loadingMsg"
                    :loadedMsg="loadedMsg"
                    :loading="loading"
                    :loaded="loaded"
                    :error="error"
                    :color="$vuetify.theme.primary"
                  />
                  <v-text-field
                    label="Subject"
                    v-model="item.subject"
                    @input="showBtns"
                  ></v-text-field>
                  <v-textarea
                    label="Email Body"
                    counter
                    maxlength="500"
                    v-model="item.message"
                    @input="showBtns"
                  ></v-textarea>
                </v-flex>
                <v-flex v-if="item.communicationTypeDescription === 'SMS'" lg8 md8 xs12>
                  <v-layout column justify-space-around>
                    <h2 class="table-header mt-4">{{ cardSmsHeader }}</h2>
                    <v-textarea
                      label="SMS Body"
                      counter
                      maxlength="160"
                      v-model="item.message"
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
            </keep-alive>
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
import BaseDataTableInfoCard from '@/components/base/BaseDataTableInfoComponent.vue'

export default {
  components: {
    BaseDataTableInfoCard,
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
  watch: {
    items () {
      this.itemIsEmpty()
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
    loadedMsg: String,
    infoCardColor: String
  },
  methods: {
    itemIsEmpty (item) {
      if (item) {
        return item.message === ''
      } else {
        return false
      }
    },
    saveChanges () {
      var item = Number(this.currentItem)
      var data = {
        communicationType: this.items[item].communicationTypeDescription,
        subject: this.items[item].alertTypeDescription,
        message: this.items[item].message
      }
      this.$emit('itemsEdited', data, item)
      this.btns = false
    },
    eraseChange () {
      for (var x = 0; x < this.items.length; x++) {
        this.items[x].subject = this.items[x].subject
        this.items[x].text = this.items[x].text
        this.btns = false
      }
    },
    showBtns () {
      this.btns = true
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
