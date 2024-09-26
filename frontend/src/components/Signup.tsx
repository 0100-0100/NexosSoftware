import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, ReactNode } from 'react'
import { toast } from 'react-toastify'

const Signup = () => {
  const navigate = useNavigate()
  const [formdata, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    password2: ""
  })

  const [error, setError] = useState<ReactNode>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleOnChange = (e: any) => {
    setFormData({...formdata, [e.target.name]: e.target.value})
  }
  const {email, username, password, password2} = formdata

  async function postSignUp (formdata: any) {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/auth/signup", formdata)
      return response
    } catch (error: any) {
      let elements = []
      console.log(error.response.data)
      for (let i in error.response.data) {
        for (let j in error.response.data[i]) {
          elements.push(<p>{error.response.data[i][j]}</p>)
        }
      }
      setIsLoading(false)
      setError(<>{elements}</>)
      return error
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!email || !username || !password || !password2) {
      setError(<p>All Fields are required.</p>)
    } else {

      setIsLoading(true)
      const response = await postSignUp(formdata)
      setIsLoading(false)

      if (response.status === 201) {
        navigate("/verify")
        toast.success(response.data.message)
      }
    }
  }

  return (
    <div>
      <div className='form-container'>
        <div style={{width: "100%"}} className='wrapper' >
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <p style={{color: "red", padding: "1px"}}>{error ? error: ""} </p>
            <div className='form-group'>
              <label htmlFor="">Email Address:</label>
              <input className='email-form' value={email} onChange={handleOnChange} name="email" type="text" autoComplete="username" />
            </div>
            <div className='form-group'>
              <label htmlFor="">Username:</label>
              <input className='username-form' value={username} onChange={handleOnChange} name="username" type="text" autoComplete="username" />
            </div>
            <div className='form-group'>
              <label htmlFor="">Password:</label>
              <input className='password-form' value={password} onChange={handleOnChange} name="password" type="password" autoComplete="current-password" />
            </div>
            <div className='form-group'>
              <label htmlFor="">Confirm Password:</label>
              <input className='confirm-password-form' value={password2} onChange={handleOnChange} name="password2" type="password" autoComplete="new-password"/>
            </div>
            <input className="Button" type="submit" value={isLoading ? "Loading..." :"Sign Up"} disabled={isLoading}/>
          </form>
          <p>Already have an account?</p>
          <input className="Button" onClick={() => { navigate("/") }} value="Login" />
        </div>
      </div>
    </div>
  )
}

export default Signup
