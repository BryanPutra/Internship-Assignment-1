import * as React from "react";
import {useEffect, useState, useRef} from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import * as errorUtils from "utils/errorUtils";

interface ISavingsCardProps {
  ownerName?: string;
  productName?: string;
  amount?: number;
  accountNumber?: number;
}

const SavingsCard: React.FunctionComponent<ISavingsCardProps> = (props) => {
  const copyClipboard = async () => {
    try {
      // change the writeText value to response value of acc number
      await navigator.clipboard.writeText("014428812");
      alert('Copied to clipboard')
    } catch (err) {
      alert(`Failed to copy, ${errorUtils.getErrorMessage(err)}`);
    }
  };

  return (
    <div className="flex flex-col p-4 bg-gradient-to-bl from-pink to-softPink via-red shadow-md rounded-lg text-whiteGrey">
      <div>Tabungan Simas Payroll</div>
      <div className="py-4 text-2xl">IDR 2500000</div>
      <div>
        <div>Account number</div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <div className="text-xl mr-2">
              014428812
            </div>
            <div className="" onClick={copyClipboard}>
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
