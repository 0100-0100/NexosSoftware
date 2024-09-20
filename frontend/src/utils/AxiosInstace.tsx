import axios from 'axios'
import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'



const accessToken = localStorage.getItem('token')
                  ? JSON.parse(localStorage.getItem('token') as string)
                  : ""
const refreshToken=localStorage.getItem('refreshToken')
                 ? JSON.parse(localStorage.getItem('refreshToken') as string)
                 : ""

console.log('token', accessToken)
const baseURL = 'http://localhost:8000/api/v1'


const AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
    'Authorization': localStorage.getItem('token') ? `Bearer ${accessToken}` : ""
  }
})

AxiosInstance.interceptors.request.use(async (request) => {
  if (accessToken) {
    request.headers.Authorization = localStorage.getItem('token') ? `Bearer ${accessToken}` : ""
    const user = jwtDecode(accessToken)
    const isExpired = dayjs.unix(user.exp !== undefined? user.exp : 0).diff(dayjs()) < 1
    if (!isExpired) return request
    const response = await axios.post(`${baseURL}/auth/refresh`, {refresh: refreshToken})
    if (response.status === 200) {
      console.log('new accesstoken', response.data.access)
      localStorage.setItem('token', JSON.stringify(response.data.access))
      request.headers.Authorization = `Bearer ${request.data.access}`
      return request
    } else {
      const response = axios.post('/auth/logout', {'refresh': refreshToken})
      if ((await response).status === 204) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
      }
    }
  }
  return request
})

export default AxiosInstance
