import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/main.styl'

Vue.use(Vuetify, {
  customProperties: true,
  // iconfont: 'md',
  // iconfont: 'mdi',
  // icons: {
  //   // Admin Icons
  // mdi-local_drink'
  // local_pharmacy
  // settings
  // record_voice_over
  // notification_important
  // record_voice_over
  // Person

  //   // Alert Icons

  //   // App Navigation icons

  //   // Chart Icons

  //   // Locations Tree

  //   // Monitor Type icons

  //   // Sensor UI icons

  // },
  theme: {
    primary: '#00A1CD',
    secondary: '#F2F4F4',
    accent: '#003C4D',
    success: '#3acd00',
    warning: '#cd9300',
    error: '#cd2c00'
  }
})
