import { useForgotMyPassword } from 'hooks/hooks';
import BaseView from 'components/BaseView'
// import InputCard from 'components/InputCard'

const ForgetPassword = () => {
  const { email, isLoading, handleOnChange, handleSubmit, error } = useForgotMyPassword();
  return (
    <BaseView content={<>
      <h2>Forgot your password?</h2>
      <form onSubmit={handleSubmit} >
        <p className='pr-3 text-red-500'>{error ? error : ""} </p>
        <div className='w-100'>
          <p>Please enter your email address below:</p>
          <input value={email} onChange={handleOnChange} name="email" type="text" autoComplete="username" />
        </div>
        <input className="Button" value={isLoading ? "Loading..." : "Send Reset Password Email"} type="submit" disabled={isLoading} />
      </form>
      </>
    }/>
  );
};

export default ForgetPassword
