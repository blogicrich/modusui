<template>
  <v-container fluid>
    <BaseViewHeader
      :headerIcon="headerIcon"
      :iconColor="iconColor"
      :headerText="headerText"
      hasDivider
    />
    <v-layout row wrap v-if="!paramsLoading">

      <!-- START OF DAY -->

      <v-layout column>
        <v-layout class="mx-4 mb-2 mt-3" v-if="$vuetify.breakpoint.mdAndUp" row align-center justify-start>
          <v-icon class="mr-3" medium color="primary">schedule</v-icon>
          <h2 class="text-primary">Start of the Day</h2>
        </v-layout>
        <v-layout class="mx-4 mb-2 mt-1" v-if="$vuetify.breakpoint.smAndDown" row align-center justify-start>
          <v-icon class="mr-3" small color="primary">schedule</v-icon>
          <h3 class="text-primary">Start of the Day</h3>
        </v-layout>
        <v-form ref="formStartOfDay" class="mx-4 py-2 border-primary">
          <BaseToleranceSetter
            class="baseToleranceSetter"
            color="warning"
            :fieldLabel="$vuetify.breakpoint.lgAndUp ? 'Dehydrated - Amber Red Boundary:' : 'Dehydrated' "
            :fieldValue="Number(dehydratedBoundaryStart)"
            :fieldId="dehydratedId"
            period="start"
            :rules="startOfDayValidation.dehydrated"
            @field-value-changed="$store.commit('UPDATE_DEHYDRATED_START', $event)"
            @increment="increment"
            @decrement="decrement"
          />
          <BaseToleranceSetter
            class="baseToleranceSetter"
            color="success"
            :fieldLabel="$vuetify.breakpoint.lgAndUp ? 'Hydrated - Green Amber Boundary:' : 'Hydrated' "
            :fieldValue="Number(hydratedBoundaryStart)"
            :fieldId="hydratedId"
            period="start"
            :rules="startOfDayValidation.hydrated"
            @field-value-changed="$store.commit('UPDATE_HYDRATED_START', $event)"
            @increment="increment"
            @decrement="decrement"
          />
          <BaseToleranceSetter
            class="baseToleranceSetter"
            color="error"
            :fieldLabel="$vuetify.breakpoint.lgAndUp ? 'Over Hydrated - Red Amber Boundary:' : 'Over Hydrated' "
            :fieldValue="Number(overHydratedBoundaryStart)"
            :fieldId="overHydratedId"
            period="start"
            :rules="startOfDayValidation.overHydrated"
            @field-value-changed="$store.commit('UPDATE_OVERHYDRATED_START', $event)"
            @increment="increment"
            @decrement="decrement"
          />
          <BaseToleranceSetter
            class="baseToleranceSetter"
            color="error"
            :fieldLabel="$vuetify.breakpoint.lgAndUp ? 'Severely Over Hydrated - Red Amber Boundary:' : 'Severely Over Hydrated' "
            :fieldValue="Number(severelyOverHydratedStart)"
            :fieldId="severelyOverHydratedId"
            period="start"
            :rules="startOfDayValidation.severelyOverHydrated"
            @field-value-changed="$store.commit('UPDATE_SEVERLEY_OVERHYDRATED_START', $event)"
            @increment="increment"
            @decrement="decrement"
          />
        </v-form>
      </v-layout>

      <!-- END OF DAY -->

      <v-layout column>
        <v-layout class="mx-4 mb-2 mt-3" v-if="$vuetify.breakpoint.mdAndUp" row align-center justify-start>
          <v-icon class="mr-3" medium color="primary">schedule</v-icon>
          <h2 class="text-primary">End of the Day</h2>
        </v-layout>
        <v-layout class="mx-4 mb-2 mt-3" v-if="$vuetify.breakpoint.smAndDown" row align-center justify-start>
          <v-icon class="mr-3" small color="primary">schedule</v-icon>
          <h3 class="text-primary">End of the Day</h3>
        </v-layout>
        <v-form ref="formEndOfDay" class="mx-4 pb-3 border-primary">
          <BaseToleranceSetter
            class="baseToleranceSetter"
            color="warning"
            :fieldLabel="$vuetify.breakpoint.lgAndUp ? 'Dehydrated - Amber Red Boundary:' : 'Dehydrated' "
            :fieldValue="Number(dehydratedBoundaryEnd)"
            :fieldId="dehydratedId"
            period="end"
            :rules="endOfDayValidation.dehydrated"
            @field-value-changed="$store.commit('UPDATE_DEHYDRATED_END', $event)"
            @increment="increment"
            @decrement="decrement"
          />
          <BaseToleranceSetter
            class="baseToleranceSetter"
            color="success"
            :fieldLabel="$vuetify.breakpoint.lgAndUp ? 'Hydrated - Green Amber Boundary:' : 'Hydrated' "
            :fieldValue="Number(hydratedBoundaryEnd)"
            :fieldId="hydratedId"
            period="end"
            :rules="endOfDayValidation.hydrated"
            @field-value-changed="$store.commit('UPDATE_HYDRATED_END', $event)"
            @increment="increment"
            @decrement="decrement"
          />
          <BaseToleranceSetter
            class="baseToleranceSetter"
            color="error"
            :fieldLabel="$vuetify.breakpoint.lgAndUp ? 'Over Hydrated - Red Amber Boundary:' : 'Over Hydrated' "
            :fieldValue="Number(overHydratedBoundaryEnd)"
            :fieldId="overHydratedId"
            period="end"
            :rules="endOfDayValidation.overHydrated"
            @field-value-changed="$store.commit('UPDATE_OVERHYDRATED_END', $event)"
            @increment="increment"
            @decrement="decrement"
          />
          <BaseToleranceSetter
            class="baseToleranceSetter"
            color="error"
            :fieldLabel="$vuetify.breakpoint.lgAndUp ? 'Severely Over Hydrated - Red Amber Boundary:' : 'Severely Over Hydrated' "
            :fieldValue="Number(severelyOverHydratedEnd)"
            :fieldId="severelyOverHydratedId"
            period="end"
            :rules="endOfDayValidation.severelyOverHydrated"
            @field-value-changed="$store.commit('UPDATE_SEVERLEY_OVERHYDRATED_END', $event)"
            @increment="increment"
            @decrement="decrement"
          />
        </v-form>
      </v-layout>
    </v-layout>
    <v-layout v-if="!paramsLoading && $vuetify.breakpoint.lgAndUp" row justify-center align-center>
      <v-btn
        :disabled="defaultValuesChanged"
        class="root-nav-btn mt-3"
        @click="save"
        color="primary"
        large
        >Save
        <v-icon class="ma-1">save</v-icon>
      </v-btn>
      <v-btn
        :disabled="defaultValuesChanged"
        class="root-nav-btn mt-3"
        @click="reset"
        color="primary"
        large
        >Reset
        <v-icon class="ma-1">refresh</v-icon>
      </v-btn>
    </v-layout>
    <v-speed-dial
      v-if="!paramsLoading && defaultValuesChanged && $vuetify.breakpoint.mdAndDown"
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

import { mapState } from 'vuex'
import BaseToleranceSetter from '@/components/base/BaseToleranceSetterComponent.vue'
import validation from '@/mixins/validation'

export default {
  name: 'HydrationParameters',
  mixins: [validation],
  components: {
    BaseToleranceSetter
  },
  data () {
    return {
      // BaseViewHeader
      defaultValuesChanged: false,
      headerIcon: 'local_drink',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Hydration Parameters',
      fab: false,
      startOfDayValidation: {
        dehydrated: [
          v => {
            if (this.numericalRegEx.test(v)) {
              return true
            } else {
              return 'Numerical characters only'
            }
          },
          v => v <= 100 || 'Value cannot be higher than 100%',
          v => v >= 0 || 'Value cannot be lower than 0%'
        ],
        hydrated: [
          v => {
            if (this.requiredRegEx.test(v)) {
              return true
            } else {
              return 'Field Required.'
            }
          },
          v => {
            if (this.numericalRegEx.test(v)) {
              return true
            } else {
              return 'Numerical characters only'
            }
          },
          v => v < 100 || 'Value must be less than 100%',
          v => v < this.dehydratedBoundaryStart || 'Must be less than dehydrated'
        ],
        overHydrated: [
          v => {
            if (this.requiredRegEx.test(v)) {
              return true
            } else {
              return 'Field Required.'
            }
          },
          v => {
            if (this.numericalRegEx.test(v)) {
              return true
            } else {
              return 'Numerical characters only'
            }
          },
          v => v > 100 || 'Value must be more than 100%'
        ],
        severelyOverHydrated: [
          v => {
            if (this.requiredRegEx.test(v)) {
              return true
            } else {
              return 'Field Required.'
            }
          },
          v => {
            if (this.numericalRegEx.test(v)) {
              return true
            } else {
              return 'Numerical characters only'
            }
          },
          v => v > this.overHydratedBoundaryStart || 'Value must be more than Over Hydrated.'
        ]
      },
      endOfDayValidation: {
        dehydrated: [
          v => {
            if (this.numericalRegEx.test(v)) {
              return true
            } else {
              return 'Numerical characters only'
            }
          },
          v => v <= 100 || 'Value cannot be higher than 100%',
          v => v >= 0 || 'Value cannot be lower than 0%'
        ],
        hydrated: [
          v => {
            if (this.requiredRegEx.test(v)) {
              return true
            } else {
              return 'Field Required.'
            }
          },
          v => {
            if (this.numericalRegEx.test(v)) {
              return true
            } else {
              return 'Numerical characters only'
            }
          },
          v => v < 100 || 'Value must be less than 100%',
          v => v >= 0 || 'Value cannot be lower than 0%',
          v => v < this.dehydratedBoundaryEnd || 'Must be less than deHydrated'
        ],
        overHydrated: [
          v => {
            if (this.requiredRegEx.test(v)) {
              return true
            } else {
              return 'Field Required.'
            }
          },
          v => {
            if (this.numericalRegEx.test(v)) {
              return true
            } else {
              return 'Numerical characters only'
            }
          },
          v => v > 100 || 'Value must be more than 100%'
        ],
        severelyOverHydrated: [
          v => {
            if (this.requiredRegEx.test(v)) {
              return true
            } else {
              return 'Field Required.'
            }
          },
          v => {
            if (this.numericalRegEx.test(v)) {
              return true
            } else {
              return 'Numerical characters only'
            }
          },
          v => v > this.overHydratedBoundaryEnd || 'Value must be more than Over Hydrated.'
        ]
      }
    }
  },
  computed: {
    ...mapState({
      hydrationParameters: state => state.hydrationOptions.hydrationParams,
      hydrationParametersClone: state => state.hydrationOptions.hydrationParamsClone,
      // Booleans
      paramsLoading: state => state.hydrationOptions.hydrationParamsLoading,
      // Dehydrated
      dehydratedBoundaryStart: state => {
        return state.hydrationOptions.hydrationParams.find(e => e.description === 'Dehydrated').lowerHydrationBoundary.percentHydratedStart
      },
      dehydratedBoundaryEnd: state => {
        return state.hydrationOptions.hydrationParams.find(e => e.description === 'Dehydrated').lowerHydrationBoundary.percentHydratedEnd
      },
      dehydratedId: state => {
        return state.hydrationOptions.hydrationParams.find(e => e.description === 'Dehydrated').lowerHydrationBoundaryId
      },
      // // Hydrated
      hydratedBoundaryStart: state => {
        return state.hydrationOptions.hydrationParams.find(e => e.description === 'Hydrated').lowerHydrationBoundary.percentHydratedStart
      },
      hydratedBoundaryEnd: state => {
        return state.hydrationOptions.hydrationParams.find(e => e.description === 'Hydrated').lowerHydrationBoundary.percentHydratedEnd
      },
      hydratedId: state => {
        return state.hydrationOptions.hydrationParams.find(e => e.description === 'Hydrated').lowerHydrationBoundaryId
      },
      // // Over Hydrated
      overHydratedBoundaryStart: state => {
        return state.hydrationOptions.hydrationParams.find(e => e.description === 'Over Hydrated').lowerHydrationBoundary.percentHydratedStart
      },
      overHydratedBoundaryEnd: state => {
        return state.hydrationOptions.hydrationParams.find(e => e.description === 'Over Hydrated').lowerHydrationBoundary.percentHydratedEnd
      },
      overHydratedId: state => {
        return state.hydrationOptions.hydrationParams.find(e => e.description === 'Over Hydrated').lowerHydrationBoundaryId
      },
      // Severely Over Hydrated
      severelyOverHydratedStart: state => {
        return state.hydrationOptions.hydrationParams.find(e => e.description === 'Severely over hydrated').lowerHydrationBoundary.percentHydratedStart
      },
      severelyOverHydratedEnd: state => {
        return state.hydrationOptions.hydrationParams.find(e => e.description === 'Severely over hydrated').lowerHydrationBoundary.percentHydratedEnd
      },
      severelyOverHydratedId: state => {
        return state.hydrationOptions.hydrationParams.find(e => e.description === 'Severely over hydrated').lowerHydrationBoundaryId
      },
    })
  },
  methods: {
    checkValues () {
      console.log(this.hydrationParameters, this.hydrationParametersClone)
      let matched = this.hydrationParameters.forEach((element) => this.hydrationParametersClone.forEach((clone) => {
        if (element.lowerHydrationBoundary.percentHydratedStart !== clone.lowerHydrationBoundary.percentHydratedStart ||
            element.lowerHydrationBoundary.percentHydratedEnd !== clone.lowerHydrationBoundary.percentHydratedEnd) {
              return false
            }
        }))
      return matched
    },
    decrement (e) {
      this.$store.commit('DECREMENT_PARAMETER', e)
      this.checkValues()
    },
    increment (e) {
      this.$store.commit('INCREMENT_PARAMETER', e)
      this.checkValues()
    },
    reset () {
      this.$store.dispatch('refreshHydrationParameters')
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
        // TBI
      }
    }
  },
  created () {
    this.$store.dispatch('fetchHydrationParameters')
  },
  beforeRouteLeave (to, from, next) {
    if (this.defaultValuesChanged && !window.confirm('Do you really want to leave? You will lose all unsaved changes!')) {
      return next(false)
    }
    next()
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
