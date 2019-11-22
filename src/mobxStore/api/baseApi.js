import axios from 'axios'
const TIME_OUT = 1000 * 30 // 30s

export const get = (url = '', header = {}) => {
  const config = { headers: header, timeout: TIME_OUT }
  return axios.get(url, config)
    .then(response => response)
    .catch(e => e)
}

export const post = (url = '', data = {}, header = {}) => {
  const config = { headers: header, timeout: TIME_OUT }
  return axios.post(url, data, config)
    .then(response => response)
    .catch(e => e)
}

export const put = (url = '', data = {}, header = {}) => {
  const config = { headers: header, timeout: TIME_OUT }
  return axios.put(url, data, config)
    .then(response => response)
    .catch(e => e)
}
