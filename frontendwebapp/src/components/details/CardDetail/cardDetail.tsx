import { useAuth } from "context/authContext";
import { useMain } from "context/mainContext";
import * as React from "react";

interface ICardDetail {
  accountNumber: string;
  ownerName: string;
  amount: number;
  productName: string;
}

const CardDetail: React.FunctionComponent = () => {

  const cardsDetails: ICardDetail[] = [
    {
      accountNumber: "014428812",
      ownerName: "Bryan Putra",
      amount: 2500000,
      productName: "Tabungan Simas Payroll",
    },
  ];
  for (const i in cardsDetails) {
    console.log(Object.entries(cardsDetails[i]));
  }

  return (
    <div className="flex flex-col w-full mt-2">
      <div>
        {cardsDetails.map((obj) => {
          return (
            <div>
              {Object.entries(obj).map((arr) => {
                return (
                  <div className="flex flex-row items-center justify-between border-b-2 py-2 border-paleGrey">
                    <div className="text-darkGrey">{arr[0]}</div>
                    <div className=" font-semibold">{arr[1]}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardDetail;
