import { useSignup } from 'hooks'
const Signup = () => {
  const { isLoading, formData, handleSubmit, handleOnChange, navigate, error } = useSignup()
  return (
    <div>
      <div className='form-container'>
        <div style={{width: "100%"}} className='wrapper' >
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <p style={{color: "red", padding: "1px"}}>{error ? error: ""} </p>
            <div className='form-group'>
              <label htmlFor="">Email Address:</label>
              <input className='email-form' value={formData.email} onChange={handleOnChange} name="email" type="text" autoComplete="username" />
            </div>
            <div className='form-group'>
              <label htmlFor="">Username:</label>
              <input className='username-form' value={formData.username} onChange={handleOnChange} name="username" type="text" autoComplete="username" />
            </div>
            <div className='form-group'>
              <label htmlFor="">Password:</label>
              <input className='password-form' value={formData.password} onChange={handleOnChange} name="password" type="password" autoComplete="current-password" />
            </div>
            <div className='form-group'>
              <label htmlFor="">Confirm Password:</label>
              <input className='confirm-password-form' value={formData.password2} onChange={handleOnChange} name="password2" type="password" autoComplete="new-password"/>
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
