import { useLogin } from 'hooks'
const Login = () => {
  const { loginData, isLoading, handleOnChange, handleSubmit, navigate} = useLogin()
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
