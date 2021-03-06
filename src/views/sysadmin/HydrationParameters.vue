<template>
  <v-container fluid>
    <BaseViewHeader
      :headerIcon="headerIcon"
      :iconColor="iconColor"
      :headerText="headerText"
      hasDivider
      fullWidth
    />
    <transition-group name="fade" mode="in-out" appear>
      <BaseDataTableInfoCard
        key="hydrationParamsLoadingCard"
        v-if="paramsLoading || paramsError"
        errorMsg="Error Loading Hydration Parameters."
        loadingMsg="Loading Hydration Parameters..."
        :loading="paramsLoading"
        :loaded="!paramsLoading && !paramsError"
        :error="paramsError"
        :color="$vuetify.theme.primary"
        :actionBtn="true"
        actionBtnTitle="Reload Hydration Parameters"
        @action-button-pressed="$store.dispatch('fetchHydrationParameters')"
      />
      <v-layout
        key="hydrationParamsFields"
        v-if="!paramsLoading && !paramsError"
        row
        wrap
      >
        <!-- START OF DAY -->
        <v-layout column>
          <v-layout class="mx-4 mb-2 mt-3" v-if="$vuetify.breakpoint.mdAndUp" row align-center justify-start>
            <v-icon class="mr-3" medium color="primary">schedule</v-icon>
            <h2 class="title primary--text">Start of the Day</h2>
          </v-layout>
          <v-layout class="mx-4 mb-2 mt-1" v-if="$vuetify.breakpoint.smAndDown" row align-center justify-start>
            <v-icon class="mr-3" small color="primary">schedule</v-icon>
            <h3 class="title primary--text">Start of the Day</h3>
          </v-layout>
          <v-form ref="formStartOfDay" class="mx-4 py-2 border-primary" @keyup.enter="$event.target.nextElementSibling.focus()">
            <BaseToleranceSetter
              v-for="(parameter, index) in hydrationParameters"
              :key="parameter.lowerHydrationBoundaryId"
              class="baseToleranceSetter"
              color="warning"
              :fieldLabel="parameter.description"
              :fieldValue="Number(getterStartOfDayValue(parameter.alertBoundariesAlertTypeBandId))"
              :fieldId="parameter.lowerHydrationBoundary.bandBoundariesId"
              :rules="startOfDayValidation[parameter.description]"
              @field-value-changed="$store.commit('UPDATE_START', { index: index, value: $event.value })"
              @increment="$store.commit('INCREMENT_START', { index: index, value: $event.value })"
              @decrement="$store.commit('DECREMENT_START', { index: index, value: $event.value })"
            />
          </v-form>
        </v-layout>
        <!-- END OF DAY -->
        <v-layout column>
          <v-layout class="mx-4 mb-2 mt-3" v-if="$vuetify.breakpoint.mdAndUp" row align-center justify-start>
            <v-icon class="mr-3" medium color="primary">schedule</v-icon>
            <h2 class="title primary--text">End of the Day</h2>
          </v-layout>
          <v-layout class="mx-4 mb-2 mt-3" v-if="$vuetify.breakpoint.smAndDown" row align-center justify-start>
            <v-icon class="mr-3" small color="primary">schedule</v-icon>
            <h3 class=" title primary--text">End of the Day</h3>
          </v-layout>
          <v-form ref="formEndOfDay" class="mx-4 pb-3 border-primary">
            <BaseToleranceSetter
              v-for="(parameter, index) in hydrationParameters"
              :key="parameter.lowerHydrationBoundaryId"
              class="baseToleranceSetter"
              color="warning"
              :fieldLabel="parameter.description"
              :fieldValue="Number(getterEndOfDayValue(parameter.alertBoundariesAlertTypeBandId))"
              :fieldId="parameter.lowerHydrationBoundary.bandBoundariesId"
              :rules="endOfDayValidation[parameter.description]"
              @field-value-changed="$store.commit('UPDATE_END', { index: index, value: $event.value })"
              @increment="$store.commit('INCREMENT_END', { index: index, value: $event.value })"
              @decrement="$store.commit('DECREMENT_END', { index: index, value: $event.value })"
            />
          </v-form>
        </v-layout>
      </v-layout>
    </transition-group>
    <v-layout v-if="!paramsLoading && !paramsError && $vuetify.breakpoint.lgAndUp" row justify-center align-center>
      <v-btn
        :disabled="parametersPristine"
        class="root-nav-btn mt-3"
        @click="save"
        color="primary"
        large
      >
        Save
        <v-icon class="ma-1">save</v-icon>
      </v-btn>
      <v-btn
        :disabled="parametersPristine"
        class="root-nav-btn mt-3"
        @click="reset"
        color="primary"
        large
      >
        Reset
        <v-icon class="ma-1">refresh</v-icon>
      </v-btn>
    </v-layout>
    <v-speed-dial
      v-if="!paramsLoading && $vuetify.breakpoint.mdAndDown"
      :disabled="parametersPristine"
      v-model="fab"
      fixed
      :bottom="true"
      :right="true"
      direction="top"
      transition="v-fade-transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="primary"
          dark
          fab
        >
          <v-icon>edit</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
      </template>
      <v-btn
        @click="save"
        color="primary"
        fab
        dark
        small
      >
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn
        @click="reset"
        color="primary"
        fab
        dark
        small
      >
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-container>
</template>

<script>

import { mapState, mapGetters } from 'vuex'
import BaseToleranceSetter from '@/components/base/BaseToleranceSetterComponent.vue'
import BaseDataTableInfoCard from '@/components/base/BaseDataTableInfoComponent.vue'
import validation from '@/mixins/validation'

export default {
  name: 'HydrationParameters',
  mixins: [validation],
  components: {
    BaseToleranceSetter,
    BaseDataTableInfoCard
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'local_drink',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Hydration Parameters',
      // BaseToleranceSetter
      startOfDayValidation: {
        Dehydrated: [
          v => {
            if (this.numericDpRegEx.test(v)) {
              return true
            } else {
              return 'Numerical characters only'
            }
          },
          v => v <= 100 || 'Value cannot be higher than 100%',
          v => v >= 0 || 'Value cannot be lower than 0%'
        ],
        Hydrated: [
          v => {
            if (this.requiredRegEx.test(v)) {
              return true
            } else {
              return 'Field Required.'
            }
          },
          v => {
            if (this.numericDpRegEx.test(v)) {
              return true
            } else {
              return 'Numerical characters only'
            }
          },
          v => v < 100 || 'Value must be less than 100%',
          v => v > this.getterValidationValues.startDehydrated || 'Must be more than Dehydrated'
        ],
        'Over Hydrated': [
          v => {
            if (this.requiredRegEx.test(v)) {
              return true
            } else {
              return 'Field Required.'
            }
          },
          v => {
            if (this.numericDpRegEx.test(v)) {
              return true
            } else {
              return 'Numerical characters only'
            }
          },
          v => v > 100 || 'Value must be more than 100%'
        ],
        'Severely over hydrated': [
          v => {
            if (this.requiredRegEx.test(v)) {
              return true
            } else {
              return 'Field Required.'
            }
          },
          v => {
            if (this.numericDpRegEx.test(v)) {
              return true
            } else {
              return 'Numerical characters only'
            }
          },
          v => v > this.getterValidationValues.startOverHydrated || 'Value must be more than Over Hydrated.'
        ]
      },
      endOfDayValidation: {
        Dehydrated: [
          v => {
            if (this.numericDpRegEx.test(v)) {
              return true
            } else {
              return 'Numerical characters only'
            }
          },
          v => v <= 100 || 'Value cannot be higher than 100%',
          v => v >= 0 || 'Value cannot be lower than 0%'
        ],
        Hydrated: [
          v => {
            if (this.requiredRegEx.test(v)) {
              return true
            } else {
              return 'Field Required.'
            }
          },
          v => {
            if (this.numericDpRegEx.test(v)) {
              return true
            } else {
              return 'Numerical characters only'
            }
          },
          v => v < 100 || 'Value must be less than 100%',
          v => v >= 0 || 'Value cannot be lower than 0%',
          v => v > this.getterValidationValues.endDehydrated || 'Must be more than Dehydrated'
        ],
        'Over Hydrated': [
          v => {
            if (this.requiredRegEx.test(v)) {
              return true
            } else {
              return 'Field Required.'
            }
          },
          v => {
            if (this.numericDpRegEx.test(v)) {
              return true
            } else {
              return 'Numerical characters only'
            }
          },
          v => v > 100 || 'Value must be more than 100%'
        ],
        'Severely over hydrated': [
          v => {
            if (this.requiredRegEx.test(v)) {
              return true
            } else {
              return 'Field Required.'
            }
          },
          v => {
            if (this.numericDpRegEx.test(v)) {
              return true
            } else {
              return 'Numerical characters only'
            }
          },
          v => v > this.getterValidationValues.endOverHydrated || 'Value must be more than Over Hydrated.'
        ]
      },
      // Mobile action button
      fab: false
    }
  },
  computed: {
    ...mapState({
      hydrationParameters: state => state.hydrationOptions.hydrationParams,
      hydrationParametersClone: state => state.hydrationOptions._originalHydrationParams,
      // Booleans
      paramsLoading: state => state.hydrationOptions.hydrationParamsLoading,
      paramsError: state => state.hydrationOptions.hydrationParamsError
    }),
    ...mapGetters([
      'getterStartOfDayValue',
      'getterEndOfDayValue',
      'getterValidationValues'
    ]),
    parametersPristine () {
      let isPristine = true
      for (let i = 0; i < this.hydrationParameters.length; i++) {
        const el = this.hydrationParameters[i].lowerHydrationBoundary
        const elClone = this.hydrationParametersClone[i].lowerHydrationBoundary
        if (el.percentHydratedStart !== elClone.percentHydratedStart ||
            el.percentHydratedEnd !== elClone.percentHydratedEnd) {
          isPristine = false
          return
        }
      }
      return isPristine
    }
  },
  methods: {
    reset () {
      this.$store.dispatch('fetchHydrationParameters')
      this.$refs.formEndOfDay.reset()
      this.$refs.formStartOfDay.reset()
    },
    async save () {
      try {
        if (this.$refs.formEndOfDay.validate() && this.$refs.formStartOfDay.validate()) {
          await this.$store.dispatch('updateHydrationParameters')
        }
        this.$refs.formEndOfDay.validate()
        this.$refs.formStartOfDay.validate()
      } catch (error) {
        // STORE HANDLES ERROR
      }
    }
  },
  created () {
    this.$store.dispatch('fetchHydrationParameters')
  },
  beforeRouteLeave (to, from, next) {
    if (!this.parametersPristine && !window.confirm('Do you really want to leave? You will lose all unsaved changes!')) {
      return next(false)
    }
    next()
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
