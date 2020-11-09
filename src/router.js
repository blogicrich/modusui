import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

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
      beforeEnter: (to, from, next) => {
        if (store.state.eDropletApp.authenticated) {
          if (store.state.eDropletApp.level && store.state.eDropletApp.level.includes('CARER')) {
            next('/carer/dashboard')
          } else {
            next('/landing')
          }
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/common/Login.vue')
    },
    {
      path: '/error',
      name: 'Error',
      component: () => import(/* webpackChunkName: "about" */ './views/common/Error.vue')
    },
    {
      path: '/landing',
      name: 'landing',
      component: () => import(/* webpackChunkName: "landing" */ './views/common/Landing.vue')
    },
    {
      path: '/passwordreset',
      name: 'PasswordReset',
      component: () => import(/* webpackChunkName: "password-reset" */ './views/common/ForgotPassword.vue')
    },

    // Carer routes

    {
      path: '/carer/:view',
      name: 'BaseCarerView',
      props: true,
      component: () => import(/* webpackChunkName: "carer-view" */ './components/base/BaseCarerView.vue'),
      children: [
        {
          path: '/carer/additionaldrinks',
          name: 'additionaldrinks',
          component: () => import(/* webpackChunkName: "additional-drinks" */ './views/carer/AdditionalDrinks.vue')
        },
        {
          path: '/carer/alerts',
          name: 'alerts',
          component: () => import(/* webpackChunkName: "alerts" */ './views/carer/Alerts.vue')
        },
        {
          path: '/carer/away',
          name: 'away',
          component: () => import(/* webpackChunkName: "away" */ './views/carer/Away.vue')
        },
        {
          path: '/carer/dailyreport',
          name: 'dailyreport',
          component: () => import(/* webpackChunkName: "settings-reports" */ './views/carer/DailyReport.vue')
        },
        {
          path: '/carer/dashboard',
          name: 'dashboard',
          component: () => import(/* webpackChunkName: "settings-reports" */ './views/carer/Dashboard.vue')
        }
      ]
    },

    // Cliadmin routes

    {
      path: '/personaldetails',
      name: 'PersonalDetails',
      component: () => import(/* webpackChunkName: "personal-details" */ './views/cliadmin/PersonalDetails.vue')
    },
    {
      path: '/usercondition',
      name: 'UserCondition',
      component: () => import(/* webpackChunkName: "user-condition" */ './views/cliadmin/UserCondition.vue')
    },
    {
      path: '/edropletmanagement',
      name: 'EdropletManagement',
      component: () => import(/* webpackChunkName: "edroplet-management" */ './views/cliadmin/EdropManagement.vue')
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
      component: () => import(/* webpackChunkName: "conditions-options" */ './views/sysadmin/ConditionsOptions.vue')
    },
    {
      path: '/containertypes',
      name: 'ContainerTypes',
      component: () => import(/* webpackChunkName: "container-types" */ './views/sysadmin/ContainerTypes.vue')
    },
    {
      path: '/genderoptions',
      name: 'GenderOptions',
      component: () => import(/* webpackChunkName: "gender-options" */ './views/sysadmin/GenderOptions.vue')
    },
    {
      path: '/hydrationparameters',
      name: 'HydrationParameters',
      component: () => import(/* webpackChunkName: "hydration-parameters" */ './views/sysadmin/HydrationParameters.vue')
    },
    {
      path: '/systemadmins',
      name: 'SystemAdmins',
      component: () => import(/* webpackChunkName: "system-admins" */ './views/sysadmin/SystemAdmins.vue')
    },
    {
      path: '/textmessages',
      name: 'TextMessages',
      component: () => import(/* webpackChunkName: "text-messages" */ './views/sysadmin/TextMessages.vue')
    },
    {
      path: '/intervaloptions',
      name: 'IntervalOptions',
      component: () => import(/* webpackChunkName: "interval-options" */ './views/sysadmin/IntervalOptions.vue')
    },
    {
      path: '/titles',
      name: 'Titles',
      component: () => import(/* webpackChunkName: "titles" */ './views/sysadmin/Titles.vue')
    },

    // Unregistered users and ByteSnap Landing Page

    {
      path: '/register',
      name: 'Registration',
      props: (route) => ({ unsanitizedMacAddress: route.query.macAddress }),
      component: () => import(/* webpackChunkName: "register" */ './views/unregistered/Registration.vue')
    }
  ]
})
