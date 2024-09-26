import { useVerifyEmail } from 'hooks'
const VerifyEmail = () => {
  const { otp, setOtp, handleSubmit } = useVerifyEmail()
  return (
    <div>
      <div className='form-container' >
        <div style={{width: "100%"}} className='wrapper' >
          <p style={{width: "60%"}}>We've just sent an email to your email address with your verification code. </p>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <p>Please enter your verification code:</p>
              <input className='email-form' value={otp} onChange={(e)=>setOtp(e.target.value)} type="text" name="otp"/>
            </div>
            <input className='vbtn' type="submit" value="Send" />
          </form>
        </div>
      </div>
    </div>
  )
}
export default VerifyEmail
