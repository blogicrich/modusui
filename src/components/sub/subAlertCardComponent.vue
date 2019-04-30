<template lang="html">
  <v-layout row wrap>
    <v-flex xs12 sm6 v-for="item in users" :key="item.userId">
      <v-layout column class="pa-2 my-3">
        <v-card height="50">
          <v-layout fill-height align-center>
            <span class="subheader ml-2">{{ item.givenName }} {{ item.familyName }}</span>
          </v-layout>
        </v-card>
        <v-card class="cardBorder">
          <baseComponent class="mt-3 mx-4">
            <v-select
              v-model="item.alertTypeMessage"
              slot="firstSlot"
              :items="personnelsettings"
              attach
              chips
              deletable-chips
              multiple
              :label="selectLabel"
              @change="test(item)"
            ></v-select>
            <span slot="firstRightSlot">{{ textCheckboxes }}</span>
            <v-radio-group
              row
              v-model="item.communicationDescription"
              class="mx-3 my-2"
              color="primary"
              slot="secondRightSlot">
              <v-radio class="ma-2" color="primary" label="Email" value="email" @change="radioChanged(item)"></v-radio>
              <v-radio class="ma-2" color="primary" label="sms" value="sms" @change="radioChanged(item)"></v-radio>
            </v-radio-group>
          </baseComponent>
        </v-card>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import baseComponent from '@/components/base/baseAlertCardComponent.vue'

export default {
  components: {
    baseComponent
  },
  props: {
    carerName: String,
    users: Array,
    personnelsettings: Array,
    textCheckboxes: String,
    selectLabel: String
  },
  methods: {
    radioChanged (item) {
      console.log(item)
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
