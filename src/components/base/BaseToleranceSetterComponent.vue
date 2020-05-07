<template>
  <v-container fluid>

    <!-- DESKTOP VIEW -->

    <v-layout v-if="$vuetify.breakpoint.smAndUp" grid-list row fill-height align-center justify-center>
      <v-flex xs8>
        <h2 class="pg-subheader text-primary">{{ fieldLabel }}</h2>
      </v-flex>
        <v-text-field
          :color="color"
          class="ma-2 mx-4"
          suffix="%"
          :placeholder="fieldLabel"
          required
          :rules="rules"
          :value="fieldValue"
          @input="valueChanged"
          box
          single-line
          outline
          rounded
          >{{ fieldValue }}
        </v-text-field>
        <v-btn class="mx-0" icon flat color="primary" @click="incrementBtnPressed">
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn class="ma-0" icon flat color="primary" @click="decrementBtnPressed">
          <v-icon>remove</v-icon>
        </v-btn>
    </v-layout>

    <!-- MOBILE VIEW SM AND DOWN -->

    <v-layout class="pa-1"  v-if="$vuetify.breakpoint.xsOnly" grid-list row align-center justify-center>
      <v-flex class="mx-2">
        <v-text-field
          :color="color"
          :label="fieldLabel"
          suffix="%"
          :placeholder="fieldLabel"
          required
          :rules="rules"
          :value="fieldValue"
          @input="valueChanged"
          box
          outline
          rounded
          >{{ fieldValue }}
        </v-text-field>
      </v-flex>
      <v-flex shrink>
        <v-layout column fill-height align-center justify-center>
        <v-btn class="mx-0" icon flat color="primary" @click="incrementBtnPressed">
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn class="ma-0" icon flat color="primary" @click="decrementBtnPressed">
          <v-icon>remove</v-icon>
        </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'BaseToleranceSetter',
  props: {
    color: String,
    fieldId: Number,
    fieldLabel: String,
    fieldValue: Number,
    period: String,
    rules: Array
  },
  methods: {
    incrementBtnPressed () {
      this.$emit('increment', { id: this.fieldId, timePeriod: this.period })
    },
    decrementBtnPressed () {
      this.$emit('decrement', { id: this.fieldId, timePeriod: this.period })
    },
    valueChanged (e) {
      this.$emit('field-value-changed', { value: e, id: this.fieldId, timePeriod: this.period })
    }
  },
  mounted () {

  }
}

</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
