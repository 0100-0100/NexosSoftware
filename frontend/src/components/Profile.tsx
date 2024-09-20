import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AxiosInstance from "../utils/AxiosInstace"
import { toast } from 'react-toastify'

const Profile = () => {
  const navigate = useNavigate()
  const user = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') as string)
        : ""
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    if (accessToken === null && !user) {
      navigate('/login')
    } else {
      const userData = getData()
    }
  }, [accessToken, user])

  const getData = async () => {
    const response = await AxiosInstance.get('/auth/test')
    return (
      <div>
        {response.data.map(function(d: any, idx: any) {
          return (<li key={idx}> {d.email}, {d.username} </li>)
        })}
      </div>
    )
  }

  const refresh = localStorage.getItem('refreshToken')
        ? JSON.parse(localStorage.getItem('refreshToken') as string)
        : ""
  const handleLogout = async () => {
    const response = AxiosInstance.post('/auth/logout', {'refresh': refresh})
    if ((await response).status === 204) {
      localStorage.removeItem('accessToken')
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
  </div> )
}

export default Profile
