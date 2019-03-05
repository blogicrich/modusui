import axios from 'axios'

var url = function() {
  console.log(process.env.NODE_ENV)
  let val = ''
  switch (process.env.NODE_ENV) {
    case 'development':
      val = 'http://127.0.0.1:3000/'
      return val
      break
    case 'production':
      val = 'https://edroplet.ndevr.co.uk:3000/'
      return val
    default:
      val = 'http://127.0.0.1:3000/'
      break
  }
  console.log(val)
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
  headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token }
})

export default {
  // Delete (DELETE) data
  deleteData (url, data) {
    return axAuth.delete(data).then(response => {
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
