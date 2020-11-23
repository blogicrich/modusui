<template>
  <v-container fluid>
    <v-layout align-center justify-center prepend-icon="event">
      <v-icon large>event</v-icon>
      <v-icon @click="subtractDay()" large title="Decrease date by one day">keyboard_arrow_left</v-icon>
      <v-menu ref="menu" v-model="menu" :close-on-content-click="false">
        <v-text-field
          v-if="$vuetify.breakpoint.lgAndUp"
          slot="activator"
          class="subheader font-weight-medium text-accent text-center"
          :value="formattedDate"
          readonly
          title="Pick a date"
        />
        <v-text-field
          v-if="$vuetify.breakpoint.mdAndDown"
          class="subheader font-weight-light text-accent"
          slot="activator"
          :value="formattedDate"
          readonly
          title="Pick a date"
        />
        <v-date-picker
          color="primary"
          color-header="primary"
          v-model="selectedDate"
          :max="maxDate"
          no-title
          scrollable
        >
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(selectedDate)">Ok</v-btn>
        </v-date-picker>
      </v-menu>
      <v-icon
        @click="addDay()"
        large
        :disabled="date === maxDate"
        title="Increase date by one day"
      >
        keyboard_arrow_right
      </v-icon>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'BaseDateSelectionComponent',
  props: {
    maxDate: String,
    date: String,
    formattedDate: String
  },
  data () {
    return {
      selectionTimeout: null,
      selectedDate: new Date().toISOString().substr(0, 10),
      menu: false
    }
  },
  watch: {
    selectedDate () {
      this.$emit('date-change', this.selectedDate)
    }
  },
  methods: {
    addDay () {
      this.$emit('add-day', this.date)
    },
    subtractDay () {
      this.$emit('subtract-day', this.date)
    }
  },
  beforeDestroy () {
    clearTimeout(this.selectionTimeout)
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
