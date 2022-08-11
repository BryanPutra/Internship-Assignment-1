import * as React from "react";

interface ISectionButtonProps {
    name: string;
    color?: string;
    isSelected?: boolean;
}

const SectionButton: React.FunctionComponent<ISectionButtonProps> = (props) => {

  return (
    <div className={`text-sm px-2 py-1 bg-pink flex items-center justify-center border-2 rounded-full
    ${props.isSelected && '!bg-white text-pink border-white'}`}>
      {props.name}
    </div>
  );
};

export default SectionButton;
