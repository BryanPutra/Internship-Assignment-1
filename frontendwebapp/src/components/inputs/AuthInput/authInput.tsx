import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@material-tailwind/react";

// const AuthInput: React.FunctionComponent<UseControllerProps> = (props) => {
//     const { field, fieldState } = useController(props);
//     return (
//         // <Controller control={props.control} rules={props.rules} name={props.name} render={({ field: { value, onChange, onBlur }, fieldState: { error }, }) => (
//         //     <input type={props.name} placeholder=""></input>
//         // )} />
//         <div className="flex-row">
//             <FontAwesomeIcon icon="at"/>
//             <input {...field} placeholder={props.name} />
//         </div>
//     );
// };

interface IAuthInputProps {
  name: string;
  type: string;
  label: string;
  icon: any;
  errors: any;
  errorString: string;
}

const AuthInput: React.FunctionComponent<IAuthInputProps> = (props) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col mt-3">
          <div className="flex flex-row items-end">
            <props.icon sx={{ color: "action.active", mr: 1, my: 0.5, mb: 1 }} />
            <Input
              {...field}
              type={props.type}
              label={props.label}
              variant="standard"
              error={props.errors}
            />
          </div>
          {props.errors && (
            <>
              <div className="text-sm text-red mt-2 ml">{props.errorString}</div>
            </>
          )}
        </div>
      )}
    />
  );
};

export default AuthInput;
