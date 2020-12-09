import axios from 'axios'
import { EventBus } from '@/mixins/eventBus.js'
import store from '@/store'

/**
 * Override per-function call logs for apiLib requests and log everything. Does not work unless in development
 * environment.
 */
const DEBUG_LOG_ALL = true

const URLS = {
  development: 'http://localhost:3000',
  production: 'https://droplet.lemonstall.com'
}

const axi = axios.create({
  baseURL: URLS[process.env.NODE_ENV || 'development'],
  timeout: 60000,
  xsrfCookieName: 'csrf',
  xsrfHeaderName: 'X-CSRF-Token',
  withCredentials: process.env.NODE_ENV === 'development'
})

/**
 * Sends a toast signal over the Vue event bus with the API's message data or status text as a fallback.
 *
 * @param {axios.response} response
 */
function toastResponse (response) {
  EventBus.$emit('snack-msg', {
    text: (response.data && response.data.message) ? response.data.message : response.statusText,
    time: 6000,
    color: (response.status >= 200 && response.status <= 299) ? 'success' : 'error',
    state: true
  })
}

/**
 * Logs the given axios response. Only works in development environment.
 *
 * @param {axios.response} response
 */
function logResponse (response) {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  console.groupCollapsed(`[${new Date().toISOString()}] [${response.status}] ${response.statusText}`)
  console.dir(response.data)
  console.groupEnd()
}

/**
 * Generates a response handler function that calls required post-response functions if needed.
 *
 * @param {Boolean} log
 * @param {Boolean} toast
 */
function responseHandler (log, toast) {
  return (response) => {
    if (log || DEBUG_LOG_ALL) {
      logResponse(response)
    }

    if (toast) {
      toastResponse(response)
    }

    return Promise.resolve(response.data)
  }
}

/**
 * Generates an error handler function that takes care of error logging, logout on unauthorized/forbidden, and
 * optionally rethrows the error.
 *
 * @param {Boolean} log
 * @param {Boolean} toast
 * @param {Boolean} rethrow
 */
function errorResponseHandler (log, toast, rethrow) {
  return (error) => {
    if (error.response) {
      if ([401, 403].includes(error.response.status)) {
        store.commit('CLEAR_STATE')
      }

      responseHandler(log, toast)(error.response)
    } else if (toast) {
      EventBus.$emit('snack-msg', { text: error.message, time: 6000, color: 'error', state: true })
    }

    if (rethrow) {
      throw error
    } else {
      Promise.resolve(error)
    }
  }
}

/**
 * Returns a Promise for an HTTP GET call to the api at the specified path. Resolves with response object.
 *
 * @param {String} path API path to call
 * @param {Boolean} [log] Log the response if in dev mode (default = true)
 * @param {Boolean} [toast] Show response message to the user (default = false)
 * @param {Boolean} [rethrow] Rethrow any errors that occur instead of returning them. Use this for try/catch flows when
 * using async/await (default = false)
 *
 * @returns {Promise<Object|String|Error>}
 */
function getData (path, log = true, toast = false, rethrow = false) {
  return axi
    .get(path)
    .then(responseHandler(log, toast))
    .catch(errorResponseHandler(log, toast, rethrow))
}

/**
 * Returns a Promise for an HTTP POST call to the api at the specified path. Resolves with response object.
 *
 * @param {String} path API path to call
 * @param {Object} data Request body
 * @param {Boolean} [log] Log the response if in dev mode (default = true)
 * @param {Boolean} [toast] Show response message to the user (default = true)
 * @param {Boolean} [rethrow] Rethrow any errors that occur instead of returning them. Use this for try/catch flows when
 * using async/await (default = false)
 *
 * @returns {Promise<Object|String|Error>}
 */
function postData (path, data, log = true, toast = true, rethrow = false) {
  return axi
    .post(path, data)
    .then(responseHandler(log, toast))
    .catch(errorResponseHandler(log, toast, rethrow))
}

/**
 * Returns a Promise for an HTTP PUT call to the api at the specified path. Resolves with response object.
 *
 * @param {String} path API path to call
 * @param {Object} data Request body
 * @param {Boolean} [log] Log the response if in dev mode (default = true)
 * @param {Boolean} [toast] Show response message to the user (default = true)
 * @param {Boolean} [rethrow] Rethrow any errors that occur instead of returning them. Use this for try/catch flows when
 * using async/await (default = false)
 *
 * @returns {Promise<Object|String|Error>}
 */
function updateData (path, data, log = true, toast = true, rethrow = false) {
  return axi
    .put(path, data)
    .then(responseHandler(log, toast))
    .catch(errorResponseHandler(log, toast, rethrow))
}

/**
 * Returns a Promise for an HTTP DELETE call to the api at the specified path. Resolves with response object.
 *
 * @param {String} path API path to call
 * @param {Object} data Request body
 * @param {Boolean} [log] Log the response if in dev mode (default = true)
 * @param {Boolean} [toast] Show response message to the user (default = true)
 * @param {Boolean} [rethrow] Rethrow any errors that occur instead of returning them. Use this for try/catch flows when
 * using async/await (default = false)
 *
 * @returns {Promise<Object|String|Error>}
 */
function deleteData (path, log = true, toast = true, rethrow = false) {
  return axi
    .delete(path)
    .then(responseHandler(log, toast))
    .catch(errorResponseHandler(log, toast, rethrow))
}

export default {
  getData,
  postData,
  updateData,
  deleteData
}
