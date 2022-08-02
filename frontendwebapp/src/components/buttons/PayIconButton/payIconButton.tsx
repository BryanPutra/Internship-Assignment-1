import Link from "next/link";
import * as React from "react";

interface IPayIconButtonProps {
  name: string;
  icon: JSX.Element;
  color: string;
  bgColor: string;
  linkTo: string;
}

const PayIconButton: React.FunctionComponent<IPayIconButtonProps> = (props) => {
  return (
    <Link
      href={props.linkTo}
    >
      <a className={`flex flex-col flex-grow w-1/4 justify-center items-center mt-3`}>
        <div className={`p-4 ${props.bgColor} rounded-3xl mb-2`}>
          <svg className={`w-7 h-7 ${props.color}`}>{props.icon}</svg>
        </div>
        <div className="text-sm text-center">{props.name}</div>
      </a>
    </Link>
  );
};

export default PayIconButton;
