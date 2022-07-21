import * as React from "react";

interface IBalanceCardProps {
  name: string;
  amount?: string;
  icons: JSX.Element;
  type?: string;
}

const BalanceCard: React.FunctionComponent<IBalanceCardProps> = (props) => {
  return (
    <div className="flex flex-col p-4 items-center justify-center text-sm">
      <div className="p-4 bg-paleGrey rounded-full">
        <svg className="w-7 h-7 text-pink">{props.icons}</svg>
      </div>
      <div className="flex flex-col items-center justify-center whitespace-pre">
        <div className="mt-2 font-bold">{props.name}</div>
        <div className="mt-2">{props.amount}</div>
        {/* {props.type !== "card" ? <div className="mt-2">{props.amount}</div> : <></>} */}
      </div>
    </div>
  );
};

export default BalanceCard;
