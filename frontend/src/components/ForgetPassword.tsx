import { useForgotMyPassword } from 'hooks/hooks'

import BaseView from 'components/BaseView'
// import InputCard from 'components/InputCard'

const ForgetPassword = () => {
  const { email, isLoading, handleOnChange, handleSubmit, error, navigate } = useForgotMyPassword();
  return (
    <BaseView content={

      <div className='text-[12px] flex flex-wrap flex-col justify-center items-center gap-20 w-[600px]' >

        <h2 className="text-[#3d3d3d] font-sans text-[24px] font-semibold leading-[24px] p-2 text-center" >Forgot your password?</h2>

        <form onSubmit={handleSubmit}
              className='container flex flex-wrap justify-center content-center flex-col gap-4 p-10 rounded-2xl shadow-[0_15px_35px_rgba(50,50,93,0.1),_0_5px_15px_rgba(0,0,0,0.07)]'>

          <p className='w-full pr-3 text-red-500'>{error ? error : ""} </p>

          <p>Please enter your email address below:</p>

          <input value={email} onChange={handleOnChange} name="email" type="text" autoComplete="username"
                 className='w-full  border border-gray-400 rounded box-border p-3 outline-none' />

          <input value={isLoading ? "Loading..." : "Send Reset Password Email"} type="submit" disabled={isLoading}
                 className="w-full  bg-[#6976d9] text-[#FFFFFF] cursor-pointer rounded-md p-3" />

        </form>

        <p>Or return to <span onClick={() => {navigate("/")}} className='w-full text-[#6976d9] cursor-pointer'> Login</span></p>

      </div>

    }/>
  );
};

export default ForgetPassword
