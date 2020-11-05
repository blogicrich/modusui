<template>
  <div>
    <BaseButton
      :type="type"
      :btnColor="btnColor"
      :btnClass="btnClass"
      :title="title"
      :route="route"
      :large="large"
      :fab="fab"
      :small="small"
      :icon="icon"
      :btnIcon="btnIcon"
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
    large: Boolean,
    fab: Boolean,
    small: Boolean,
    icon: Boolean,
    btnIcon: String
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
