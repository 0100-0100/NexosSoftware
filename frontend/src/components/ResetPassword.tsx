import { useResetPassword } from 'hooks'

const ResetPassword = () => {
  const { formData, handleSubmit, handleChange } = useResetPassword()
  return (
    <div>
      <div className='form-container'>
        <div className='wrapper' style={{width:"100%"}}>
          <h2>Enter your New Password</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor="">New Password:</label>
              <input type="text" className='email-form' name="password" value={formData.password} onChange={handleChange} />
            </div>
            <div className='form-group'>
              <label htmlFor="">Confirm Password</label>
              <input type="text" className='email-form' name="confirm_password" value={formData.confirm_password} onChange={handleChange} />
            </div>
            <button type='submit' className='vbtn' >Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
