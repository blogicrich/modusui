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
      // axios.defaults.headers.common['Content-Type'] = 'application/json'
      axios.defaults.headers.common['authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token
    } else {
      delete axios.defaults.headers.common['authorization']
      axios.defaults.headers.common['Content-Type'] = 'application/json'
      // axios.defaults.headers.common['authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token
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

export default {
  async deleteData (url) {
    await setToken()
    return axi.delete(url).then(response => {
      // EventBus.$emit('snack-msg', { text: response.message, time: 6000, color: 'success', state: true } )
      console.log("URL: ", url)
      console.log("response.data: ", response.data)
      console.log("response.status: ", response.status)
      console.log("response.statusText: ", response.statusText)
      console.log('response.headers:', response.headers)
      console.log('response.request:', response.request)
      return response.data
    })
    .catch(error => { 
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("URL: ", url)
        console.log("response.data: ", error.response.data)
        console.log("response.status: ", error.response.status)
        console.log("response.statusText: ", error.response.statusText)
        console.log('response.headers:', error.response.headers)
        console.log('response.request:', error.response.request)
        // EventBus.$emit('snack-msg', { text: response.error, time: 6000, color: 'error', state: true } )
        return error.response.statusText + ' ' + error.response.status + '\n'
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // EventBus.$emit('snack-msg', { text: error.request, time: 6000, color: 'error', state: true } )
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        // EventBus.$emit('snack-msg', { text: error.message, time: 6000, color: 'error', state: true } )
        console.log('error.message: ', error.message)
      }
      console.log(error.config)
    })
    .finally(() => {
      // ROUTER TO STD PAGE IF ERR?
    })
  },

  // Get data
  
  async getData (url) {
    await setToken()
    return axi.get(url).then(response => {
      EventBus.$emit('snack-msg', { text: response.statusText, time: 6000, color: 'success', state: true } )
      console.log("URL: ", url)
      console.log("response.data: ", response.data)
      console.log("response.status: ", response.status)
      console.log("response.statusText: ", response.statusText)
      console.log('response.headers:', response.headers)
      console.log('response.request:', response.request)
      return response.data
    })
    .catch(error => { 
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("URL: ", url)
        console.log("response.data: ", error.response.data)
        console.log("response.status: ", error.response.status)
        console.log("response.statusText: ", error.response.statusText)
        console.log('response.headers:', error.response.headers)
        console.log('response.request:', error.response.request)
        // EventBus.$emit('snack-msg', { text: response.error, time: 6000, color: 'error', state: true } )
        return error.response.statusText + ' ' + error.response.status + '\n'
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // EventBus.$emit('snack-msg', { text: error.request, time: 6000, color: 'error', state: true } )
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        // EventBus.$emit('snack-msg', { text: error.message, time: 6000, color: 'error', state: true } )
        console.log('error.message: ', error.message)
      }
      console.log(error.config)
    })
    .finally(() => {
      // ROUTER TO STD PAGE IF ERR?
    })
  },

  // Add (POST) new data
  
  async postData (url, data) {
    await setToken()
    if (data) {
      return axi.post(url, data).then(response => {
        console.log("URL: ", url)
        console.log("payload: ", data)
        console.log("response.data: ", response.data)
        console.log("response.status: ", response.status)
        console.log("response.statusText: ", response.statusText)
        console.log('response.headers:', response.headers)
        console.log('response.request:', response.request)
      })
      .catch(error => { 
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("URL: ", url)
          console.log("response.data: ", error.response.data)
          console.log("response.status: ", error.response.status)
          console.log("response.statusText: ", error.response.statusText)
          console.log('response.headers:', error.response.headers)
          console.log('response.request:', error.response.request)
          // EventBus.$emit('snack-msg', { text: response.error, time: 6000, color: 'error', state: true } )
          return error.response.statusText + ' ' + error.response.status + '\n'
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // EventBus.$emit('snack-msg', { text: error.request, time: 6000, color: 'error', state: true } )
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          // EventBus.$emit('snack-msg', { text: error.message, time: 6000, color: 'error', state: true } )
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

  async postAuth (url, data) {
    await setToken()
    if (data) {
      return axi.post(url, data).then(response => {
        console.log("URL: ", url)
        console.log("payload: ", data)
        console.log("response.data: ", response.data)
        console.log("response.status: ", response.status)
        console.log("response.statusText: ", response.statusText)
        console.log('response.headers:', response.headers)
        console.log('response.request:', response.request)
        return response.data
      })
      .catch(error => { 
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("URL: ", url)
          console.log("response.data: ", error.response.data)
          console.log("response.status: ", error.response.status)
          console.log("response.statusText: ", error.response.statusText)
          console.log('response.headers:', error.response.headers)
          console.log('response.request:', error.response.request)
          // EventBus.$emit('snack-msg', { text: response.error, time: 6000, color: 'error', state: true } )
          return error.response.statusText + ' ' + error.response.status + '\n'
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // EventBus.$emit('snack-msg', { text: error.request, time: 6000, color: 'error', state: true } )
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          // EventBus.$emit('snack-msg', { text: error.message, time: 6000, color: 'error', state: true } )
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

  async updateData (url, data) {
    await setToken()
    if (data) {
      return axi.put(url, data).then(response => {
        console.log("URL: ", url)
        console.log("payload: ", data)
        console.log("response.data: ", response.data)
        console.log("response.status: ", response.status)
        console.log("response.statusText: ", response.statusText)
        console.log('response.headers:', response.headers)
        console.log('response.request:', response.request)
        return response.data
      })
      .catch(error => { 
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("response.data: ", error.response.data)
          console.log("response.status: ", error.response.status)
          console.log("response.statusText: ", error.response.statusText)
          console.log('response.headers:', error.response.headers)
          console.log('response.request:', error.response.request)
          // EventBus.$emit('snack-msg', { text: response.error, time: 6000, color: 'error', state: true } )
          return error.response.statusText + ' ' + error.response.status + '\n'
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // EventBus.$emit('snack-msg', { text: error.request, time: 6000, color: 'error', state: true } )
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          // EventBus.$emit('snack-msg', { text: error.message, time: 6000, color: 'error', state: true } )
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
