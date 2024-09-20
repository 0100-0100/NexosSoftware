import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AxiosInstance from '../utils/AxiosInstace'


const Login = () => {
  const navigate = useNavigate();
  const [data, setLoginData] = useState({
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleOnChange = (e: any) => {
    setLoginData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (data) {
      setIsLoading(true)
      const response = await AxiosInstance.post("auth/login", data)
      const response_data = response.data
      setIsLoading(false)
      const user = {
        "email": response_data.email,
        "username": response_data.username
      }
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("accessToken", JSON.stringify(response_data.access_token))
        localStorage.setItem("refreshToken", JSON.stringify(response_data.refresh_token))
        toast.success('Successful Login.')
        navigate("/profile")
      } else {
        toast.error('Something went wrong.')
      }
    }
  }

  return (
    <div>
      <div className='form-container'>
        <div style={{width: "100%"}} className='wrapper' >
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            {isLoading && (
              <p>Loading...</p>
            )}
            <div className='form-group'>
              <label htmlFor="">Email Address:</label>
              <input className='email-form' value={data.email} onChange={handleOnChange} name="email" type="text"/>
            </div>
            <div className='form-group'>
              <label htmlFor="">Password:</label>
              <input className='password-form' value={data.password} onChange={handleOnChange} name="password" type="password" />
            </div>
            <input className="submitButton" type="submit" value="Login" />
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login
