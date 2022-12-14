import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//local
import RegistrationHeader from "components/headers/RegistrationHeader";
import * as errorUtils from "utils/errorUtils";
import { useMain } from "context/mainContext";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useAxios } from "context/axiosContext";
import type {
  IInputFormsRequestDataProps,
  IInputFormsRequestSubmitForm,
  IInputFormsResponse,
} from "interfaces/inputFormInterfaces";

//lib
// import Webcam from "react-webcam";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import UploadIcon from "@mui/icons-material/Upload";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";

interface ITakePhotoProps {}

const TakePhoto: React.FunctionComponent<ITakePhotoProps> = (props) => {
  const router = useRouter();
  const { authorizationAxios } = useAxios();
  const {
    creatingProductName,
    setCurrentPage,
    setPrevPage,
    mainStates,
  } = useMain();

  const [source, setSource] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const imageInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const setFormStatesAfterSubmit = (responseData: IInputFormsResponse) => {
    setCurrentPage("sectionPage");
    setPrevPage(responseData.formMap.sectionList![1].pageList[0]);
  };

  const setFormStates = (responseData: IInputFormsResponse) => {
    setCurrentPage(responseData.formMap.nextPageMap.nextPage);
    setPrevPage(responseData.formMap.nextPageMap.prevPage);
  };

  const getInitialProps = async () => {
    const payload: IInputFormsRequestDataProps = {
      id: mainStates.user.id,
      username: mainStates.user.username,
      email: mainStates.user.email,
      cif: mainStates.user.cif,
      roles: mainStates.user.roles,
      productCode: mainStates.creatingProductName,
      currentPage: "ktp-1",
      prevPage: "sectionPage",
      isFromSectionPage: true,
      isBack: false,
      isSubmit: false,
    };  
    console.log(payload);
    const response = await authorizationAxios.post("/getFormData", payload);
    const initialPropsData: IInputFormsResponse = response.data;
    console.log(initialPropsData);
    setFormStates(initialPropsData);
  };

  const reset = () => {
    imageInputRef.current.value = "";
    setSource("");
    setImageBase64("");
    setIsLoading(false);
  };

  const convertBlobToBase64 = (blob: Blob) =>
    new Promise<string | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });

  useEffect(() => {
    try {
      getInitialProps();
    } catch (err) {
      alert(
        `Failed to fetch data from server, ${errorUtils.getErrorMessage(err)}`
      );
    }
  }, []);

  const uploadImage = async () => {
    if (!imageBase64) return;
    try {
      const payload: IInputFormsRequestSubmitForm = {
        id: mainStates.user.id,
        username: mainStates.user.username,
        email: mainStates.user.email,
        cif: mainStates.user.cif,
        roles: mainStates.user.roles,
        productCode: mainStates.creatingProductName,
        currentPage: "ktp-1",
        prevPage: "sectionPage",
        isBack: mainStates.isBack,
        isSubmit: true,
        inputData: { ktpPhoto: imageBase64 },
        autofillData: {},
      };
      
      console.log(payload);
      setIsLoading(true);
      const response = await authorizationAxios.post("/getFormData", payload);
      const formResponseData: IInputFormsResponse = response.data;
      console.log(formResponseData);
      setFormStatesAfterSubmit(formResponseData);
      reset();
      alert("Uploaded image successfully");
      router.back();
    } catch (err) {
      alert(`Failed to upload image, ${errorUtils.getErrorMessage(err)}`);
      reset();
    }
  };

  const handleCapture = async (target: HTMLInputElement) => {
    const files = target.files;
    if (!files) return;
    if (files.length !== 0) {
      const file = files[0];
      const convertedImage = await convertBlobToBase64(file);
      console.log(convertedImage);
      convertedImage ? setImageBase64(convertedImage!) : setImageBase64("");
      const newUrl = URL.createObjectURL(file);
      setSource(newUrl);
    }
  };

  return (
    <div
      className={`w-screen h-screen flex flex-col ${
        isLoading ? "bg-black bg-opacity-20" : ""
      }`}
    >
      <RegistrationHeader
        creatingProductName={creatingProductName}
        goToPage="/inputs/inputData"
      />

      <div
        className={`flex flex-col items-center absolute justify-center text-2xl w-full h-full ${
          !isLoading ? "hidden" : "z-50"
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <div>Uploading image...</div>
          <svg className="animate-spin h-3/5 w-3/5" viewBox="0 0 24 24">
            <RefreshIcon />
          </svg>
        </div>
      </div>

      <div
        className={`flex flex-col justify-center items-center h-full gap-5 p-6 rounded-lg shadow-lg ${
          isLoading ? "blur-sm" : ""
        }`}
      >
        <div className="text-xl font-semibold">
          {source
            ? "Please make sure your credentials are clear before uploading"
            : "Take a photo of your Identity Card"}
        </div>
        {source && (
          <div className="relative w-full h-full rounded-lg">
            <Image src={source} alt="Snap" layout="fill" />
          </div>
        )}
        <div
          className={`flex flex-row w-full items-center justify-evenly ${
            !source ? "h-full" : ""
          }`}
        >
          <input
            accept="image/*"
            className="hidden"
            ref={imageInputRef}
            id="iconButtonFile"
            type="file"
            capture="environment"
            onChange={(event) => handleCapture(event.target)}
          />
          <label
            className={
              !source
                ? "flex flex-col items-center justify-center w-full h-full border-4 border-pink border-dashed rounded-2xl"
                : ""
            }
            htmlFor="iconButtonFile"
          >
            <div className="p-4 rounded-full shadow-lg bg-whiteGrey">
              <svg className="w-14 h-14 text-pink">
                {source ? <FlipCameraIosIcon /> : <AddAPhotoIcon />}
              </svg>
            </div>
          </label>
          {source && (
            <div
              onClick={uploadImage}
              className="p-4 rounded-full shadow-lg bg-whiteGrey"
            >
              <svg className="w-14 h-14 text-pink">
                <UploadIcon />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TakePhoto;
