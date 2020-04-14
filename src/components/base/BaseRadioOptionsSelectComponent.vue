<template>
  <v-container>
    <v-layout row fill-height align-center justify-center>
      <v-flex :class="$vuetify.breakpoint.smAndDown ? 'border-primary pa-2' : 'border-primary pa-4'" xs12>
        <h2 v-if="$vuetify.breakpoint.mdAndUp" class="text-center text-primary ma-1"> {{ groupHeader }} </h2>
        <h3 v-if="$vuetify.breakpoint.smAndDown" class="text-center text-primary ma-1"> {{ groupHeader }} </h3>
        <p class="text-left my-2"> {{ groupDescription }} </p>
        <h4 class="text-left text-primary"> {{ radioHeader }}</h4>
        <v-radio-group
          v-if="$vuetify.breakpoint.lgAndUp"
          v-model="newValue"
          :mandatory="false"
          color="primary"
          row
        >
          <v-radio
            color="primary"
            v-for="(radio, index) in radioConfig"
            :key="radio.time"
            :label="String(radio.time) + suffix"
            :value="radio.time"
            @change="$emit('radio-option-changed', { items: radioConfig, index: index, newValue:radio.time, defaultValue:defaultValue } )"
            >
          </v-radio>
        </v-radio-group>
        <v-radio-group
          v-if="$vuetify.breakpoint.mdAndDown"
          v-model="newValue"
          :mandatory="false"
          color="primary"
        >
          <v-radio
            color="primary"
            v-for="(radio, index) in radioConfig"
            :key="radio.time"
            :label="String(radio.time) + suffix"
            :value="radio.time"
            @change="$emit('radio-option-changed', { items: radioConfig, index: index, newValue:radio.time, defaultValue:defaultValue } )"
            >
          </v-radio>
        </v-radio-group>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'BaseRadioOptionsSelectComponent',
  props: {
    radioConfig: Array,
    defaultValue: Number,
    groupDefault: String,
    groupHeader: String,
    groupDescription: String,
    radioHeader: String,
    height: String,
    suffix: String
  },
  computed: {
    newValue: {
      get () {
        return this.defaultValue
      },
      set (newValue) {
        return newValue
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
