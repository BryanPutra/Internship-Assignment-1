import * as React from "react";
import { useEffect, useState } from "react";
//local
import MainContainer from "components/containers/MainContainer";
import { useMain } from "context/mainContext";
import RegistrationHeader from "components/headers/RegistrationHeader";
import type {
  IInputFormsRequestPage,
  IInputFormsResponse,
} from "interfaces/inputFormInterfaces";
//libs
import { Skeleton } from "@mui/material";
import InputDataButton from "components/buttons/InputDataButton";
import { useAxios } from "context/axiosContext";

interface IInputDataProps {}

const InputData: React.FunctionComponent<IInputDataProps> = (props) => {
  const { mainStates, sectionDetails, setMainStates} =
    useMain();
  const { authorizationAxios } = useAxios();

  useEffect(() => {
    const getInitialProps = async () => {
      const payload: IInputFormsRequestPage = {
        id: mainStates.user.id,
        username: mainStates.user.username,
        email: mainStates.user.email,
        cif: mainStates.user.cif,
        roles: mainStates.user.roles,
        productCode: mainStates.creatingProductName,
        currentPage: mainStates.currentPage,
        isFromSectionPage: mainStates.isFromSectionPage,
        isBack: false,
        isSubmit: false,
      };
      console.log(payload);
      const initialProps = await authorizationAxios.post(
        "/getFormData",
        payload
      );
      const initialPropsData: IInputFormsResponse = initialProps.data;
      console.log(initialPropsData);
      console.log(initialPropsData.formMap.sectionList!);
      setMainStates(prevState => ({
        ...prevState,
        sectionDetails: initialPropsData.formMap.sectionList!
      }));
    };
    console.log(mainStates.creatingProductName);
    
    getInitialProps();
  }, []);

  const inputDataDetails = [
    {
      inputName: "Identity Card (KTP)",
      goToPage: "/inputs/takePhoto",
      isActive: false,
      isFilled: false,
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
      isActive: true,
      isFilled: false,
    },
  ];

  return (
    <MainContainer containerType="secondary">
      <RegistrationHeader
        creatingProductName={mainStates.creatingProductName}
        goToPage="/products/chooseProduct"
      />
      <div className="flex flex-col justify-center gap-5 p-5 bg-white">
        <div className="text-lg font-bold">Please input your data below:</div>

        {mainStates.sectionDetails.length !== 0
          ? mainStates.sectionDetails.map((sectionDetail) => {
              return (
                <InputDataButton
                  sectionTitle={sectionDetail.sectionTitle}
                  disabled={sectionDetail.disabled}
                  sectionStatus={sectionDetail.sectionStatus}
                  pageList={sectionDetail.pageList}
                />
              );
            })
          : inputDataDetails.map((sectionDetail) => {
              return (
                <Skeleton
                  variant="rounded"
                  height={30}
                  sx={{ bgcolor: "grey.200" }}
                  animation="wave"
                />
              );
            })}
      </div>
    </MainContainer>
  );
};

export default InputData;
