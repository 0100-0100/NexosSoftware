import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const viewUsers = () => {
  const navigate = useNavigate()

  const userJson = localStorage.getItem('user')
  const [error, setError] = useState("")
  const user = userJson !== null ? JSON.parse(userJson) : setError('Error Parsing user data.');

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const res = await axios.post("http://localhost:8000/api/v1/auth/")
    if (res.status === 200) {
      // -H'Authorizaion: Bearer '
    }
    // server error pass to error
  }

  return (
    <div>
      <div className='form-container'>
        <div style={{width: "100%"}} className='wrapper' >
          <h2>Test Get Users</h2>
        </div>
      </div>
    </div>
  )
}
export default viewUsers
