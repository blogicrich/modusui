<template>
  <div>
    <h2 class="pg-subheader text-primary text-center" text-xs-center>Hydration Parameters</h2>
    <br><br><br>
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
  </div>
</template>

<script>
import BaseToleranceSetter from '@/components/base/BaseToleranceSetterComponent.vue'
import { getData } from '@/mixins/apiRequests'

export default {
  name: 'HydrationParameters',
  mixins: [getData],
  components: {
    BaseToleranceSetter
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
