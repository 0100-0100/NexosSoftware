// import { useForgotMyPassword, useProfile } from 'modules/auth/hooks/'
import BaseSideBarView from 'modules/core/design-system/BaseSideBarView'

import ProductIconSVG from '../../../assets/ProductIconSVG'

// import InputCard from 'components/InputCard'

const Home = () => {
  // const { email, isLoading, handleOnChange, handleSubmit, error, navigate } = useForgotMyPassword();
  // const {user, usersData, handleLogout} = useProfile()
  return (<BaseSideBarView content={
    <div className='text-[12px] flex flex-wrap flex-col justify-center items-center gap-[10px] w-[600px] bg-black' >
      <h2 className="select-none text-[#3d3d3d] font-sans text-[24px] font-semibold leading-[24px] p-2 text-center">Home</h2>
      <ProductIconSVG strokeColor='#FFF' hoverColor='#00FF00' />
    </div>
  }/>);
};

export default Home
