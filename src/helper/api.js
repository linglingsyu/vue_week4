import 'https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js'

const config = {
  baseURL: 'https://vue3-course-api.hexschool.io/v2/',
  headers: {},
}

const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
  '$1'
)

if (token) {
  config.headers.Authorization = token
}

const API = axios.create(config)
export { API }
