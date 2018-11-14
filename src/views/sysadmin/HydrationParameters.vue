<template>
  <div>
    <h2 class="pg-subheader text-center" text-xs-center>Hydration Parameters</h2>
    <br><br><br>
    <BaseToleranceSetter
      class="baseToleranceSetter"
      :severeOverHydration="severeOverHydration"
      :overHydration="overHydration"
      :underHydration="underHydration"
      :severeUnderHydration="severeUnderHydration"
      :colorRed="colorRed"
      :colorAmber="colorAmber"
      :colorGreen="colorGreen"
      :colorBlue="colorBlue"
      :colorDarkBlue="colorDarkBlue"
    />
  </div>
</template>

<script>
// import { getMeta } from '@/mixins/apiRequests'
import BaseToleranceSetter from '@/components/base/BaseToleranceSetterComponent.vue'

export default {
  name: 'HydrationParameters',
  // mixins: [getMeta],
  components: {
    BaseToleranceSetter
  },
  data () {
    return {
      severeOverHydration: 200,
      overHydration: 120,
      underHydration: 50,
      severeUnderHydration: 20,
      colorRed: '#FF0000',
      colorAmber: '#FFBF00',
      colorGreen: '#008000',
      colorBlue: '#0000FF',
      colorDarkBlue: '#0000A0'
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
