import { useState } from "react"
// import logo from '../../../assets/aphex-twin.svg';

import toggle from '../../../assets/toggle.svg'

import HomeIconSVG from '../../../assets/HomeIconSVG'
import ProductIconSVG from '../../../assets/ProductIconSVG'
import ProfileIconSVG from '../../../assets/ProfileIconSVG'

import LogoutIconSVG  from '../../../assets/LogoutIconSVG'
import useLogout from 'modules/auth/hooks/useLogout'

const Sidebar = () => {
  const { handleLogout } = useLogout()
  const [open, setOpen] = useState(true);

  const Menus = [
    { title: "Home", src: <HomeIconSVG strokeColor='var(--text-900)' hoverColor='var(--accent-500)' /> },
    { title: "Products", src: <ProductIconSVG strokeColor='var(--text-900)' hoverColor='var(--accent-500)' /> },
    { title: "Profile ", src: <ProfileIconSVG strokeColor='var(--text-900)' hoverColor='var(--accent-500)' />, gap: false},
  ];

  return (
    <div className="flex">
      <div
        className={` ${open ? "w-72" : "w-20 "} h-screen p-5 pt-8 relative duration-300`}
        style={{background:'#1C1C1C20', backdropFilter: 'blur(8px)'}}>
        <div
          className={`absolute flex items-center justify-center cursor-pointer -right-0 top-9 w-7 h-7 ${open && "rotate-180"}`}
          onClick={() => setOpen(!open)}>
          <img src={toggle} alt='Toggle Sidebar' className='w-[1rem] h-[1rem]' />
        </div>
        <div className="flex gap-x-4 items-center h-[24px] w-[24px]">
          {/* <img src={logo} className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} /> */}
          <h1 className={`text-black origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>
            Nexos Products
          </h1>
        </div>
        <ul className="pt-6 space-y-2">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`group flex rounded-md p-2 cursor-pointer hover:bg-[#1C1C1C18] duration-200 text-black text-sm items-center gap-x-4 w-full ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-[#1C1C1C10]"} `}
            >
              <div className='h-[24px] w-[24px]' >
                {Menu.src}
              </div>
              <span className={`${!open && "hidden"} origin-left duration-200 group-hover:text-accent-500`} >
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>

        <ul className="absolute bottom-4 left-0 w-full px-[1.25rem]">
          <li
            onClick={handleLogout}
            className={`group flex items-center justify-start gap-x-4 p-2 cursor-pointer rounded-md hover:bg-[#1C1C1C18] duration-200 text-black text-sm w-full`}
          >
            <div className="h-[24px] w-[24px]">
              <LogoutIconSVG strokeColor="var(--text-900)" hoverColor="var(--accent-500)" />
            </div>
            <span className={`${!open && "hidden"} origin-left duration-200 group-hover:text-[#FF0000]`}>
              Logout
            </span>
          </li>
        </ul>

      </div>
    </div>
  )
}

export default Sidebar
