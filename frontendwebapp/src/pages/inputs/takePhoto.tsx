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
import axios from "axios";
import { useAuth } from "context/authContext";

interface ITakePhotoProps {}

const TakePhoto: React.FunctionComponent<ITakePhotoProps> = (props) => {
  // const [width, setWidth] = useState(0);
  // const [height, setHeight] = useState(0);
  // const videoRef = useRef(null);
  // const camera = useRef(null);
  // const [image, setImage] = useState(null);
  // const getVideo = () => {
  //   if (typeof window === undefined) return;
  //   setWidth(window.innerWidth);
  //   setHeight(window.innerHeight);
  //   console.log(width, height);
  //   navigator.mediaDevices
  //     .getUserMedia({
  //       video: {
  //         width: width,
  //         height: height,
  //         facingMode: {
  //           exact: "environment",
  //         },
  //       },
  //     })
  //     .then((stream) => {
  //       // let video = videoRef.current === null ? videoRef.current! : null
  //       if (videoRef.current === null) return;
  //       let video: HTMLVideoElement = videoRef.current!;
  //       // let video: HTMLVideoElement = videoRef.current!;
  //       video.srcObject = stream;
  //       video.play();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   getVideo();
  // }, [videoRef]);

  // useEffect(() => {
  //   if (typeof window === undefined) return;
  //   console.log(width, height);
  //   window.addEventListener("resize", resizeWindow);

  //   return () => window.removeEventListener('resize', resizeWindow)
  // }, []);

  // const videoConstraints = {
  //   width: width,
  //   height: height,
  //   facingMode: "environment",
  // };

  // const resizeWindow = () => {
  //   setWidth(window.innerWidth);
  //   setHeight(window.innerHeight);
  // };

  const router = useRouter();
  const { authorizationAxios } = useAxios();
  const {
    creatingProductName,
    currentPage,
    setCurrentPage,
    prevPage,
    setPrevPage,
    isFromHome,
    setIsHome,
    isBack,
    setIsBack,
    isSubmit,
    setIsSubmit,
    setKtpIsActive,
    setKtpIsFilled,
    setFormIsActive,
  } = useMain();

  const { userDetails } = useAuth();

  const [source, setSource] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setFormStatesAfterSubmit = (responseData: IInputFormsResponse) => {
    setCurrentPage(responseData.formMap.nextPageMap.nextPage);
    setPrevPage(responseData.formMap.nextPageMap.prevPage);
    setKtpIsActive(false);
    setKtpIsFilled(true);
    setFormIsActive(true);
  };

  const setFormStates = (responseData: IInputFormsResponse) => {
    setIsHome(responseData.formMap.nextPageMap.isHome);
    setCurrentPage(responseData.formMap.nextPageMap.nextPage);
    setPrevPage(responseData.formMap.nextPageMap.prevPage);
  };

  const getInitialProps = async () => {
    const payload: IInputFormsRequestDataProps = {
      id: userDetails[0].id,
      username: userDetails[0].username,
      email: userDetails[0].email,
      roles: userDetails[0].roles,
      productCode: creatingProductName,
      currentPage: "ktp-1",
      prevPage: "home",
      isFromHome: isFromHome,
      isBack: isBack,
      isSubmit: false,
    };
    const response = await authorizationAxios.post("/getFormData", payload);
    const initialPropsData: IInputFormsResponse = response.data;
    console.log(initialPropsData);
    setFormStates(initialPropsData);
  };

  const reset = () => {
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
        id: userDetails[0].id,
        username: userDetails[0].username,
        email: userDetails[0].email,
        roles: userDetails[0].roles,
        productCode: creatingProductName,
        currentPage: "ktp-1",
        prevPage: "home",
        isBack: isBack,
        isSubmit: true,
        inputData: { ktpPhoto: imageBase64 },
        autofillData: {},
      };
      console.log(payload);
      
      setIsLoading(true);
      const response = await authorizationAxios.post("/getFormData", payload);
      const formResponseData: IInputFormsResponse = response.data;
      setFormStatesAfterSubmit(formResponseData);
      console.log(formResponseData);
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

      {/* {isLoading ? (
        <div className="flex flex-col items-center justify-center text-2xl h-full">
          <div className="flex flex-col items-center justify-center">
            <div>Uploading image...</div>
            <svg className="animate-spin h-3/5 w-3/5" viewBox="0 0 24 24">
              <RefreshIcon />
            </svg>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full gap-5 p-6 rounded-lg shadow-lg ">
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
                onClick={test}
                className="p-4 rounded-full shadow-lg bg-whiteGrey"
              >
                <svg className="w-14 h-14 text-pink">
                  <UploadIcon />
                </svg>
              </div>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default TakePhoto;
{
  /* <Webcam
        screenshotQuality={100}
        videoConstraints={videoConstraints}
        audio={false}
        screenshotFormat="image/jpeg"
      /> */
}
{
  /* <video className="w-full h-full" ref={videoRef}></video> */
}
