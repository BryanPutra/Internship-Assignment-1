import * as React from "react";
import { Button } from "@material-tailwind/react";

interface IButtonInTextProps {
  content: string;
  onClicked?: () => void;
  putEnd: boolean;
  color: string;
  type?: string;
}

const ButtonInText: React.FunctionComponent<IButtonInTextProps> = (props) => {
  return (
    <Button
      size="lg"
      className={`text-base ${
        props.putEnd ? "self-end" : ""
      } normal-case font-bold px-0 ${
        props.type !== "secondary" ? "mt-3 py-3" : "py-0"
      } ${props.color}`}
      onClick={props.onClicked}
      variant="text"
    >
      {props.content}
    </Button>
  );
};

export default ButtonInText;
