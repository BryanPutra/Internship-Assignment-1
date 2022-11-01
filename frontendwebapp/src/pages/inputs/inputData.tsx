import * as React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
//local
import MainContainer from "components/containers/MainContainer";
import { useMain } from "context/mainContext";
import RegistrationHeader from "components/headers/RegistrationHeader";
import type {
  ISectionDetails,
  IInputFormsRequestPage,
  IInputFormsResponse,
} from "interfaces/inputFormInterfaces";
//libs
import { Skeleton } from "@mui/material";
import InputDataButton from "components/buttons/InputDataButton";
import { useAxios } from "context/axiosContext";
import { useAuth } from "context/authContext";

interface IInputDataProps {}

const InputData: React.FunctionComponent<IInputDataProps> = (props) => {
  const { creatingProductName, currentPage, ktpIsActive, ktpIsFilled } =
    useMain();
  const { userDetails } = useAuth();
  const { authorizationAxios } = useAxios();
  const [sectionDetails, setSectionDetails] = useState<ISectionDetails[]>([]);

  useEffect(() => {
    const getInitialProps = async () => {
      const payload: IInputFormsRequestPage = {
        id: userDetails[0].id,
        username: userDetails[0].username,
        email: userDetails[0].email,
        roles: userDetails[0].roles,
        productCode: creatingProductName,
        currentPage: currentPage,
        isFromHome: true,
        isBack: false,
        isSubmit: false,
      };
      console.log(payload);
      const response: IInputFormsResponse = await authorizationAxios.post(
        "/getFormData",
        payload
      );
      setSectionDetails(response.formMap.sectionList!);
    };
    getInitialProps();
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
      isActive: true,
      isFilled: false,
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

        {sectionDetails.length !== 0
          ? sectionDetails.map((sectionDetail) => {
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
