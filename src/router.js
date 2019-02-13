import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/common/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // Common routes
    {
      path: '/login',
      name: 'Login',
      component: Login
      // redirect: { name: 'Login' }
    },
    // Carer routes
    {
      path: '/additionaldrinks',
      name: 'AdditionalDrinks',
      component: () => import(/* webpackChunkName: "about" */ './views/carer/AdditionalDrinks.vue')
    },
    {
      path: '/alerts',
      name: 'Alerts',
      component: () => import(/* webpackChunkName: "about" */ './views/carer/Alerts.vue')
    },
    {
      path: '/away',
      name: 'Away',
      component: () => import(/* webpackChunkName: "about" */ './views/carer/Away.vue')
    },
    {
      path: '/userconditions',
      name: 'UserConditions',
      component: () => import(/* webpackChunkName: "about" */ './views/carer/UserConditions.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import(/* webpackChunkName: "about" */ './views/carer/Dashboard.vue')
    },
    {
      path: '/reports',
      name: 'Reports',
      component: () => import(/* webpackChunkName: "about" */ './views/carer/Reports.vue')
    },
    {
      path: '/settingsreports',
      name: 'SettingsReports',
      component: () => import(/* webpackChunkName: "about" */ './views/carer/SettingsReports.vue')
    },
    // Cliadmin routes
    {
      path: '/carersettings',
      name: 'CarerSettings',
      component: () => import(/* webpackChunkName: "about" */ './views/cliadmin/CarerAlertSettings.vue')
    },
    {
      path: '/conditions',
      name: 'Conditions',
      component: () => import(/* webpackChunkName: "about" */ './views/cliadmin/Conditions.vue')
    },
    {
      path: '/eDropletManagemet',
      name: 'eDropletManagement',
      component: () => import(/* webpackChunkName: "about" */ './views/cliadmin/eDropletManagement.vue')
    },
    {
      path: '/personneldetails',
      name: 'PersonnelDetails',
      component: () => import(/* webpackChunkName: "about" */ './views/cliadmin/Users.vue')
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
      path: '/defaultintervals',
      name: 'DefaultIntervals',
      component: () => import(/* webpackChunkName: "about" */ './views/sysadmin/Titles.vue')
    },
    {
      path: '/titles',
      name: 'Titles',
      component: () => import(/* webpackChunkName: "about" */ './views/sysadmin/Titles.vue')
    }
  ]
})
