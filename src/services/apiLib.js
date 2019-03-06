import axios from 'axios'

var url = function() {
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

var axUnauth = axios.create({
  baseURL: url(),
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

var axAuth = axios.create({
  baseURL: url(),
  timeout: 10000,
})

var setToken = function() {
  try {
    if (localStorage.getItem('auth') !== null) {
      axios.defaults.headers.common['authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token
    } else {
      delete axios.defaults.headers.common['authorization']
    }
  } catch (error) {
    console.log(error)
    return 'none'
  }
}

export default {
  deleteData (url, data) {
    console.log(url)
    console.log('DELETE: ', data)
    return axAuth.delete(url).then(response => {
      return response.data
    }).catch(err => console.log(err))
      .finally(() => {
        // ROUTER TO STD PAGE IF ERR?
      })
  },
  // Get data
  getData (url, data) {
    console.log(url)
    console.log('GETAUTH: ', data)
    setToken()
    return axAuth.get(url).then(response => {
      // console.log('GETAUTH: ', response.data)
      return response.data
    }).catch(err => console.log(err))
      .finally(() => {
        // ROUTER TO STD PAGE IF ERR?
      })
  },
  // Add (POST) new data
  postData (url, data) {
    setToken()
    console.log(url)
    console.log('POSTAUTH: ', data)
    if (data) {
      return axAuth.post(url, data).then(response => {
        // console.log(url)
        // console.log('GETAUTH: ',response)
        return response.data
      }).catch(err => console.log(err))
        .finally(() => {
          console.log('URL', url)
          // ROUTER TO STD PAGE IF ERR?
        })
    }
  },
  postAuth (url, data) {
    console.log(url)
    console.log('POSTUNAUTH: ', data)
    setToken()
    if (data) {
      // console.log(url)
      // console.log('POSTAUTH: ', data)
      return axUnauth.post(url, data).then(response => {
        return response.data
      }).catch(err => console.log(err))
        .finally(() => {
          // ROUTER TO STD PAGE IF ERR?
        })
    }
  },
  // Update (PUT) data
  updateData (url, data) {
    console.log(url)
    console.log('PUT: ', data)
    setToken()
    if (data) {
      return axAuth.put(url, data).then(response => {
        // console.log('URL', url)
        // console.log('DATA', data)
        // console.log('RESPONSE', response)
        return response.data
      }).catch(err => console.log(err))
        .finally(() => {
          // ROUTER TO STD PAGE IF ERR?
        })
    }
  }
}
