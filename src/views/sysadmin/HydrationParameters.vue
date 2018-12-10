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
import { getData, postData } from '@/mixins/apiRequests'

export default {
  name: 'HydrationParameters',
  mixins: [getData],
  components: {
    BaseToleranceSetter,
  },
  data () {
    return {
      tolerances: [],
      newDefaultValue: true,
      snackColor: 'primary',
      snackText: '',
      snack: false,
      timeout: 6000,
    }
  },
  methods: {
    async getValues () {
      let data = await this.getData('hydrationtolerancesdisplay')
      this.tolerances = data
      console.log(data);
    }
  },
  mounted () {
    this.getValues()
    // console.log(data)
  },
  beforeRouteLeave (to, from, next) {
    const answer = window.confirm('Do you really want to leave? You will loose all unsaved changes!')
    if (answer) {
      next()
    } else {
      next(false)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
