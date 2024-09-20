import axios from 'axios'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate()
  const [formdata, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    password2: ""
  })

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleOnChange = (e: any) => {
    setFormData({...formdata, [e.target.name]: e.target.value})
  }
  const {email, username, password, password2} = formdata

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!email || !username || !password || !password2) {
      setError("All Fields are required.")
    } else {
      setIsLoading(true)
      const response = await axios.post("http://localhost:8000/api/v1/auth/register", formdata)
      const response_data = response.data
      setIsLoading(false)
      if (response.status === 201) {
        navigate("/otp/verify")
        toast.success(response_data.message)
      }
    }
  }

  return (
    <div>
      <div className='form-container'>
        <div style={{width: "100%"}} className='wrapper' >
          <h2>Create Account</h2>
          {isLoading && (
            <h2>Loading...</h2>
          )}
          <form onSubmit={handleSubmit}>
            <p style={{color: "red", padding: "1px"}}>{error ? error: ""} </p>
            <div className='form-group'>
              <label htmlFor="">Email Address:</label>
              <input className='email-form' value={email} onChange={handleOnChange} name="email" type="text"/>
            </div>
            <div className='form-group'>
              <label htmlFor="">Username:</label>
              <input className='username-form' value={username} onChange={handleOnChange} name="username" type="text"/>
            </div>
            <div className='form-group'>
              <label htmlFor="">Password:</label>
              <input className='password-form' value={password} onChange={handleOnChange} name="password" type="password" />
            </div>
            <div className='form-group'>
              <label htmlFor="">Confirm Password:</label>
              <input className='confirm-password-form' value={password2} onChange={handleOnChange} name="password2" type="password"/>
            </div>
            <input className="submitButton" type="submit" value="Submit" />
          </form>
          {/*
              <h3 className='text-option'>Or</h3>
          <div className='googleContainer'>
            <button>Sign up with Google</button>
          </div>
           */}
        </div>
      </div>
    </div>
  )
}

export default Signup
