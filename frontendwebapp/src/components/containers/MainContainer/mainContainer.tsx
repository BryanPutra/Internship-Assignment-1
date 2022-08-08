import * as React from 'react';

interface IMainContainerProps {
    containerType?: string;
    children: React.ReactNode;
}

const MainContainer: React.FunctionComponent<IMainContainerProps> = (props) => {
  return (
    <div className={`flex justify-center flex-col w-screen ${props.containerType === 'secondary' ? 'bg-whiteGrey' : 'bg-white p-7'}`}>
      {props.children}
    </div>
  );
};

export default MainContainer;
