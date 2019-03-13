<template>
    <wizard-component/>

</template>

<script>
import wizardComponent from '@/components/base/BaseWizardComponent'

export default {
  name: 'PersonalDetails',
    components: {
    wizardComponent
  },

  data () {
    return {
    }
  },
}
</script>
<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
