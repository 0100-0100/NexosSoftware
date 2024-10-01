import React from 'react';

interface BaseViewProps {
  content: React.ReactNode
  isLoading?: boolean
}

const BaseView: React.FC<BaseViewProps> = ({ content, isLoading }) => {
  return (
    <div className='flex flex-wrap flex-col justify-center content-center w-full h-screen' >
      {isLoading ? 'Loading...' : content}
    </div>
  );
};

export default BaseView
