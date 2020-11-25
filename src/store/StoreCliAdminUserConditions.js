import apiLib from '../services/apiLib.js'

const bounce = 500

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
      if (data) {
        state.cliAdminSelectedUserConditions = setSelected({ ...data })
      }
      if (state.cliAdminSelectedUserConditions.userId) {
        const userData = state.cliAdminUserConditions.find(
          (e) => e.userId === state.cliAdminSelectedUserConditions.userId
        )
        state.cliAdminSelectedUserConditions = setSelected({ ...userData })
      } else {
        state.cliAdminNewUserConditions = { ...state.cliAdminNewUserConditions[0] }
      }
    },
    UPDATE_SELECTED_USER_CONDITIONS (state, data) {
      const value = data.value
      state.cliAdminSelectedUserConditions.conditions[data.index][data.parameter] = value
    },
    RESET_SELECTED_USER_CONDITIONS (state, data) {
      const pristineValue = state.cliAdminUserConditions.find((e) => e.userId === data.userId).conditions
      for (let i = 0; i < pristineValue.length; i++) {
        const source = pristineValue[i]
        const target = state.cliAdminSelectedUserConditions.conditions[i]
        target.hydrationAdjustment = source.hydrationAdjustment
      }
    },
    // New Conditions
    ADD_NEW_USER_CONDITION (state, data) {
      state.cliAdminNewUserConditions.push(data)
    },
    REMOVE_NEW_USER_CONDITION (state, data) {
      state.cliAdminNewUserConditions.splice(data, 1)
    },
    RESET_NEW_USER_CONDITIONS (state) {
      state.cliAdminNewUserConditions = []
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
    RESET_CLIADMIN_USER_CONDITIONS_STORE_STATE (state) {
      state.cliAdminNewUserConditions = []
      state.cliAdminSelectedUserConditions = {}
      state.cliAdminNewUserConditions = []
      state.cliAdminUserConditionsLoading = false
      state.cliAdminUserConditionsError = false
      state.cliAdminUserConditionsUpdating = false
      state.cliAdminUserConditionsDeleting = false
    }
  },
  actions: {
    async fetchCliAdminUserConditions (context) {
      try {
        // Check if commonData in rootState
        context.commit('SET_CLIADMIN_USER_CONDITIONS_ERROR', false)
        context.commit('SET_CLIADMIN_USER_CONDITIONS_LOAD_STATE', true)
        await context.dispatch('fetchCommonData')
        await context.dispatch('fetchCliAdminUsers')
        // Get users from fromState
        const users = context.rootState.cliAdminUsers.cliAdminUsers
        // Get user conditions from the API
        const response = await apiLib.getData('cliadmin/user-condition', false)
        // Check response and normalise data
        if (Array.isArray(response)) {
          setTimeout(() => {
            context.commit('SET_CLIADMIN_USER_CONDITIONS', normalizeData(users, response))
            context.commit('SET_CLIADMIN_USER_CONDITIONS_LOAD_STATE', false)
          }, bounce)
          context.commit('SET_CLIADMIN_USER_CONDITIONS_ERROR', false)
        } else {
          context.commit('SET_CLIADMIN_USER_CONDITIONS', [])
          context.commit('SET_CLIADMIN_SELECTED_CLIENT_ADMIN', {})
          context.commit('SET_CLIADMIN_USER_CONDITIONS_LOAD_STATE', false)
          context.commit('SET_CLIADMIN_USER_CONDITIONS_ERROR', true)
        }
      } catch (error) {
        console.error(error)
        context.commit('SET_CLIADMIN_USER_CONDITIONS_LOAD_STATE', false)
        context.commit('SET_CLIADMIN_USER_CONDITIONS_ERROR', true)
      }
    },
    async deleteCliAdminUserCondition (context, payload) {
      try {
        context.commit('SET_CLIADMIN_USER_CONDITIONS_DELETE_STATE', true)
        await apiLib.deleteData('cliadmin/user-condition/' + payload, false, true)
        await context.dispatch('fetchCliAdminUserConditions')
        context.commit('SET_SELECTED_USER_CONDITIONS')
        setTimeout(() => {
          context.commit('SET_CLIADMIN_USER_CONDITIONS_DELETE_STATE', false)
        }, bounce)
      } catch (error) {
        console.error(error)
        context.commit('SET_CLIADMIN_USER_CONDITIONS_ERROR', true)
      }
    },
    async postNewUserConditions (context) {
      try {
        context.commit('SET_CLIADMIN_USER_CONDITIONS_ERROR', false)
        context.commit('SET_CLIADMIN_USER_CONDITIONS_UPDATE_STATE', true)
        const userId = context.state.cliAdminSelectedUserConditions.userId
        const jobs = []
        // Pool post new conditions
        for (let i = 0; i < context.state.cliAdminNewUserConditions.length; i++) {
          const element = context.state.cliAdminNewUserConditions[i]
          const payload = {
            userId: userId,
            conditionId: element.condition.conditionsId,
            comments: element.comment,
            adjustment: element.adjustment
          }
          const newCondition = apiLib.postData('cliadmin/user-condition/', payload, false, true)
          jobs.push(newCondition)
        }
        // Post new conditions
        await Promise.all(jobs)
        // Get all conditions
        await context.dispatch('fetchCliAdminUserConditions')
        // Set store state
        setTimeout(() => {
          context.commit('SET_SELECTED_USER_CONDITIONS')
          context.commit('RESET_NEW_USER_CONDITIONS')
          context.commit('SET_CLIADMIN_USER_CONDITIONS_UPDATE_STATE', false)
        }, bounce)
      } catch (error) {
        console.error(error)
        context.commit('SET_CLIADMIN_USER_CONDITIONS_UPDATE_STATE', false)
        context.commit('SET_CLIADMIN_USER_CONDITIONS_ERROR', true)
      }
    },
    async updateCliAdminUserCondition (context, payload) {
      try {
        context.commit('SET_CLIADMIN_USER_CONDITIONS_ERROR', false)
        context.commit('SET_CLIADMIN_USER_CONDITIONS_UPDATE_STATE', true)
        const jobs = []
        for (let i = 0; i < payload.length; i++) {
          const element = payload[i]
          const id = element.userConditionId
          const data = element.data
          const request = apiLib.updateData('cliadmin/user-condition/' + id, data, false, true)
          jobs.push(request)
        }
        await Promise.all(jobs)
        await context.dispatch('fetchCliAdminUserConditions')
        context.commit('SET_SELECTED_USER_CONDITIONS')
        setTimeout(() => {
          context.commit('SET_CLIADMIN_USER_CONDITIONS_UPDATE_STATE', false)
        }, bounce)
      } catch (error) {
        console.error(error)
        context.commit('SET_CLIADMIN_USER_CONDITIONS_UPDATE_STATE', false)
        context.commit('SET_CLIADMIN_USER_CONDITIONS_ERROR', true)
      }
    }
  }
}

// Create unreferenced conditions array
function normalizeData (users, conditions) {
  const arr = []
  if (!users.length) return arr
  // Set empty condition array if no user condition data exists
  for (let i = 0; i < users.length; i++) {
    const userDetails = users[i]
    const conditionData = conditions.filter(condition => condition.userId === userDetails.userId)
    if (conditionData.length === undefined || conditionData.length <= 0) {
      arr.push({
        userId: users[i].userId,
        status: 'Inactive',
        username: users[i].deptPerson.person.givenName + ' ' + users[i].deptPerson.person.familyName,
        comments: '',
        conditions: []
      })
    } else {
      // Filter response for conditions pertaining to userId
      const conditionData = conditions.filter(condition => condition.userId === userDetails.userId)
      const conditionStatus = conditionData.find(e => e.userId === userDetails.userId).status
      const conditionId = conditionData.find(e => e.userId === userDetails.userId).conditionId
      // Push normalised data
      arr.push({
        userId: userDetails.userId,
        username: userDetails.deptPerson.person.givenName + ' ' + userDetails.deptPerson.person.familyName,
        comments: userDetails.comments,
        status: conditionStatus,
        conditionId: conditionId,
        conditions: setUserConditions(conditionData)
      })
    }
  }
  return arr
}

function setUserConditions (conditions) {
  // Set condition data for filtered conditions
  const data = []
  for (let k = 0; k < conditions.length; k++) {
    const element = conditions[k].condition
    data.push({
      ...element,
      hydrationAdjustment: conditions[k].hydrationAdjustment.adjustment,
      userConditionId: conditions[k].userConditionId
    })
  }
  return data
}

function setSelected (data) {
  // Create new conditions array
  const conditions = []
  if (data.conditions) {
    for (let j = 0; j < data.conditions.length; j++) {
      const condition = { ...data.conditions[j] }
      conditions.push(condition)
    }
    data.conditions = conditions
    return data
  }
}
