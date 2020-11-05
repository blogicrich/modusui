import apiLib from '../services/apiLib.js'

export const moduleCommonData = {
  state: {
    commonDataLoadState: true,
    genderOptions: [],
    conditionOptions: [],
    intervalOptions: [],
    containerTypes: []
  },
  mutations: {
    SET_GENDER_OPTIONS (state, data) {
      state.genderOptions = data
    },
    SET_CONDITION_OPTIONS (state, data) {
      state.conditionOptions = data
    },
    SET_INTERVAL_OPTIONS (state, data) {
      state.intervalOptions = data
    },
    SET_CONTAINER_TYPES (state, data) {
      state.containerTypes = data
    },
    SET_COMMON_DATA_LOAD_STATE (state, data) {
      state.commonDataLoadState = data
    }
  },
  actions: {
    async fetchCommonData ({ commit, dispatch }) {
      commit('SET_COMMON_DATA_LOAD_STATE', true)
      Promise.all([
        dispatch('fetchGenderOptions'),
        dispatch('fetchConditionOptions'),
        dispatch('fetchIntervalOptions'),
        dispatch('fetchContainerTypes'),
        dispatch('fetchGenderOptions')
      ])
        .then(
          commit('SET_COMMON_DATA_LOAD_STATE', false)
        )
    },
    async fetchGenderOptions (context) {
      apiLib.getData('common/gender-options/').then((response) => {
        if (typeof response === 'undefined') {
          context.commit('SET_GENDER_OPTIONS', [])
        } else {
          context.commit('SET_GENDER_OPTIONS', response)
        }
      })
    },
    async fetchConditionOptions (context) {
      apiLib.getData('common/condition-options/').then((response) => {
        if (typeof response === 'undefined') {
          context.commit('SET_CONDITION_OPTIONS', [])
        } else {
          context.commit('SET_CONDITION_OPTIONS', response)
        }
      })
    },
    async fetchIntervalOptions (context) {
      apiLib.getData('common/interval-options/').then((response) => {
        if (typeof response === 'undefined') {
          context.commit('SET_INTERVAL_OPTIONS', [])
        } else {
          context.commit('SET_INTERVAL_OPTIONS', response)
        }
      })
    },
    async fetchContainerTypes (context) {
      apiLib.getData('common/container-types/').then((response) => {
        if (typeof response === 'undefined') {
          context.commit('SET_CONTAINER_TYPES', [])
        } else {
          context.commit('SET_CONTAINER_TYPES', response)
        }
      })
    }
  },
  getters: {

  }
}
