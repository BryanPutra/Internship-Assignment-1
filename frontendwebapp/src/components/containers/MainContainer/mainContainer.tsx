import * as React from 'react';

interface IMainContainerProps {
    containerType: string;
}

const MainContainer: React.FunctionComponent<IMainContainerProps> = (props, {children}) => {
  return (
    <div className={`flex flex-col p-6 ${props.containerType === 'secondary' ? 'bg-gray-200' : 'bg-white'}`}>
        {children}
    </div>
  );
};

export default MainContainer;
