import Link from "next/link";
import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface IRegistrationHeaderProps {
    creatingProductName: string;
    goToPage: string;
}

const RegistrationHeader: React.FunctionComponent<IRegistrationHeaderProps> = (
  props
) => {
    
  return (
    <div className="flex flex-col items-stretch px-5 py-4 bg-pink text-whiteGrey">
      <div className="flex flex-row gap-5 justify-start items-center">
        <Link href={props.goToPage}>
          <a className="">
            <svg className=" w-8 h-8">
              <ArrowBackIcon />
            </svg>
          </a>
        </Link>
        <div className="text-xl font-semibold">{`Registration: ${props.creatingProductName}`}</div>
      </div>
    </div>
  );
};

export default RegistrationHeader;
