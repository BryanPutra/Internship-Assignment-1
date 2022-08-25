import * as React from "react";
import { useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { useFormContext, Controller } from "react-hook-form";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
// import { Input, Select, Option } from "@material-tailwind/react";
// import { Input } from "@material-tailwind/react";
import type {} from "@mui/x-date-pickers/themeAugmentation";
// import { TextField, TextFieldProps } from "@mui/material";
import {
  TextField,
  TextFieldProps,
  MenuItem,
  Select,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

import { useState } from "react";
import moment from "moment";

interface IFormCustomInputProps {
  inputType: string;
  inputLabel: string;
  inputName: string;
  selectItemsList?: string[];
  inputPlaceholder?: string;
  defaultValueProp?: any;
  errors: any;
  errorString: string;
}

const FormCustomInput: React.FunctionComponent<IFormCustomInputProps> = (
  props
) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<string | null>(
    `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  );
  const { control } = useFormContext();
  const printShit = () => {
    console.log(moment(selectedDate).format("DD/MM/YYYY"));
    console.log(selectedDate);
    console.log(typeof selectedDate);
  };

  return (
    <Controller
      name={props.inputName}
      control={control}
      defaultValue={props.defaultValueProp}
      render={({ field }) => (
        <div className="w-full">
          {{
            textField: (
              <TextField
                className=""
                fullWidth
                {...field}
                color="primary"
                placeholder={props.inputPlaceholder}
                label={props.inputLabel}
                variant="standard"
              />
            ),
            Picker: (
              <>
                <InputLabel id="select">{props.inputLabel}</InputLabel>
                <Select
                  fullWidth
                  labelId="select"
                  variant="standard"
                  {...field}
                >
                  {props.selectItemsList?.map((item: string) => {
                    return <MenuItem value={item}>{item}</MenuItem>;
                  })}
                </Select>
              </>
            ),
            Calendar: (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label={props.inputLabel}
                  // value={selectedDate}
                  // onChange={setSelectedDate}
                  inputFormat="DD/MM/yyyy"
                  openTo="year"
                  views={["year", "month", "day"]}
                  renderInput={(props: TextFieldProps) => (
                    <TextField
                      {...props}
                      datatype=""
                      fullWidth
                      color="info"
                      variant="standard"
                    />
                  )}
                  {...field}
                />
              </LocalizationProvider>
            ),
          }[props.inputType] ?? (
            <div className="text2xl">
              Error fetching input component from server
            </div>
          )}
          {props.errors && (
            <>
              <div className="text-sm text-red mt-2 ml">
                {props.errorString}
              </div>
            </>
          )}
        </div>
      )}
    />
  );
};

export default FormCustomInput;
