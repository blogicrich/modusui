<template>
  <v-container fluid>
    <v-layout class="py-0" column justify-center>
      <v-layout v-if="$vuetify.breakpoint.lgAndUp" row fill-height align-center justify-start>
        <v-icon class="ml-1 mr-2" large :color="iconColor">{{ headerIcon }}</v-icon>
        <h1 class="my-0 pg-header text-primary">{{ headerText }}</h1>    
      </v-layout>
      <v-layout v-if="$vuetify.breakpoint.md" row fill-height align-center justify-start>
        <v-icon class="ml-1 mr-2" large :color="iconColor">{{ headerIcon }}</v-icon>
        <h2 class="my-0 pg-header text-primary">{{ headerText }}</h2>    
      </v-layout>
      <v-layout v-if="$vuetify.breakpoint.smAndDown" row fill-height align-center justify-start>
        <v-icon class="ml-1 mr-2" medium :color="iconColor">{{ headerIcon }}</v-icon>
        <h2 class="my-0 text-primary">{{ headerText }}</h2>    
      </v-layout>
      <v-spacer></v-spacer>
      <v-layout row fill-height align-end justify-end>
        <v-flex align-center justify-end>
          <slot name="search"></slot>
        </v-flex>
        <v-flex align-center justify-end>
          <slot name="filter"></slot>
        </v-flex>
        
      </v-layout>
      
    </v-layout>
  <v-divider class="mt-4" v-if="hasDivider" :color="iconColor"></v-divider>
  </v-container>
</template>

<script>

import BaseViewHeader from '@/components/base/BaseViewHeaderComponent.vue'

export default {
  name: 'BaseViewHeader',
  data () {
    return {

    }
  },
  props: {
    headerIcon: String,
    iconColor: String,
    headerText: String,
    hasDivider: Boolean,
  }
}
</script>
<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
