import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AxiosInstance from '../utils/AxiosInstance'


const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const handleOnChange = (e: any) => {
    setLoginData({...loginData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (loginData) {
      try {
        setIsLoading(true)
        const response = await AxiosInstance.post("auth/login", loginData)
        setIsLoading(false)
        const user = {
          "email": response.data.email,
          "username": response.data.username
        }
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(user))
          localStorage.setItem("accessToken", JSON.stringify(response.data.access_token))
          localStorage.setItem("refreshToken", JSON.stringify(response.data.refresh_token))
          toast.success('Successful Login.')
          navigate("/profile")
        }
      } catch (error: any) {
        setIsLoading(false)
        toast.error(error.response?.data?.detail || 'Error Logging in!!')
      }
    }
  }

  return (
    <div>
      <div className='form-container'>
        <div style={{width: "100%"}} className='wrapper' >
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor="">Email Address:</label>
              <input className='email-form' value={loginData.email} onChange={handleOnChange} name="email" type="text" autoComplete="username" />
            </div>
            <div className='form-group'>
              <label htmlFor="">Password:</label>
              <input className='password-form' value={loginData.password} onChange={handleOnChange} name="password" type="password" autoComplete="current-password" />
            </div>
            <input className="Button" value={isLoading ? "Loading..." :"Login"} type="submit" disabled={isLoading} />
          </form>
          <p>Don't have an account yet? </p>
          <input className="Button" onClick={() => {navigate("/signup")}} value="Sign Up" disabled={isLoading} />
        </div>
      </div>
    </div>
  )
}
export default Login
