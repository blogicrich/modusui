import axios from 'axios'

let authObj = function () {
  if (sessionStorage.auth.token) {
    return JSON.parse(sessionStorage.getItem('auth'))
  } else {
    return ''
  }
}

var axAuth = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
  timeout: 10000,
  headers: { 'Authorization': 'Bearer ' + authObj.token }
})

var axUnauth = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// let url = function() {
//   console.log(process.env.VUE_APP_NODE_ENV)
//   let val = ''
//   switch (process.env.VUE_APP_NODE_ENV) {
//     case 'development':
//       axAuth.setBaseURL('http://127.0.0.1:3000/')
//       break
//     case 'production':
//       axAuth.setBaseURL('https://edroplet.ndevr.co.uk:3000/')
//       axUnauth.setBaseURL('https://edroplet.ndevr.co.uk:3000/')
//     default:
//       val = 'http://127.0.0.1:3000/'
//       break
//   }
//   return val
// }

export default {
  // Delete (DELETE) data
  deleteData (url, data) {
    return axAuth.delete(url, data).then(response => {
      // console.log(url)
      console.log(response.data)
      return response.data
    }).catch(err => console.log(err))
      .finally(() => {
        // ROUTER TO STD PAGE IF ERR?
      })
  },
  // Get data
  getData (url, data) {
    return axAuth.get(url).then(response => {
      // console.log(url)
      console.log(response)
      return response.data
    }).catch(err => console.log(err))
      .finally(() => {
        // ROUTER TO STD PAGE IF ERR?
      })
  },
  // Add (POST) new data
  postData (url, data) {
    if (data) {
      return axAuth.post(url, data).then(response => {
        // console.log(url)
        console.log(response)
        return response.data
      }).catch(err => console.log(err))
        .finally(() => {
          // ROUTER TO STD PAGE IF ERR?
        })
    }
  },
  postAuth (url, data) {
    if (data) {
      return axUnauth.post(url, data).then(response => {
        // console.log(url)
        console.log(response)
        return response.data
      }).catch(err => console.log(err))
        .finally(() => {
          // ROUTER TO STD PAGE IF ERR?
        })
    }
  },
  // Update (PUT) data
  updateData (url, data) {
    if (data) {
      return axAuth.put(url, data).then(response => {
        console.log('URL', url)
        console.log('DATA', data)
        console.log('RESPONSE', response)
        return response.data
      }).catch(err => console.log(err))
        .finally(() => {
          // ROUTER TO STD PAGE IF ERR?
        })
    }
  }
}
