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
            @tolerance-changed="toleranceChanged"
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
          @tolerance-changed="toleranceChanged"
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
      writeUrl: 'sysadmin/hydration-params'
    }
  },
  methods: {
    async getValues () {
      let data = await apiLib.getData('sysadmin/hydration-params')
      let dataClone = await apiLib.getData('sysadmin/hydration-params')
      this.tolerances = data
      this.clone = dataClone
      // console.log(this.tolerances)
      // console.log(this.clone)
    },
    async save () {
      for (var i = 0; i < this.tolerances.length; i++) {
        await apiLib.updateData(this.writeUrl, {
          dehydratedRedAmberBound: this.tolerances[i].dehydratedRedAmberBound,
          dehydratedAmberGreenBound: this.tolerances[i].dehydratedAmberGreenBound,
          overHydratedAmberRedBound: this.tolerances[i].overHydratedAmberRedBound,
          overHydratedGreenAmberBound: this.tolerances[i].overHydratedGreenAmberBound
        }, false, true)
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
