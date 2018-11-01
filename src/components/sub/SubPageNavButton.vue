<template>
  <div>
    <BaseButton
    :type="type"
    :btnColor="btnColor"
    :btnClass="btnClass"
    :title="title"
    :route="route"
    :large="large"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/base/BaseBtnComponent.vue'

export default {
  name: 'SubPageNavButton',
  components: {
    BaseButton
  },
  data () {
    return {
      type: 'button',
      btnColor: 'primary',
      btnClass: 'root-nav-btn'
    }
  },
  props: {
    title: String,
    route: String,
    large: Boolean
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
