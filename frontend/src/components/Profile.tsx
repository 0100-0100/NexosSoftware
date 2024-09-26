import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

import AxiosInstance from "../utils/AxiosInstance"


const Profile = () => {
  const navigate = useNavigate()
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
  const access = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken') as string) : ""
  const refresh = localStorage.getItem('refreshToken') ? JSON.parse(localStorage.getItem('refreshToken') as string) : ""
  const [usersData, setUsersData] = useState<any[]>([])

  const handleLogout = useCallback(async () => {
    try {
      const response = await AxiosInstance.post('/auth/logout', {'refresh': refresh})
      if (response.status === 204) {
        localStorage.clear()
        navigate('/')
        toast.success('You have logged out')
      }
    } catch (error) {
      localStorage.clear()
      navigate('/')
      toast.success('Session Timeout')
    }
  }, [navigate, refresh])

  useEffect(() => {
    const fetchData = async () => {
      if (access && user) {
        try {
          const response = await AxiosInstance.get('/auth/test')
          setUsersData(response.data)
        } catch (error: any) {
          handleLogout()
        }
      } else {
        toast.error('Please Login First.')
        navigate('/')
      }
    }
    fetchData()
  }, [handleLogout, navigate, access, user])

  return (
    <div className='profileContent'>
      <h2>Hello {user?.username}</h2>
      <ul>
        {usersData.map((d, idx) => (
          <li key={idx}>{d.email}, {d.username}</li>
        ))}
      </ul>
      <p style={{textAlign: "center"}}>Welcome to your profile</p>
      <button className='logout-btn' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile
