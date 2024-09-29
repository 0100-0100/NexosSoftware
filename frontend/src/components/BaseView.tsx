import React from 'react';

interface BaseViewProps {
  content: React.ReactNode
  isLoading?: boolean
}

const BaseView: React.FC<BaseViewProps> = ({ content, isLoading }) => {
  return (
    <body>
      <main className="container">
        <article className="container">
          <div className='container flex h-screen'>
            {isLoading ? 'Loading...' : content}
          </div>
        </article>
      </main>
    </body>
  );
};

export default BaseView;
