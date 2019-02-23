<template>
  <v-layout column>
    <v-layout class="mx-4" row fill-height align-center justify-start>
      <v-icon medium color="primary">local_drink</v-icon>
      <h1 class="pg-header">Hydration Parameters</h1>
    </v-layout>
    <v-layout row>
      <v-layout column>
        <v-layout class="mx-4" row fill-height align-center justify-start>
          <v-icon medium color="primary">schedule</v-icon>
          <h2 class="pg-subheader text-primary mx-4">Beginning of the Day</h2>
        </v-layout>
          <BaseToleranceSetter
            class="baseToleranceSetter"
            :tolerances="tolerances"
            v-on:tolerance-changed="toleranceChanged"
          />
      </v-layout>
      <v-layout column>
        <v-layout class="mx-4" row fill-height align-center justify-start>
          <v-icon medium color="primary">update</v-icon>
          <h2 class="pg-subheader text-primary mx-4">End of the Day</h2>
        </v-layout>
        <BaseToleranceSetter
          class="baseToleranceSetter"
          :tolerances="tolerances"
          v-on:tolerance-changed="toleranceChanged"
        />
      </v-layout>
    </v-layout>
    <v-layout row justify-center align-center>
      <v-fade-transition>
        <v-btn
        v-if="newDefaultValue"
        class="root-nav-btn mt-3"
        @click="save"
        color="primary"
        large
        >Save
        <v-icon class="ma-1">save</v-icon>
      </v-btn>
    </v-fade-transition>
    </v-layout>
    <v-snackbar
      v-model="snack"
      bottom
      :timeout="timeout"
      :color="snackColor"
    >
      {{ snackText }}
      <v-btn flat @click="snack = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>

import BaseToleranceSetter from '@/components/base/BaseToleranceSetterComponent.vue'
import apiLib from '@/services/apiLib'

export default {
  name: 'HydrationParameters',
  components: {
    BaseToleranceSetter
  },
  data () {
    return {
      clone: [],
      tolerances: [],
      newDefaultValue: false,
      snackColor: 'primary',
      snackText: '',
      snack: false,
      timeout: 6000,
      writeUrl: 'hydrationtolerancessave'
    }
  },
  methods: {
    async getValues () {
      let data = await apiLib.getData('sysadmin/hydration-params')
      let dataClone = await apiLib.getData('sysadmin/hydration-params')
      this.tolerances = data
      this.clone = dataClone
      // console.log(data)
    },
    async save () {
      for (var i = 0; i < this.tolerances.length; i++) {
        this.snackText = await apiLib.postData(this.writeUrl, { level1: this.tolerances[i].level1, level2: this.tolerances[i].level2, level3: this.tolerances[i].level3, level4: this.tolerances[i].level4 })
        if (this.snackText === 'Hydration Tolerances Updated') {
          this.newDefaultValue = false
          this.snackColor = 'success'
          this.snack = true
        } else {
          this.snackColor = 'error'
          this.snack = true
        }
      }
      await this.getValues()
    },
    toleranceChanged (tol) {
      for (var i = 0; i < this.clone.length; i++) {
        if (Number(this.clone[i][tol.level]) === Number(this.tolerances[i][tol.level])) {
          this.newDefaultValue = false
        } else {
          this.newDefaultValue = true
        }
      }
    }
  },
  mounted () {
    this.getValues()
    // console.log(data)
  },
  beforeRouteLeave (to, from, next) {
    if (this.newDefaultValue === true) {
      let answer = window.confirm('Do you really want to leave? You will loose all unsaved changes!')
      if (answer) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
