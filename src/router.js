import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [

    // fallback

    {
      path: '*',
      redirect: '/'
    },

    // Common routes

    {
      path: '/',
      redirect: { name: 'Login' }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ './views/common/Login.vue')
    },
    {
      path: '/error',
      name: 'Error',
      component: () => import(/* webpackChunkName: "about" */ './views/common/Error.vue')
    },
    {
      path: '/landing',
      name: 'Landing',
      component: () => import(/* webpackChunkName: "landing" */ './views/common/Landing.vue')
    },
    {
      path: '/passwordreset',
      name: 'PasswordReset',
      component: () => import(/* webpackChunkName: "password-reset" */ './views/common/ForgotPassword.vue')
    },

    // Carer routes
    {
      path: '/additionaldrinks',
      name: 'AdditionalDrinks',
      component: () => import(/* webpackChunkName: "additional-drinks" */ './views/carer/AdditionalDrinks.vue')
    },
    {
      path: '/alerts',
      name: 'Alerts',
      component: () => import(/* webpackChunkName: "alerts" */ './views/carer/Alerts.vue')
    },
    {
      path: '/away',
      name: 'Away',
      component: () => import(/* webpackChunkName: "away" */ './views/carer/Away.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/carer/Dashboard.vue')
    },
    {
      path: '/reports',
      name: 'Reports',
      component: () => import(/* webpackChunkName: "reports" */ './views/carer/Reports.vue')
    },
    {
      path: '/settingsreports',
      name: 'SettingsReports',
      component: () => import(/* webpackChunkName: "settings-reports" */ './views/carer/SettingsReports.vue')
    },
    {
      path: '/consumptioncalendar',
      name: 'ConsumptionCalendar',
      component: () => import(/* webpackChunkName: "consumption-calendar" */ './views/carer/ConsumptionCalendar.vue')
    },

    // Cliadmin routes

    {
      path: '/personaldetails',
      name: 'PersonalDetails',
      component: () => import(/* webpackChunkName: "about" */ './views/cliadmin/PersonalDetails.vue')
    },
    {
      path: '/conditions',
      name: 'Conditions',
      component: () => import(/* webpackChunkName: "about" */ './views/cliadmin/Conditions.vue')
    },
    {
      path: '/edropletmanagement',
      name: 'EdropletManagement',
      component: () => import(/* webpackChunkName: "about" */ './views/cliadmin/EdropManagement.vue')
    },
    {
      path: '/intervalmanagement',
      name: 'IntervalManagement',
      component: () => import(/* webpackChunkName: "interval-options" */ './views/cliadmin/IntervalSettingsManagement.vue')
    },
    {
      path: '/wakesleeptimes',
      name: 'WakeSleepTimes',
      component: () => import(/* webpackChunkName: "voice-messages" */ './views/cliadmin/WakeSleepTimes.vue')
    },

    // Sysadmin routes

    {
      path: '/conditionsoptions',
      name: 'ConditionsOptions',
      component: () => import(/* webpackChunkName: "about" */ './views/sysadmin/ConditionsOptions.vue')
    },
    {
      path: '/containertypes',
      name: 'ContainerTypes',
      component: () => import(/* webpackChunkName: "about" */ './views/sysadmin/ContainerTypes.vue')
    },
    {
      path: '/genderoptions',
      name: 'GenderOptions',
      component: () => import(/* webpackChunkName: "about" */ './views/sysadmin/GenderOptions.vue')
    },
    {
      path: '/hydrationparameters',
      name: 'HydrationParameters',
      component: () => import(/* webpackChunkName: "about" */ './views/sysadmin/HydrationParameters.vue')
    },
    {
      path: '/systemadmins',
      name: 'SystemAdmins',
      component: () => import(/* webpackChunkName: "about" */ './views/sysadmin/SystemAdmins.vue')
    },
    {
      path: '/textmessages',
      name: 'TextMessages',
      component: () => import(/* webpackChunkName: "about" */ './views/sysadmin/TextMessages.vue')
    },
    {
      path: '/intervaloptions',
      name: 'IntervalOptions',
      component: () => import(/* webpackChunkName: "about" */ './views/sysadmin/IntervalOptions.vue')
    },
    {
      path: '/titles',
      name: 'Titles',
      component: () => import(/* webpackChunkName: "about" */ './views/sysadmin/Titles.vue')
    },

    // Unregistered users and ByteSnap Landing Page

    {
      path: '/register',
      name: 'Registration',
      props: (route) => ({ unsanitizedMacAddress: route.query.macAddress }),
      component: () => import(/* webpackChunkName: "about" */ './views/unregistered/Registration.vue')
    }
  ]
})
