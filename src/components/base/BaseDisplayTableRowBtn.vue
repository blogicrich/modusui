<template>
  <v-btn
    v-bind="buttonType"
    :disabled="disabled"
    :color="$vuetify.breakpoint.smAndDown ? '' : btnColor"
    @click="$emit('row-button-clicked')"
  >
    <v-icon
      class="mr-2 small"
      v-bind="iconType"
      :color="$vuetify.breakpoint.smAndDown ? btnColor : iconColor"
    >
      {{ icon }}
    </v-icon>
    <div
      v-if="$vuetify.breakpoint.mdAndUp"
      class="secondary--text"
    >
      {{ btnTitle }}
    </div>
  </v-btn>
</template>

<script>

export default {
  name: 'BaseDisplayTableRowBtn',
  computed: {
    buttonType () {
      const buttonOptions = {}
      if (this.$vuetify.breakpoint.smAndDown) {
        buttonOptions.icon = true
      } else {
        buttonOptions.icon = false
      }
      return buttonOptions
    },
    iconType () {
      const iconOptions = {}
      if (this.$vuetify.breakpoint.smAndDown) {
        iconOptions.medium = true
        iconOptions.small = false
      } else {
        iconOptions.medium = false
        iconOptions.small = true
      }
      return iconOptions
    }
  },
  props: {
    btnColor: String,
    btnTitle: String,
    disabled: Boolean,
    icon: String,
    iconColor: String
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
