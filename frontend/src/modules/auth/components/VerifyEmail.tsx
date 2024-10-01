import { useVerifyEmail } from 'modules/auth/hooks/'
import BaseView from 'modules/core/design-system/BaseView'


const VerifyEmail = () => {
  const { isLoading, otp, handleOnChange, handleSubmit, error } = useVerifyEmail()
  return (<BaseView content={
    <div className='text-[12px] flex flex-wrap flex-col justify-center items-center gap-[10px] w-[600px]' >
      <p className="select-none text-[#3d3d3d] font-sans text-[18px] font-semibold leading-[24px] p-2 text-center">We've just sent an email to your email address with your verification code</p>
      <form onSubmit={handleSubmit}
            className='container flex flex-wrap justify-center content-center flex-col gap-4 p-10 rounded-2xl shadow-[0_15px_35px_rgba(50,50,93,0.1),_0_5px_15px_rgba(0,0,0,0.07)]'>

        <p className='w-full pr-3 text-red-500'>{error ? error : ""} </p>

        <div className='w-full'>
          <label className='select-none' htmlFor="">Please enter your verification code:</label>
          <input value={otp} onChange={handleOnChange} name="email" type="text" autoComplete="username"
                 className='w-full border border-gray-400 rounded box-border p-3 outline-none' />
        </div>
        <input type="submit" value={isLoading ? "Loading..." :"Send"} disabled={isLoading}
               className="select-none w-full hover:bg-primary-400 bg-primary-500 text-[#FFFFFF] font-bold cursor-pointer rounded-md p-3" />
      </form>
    </div>
  }/>)
};

export default VerifyEmail
