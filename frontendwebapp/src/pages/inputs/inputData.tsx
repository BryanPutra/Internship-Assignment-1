import Link from "next/link";
import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputDataButton from "components/buttons/InputDataButton";
import MainContainer from "components/containers/MainContainer";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useMain } from "context/mainContext";

interface IInputDataProps {}

const InputData: React.FunctionComponent<IInputDataProps> = (props) => {
  const { creatingProductName } = useMain();

  const inputDataDetails = [
    {
      inputName: "Identity Card (KTP)",
      goToPage: "/mainmenu",
      isActive: true,
      isFilled: true,
    },
    {
      inputName: "Selfie + Identity Card (KTP)",
      goToPage: "/mainmenu",
      isActive: true,
      isFilled: false,
    },
    {
      inputName: "Selfie",
      goToPage: "",
      isActive: false,
      isFilled: false,
    },
    {
      inputName: "Email Verification",
      goToPage: "",
      isActive: false,
      isFilled: false,
    },
    {
      inputName: "Form Input",
      goToPage: "",
      isActive: false,
      isFilled: false,
    },
  ];

  return (
    <MainContainer containerType="secondary">
      <div className="flex flex-col items-stretch px-5 py-4 bg-pink text-whiteGrey">
        <div className="flex flex-row gap-5 justify-start items-center">
          <Link href="/products/chooseProduct">
            <a className="">
              <svg className=" w-8 h-8">
                <ArrowBackIcon />
              </svg>
            </a>
          </Link>
          <div className="text-xl font-semibold">{`Registration: ${creatingProductName}`}</div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-5 p-5 bg-white">
        <div className="text-lg font-bold">Please input your data below:</div>
        {inputDataDetails.map((inputDetail) => {
          return (
            <InputDataButton
              inputType={inputDetail.inputName}
              goToPage={inputDetail.goToPage}
              isActive={inputDetail.isActive}
              isFilled={inputDetail.isFilled}
            />
          );
        })}
      </div>
    </MainContainer>
  );
};

export default InputData;
