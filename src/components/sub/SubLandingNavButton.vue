<template>
  <div>
    <BaseButton
      :type="type"
      :outline="outline"
      :btnColor="btnColor"
      :btnClass="btnClass"
      :block="block"
      :title="title"
      :route="route"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/base/BaseBtnComponent.vue'

export default {
  name: 'SubLandingNavButton',
  components: {
    BaseButton
  },
  data () {
    return {
      type: 'button',
      outline: true,
      btnColor: 'primary',
      btnClass: 'root-nav-btn',
      block: true
    }
  },
  props: {
    title: String,
    route: String
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
