import * as React from "react";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import {useMain} from 'context/mainContext';

interface IChooseProductCardProps {
  productTitle: string;
  productDetails: string;
  imageSrc: StaticImageData;
}

const ChooseProductCard: React.FunctionComponent<IChooseProductCardProps> = (
  props
) => {
  const [isHeld, setIsHeld] = useState(false);
  const router = useRouter();
  const { setCreatingProductName} = useMain();
  
  return (
    <div
      onTouchStart={() => {
        setIsHeld(true);
      }}
      onTouchEnd={() => {
        setIsHeld(false);
      }}
      onClick={() => {
        setCreatingProductName(props.productTitle)
        router.push('/inputs/inputData');
      }}
      className={`p-5 flex flex-row bg-white rounded-2xl shadow-lg w-full gap-2 ${
        isHeld ? "!bg-grey" : "!bg-white"
      }`}
    >
      <div className="flex flex-col flex-grow w-full">
        <div className="text-xl font-bold">{props.productTitle}</div>
        <div className="text-sm">{props.productDetails}</div>
      </div>
      <div className="w-3/4">
        <Image src={props.imageSrc} alt="Credit Platinum" layout="responsive" />
      </div>
    </div>
  );
};

export default ChooseProductCard;
