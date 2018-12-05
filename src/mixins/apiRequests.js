import axios from 'axios'

export const getData = {
  methods: {
    getData (url) {
      const response = async function () {
        try {
          const axGet = await axios({
            method: 'get',
            timeout: 5000,
            // url: 'http://127.0.0.1:3000/' + url,
            url: 'http://172.16.16.79:3000/' + url,
            // url: 'http://172.16.16.89:3000/' + url,
            headers: { 'Content-Type': 'application/json' }
          })
          // console.log('getData: ', axGet.data)
          return axGet.data
        } catch (err) {
          // console.log("GET Status", err.response.status)
          return err.response.status
        }
      }
      return response()
    }
  }
}

export const postData = {
  methods: {
    postData (url, params) {
      console.log('params: ', params)
      const response = async function () {
        try {
          const axGet = await axios({
            method: 'post',
            timeout: 5000,
            headers: { 'Content-Type': 'application/json' },
            // url: 'http://127.0.0.1:3000/' + url,
            url: 'http://172.16.16.79:3000/' + url,
            // url: 'http://172.16.16.89:3000/' + url,
            data: JSON.stringify(params)
          })
          // console.log('postData: ', axGet.data)
          // console.log('http://172.16.16.79:3000/' + url)
          return axGet.data
        } catch (err) {
          // console.log(err)
          return err
        }
      }
      return response()
    }
  }
}
