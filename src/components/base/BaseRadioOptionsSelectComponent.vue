<template>
  <v-container>
    <v-layout justify-space-around fill-height>
      <v-flex xs12 md12 lg12>
        <v-card class="ma-0">
          <h3 class="subheader text-left"> {{ groupHeader }} </h3>
          <v-divider
            class="mx-2"
            color="#00a1cd">
          </v-divider>
          <!-- <v-layout row fill-height> -->

            <!-- <v-layout justify-space-between row fill-height> -->

            <v-flex xs12 md12 lg12>
              <p class="text-left"> {{ groupDescription }} </p>
              <h3 class="subheader text-left"> {{ radioHeader }}</h3>
              <v-radio-group
                v-model="value"
                :mandatory="false"
                color="primary"
              >
                <!-- <v-layout justify-space-around fill-height> -->
                <v-radio
                  v-for="radio in radioConfig"
                  :key="radio.label"
                  :label="radio.label"
                  :value="radio.value"
                  >
                </v-radio>
              <!-- </v-layout> -->
              </v-radio-group>
            </v-flex>
            <!-- </v-layout> -->
          <!-- </v-layout> -->
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
    radioHeader: String
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
