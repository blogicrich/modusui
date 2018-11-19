<template>
  <v-layout column>
    <v-layout class="mx-4" row fill-height align-center justify-start>
      <v-icon medium color="primary">local_drink</v-icon>
      <h1 class="pg-header">Hydration Parameters</h1>
    </v-layout>
    <v-layout row wrap>
      <v-flex lg6>
        <h2 class="pg-subheader text-primary mx-4">Start of Day</h2>
        <BaseToleranceSetter
          class="baseToleranceSetter"
          :level4="level4"
          :level3="level3"
          :level2="level2"
          :level1="level1"
          :level4q="level4q"
          :level3q="level3q"
          :colorGreen="colorGreen"
          :level2q="level2q"
          :level1q="level1q"
        />
      </v-flex>
      <v-flex lg6>
        <h2 class="pg-subheader text-primary mx-4">End of Day</h2>
        <BaseToleranceSetter
          class="baseToleranceSetter"
          :level4="level4"
          :level3="level3"
          :level2="level2"
          :level1="level1"
          :level4q="level4q"
          :level3q="level3q"
          :colorGreen="colorGreen"
          :level2q="level2q"
          :level1q="level1q"
        />
      </v-flex>
    </v-layout>
    <v-layout row fill-height align-center justify-center>
      <SubPageNavButton
        title="Save"
        route="/landing"
        large="true"
      >
      </SubPageNavButton>
    </v-layout>
  </v-layout>
</template>

<script>
import BaseToleranceSetter from '@/components/base/BaseToleranceSetterComponent.vue'
import SubPageNavButton from '@/components/sub/SubPageNavButton.vue'
import { getData } from '@/mixins/apiRequests'

export default {
  name: 'HydrationParameters',
  mixins: [getData],
  components: {
    BaseToleranceSetter,
    SubPageNavButton
  },
  data () {
    return {
      level4: 0,
      level3: 0,
      level2: 0,
      level1: 0,
      level4q: '#FF0000',
      level3q: '#FFBF00',
      colorGreen: '#008000',
      level2q: '#0000FF',
      level1q: '#0000A0'
    }
  },
  mounted () {
    this.getData('hydrationtolerancesdisplay')
    // .then((response) => { this.level4 = response.data })
    // .catch(error => { console.log(error) })
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

  .baseToleranceSetter {
    margin: 0 auto 0 auto;
  }
</style>
