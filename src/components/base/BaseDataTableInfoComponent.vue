<template>
  <v-layout class="pa-2" column justify-center align-space-around>
    <v-fade-transition>
      <v-layout row fill-height align-center justify-center>
        <v-flex v-if="loading && $vuetify.breakpoint.mdAndUp" class="mx-2 mb-5" xs12>
          <v-layout v-if="loading" class="my-3" row fill-height align-center justify-center>
            <v-icon color="primary" size="32">info</v-icon>
            <span class="text-xs-center headline primary--text ml-2">{{ loadingMsg }}</span>
          </v-layout>
          <v-layout justify-center>
            <v-progress-circular
              v-if="loading"
              :size="100"
              :width="7"
              :color="color"
              indeterminate
            />
          </v-layout>
        </v-flex>
        <v-flex v-if="loading && $vuetify.breakpoint.smAndDown" class="mx-2 mb-5" xs12>
          <v-layout v-if="loading" class="my-3" row fill-height align-center justify-center>
            <v-icon color="primary" size="24">info</v-icon>
            <h2 class="text-xs-center subheader primary--text ml-2">{{ loadingMsg }}</h2>
          </v-layout>
          <v-layout justify-center>
            <v-progress-circular
              v-if="loading"
              :size="50"
              :width="5"
              :color="color"
              indeterminate
            />
          </v-layout>
        </v-flex>
        <v-flex class="mx-2" v-if="loaded" xs12>
          <v-layout
            v-if="loaded && $vuetify.breakpoint.mdAndUp"
            class="my-3"
            row
            fill-height
            align-center
            justify-center
          >
            <v-icon color="warning" size="32">warning</v-icon>
            <h3 class="text-xs-center headline warning--text ml-2">{{ loadedMsg }}</h3>
          </v-layout>
          <v-layout
            v-if="loaded && $vuetify.breakpoint.smAndDown"
            class="my-3"
            row
            fill-height
            align-center
            justify-center
          >
            <v-icon color="warning" size="24">warning</v-icon>
            <h2 class="text-xs-center subheader warning--text ml-2">{{ loadedMsg }}</h2>
          </v-layout>
        </v-flex>
        <v-flex class="mx-2" v-if="error" xs12>
          <v-layout
            v-if="error && $vuetify.breakpoint.mdAndUp"
            class="my-3"
            row
            fill-height
            align-center
            justify-center
          >
            <v-icon color="error" size="32">error</v-icon>
            <h2 class="text-xs-center headline error--text ml-2">{{ errorMsg }}</h2>
          </v-layout>
          <v-layout
            v-if="error && $vuetify.breakpoint.smAndDown"
            class="my-3"
            row
            fill-height
            align-center
            justify-center
          >
            <v-icon color="error" size="24">error</v-icon>
            <h2 class="text-xs-center subheader error--text ml-2">{{ errorMsg }}</h2>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-fade-transition>
    <v-fade-transition>
      <v-layout
        v-if="actionBtn && loaded || actionBtn && error"
        row
        fill-height
        justify-center
        align-center
      >
        <v-btn
          :color="$vuetify.theme.primary"
          dark
          @click="$emit('action-button-pressed')"
        >
          {{ actionBtnTitle }}
        </v-btn>
      </v-layout>
    </v-fade-transition>
  </v-layout>
</template>

<script>

export default {
  name: 'BaseDataTableInfoComponent',
  props: {
    // Messages
    loadingMsg: String,
    loadedMsg: String,
    errorMsg: String,
    color: String,
    // Bools
    loading: Boolean,
    loaded: Boolean,
    error: Boolean,
    actionBtn: {
      type: Boolean,
      default: false
    },
    // Titles
    actionBtnTitle: String
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
