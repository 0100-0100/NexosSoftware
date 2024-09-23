import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AxiosInstance from "../utils/AxiosInstance"
import { toast } from 'react-toastify'

const Profile = () => {
  const navigate = useNavigate()
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : ""
  const accessToken = localStorage.getItem('refreshToken')

  const [usersData, setUsersData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken && user) {
        try {
          const response = await AxiosInstance.get('/auth/test');
          const data = response.data;

          if (JSON.stringify(usersData) !== JSON.stringify(data)) {
            setUsersData(data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        navigate('/login')
      }
    };
    fetchData();
  }, [accessToken, user, usersData, navigate]);

  const refresh = localStorage.getItem('refreshToken')
                ? JSON.parse(localStorage.getItem('refreshToken') as string)
                : ""

  const handleLogout = async () => {
    const response = AxiosInstance.post('/auth/logout', {'refresh_token': refresh})
    if ((await response).status === 204) {
      localStorage.removeItem('token')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      navigate('/login')
      toast.success('You are now logged out.')
    }
  }

  const template = (
    <div className='profileContent'>
      <h2>Hello { user.username }</h2>
      <ul>
        {usersData.map((d: any, idx: any) => (
          <li key={idx}>
            {d.email}, {d.username}
          </li>
        ))}
      </ul>
      <p style={{textAlign: "center"}}>Welcome to your profile </p>
      <button className='logout-btn' onClick={handleLogout} > Logout </button>
    </div>
  )
  return template
}

export default Profile
