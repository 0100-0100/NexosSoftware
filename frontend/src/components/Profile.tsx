import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AxiosInstance from "../utils/AxiosInstace"
import { toast } from 'react-toastify'

const Profile = () => {
  const navigate = useNavigate()
  const user = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') as string)
        : ""
  const accessToken = localStorage.getItem('token')

  useEffect(() => {
    if (accessToken === null && !user) {
      navigate('/login')
    } else {
    }
  }, [accessToken, user])

  const getData = async () => {
        const response = await AxiosInstance.get('/auth/test')
        if (response.status === 200) {
            console.log(response.data)
        }
    }

  const refresh = localStorage.getItem('refreshToken')
        ? JSON.parse(localStorage.getItem('refreshToken') as string)
        : ""
  const handleLogout = async () => {
    const response = AxiosInstance.post('/auth/logout', {'refresh_token': refresh})
    if ((await response).status === 200) {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      navigate('/login')
      toast.success('You are now logged out.')
    }
  }

  return (<div className='profileContent'>
    <h2>Hello { user.username }</h2>
    <p style={{textAlign: "center"}}>Welcome to your profile </p>
    <button className='logout-btn' onClick={handleLogout} > Logout </button>
  </div> )}

export default Profile
