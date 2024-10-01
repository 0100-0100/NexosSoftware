import { useSignup } from 'modules/auth/hooks/'
import BaseView from 'modules/core/design-system/BaseView'


const Signup = () => {
  const { isLoading, formData, handleSubmit, handleOnChange, navigate, error } = useSignup()
  return (<BaseView content={
    <div className='text-[12px] flex flex-wrap flex-col justify-center items-center gap-[10px] w-[600px]' >
      <h2 className="select-none text-[#3d3d3d] font-sans text-[24px] font-semibold leading-[24px] p-2 text-center">Create Your Account</h2>
      <form onSubmit={handleSubmit}
            className='container flex flex-wrap justify-center content-center flex-col gap-2 p-10 rounded-2xl shadow-[0_15px_35px_rgba(50,50,93,0.1),_0_5px_15px_rgba(0,0,0,0.07)]'>

        <p className='w-full pr-3 text-red-500'>{error ? error : ""} </p>

        <div className='w-full'>
          <label className='select-none' htmlFor="">Email Address:</label>
          <input value={formData.email} onChange={handleOnChange} name="email" type="text" autoComplete="username"
                 className='w-full border border-gray-400 rounded box-border p-3 outline-none' />
        </div>

        <div className='w-full'>
          <label className='select-none' htmlFor="">Username:</label>
          <input value={formData.username} onChange={handleOnChange} name="username" type="text" autoComplete="username"
                 className='w-full border border-gray-400 rounded box-border p-3 outline-none' />
        </div>

        <div className='w-full'>
          <label className='select-none' htmlFor="">Password:</label>
          <input value={formData.password} onChange={handleOnChange} name="password" type="password" autoComplete="current-password" 
                 className='w-full border border-gray-400 rounded box-border p-3 outline-none' />
        </div>

        <div className='w-full'>
          <label className='select-none' htmlFor="">Confirm Password:</label>
          <input value={formData.password2} onChange={handleOnChange} name="password2" type="password" autoComplete="new-password"
                 className='w-full border border-gray-400 rounded box-border p-3 outline-none' />
        </div>
        <input type="submit" value={isLoading ? "Loading..." :"Sign Up"} disabled={isLoading}
               className="select-none w-full hover:bg-primary-400 bg-primary-500 text-[#FFFFFF] font-bold cursor-pointer rounded-md p-3" />

      </form>
      <p className='select-none' >Already have an account? <span onClick={() => {navigate("/")}} className='w-full hover:text-primary-400 hover:underline text-primary-500 font-medium cursor-pointer'> Login</span></p>

    </div>
    }/>
  );
};

export default Signup
