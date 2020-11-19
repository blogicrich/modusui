<template>
  <v-container fluid>
    <v-layout row wrap fill-height align-center justify-center>
      <v-flex :class="fullWidth ? 'xs12' : 'md4'">
        <v-fade-transition>
          <v-layout row fill-height align-center justify-start>
            <v-icon
              key="headerIconXLarge"
              v-if="$vuetify.breakpoint.xlOnly"
              class="ml-1 mr-2"
              x-large
              :color="$vuetify.theme.primary"
            >
              {{ headerIcon }}
            </v-icon>
            <v-icon
              key="headerIconLarge"
              v-if="$vuetify.breakpoint.lgOnly"
              class="ml-1 mr-2"
              large
              :color="$vuetify.theme.primary"
            >
              {{ headerIcon }}
            </v-icon>
            <v-icon
              key="headerIconMedium"
              v-if="$vuetify.breakpoint.mdAndDown"
              class="ml-1 mr-2"
              large
              :color="$vuetify.theme.primary"
            >
              {{ headerIcon }}
            </v-icon>
            <h1
              key="headerTextLg"
              v-if="$vuetify.breakpoint.lgAndUp"
              class="display-1 text-primary text-ellipsis"
            >
              {{ headerText }}
            </h1>
            <h1
              key="headerTextMd"
              v-if="$vuetify.breakpoint.mdAndDown"
              class="headline text-primary text-ellipsis"
            >
              {{ headerText }}
            </h1>
          </v-layout>
        </v-fade-transition>
      </v-flex>
      <v-flex
        v-if="!fullWidth"
        xs12
        md4
      >
        <v-fade-transition>
          <slot name="ctrViewHeaderColumn" />
        </v-fade-transition>
      </v-flex>
      <v-flex xs12 md4>
        <slot name="rhViewHeaderColumn" />
      </v-flex>
    </v-layout>
    <v-divider class="mt-2" v-if="hasDivider" :color="$vuetify.theme.primary" />
  </v-container>
</template>

<script>

export default {
  name: 'BaseViewHeader',
  props: {
    headerIcon: String,
    headerText: String,
    hasDivider: Boolean,
    fullWidth: Boolean
  }
}
</script>
<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
