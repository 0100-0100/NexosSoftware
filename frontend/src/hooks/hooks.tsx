import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState, ReactNode } from 'react'
import { toast } from 'react-toastify'
import AxiosInstance from 'utils/AxiosInstance'
import axios from 'axios'


function useForgetPassword() {
  return
}

function useLogin() {
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

  return { loginData, isLoading, handleOnChange, handleSubmit, navigate }
}

function useProfile() {
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

  return {user, usersData, handleLogout}
}

function useSignup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    password2: ""
  })

  const [error, setError] = useState<ReactNode>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleOnChange = (e: any) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

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

  const { email, username, password, password2 } = formData
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!email || !username || !password || !password2) {
      setError(<p>All Fields are required.</p>)
    } else {

      setIsLoading(true)
      const response = await postSignUp(formData)
      setIsLoading(false)

      if (response.status === 201) {
        navigate("/verify")
        toast.success(response.data.message)
      }
    }
  }
  return { isLoading, formData, handleSubmit, handleOnChange, navigate, error }
}

function useVerifyEmail() {
  const [otp, setOtp] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (otp) {
      const response = await axios.post("http://localhost:8000/api/v1/auth/verify", {'otp': otp})
      if (response.status === 200) {
        navigate('/')
        toast.success(response.data.message)
      }
    }
  }

  return { otp, setOtp, handleSubmit }
}

export { useLogin, useForgetPassword, useProfile, useSignup, useVerifyEmail }
