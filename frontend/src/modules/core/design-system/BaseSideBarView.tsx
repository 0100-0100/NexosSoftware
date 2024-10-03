import React from 'react';
import Sidebar from './Sidebar'

interface BaseSideBarViewProps {
  content: React.ReactNode
  isLoading?: boolean
}

const BaseSideBarView: React.FC<BaseSideBarViewProps> = ({ content, isLoading }) => {
  return (
    <div className='flex flex-wrap flex-col justify-center content-center w-full h-screen' >
      <div className='absolute object-left-top '>
        {Sidebar()}
      </div>
      <div className='pl-20 flex flex-wrap flex-col justify-center content-center w-full h-full' >
        {isLoading ? 'Loading...' : content}
      </div>
    </div>
  );
};

export default BaseSideBarView
