import axios from 'axios'

export const getMeta = {
  methods: {
    getMeta (url) {
      // this.isLoading = true
      const response = async function () {
        try {
          // that.isLoading
          const axGet = await axios({
            method: 'get',
            timeout: 5000,
            // url: 'http://172.16.16.79:3000/' + url,
            url: 'http://127.0.0.1:3000/' + url,
            headers: { 'Content-Type': 'application/json' }
          })
          // this.isLoading = false
          // console.log(axGet.data)
          return axGet.data
        } catch (err) {
          // console.log(err)
          return err
        }
      }
      // this.isLoading = false
      return response()
    }
  }
}
