import * as React from 'react';

interface IMainMenuTitleProps {
    name: string;
}

const MainMenuTitle: React.FunctionComponent<IMainMenuTitleProps> = (props) => {
  return (
    <div className="text-lg font-semibold mb-2">{props.name}</div>
  );
};

export default MainMenuTitle;
