import { Height } from "@mui/icons-material";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import RegistrationHeader from "components/headers/RegistrationHeader";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import UploadIcon from "@mui/icons-material/Upload";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
import Image from "next/image";
import MainContainer from "components/containers/MainContainer";
import { useMain } from "context/mainContext";
import axios from "axios";
import * as errorUtils from "utils/errorUtils";
import { useRouter } from "next/router";
import RefreshIcon from "@mui/icons-material/Refresh";
import { resolve } from "node:path/win32";
import { value } from "@material-tailwind/react/types/components/chip";

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

  const { creatingProductName } = useMain();
  const router = useRouter();
  // const {};
  const [source, setSource] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [loading, setLoading] = useState(false);

  const convertBlobToBase64 = (blob: Blob) =>
    new Promise<string | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });

  const uploadImage = () => {
    if (!imageBase64) return;
    console.log(imageBase64);
    console.log(typeof imageBase64);
    // const imageData = new FormData();
    // imageData.append("ktpImage", source);

    // try {
    //   setLoading(true);
    //   const response = await axios.post("/asd", imageData);
    //   console.log(response);
    //   alert("Uploaded image successfully");
    //   setLoading(false);
    //   router.back();
    // } catch (err) {
    //   alert(`Failed to upload image, ${errorUtils.getErrorMessage(err)}`);
    // }
  };

  const handleCapture = async (target: HTMLInputElement) => {
    const files = target.files;
    if (!files) return;
    if (files.length !== 0) {
      const file = files[0];
      const convertedImage = await convertBlobToBase64(file);
      convertedImage ? setImageBase64("") : setImageBase64(convertedImage!);
      const newUrl = URL.createObjectURL(file);
      setSource(newUrl);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <RegistrationHeader
        creatingProductName={creatingProductName}
        goToPage="/inputs/inputData"
      />
      {loading ? (
        <div className="flex flex-col items-center justify-center text-2xl min-h-screen">
          <div className="m-auto flex flex-col items-center justify-center">
            <div>Uploading image...</div>
            <svg className="animate-spin h-2/5 w-2/5" viewBox="0 0 24 24">
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
                onClick={uploadImage}
                className="p-4 rounded-full shadow-lg bg-whiteGrey"
              >
                <svg className="w-14 h-14 text-pink">
                  <UploadIcon />
                </svg>
              </div>
            )}
          </div>

          {/* <Webcam
        screenshotQuality={100}
        videoConstraints={videoConstraints}
        audio={false}
        screenshotFormat="image/jpeg"
      /> */}
          {/* <video className="w-full h-full" ref={videoRef}></video> */}
        </div>
      )}
    </div>
  );
};

export default TakePhoto;
