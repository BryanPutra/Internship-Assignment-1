import * as React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface IProductCardProps {
  color?: string;
}

const ProductCard: React.FunctionComponent<IProductCardProps> = (props) => {
  return (
    <div className="flex flex-row justify-center items-center mx-3 bg-gradient-to-bl from-pink to-softPink via-red shadow-md rounded-xl text-whiteGrey">
      <div className="m-4">
        <svg className="w-16 h-16">
          <AddCircleIcon />
        </svg>
      </div>
      <div className="text-xl flex-grow">Credit Card</div>
    </div>
  );
};

export default ProductCard;
