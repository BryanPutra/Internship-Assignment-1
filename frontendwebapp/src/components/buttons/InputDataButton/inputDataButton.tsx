import * as React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { goToPage } from "utils/routeUtils";

interface IInputDataButtonProps {
  inputType: string;
  goToPage: string;
  isActive: boolean;
  isFilled?: boolean;
}

const InputDataButton: React.FunctionComponent<IInputDataButtonProps> = (
  props
) => {
  return (
    <div
      className={`flex flex-row w-full px-3 py-5 bg-white justify-between items-center drop-shadow-md rounded-md
    ${props.isActive || props.isFilled ? "text-black" : "text-grey"}`}
    >
      <div className="">{props.inputType}</div>
      <Link className="" href={props.goToPage}>
        <a
          className={`${props.isFilled ? "text-green-300" : ""} ${
            props.isActive
              ? "text-pink pointer-events-auto"
              : "text-grey pointer-events-none"
          }
        `}
        >
          <svg className="w-8 h-8">
            {props.isFilled ? <CheckCircleIcon /> : <NavigateNextIcon />}
          </svg>
        </a>
      </Link>
    </div>
  );
};

export default InputDataButton;
