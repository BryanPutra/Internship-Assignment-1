import * as React from 'react';

interface ICardContainerProps {
    children: React.ReactNode;
    additionalStyles?: string;
}

const CardContainer: React.FunctionComponent<ICardContainerProps> = (props) => {
  return (
    <div className={`flex flex-col m-5 p-5 bg-white rounded-lg shadow-lg ${props.additionalStyles && props.additionalStyles}`}>
        {props.children}
    </div>
  );
};

export default CardContainer;
