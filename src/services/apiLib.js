import axios from 'axios'

export default {
  // Delete (DELETE) data
  deleteData (url, auth) {
    return axios.delete(url, data).then(response => {
      console.log(response)
      return response.data
    }).catch(err => console.log(err))
      .finally(() => {
        // ROUTER TO STD PAGE IF ERR?
      })
  },
  // Get data
  getData (url, auth) {
    return axios.get(url).then(response => {
      console.log(url)
      console.log(response)
      return response.data
    }).catch(err => console.log(err))
      .finally(() => {
        // ROUTER TO STD PAGE IF ERR?
      })
  },
  // Add (POST) new data
  postData (url, data, auth) {
    if (data) {
      return axios.post(url, data).then(response => {
        console.log(response)
        return response.data
      }).catch(err => console.log(err))
        .finally(() => {
          // ROUTER TO STD PAGE IF ERR?
        })
    }
  },
  // Update (PUT) data
  updateData (url, data, auth) {
    if (data) {
      return axios.put(url, data).then(response => {
        console.log(response)
        return response.data
      }).catch(err => console.log(err))
        .finally(() => {
          // ROUTER TO STD PAGE IF ERR?
        })
    }
  }
}
