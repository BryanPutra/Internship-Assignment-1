import * as React from "react";
import { useState } from "react";

interface ICustomButtonProps {
  name: string;
  isPressable: boolean;
  goToPage: void;
}

const CustomButton: React.FunctionComponent<ICustomButtonProps> = (props) => {
  const [isHeld, setIsHeld] = useState<boolean>(false);
  return (
    <div
      onTouchStart={() => {
        setIsHeld(true);
      }}
      onTouchEnd={() => {
        setIsHeld(false);
      }}
      onClick={}
      className={`${
        isHeld ? "!bg-red" : "!bg-pink"
      } font-semibold py-3 flex flex-row text-whiteGrey w-fill rounded-lg shadow-lg align-center justify-center`}
    >
      <div className="">{props.name}</div>
    </div>
  );
};

export default CustomButton;
