<template>
  <v-container fluid>
    <v-layout class="ma-2" row fill-height justify-space-between>
      <v-card class="elevation-8 bg">
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout>
          <v-flex xs12>
          </v-flex>
        </v-layout>
      </v-container>
      </v-card>
      <v-layout class="ma-2" v-for="(tolerance, index) in tolerances" :key="index" column fill-height justify-space-around>
        <v-text-field
          v-for="(level, key) in tolerance" :key="key"
          class="ma-2 mx-4"
          :label="key"
          suffix="%"
          :placeholder="key"
          prepend-icon="local_drink"
          required
          type="number"
          v-model="tolerances[index][key]"
          @change="$emit('tolerance-changed', {level:level, value:tolerance[level]} )"
          box
          >{{ level }}
        </v-text-field>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'BaseToleranceSetter',
  data () {
    return {
      tols: ''
    }
  },
  props: {
    tolerances: Array
  },
  methods: {
    levelChanged () {
      // console.log(this.tolerances)
    }
  },
  mounted () {
    console.log("fjhdkshfkdjfhkjdsahkj: ", this.tolerances)
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
  .bg {
    width: 60%;
    border-radius: 12px;
    background-image: linear-gradient(red, green, $vuetify-primary, green, red,);
  }
</style>
