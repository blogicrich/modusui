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
            @field-value-changed="boundaryChanged"
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
            @field-value-changed="boundaryChanged"
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
            @field-value-changed="boundaryChanged"
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
            @field-value-changed="boundaryChanged"
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
            @field-value-changed="boundaryChanged"
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
            @field-value-changed="boundaryChanged"
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
            @field-value-changed="boundaryChanged"
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
            @field-value-changed="boundaryChanged"
            @increment="increment"
            @decrement="decrement"
          />
        </v-form>
      </v-layout>
    </v-layout>
    <v-layout v-if="!paramsLoading && $vuetify.breakpoint.lgAndUp" row justify-center align-center>
      <v-btn
        :disabled="!defaultValuesChanged"
        class="root-nav-btn mt-3"
        @click="save"
        color="primary"
        large
        >Save
        <v-icon class="ma-1">save</v-icon>
      </v-btn>
      <v-btn
        :disabled="!defaultValuesChanged"
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
      // Booleans
      defaultValuesChanged: state => state.hydrationOptions.defaultHydrationParamsChanged,
      paramsLoading: state => state.hydrationOptions.hydrationParamsLoading,
      // Dehydrated
      dehydratedBoundaryStart: state => state.hydrationOptions.dehydrated.lowerBoundaryPercentHydratedStart,
      dehydratedBoundaryEnd: state => state.hydrationOptions.dehydrated.lowerBoundaryPercentHydratedEnd,
      dehydratedId: state => state.hydrationOptions.dehydrated.lowerHydrationBoundaryId,
      // Hydrated
      hydratedBoundaryStart: state => state.hydrationOptions.hydrated.lowerBoundaryPercentHydratedStart,
      hydratedBoundaryEnd: state => state.hydrationOptions.hydrated.lowerBoundaryPercentHydratedEnd,
      hydratedId: state => state.hydrationOptions.hydrated.lowerHydrationBoundaryId,
      // Over Hydrated
      overHydratedBoundaryStart: state => state.hydrationOptions.overHydrated.lowerBoundaryPercentHydratedStart,
      overHydratedBoundaryEnd: state => state.hydrationOptions.overHydrated.lowerBoundaryPercentHydratedEnd,
      overHydratedId: state => state.hydrationOptions.overHydrated.lowerHydrationBoundaryId,
      // Severely Over Hydrated
      severelyOverHydratedStart: state => state.hydrationOptions.severelyOverHydrated.lowerBoundaryPercentHydratedStart,
      severelyOverHydratedEnd: state => state.hydrationOptions.severelyOverHydrated.lowerBoundaryPercentHydratedEnd,
      severelyOverHydratedId: state => state.hydrationOptions.severelyOverHydrated.lowerHydrationBoundaryId
    })
  },
  methods: {
    boundaryChanged (e) {
      this.$store.commit('UPDATE_HYDRATION_PARAM', e)
      console.log(this.dehydratedBoundaryStart, e)
    },
    decrement (e) {
      this.$store.commit('DECREMENT_PARAM', e)
    },
    increment (e) {
      this.$store.commit('INCREMENT_PARAM', e)
    },
    reset () {
      this.$store.dispatch('refreshHydrationParameters')
    },
    save () {
      const formEndOfDay = this.$refs.formEndOfDay.validate()
      const formStartOfDay = this.$refs.formStartOfDay.validate()
      if (formEndOfDay && formStartOfDay) this.$store.dispatch('updateHydrationParameters')
    }
  },
  mounted () {
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
