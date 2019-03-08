import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  customProperties: true,
  iconfont: 'md',
  theme: {
    primary: '#00A1CD',
    secondary: '#F2F4F4',
    accent: '#003C4D',
    success: '#3acd00',
    warning: '#cd9300',
    error: '#cd2c00',
  }
})
