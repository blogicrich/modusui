<template>
  <v-container fluid column>
    <v-card class="pa-2">
      <span class="subheader"> {{ groupHeader }} </span>
      <v-divider class="mb-2" color="#00a1cd"></v-divider>
      <v-layout row wrap>
      </v-layout>
        <v-layout row fill-height align-start justify-center>
          <span class="my-2"> {{ groupDescription }} </span>
          <v-layout class="ma-2" column>
            <span> {{ radioHeader }}</span>
            <v-radio-group
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
      <!-- </v-layout> -->
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
    radioHeader: String,
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
