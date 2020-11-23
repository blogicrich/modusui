import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/main.styl'

Vue.use(Vuetify, {
  options: {
    customProperties: true
  },
  theme: {
    primary: '#00A1CD',
    secondary: '#F2F4F4',
    accent: '#003C4D',
    success: '#3acd00',
    warning: '#cd9300',
    error: '#cd2c00'
  }
})
