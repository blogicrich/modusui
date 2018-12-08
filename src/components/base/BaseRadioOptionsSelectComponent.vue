<template>
  <v-container>
    <v-layout justify-space-around fill-height>
      <v-flex xs12 md12 lg12>
        <v-card v-if="$vuetify.breakpoint.smAndUp" class="ma-0 pa-3" color="Blue" :height="height">
          <h3 class="subheader text-left"> {{ groupHeader }} </h3>
          <v-divider
            class="ma-2"
            color="#00a1cd">
          </v-divider>
            <v-flex xs12 md12 lg12>
              <p class="text-left"> {{ groupDescription }} </p>
              <h3 class="subheader text-left"> {{ radioHeader }}</h3>
              <v-spacer></v-spacer>
              <v-radio-group
                class="mx-3 my-2"
                v-model="newValue"
                :mandatory="false"
                color="primary"
                row
              >
                <v-radio
                  class="ma-2"
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
        </v-card>
        <v-card v-if="$vuetify.breakpoint.xsOnly" class="ma-0 pa-3" color="white" :height="height">
          <h3 class="subheader text-left"> {{ groupHeader }} </h3>
          <v-divider
            class="ma-2"
            color="#00a1cd">
          </v-divider>
            <v-flex xs12 md12 lg12>
              <p class="text-left"> {{ groupDescription }} </p>
              <h3 class="subheader text-left"> {{ radioHeader }}</h3>
              <v-spacer></v-spacer>
              <v-radio-group
                class="mx-3 my-2"
                v-model="newValue"
                :mandatory="false"
                color="primary"
                row
              >
                <v-radio
                  class="ma-2"
                  color="primary"
                  v-for="(radio, index) in radioConfig"
                  :key="radio.time"
                  :label="String(radio.time) + suffix"
                  :value="radio.time"
                  @change="$emit('radio-option-changed', { items: radioConfig, index: index , newValue:newValue, defaultValue:defaultValue } )"
                  >
                </v-radio>
            </v-radio-group>
          </v-flex>
        </v-card>
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
      // getter
      get () {
        return this.defaultValue
      },
      // setter
      set (newValue) {
        return newValue
      }
    }
  // beforeMount () {
  //   // this.newValue = this.defaultValue
  //   // console.log('mounted val:', this.newValue);
  // }
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
