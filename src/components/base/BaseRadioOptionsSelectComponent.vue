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
                v-model="value"
                :mandatory="false"
                color="primary"
                row
              >
                <v-radio
                  class="ma-2"
                  v-for="radio in radioConfig"
                  :key="radio.label"
                  :label="radio.label"
                  :value="radio.value"
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
                v-model="value"
                :mandatory="false"
                color="primary"
              >
                <v-radio
                  class="ma-2"
                  v-for="radio in radioConfig"
                  :key="radio.label"
                  :label="radio.label"
                  :value="radio.value"
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
  data () {
    return {
      value: ''
    }
  },
  props: {
    radioConfig: Array,
    groupHeader: String,
    groupDescription: String,
    radioHeader: String,
    height: String
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
