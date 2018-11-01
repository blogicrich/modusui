<template>
  <v-container>
        <v-card class="ma-0">
          <v-card-title class="subheader text-left"> {{ groupHeader }} </v-card-title>
          <v-divider
            class="mx-2"
            color="#00a1cd">
          </v-divider>
          <v-layout row fill-height>
            <v-card-title class="text-wrap"> {{ groupDescription }} </v-card-title>
          <v-layout column fill-height>
              <v-card-title class="subheader text-left"> {{ radioHeader }}</v-card-title>
              <v-radio-group
                class="mx-2"
                v-model="value"
                :mandatory="false"
                color="primary"
                row
              >
                <v-radio
                  v-for="radio in radioConfig"
                  :key="radio.label"
                  :label="radio.label"
                  :value="radio.value"
                  >
                </v-radio>
              </v-radio-group>
            </v-layout>
          </v-layout>
        </v-card>
  </v-container>
</template>

<script>

export default {
  name: 'BaseRadioOptionsSelectComponent',
  data () {
    return {
      value: ''
    }
  },
  props: {
    radioConfig: Array,
    groupHeader: String,
    groupDescription: String,
    radioHeader: String
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
