<template>
  <v-container fluid>
    <v-layout align-center justify-center prepend-icon="event">
      <v-icon large>event</v-icon>
      <v-icon @click="subtractDay()" large title="Decrease date by one day">keyboard_arrow_left</v-icon>
      <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date">
        <v-text-field slot="activator" :value="formattedDate" readonly title="Pick a date"></v-text-field>
        <v-date-picker
          color="primary"
          color-header="primary"
          v-model="date"
          :max="maxDate"
          no-title
          scrollable
          reactive
        >
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(date)">Ok</v-btn>
        </v-date-picker>
      </v-menu>
      <v-icon
        @click="addDay()"
        large
        :disabled="date === maxDate"
        title="Increase date by one day"
      >keyboard_arrow_right</v-icon>
    </v-layout>
    </v-container>
</template>

<script>

export default {
  name: 'BaseDateSelectionComponent',
  computed: {
    formattedDate () {
      return this.$moment(this.date).format('L')
    }
  },
  data () {
    return {
      date: null,
      menu: false,
      maxDate: this.$moment().format('YYYY-MM-DD')
    }
  },
  watch: {
    date () {
      this.$emit('dateChange', this.date)
    }
  },
  methods: {
    addDay () {
      this.date = this.$moment(this.date, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD')
    },

    subtractDay () {
      this.date = this.$moment(this.date).subtract(1, 'day').format('YYYY-MM-DD')
    }
  },
  mounted () {
    this.date = this.$moment(Date.now()).format('YYYY-MM-DD')
  }
}
</script>

