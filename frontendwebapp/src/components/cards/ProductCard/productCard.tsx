import * as React from "react";
import {useState} from 'react';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Link from "next/link";

interface IProductCardProps {
  productName: string;
  color?: string;
}

const ProductCard: React.FunctionComponent<IProductCardProps> = (props) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  // add hook or function from product section page that sets a certain selected product
  // put the function in the onclick div
  return (
    <Link href="/products/chooseProduct">
      <a
        className={`flex flex-row justify-center items-center mx-3 bg-gradient-to-bl
        from-pink to-softPink shadow-lg via-red rounded-xl text-whiteGrey
        ${props.color === 'black' ? 'from-grey to-whiteGrey shadow-lg via-black' : ""} 
        ${props.color === 'lightBlue' ? 'from-blue-300 to-blue-100 shadow-lg via-blue-900' : ""}
      `}
      >
        <div className="m-4">
          <svg className="w-16 h-16">
            <AddCircleIcon />
          </svg>
        </div>
        <div className="text-xl flex-grow">{props.productName}</div>
      </a>
    </Link>
  );
};

export default ProductCard;
