import * as React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { goToPage } from "utils/routeUtils";
import { ISectionDetails } from "interfaces/inputFormInterfaces";

interface IInputDataButtonProps {
  sectionTitle: string;
  sectionStatus: string;
  disabled: boolean;
  sectionId?: string;
  requirement?: string;
  pageList: string[];
}

const InputDataButton: React.FunctionComponent<ISectionDetails> = (
  props
) => {
  return (
    <div
      className={`flex flex-row w-full px-3 py-5 bg-white justify-between items-center drop-shadow-md rounded-md
    ${!props.disabled || props.sectionStatus === "complete" ? "text-black" : "text-grey"}`}
    >
      <div className="">{props.sectionTitle}</div>
      <Link className="" href={props.pageList[0] === "ktp-1" ? "/inputs/takePhoto" : "/inputs/inputForm"}>
        <a
          className={`${props.sectionStatus === "complete" ? "text-green-300" : ""} ${
            !props.disabled
              ? "text-pink pointer-events-auto"
              : "text-grey pointer-events-none"
          }
        `}
        >
          <svg className="w-8 h-8">
            {props.sectionStatus === "complete" ? <CheckCircleIcon /> : <NavigateNextIcon />}
          </svg>
        </a>
      </Link>
    </div>
  );
};

export default InputDataButton;
