import * as React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface ISavingsCardProps {
  ownerName?: string;
  productName?: string;
  amount?: number;
  accountNumber?: number;
}

const SavingsCard: React.FunctionComponent<ISavingsCardProps> = (props) => {
  return (
    <div className="flex flex-col p-4 mt-2 bg-gradient-to-bl from-pink to-softPink via-red rounded-lg text-whiteGrey">
      <div>Tabungan Simas Payroll</div>
      <div className="py-4 text-2xl">IDR 2500000</div>
      <div>
        <div>Account number</div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <div className="text-xl mr-2">014428812</div>
            <div className="">
              <svg className="w-5 h-5">
                <ContentCopyIcon />
              </svg>
            </div>
          </div>
          <div className="self-end">
            <svg className="w-8 h-8">
              <KeyboardArrowRightIcon />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsCard;
