import axios from 'axios'
import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode'

const baseURL = 'http://localhost:8000/api/v1'

const AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

AxiosInstance.interceptors.request.use(async (request) => {
  const accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken') as string) : null
  const refreshToken = localStorage.getItem('refreshToken') ? JSON.parse(localStorage.getItem('refreshToken') as string) : null

  if (accessToken) {
    const user: any = jwtDecode(accessToken)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

    if (!isExpired) {
      request.headers.Authorization = `Bearer ${accessToken}`
      return request
    }

    if (refreshToken) {
      try {
        const response = await axios.post(`${baseURL}/auth/token/refresh`, { refresh: refreshToken })
        if (response.status === 200) {
          localStorage.setItem('token', JSON.stringify(response.data.access))
          localStorage.setItem('accessToken', JSON.stringify(response.data.access))
          localStorage.setItem('refreshToken', JSON.stringify(response.data.refresh))
          request.headers.Authorization = `Bearer ${response.data.access}`
          return request
        }
        if (response.status === 401) {
          localStorage.clear()
        }
      } catch (error) {
        localStorage.clear()
      }
    }
  }
  return request
})

export default AxiosInstance
