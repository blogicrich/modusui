import apiLib from '../services/apiLib.js'

export const moduleCliAdminUserConditions = {
  state: {
    cliAdminUserConditions: [],
    cliAdminSelectedUserConditions: {},
    cliAdminNewUserConditions: [],
    cliAdminUserConditionsLoading: false,
    cliAdminUserConditionsError: false,
    cliAdminUserConditionsUpdating: false,
    cliAdminUserConditionsDeleting: false
  },
  mutations: {
    SET_CLIADMIN_USER_CONDITIONS (state, data) {
      state.cliAdminUserConditions = data
    },
    // Selected Conditions
    SET_SELECTED_USER_CONDITIONS (state, data) {
      if (!data && state.cliAdminSelectedUserConditions.userId) {
        const userData = state.cliAdminUserConditions.find((e) => e.userId === state.cliAdminSelectedUserConditions.userId)
        state.cliAdminSelectedUserConditions = {
          userId: userData.userId,
          username: userData.username,
          status: userData.status,
          conditions: setSelected(userData)
        }
      } else {
        state.cliAdminSelectedUserConditions = {
          userId: data.userId,
          username: data.username,
          status: data.status,
          conditions: (setSelected(data))
        }
      }
    },
    UPDATE_SELECTED_USER_CONDITIONS (state, data) {
      const value = data.value
      state.cliAdminSelectedUserConditions.conditions[data.index][data.parameter] = value
    },
    RESET_SELECTED_USER_CONDITION (state, data) {
      const pristineValue = state.cliAdminUserConditions.find((e) => e.userId === data.userId).conditions
      state.cliAdminSelectedUserConditions.conditions[data.index].hydrationAdjustment = pristineValue[data.index].hydrationAdjustment
    },
    // New Conditions
    SET_NEW_USER_CONDITIONS (state, data) {
    },
    REMOVE_NEW_USER_CONDITION (state, data) {
    },
    REMOVE_NEW_USER_CONDITIONS (tate, data) {
    },
    // Store
    SET_CLIADMIN_USER_CONDITIONS_LOAD_STATE (state, data) {
      state.cliAdminUserConditionsLoading = data
    },
    SET_CLIADMIN_USER_CONDITIONS_ERROR (state, data) {
      state.cliAdminUserConditionsError = data
    },
    SET_CLIADMIN_USER_CONDITIONS_UPDATE_STATE (state, data) {
      state.cliAdminUserConditionsUpdating = data
    },
    SET_CLIADMIN_USER_CONDITIONS_DELETE_STATE (state, data) {
      state.cliAdminUserConditionsDeleting = data
    },
    RESET_CLIADMIN_USER_CONDITIONS_STATE (state) {
      state.cliAdminUserConditions = []
      state.cliAdminUserConditionsClone = []
      state.cliAdminSelectedUserConditions = {}
      state.cliAdminUserConditionsLoading = false
      state.cliAdminUserConditionsError = false
    }
  },
  actions: {
    async fetchCliAdminUserConditions (context) {
      try {
        // Check if users in rootState
        if (!context.rootState.cliAdminUsers.cliAdminUsers.length) await context.dispatch('fetchCliAdminUsers')
        if (!context.rootState.commonData.conditionOptions.length) await context.dispatch('fetchCommonData')
        // Get users from fromState
        const users = context.rootState.cliAdminUsers.cliAdminUsers
        context.commit('SET_CLIADMIN_USER_CONDITIONS_LOAD_STATE', true)
        // Get user conditions from the API
        const response = await apiLib.getData('cliadmin/user-condition', true)
        // Check response and normalise data
        if (Array.isArray(response)) {
          context.commit('SET_CLIADMIN_USER_CONDITIONS', normalizeData(users, response))
          context.commit('SET_CLIADMIN_USER_CONDITIONS_LOAD_STATE', false)
          context.commit('SET_CLIADMIN_USER_CONDITIONS_ERROR', false)
        } else {
          context.commit('SET_CLIADMIN_USER_CONDITIONS', [])
          context.commit('SET_CLIADMIN_SELECTED_CLIENT_ADMIN', {})
          context.commit('SET_CLIADMIN_USER_CONDITIONS_LOAD_STATE', false)
        }
      } catch (error) {
        console.error(error)
        context.commit('SET_CLIADMIN_USER_CONDITIONS_ERROR', true)
      }
    },
    async deleteCliAdminUserCondition (context, payload) {
      try {
        context.commit('SET_CLIADMIN_USER_CONDITIONS_DELETE_STATE', true)
        await apiLib.deleteData('cliadmin/user-condition/' + payload, true, true)
        context.commit('SET_CLIADMIN_USER_CONDITIONS_DELETE_STATE', false)
        context.dispatch('fetchCliAdminUserConditions')
        context.commit('SET_SELECTED_USER_CONDITIONS')
      } catch (error) {
        console.error(error)
        context.commit('SET_CLIADMIN_USER_CONDITIONS_ERROR', true)
      }
    },
    async updateCliAdminUserCondition (context, payload) {
      try {
        context.commit('SET_CLIADMIN_USER_CONDITIONS_UPDATE_STATE', true)
        const id = payload.userConditionId
        const data = payload.data
        await apiLib.updateData('cliadmin/user-condition/' + id, data, true, true)
        context.commit('SET_CLIADMIN_USER_CONDITIONS_UPDATE_STATE', false)
        context.dispatch('fetchCliAdminUserConditions')
      } catch (error) {
        console.error(error)
        context.commit('SET_CLIADMIN_USER_CONDITIONS_ERROR', true)
      }
    }
  }
}

function normalizeData (users, conditions) {
  const arr = []
  for (let i = 0; i < users.length; i++) {
    // Get userId, user details and filter response for conditions pertaining to userId
    const userDetails = users[i]
    const conditionData = conditions.filter(condition => condition.userId === userDetails.userId)
    const conditionStatus = conditionData.find(e => e.userId === userDetails.userId).status
    const userConditionId = conditionData.find(e => e.userId === userDetails.userId).userConditionId
    const conditionId = conditionData.find(e => e.userId === userDetails.userId).conditionId
    // Return all condition and hydration data for filtered conditions
    const userConditions = function () {
      const data = []
      for (let k = 0; k < conditionData.length; k++) {
        data.push({
          ...conditionData[k].condition,
          hydrationAdjustment: conditionData[k].hydrationAdjustment.adjustment,
          userConditionId: userConditionId
        })
      }
      return data
    }
    // Push normalised data
    arr.push({
      userId: userDetails.userId,
      username: userDetails.deptPerson.person.givenName + ' ' + userDetails.deptPerson.person.familyName,
      status: conditionStatus,
      conditionId: conditionId,
      conditions: userConditions()
    })
    return arr
  }
}

function setSelected (data) {
  const conditions = []
  for (let j = 0; j < data.conditions.length; j++) {
    const condition = { ...data.conditions[j] }
    conditions.push(condition)
  }
  return conditions
}
