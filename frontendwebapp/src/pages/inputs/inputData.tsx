import * as React from "react";
import Link from "next/link";
import { useEffect } from "react";
//local
import MainContainer from "components/containers/MainContainer";
import { useMain } from "context/mainContext";
import RegistrationHeader from "components/headers/RegistrationHeader";

//libs
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputDataButton from "components/buttons/InputDataButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface IInputDataProps {}

const InputData: React.FunctionComponent<IInputDataProps> = (props) => {
  const {
    creatingProductName,
    setCurrentPage,
    ktpIsActive,
    setKtpIsActive,
    ktpIsFilled,
    setKtpIsFilled,
    formIsActive,
    setFormIsActive,
    formIsFilled,
    setFormIsFilled,
  } = useMain();

  useEffect(() => {
    setCurrentPage("home");
  }, []);

  const inputDataDetails = [
    {
      inputName: "Identity Card (KTP)",
      goToPage: "/inputs/takePhoto",
      isActive: ktpIsActive,
      isFilled: ktpIsFilled,
    },
    {
      inputName: "Selfie + Identity Card (KTP)",
      goToPage: "/inputs/takePhoto",
      isActive: false,
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
      goToPage: "/inputs/inputForm",
      isActive: formIsActive,
      isFilled: formIsFilled,
    },
  ];

  return (
    <MainContainer containerType="secondary">
      <RegistrationHeader
        creatingProductName={creatingProductName}
        goToPage="/products/chooseProduct"
      />
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
