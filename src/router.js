import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/common/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '',
      redirect: { name: 'Login' },
      component: Login
    },
    // Common routes
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/landing',
      name: 'Landing',
      component: () => import(/* webpackChunkName: "about" */ './views/common/Landing.vue')
    },
    {
      path: '/intervaloptions',
      name: 'IntervalOptions',
      component: () => import(/* webpackChunkName: "about" */ './views/common/IntervalOptions.vue')
    },
    {
      path: '/voicemessages',
      name: 'VoiceMessages',
      component: () => import(/* webpackChunkName: "about" */ './views/common/VoiceMessages.vue')
    },
    // Cliadmin routes
    {
      path: '/carersettings',
      name: 'CarerSettings',
      component: () => import(/* webpackChunkName: "about" */ './views/cliadmin/CarerAlertSettings.vue')
    },
    {
      path: '/carersettings',
      name: 'CarerSettings',
      component: () => import(/* webpackChunkName: "about" */ './views/cliadmin/CarerSettings.vue')
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
