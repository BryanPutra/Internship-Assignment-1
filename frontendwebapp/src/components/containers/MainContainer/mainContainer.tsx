import * as React from 'react';

interface IMainContainerProps {
    containerType: string;
    children: React.ReactNode;
}

const MainContainer: React.FunctionComponent<IMainContainerProps> = (props) => {
  return (
    <div className={`flex p-7 justify-center flex-col w-screen ${props.containerType === 'secondary' ? 'bg-whiteGrey' : 'bg-white'}`}>
      {props.children}
    </div>
  );
};

export default MainContainer;
