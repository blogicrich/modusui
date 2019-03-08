<template lang="html">
  <v-layout column>
    <v-layout column>
      <v-layout justify-space-between fill-height align-center>
        <h3>{{ headerText }}</h3>
        <slot name="btnSlot"></slot>
      </v-layout>
      <v-divider class="cardBorder"></v-divider>
    </v-layout>
  <v-layout row wrap>
    <v-flex xs12 sm6 v-for="(item, index) in dataBox" :key="index">
      <v-layout column class="pa-2 my-3">
        <v-card height="50">
          <v-layout fill-height align-center>
            <span class="subheader ml-2">{{ item.settingText }}</span>
          </v-layout>
        </v-card>
        <v-card class="cardBorder">
          <baseComponent class="mt-3 mx-4">
            <span slot="firstSlot">{{ item.cardText }}</span>
            <span slot="firstRightSlot">{{ radioText }}</span>
            <v-radio-group

              row
              class="mx-3 my-2"
              color="primary"
              slot="secondRightSlot">
              <v-radio class="ma-2" color="primary" v-for="radio in radios" :key="radio" :value="radio" @change="test()" :label="radio"></v-radio>
            </v-radio-group>
          </baseComponent>
        </v-card>
      </v-layout>
    </v-flex>
  </v-layout>
</v-layout>
</template>

<script>
import baseComponent from '@/components/base/baseAlertCardComponent.vue'

export default {
  components: {
    baseComponent
  },
  props: {
    voiceInterText: String,
    dataBox: Array,
    radioText: String,
    radios: Array,
    data: Array,
    headerText: String
  },
  methods: {
    test () {
      // console.log(this.data[0][blueLight]);
      // $emit('radio-option-changed', item)
    },
    selectChanged (item) {
      console.log(item)
      // $emit('select-changed', item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./public/scss/main.scss";
.cardBorder {
  border: 3px solid $vuetify-primary;
}
</style>
