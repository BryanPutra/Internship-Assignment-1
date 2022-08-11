import Link from "next/link";
import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputDataButton from "components/buttons/InputDataButton";
import MainContainer from "components/containers/MainContainer";
import RegistrationHeader from "components/headers/RegistrationHeader";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useMain } from "context/mainContext";

interface IInputDataProps {}

const InputData: React.FunctionComponent<IInputDataProps> = (props) => {
  const { creatingProductName } = useMain();

  const inputDataDetails = [
    {
      inputName: "Identity Card (KTP)",
      goToPage: "/inputs/takePhoto",
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
      <RegistrationHeader creatingProductName={creatingProductName} goToPage="/products/chooseProduct"/>
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