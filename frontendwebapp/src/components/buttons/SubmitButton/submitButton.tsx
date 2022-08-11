import * as React from "react";
import SyncIcon from "@mui/icons-material/Sync";
import { useState } from "react";

interface ISubmitButtonProps {
  name: string;
  isLoading: boolean;
}

const SubmitButton: React.FunctionComponent<ISubmitButtonProps> = (props) => {
  const [isHeld, setIsHeld] = useState(false);

  return (
    <button
      onTouchStart={() => {
        setIsHeld(true);
      }}
      onTouchEnd={() => {
        setIsHeld(false);
      }}
      type="submit"
      className={`${isHeld ? "!bg-red" : "!bg-pink"} font-semibold py-3 flex flex-row text-whiteGrey w-fill rounded-lg shadow-lg align-center justify-center`}
    >
      {props.isLoading && (
        <svg className="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24">
          <SyncIcon />
        </svg>
      )}
      <div className="">{props.name}</div>
    </button>
  );
};

export default SubmitButton;
