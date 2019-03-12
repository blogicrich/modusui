            /* apiLIB.js - Spearmark API request library BETA
/* -----------------------------------------------------------------------------       

A wrapper for the axios library for communication with the Spearmark eDroplet API
 
--------------------------------------------------------------------------------

API:

deleteData(url, log, toast)
getData(url, log, toast)
postData(url, data, log, toast)
updateData(url, data, log, toast)

func params:

url : String - url tail without prepending forward slash
data : Object - data object to be sent with request
log : Boolean - Will send request details to dev tools console
toast : Boolean - Will show v-snackbar with server response message

Response Objects:

response :
- The request was made and the server responded with a status of 2xx

error.response :
- The request was made and the server responded with a status code that falls 
out of the range of 2xx

error.request :
- The request was made but no response was received. `error.request` is an 
instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js

error.message :
- Something happened in setting up the request that triggered an Error

----------------------------------------------------------------------------- */   

import axios from 'axios'
import { EventBus } from '@/mixins/eventBus.js'

let url = function() {
  let val = ''
  switch (process.env.NODE_ENV) {
    case 'development':
      val = 'http://127.0.0.1:3000/'
      return val
      break
    case 'production':
      val = 'https://edroplet.ndevr.co.uk:3000/'
      return val
      break
    default:
      val = 'http://127.0.0.1:3000/'
      break
  }
  return val
}

let setToken = function() {
  try {
    if (localStorage.getItem('auth') !== null) {
      axios.defaults.headers.common['authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token
    } else {
      delete axios.defaults.headers.common['authorization']
      axios.defaults.headers.common['Content-Type'] = 'application/json'
    }
  } catch (error) {
    console.log(error)
    return 'none'
  }
}

let axi = axios.create({
  baseURL: url(),
  timeout: 10000
})

axi.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

// Utils

var logger = function (responseObj, url, data) {
  if (data) console.log("data: ", data)
  console.log("URL: ", url)
  console.log("response.data: ", responseObj.data)
  console.log("response.status: ", responseObj.status)
  console.log("response.statusText: ", responseObj.statusText)
  console.log('response.headers:', responseObj.headers)
  console.log('response.request:', responseObj.request)
}

export default {

  async deleteData (url, log, toast) {
    await setToken()
    return axi.delete(url).then(response => {
      if (toast) EventBus.$emit('snack-msg', { text: response.data.message, time: 6000, color: 'success', state: true } )
      if (log) logger(response, url)
      return response.data
    })
    .catch(error => { 
      if (error.response) {
        if (toast) EventBus.$emit('snack-msg', { text: error.response.statusText, time: 6000, color: 'error', state: true } )
        if (log) logger(response.error, url)
        return error.response.statusText + ' ' + error.response.status + '\n'
      } else if (error.request) {
        if (toast) EventBus.$emit('snack-msg', { text: error.request, time: 6000, color: 'error', state: true } )
        console.log(error.request)
      } else {
        if (toast) EventBus.$emit('snack-msg', { text: error.message, time: 6000, color: 'error', state: true } )
        console.log('error.message: ', error.message)
      }
      console.log(error.config)
    })
    .finally(() => {
      // ROUTER TO STD PAGE IF ERR?
    })
  },

  // Get data
  
  async getData (url, log, toast) {
    await setToken()
    return axi.get(url).then(response => {
      // if (toast) EventBus.$emit('snack-msg', { text: response.statusText, time: 6000, color: 'success', state: true } )
      if (log) logger(response, url)
      return response.data
    })
    .catch(error => { 
      if (error.response) {
        if (toast) EventBus.$emit('snack-msg', { text: error.response.statusText, time: 6000, color: 'error', state: true } )
        if (log) logger(error.response, url)
        return error.response.message + ' ' + error.response.status
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('error.message: ', error.message)
      }
      console.log(error.config)
    })
    .finally(() => {
      // ROUTER TO STD PAGE IF ERR?
    })
  },

  // Add (POST) new data
  
  async postData (url, data, log, toast) {
    await setToken()
    if (data) {

      return axi.post(url, data).then(response => {
        if (toast) EventBus.$emit('snack-msg', { text: response.data.message, time: 6000, color: 'success', state: true } )
        if (log) logger(response, url, data)
        return response.data
      })
      .catch(error => { 
        if (error.response) {
          if (toast) EventBus.$emit('snack-msg', { text: error.response.statusText, time: 6000, color: 'error', state: true } )
          if (log) logger(error.response, url, data)
          return error.response.statusText + ' ' + error.response.status + '\n'
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log('error.message: ', error.message)
        }
        console.log(error.config)
      })
      .finally(() => {
        console.log('URL', url)
        // ROUTER TO STD PAGE IF ERR?
      })
    }
  },

  // Post Auth

  async postAuth (url, data, log, toast) {
    await setToken()
    if (data) {
      return axi.post(url, data).then(response => {
        // if (toast) EventBus.$emit('snack-msg', { text: response.statusText, time: 6000, color: 'success', state: true } )
        if (log) logger(response, url)
        return response.data
      })
      .catch(error => { 
        if (error.response) {
          if (toast) EventBus.$emit('snack-msg', { text: error.response.statusText, time: 6000, color: 'error', state: true } )
          if (log) logger(response, url, data)
          return error.response.statusText + ' ' + error.response.status + '\n'
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log('error.message: ', error.message)
        }
        console.log(error.config)
      })
      .finally(() => {
        // ROUTER TO STD PAGE IF ERR?
      })
    }
  },

  // Update (PUT) data

  async updateData (url, data, log, toast) {
    await setToken()
    if (data) {
      return axi.put(url, data).then(response => {
        if (toast) EventBus.$emit('snack-msg', { text: response.statusText || response.data, time: 6000, color: 'success', state: true } )
        if (log) logger(response, url, data)
        return response.data
      })
      .catch(error => { 
        if (error.response) {
          if (toast) EventBus.$emit('snack-msg', { text: error.response.statusText, time: 6000, color: 'error', state: true } )
          if (log) logger(response, url, data)
          return error.response.statusText + ' ' + error.response.status + '\n'
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log('error.message: ', error.message)
        }
        console.log(error.config)
      })
      .finally(() => {
        // ROUTER TO STD PAGE IF ERR?
      })
    }
  }
}
