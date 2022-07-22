import * as React from 'react';

interface IMainMenuTitleProps {
    name: string;
}

const MainMenuTitle: React.FunctionComponent<IMainMenuTitleProps> = (props) => {
  return (
    <div className="text-lg font-semibold">{props.name}</div>
  );
};

export default MainMenuTitle;
